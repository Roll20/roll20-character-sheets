const fs = require('fs/promises');

const parse = async () => {
  const text = await fs.readFile('./5eShaped.html','utf8');
  const foundObj = text
    .match(/name="(?:attr|act|roll)_[^"]+/g)
    .reduce((o,t) => {
      const [,typ,name] = t.match(/(attr|act|roll)_(.+)/);
      if(!o[`${typ}Array`].includes(name)){
        o[`${typ}Array`].push(name);
      }
      return o;
    },{attrArray:[],actarray:[],rollArray:[]});
  Object.entries(foundObj).forEach(([key,arr])=>{
    arr.sort((a,b)=> a.localeCompare(b));
    fs.writeFile(`./${key}.json`,JSON.stringify(arr,null,2),'utf8');
  });

};
parse();