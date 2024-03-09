/* eslint-disable no-path-concat */
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { merge } from "webpack-merge"
import common from "./webpack.common.mjs"
import webpack from 'webpack'
import { WebpackManifestPlugin } from 'webpack-manifest-plugin'

const definePluginValues = {
  "process.env.FIREBASE_API_KEY": JSON.stringify(process.env.FIREBASE_API_KEY),
  "process.env.FIREBASE_APP_ID": JSON.stringify(process.env.FIREBASE_APP_ID),
  "process.env.FIREBASE_AUTH_DOMAIN": JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
  "process.env.FIREBASE_DATABASE_URL": JSON.stringify(process.env.FIREBASE_DATABASE_URL),
  "process.env.FIREBASE_PROJECT_ID": JSON.stringify(process.env.FIREBASE_PROJECT_ID),
  "process.env.FIREBASE_STORAGE_BUCKET": JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
  "process.env.FIREBASE_MESSAGE_SENDER_ID": JSON.stringify(process.env.FIREBASE_MESSAGE_SENDER_ID)
}

const uglifyOptions = {
  mangle: true,
  output: {
    comments: false,
    beautify: false
  }
}

export default merge(common, {
  mode: "development",
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
    // new UglifyJSPlugin({ uglifyOptions }),
    new MiniCssExtractPlugin({
      filename: "[name]-[contenthash].css"
    }),
    new WebpackManifestPlugin({ publicPath: '/assets/', filter: (file) => !file.name.endsWith('.html') && !file.name.endsWith('.svg') }),
    new webpack.DefinePlugin(definePluginValues)
  ]
});
