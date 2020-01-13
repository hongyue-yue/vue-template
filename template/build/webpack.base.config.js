const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
//const webpack = require("webpack");

const { webpackConfig } = require("../config");
const util = require("./util");

const ROOT_PATH = path.resolve(__dirname, "../");
const APP_PATH = path.resolve(ROOT_PATH, "src");
module.exports = {
  entry: {
    app: ["babel-polyfill", APP_PATH + "/main.js"]
  },
  output: {
    path: webpackConfig.buildPath,
    filename: util.assetsPath("js/[name].[chunkHash:7].js"),
    chunkFilename: util.assetsPath("js/[id].[chunkHash:7].js"),
    publicPath: webpackConfig.isDev ? webpackConfig.assetsPublicPath : ""
  },
  resolve: {
    alias: {
      "@": `${APP_PATH}`
    },
    extensions: [".js", ".vue", ".sass", ".less", ".png", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: [APP_PATH],
        include: [path.resolve(ROOT_PATH, "node_modules")],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: webpackConfig.isDev,
              reloadAll: true
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
              importLoaders: 1
            }
          },
          {
            loader: "sass-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require("autoprefixer")({
                  overrideBrowserslist: ["ie 9-11", "last 5 version"] //兼容IE9到11，所有浏览器最近五个版本
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        include: [APP_PATH],
        exclude: [path.resolve(ROOT_PATH, "node_modules")],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: webpackConfig.isDev,
              reloadAll: true
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 1,
              modules: true,
              localIdentName: "[hash:base64:6]"
            }
          },
          {
            loader: "sass-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require("autoprefixer")({
                  overrideBrowserslist: ["ie 9-11", "last 5 version"] //兼容IE9到11，所有浏览器最近五个版本
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader"
        },
        include: [APP_PATH]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          `url-loader?limit=3000&minetype=image/svg+xml&name=${util.assetsPath(
            "svg/[name].[hash:7].[ext]"
          )}`
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
        use: [
          `url-loader?limit=3000&name=${util.assetsPath(
            "img/[name].[hash:7].[ext]"
          )}`
        ],
        include: [APP_PATH],
        exclude: []
      },
      {
        test: /\.json/,
        use: [
          `json-loader?name=${util.assetsPath("json/[name].[hash:7].[ext]")}`
        ],
        type: "javascript/auto",
        include: [APP_PATH]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: "demo",
      template: `${APP_PATH}/index.html`,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: util.assetsPath("css/[name].[chunkHash:7].css"),
      chunkFilename: util.assetsPath("css/[id].[chunkHash:7].css")
    })
  ],
  devtool: webpackConfig.devtool,
  stats: {
    colors: true
  },
  performance: {
    hints: false
  },
  cache: webpackConfig.isDev
};
