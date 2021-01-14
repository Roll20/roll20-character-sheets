#!/usr/bin/env python3
"""
Quick python script to generate Roll20's Ars Magica 5 character sheet

Allows using custom code for parts of the sheet. Currently used to handle repetitions
"""
import argparse
import importlib
import re
import sys
from pathlib import Path
from types import ModuleType
from typing import Dict, Generator, NoReturn, TextIO

if sys.version_info < (3, 8):
    raise RuntimeError("This script requires python 3.8 or higher")

SENTINEL = object()

is_whitespace = re.compile(r"^\s*$").match


def process_template(
    template: TextIO,
    occurence_re: re.Pattern,
    marker_re: re.Pattern,
    parts: Dict[str, str],
) -> Generator[str, None, None]:
    """
    Read line from a file and replace occurences of occurence_re with parts[m["name"]]
    where `m` is marker_re.match on the occurence
    """
    for line in template:
        # check presence of occurence
        if not occurence_re.search(line):
            yield line
            continue
        # process all occurences
        line_parts = []
        for part in occurence_re.split(line):
            match = marker_re.match(part)
            if not match:
                line_parts.append(part)
                continue
            # replace the marker
            part = parts.get(match["name"], SENTINEL)
            if part is SENTINEL:
                raise NameError(f"Undefined replacement '{match['name']}'")
            # handle indentation
            part = str(part)
            if len(line_parts) == 1 and is_whitespace(line_parts[0]):
                part = ("\n" + line_parts[0]).join(part.split("\n"))

            line_parts.append(part)
        yield "".join(line_parts)


def main(parser: argparse.ArgumentParser, args: argparse.Namespace) -> NoReturn:
    """
    Main script entry point
    """
    # check arguments
    if not args.template.is_file():
        parser.error(f"{args.template!s} doesn't exists or is not a file")
    if not args.subdir.is_dir():
        parser.error(f"{args.subdir!s} doesn't exists or is not a directory")
    if not args.subdir.parent == Path():
        parser.error(
            f"{args.subdir.resolve()!s} is not a subfolder of the current directory {Path().resolve()!s}"
        )
    # build marker regex
    # global parenthesis to get what is inbetween the occurences
    occurence_re = re.compile(
        "("
        + re.escape(args.delimiter)
        + r"[A-Za-z][A-Za-z0-9_]*?"
        + re.escape(args.delimiter)
        + ")"
    )
    # only recover the name of the marker
    marker_re = re.compile(
        re.escape(args.delimiter)
        + r"(?P<name>[A-Za-z][A-Za-z0-9_]*?)"
        + re.escape(args.delimiter)
    )
    # load submodule
    submodule = importlib.import_module(str(args.subdir))
    # process and write lines
    with args.template.open() as template:
        try:
            with args.output.open("wt") as output:
                output.writelines(
                    process_template(
                        template,
                        occurence_re,
                        marker_re,
                        getattr(submodule, "parts", {}),
                    )
                )
        except Exception as err:
            print("An error occured, see below")
            print("Deleting output file ...")
            args.output.unlink(missing_ok=True)
            print()
            raise err


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="""
Generate Roll20's Ars Magica 5 character sheet

This script will find specific markers inside a template file, and look into
a subdirectory for python module providing that part. The structure of the marker
is: [delimiter][name][delimiter]. The name part should contain only alphanumeric
characters or underscores, and should start with a letter.

The script will load the subdirectory as a python module and replace the
above marker with value found in the submodule "parts" attribute, under the name
specified in the marker. If that value spans multiple lines, the indentation before
the marker is repeated before each line""",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter,
    )
    parser.add_argument(
        "template",
        type=Path,
        nargs="?",
        default="template.html",
        help="Template file to read from and replace parts in",
    )
    parser.add_argument(
        "output",
        type=Path,
        nargs="?",
        default="Ars_Magica_5th.html",
        help="Output file to produce. Should match what is specified in sheet.json",
    )
    parser.add_argument(
        "--delimiter",
        type=str,
        default="$$",
        help="Delimiter to mark the start of end of marker",
    )
    parser.add_argument(
        "--subdir",
        type=Path,
        default="parts",
        help="Subdirectory to load as a module, to find marker content",
    )

    args = parser.parse_args()
    main(parser, args)
