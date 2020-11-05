const fs = require('fs');//

const PUBLIC_PATH = 'D:/webPractice/vuepressblog/docs'


function autoSideBar2(path) {
  var strRegex = "(.md)$"; 
  var re= new RegExp(strRegex);

  let children = [];
  let t_path = PUBLIC_PATH + path;
  fs.readdirSync(t_path).forEach((file) => { 
    if(file !== 'README.md'){
      children.push(file.replace(re,""));
    }
  })
  console.log(children);
  return children;
}
autoSideBar2('/guide/BLOG/')

module.exports = autoSideBar2;