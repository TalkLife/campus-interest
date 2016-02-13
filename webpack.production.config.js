var p = require('./package.json');
var webpack = require('webpack');
var webpackHtml = require('html-webpack-plugin');
var webpackClean = require('clean-webpack-plugin');

module.exports = {
    entry: {
        vendor: ['react'],
        app: ['./app/index.js']
    },
    output: {
        path: './build',
        filename: 'bundle.[hash].js',
        publicPath: 'build/'
    },
    module: {
        preloader: [
            {
                test: /\.jsx$/,
                loader: "flowcheck"
            },
            {
                test: /\.js$/,
                loader: "flowcheck"
            }
        ],

        loaders: [
            {
                test: /\.scss$/,
                loader: "style/useable!css!autoprefixer!sass"
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: "babel?cacheDirectory=true"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel?cacheDirectory=true"
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: [
        new webpackClean(['public/build']),
        new webpack.DefinePlugin({
            APP_VERSION: JSON.stringify(p.version)
        }),
        new webpackHtml({
            filename: '../index.html',
            template: 'app/template.html',
            inject: 'body'
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[hash].js'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.NoErrorsPlugin()
    ]
}