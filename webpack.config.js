const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = env => {
  const isProd = env.prod || false;

  const entry = './src/index.js';
  const output = {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[chunkhash].js',
  };

  // dev
  const devtool = isProd ? false : 'source-map';
  const devServer = {
    contentBase: path.join(__dirname, 'src'),
    port: 3000,
    historyApiFallback: true,
    host: '0.0.0.0',
  };

  // plugins
  const plugins = [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash].min.css',
    }),
    new HtmlWebpackPlugin({
      title: 'Hubgets Test',
      template: './src/template.html',
      filename: 'index.html',
    }),
  ];

  // clean production build
  isProd && plugins.push(new CleanWebpackPlugin());

  // rules
  const js = {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    query: {
      presets: [
        [
          '@babel/preset-env',
          {
            useBuiltIns: 'usage',
            corejs: 3,
          },
        ],
      ],
    },
  };

  const scss = {
    test: /\.scss$/,
    use: [
      isProd ? MiniCssExtractPlugin.loader : 'style-loader',
      {
        loader: 'css-loader',
        options: { sourceMap: true },
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: [require('autoprefixer')],
          sourceMap: true,
        },
      },
      {
        loader: 'sass-loader',
        options: { sourceMap: true },
      },
    ],
  };

  const html = {
    test: /\.html$/,
    use: ['html-loader'],
  };

  const images = {
    test: /\.(svg|png|jpe?g|gif)$/,
    loader: 'url-loader',
  };

  const module = {
    rules: [js, scss, html, images],
  };

  return {
    entry,
    output,
    devtool,
    devServer,
    plugins,
    module,
  };
};
