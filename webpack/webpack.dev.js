const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  entry: {
    main_js: { import: "./app/index.jsx", filename: 'main.js' },
    main_css: { import: "./assets/css/main.scss", filename: "main_css.js" }
  },
  devServer: {
    hot: true,
    watchFiles: {
      paths: ['./assets/**/*', './app/**/*'],
      options: {
        usePolling: true
      }
    }
  }
});
