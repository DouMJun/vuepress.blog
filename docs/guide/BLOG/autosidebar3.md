# AutoSideBar3

## 改进
- 现在可以按照创建时间排序 

## 实现  

- 思路很简单，通过`fs.statSync().mtimeMs`读取文件创建时间，由于返回的时间是一个数字，因此可以很方便的进行排序。
--- 
- 主要代码：
```javascript
fs.readdirSync(t_path).forEach((file) => { 
    if(file !== 'README.md'){
      childMap.push({
        child: file.replace(re,""),
        time: fs.statSync(t_path+file).mtimeMs
      })
    }
  })
  childMap.sort((a, b) => {
    return parseInt(b.time) -parseInt(a.time)
  })
  childMap.forEach((item) => {
    children.push(item.child)
  })
```