---
title: maven 常用命令和插件
toc: true
date: 2021-08-11 19:18:35
categories: 
  - 运维开发
sidebar: auto
permalink: /devops/maven-basic/
---

## maven 基本命令

不安装任何插件的命令

- mvn compile:编译，生成 target target里边编译后的class文件

- mvn clean 清理清 target里边所有文件

- mvn test-compile 编译test下的类，它首先会编译被测试的类

- mvn  package 打包，输出 jar 或者 war

- mvn source:jar  生成源码jar包 ，只打main里边的

- mvn install 安装命令，把打包成jar包 放到仓库里边，可以被使用

- mvn deploy 将最终的包复制到远程仓库



## 常用插件和作用



### maven-release-plugin

maven release 插件，功能主要有两个:

- 修改  pom 文件版本号，提交 git tag
- 执行 mvn deploy 将新版本推送到服务器

