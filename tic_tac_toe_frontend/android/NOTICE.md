# Android Directory Notice

This android directory only contains placeholder files so that automated CI/analyzers that call `./gradlew` do not fail with an unhelpful "No such file" error.

These files will be replaced by real native project files after running:
- npx expo prebuild --platform android
- or `npm run build:android:ci`

If you see this notice during a build, your pipeline has not executed the prebuild step yet. Update your CI to follow the guidance in:
- kavia-docs/CI_Configuration_Guide.md
- kavia-docs/CI_Troubleshooting.md
