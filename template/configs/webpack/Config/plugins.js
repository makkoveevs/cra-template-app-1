const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");
const rootDir = path.resolve(__dirname, "..", "..", "..");

const definePlugins = (env) => {
  let retValue = [
    new HtmlWebpackPlugin({
      favicon: path.resolve(rootDir, "public/favicon.ico"),
      template: path.resolve(rootDir, "public/index.html"),
      publicPath: "/",
    }),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
  ];

  if (!env.ISLINT) {
    const { createGitRevisionPlugin } = require("../GitRevisionPlugin");
    const gitRevisionPlugin = createGitRevisionPlugin();

    retValue.push(gitRevisionPlugin);

    retValue.push(
      new webpack.DefinePlugin({
        __ENV__: JSON.stringify(env.NODE_ENV),
        __MOCK__: JSON.stringify(env.MOCK),
        __VERSION__: JSON.stringify(gitRevisionPlugin.version()),
        __COMMIT_HASH__: JSON.stringify(gitRevisionPlugin.commithash()),
        __BRANCH__:
          JSON.stringify(env.BRANCH) ||
          JSON.stringify(gitRevisionPlugin.branch()),
        __LAST_COMMIT_DATE_TIME__: JSON.stringify(
          gitRevisionPlugin.lastcommitdatetime()
        ),
      })
    );
  }

  return retValue;
};

module.exports = definePlugins;
