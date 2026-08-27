module.exports = {
    babelrcRoots: [
        // Keep the root as a root
        '.'
    ],
    sourceType: 'unambiguous',
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: 3
            }
        ],
        '@babel/preset-react'
    ],
    plugins: [
    ],
    overrides: [
        {
            test: /node_modules[\\/]react-router[\\/]/,
            plugins: [
                '@babel/plugin-transform-modules-commonjs',
                '@babel/plugin-transform-dynamic-import'
            ]
        }
    ]
};
