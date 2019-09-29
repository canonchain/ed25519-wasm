const path = require('path');

module.exports = {
  mode: 'production',
  entry: './demo.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: './dist/',
    filename: 'bundle.js'
  }
};
