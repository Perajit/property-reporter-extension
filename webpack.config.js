const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  target: 'node',
  entry: {
    content: './src/content/index.js',
    popup: './src/popup/index.js'
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Property Reporter Extension',
      filename: 'popup.html',
      template: 'src/popup-template.html',
      chunks: ['popup'],
    }),
    new CopyWebpackPlugin([
      'src/manifest.json',
      'resources/*'
    ])
  ],
  resolve: {
    alias: {
      resources: path.resolve(__dirname, 'resources'),
      constants: path.resolve(__dirname, 'src/constants'),
      services: path.resolve(__dirname, 'src/services'),
      content: path.resolve(__dirname, 'src/content'),
      popup: path.resolve(__dirname, 'src/popup')
    }
  }
}
