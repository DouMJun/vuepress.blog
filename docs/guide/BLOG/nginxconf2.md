# 用Nginx在同一端口挂多个页面

想把正在做的博客和之前的商城一起放到服务器上，记录一下配置过程。

## 配置
- 只是在nginx.conf文件下添加了一点东西
  ```shell
  location /myblog {
    alias /... //文件目录,要用alias而不是root不然会报错
    index index.html index.htm
  }
  ```

- 同时在打包文件的时候设置`publicPath: '/myblog'`，不然找不到资源文件。

- 把本地文件上传到远程linux服务器`scp -r ./filename usrname@ip:/filename`，递归复制整个目录要加`-r`，[更多参数](https://www.runoob.com/linux/linux-comm-scp.html)
## 总结
- 简单记录一下配置免得忘了