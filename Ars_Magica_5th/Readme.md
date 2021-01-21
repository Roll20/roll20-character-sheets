# Ars Magica 5th


## Usage
This sheet uses python integration to make some code section easier.
The final sheet file `Ars_Magica_5th.html` is generated from a template.
**Do not modify it direclty**, as changes will be overwritten.
To contibute:
1. Modify `template.html`. You can use python integration to make things easier, see below
2. Run `generate.py` (requires python 3.8+ and some packages, see below)
3. commit your changes





## Python Integration
The python integration in this sheets allows to use python code to generate some parts of the sheet. It useful for repeating section, and integrating the markdown documentation directly into the sheet.


### Installation
You will need Python version 3.8 or higher to run the script. You can install it from [Python Website](https://www.python.org/), or using your system package manager, such as `apt`, or other managers such as Conda.

The script requires some additional package to convert the markdown documentation to HTML. To install them, use the `pip` commands that comes with python. Navigates to this directory and execute:

```
pip3 -r requirements.txt
```

Pip will read the `requirements.txt` file that is right alongside this Readme, and install all required packages from there.


### Usage
The python integration reads the template file `template.html`, add some code-generated HTML into it and writes the result to `Ars_Magica_5th.html`. To place python-generated HTML into the read template, it must detect where to put it, and what to put.

Where to put the generated HTML is found by looking for identifier written in `template.html` as `$$name$$`. The `name` is retain to find what to fill in (see below), and must contain only alphanumeric characters or `_`. If the replacement spans multiple lines, and the `$$name$$` marker was at the beginning of a line, the identation before the marker is added to each line of the replacement. This properly preserves indentation.

To find what to put in place of the marker, the script will load the package `parts` that is right alongside this Readme. (If you are unfamiliar with python, that means executing the file `parts.__init__.py` and keeping whatever was defined in there). When replacing `$$name$$`, it will look for `name` (without the dollar signs) in the dictionary names `parts` in `parts.__init__.py`, and copy the string it finds there.

This means you can use python howerver you want to programmatically generate HTML, put the result in the `parts` dictionary, and include that into the sheet. You will find some examples in the various files in the `parts/` directory alongside this Readme.


### Advanced Usage
Since most of the python code consist of generating highly similar parts of the sheet automatically (e.g. all the choices in a dropdown for the arts, the characteristics etc.), you will find some helper functions in `parts/herlpers.py` that you can use. Refer to there docstring and examples in other files on how to use them.


### Running `generate.py`
If you are on unix, the file is executable and uses the `python3` command so
```
$ ./generate.py
```
should do the work.

If that is not the case, or you are on windows, you can use:
```
> python3 generate.py
```

>**Warning**
>
> Be careful to execute the command inside this directory, it write the final sheet in the directory it was run






## Documentation
This sheet includes a documentation to explain how it works and obscure parts in the file `documenation.md`. When you generate the final sheet with `generate.py`, it is converted to HTML and embedded into the sheet, so that players can easily access it in-game.



## Translation Notes
Some of the translation tag name have suffixes to indicate where they are used. If a particular tag is used in several places, I haven't added any suffixes.

- `-rt` : Used in a roll template. Example: "defend-rt"
- `-m` : Used in a roll button macros or similar. Example: "weakness-m"
