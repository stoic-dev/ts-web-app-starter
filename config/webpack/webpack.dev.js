const merge = require('webpack-merge');

// Webpack Plugins

const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const HtmlPersistencePlugin = require('html-webpack-harddisk-plugin');

const commonAppConfig = require('../app/app.common.config');
const devAppConfig = require('../app/app.dev.config');
const { joinRelativeToProjectRootDirectory } = require('../utils');
const commonWebpackConfig = require('./webpack.common')();

module.exports = function() {
    const devWebpackConfig = {
        devServer: {
            contentBase: joinRelativeToProjectRootDirectory('dist'),
            compress: true,
            port: 8000,
            publicPath: '/',
            writeToDisk: true
        },
        devtool: 'inline-source-map',
        mode: 'development',
        output: {
            publicPath: '/'
        },
        plugins: [
            new HtmlPersistencePlugin(),
            new GenerateJsonPlugin(
                'app.config.json',
                Object.assign(commonAppConfig, devAppConfig)
            )
        ]
    };

    return merge(commonWebpackConfig, devWebpackConfig);
};
