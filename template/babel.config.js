"use strict";

const config = {
  plugins: [
    ["import", { libraryName: "antd", style: true }],
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    ["@babel/plugin-proposal-private-methods", { loose: true }],
    ["@babel/plugin-proposal-private-property-in-object", { loose: true }],
    [
      "babel-plugin-styled-components",
      {
        displayName: true
      }
    ]
  ],
  presets: [
    "@babel/preset-env",
    "@babel/preset-typescript",
    [
      "@babel/preset-react",
      {
        runtime: "automatic"
      }
    ]
  ]
};

if (process.env.NODE_ENV !== "test") {
  config.plugins.push([
    "react-remove-properties",
    { properties: ["data-testid"] }
  ]);
}

module.exports = (api) => {
  api.cache.forever();

  return config;
};
