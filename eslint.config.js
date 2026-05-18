const js = require('@eslint/js')
const prettier = require('eslint-plugin-prettier/recommended')

module.exports = [
    js.configs.recommended,
    prettier,
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'commonjs',
            globals: {
                process: 'readonly',
                console: 'readonly',
                module: 'readonly',
                require: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
            },
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-console': 'off',
        },
    },
    {
        ignores: ['node_modules/', 'package-lock.json'],
    },
]
