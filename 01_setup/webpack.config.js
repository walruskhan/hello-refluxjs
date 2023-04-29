const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const webpack = require("webpack");

module.exports = {
  entry: {
    app: "./src/main.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    // Otherwise extension required on imports (e.g. import * as foo from 'myfile.ts'
    extensions: [".js", "jsx"], // note if using webpack 1 you'd also need a '' in the array as well
  },
  devtool: "inline-source-map",
  devServer: {
    static: {
        directory: path.join(__dirname, "dist"),
    },
    compress: false,
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Example Application",
    }),
    new WebpackManifestPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(sass|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
