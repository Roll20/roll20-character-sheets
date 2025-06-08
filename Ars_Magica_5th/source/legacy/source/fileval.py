#!/usr/bin/env python3
"""
Python script to evaluate and insert python expression in files
"""
import argparse
import importlib
import re
import sys
import traceback as tb
from pathlib import Path
from typing import Any, Dict, Generator, List, Optional, TextIO, Tuple, Union

if sys.version_info < (3, 8):
    raise RuntimeError("This script requires python 3.8 or higher")

is_whitespace = re.compile(r"^\s*$").match


class HandledException(Exception):
    """
    Exception that was already printed
    """


def process_template(
    in_file: TextIO,
    start_delimiter: str,
    end_delimiter: str,
    indent: str,
    globalns: Dict[str, Any],
    localns: Dict[str, Any],
    verbose: int = 0,
) -> Generator[str, None, None]:
    """
    Read lines from a file and evaluates occurences of occurence_re
    """
    lineno = 0
    for line in in_file:
        lineno += 1
        start, end = 0, 0
        line_indent = line[: len(line) - len(line.lstrip())]
        # Find the start delimiter on the line, if any
        while (start := line.find(start_delimiter, end)) >= 0:
            # We found a start delimiter at start. Yield the part before the delimiter
            # We didn't yield yet
            # if end == 0 and is_whitespace(line[:start]):
            #    line_indent = line[:start]
            yield line[end:start]
            # Find the corresponding end delimiter, store everything in-between as
            # the expression to evaluate
            start += len(start_delimiter)
            expr = ""
            offset = 0
            while (end := line.find(end_delimiter, start)) < 0:
                expr += line[start:]
                line = next(in_file)
                offset += 1
                start = 0
            expr += line[start:end]

            # Compute indentation to inject in the expression
            total_indent = line_indent
            if not is_whitespace(line[: start - len(start_delimiter)]):
                # The expression is somewhere within the line
                # If there is a newline in the expression, we must indent further
                total_indent = line_indent + indent

            try:
                value = eval(expr, globalns, localns)
            except Exception as err:
                print(
                    (
                        f"Expression at line {lineno}{'-' + str(lineno + offset) if offset else ''} "
                        "raised: {err.__class__.__name__}: {err}"
                    ),
                    end="",
                )
                if verbose < 1:
                    print(" (use -v to display offending expression)")
                else:
                    print(
                        "\nOffending expression:",
                        start_delimiter + expr + end_delimiter,
                    )
                if verbose < 2:
                    print("(use -vv to display detailed traceback)")
                else:
                    print(
                        "\nException raised:\n\n",
                        "".join(tb.format_exception(type(err), err, err.__traceback__)),
                    )
                raise HandledException from err

            if not isinstance(value, str):
                print(
                    f"Expression at line {lineno}{'-' + str(lineno + offset) if offset else ''} "
                    "does not evaluate to a string"
                )
                if verbose > 0:
                    print(
                        "Offending expression: ",
                        start_delimiter + expr + end_delimiter,
                    )
                raise HandledException from ValueError(
                    f"{start_delimiter + expr + end_delimiter} does not evaluate to a string"
                )

            value = value.replace("\n", "\n" + total_indent)
            yield value
            end += len(end_delimiter)
            lineno += offset
            offset = 0
        # No (more) start delimiter on the line, simply yield the rest
        yield line[end:]


