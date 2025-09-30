If your CI invokes ./gradlew before Expo prebuild generates native projects, use ./gradlew.sh or run:
  (cd tic_tac_toe_frontend && npm run prebuild:android)
This repository is an Expo managed app; the native android/ gradle wrapper is generated during prebuild.
