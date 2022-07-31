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
from types import ModuleType
from typing import Any, Dict, Generator, List, NoReturn, TextIO, Tuple, Union

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
        indent = ""
        while (start := line.find(start_delimiter, end)) >= 0:
            if end == 0 and is_whitespace(line[:start]):
                indent = line[:start]
            yield line[end:start]
            start += len(start_delimiter)
            expr = ""
            offset = 0
            while (end := line.find(end_delimiter, start)) < 0:
                expr += line[start:]
                line = next(in_file)
                offset += 1
                start = 0
            expr += line[start:end]

            try:
                value = eval(expr, globalns, localns)
            except Exception as err:
                print(
                    f"Expression at line {lineno}{'-' + str(lineno + offset) if offset else ''} raised: {err.__class__.__name__}: {err}",
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
                    f"Expression at line {lineno}{'-' + str(lineno + offset) if offset else ''} does not evaluate to a string"
                )
                if verbose > 0:
                    print(
                        f"Offending expression: ",
                        start_delimiter + expr + end_delimiter,
                    )
                raise HandledException from ValueError(
                    f"{start_delimiter + expr + end_delimiter} does not evaluate to a string"
                )

            if indent:
                value = value.replace("\n", "\n" + indent)

            yield value
            end += len(end_delimiter)
            lineno += offset
            offset = 0
        yield line[end:]


def main(
    input: Path,
    output: Path,
    delimiters: Union[Tuple[str], Tuple[str, str]],
    global_namespaces: List[str] = (),
    local_namespaces: List[str] = (),
    verbose: int = 0,
) -> NoReturn:
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
        for name in source_list:
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
                    f"error: Could not load {name} due to "
                    f"{err.__class__.__name__}: {err}",
                    end="",
                )
                if verbose < 1:
                    print(" (use -v to display detailed traceback)")
                else:
                    print(
                        "\n\n"
                        + "".join(
                            tb.format_exception(type(err), err, err.__traceback__)
                        )
                    )
                exit(-1)

    # process and write lines
    with input.open() as in_file:
        try:
            with output.open("wt") as out_file:
                out_file.writelines(
                    process_template(
                        in_file,
                        start_delimiter,
                        end_delimiter,
                        globalns,
                        localns,
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

    delimiter_group = parser.add_argument_group(title="delimiter arguments")
    delimiter_group.add_argument(
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
