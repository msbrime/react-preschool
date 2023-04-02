/* eslint-disable no-path-concat */
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const { merge } = require("webpack-merge");
const common = require("./webpack.common");


const uglifyOptions = {
  mangle: true,
  output: {
    comments: false,
    beautify: false
  }
}

module.exports = merge(common, {
  mode: "production",
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
  entry: {
    main_js: { import: "./app/index.jsx", filename: 'main-[contenthash].js' },
    main_css: { import: "./assets/css/main.scss", filename: "main_css-[contenthash].js" }
  },
  plugins: [
    new UglifyJSPlugin({ uglifyOptions })
  ]
});
