const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(webpackBaseConfig, {
    // mode: 'production',
    devtool: 'source-map',
    output: {
        filename: 'js/[name].[hash].js',
        publicPath: '/',
        chunkFilename: 'js/[name].[hash].js',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "all",
                    minChunks: 2
                }
            }
        },
        // minimizer: [
        //     new UglifyJsPlugin({
        //         cache: true,
        //         parallel: true,
        //         sourceMap: false,
        //         extractComments: "all"
        //     }),
        //     new OptimizeCSSAssetsPlugin({})
        // ]
    },
});
