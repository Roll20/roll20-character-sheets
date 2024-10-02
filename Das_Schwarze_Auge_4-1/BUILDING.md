# Building the Character Sheet Files
Since February 2024 the two character sheet files are no longer edited directly, but built using the program `make` and a very basic `Makefile`. It was only tested with GNU Make.

The files are concatenated from shorter topic-centred files. All of these topic-centred files reside in the `dev` directory. Always work only on those files, never on the two main character sheet files directly. When running make, changes to the main files can easily get overwritten and there will be no way to get your changes back! The typical workflow looks like this:

* Edit one or more files inside the `dev` directory
* Using a terminal/shell run the command `make` in the sheet's top directory. The top directory contains the Makefile and the two character sheet files.
* Upload the two freshly generated character sheet files to Roll20 for playtesting

## No Make
In case you do not have Make or do not want to use it, you can easily recreate what it does: The `Makefile` contains three long variable definitions with paths to files. The files are taken in the order given (variable `HTML` includes `JS` making the `.html` file; variable `CSS` makes the `.css` file) and are concatenated which adds a newline after each file.

## Coda
That's it! While Makefiles can be quite more powerful generally, I opted for a very simple one and hope that it might make sense to anyone editing this sheet after me.

One final piece of advice: When working on new features only commit the main files at the end of development prior to publication/pull request in a dedicated commit with nothing else. That way, Git does not show you duplicate history in every diff.

