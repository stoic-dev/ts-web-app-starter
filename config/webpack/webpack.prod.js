const merge = require('webpack-merge');

// Webpack Plugins

const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const commonAppConfig = require('../app/app.common.config');
const prodAppConfig = require('../app/app.prod.config');
const commonWebpackConfig = require('./webpack.common')();

module.exports = function() {
    const prodWebpackConfig = {
        mode: 'production',
        optimization: {
            minimizer: [new UglifyJsPlugin()]
        },
        plugins: [
            new GenerateJsonPlugin(
                'app.config.json',
                Object.assign(commonAppConfig, prodAppConfig)
            )
        ]
    };

    return merge(commonWebpackConfig, prodWebpackConfig);
};
