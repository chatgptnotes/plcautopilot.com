@ECHO OFF
ECHO Delete orphaned anchors ...
tsactdiags_schneide_app.exe -r -o "%TEMP%\tsactdiags_schneide_app.log"
tsactdiags_schneide_svr.exe -r -o "%TEMP%\tsactdiags_schneide_svr.log"


