/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-09-01 07:45:00
 * @LastEditTime: 2021-09-19 18:07:26
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
  },
  externals: [
    {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  ],
};