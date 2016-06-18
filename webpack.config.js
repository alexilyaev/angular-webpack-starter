// eslint-disable-next-line strict
'use strict';

const webpack      = require('webpack');
const path         = require('path');
const autoprefixer = require('autoprefixer');
const _            = require('lodash');

// Load Webpack Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin       = require('clean-webpack-plugin');

// Settings
const packageConfig     = require('./package.json');
const vendorLibraries   = Object.keys(packageConfig.dependencies);
const appEnv            = process.env.NODE_ENV || 'development';
const appPath           = path.join(__dirname, 'app');
const distPath          = path.join(__dirname, 'dist');
const cachePath         = path.join(__dirname, 'tmp/cache');
const assetsPathPattern = '[path][name].[hash].[ext]';
const distPathPattern   = '[name].[hash].js';
const exclude           = /node_modules/;

// Load the app config, default to `development`
let appConfig = require('./config/config');

appConfig = appConfig[appEnv] || appConfig.development;

const config = {

  // The base directory for resolving `entry` (must be absolute path)
  context: appPath,

  entry: {
    app: 'app.js',
    // Chunk of vendor libraries based on `package.json`, excluding some
    vendor: _.pull(vendorLibraries,
      'open-sans-fontface'
    )
  },

  output: {
    // The bundling output directory (must be absolute path)
    path: distPath,
    // Set proper base URL for serving resources
    publicPath: '/',
    // The output filename of the entry chunk, relative to `path`
    // [name] - Will be set per each key name in `entry`
    filename: distPathPattern
  },

  plugins: [

    // Generate index.html with included script tags
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'app.html'
      // favicon: 'app/favicon.ico'
    }),

    // Do not output to dist if there are errors
    new webpack.NoErrorsPlugin(),

    // Define global variables that will be available in any chunk
    new webpack.DefinePlugin({
      __ENV: {
        development: appEnv === 'development',
        production: appEnv === 'production',
        test: appEnv === 'test'
      },
      __API_URL: JSON.stringify(appConfig.API_URL)
    }),

    // Combine all modules loaded from the `vendor` chunk into a separate file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    })
  ],

  // Options affecting the resolving of modules
  resolve: {
    // Enable resolving modules relative to these paths
    root: [appPath]
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loaders: [
          'eslint'
        ],
        exclude
      }
    ],

    loaders: [
      {
        test: /\.js$/,
        loaders: [
          // Annotate Angular dependency injection to support minification
          'ng-annotate?single_quotes=true',
          // Transpile ES6 into ES5
          'babel?cacheDirectory=' + encodeURIComponent(cachePath)
        ],
        exclude: exclude
      },

      // Allow `require`ing JSON files as objects
      {
        test: /\.json$/,
        loader: 'json',
        exclude: exclude
      },

      // Allow `require`ing SCSS files
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css?root=' + encodeURIComponent(appPath),
          'postcss',
          'sass?includePaths[]=' + encodeURIComponent(appPath)
        ],
        exclude: exclude
      },

      // Allow `require`ing CSS files
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?root=' + encodeURIComponent(appPath)
        ]
      },

      // Allow `require`ing HTML files (Views) as raw strings
      // Also handles <img> `src` attributes (only static, dynamic `src` won't work)
      {
        test: /\.html$/,
        loader: 'html?root=' + encodeURIComponent(appPath),
        exclude: exclude
      },

      // Allow `require`ing image/font files (also when included in CSS)
      // Inline assets under 5kb as Base64 data URI, otherwise uses `file-loader`
      {
        test: /\.(jpe?g|png|gif|svg|eot|woff2?|ttf|otf)(\?.*)?$/i,
        loader: 'url?limit=5120&name=' + assetsPathPattern
      }
    ]
  },

  // Specify dependencies that shouldn't be resolved by webpack
  externals: [],

  // Settings for webpack-dev-server
  // `--hot` and `--progress` must be set using CLI
  devServer: {
    contentBase: appPath,
    colors: true,
    noInfo: true,
    inline: true,
    historyApiFallback: true
  },

  eslint: {
    configFile: '.eslintrc'
  },

  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ]
};

if (appEnv === 'development') {
  config.devtool = '#inline-source-map';
}

if (appEnv === 'production') {
  config.plugins.push(
    // Remove build folder
    new CleanPlugin(['dist'])
  );
}

module.exports = config;
