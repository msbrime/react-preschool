/* eslint-disable no-path-concat */
import path from "path";
import IgnoreEmitPlugin from 'ignore-emit-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin'

const __dirname = import.meta.dirname;

export default {
  resolve: {
    modules: ['app','node_modules'],
    alias: {
      app: path.resolve(__dirname, '../../app'),
      presenters: path.resolve(__dirname, '../../app/components/presenters'),
      containers: path.resolve(__dirname, '../../app/components/containers'),
      pages: path.resolve(__dirname, '../../app/components/pages'),
      loaders: path.resolve(__dirname, '../../app/components/loaders'),
      services: path.resolve(__dirname, '../../app/services'),
      context: path.resolve(__dirname, '../../app/context')
    },
    extensions: ["", ".js", ".mjs", ".jsx"]
  },
  target:"web",
  cache: false,
  output: {
    path: path.resolve(__dirname, "../../public"),
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: path.resolve(__dirname, '../../app'),
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
        include: path.resolve(__dirname, '../../assets/css'),
        use: [
          MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new IgnoreEmitPlugin(/_css.*\.js$/),
    new HtmlWebpackPlugin({
      template: "./assets/html/template.html"
    })
  ]
}
