module.exports = {
  env: {
    browser: true,
    es6: true,
    amd: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: '2017',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [
      1,
      {extensions: ['.js', '.jsx', '.ts', '.tsx']},
    ],
    // Adjustments for line breaks
    'implicit-arrow-linebreak': 'off', // Disable implicit arrow line breaks
    'multiline-ternary': ['error', 'never'], // Ensure ternary operators stay on one line
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
};
