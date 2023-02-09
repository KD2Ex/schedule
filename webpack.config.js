const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
        {
            test: /\.ttf$/,
            use: [
              {
                loader: 'ttf-loader',
                type: 'asset/resource',
                options: {
                  name: './font/[hash].[ext]',
                },
              },
            ]
        }
    ]
  }

}