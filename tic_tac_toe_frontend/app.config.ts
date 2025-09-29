import { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'reactnative',
  slug: 'reactnative',
  scheme: 'reactnative',
  version: '1.0.0',
  orientation: 'portrait',
  userInterfaceStyle: 'light',
  platforms: ['ios', 'android', 'web'],
  experiments: { typedRoutes: false },
};

export default config;
