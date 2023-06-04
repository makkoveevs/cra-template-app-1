"use strict";

const path = require("path");
const rootDir = path.resolve(__dirname, "..", "..");
const fs = require("fs");
const envFilename = ".env";

const {
  optimization,
  defineRules,
  resolve,
  definePlugins,
} = require("./Config");

module.exports = (env) => {
  env.ISLINT = process.env.ISLINT;

  const plugins = definePlugins(env);
  const commonWebpackConfig = {
    entry: [
      "@babel/polyfill",
      path.join(__dirname, "..", "..", "src", "index.tsx"),
    ],
    resolve,
    module: {
      rules: defineRules(env),
    },
    plugins,
    output: {
      filename:
        env.NODE_ENV === "production"
          ? "[name].[contenthash].bundle.js"
          : "[name].bundle.js",
      path: path.resolve(rootDir, "build"),
      asyncChunks: true,
      chunkFilename: (pathData) => {
        return pathData.chunk.name === "main"
          ? "[name].chunk.js"
          : "[name]/[name].chunk.js";
      },
      clean: true,
      publicPath: "/",
      iife: false,
    },
  };

  if (env.NODE_ENV === "production") {
    const envFile = rootDir + "/" + envFilename + ".production";
    try {
      if (fs.existsSync(envFile)) {
        require("dotenv").config({ path: envFile });
      }
    } catch (_e) {
      // nothing
    }

    const TerserPlugin = require("terser-webpack-plugin");
    const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");

    const minimization = {
      minimize: true,
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    };

    commonWebpackConfig.optimization = { ...optimization, ...minimization };

    commonWebpackConfig.plugins.push(
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
        chunkFilename: "[id].[contenthash].css",
      })
    );
  }

  if (["development"].includes(env.NODE_ENV) && !process.env.ISLINT) {
    const envFile = rootDir + "/" + envFilename + ".development";
    try {
      if (fs.existsSync(envFile)) {
        require("dotenv").config({ path: envFile });
      }
    } catch (_e) {
      // nothing
    }

    const MiniCssExtractPlugin = require("mini-css-extract-plugin");

    commonWebpackConfig.optimization = { ...optimization };

    commonWebpackConfig.plugins.push(
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
        ignoreOrder: true,
      })
    );

    if (env.ANALYZE) {
      const BundleAnalyzer =
        require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
      commonWebpackConfig.plugins.push(
        new BundleAnalyzer({
          openAnalyzer: false,
          analyzerMode: "server",
          analyzerPort: 82822,
          defaultSizes: "stat",
          generateStatsFile: false,
          logLevel: "error",
        })
      );
    }

    const { merge } = require("webpack-merge");
    const devWebpackConfig = require("./dev.config");

    return merge(devWebpackConfig, commonWebpackConfig);
  }

  return commonWebpackConfig;
};
