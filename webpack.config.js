/* eslint-disable no-path-concat */
const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const uglifyOptions = {
  mangle: true,
  output: {
    comments: false,
    beautify: false
  }
}

const definePluginValues = {
  FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
  FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
  FIREBASE_DATABASE_URL: JSON.stringify(process.env.FIREBASE_DATABASE_URL),
  FIREBASE_PROJECT_ID: JSON.stringify(process.env.FIREBASE_PROJECT_ID),
  FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
  FIREBASE_MESSAGE_SENDER_ID: JSON.stringify(process.env.FIREBASE_MESSAGE_SENDER_ID)
}

const config = {
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    modules: ['./app', 'node_modules'],
    alias: {
      app: path.resolve(__dirname, 'app'),
      presenters: path.resolve(__dirname, 'app/components/presenters'),
      containers: path.resolve(__dirname, 'app/components/containers'),
      pages: path.resolve(__dirname, 'app/components/pages'),
      loaders: path.resolve(__dirname, 'app/components/loaders'),
      services: path.resolve(__dirname, 'app/services'),
      context: path.resolve(__dirname, 'app/context')
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: path.resolve(__dirname + '/app/'),
        use: {
          loader: 'babel-loader',
          options: {
            'presets': ['@babel/preset-react', '@babel/preset-env'],
            'plugins': ['@babel/plugin-proposal-class-properties']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(definePluginValues),
    new UglifyJSPlugin({ uglifyOptions: uglifyOptions })
  ]
}

module.exports = config
