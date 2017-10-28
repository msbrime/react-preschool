const
    path = require('path'),
    webpack = require('webpack'),
    UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
    
    uglifyOptions = {
        mangle: true,
        output : {
            comments : false,
            beautify : false
        }
    };

const config = {
    resolve : {
        modules : ["./app","node_modules"],
        alias : {
            presenters : path.resolve(__dirname,"app/components/presenters"),
            containers : path.resolve(__dirname,"app/components/containers"),
            pages : path.resolve(__dirname,"app/components/pages")
        }
    },
    output: {
        filename: '[name].js',
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
     plugins: [
         new UglifyJSPlugin({uglifyOptions:uglifyOptions}),
           new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: function(module){
              return module.context && module.context.indexOf("node_modules") !== -1;
            }
          }),
          new webpack.optimize.CommonsChunkPlugin({
            name: "manifest",
            minChunks: Infinity
          })
     ]
};

module.exports = config;