/* eslint-disable no-path-concat */
import path from "path";
import nodeExternals from "webpack-node-externals"
import webpack from "webpack";

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
  entry: "./server/index.mjs",
  mode: "none",
  experiments: {
    outputModule: true,
  },
  target:"node20",
  output: {
    path: path.resolve(__dirname, "../../dist"),
    filename: "server.mjs",
    chunkFormat: "module",
    module: true,
  },
  externals: [nodeExternals({ importType: 'module' })],
  externalsPresets: { node: true },
  module: {
    rules: [
      {
        test: /\.m?jsx?/,
        use: {
          loader: 'esbuild-loader',
          options : {
            target: "es2021",
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "import.meta.dirname": "__dirname",
    })
  ]
}
