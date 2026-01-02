module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/assets/fonts/'], // Keep your existing assets config if you have it
  dependencies: {
    'react-native-audio-playback': {
      platforms: {
        android: null, // <--- THIS TELLS GRADLE TO IGNORE IT
      },
    },
  },
}
