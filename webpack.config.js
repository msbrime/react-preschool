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
        }),
        new webpack.DefinePlugin({
            FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
            FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
            FIREBASE_DATABASE_URL: JSON.stringify(process.env.FIREBASE_DATABASE_URL),
            FIREBASE_PROJECT_ID: JSON.stringify(process.env.FIREBASE_PROJECT_ID),
            FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
            FIREBASE_MESSAGE_SENDER_ID: JSON.stringify(process.env.FIREBASE_MESSAGE_SENDER_ID)
        })
    ]
};

module.exports = config;