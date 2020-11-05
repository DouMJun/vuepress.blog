const fs = require('fs');//
let path = require('path');

let PUBLIC_PATH = 'D:/webPractice/vuepressblog/docs/guide/'

function autoSidebar () {
  var strRegex = "(.md)$"; 
  var re= new RegExp(strRegex);
  let sideBar = [];

  fs.readdirSync(PUBLIC_PATH).forEach(file => { 
    let title = file;
    let children = [];
    let obj = {};
    let path = PUBLIC_PATH+file;
    let childPath = "./guide/"+file;
    
    if(fs.lstatSync(path).isDirectory()){
      title = file.toLocaleUpperCase();
      
      fs.readdirSync(path).forEach(file => {
        let child = [];
        let newPath = childPath+"/"+file;
        
        child.push(newPath, file.replace(re,"").toLocaleUpperCase());
        console.log(child);
        children.push(child);
      })

      obj.title = title;
      obj.children = children;
      sideBar.push(obj);
    }
    
    
  })
  return sideBar;
}
module.exports = autoSidebar;
