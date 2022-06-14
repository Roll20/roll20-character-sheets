@ECHO OFF

pushd %~dp0

REM Command file for generating Ars Magica 5th sheet
REM This is meant to replace the Makefile on Windows

python3 fileval.py Ars_Magica_5th.template.html Ars_Magica_5th.html --global-namespaces arm5_py_integration.EXPORTS
python3 fileval.py Ars_Magica_5th.template.css Ars_Magica_5th.css --global-namespaces arm5_py_integration.EXPORTS
popd