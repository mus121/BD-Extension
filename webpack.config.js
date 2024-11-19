const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
// const Dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = {
  entry: {
    popup: "./src/popup.tsx", // Your popup script
    background: "./src/background.ts", // Background script entry
  },
  output: {
    filename: "[name].js", // This will output popup.js and background.js
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.svg|.png|.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: ["file-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".scss"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/popup.html",
      filename: "popup.html",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "public" }],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "public/manifest.json", to: "manifest.json" }, // Assumes all static assets and manifest.json are in 'public'
      ],
    }),
  ],
};
