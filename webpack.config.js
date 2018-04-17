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
  entry: "./test/power-of-friendship.js",
  output: {
    path: path.resolve(__dirname, 'test'),
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
