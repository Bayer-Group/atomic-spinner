module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  ignorePatterns: [
    'lib/',
    'demo/',
    'cypress/',
    'cypress.config.ts',
    '**/*.cy.tsx'
  ],
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {},
  settings: {
    react: {
      version: 'detect'
    }
  }
}
