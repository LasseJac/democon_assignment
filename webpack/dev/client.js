const { merge } = require('webpack-merge');
const htmlPlugin = require('html-webpack-plugin');
const path = require('path');
const baseConfig = require('../base');

const htmlTemplate = path.resolve(__dirname, '..', '..', 'src/client/index.html');

const config = merge(baseConfig, {
    plugins: [
        new htmlPlugin({
            template: htmlTemplate
        })
    ]
});

module.exports = config;