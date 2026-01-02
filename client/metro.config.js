const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

const config = {
  resolver: {
    // Add 'ogg' and 'm4a' to the list of known assets
    assetExts: [...assetExts, 'ogg', 'm4a'],
  },
};

module.exports = mergeConfig(defaultConfig, config);
