---
title: maven 常见 scopes
toc: true
date: 2021-08-11 19:18:35
categories: 
  - 运维开发
sidebar: auto
permalink: /devops/maven-scopes/
---

1. compile 默认是compile。compile表示被依赖项目需要参与当前项目的编译，包括后续的测试，运行周期也参与其中，是一个比较强的依赖。打包的时候通常需要包含进去。

2. test 表示依赖项目仅仅参与测试相关的工作，包括测试代码的编译，执行。比较典型的如junit

3. runtime 表示被依赖项目无需参与项目的编译，不过后期的测试和运行周期需要其参与。与compile相比，跳过编译而已。在终端的项目（非开源，企业内部系统.中，和compile区别不是很大。比较常见的如JSRXXX的实现，对应的API jar是compile，具体实现是runtime的，compile只需要知道接口就足够了。oracle jdbc驱动jar包就是一个很好的例子，一般scope为runtime。  另runtime的依赖通常和optional搭配使用，optional为true。即可以用A实现也可以用B实现。

4. provide 意味着打包的时候可以不用包进去，别的设施（web container.会提供。事实上该依赖理论上可以参与编译、测试、运行等周期。相当于compile，但是打包阶段做了exclude的动作。

5. system 和provide相同，不过被依赖项不会从maven仓库抓，而是从本地系统文件拿，一定要配合systemPath使用
