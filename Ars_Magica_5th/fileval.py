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
from typing import Any, Dict, Generator, NoReturn, TextIO

if sys.version_info < (3, 8):
    raise RuntimeError("This script requires python 3.8 or higher")

SENTINEL = object()

is_whitespace = re.compile(r"^\s*$").match


class HandledException(Exception):
    """
    Exception that was already printed
    """


def process_template(
    in_file: TextIO,
    occurence_re: re.Pattern,
    expr_re: re.Pattern,
    globalns: Dict[str, Any],
    localns: Dict[str, Any],
) -> Generator[str, None, None]:
    """
    Read line from a file and evaluates occurences of occurence_re
    """
    for lineno, line in enumerate(in_file, start=1):
        # check presence of occurence
        if not occurence_re.search(line):
            yield line
            continue
        # process all occurences
        line_parts = []
        for part in occurence_re.split(line):
            match = expr_re.match(part)
            if not match:
                line_parts.append(part)
                continue
            # evaluate the expression
            try:
                value = eval(match["expr"], globalns, localns)
            except Exception as err:
                print(f"Expression at line {lineno} raised an exception")
                print("Offending expression:", match[0])
                print(
                    "Exception raised:\n\n",
                    "".join(tb.format_exception(type(err), err, err.__traceback__)),
                )
                raise HandledException from err
            if not isinstance(value, str):
                print(f"Expression at line {lineno} does not evaluate to a string")
                print(f"Offending expression:", match[0])
                raise HandledException from ValueError(
                    f"{match[0]} does not evaluate to a string"
                )
            if len(line_parts) == 1 and is_whitespace(line_parts[0]):
                value = ("\n" + line_parts[0]).join(value.split("\n"))
            line_parts.append(value)
        yield "".join(line_parts)


def main(parser: argparse.ArgumentParser, args: argparse.Namespace) -> NoReturn:
    """
    Main script entry point
    """
    # check arguments
    if not args.input.is_file():
        parser.error(f"{args.input!s} doesn't exists or is not a file")
    if not isinstance(args.delimiters, list):
        args.delimiters = [args.delimiters]
    if not 0 < len(args.delimiters) < 3:
        parser.error("there must be one or two delimiters")

    # build delimiter regex
    start_delimiter = re.escape(args.delimiters[0])
    end_delimiter = re.escape(
        args.delimiters[0] if len(args.delimiters) == 1 else args.delimiters[1]
    )
    # global group to get what is inbetween the occurences when using split()
    occurence_re = re.compile(rf"({start_delimiter}.*?{end_delimiter})")
    # group with the expression to retrieve it
    expr_re = re.compile(rf"{start_delimiter}(?P<expr>.*?){end_delimiter}")

    # load namespaces
    globalns, localns = {}, {}
    for ns, source_list in zip(
        (globalns, localns),
        (args.global_namespaces, args.local_namespaces),
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
                    "error: Could not load {name} due to:",
                    "".join(tb.format_exception(type(err), err, err.__traceback__)),
                    sep="\n\n",
                )
                exit(-1)

    # process and write lines
    with args.input.open() as in_file:
        try:
            with args.output.open("wt") as out_file:
                out_file.writelines(
                    process_template(
                        in_file,
                        occurence_re,
                        expr_re,
                        globalns,
                        localns,
                    )
                )
        except HandledException:
            print("An error occured, see above")
            print("Deleting output file ...")
            args.output.unlink(missing_ok=True)
        except Exception as err:
            print("An unhandled error occured, see below")
            print("Deleting output file ...")
            args.output.unlink(missing_ok=True)
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
    main(parser, args)
