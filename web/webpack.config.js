const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const isEnvProduction = mode === 'production';
const isEnvDevelopment = mode === 'development';

module.exports = {
  mode,
  entry: './src/index.tsx',
  devtool: isEnvDevelopment ? 'inline-source-map' : undefined,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: isEnvProduction ? 'assets/js/[name].[contenthash].js' : 'assets/js/[name].js',
    chunkFilename: isEnvProduction ? 'assets/js/[id].[contenthash].chunk.js' : 'assets/js/[id].chunk.js',
    publicPath: '/',
  },
  optimization: {
    minimize: isEnvProduction,
    minimizer: [new TerserWebpackPlugin()],
    splitChunks: { chunks: 'all' },
    runtimeChunk: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: { transpileOnly: true },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: 'public', force: true, globOptions: { ignore: ['**/index.html'] } }],
    }),
    new ForkTsCheckerWebpackPlugin(),
    new HTMLWebpackPlugin({ template: './public/index.html' }),
  ],
  devServer: {
    contentBase: './public',
    watchContentBase: true,
    hot: true,
    transportMode: 'ws',
    host: process.env.HOST || '0.0.0.0',
    port: parseInt(process.env.PORT, 10) || 3000,
    public: 'localhost:3000',
    open: true,
    historyApiFallback: true,
  },
};
