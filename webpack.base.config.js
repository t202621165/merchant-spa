const path = require('path');
const es3ifyPlugin = require('es3ify-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: path.resolve(__dirname, './src/app.jsx'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
        alias: {
            react: 'anujs/dist/ReactIE.js',
            'react-dom': 'anujs/dist/ReactIE.js',
            router: "anujs/dist/Router.js",
            'prop-types': 'anujs/lib/ReactPropTypes',
            devtools: 'anujs/lib/devtools',
            'create-react-class': 'anujs/lib/createClass',
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: '/node_modules',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: {
                                        browsers: ['last 2 versions', 'ie >= 7'],
                                    },
                                    modules: 'commonjs',
                                    useBuiltIns: 'usage',
                                    debug: false,
                                    exclude: [
                                        'es6.symbol',
                                        'es6.object.assign'
                                    ]
                                },
                            ],
                            '@babel/react'
                        ],
                        plugins: ['@babel/plugin-transform-runtime','@babel/plugin-proposal-class-properties'],
                    },
                },
                include: [path.resolve(__dirname, 'src')],
            },
            {
                test: /\.css$/,
                exclude: '/node_modules',
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'postcss-loader'
                ]
            },
            // {
            //     test: /\.css$/, 
            //     use: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: [
            //             { loader: 'css-loader', options: { importLoaders: 1 } },
            //             'postcss-loader'
            //         ],
            //         publicPath: './'
            //     })
            // },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 100,
                            name: 'assets/css/[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    mode: 'development',
    plugins: [
        new es3ifyPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, './src/index.ejs'),
            inject: 'body',
            hase: false,
            minify: {
                // 压缩HTML文件
                minimize: true,
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空白符与换行符
                removeAttributeQuotes: false
            },
            chunks: ['app'],
        }),
        new ExtractTextPlugin("css/style.css?version=[hash]")
    ],
};
