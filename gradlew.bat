@echo off
REM Workspace-level Gradle shim to support CI/analyzers invoking from repo root.
SET FRONTEND_WRAPPER=tic_tac_toe_frontend\android\gradlew.bat

IF EXIST "%FRONTEND_WRAPPER%" (
  "%FRONTEND_WRAPPER%" %*
  EXIT /B %ERRORLEVEL%
) ELSE (
  ECHO Gradle wrapper not found. This is an Expo-managed app without native projects generated.
  ECHO Use "npm run build:android:ci" in tic_tac_toe_frontend or run "npx expo prebuild --platform android" first.
  EXIT /B 127
)
