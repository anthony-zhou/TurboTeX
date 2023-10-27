module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:import/recommended',
    'airbnb',
    'airbnb-typescript',
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
    'import/extensions': [
      'off',
    ],
    'react/no-unknown-property': [
      2,
      {
        ignore: [
          'jsx',
          'global',
        ],
      },
    ],
    'react/react-in-jsx-scope': 'off',
  },
};
