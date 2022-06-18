const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "index.html",
      template: "./src/html/index.html",
      filename: "index.html",
      chunks: ["index"],
    }),
  ],
  devServer: {
    port: 5000,
    open: true,
    static: path.resolve(__dirname, "dist"),
  },
  mode: "production",
};
