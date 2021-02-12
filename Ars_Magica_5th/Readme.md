# Ars Magica 5th


## Usage
This sheet uses python integration to make some HTML and/or CSS code section easier.
The final sheet file `Ars_Magica_5th.html` is generated from a template.
**Do not modify it direclty**, as changes will be overwritten.
To contibute:
1. Modify `template.html`. You can use python integration to make things easier, see below
2. Run `fileval.py` with proper arguments (requires python 3.8+ and some packages, see below)
    + On unix, use the Makefile by running `make` (this will run `make all` by default)
    + On windows, execute `make.bat` that is meant to execute the same commands
3. commit your changes





## Python Integration
The python integration in this sheets allows to use python code to generate some parts of the sheet. It useful for repeating section, and integrating the markdown documentation directly into the sheet.


### Installation
You will need Python version 3.8 or higher to run the script. You can install it from [Python Website](https://www.python.org/), or using your system's package manager, such as `apt`, or other managers such as Conda.

The script requires some additional package to convert the markdown documentation into HTML. To install them, use the `pip` commands that comes with python. Navigates to this directory and execute:

```
pip3 -r requirements.txt
```
> Note:
>
> On windows, it might be required to run
> ```
> python -m pip requirements.txt
> ```
>
> to get access to pip

Pip will read the `requirements.txt` file that is alongside this Readme, and install all required packages from there.





### Basic usage
The python integration reads the template file `template.html`, evaluates python expressions found in it and writes the result to `Ars_Magica_5th.html`.

The script `fileval.py` (invoked by the Makefile with proper arguments) will look for expression delimited by `$$`. Those expression will be evaluated like python expression (using python's `eval()`) and the resulting value will replace the delimited expression.

The simplest way to use that is to simply put variables name in the HTML (e.g. $$my_name$$), write some external python code to generate what should replace that, and load that value using `fileval.py` namespaces arguments. This is how most replacements in `template.html` currently works.

The `Makefile` is currently configured so that `evalfile.py` loads the directory `arm5_py_integration` as a python package (this means executing the `arm5_py_integration/__init__.py` file) then loads all values in the `GLOBALS` variable (defined in `arm5_py_integration/__init__.py`). All you have to do is write some python code to generate the HTML code you want, give it a name in `GLOBALS` and add a marker in `template.html`.


### Advanced usage
If you want to make more powerful python integration, you'll be writing python expression in `template.html`. For that, you need to know what variables, functions, etc... are available. There are two namespaces for evaluation:

+ the global namespace contains functions, variable, etc... that are available outside of the current scope
+ the local namespace contains things that are available, and will also store variables, functions etc... defined by the expression (local definitions; e.g. with the walrus operator)

When looking for an identifier, python will first look into the local namespace, and then into the global namespace. This means you can mask a global identifier with a local one, so be careful with that.

If you want to add things to the global or local namespace, you can add module paths to the `--global-namespaces` and `--local-namespaces` arguments (do this both in the Makefile and `make.bat` to keep compatibility with Windows and Unix). For instance, you can add `--global-namespaces re` to import python' regular expression module and use it.

For further details, refer to the help message of `fileval.py`.


### Notes
Since most of the python code consist of generating highly similar parts of the sheet automatically (e.g. all the choices in a dropdown for the arts, the characteristics etc.), you will find some helper functions in `parts/herlpers.py` that you can use. Refer to there docstring and examples in other files on how to use them.


### Running `fileval.py`
As `fileval.py` has a number of arguments, it is invoked from the Makefile, or `make.bat` on Windows. You can simply run `make` on both plateform to generate the sheet from the templates.

>**Warning**
>
> Be careful to execute the command inside this directory, it writes the final sheet in the same directory it was run into





## Documentation
This sheet includes a documentation that explain how it works and obscure parts. It is located in the file `documenation.md`. When you generate the final sheet, the documentation is converted to HTML and embedded into the sheet so that players can easily access it in-game.



## Translation Notes
Some of the translation tag name have suffixes to indicate where they are used. If a particular tag is used in several places, I haven't added any suffixes.

- `-rt` : Used in a roll template. Example: "defend-rt"
- `-m` : Used in a roll button macros or similar. Example: "weakness-m"



## Deferred attribute lookup
The sheet uses deferred attribute lookup (or access) for spells and abilities. It is simply a clever way of writing rolls, that fetches the value of an attribute depending on another attribute value. That is, if your spell's art is Creo, you store the value 'creo' in the attribute linked to the spell (so that you can use the name e.g. for inline labels), but you're still able to lookup `Creo_Score` to get the value.

Roll20 engine accepts up to 99-levels of nested attributes lookup using the `@{attr_name}` syntax. The idea is to use adjacent attributes lookup that, when resolve, yields a new attribute lookup. That new attribute will be resolved during the next pass.

This is exactly like having an attribute lookup inside another, but the inner lookup is spread into several attributes. The important things is that all parts are resolved during the same pass.

Here is a table to make this easier to understand. The attributes that makes that possible have the same name as in the sheet.

> Initial formula: `@{sys_at}@{character_name}@{sys_pipe}@{spell_tech_name}_Score@{sys_rbk}`
> 
> **First Pass**
>
> Input: `@{sys_at}@{character_name}@{sys_pipe}@{spell_tech_name}_Score@{sys_rbk}`
> 
> |       | @{sys_at} | @{character_name} | @{sys_pipe} | @{spell_tech_name} | _Score | @{sys_rbk} |
> |:-----:|:---------:|:-----------------:|:-----------:|:------------------:|:------:|:----------:|
> | VALUE |    @{     |       NAME        |      \|     |        Creo        | _Score |      }     |
> 
> Output: `@{NAME|Creo_Score}`
> 
> **Second Pass**
>
> Input: `@{NAME|Creo_Score}`
>
> Output: the character's score in Creo


This makes it possible to use inline labels that shows the name of the attribute that was looked up, e.g.
```
@{sys_at}@{character_name}@{sys_pipe}@{spell_tech_name}_Score@{sys_rbk} [@{spell_tech_name}]
```

Assuming you have a Creo score of 3, this yields `3 [Creo]`, which tells you where that +3 comes from. The sheet pushes this further, as the inline lable uses the same technique for internationalisation (i18n): a sheet worker creates attributes such as `Creo_i18n` that contain the local translation of the word. We then dynamiclly lookup the proper attributes to translate the arts.

While this is less useful for Arts (since many langage just use the Latin word), it is useful for translating characteristics names in ability rolls.