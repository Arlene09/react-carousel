const path = require('path');
const webpackMerge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const webpackCommon = require('./webpack.base.conf');

// webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

const webpack = require('webpack')

module.exports = webpackMerge(webpackCommon, {

  bail: true,

  devtool: 'source-map',
  
  entry: {
    app: './src/index.js'
  },

  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: "./",
    filename: 'js/[name]-[hash].min.js',
    chunkFilename: 'js/[name]-[chunkhash].js'
  },

  module: {

    rules: [
        { test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader","sass-loader"],
            publicPath: "./"
          })
        }
    ]

  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../src/index.html'),
      //favicon: path.resolve(__dirname, '../src/static/favicon.ico'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    // //复制静态文件
    // new CopyWebpackPlugin([
    //   {from: path.resolve(__dirname, '../static'), to: 'static'}
    // ], {
    //   ignore: ['index.html', 'favicon.ico']
    // }),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '..'),
      exclude: '.gitignore'
    }),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new ExtractTextPlugin('css/[name]-[chunkhash].min.css'),
    new UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      },
      sourceMap: true
    }),
    new LoaderOptionsPlugin({
      options: {
        context: '/',
        sassLoader: {
          includePaths: [path.resolve(__dirname, '../src')]
        }
      }
    })
  ]

});
