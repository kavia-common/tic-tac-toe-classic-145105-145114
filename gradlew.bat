@ECHO OFF
REM Root-level Gradle wrapper shim for Expo managed projects (Windows).
IF EXIST "android\gradlew.bat" (
  ECHO Delegating to android\gradlew.bat %*
  CD android
  CALL gradlew.bat %*
  EXIT /B %ERRORLEVEL%
) ELSE (
  ECHO gradlew shim (root, Windows): Android project not initialized (Expo managed).
  ECHO Run "npm --workspace tic_tac_toe_frontend run prebuild:android" to generate .\android, then re-run your Gradle command.
  EXIT /B 0
)
