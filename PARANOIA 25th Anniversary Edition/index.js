const fs = require('fs');
const nunjucks = require("nunjucks");

callback = (err) => { if (err) throw err; };

nunjucks.configure({ autoescape: false });
fs.writeFile("paranoia25.html", nunjucks.render("html.njk"), callback);
fs.writeFile("paranoia25.css", nunjucks.render("css.njk"), callback);
