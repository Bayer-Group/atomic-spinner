const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  entry: '../src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [
          /node_modules/
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib')
  },
  plugins: []
}
