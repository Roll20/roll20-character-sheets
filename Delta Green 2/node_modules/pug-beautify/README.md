# Pug(former jade) beautify
    This tiny program is formatting a pug(former jade) template file.
    For reusability, it's made as a module suggested by @Glaving001
    https://github.com/vingorius/jade-beautify/issues/7
## Installation
```shell
npm install pug-beautify
```
## Test
```shell
npm test
```
### Options
    fill_tab : true/false,default true, fill whether tab or space.
    omit_div : true/false,default false, whether omit 'div' tag.
    tab_size : number, default 4, when 'fill_tab' is false, fill 'tab_size' spaces.

## How to use
```javascript
var output = pugBeautify(code);
```
```javascript
var output = pugBeautify(code,{fill_tab:true,omit_div:false,tab_size:4});
```

## Example code
```javascript
var fs = require('fs');
var pugBeautify = require('pug-beautify');
var code = fs.readFileSync('sample.jade','utf8');
var option = {
    fill_tab: true,
    omit_div: false,
    tab_size: 4
};
try {
    var output = pugBeautify(code,option);
}catch(error){
    // Error occurred
}
```
## Todo
