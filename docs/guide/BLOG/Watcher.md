# 关于setImmediate()的执行
面试时被问到setTimeOut(),setImmediate() 以及 process.nextTik()的区别，回答的不是很好，回去查了一些资料，发现引出了不少知识点。

## 关于setImmediate()
- 先看一段代码：
```js
  setTimeout(()=> {
    console.log('setTimeout')
  },0)
  setImmediate(()=> {
    console.log('imma')
  })
  ```
  直觉来看，应该是先输出'setTimeout'，然后是'imma',但是实际运行之后发现，有时settimeout在前，有时imma在前。这是为什么呢?
- 调用`setTimeout()`,会将其插入到定时器观察者的**红黑树**中,每次Tick执行时，会从红黑树中迭代取出定时器对象(O(logn))，检查是否超过时间，超过就形成事件，立即执行回调函数。定时器观察者类似于I/O观察者，只是不需要I/O线程池的参与。
- 而`setImmediate()`属于check观察者，`process.nextTick()`属于idle观察者，他们的优先级顺序：`idle > I/O > idle`。所以事件循环的过程中会先检查`process.nextTick()`,然后是`setTimeout()`,最后是`setImmediate()`。
- 那么根据上面的规则，结果应该和直觉一致才对，但是多次执行的结果却不一样。原因是：Node在执行时，如果`setTimeout()`延时为0，那么会改成1,相当于延时1ms，如果主线程执行速度很快，检查定时器观察者时还没有过去1ms，那么就不会执行回调，继续去检查check观察者。此时就是先执行`setImmediate()`,反之就是先执行`setTimeout()`。
- 另一端段代码：
  ```js
  setTimeout(()=> {
    console.log('setTimeout1')
    setTimeout(()=> {
      console.log('setTimeout2')
    },0)
    setImmediate(()=> {
      console.log('imma1')
    })
  },0)
  //setTimeout1
  //imma1
  //setTimeout2
  ```
  此时的结果是固定的，先输出`imma1`，按照上面的理论，检查定时器观察者，取出来执行最外层`setTimeout`，输出`etTimeout1`，并将`setTimeout`加入到定时器观察者中，再将`setImmediate`加入到check观察者，执行完毕。接下来检查check观察者，将`setImmediate`取出并执行，输出`imma1`。再进行下一轮检查定时器观察者，输出`setTimeout2`
## 总结
- 还是有很多疑问：
  1. Node中还有那些观察者？
  2. Promise会加入微任务队列，那它是什么观察者呢？
- 对Node的学习也要提上日程了。