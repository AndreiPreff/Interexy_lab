const HtmlWebpackPlugin = require('html-webpack-plugin');
require('webpack');
const path = require('path');

module.exports = {
  entry: {
    bundle: './src/script.ts',
    sortingWorker: './src/sortingWorker.ts'
  },
  
  mode: 'development',
  devServer: {
    static: {
        directory: path.join(__dirname, 'dist'),
      },
    compress: true,
    port: 8080,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',

  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' },
      {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
      },
      {
        test: /\.worker\.ts$/,
        use: [
          {
            loader: 'worker-loader',
            options: {
              // В этом месте указываем путь к ts-loader, чтобы избежать двойной обработки TypeScript
              sortingWorker: { loader: 'ts-loader' },
              filename: 'sortingWorker.js',  // Укажите имя выходного файла
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader',
            options: { injectType: 'singletonStyleTag' },
          },
          'css-loader',
        ],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
  resolve: {
    extensions: [ ".tsx", ".ts", ".js" ]
  },
};