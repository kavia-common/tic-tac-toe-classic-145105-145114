This is a stub Gradle wrapper directory for an Expo managed project.

- The actual Gradle wrapper (including gradle-wrapper.jar) is generated after running `expo prebuild`.
- CI tools that inspect the presence of this folder should not attempt to execute Gradle unless the native project exists.

If you need a native build:
1) cd tic_tac_toe_frontend
2) npm run prebuild:android
3) npm run build-android
