const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
  mode: "development",
  entry: {
    main_js: { import: "./app/index.jsx", filename: 'main.js' },
    main_css: { import: "./assets/css/main.scss", filename: "main_css.js" }
  },
  plugins: [
    new Dotenv({
      path: './.env'
    })
  ]
});
