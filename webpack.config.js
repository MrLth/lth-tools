/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-01 07:45:00
 * @LastEditTime: 2021-09-19 17:22:32
 * @Description: file content
 */
const path = require('path');

module.exports = {
  entry: './dist/es/index.js',
  output: {
    libraryTarget: 'umd',
    globalObject: 'this',
    filename: 'lth-tools.js',
    library: 'lth-tools',
    path: path.resolve(__dirname, './dist/umd'),
  },
  mode: 'production',
  resolve: {
    extensions: ['.json', '.js', '.css'],
    alias: {
      '@': __dirname,
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: /\.(local|module|m)\.s?css$/,
                localIdentName: '[folder]_[hash:base64:5]__[local]',
              },
              sourceMap: true,
            },
          }
        ],
      },
    ],
  },
  externals: [
    {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  ],
};