@ECHO OFF
SET CMD=%1
IF EXIST ".\tic_tac_toe_frontend\android\gradlew.bat" (
  CALL .\tic_tac_toe_frontend\android\gradlew.bat %CMD%
  EXIT /B %ERRORLEVEL%
)
ECHO [container gradle shim] Expo managed project: skipping "%CMD%".
EXIT /B 0
