# 从零开始的博客开发(3.1)

## 功能
- 小小改进，把获取文件创建时间的功能写成了webpack插件，这样在打包的过程中就可以自动生成创建时间
- 虽然功能很简单，不过也是开始了解webpack使用的开始，小小记录一下。
- 把手动路径设置改成了使用`path.resolve(_dirname, '相对路径')`

## 代码
```js

const fs = require('fs')
const path = require('path')
const PATH_STATIC = path.resolve(__dirname, '../assets/artical/')

class GetFileMakeTime {
  constructor(options){
    this.options = options
  }
  apply(complier) {
    complier.plugin('entryOption', function(compilation, callback) {
      const timeList = []
      fs.readdirSync(PATH_STATIC).forEach((file) => { 
        if(file.search(/\.md*/) !== -1){
          timeList.push({
              file: file,
              timeCom: fs.statSync(PATH_STATIC+'/'+file).mtimeMs,
              time: fs.statSync(PATH_STATIC+'/'+file).mtime
            })
          }
        }
      )
      fs.writeFile(path.resolve(__dirname,'../assets/time.js'), "export default "+JSON.stringify(timeList), (err) => {
            if(err){
              console.log(err)
            }else{
              console.log("文件修改时间写入成功！")
            }
      })
    });
  }
}

module.exports = GetFileMakeTime
```

## 总结
- 因为功能很简单，标题就设置成3.1了😄。
- 用webpack可以把之前的功能优化不少，要好好学习一下。