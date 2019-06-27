const htmlTemplate = require('html-webpack-template');

// Webpack Plugins
const { CheckerPlugin } = require('awesome-typescript-loader');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HtmlPlugin = require('html-webpack-plugin');
const WebAppPlugin = require('webapp-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

const { joinRelativeToProjectRootDirectory } = require('../utils');

module.exports = function() {
    return {
        entry: {
            main: joinRelativeToProjectRootDirectory('src', 'main.ts')
        },
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
            }),
            new HtmlPlugin({
                title: 'node-ts-website-starter',
                inject: false,
                template: htmlTemplate,
                mobile: true,
                lang: 'en-US',
                alwaysWriteToDisk: true // Needed for webpack-dev-server. Only applies to development.
            }),
            new WebAppPlugin({
                logo: joinRelativeToProjectRootDirectory(
                    'assets',
                    'img',
                    'icon.png'
                ),
                inject: 'force',
                cache: true
            }),
            new GenerateSW({
                clientsClaim: true,
                skipWaiting: true,
                runtimeCaching: [{
                    urlPattern: '/app.config.json',
                    handler: 'NetworkFirst',
                    options: {
                        networkTimeoutSeconds: 5,
                        cacheName: 'source-cache',
                        expiration: {
                            maxEntries: 10,
                            maxAgeSeconds: 5 * 60 // 5 minutes
                        },
                        cacheableResponse: {
                            statuses: [0, 200]
                        }
                    }
                }]
            })
        ],
        output: {
            path: joinRelativeToProjectRootDirectory('dist'),
            filename: '[name].[hash].js'
        },
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all'
            }
        },
        resolve: {
            extensions: ['.js', '.ts']
        },
        target: 'web'
    };
};
