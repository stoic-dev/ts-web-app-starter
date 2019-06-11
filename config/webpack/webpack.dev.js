const merge = require('webpack-merge');

// Webpack Plugins

const GenerateJsonPlugin = require('generate-json-webpack-plugin');

const commonAppConfig = require('../app/app.common.config');
const devAppConfig = require('../app/app.dev.config');
const commonWebpackConfig = require('./webpack.common')();

module.exports = function() {
    const devWebpackConfig = {
        devtool: 'inline-source-map',
        mode: 'development',
        plugins: [
            new GenerateJsonPlugin(
                'app.config.json',
                Object.assign(commonAppConfig, devAppConfig)
            )
        ]
    };

    return merge(commonWebpackConfig, devWebpackConfig);
};
