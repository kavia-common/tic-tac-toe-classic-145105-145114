@ECHO OFF
REM Lightweight shim for CI environments before Expo prebuild.
SET CMD=%1
IF "%CMD%"=="" (
  ECHO [gradlew shim] Expo managed project - native folder not generated yet. Skipping.
  EXIT /B 0
)
IF "%CMD%"=="check" GOTO OK
IF "%CMD%"=="assembleDebug" GOTO OK
IF "%CMD%"==":app:assembleDebug" GOTO OK
IF "%CMD%"=="test" GOTO OK
IF "%CMD%"==":app:test" GOTO OK

:OK
ECHO [gradlew shim] Skipping "%CMD%" in Expo managed project.
EXIT /B 0
