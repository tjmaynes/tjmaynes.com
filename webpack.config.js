const path = require("path");
const PugPlugin = require("pug-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isProductionMode = () => process.env.NODE_ENV !== "development";

module.exports = {
  mode: isProductionMode() ? "production" : "development",
  entry: {
    index: "./src/index.pug",
  },
  output: {
    path: path.join(__dirname, "public/"),
    publicPath: "/",
  },
  plugins: [
    new PugPlugin({
      js: {
        filename: "assets/js/[name].[contenthash:8].js",
      },
      css: {
        filename: "assets/css/[name].[contenthash:8].css",
      },
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "src/assets/image/favicon.ico" }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: PugPlugin.loader,
      },
      {
        test: /\.(css|sass|scss)$/,
        use: ["css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|ico|webp)/,
        type: "asset/resource",
        generator: {
          filename: "assets/image/[name].[hash:8][ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/font/[name][ext][query]",
        },
      },
      {
        test: /\.(svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/svg/[name][ext][query]",
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 9000,
  },
};
