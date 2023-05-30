module.exports = {
  splitChunks: {
    chunks: "all",
    maxAsyncRequests: 20,
    maxInitialRequests: 18,
    minSize: 8000,
    maxSize: 230000,
    minRemainingSize: 0,
    minChunks: 8,
    enforceSizeThreshold: 50000,
    automaticNameDelimiter: "~",
    hidePathInfo: true,
    usedExports: true,

    cacheGroups: {
      vendorReact: {
        name: "vendorReact",
        test: /node_modules[\\/](react|react-dom)/,
        chunks: "initial",
        reuseExistingChunk: true,
        enforce: true,
        priority: 200,
      },
      initPage: {
        name: "initPage",
        test: /src[\\/]app[\\/](index|App)/,
        chunks: "initial",
        enforce: true,
        priority: 100,
      },
      vendorReactRouter: {
        name: "vendorReactRouter",
        test: /node_modules[\\/](react-router|react-router-dom)/,
        chunks: "initial",
        reuseExistingChunk: true,
        enforce: true,
        priority: 20,
      },
      vendorMobx: {
        test: /node_modules[\\/](mobx|mobx-react|mobx-react-lite|mobx-utils)[\\/]/,
        chunks: "initial",
        enforce: true,
        priority: 2,
      },

      vendorDateFns: {
        test: /node_modules[\\/]date-fns[\\/]esm[\\/](parse|format|_lib)/,
        chunks: "all",
        reuseExistingChunk: true,
        enforce: true,
        priority: -10,
      },
    },
  },
};
