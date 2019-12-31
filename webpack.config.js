const path = require("path"); //导入nodejs 的path模块

const es3ifyPlugin = require('es3ify-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        app: path.resolve(__dirname, './src/app.jsx'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "js/[name].js"
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
        alias: {
			react: 'anujs/dist/ReactIE.js',
            'react-dom': 'anujs/dist/ReactIE.js',
            router: "anujs/dist/Router.js",
            'prop-types': 'anujs/lib/ReactPropTypes',
            devtools: 'anujs/lib/devtools',
            'create-react-class': 'anujs/lib/createClass'
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx$/, 
                exclude: "/node_modules", 
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env",'@babel/react'],
                        plugins: ['@babel/plugin-transform-runtime','@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.ejs$/, 
                use: [{
                    loader: "html-loader",
                    options: {
                        minimize: true,
                        removeComments: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: false
                    }
                }]
            },
            {
                test: /\.css$/, 
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "postcss-loader"],
                    publicPath: "./"
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/, 
                use: [
                    {
                        loader: "url-loader", 
                        options: {
                            limit: 1000,
                            name: "[name].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new es3ifyPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.ejs"
        }),
        new ExtractTextPlugin("css/style.css?version=[chunkhash:16]", {allChunks: true})
    ],
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
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false,
                extractComments: "all"
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
    }
};