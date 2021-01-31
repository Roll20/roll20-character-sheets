@ECHO OFF

pushd %~dp0

REM Command file for generating Ars Magica 5th sheet
REM This is meant to replace the Makefile on Windows

python3 fileval.py template.html Ars_Magica_5th.html --global-namespaces arm5_py_integration.GLOBALS
python3 fileval.py template.css Ars_Magica_5th.css --global-namespaces arm5_py_integration.GLOBALS
popd