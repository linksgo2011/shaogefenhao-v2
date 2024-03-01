---
title: Java 原生的 service loader
date: 2021-08-11 19:18:36
categories: java 基础
sidebar: auto
permalink: /java/java-service-loader/
---

Java service loader 可以通过一个接口返回一组具体点实现，在实现策略模式时，特别有用。

在包 java.util.ServiceLoader 通过定义配置文件记载类的示例。

例如在 META-INF/services 中 定义一个文件，然后添加

```
org.hadoop.java.HDFSService
org.hadoop.java.LocalService
```
