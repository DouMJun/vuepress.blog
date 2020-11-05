---
sidebarDepth: 2
---


# 自动修改侧边栏的工具AutoSideBar()
---

## 想法
每次写博客还要手动配置config太麻烦了,虽然官方文档好像提供了自动配置的方法，不过还是想自己造个轮子试一试，顺便学习一下，虽然造的很烂就是了。

## 思路
读取`/guide/`文件夹下的文件，文件夹名作为`title`属性,文件名去掉后缀后作为文章题目。因为Node.js还不是很熟悉，百度了一下`fs.readdirSync()`和`fs.lstatSync()`的用法，制作了一个勉强能用的版本。

## 代码

```javascript
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

```

## 踩到的坑和笔记

- 最坑爹的地方:  
  fs模块读取文件的**相对路径**是以**启动服务程序时的位置**为基准进行读取的，一开始在写的时候老是报错找不到路径"../guide",明白之后直接用绝对路径`D:/webPractice/vuepressblog/docs/guide/`，问题解决。[参考](https://blog.csdn.net/k358971707/article/details/78775141)
- `fs.readdirSync()`用法
  传入一个相对路径或者绝对路径，返回一个数组，包含该路径下所有文件的文件名[参考](https://www.cnblogs.com/xiongwei2017/p/6624982.html)
- `fs.lstatSync(path).isDirectory()`
  判断是否是文件夹，`fs.lstatSync()`返回一个stat数组对象,存放文件相关信息下[参考](https://www.jianshu.com/p/5b52751873fd)


## 总结
- 相对路径问题解决了好久，终于在@皮蛋萌大佬的帮助下解决了问题,吃一堑长一智，以后会记得路径问题了。
- 代码还有很多需要改进之处，后续还会更新~~大概~~
  
  
  