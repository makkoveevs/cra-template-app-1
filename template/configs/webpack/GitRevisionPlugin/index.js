const { GitRevisionPlugin } = require("git-revision-webpack-plugin");
const os = require("os");

const gitRevisionProps = os.type().toLowerCase().includes("windows")
  ? {}
  : {
      branch: true,
      versionCommand: "describe --tags --always",
      lastCommitDateTimeCommand:
        "log -1 --date=format:'%d.%m.%Y %T' --format='%ad'",
      branchCommand: "rev-parse --abbrev-ref HEAD"
    };

const createGitRevisionPlugin = () => new GitRevisionPlugin(gitRevisionProps);

module.exports = { createGitRevisionPlugin };
