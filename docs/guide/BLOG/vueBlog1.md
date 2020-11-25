# 从零开始的博客开发(1)

## 开始

- 最近用了vuepress搭了一个博客之后觉得很不错，一开始是想试着做一个vuepress主题，后来想了想，既然要做博客，不如直接用Vue从零搭建一个，于是乎就开始了~~紧张刺激~~的开发工作.

## 整体思路

- 由于目前还没有学过Node，对于服务器相关的不是很了解，所以打算做一个静态博客，页面实现思路模仿vuepress，将每个Markdown文件渲染成组件进行展示
- 博客页面整体做成三栏，左边是文章内容睦路，右边是个人信息和一些别的展示内容，中间展示博客目录和博客内容。
- 除了文章，还想要有归档页面，大概做成时间线的感觉，还有留言页面。
- 整体样式就用扁平化的风格，个人比较喜欢的感觉。
- 更多功能待补充。。。

## 问题

- 基本的文件内容就不多赘述，上来最先遇到的问题就是关于Markdown文件的解析。
- 最开始的思路：用markdown-loader和html-loader加载Markdown文件，但是这样一来要手动设置组件，然后手动添加路由。这显然是不合适的，每写一篇文章还要更改代码太逆天了。并且在此期间，我明白了在Vue中不能使用fs模块读取本地文件，vue的内容是运行在浏览器环境下的，而fs是在node中运行读取本地文件的。
- 那么问题来了，我在写vuepress的自动设置侧边栏工具的时候是可以使用fs模块的，这是为什么呢？于是我就又看了看官方文档，发现它的`config.js`文件是作为一个插件，在本地打包的时候就已经运行好了，而本地就是Node环境，所以fs模块可以生效。
- 然后我就想知道在运行了`npm run serve`之后发生了什么,这个留着以后搞明白了再说

## 解决方案
- 最后的解决方案，我去看了一下vuepress的源码，它是使用`markdown-it`loader解析Markdown文件，然后自定义了一个`markdown-loader`,把解析出来的html内容,放到vue组件的`<template>`内容里边，接着交给`vue-loader`处理，这样就把Markdown文件转换成了Vue组件。
- 于是我就模仿着写了一个`markdown-loader`，转换成了Vue组件
- 组件问题解决了，文件读取问题我在查了资料之后发现可以用`require.context()`方法来获得转换后的vue组件，语法`require.context(directory, useSubdirectories = false, regExp = /^.//)`。[具体用法参考](https://www.jianshu.com/p/c894ea00dfec)

## 代码
markdownLoader的简单实现，相关的样式我修改了一个喜欢的Typora主题拿来用了。
```javascript

const MarkdownIt = require('markdown-it')
const md = new MarkdownIt()
module.exports = function(src) {

  const html = md.render(`${src}`)
  const title = getTitle(html);
  return (
    `<template>\n
      <div id="write">
        ${html}
      </div>\n
    </template>\n
    `
  )
}
```

文件读取相关，导出的模块分别在加载路由和文章目录中引用
```javascript
//文件读取
//fileAPI.js
const files = require.context('@assets/artical/', false, /\.md$/)
import Time from "@assets/time.js"


const test = require('@assets/artical/')

const componentLists = []
const children = []
const pathLists = []
const articalLists = []

files.keys().forEach((item, index) => {
  let routeItem = {}
  let articalInfo = {}
  let path = item.slice(2, -3)
  let component = files(files.keys()[index]).default

  routeItem.path = path
  routeItem.component = component

  articalInfo.path = path 

  articalLists.push(articalInfo)
  children.push(routeItem)
})
//childeren用于设置子路由
//articalLists用于博客目录的展示和点击跳转页面时转向的路径
export {children, articalLists} 

```

## 总结
- 我会一直记录这个博客网站的搭建，从中学到了不少东西，同时也知道了有哪些知识不足的地方，最近要把webpack相关的知识学习一下，这个构建工具的重要性我已经领略到了。
- 目前的实现方式还有很多不足的地方，这个路由设置的方法没有办法进行懒加载，如果以后文章多了可能会性能低下。markdown文章的标题抓取，Tag设置，还有展示在目录中的文章前一部分内容的抓取等等，都还没有实现，一步一步慢慢来吧。
- 果然实践中可以学到很多，还有读源码也是很好的学习方式，希望可以坚持做好，并且坚持记录这个有趣的过程。
  
参考：
- [使用require.context实现前端工程自动化](https://www.jianshu.com/p/c894ea00dfec)
- [读 VuePress（三）](https://www.jianshu.com/p/a95c04a68d14) 
