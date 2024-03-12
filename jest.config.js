module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  moduleDirectories: ['node_modules', 'src', 'tests', 'mocks'], // Adding the 'mocks' directory
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-vector-icons)/)',
  ],
  resetMocks: false,
};
