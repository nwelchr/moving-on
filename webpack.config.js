// var path = require("path");

// module.exports = {
//   context: __dirname,
//   entry: "./lib/simple-game.js",
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: "bundle.js"
//   },
//   module: {
//     loaders: [
//       {
//         test: [/\.jsx?$/, /\.js?$/],
//         exclude: /node_modules/,
//         loader: 'babel-loader',
//       }
//     ]
//   },
//   devtool: 'source-map',
//   resolve: {
//     extensions: [".js", ".jsx", "*"],
//   },
// };

var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./javascripts/moving_on.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", ".jsx", "*"],
  },
};
