"use strict";
const path = require("path");
const rootDir = path.resolve(__dirname, "..", "..");

module.exports = {
  entry: "./src/index",
  devtool: "inline-source-map",
  stats: "normal",
  cache: {
    type: "filesystem",
    allowCollectingMemory: true,
    cacheLocation: path.resolve(rootDir, ".webpack_cache"),
    profile: true,
    maxAge: 1000 * 60 * 60 * 8, // 8 hours
  },
  devServer: {
    historyApiFallback: true,
    host: "localhost",
    port: 8282,
    hot: false,
    liveReload: true,
    static: path.join(rootDir, "build"),
    proxy: {
      "/api": "http://127.0.0.1:8080",
      secure: false,
      changeOrigin: true,
      headers: {
        Connection: "keep-alive",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods":
        //   "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        // "Access-Control-Allow-Headers":
        //   "X-Requested-With, content-type, Authorization"
      },
    },
  },
};
