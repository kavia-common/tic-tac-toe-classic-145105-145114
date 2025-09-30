@ECHO OFF
SET CMD=%1
IF EXIST ".\android\gradlew.bat" (
  CALL .\android\gradlew.bat %CMD%
  EXIT /B %ERRORLEVEL%
)
ECHO [frontend gradle shim] Expo managed project: skipping "%CMD%".
EXIT /B 0
