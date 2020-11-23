# 写一个Promise(一)

## 前言
- 为了更好的了解`Promise`实现机制，参考了一些文章，试着自己写了一个简单的实现。
- 实现了简单的功能:
  1. 异步调用`then()`
  2. 可以链式调用
  3. 如果`then`参数为空时的解决
- 和参考的文章不同的是，用了`process.nextTick()`来模拟异步调用，因为浏览器没有此方法，所以在`node`环境下的进行测试，实现了`Promise`在事件循环中作为微任务的特点。
## 代码
```js
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class myPromise {
  constructor(executor){
    var self = this
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.fulfilledList = []
    this.rejectedList = []
    let resolve = function(value){
      if(self.status === PENDING){
        self.status = FULFILLED
        self.value = value
        self.fulfilledList.forEach(fn => fn())
      }
    }

    let reject = function(reason){
      if(self.status === PENDING){
        self.status = REJECTED
        self.reason = reason
        self.rejectedList.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch(error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected){
    onFulfilled = typeof onFulfilled === 'function'?onFulfilled: data => data
    onRejected = typeof onRejected === 'function'? onRejected:err => {throw err}

    let promise2 = new myPromise((resolve, reject) => {
      if(this.status === FULFILLED){
        process.nextTick(() => {
          try {
            let x = onFulfilled(this.value)
            resolve(x)
          } catch(err) {
            reject(err)
          }

        })
      }else if(this.status === REJECTED){
        process.nextTick(() => {
          try {
            let x = onRejected(this.reason)
            reject(x)
          } catch(err) {
            reject(err)
          }
        })
      }
      if(this.status === PENDING){
        this.rejectedList.push(() =>{
          process.nextTick(() => {
            try {
              let x = onRejected(this.reason)
              reject(x)
            } catch(err) {
              reject(x)
            }

          })
        })
        this.fulfilledList.push(() =>{
          process.nextTick(() => {
            try {
              let x = onFulfilled(this.value)
              resolve(x)
            } catch(err) {
              reject(err)
            }
          })
        })
      }
      
    })
    return promise2
  }
}
```

## 总结
- 还有很多功能没有实现，`all()`, `race()`等等，还有一个较为复杂的，对then()的返回值是否是promise进行判断的功能，有机会再做吧。既然标题写了(一)，以后应该还会写吧😀
- 下一周突然要考自控原理，打乱了我最近的计划，接下来的一周可能就没有时间更新了，要好好复习了。

参考:
- [Promise的源码实现](https://juejin.cn/post/6844903796129136654#comment)
- [手写 Promise](https://zhuanlan.zhihu.com/p/59363256)