def main(
    input: Path,
    output: Path,
    delimiters: Union[Tuple[str], Tuple[str, str]],
    indent: str = " " * 4,
    global_namespaces: Optional[List[str]] = None,
    local_namespaces: Optional[List[str]] = None,
    verbose: int = 0,
) -> None:
    """
    Main script entry point
    """

    # build delimiter regex
    start_delimiter = delimiters[0]
    end_delimiter = delimiters[0] if len(delimiters) == 1 else delimiters[1]

    # load namespaces
    globalns, localns = {}, {}
    for ns, source_list in zip(
        (globalns, localns),
        (global_namespaces, local_namespaces),
    ):
        for name in source_list or []:
            try:
                try:
                    # assume we are loading a module
                    module = importlib.import_module(name)
                    ns.update(vars(module))
                except ImportError:
                    # assume last element in name is an attribute
                    module_name, attr_name = name.rsplit(".", maxsplit=1)
                    module = importlib.import_module(module_name)
                    ns.update(getattr(module, attr_name))
            except Exception as err:
                print(
                    f"error: Could not load {name} due to " f"{err.__class__.__name__}: {err}",
                    end="",
                )
                if verbose < 1:
                    print(" (use -v to display detailed traceback)")
                else:
                    print("\n\n" + "".join(tb.format_exception(type(err), err, err.__traceback__)))
                exit(-1)

    # process and write lines
    with input.open() as in_file:
        try:
            with output.open("wt") as out_file:
                out_file.writelines(
                    process_template(
                        in_file=in_file,
                        start_delimiter=start_delimiter,
                        end_delimiter=end_delimiter,
                        indent=indent,
                        globalns=globalns,
                        localns=localns,
                        verbose=verbose,
                    )
                )
        except HandledException:
            print("An error occured, see above")
            print("Deleting output file ...")
            output.unlink(missing_ok=True)
        except Exception as err:
            print("An unhandled error occured, see below")
            print("Deleting output file ...")
            output.unlink(missing_ok=True)
            raise err


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="""
Evaluate python expressions in files and replace them by their value.

This script will find expression in-between delimiters in a file, evaluate them
and replace the expressions by their value in the output file. The namespace in
which the expression are evaluated can be populated.

If the resulting value contains newlines, and there was indentation before the
start delimiter, the indentation is preserved before each newline. This allows
for prettier formatting of the output.""",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    parser.add_argument(
        "input",
        type=Path,
        help="File to read from and evaluate expressions in",
    )
    parser.add_argument(
        "output",
        type=Path,
        help="File to write the content of the input with evaluated expressions",
    )
    parser.add_argument(
        "-v",
        "--verbose",
        default=0,
        action="count",
        help="Increase verbosity",
    )

    parsing_group = parser.add_argument_group(title="parsing arguments")
    parsing_group.add_argument(
        "-d",
        "--delimiters",
        default=["$$"],
        nargs="+",
        help=(
            "Delimiters that marks the start and end of an expression."
            " If only one is provided, it is used as both the start and end delimiter."
            " If two are used, the first is the start delimiter, the second is the end delimiter."
        ),
    )
    parsing_group.add_argument(
        "-i",
        "--indent",
        default=" " * 4,
        help=(
            "Additional indentation when embedding a multi-line value inside a "
            "single line. Defaults to 4 spaces."
        ),
    )

    namespace_group = parser.add_argument_group(title="namespace arguments")
    namespace_group.add_argument(
        "-g",
        "--global-namespaces",
        type=str,
        nargs="*",
        default=[],
        help=(
            "Namespaces to load into the global namespace."
            " The packages and modules are loaded from left to right and can overwrite previous values."
            " The syntax is the same than the python 'import' statement, but you can end the dotted chain by an attribute of a module."
        ),
    )
    namespace_group.add_argument(
        "-l",
        "--local-namespaces",
        type=str,
        nargs="*",
        default=[],
        help=(
            "Namespaces to load into the local namespace."
            " The packages and modules are loaded from left to right and can overwrite previous values."
            " The syntax is the same than the python 'import' statement, but you can end the dotted chain by an attribute of a module."
            " The local namespace can be edited by expressions with side-effects, such as the walrus operator ':='."
        ),
    )

    args = parser.parse_args()
    # check arguments
    if not args.input.is_file():
        parser.error(f"{args.input!s} doesn't exists or is not a file")
    if not isinstance(args.delimiters, list):
        args.delimiters = [args.delimiters]
    if not 0 < len(args.delimiters) < 3:
        parser.error("there must be one or two delimiters")

    main(**vars(args))
