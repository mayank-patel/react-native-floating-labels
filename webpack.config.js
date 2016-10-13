
const path = require('path')
const webpack = require('webpack')
const validate = require('webpack-validator')
const HasteResolverPlugin = require('haste-resolver-webpack-plugin')
const NODE_ENV = process.env.NODE_ENV || 'development'
const isProd = NODE_ENV === 'development'

module.exports = validate({
  entry: [
    'babel-polyfill',
    path.join(__dirname, 'app.js')
  ],
  resolve: {
    alias: {
      'react-native': 'react-web/lib/index.js'
    },
    extensions: ['', '.js', '.jsx', '.web.js'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        // Enable caching for improved performance during development
        // It uses default OS directory by default. If you need
        // something more custom, pass a path to it.
        // I.e., babel?cacheDirectory=<path>
        loader: 'babel-loader',
        exclude: [
          /node_modules\/(?!react)/
        ],
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-1'],
          plugins: [
            'transform-object-rest-spread',
            'transform-class-properties',
            'transform-async-functions',
            'transform-flow-strip-types'
          ]
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  plugins: [
    new HasteResolverPlugin({
      platform: 'web',
      // blacklist: ['Libraries']
      // blacklist: ['Libraries']
      nodeModules: ['react-web']
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      __DEV__: isProd ? false : true
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom'
    }),
    new webpack.NoErrorsPlugin(),
  ]
})
