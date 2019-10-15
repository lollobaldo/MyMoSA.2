const path = require('path');
// const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const glob = require('glob');

const {
  NODE_ENV = 'development',
} = process.env;

const entryArray = glob.sync('./app/src/{index,modules/}*.?(m)js');
const entryObject = entryArray.reduce((acc, item) => {
  // if (item.indexOf('config.js') !== -1) { return acc; }
  const name = item.replace('./app/src/', '');
  acc[name] = item;
  return acc;
}, {});

console.log(entryObject);

module.exports = {
  mode: NODE_ENV,
  target: 'node',
  externals: [nodeExternals()],
  entry: entryObject,
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        loader: 'eslint-loader',
      }, {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  // output: '[name]/main.js',
  output: {
    path: path.resolve(__dirname, './app/build/'),
    filename: '[name]',
  },
};
