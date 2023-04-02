/* eslint-disable no-path-concat */
const path = require('path')
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve: {
    modules: ['../app', 'node_modules'],
    alias: {
      app: path.resolve(__dirname, 'app'),
      presenters: path.resolve(__dirname, '../app/components/presenters'),
      containers: path.resolve(__dirname, '../app/components/containers'),
      pages: path.resolve(__dirname, '../app/components/pages'),
      loaders: path.resolve(__dirname, '../app/components/loaders'),
      services: path.resolve(__dirname, '../app/services'),
      context: path.resolve(__dirname, '../app/context')
    }
  },
  cache: false,
  output: {
    path: path.resolve(__dirname, "../dist")
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: path.resolve(__dirname, '../app'),
        use: {
          loader: 'babel-loader',
          options: {
            'presets': ['@babel/preset-react', '@babel/preset-env'],
            'plugins': ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.scss?/,
        include: path.resolve(__dirname, '../assets/css'),
        use: [
          MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new IgnoreEmitPlugin(/_css.*\.js$/),
    new MiniCssExtractPlugin({
      filename: "style/[name].css"
    }),
    new HtmlWebpackPlugin({
      template: "./assets/html/template.html"
    })
  ]
}
