module.exports = {
    parser: 'babel-eslint',
    env: {
        browser: true,
        es2021: true,
        amd: true,
        node: true,
        jest: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
        },
    },
    plugins: ['eslint-plugin-babel', 'react', 'react-hooks'],
    rules: {
        // Disable `no-console` rule
        'no-console': 0,
        // Give a warning if identifiers contain underscores
        'no-underscore-dangle': 0,
        'no-empty-pattern': 0,
        'react/prop-types': [0],
        'react-hooks/rules-of-hooks': 'error',
        'react/display-name': [0, { ignoreTranspilerName: true }],
    },
};
