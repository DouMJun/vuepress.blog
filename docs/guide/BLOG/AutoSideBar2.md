# AutoSideBar2

### 起因
- 上次的版本做出来的侧边栏结构有点丑，并且我想要改变一下布局，后来在[官方文档](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E5%B5%8C%E5%A5%97%E7%9A%84%E6%A0%87%E9%A2%98%E9%93%BE%E6%8E%A5)看到了另一种侧边栏
  ```javascript
    // .vuepress/config.js
  module.exports = {
    themeConfig: {
      sidebar: {
        '/foo/': [
          '',     /* /foo/ */
          'one',  /* /foo/one.html */
          'two'   /* /foo/two.html */
        ],

        '/bar/': [
          '',      /* /bar/ */
          'three', /* /bar/three.html */
          'four'   /* /bar/four.html */
        ],

        // fallback
        '/': [
          '',        /* / */
          'contact', /* /contact.html */
          'about'    /* /about.html */
        ]
      }
    }
  }
  ```
  觉得更符合想要的效果，就稍微改变了一下。

### 代码
```javascript
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
```

### 使用
- 现在使用的时候需要传入当前页面的相对路径
  ```javascript
  '/guide/BLOG/': [
          {
            title: '博客',
            children: autoSideBar2('/guide/BLOG/')
          }
  ```
- 具体原理和上一板相同，只是传出格式有所变化