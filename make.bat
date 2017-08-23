@echo off 

set AAA=""
set HOME=%cd%
set TOOLS=%HOME%\tools
set DATA_GENERATE=%TOOLS%\data\python

set DATA_XLSX=%DATA_GENERATE%\..\mygameConfig.xls

set OUTPUT=%HOME%\generate

python %DATA_GENERATE%\main.py -i %DATA_XLSX% -o %OUTPUT%

xcopy /Y %OUTPUT%\JSDATA.js %HOME%\assets\src

pause

