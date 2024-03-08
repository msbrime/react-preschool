import { merge } from "webpack-merge";
import common from "./webpack.common.mjs";
import Dotenv from 'dotenv-webpack';

export default merge(common, {
  mode: "development",
  entry: {
    main_js: { import: "./app/index.jsx", filename: 'main.js' },
    main_css: { import: "./assets/css/main.scss", filename: "main_css.js" }
  },
  plugins: [
    new Dotenv({
      path: './.env',
      prefix: ''
    })
  ]
});
