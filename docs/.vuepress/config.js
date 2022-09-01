const fs = require('fs')
const path = require("path")

const autoSideBar2 = require('vuepress-auto-sidebar-doumjun')

module.exports = {
  title: 'DOUMJUN',
  description: '欢迎访问我的博客',
  base: '/',
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '首页', link: '/guide/about', target:'' },
      { text: '博客', link: '/guide/BLOG/' ,target:''},
      { text: '算法', link: '/guide/Algorithm/' ,target:''},
      { text: '日常', link: '/guide/daily/', target:'' },
      {
        text: '更多',
        items: [
          { text: 'Github', link: 'https://github.com/DouMJun' ,target:'_blank'},
          { text: 'bilibili', link: 'https://space.bilibili.com/8096424', target:'_blank' }
        ]
      },
      
    ],
    sidebar: {
      '/guide/BLOG/': [
        {
          title: '博客',
          children: autoSideBar2('/guide/BLOG/')
        }
      ],
      '/guide/daily/': [
        {
          title: '碎碎念',
          children: autoSideBar2('/guide/daily/')
        }
      ],
      '/guide/Algorithm/': [
        {
          title: '算法',
          children: autoSideBar2('/guide/Algorithm/')
        }
      ],
      '/guide/': [
        {
          title: '首页',
          children: [  
          'contact', 
        ]
      }
      ]
    },
    lastUpdated: 'Last Updated'
  }
}