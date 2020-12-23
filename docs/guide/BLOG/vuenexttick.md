# 关于Vue.nextTick

## 用法
- 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，可以获取更新后的DOM
  ```js
  //官网的例子
  // 修改数据
  vm.msg = 'Hello'
  // DOM 还没有更新
  Vue.nextTick(function () {
    // DOM 更新了
  })
  Vue.nextTick()
    .then(function () {
      // DOM 更新了
    })
  ```
- 如果没有提供回调函数，则会返回一个Promise，可以使用`async`和`await`进行操作。

## 异步更新队列
- Vue在更新DOM时是异步执行的只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个watcher被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和DOM操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue刷新队列并执行实际(已去重的)工作。Vue在内部对异步队列尝试使用原生的Promise.then、MutationObserver和setImmediate，如果执行环境不支持，则会采用setTimeout(fn, 0)代替。
- 一个例子:
  ```js
  <div id="app3">
    <div id="div" >{{number}}</div>
    <button @click="click">click</button>
  </div>
  <script>
    var app3 = new Vue({
      el:'#app3',
      data:{
        number: 0
      },
      methods: {
        // 只会应用最后一次改变 
        click() {
          for(let i = 0; i < 100; i++){
              this.number++;
          }
          console.log(this.number);
        }
      }
    }) 
  </script>
  ```
  视图的响应只有最后一次的改变,测试如下：

---
<AsyncChange/>

- 那么如何让每一次改变都显示出来呢？  根据异步更新原理，只需要将数据改变操作异步执行即可：
  ```js
  click() {
    var that = this
    for(let i = 0; i < 100; i++){
      setTimeout(function(){
        that.number++
      },i*10)
    }
    console.log(this.number)
  }
  ```
  测试:

---
<AsyncChange2/>

## 总结
- Vue.nextTick可以保证在更新DOM之后获取到更新后的元素
- 异步更新队列有助于理解视图展示原理。
---
参考：
- [官方文档](https://cn.vuejs.org/v2/guide/reactivity.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97)
- [Vue 异步更新队列$nextTick](https://blog.csdn.net/qq_41257129/article/details/95175638)