# 简介

> skey Admin 是skyeboot管理平台的前端支持，主要使用vue和iview UI框架完成页面交互，目前主要完成了用户管理，权限管理和资源管理模块

## 特征
+ 管理平台的UI布局使用inspinia_admin
+ 使用了Vue作为主js库，同时使用了vue-router，axios，vuex等vue全家桶
+ UI框架使用了局域vue2.0的iview和element-ui
+ 除了UI框架的自定义css本地引用，其余都是用CDN引入，减小打包js的大小
+ 图片文件使用了七牛云托管

## 安装

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
