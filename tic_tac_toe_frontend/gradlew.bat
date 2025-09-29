@ECHO OFF
REM Workspace-level Gradle wrapper shim for Expo managed projects (Windows).
IF EXIST "android\gradlew.bat" (
  ECHO Delegating to android\gradlew.bat %*
  CD android
  CALL gradlew.bat %*
  EXIT /B %ERRORLEVEL%
) ELSE (
  ECHO gradlew shim (workspace, Windows): Android project not initialized (Expo managed).
  ECHO Run "npm run prebuild:android" to generate .\android, then re-run your Gradle command.
  EXIT /B 0
)
