# 从零开始的博客开发(3)

## 功能与问题
- 为每篇文章添加一个目录，可以抓取二号标题
- 返回顶部

## 实现

### 目录

- 前几篇好像忘记说了，目前的md解析实现方法都有些问题，我把要提取出来的数据都放在了组件的`data`里边，因为每个组件是唯一的，所以`data`就没有用函数的形式，而是直接赋值，虽然可以实现需要的功能，但是不符合规定的使用规范，以后进行改进。
- 目录的实现是通过正则匹配每篇文章中的`<h2>`标签，把其中的内容设置为id属性，在展示文章的时候，通过id获得每个`<h2>`标签的高度，监听目录的点击，滚动页面到制定高度即可
- 代码：
  ```js
  //h2标签的匹配
  function setDoc(html) {
  var reg = /<h2>([\s\S]*?)<\/h2>/g
  var sidebar = []
  html = html.replace(reg, (str, content) => {
    sidebar.push("'"+content+"'")
    return `<h2 id='${content}'>
      <a href="#${content}"/>
      ${content}
      </h2>`
  })
    return {html:html, sidebar: sidebar}
  }

  //滚动
  //anchor是一个由当前文章h2标签高度组成的数组
  goto(index) {
      let timer = null,
          _that = this,
          flag = true,
          target = this.anchor[index]+250,
          max = document.body.scrollHeight - document.documentElement.clientHeight;
      flag = document.documentElement.scrollTop<target;
      console.log(this.anchor)
      timer = 
      requestAnimationFrame(function fn() {
        if (flag&&document.documentElement.scrollTop < target) {
          if(document.documentElement.scrollTop+50 >= max||document.documentElement.scrollTop+50 >= target){
            document.documentElement.scrollTop=Math.min(target, max);
            cancelAnimationFrame(timer);
          }else{
            document.documentElement.scrollTop += Math.max((target-document.documentElement.scrollTop)/30,50);
            document.body.scrollTop = document.documentElement.scrollTop;
            timer = requestAnimationFrame(fn);
          }
        } else if(!flag&&document.documentElement.scrollTop > target){
            if(document.documentElement.scrollTop-50 < target){
              document.documentElement.scrollTop=target;
              cancelAnimationFrame(timer);
            }else{
              document.documentElement.scrollTop -= Math.max((document.documentElement.scrollTop-target)/30,50);
              document.body.scrollTop = document.documentElement.scrollTop ;    
              timer = requestAnimationFrame(fn);
            }
        } else {
          cancelAnimationFrame(timer);
        }
      });
    }
  ```
- 为了让滚动更加丝滑，使用了一个`requestAnimationFrame()`函数，语法：`window.requestAnimationFrame(callback);`会自动向`callback`函数传入一个参数，表示开始去执行回调函数的时刻。返回一个整数，可以作为参数传入`window.cancelAnimationFrame()`来取消调用。简单说就是会以最佳的频率调用函数，只需要在回调函数中编写动画操作就行了。
- 遇到的一些小问题：
  1. - 当滚动到最底部时，会因为文档的总高度小于h2标签的高度+浏览器窗口的高度，导致滚动不到指定位置，因而一直停在最底部，滚不回去了。  
     - 解决的办法就是加个最底部的判断，当超出最大高度时，就停在最底部。
  2. - 当切换页面之后，目录的跳转位置没有变化，也就是`anchor`数组没有更新。
     - 目录组件是单独的，通过向它传入目录的数据实现相关的功能，一开始把读取anchor数组的代码写在了`created`钩子里，导致路由变化以后没有更新。改到`updated`里边就好了。
### 返回顶部
- 因为滚动原理差不多，就一起做了。代码如下：
- ```js


  mounted(){
    window.addEventListener("scroll",this.show,true);
  },
  methods: {
    //滚动
    back() {
      let backTop = null,
      _that = this;
      backTop = requestAnimationFrame(function fn() {
              if(document.documentElement.scrollTop > 0){
                document.documentElement.scrollTop -= Math.max((document.documentElement.scrollTop)/10,50);
                document.body.scrollTop = document.documentElement.scrollTop ;    
                backTop = requestAnimationFrame(fn);
              } else {
                cancelAnimationFrame(back);
              }
            });
    },
    //是否显示
    show(){
      this.isShow = document.documentElement.scrollTop > this.showHeight
    }
  },
  computed: {
  },
  destroyed(){
    window.removeEventListener("scroll",this.show);
  }
  ```
- 悬浮就是动态添加`class`设置`position: fixed;`

## 总结
- 对Vue的生命周期的理解加深了一点，一些数据更新方面的问题，多半是出在了生命周期函数的选择上。根据何时要更新数据，写在正确的钩子函数里边。
- **注意拼写**，因为拼写错误找了好久的错误，真的是蠢死了，最后发现是变量名字拼错了真的是想砸键盘
---
参考：
- [vue返回顶部组件](https://blog.csdn.net/jiaqingge/article/details/81147605)