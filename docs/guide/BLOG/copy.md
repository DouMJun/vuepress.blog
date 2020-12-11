# 深浅拷贝

关于javascript的深浅拷贝方法。

## 浅拷贝
- 只对对象的第一层进行拷贝，深层仍然是引用
- 使用展开运算符`...`
  ```js
  var obj1 = {
    a:1,
    obj3: {
      c: 2
    }
  }
  var obj2 = {...obj}
  ```
- 使用`Object.assign(oldObj, newObj)`
  ```js
  var obj1 = {a:1}
  var obj2 = {}
  Object.assign(obj2, obj)
  ```
## 深拷贝
- 将对象完整的拷贝一份
- 递归实现
  ```js
  function deepCopy1(obj) {
    var obj2 = Array.isArray(obj)?[]:{}
    Object.keys(obj).forEach(item => {
      if(typeof obj[item] === 'object'){
        obj2[item] = deepCopy1(obj[item])
      }else{
        obj2[item] = obj[item]
      }
    })
    return obj2
  }

  var obj = {a:1}
  var obj2 = deepCopy1(obj)
  ```
- 使用`JSON.stringify()`和`JSON.parse()`
  ```js
  var obj = {a:1}
  var obj1 = JSON.parse(JSON.stringify(obj)) 
  ```

## 总结
- 之前就对深浅拷贝方法了解一点，这次总结一下。
- 递归实现深拷贝中还有其他的遍历方法，如: `for...in...`,`Objcet.getOwnPropertyNames()`
- 金工实习了一周，好久没更新博客了，接下来两个面试完了以后，就要准备期末复习还有别的事了，生活还是非常充实的hhh。