---
title: Mock工具 wiremock
date: 2021-08-11 19:18:36
categories: 
  - 测试技术
sidebar: auto
permalink: /testing/Wiremock-for-java/
---

Wiremock 是一个Java环境中的Mock工具，非常容易和Junit等单元测试框架集成。

## The JUnit 4.x Rule

在JUnit4中可以使用Rule的注解，来直接启动

```java

@Rule
public WireMockRule wireMockRule = new WireMockRule(options().port(8888).httpsPort(8889));


```

## standalone 模式

这种模式可以使用Wiremock提供的jar运行文件直接启动。

> java -jar wiremock-standalone-2.11.0.jar


## tips

1. 可以使用录制模式来获取以后Mock的数据
2. 如果遇到HTTPS需要配置certificate
3. 更多信息查看文档 http://wiremock.org/docs/

## 一些资源

官网

http://wiremock.org/
