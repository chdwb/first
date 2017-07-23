@echo off 

set HOME=%cd%
set TOOLS=%HOME%\tools
set DATA_GENERATE=%TOOLS%\data\python

set DATA_XLSX=%DATA_GENERATE%\..\gameConfig.xlsx

set OUTPUT=%HOME%\generate

python %DATA_GENERATE%\main.py -i %DATA_XLSX% -o %OUTPUT%

pause

