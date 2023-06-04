const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");
const rootDir = path.resolve(__dirname, "..", "..", "..");

const fs = require("fs");
const envFilename = ".env";

const ENV_PREFIX = "APP_"; // variables in .env.* files may starts with this prefix. prefix may setted over command line variables

const definePlugins = (env) => {
  let retValue = [
    new HtmlWebpackPlugin({
      // favicon: path.resolve(rootDir, "public/favicon.ico"),
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

  if (env.NODE_ENV === "production") {
    const envFile = rootDir + "/" + envFilename + ".production";
    try {
      if (fs.existsSync(envFile)) {
        require("dotenv").config({ path: envFile });
      }
    } catch (_e) {
      // nothing
    }
  }

  if (["development"].includes(env.NODE_ENV)) {
    const envFile = rootDir + "/" + envFilename + ".development";
    try {
      if (fs.existsSync(envFile)) {
        require("dotenv").config({ path: envFile });
      }
    } catch (_e) {
      // nothing
    }
  }

  const PREFIX = env.ENV_PREFIX ?? ENV_PREFIX;

  const APP_ENV_VARIABLES = Object.keys(process.env).filter((key) =>
    key.startsWith(PREFIX)
  );

  const variablesFromEnvFile = APP_ENV_VARIABLES.map(
    (v) =>
      new webpack.DefinePlugin({
        [`process.env.${v.replace(PREFIX, "")}`]: JSON.stringify(
          process.env[v]
        ),
      })
  );
  retValue.push(...variablesFromEnvFile);

  return retValue;
};

module.exports = definePlugins;
