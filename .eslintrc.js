module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': 'error', // Enforces Prettier formatting
    'react/prop-types': 'off', // Turns off prop-types since TypeScript is used
    'react/react-in-jsx-scope': 'off', // No need to import React in React 17+

    // TypeScript-specific rules
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warns on unused vars, but ignores ones with a leading underscore
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Turns off requirement to define return types for functions
    '@typescript-eslint/no-explicit-any': 'warn', // Warns when 'any' is used, but doesn't error
    '@typescript-eslint/ban-ts-comment': 'warn', // Warns when @ts-ignore is used, but doesn't error
    '@typescript-eslint/consistent-type-imports': 'warn', // Suggests consistent usage of type imports
    '@typescript-eslint/ban-types': 'off', // Disables banning certain types like `{}` or `object`
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
};
