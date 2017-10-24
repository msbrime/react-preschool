var
    path = require('path'),
    webpack = require('webpack');

var config = {
    resolve : {
        modules : ["./app","node_modules"],
        alias : {
            presenters : path.resolve(__dirname,"app/components/presenters"),
            containers : path.resolve(__dirname,"app/components/containers"),
            pages : path.resolve(__dirname,"app/components/pages")
        }
    },
    output: {
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: path.resolve(__dirname + "/app/"),
                loader: 'babel-loader',
                options: {
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