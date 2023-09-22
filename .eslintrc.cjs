module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'airbnb-typescript'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 'off',
    'no-console': 'off',
  },
  overrides: [
    {
      files: ['**/server/**/*.ts', '**/server/**/*.tsx'],
      rules: {
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            'js': 'never',
            'jsx': 'never',
            'ts': 'always',
            'tsx': 'always',
          },
        ],
      },
    },
  ],
}
