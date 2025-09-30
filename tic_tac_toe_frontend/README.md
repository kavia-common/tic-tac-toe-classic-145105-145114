# Tic Tac Toe - Ocean Professional

A React Native (Expo) mobile app to play Tic Tac Toe against a second player or AI. The app features the "Ocean Professional" modern theme: blue primary, amber secondary, rounded corners, gradients, and subtle shadows.

Features
- Play vs AI (easy, medium, hard) or local 2P
- Smart AI strategies with minimax for hard
- Persistent settings and scores via AsyncStorage
- Themed UI components and lightweight internal router
- Accessible controls and responsive layout

Scripts
- npm start: run in Expo
- npm run android / ios / web: platform targets
- npm run prebuild:android: generate native android project locally (Expo prebuild)
- npm run build: performs prebuild and invokes Gradle in the generated android folder

Notes
- Only minimal dependencies are used: expo-linear-gradient, @react-native-async-storage/async-storage.
- This project uses Expo managed workflow. The gradle wrapper is created only after running "npm run prebuild:android".
- No sounds or haptics included by design.
