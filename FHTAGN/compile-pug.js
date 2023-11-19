const fs = require("fs");
const pug = require("pug");
const data = require("./src/data.json");

const locals = {
  env: process.env.NODE_ENV,
  ...data,
};

// renderFile
var html = pug.renderFile("./src/index.pug", locals);
fs.writeFileSync("./index.html", html);
console.log("Compiled .pug files...");
