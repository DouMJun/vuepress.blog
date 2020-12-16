# JS单例模式

今天面试的时候，面试官出了一道题：如何实现使用Axios时进行缓存，对于同一url发起的请求，如果已经发过一次，那么后续的请求直接使用缓存。当时有点蒙，说了个闭包用数组储存。结果面试官是想问单例模式hhh。那么就来学习一下什么是单例模式。

## 什么是单例
- 单例模式也称为单体模式，规定一个类只有一个实例，并且提供可全局访问点
- 有时候我们已经在无意中使用了这种模式：
  ```js
  let a = {
    name: 'single'
  }
  ```
  因为`let`声名变量不可以重复声名，所以用`let`直接创建一个对象也相当于一个单例。但是这样有很多缺点：
  1. 污染命名空间
  2. 可能会不小心覆盖
- 简单的单例实现：
  ```js
  function Single(name){
    this.name = name
  }
  Single.prototype.myname = function(){
    console.log(this.name)
  }
  let ProxyCreate = (function(){
    let instance = null
    return function(){
      return instance || (instance = new Single(...arguments))
    }
  })
  ```
## 实现
```js
let getUserName = (function(){
  let userName = null
  return function() {
    if(userName){
      return userName
    }
    return userName = Axios(url)
  }
})()
```

## 总结
- 今天面试字节跳动，发现自己还是差的很远，设计模式这块要开始系统学习一下了。
- 面试的时候有点紧张，具体的问题有点记不清了，如果给每个url都创建一个单例好像有点麻烦，我想的还是用闭包存一个映射表，后续学习过后再来看看吧。