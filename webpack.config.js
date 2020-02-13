module.exports = {
    devtool: "inline-source-map",
    entry: "./lib/index.ts",
    output: {
      path: __dirname + "/dist/browser/",
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
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        { test: /\.tsx?$/, loader: "ts-loader" }
      ]
    }
  };
