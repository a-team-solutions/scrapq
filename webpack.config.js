const path = require("path");

module.exports = {
    devtool: "inline-source-map",
    entry: path.resolve(__dirname, "./lib/index.ts"),
    output: {
      path: path.resolve(__dirname, "/dist/browser/"),
      library: "scrapq",
      filename: "scrapq.min.js"
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: [".ts", ".tsx", ".js"]
    },
    externals: {
      cheerio: "cheerio"
    },
    module: {
      rules: [
        // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader?configFile="tsconfig.json"',
              options: {
                configFile: 'tsconfig.json'
              }
            }
          ]
        }
      ]
    },
  };
