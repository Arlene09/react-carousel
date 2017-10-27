const path = require('path');
const webpackMerge = require('webpack-merge');
const webpackBase = require('./webpack.base.conf');

const env = require('./env');

// webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const host = env.devServer.host || 'localhost';
const port = env.devServer.port || 8000;

module.exports = webpackMerge(webpackBase, {

  devtool: 'inline-source-map',

  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${host}:${port}`,
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],

  output: {

    path: path.resolve(__dirname, '../dist'),

    filename: '[name].js',

    sourceMapFilename: '[name].map',

    chunkFilename: '[id]-chunk.js',

    publicPath: '/'

  },

  module: {

    rules: [{
        test: /\.scss$/,
        // use: ExtractTextPlugin.extract({
        //   fallback: "style-loader",
        //   use: ["css-loader", "sass-loader"],
        //   publicPath: "/"
        // })
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
              localIdentName: '[name]__[local]'
            }
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true,
              sourceMapContents: true
            }
          }
        ]
      }
    ],
  },

  plugins: [
    new HotModuleReplacementPlugin(),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: "'development'"
      }
    }),
    new CopyWebpackPlugin([
      {from: path.resolve(__dirname, '../src/static')}
    ], {
      ignore: ['index.html', 'favicon.ico']
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../src/index.html'),
      // favicon: path.resolve(__dirname, '../static/favicon.ico')
    }),
    new ExtractTextPlugin({
      filename: "css/style.[hash].css",
      disable: false,
      allChunks: true
    }),
    new HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ url: `http://${host}:${port}/#/` }),
  ],

  devServer: {
    host: host,
    port: port,
    contentBase: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    watchContentBase: true,
    compress: true,
    hot: true,
    inline: true,
    historyApiFallback: {
      disableDotRule: true
    },
    watchOptions: {
      ignored: /node_modules/
    },
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      "/appfrontservice/app/user/": {
        target: "http://139.196.243.223/",
        changeOrigin: true,
        //pathRewrite: { "^/appfrontservice/app/user/": "" }
      },
    }
  }

});
