import  "nunjucks";
import { writeFileSync } from 'fs';

var msg="Test";
nunjucks.configure({ autoescape: true });
msg=nunjucks.render('template.html',{});
writeFileSync('test.html', msg);
console.log("Write file");
