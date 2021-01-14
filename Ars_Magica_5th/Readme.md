# Ars Magica 5th

## Usage
The final sheet file `Ars_Magica_5th.html` is generated from a template. To modify it:
- Modify `template.html`
    - You can use python code to generate repeating parts. See `generate.py` and `parts/__init__.py` and below for details and helper code
- Run `generate.py` (requires python 3.8+)

### Using `generate.py`
The script will read `template.html` and replace parts of the form `$$identifier$$` by the value found under that identifier in the dictionary `part` defined in `parts/__init__.py`. This makes it possible to use python code to generate repeating parts of the sheet. You can find examples in `__init__.py`.

It is not necessary to put all code in `parts/__init__.py`. You can use other files, import the helpers you need from `parts/helpers.py`, and then import the final value in `parts/__init__.py` and assign it to an identifier.

If you are unfamiliar with python, you can write everythin manually in `template.html`, though modifying what is already python-generated will require looking at the code.

## Translation Notes

Some of the translation tag name have suffixes to indicate where they are used. If a particular tag is used in several places, I haven't added any suffixes.

- `-rt` : Used in a roll template. Example: "defend-rt"
- `-m` : Used in a roll button macros or similar. Example: "weakness-m"
