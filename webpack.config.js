var
    webpack = require("webpack"),
    path = require('path');


var
    BUILD_DIR = path.resolve(__dirname + '/build'),
    APP_DIR = path.resolve(__dirname + '/app');


var config = {
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
        publicPath: BUILD_DIR,
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel',
                query: {
                    'presets': ['es2015', 'react']
                }
            }
        ]
    },
    devServer: {
        inline: true,
        contentBase: "./",
        port: 8080
    },
    devtool: 'source-map'
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin({ minimize: true })
    // ]
};

module.exports = config;