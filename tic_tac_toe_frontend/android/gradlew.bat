@echo off
REM Auto-prebuild Gradle wrapper for Expo-managed workflow on Windows
SETLOCAL ENABLEDELAYEDEXPANSION

SET SCRIPT_DIR=%~dp0

IF EXIST "%SCRIPT_DIR%settings.gradle" GOTO run_gradle
IF EXIST "%SCRIPT_DIR%settings.gradle.kts" GOTO run_gradle

ECHO Android project not found. Running 'npx expo prebuild --platform android' to generate native project...
PUSHD "%SCRIPT_DIR%.."
IF EXIST "package.json" (
  npx expo prebuild --platform android
) ELSE (
  ECHO Could not locate package.json to run prebuild. Aborting.
  EXIT /B 127
)
POPD

:run_gradle
IF EXIST "%SCRIPT_DIR%gradlew" (
  "%SCRIPT_DIR%gradlew" %*
) ELSE (
  ECHO Gradle wrapper still not found after prebuild. Ensure prebuild succeeded and android directory exists.
  EXIT /B 127
)
