const webpack = require('@cypress/webpack-preprocessor')

const webpackOptions = {
  webpackOptions: {
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: [/node_modules/],
          loader: 'ts-loader'
        }
      ]
    }
  }
}

module.exports = webpack(webpackOptions)
