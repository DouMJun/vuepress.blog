#!/usr/bin/env sh
git add -A
git commit -m 'deploy'
git push -f git@github.com:doumjun/vuepress.blog.git master
# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
echo 'WWW.DOUMJUN.TOP' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
git push -f git@github.com:doumjun/doumjun.github.io.git master
# https://doumjun.github.io/vuepress.blog/
# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:doumjun/vuepress.blog.git master:gh-pages

cd -