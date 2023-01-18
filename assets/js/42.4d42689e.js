(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{401:function(t,e,a){"use strict";a.r(e);var r=a(42),s=Object(r.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"一起看电影吧"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#一起看电影吧"}},[t._v("#")]),t._v(" 一起看电影吧！")]),t._v(" "),a("p",[t._v("前几天和小朋友一起在b站上看电影，觉得这个一起看的功能很不错。不过只能在手机端使用，而且有很多影片看不了，所以就想着能不能自己做一个可以同时看电影的功能。")]),t._v(" "),a("h2",{attrs:{id:"实现思路"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#实现思路"}},[t._v("#")]),t._v(" 实现思路")]),t._v(" "),a("ul",[a("li",[t._v("学校内网有一个视频网站，包含了大量的资源。并且它请求资源的方式是直接利用"),a("code",[t._v("video")]),t._v("的src属性发送的GET请求，只要接入了校园网，可以很方便的进行拦截。")]),t._v(" "),a("li",[t._v("基本的功能就是可以用一个网页控制其他网页的视频播放情况，从网络上查了一些资料之后发现可以使用WebSocket实现。")]),t._v(" "),a("li",[t._v("WebSocket是一种网络协议，建立在TCP的基础之上，通过HTTP/1.1协议的101状态码进行握手。它的特点就是可以进行全双工通信，不必再以轮询的方式来查看数据是否更新，和发布订阅者模式有点像。")]),t._v(" "),a("li",[t._v("那么一起看功能的实现就是拦截对视频的操作，将暂停、跳转等动作发生拦截下来，并且向服务器发送相应的通知，服务器接收到数据，进行判断之后，再将进行的动作通知到每个连接到服务器的客户端，从而实现同步的暂停、播放、跳转等功能。")])]),t._v(" "),a("h2",{attrs:{id:"代码"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#代码"}},[t._v("#")]),t._v(" 代码")]),t._v(" "),a("ul",[a("li",[t._v("有了思路以后代码就很简单，和聊天室的实现差不多"),a("a",{attrs:{href:"https://github.com/DouMJun/MovieToghther",target:"_blank",rel:"noopener noreferrer"}},[t._v("代码地址"),a("OutboundLink")],1)])]),t._v(" "),a("h2",{attrs:{id:"问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#问题"}},[t._v("#")]),t._v(" 问题")]),t._v(" "),a("ul",[a("li",[t._v("报错："),a("code",[t._v("Uncaught (in promise) DOMException: play() failed because the user didn't interact with the document first.")]),t._v("\n在用户没有和DOM进行交互的时候调用video.play()等方法的时候就会出现这种错误，我的解决方法是打开页面时会弹出窗口，引导用户进行点击操作。")])]),t._v(" "),a("h2",{attrs:{id:"总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),a("ul",[a("li",[t._v("其它网站的视频大多都有同源限制，并且都以视频流的方式分割加载，不是很好获取。")]),t._v(" "),a("li",[t._v("这个功能做出来之后才和小朋友看了一集电视剧，她就实习去了，连不上校园网也没得看了，遗憾。。。")]),t._v(" "),a("li",[t._v("优化体验要重写播放器组件，可以更方便的跳转视频。用自己的DOM覆盖在vidoe上，监听点击拖拽等操作，不过有点麻烦。也可以加入房间号，分发动作的时候只对相应的房间进行分发。不过对服务器压力可能有点大，而且我也只是和小朋友看一下，私人定制hhhh")])])])}),[],!1,null,null,null);e.default=s.exports}}]);