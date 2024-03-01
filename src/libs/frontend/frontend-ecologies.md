---
title: 前端生态图谱
toc: true
date: 2021-08-11 19:18:35
categories: 
  - 前端工程
sidebar: auto
permalink: /frontend/frontend-ecologies/
---

## 思维导图

- 开发模式
    - 多页面开发 前端开发人员切页面然后和后端开发语言模板系统集成比如（PHP、JSP、EJS、JADE），后端进行渲染，前后端不分离，输出为JS、HTML、CSS等，前端开发可以对JS、CSS进行压缩或其他处理
    - 单页面开发 使用富前端开发思想，后端只需要提供一个入口的页面和API，前端负责路由和渲染。前后端分离，前端一般会对资源进行打包，然后输出一个index.html 和 app.js,前端完成所有的业务逻辑和API调用。
   
   
- 前端发展过程
    - 原生JS
    - JQuery + 插件开发模式，大规模的编写后台管理系统，easyUI
    - Backbone 的轻量级的MVC开发模式
    
- 开发模式
    - MVC 前端变成了一个application，index.html 入口启动, 
        - M model 一个可以操作的数据实体
        - V view 显示层，把数据渲染在页面上
        - C controller/collect 控制器
        - 代表的框架：Backbone
    
    - MVVM 解决了前端数据输入和输出映射问题
        - M model
        - V 视图
        - MV-VM 意义是数据渲染到视图中，然后也可以从视图中获取数据，这就是双向绑定
        - 代表框架：Angularjs 
        
    - 单项数据流+渲染引擎
        - React 是什么？React只是一个单项的高效的渲染引擎而已
        - 我们讲React的时候往往在谈论React+Redux一套完整的开发生态
        - React/VUE

- 前端构建工具
    - Node 前端开发为什么需要用Node？Node只是提供了一个JS的非浏览器运行环境（采用了chrome的V8引擎）。
    - Npm 一个nodejs 包管理工具和平台，NPM可以用来管理JS的依赖和包，NPM就可以安装大量的前端开发工具，NPM的描述文件为package.json
        - npm install 安装当前目录下package.json 中所有的依赖
    - 构建工具
        - grunt 提供了一个流处理工作环境，用来编写前端批处理任务，比如压缩JS、编译less、Sass等
            - grunt的描述文件为Gruntfile.js
            - grunt的工作方式为通过编写gruntfile来组合grunt插件完成相应任务
            - grunt 常用插件
                - requirejs 如果前端使用了模块化可以加载此类插件
                - uglify  
                - css_import 多个css组合成一个
                - cssmin 把css压缩成小文件
                - jshint 根据某种规则对JS代码检查
            - 一个例子项目 https://github.com/linksgo2011/backbone-weui
            
        - gulp 思路和grunt一致，但是gulp不仅提供了配置的方法，还可以交互式进行编程
        - webpack 资源的load和打包，webpack主要对单页面应用开发使用
            - 通过loader的思想，对前端资源进行管理和打包操作
            - Babel
            - Es6
            - Eslint
         
- React 生态
     - Reactjs
     - React-router
     - Redux
     - React form 
     - axios
     - 工具
        - lodash
        - moment
     - webpack 配置
     - 组件库 http://ant.design/
 
- Vue 生态

- 前端的模块化历史
    - 没有模块化的时候
        - 命名空间放置变量作用于泄露 app.xx.fun1 = function(){}
    - Requirejs
    - commonjs
