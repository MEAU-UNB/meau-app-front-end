export default ({ config
}) => ({
  ...config,
  name: "meau-expo",
  slug: "meau-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "meau-expo",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    package: "com.gabrielbf.meauapp",
    googleServicesFile: process.env.GOOGLE_SERVICES_FILE
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png"
  },
  plugins: [
    "expo-router",
    "expo-font",
    [
      "expo-image-picker",
      {
        photosPermission: "The app accesses your photos to let you share them with your friends."
      }
    ],
    "expo-secure-store"
  ],
  experiments: {
    typedRoutes: true
  },
  extra: {
    router: {
      origin: false
    },
    eas: {
      projectId: "e9561e50-885a-429a-8ac4-f0910b6d5597"
    }
  },
  owner: "gabrielbf"
});
