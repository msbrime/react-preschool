var
    path = require('path'),
    webpack = require('webpack');

var config = {
    output: {
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: path.resolve(__dirname + "/app/"),
                loader: 'babel-loader',
                query: {
                    'presets': ['es2015', 'react']
                }
            }
        ]
    },
    devtool: 'source-map'
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin({ minimize: true })
    // ]
};

module.exports = config;