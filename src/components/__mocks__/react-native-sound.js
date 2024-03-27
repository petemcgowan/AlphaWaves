// __mocks__/react-native-sound.js

// Import the actual, unmodified react-native-sound
const mockReactNativeSound = require('react-native-sound');

jest.mock('react-native-sound', () => ({
  ...mockReactNativeSound,
  Sound: jest.fn().mockImplementation(() => ({
    setVolume: jest.fn(),
    setNumberOfLoops: jest.fn(),
  })),
}));
