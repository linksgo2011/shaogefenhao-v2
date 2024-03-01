---
title: Spring boot 项目远程 debug
toc: true
from: self
date: 2021-08-11 19:18:36
categories: 
  - Spring
sidebar: auto
permalink: /spring/spring-boot-remote-debug/
---

## Spring boot 项目远程 debug 


可以在启用了远程调试支持的情况下运行打包的应用程序。这样做可以将调试器附加到打包的应用程序，如以下示例所示：

> java -Xdebug -Xrunjdwp:server=y,transport=dt_socket,address=8000,suspend=n \
       -jar target/myapplication-0.0.1-SNAPSHOT.jar



## 参考资料

https://docs.spring.io/spring-boot/docs/2.3.0.RELEASE/reference/htmlsingle/#boot-documentation-about
