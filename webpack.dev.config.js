const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');

module.exports = merge(webpackBaseConfig, {
    devtool: 'cheap-module-source-map',
    output: {
        filename: 'js/[name].js',
        publicPath: '/',
        chunkFilename: 'js/[name].js',
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
        }
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        host: '192.168.0.100',
        port: 8066,
        inline: true,
        stats: { colors: true },
        contentBase: 'dist',
        proxy: {
            "/mer/partition": {
                target: "http://192.168.0.100/mer/partition/list",
                changeOrigin: true
            }
        }
    }
});
