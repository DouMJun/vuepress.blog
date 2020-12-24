# Vue的初始化
一直搞不懂Vue是什么时候创建Watcher的，这两天看了一下源码，简单梳理一下。

## 初始化流程
- 当`import 'Vue'`时会执行一些函数
  ```js
  //vue/src/core/instance/index.js
  function Vue (options) {
    if (process.env.NODE_ENV !== 'production' &&
      !(this instanceof Vue)
    ) {
      warn('Vue is a constructor and should be called with the `new` keyword')
    }
    this._init(options)
  }

  initMixin(Vue)
  stateMixin(Vue)
  eventsMixin(Vue)
  lifecycleMixin(Vue)
  renderMixin(Vue)
  ```
- 在`initMixin()`中，可以看到最开始初始化时发生了什么
  ```js
  function initMixin() {
    Vue.prototype._init = function(){
      ...
      vm._self = vm
      initLifecycle(vm)   //初始化生命周期
      initEvents(vm)      //初始化事件监听
      initRender(vm)      //初始化一些渲染函数，如：$createElement
      callHook(vm, 'beforeCreate')  //beforeCreate钩子回调
      initInjections(vm)  //初始化注入数据
      initState(vm)       //初始化数据：props，data，methods，computed，watch
      initProvide(vm)     //解决在props/data已经初始化完之后才提供的数据？这里不是很懂
      callHook(vm, 'created')//created钩子回调
      ...
    }
  }
  ```
- 对数据进行双向绑定就发生在`initState()`中
  ```js
  function initState (vm: Component) {
    vm._watchers = []
    const opts = vm.$options
    if (opts.props) initProps(vm, opts.props)
    if (opts.methods) initMethods(vm, opts.methods)
    if (opts.data) {
      initData(vm)
    } else {
      observe(vm._data = {}, true /* asRootData */)
    }
    if (opts.computed) initComputed(vm, opts.computed)
    if (opts.watch && opts.watch !== nativeWatch) {
      initWatch(vm, opts.watch)
    }
  }
  ```
- 下面看一下Computed是如何绑定的，去掉了警告的判断部分：
  ```js
  function initComputed(vm: Component, computed: Object){
      const watchers = vm._computedWatchers = Object.create(null)
      //判断是否是服务端渲染
      const isSSR = isServerRendering()
      //遍历computed所有属性
      for (const key in computed) {
        const userDef = computed[key]
        const getter = typeof userDef === 'function' ? userDef : userDef.get
        if (!isSSR) {
          //在此处进行Watcher创建
          watchers[key] = new Watcher(
            vm,
            getter || noop,
            noop,
            computedWatcherOptions
          )
        }
        //将计算属性绑定到vm上
        if (!(key in vm)) {
          defineComputed(vm, key, userDef)
        }
      }
    }
  }
  ```
- 到此就知道了如何将`computed`加入观察者，其余属性也差不多。后边就是双向绑定那一套了。
- 再来看一下`defineComputed()`
  ```js
  const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
  }
  function defineComputed (
    target: any,
    key: string,
    userDef: Object | Function
  ) {
    sharedPropertyDefinition.get = createComputedGetter(key)
    sharedPropertyDefinition.set = noop
    Object.defineProperty(target, key, sharedPropertyDefinition)
  }
  ```
  简化过后可以看出就是设置了get和set属性

## 总结
- 简单梳理了一下初始化的一部分，对于生命周期的一些东西了解更多了一点。
- 关于源码的阅读稍微懂了点