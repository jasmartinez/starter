const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin') // here so you can see what chunks are built
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;


module.exports = {
  entry :{
    "app":[
      "babel-polyfill",
      "./src/js/index",
      './src/scss/main.scss'
    ]
  },
  devtool:"source-map",
  resolve: {
    extensions: ['jsx','.js','.scss','json','*'],
  },
  module:{
    rules:[
      {
        test: /\.js$/,
        exclude:/node_modules/,
        loader: "babel-loader",
        options:{
          presets : ['react',"stage-0","es2015"],
          sourceMap:true,
          plugins: [
            'dual-import',
            'transform-decorators-legacy',
            'transform-class-properties',
            'transform-object-rest-spread'
          ],
        }
      },
      { // regular css files
        test: /\.css$/,
        use : ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader:'css-loader',
              options: {
                sourceMap: true,
                //minimize: true
              }
            }],
          }),
          include: [
            path.resolve(__dirname, "./src/css")
          ],
          exclude:/node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        { // sass / scss loader for webpack
          test: /\.(sass|scss)$/,
          loader:ExtractTextPlugin.extract({
            allChunks:true,
            use: [
              {
                loader:'css-loader',
                options: {
                  sourceMap: true,
                  //minimize: true
                  //importLoaders: 1
                }
              },
              {
                loader:'sass-loader',
                options:{
                  sourceMap: true
                }
              }
            ],
            fallback: "style-loader"
          }),
          include: [path.resolve(__dirname, "./src/scss")]
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        }
      ]
    },
    plugins:[
      new ExtractCssChunks(),
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Primera Página',
        template: './src/templates/layouts/index.html'
      }),
      new ExtractTextPlugin({
        filename:  'css/[name].css',
        allChunks: true,
      }),
      new BundleAnalyzerPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        async: true
      }),
      new webpack.optimize.CommonsChunkPlugin({
        children: true,
        async: "commons",
        minChunks: 2, // the least number of chunks reusing a module before module can be exported
      }),
      new ManifestPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('develop')
      }),
      new WriteFilePlugin(),
      // Relative paths work, but absolute paths do not currently.
      new StatsWriterPlugin({
        filename: "../build/stats-custom.json"
      })
    ],
    devServer:{
      contentBase:'./dist',
      historyApiFallback: true,
      hot:true,
      port: 8080,
      host: "0.0.0.0",
      compress: true,
      proxy: {
        "/api": "http://localhost:5050"
      },
      watchOptions: {
        ignored: /node_modules/
      },
     //public:"http://midominio:8080",
     public:"",
      disableHostCheck: true
    },
    output: {
      filename: '[name].bundle.js',
      chunkFilename: '[name].[chunkhash:6].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    }
  }
