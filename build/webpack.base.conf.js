// webpack plugins
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

const autoprefixer = require('autoprefixer');

module.exports = {

  externals: {
    'react':'window.React',
    'react-dom':'window.ReactDOM'
  },

  resolve: {

    extensions: ['.js', '.scss'],

    modules: ['node_modules']

  },

  module: {

    rules: [

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },

      {
        test: /\.json$/,
        loader: 'json'
      },

      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        // use: [
        //   // 'url-loader?limit=3000&name=images/[hash:5].[ext]',// 小于3k的使用base64
        //   // 'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        // ]
        loaders: [
          'file-loader?name=images/[hash:16].[ext]'
          // {
          //   loader: 'file-loader',
          //   options: {
          //     query: {
          //       name:'assets/[name].[ext]'
          //     }
          //   }
          // },
          // {
          //   loader: 'image-webpack-loader',
          //   query: {
          //     progressive: true,
          //     optimizationLevel: 7,
          //     interlaced: false,
          //     pngquant: {
          //       quality: '65-90',
          //       speed: 4,
          //     },
          //   },
          // },
        ]
      },

      {
        test: /\.(mp4|webm)$/,
        loader: 'url?limit=10000'
      },
      {
        // Do not transform vendor's CSS with CSS-modules
        // The point is that they remain in global scope.
        // Since we require these CSS files in our JS or CSS files,
        // they will be a part of our compilation either way.
        // So, no need for ExtractTextPlugin here.
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 2 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  // flexbox: 'no-2009',
                }),
              ],
            },
          },
          {
            loader: require.resolve('sass-loader')
          }
        ],
      }
    ]

  },

  plugins: [
    new CommonsChunkPlugin({
      name: ['app'],
      minChunks: Infinity
    })
  ]

};
