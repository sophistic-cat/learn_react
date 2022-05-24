module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        
  rules: {
    'no-use-before-define': 'off',
    'no-sparse-arrays': 'off',
    'react/display-name': 'off',
    'no-unused-vars': 'off',
    'no-array-constructor': 'off',
    'node/handle-callback-err': 'off',
    'react/prop-types': 'off',
    eqeqeq: 'off',
    semi: ['error', 'always'],
    'no-undef': 'off',
    'no-empty-pattern': 'off',
    'array-callback-return': 'off',
    'no-new-wrappers': 'off',
    'new-cap': 'off',
    'react/jsx-key': 'off',
    'no-empty': 'off',
    'no-useless-escape': 'off',
    camelcase: 'off',
    'react/jsx-no-comment-textnodes': 'off',
    'promise/param-names': 'off',
    'no-tabs': 'off',
    'no-prototype-builtins': 'off',
    'no-shadow-restricted-names': 'off'
    }
    }
};
