const path = require("path");
const rootDir = path.resolve(__dirname, "..", "..", "..");

const babelLoaderTSX = {
  test: /\.(ts|js)x?$/,
  exclude: /node_modules/,
  use: [
    {
      loader: "babel-loader",
      options: {
        compact: false,
        plugins: [
          [
            "import",
            {
              libraryName: "antd",
              style: true,
            },
          ],
        ],
      },
    },
  ],
};

const mediaFileLoader = {
  test: /\.(png|jpg|woff|woff2|eot|otf|gif|ico|mp4|webm|webp|jpeg)$/,
  type: "asset",
  // use: [
  //   {
  //     loader: "file-loader",
  //     options: {
  //       outputPath: "assets",
  //       name: "[name].[ext]"
  //     }
  //   }
  // ]
};

const svgLoader = {
  test: /\.svg$/,
  use: ["@svgr/webpack"],
};

const svgNodeModulesLoader = {
  test: /\.(svg)$/i,
  include: /node_modules/,
  use: [
    {
      loader: "file-loader",
      options: {
        outputPath: "assets",
      },
    },
  ],
};

const fontLoader = {
  test: /\.ttf/,
  type: "asset",
};

const defineRules = (env) => {
  let retValue = [];

  if (!env.ISLINT) {
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    const cssLoader = {
      test: /\.css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
        },
        {
          loader: "css-loader",
          options: {
            import: true,
            importLoaders: 1,
            modules: {
              mode: "global",
              localIdentName: "[name]_[local]_[fullhash:base64:5]",
            },
          },
        },
        {
          loader: "postcss-loader",

          options: {
            postcssOptions: {
              plugins: [
                [
                  "postcss-preset-env",
                  {
                    plugins: [
                      {
                        importFrom: ["src/styles/index.css"],
                      },
                    ],
                  },
                ],
              ],
            },
          },
        },
      ],
    };

    retValue = [
      babelLoaderTSX,
      cssLoader,
      mediaFileLoader,
      svgLoader,
      svgNodeModulesLoader,
      fontLoader,
    ];
  } else {
    retValue = [babelLoaderTSX];
  }

  return retValue;
};

module.exports = defineRules;
