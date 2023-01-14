const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"), // the bundle output path
    filename: "bundle.js", // the name of the bundle
  },
  target: "web",
  devServer: {
    historyApiFallback: true,
    port: "3000", // port of dev server
    open: true, //opens the browser after server is successfully started

    hot: true, // enabling HMR.
    liveReload: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/, //folder to be excluded
        use: "babel-loader", //loader
      },
      {
        test: /\.css$/,
        exclude: /node_modules/, //folder to be excluded
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
