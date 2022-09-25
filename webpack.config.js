const path = require('path');

module.exports = {
  // mode: 'development',
  mode: 'production',
  entry: './app.js', // './index.js'
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'api.bundle.js',
  },
  target: 'node',
};
