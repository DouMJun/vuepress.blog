# 自动侧边栏插件

帮助你快速创建侧边栏:

## 如何使用：
- 第一步：
  下载
  ```js
  npm install vuepress-auto-sidebar-doumjun
  ```
- 第二步：
  在config.js文件中引入
  ```js
  //config.js
  const autosidebar = require('vuepress-auto-sidebar-doumjun')
  ```
- 第三步：
  在`themeconfig`中使用
  ```js
  //config.js
  themeConfig: {
    ...
    sidebar: {
        '/guide/BLOG/': [
          {
            title: '博客',//此处写标题
            children: autosidebar('/guide/BLOG/')//向autosidebar传入文档所在文件夹的路径
          }
        ]
    }
    ...
  }
  ```
- 第四步：
  打包查看效果
  ```js
  npm run docs:dev
  ```
## 上传npm插件
- 在要上传的文件夹下
  ```js
  npm init
  ```
  根据提示设置各项信息
- 设置好`README.md`等文件
- 发布
  ```
  npm login   //登陆npm
  npm publish //发布
  ```
## 总结
- 其实就是把之前写好的函数打包上传到npm了，简单修改了一下路径的获取，别的没怎么变。算是熟悉一下npm的使用吧。
- 后续应该会完善一些功能：
  - [ ] 选择是否要排序
  - [ ] 递归获得深层文件
  - [ ] 直接当作插件使用
- 突然感觉挖了好多坑hhh，~~咕咕咕~~
- 做完之后发现这个功能好像优点鸡肋hhh，vuepress本意就是要自己手动设置目录以便展示文档，自动设置好像没什么卵用，除非是像我一样简单作为记录博客hhh，不过还是记录一下第一次发布的鸡肋插件。
  