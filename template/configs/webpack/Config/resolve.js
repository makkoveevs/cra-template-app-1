const path = require("path");
const rootDir = path.resolve(__dirname, "..", "..", "..");

module.exports = {
  extensions: [".ts", ".tsx", ".js", ".css", ".json"],
  alias: {
    src: path.resolve(rootDir, "src"),
    "styled-components": path.resolve(
      rootDir,
      "node_modules",
      "styled-components"
    ),
  },
  fallback: {
    buffer: require.resolve("buffer/"),
  },
};
