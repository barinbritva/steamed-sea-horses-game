//webpack.config.js
const path = require("path");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  watch: true,
  entry: {
    index: "./src/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "./public/scripts"),
    filename: "index.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: { configFile: "tsconfig-dev.json" },
      },
    ],
  },
};
