---
title: H5 webapp技术选型
toc: true
date: 2021-08-11 19:18:35
categories: 
  - 前端工程
sidebar: auto
permalink: /frontend/H5-webapp-tech-stack/
---

### VUE 技术方案 (如果需要嵌入微信等APP中，推荐该方案)

- vuejs2.0
- vue-router
- vuex
- mint-ui
- Jest


常用lib信息

| 包名   |      用途      |
|----------|:-------------:|
| Vue | VUE视图 | 
| Vue-router | 路由 |
| Typescript | 静态类型 |
| vuex | 状态管理 |
| mint-ui | ui框架 |
| Jest | 测试框架 |
| axios | HTTP库 |
| immutable | immutable 工具 |
| moment | 时间处理库 |
| vue-class-component | vue 的面向对象形式 |
| vue-property-decorator | vue 装饰器 |
| vuex-class | vuex的面向对象形式|
| vconsole | 手机网页调试工具 |

参考资料:

- vue官方脚手架 (支持 TS、Babel、Vuex、SASS): https://www.npmjs.com/package/vue-cli
- https://segmentfault.com/a/1190000013676663 VUE + TS的项目搭建


### HBuilder方案

- mui
- Hbuilder

成本低廉，开发方面，原生的webview API和切换性能也可
参考案例：https://github.com/linksgo2011/tinda_app_cordova/

注意事项

- 每个页面为一个独立的窗口
- 返回会有数据刷新问题
- 窗口内如果发生页面跳转，会造成路由不一致
- 尽量使用页面 + API的方式快速开发


### React技术选型

- React
- Redux 
- webpack

参考案例

- cnode 客户端方案可以构建出web、mobile各种平台


### Jquery技术方案

- mui
- zepto.js or jquery.js

参考案例

- vue购物车 https://github.com/liu-zhuang/Vue-Demo
- https://github.com/zoeminghong/shopping-cart-vue-project
- 音乐APP https://www.cnblogs.com/smartXiang/p/6055616.html

## 打包方案 

使用cordova http://wiki.printf.cn/h5/h5/Build package with Apache Cordova
