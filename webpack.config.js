var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
module.exports = {
  context:__dirname,
  entry: {
    'app' :[
      './src/js/index',
      './src/scss/main.scss',
    ],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './dist'
  },
  resolve: {
    extensions: ['*', '.js','.scss'],
  },
  module: {
    rules: [
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options:{
          sourceMap:true,
          cacheDirectory:true
        }
      },
      {//Loader de las plantillas de underscores
        test: /\.html$/,
        loader: "underscore-template-loader"
        ,
        include: [
          path.resolve(__dirname, "./src/templates"),
        ]
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
            },
            {
              loader:'postcss-loader',
              options: {
                //sourceMap: true,
                config: {
                  path: './postcss.config.js'
                }
                //minimize: true
              }
            }
          ],
        }),
        include: [
          path.resolve(__dirname, "./src/css"),
        ]
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
              loader:'postcss-loader',
              options:{
                sourceMap: true ,
                config: {
                  path: './postcss.config.js'
                }
              }
            },
            {
              loader:'sass-loader',
              options:{
                sourceMap: true
              }
            },
            {
              loader :"sass-resources-loader",
              options:{
                resources: './config/sass-resources.scss',
                options:{
                  sourceMap: true
                }
              }
            }
          ],
          fallback: "style-loader"
        }),
        include: [path.resolve(__dirname, "./src/scss")]
      }
    ]
  },
  plugins: [
    //Plugin que se encarga de borrar el directorio indicado
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      inject:true,
      title: 'Primera Página',
      template: './src/templates/modulo/index.html',
    }),
    new ExtractTextPlugin({
      filename:  'css/[name].css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      title: 'Segunda Página',
      filename:'segunda.html',
      template: './src/templates/modulo/index.html'
    }),
    //Inclusion de assets en las páginas generadas con el plugin HtmlWebpackPlugin
    new ManifestPlugin(),
    new webpack.ProvidePlugin({
      "$":"jquery",
      "jQuery":"jquery",
      "_":"underscore",
    }),
    new webpack.LoaderOptionsPlugin({
      postcss: [autoprefixer],
    }),
  ],
  output: {
    filename: '[name].[chunkhash].bundle.js',
    chunkFilename: '[name].[chunkhash].bundle.js',
    path: path.resolve('./dist'),
    publicPath: ''
  }
};
