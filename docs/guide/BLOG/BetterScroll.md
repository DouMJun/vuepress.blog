# Better-Scroll的使用

## 基本使用

封装模板：  
```JavaScript
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
```
使用参考[官方文档](https://better-scroll.github.io/docs/zh-CN/guide/)

## 注意
- 使用时`.wrapper`要有固定高度，并且设置`overflow: hidden`，并且`.content`高度要大于`.wrapper`，否则无法进行滚动。
- better-scroll获取滚动页面高度时，显示内容尚未加载完成，获得了错误的`scrollerHeight`,因而滚动页面大小小于要显示的页面大小。可以通过在初次加载页面和每次改变页面内容时，使用`scroll.refresh()`重新获得页面高度，解决无法滚动的问题。
