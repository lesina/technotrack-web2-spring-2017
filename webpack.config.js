const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry: {
    indexBundle: './app',
  },
  context: `${__dirname}/static_src`,
  output: {
    path: `${__dirname}/static/build`,
    filename: '[name].js',
    publicPath: '/static/build/',
        // library: '[name]'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=react&presets[]=es2015&presets[]=stage-0',
      }, {
        test: /\.css$/,
        loaders: 'style-loader!css-loader',
      }, {
        test: /\.scss$/,
        loaders: 'style-loader!css-loader!sass-loader?sourceMap',
      }, {
        test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
        loader: 'url-loader?limit=4096',
      },
    ],
  },

  resolve: {
    modules: [
      `${__dirname}/static_src`,
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
  },

  resolveLoader: {
    modules: ['node_modules'],
    extensions: ['loader.js', '.js'],
  },

  watch: NODE_ENV === 'development',
  watchOptions: {
    aggregateTimeout: 100,
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        sequences: true,
        booleans: true,
        loops: true,
        unused: true,
        warnings: false,
        drop_console: false,
        unsafe: true,
      },
    }),
    new CleanObsoleteChunks(),
    new BundleTracker({ filename: './webpack-stats.json' }),
  ],

  devtool: NODE_ENV === 'development'
      ? 'cheap-module-inline-source-map' : false,
};
