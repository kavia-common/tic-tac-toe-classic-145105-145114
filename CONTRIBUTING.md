# Contributing

- This is an Expo Managed React Native app.
- App code lives under `tic_tac_toe_frontend/`.
- Use the provided scripts:
  - Root: `npm run build` (CI-safe no-op), `npm run lint`, `./build.sh`
  - Frontend: `npm start`, `npm run lint`, `npm run prebuild:android`, `npm run build-android`
- Avoid invoking `./gradlew` directly unless you have run prebuild to generate native projects.

Code style:
- TypeScript strict mode enabled; avoid `any`.
- Keep UI consistent with Ocean Professional theme in `src/theme.ts`.
- Place shared UI under `src/components` and utilities under `src/utils`.

PR checklist:
- Lint passes.
- No new runtime dependencies without updating package.json and docs.
