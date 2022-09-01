# vuepress自定义域名配置

> 记录一下配置过程中的问题
1. 购买域名，我是在阿里云购买的域名。购买之后需要实名认证才可以解析，并且在验证DNS解析的过程中，(域名解析工具)[https://zijian.aliyun.com/?spm=a2c1d.8251892.content.11.38d55b76hu0XMU#/domainDetect]，有可能出现因为浏览器缓存等问题造成的查询结果与实际不一致，如果确认自己已经完成各项认证，可以尝试清一下浏览器缓存再查询DNS解析结果。
2. 配置博客项目中的`deploy.sh`文件
    ```
    # 进入生成的文件夹
    cd docs/.vuepress/dist

    # 如果是发布到自定义域名
    echo 'example.com' > CNAME
    ```
3. 查询github page的ip地址：打开终端，ping一下自己部署的页面地址即可。
4. 进入购买域名的网站的控制台，配置一下域名解析：
    记录类型：A，记录值填写ip地址，主机记录填www或者@，最好创建两条。
5. 运行deploy.sh发布即可。
6. 访问你的域名查看效果，如果成功加载了页面，但是样式乱七八糟，那么有可能是配置中的路径有问题。打开/.vuepress/config.js，将base属性修改为'/'即可。
    ```
    // some code
    module.exports = {
      title: 'DOUMJUN',
      description: '欢迎访问我的博客',
      base: '/', // 如果这里以前填的是你的仓库名称，如：'/example'，就修改成'/'
      ...
    }
    ```