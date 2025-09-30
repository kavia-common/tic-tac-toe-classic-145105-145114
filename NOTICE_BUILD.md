# Build Notice (Expo-Managed Workflow)

This repository is an Expo-managed React Native project. Native Android/iOS folders are not committed by design.

If your CI or analysis tool calls `./gradlew` from the repository root, use the provided shims:
- ./gradlew (delegates to tic_tac_toe_frontend/android/gradlew)
- ./gradlew.bat on Windows

Additional compatibility files exist for analyzers expecting a Gradle project at the root:
- gradle/wrapper/gradle-wrapper.properties
- settings.gradle
- build.gradle (shim task that guides usage)
- gradle.properties

Recommended build flows:
- Development: npm start
- Local native build: (cd tic_tac_toe_frontend && npm run build:android:ci)
- CI native build: use npm run build:android:ci within tic_tac_toe_frontend, or prefer EAS builds

See:
- kavia-docs/Build_and_Run_Guide.md
- kavia-docs/CI_Configuration_Guide.md
- kavia-docs/CI_Troubleshooting.md
