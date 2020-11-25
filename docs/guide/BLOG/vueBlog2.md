# 从零开始的博客开发(2)

## 功能与问题

- 提取每篇文章的标题
- 文章按照文件创建时间显示，并且在博客上显示创建时间
- 代码高亮以及添加行号

## 解决

- 关于标题提取:通过简单的正则匹配获得第一个`<h1>`标签
  ```javascript
  function getTitle(html) {
  var reg = /<h1>([\s\S]*?)<\/h1>/
  if(html.match(reg)){
      return html.match(reg)[1]
    }else{
      return ''
    }
  }
  ```
- 创建时间：由于对webpack还不熟悉，用了一个比较傻瓜的方法。新建一个`getTime.js`文件，用于读取每个文章的创建时间分别用`mtimeMs`和`mtime`保存，前者用于比较，后者用于显示。将每个文件名称以及对应的创建时间，作为一个对象。将所有文件的对象组成一个数组，导出到一个新的文件`time.js`里边用于存储。当Vue读取各个组件时，将`time.js`导入，再将每个文件对应的时间提取出来，用于排序和显示。  代码如下：
  ```javascript
  //getTime.js
  const PATH_STATIC = 'D:/webPractice/myBlog/myblog/src/assets/artical/'
  const timeList = []
  fs.readdirSync(PATH_STATIC).forEach((file) => { 
    if(file.search(/\.md*/) !== -1){
      timeList.push(
        {
          file: file,
          timeCom: fs.statSync(PATH_STATIC+file).mtimeMs,
          time: fs.statSync(PATH_STATIC+file).mtime
        }
      )
      }
    }
  )
  fs.writeFile('./src/assets/time.js', "export default "+JSON.stringify(timeList), (err) => {
        if(err){
          console.log(err)
        }else{
          console.log("文件修改时间写入成功！")
        }
  })

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
    let time = {}
    let path = item.slice(2, -3)
    let component = files(files.keys()[index]).default
    let title = component.data.title
    let timeCom = 0
    routeItem.path = path
    routeItem.component = component

    timeCom = Time[index].timeCom
    time = Time[index].time

    articalInfo.timeCom = timeCom
    articalInfo.title = title
    articalInfo.path = path
    articalInfo.time = time

    articalLists.push(articalInfo)
    children.push(routeItem)
  })
  articalLists.sort((a, b) => {
    return b.timeCom - a.timeCom
  })



  export {children, articalLists} 
  ```