const path = require("path");

module.exports = {
  entry: "./src/api-scripts/companion.js",
  output: {
    filename: "merged-compendium-companion.js",
    path: path.resolve(__dirname, "."),
  },
  mode: "development",
};
