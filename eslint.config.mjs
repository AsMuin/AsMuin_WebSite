import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';

export default [
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReactConfig,
    {
        languageOptions: {
            globals: globals.browser,
            sourceType: 'commonjs'
        },
        settings: {
            react: {
                version: 'detect'
            }
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
            'react/jsx-uses-react': 'off'
        }
    }
];
