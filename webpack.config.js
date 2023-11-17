const path = require('path');

module.exports = {
  entry: './src/index.js', // Your entry point
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output bundle file
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use babel-loader to transpile JS and JSX files
        },
      },
      // You can add more loaders here for other file types (CSS, images, etc.)
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Automatically resolve these file extensions
  },
};
