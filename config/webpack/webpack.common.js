const externals = [require('webpack-node-externals')()];

// Webpack Plugins
const { CheckerPlugin } = require('awesome-typescript-loader');
const DefinePlugin = require('webpack/lib/DefinePlugin');

const { joinRelativeToProjectRootDirectory } = require('../utils');

module.exports = function() {
    return {
        entry: {
            main: joinRelativeToProjectRootDirectory('src', 'main.ts')
        },
        externals,
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: [
                        {
                            loader: 'babel-loader'
                        },
                        {
                            loader: 'awesome-typescript-loader',
                            options: {
                                useCache: true
                            }
                        }
                    ],
                    exclude: [/(^(config|node_modules)$|\.spec\.ts$)/]
                },
                {
                    test: /\.js$/,
                    loader: 'source-map-loader',
                    enforce: 'pre',
                    exclude: [/^(node_modules|config)$/]
                }
            ]
        },
        node: {
            __dirname: false
        },
        plugins: [
            new CheckerPlugin(),
            new DefinePlugin({
                DEFAULT_CONFIG_PATH: JSON.stringify(
                    joinRelativeToProjectRootDirectory(
                        'dist',
                        'app.config.json'
                    )
                )
            })
        ],
        output: {
            path: joinRelativeToProjectRootDirectory('dist'),
            filename: 'main.js'
        },
        resolve: {
            extensions: ['.js', '.ts']
        },
        target: 'node'
    };
};
