/* eslint-disable no-path-concat */
import UglifyJSPlugin from 'uglifyjs-webpack-plugin'
import  { merge } from "webpack-merge"
import common from "./webpack.common.mjs"
import webpack from 'webpack'

const definePluginValues = {
  FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
  FIREBASE_APP_ID: JSON.stringify(process.env.FIREBASE_APP_ID),
  FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
  FIREBASE_DATABASE_URL: JSON.stringify(process.env.FIREBASE_DATABASE_URL),
  FIREBASE_PROJECT_ID: JSON.stringify(process.env.FIREBASE_PROJECT_ID),
  FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
  FIREBASE_MESSAGE_SENDER_ID: JSON.stringify(process.env.FIREBASE_MESSAGE_SENDER_ID)
}

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
    new UglifyJSPlugin({ uglifyOptions }),
    new webpack.DefinePlugin(definePluginValues)
  ]
});
