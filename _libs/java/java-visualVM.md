---
title: Java 内存分析工具 VisualVM
toc: true
date: 2021-08-11 19:18:36
categories: java 基础
sidebar: auto
permalink: /java/java-visualVM/
---

VisualVM 是一款非常简单的分析 java 内存的开源软件，由Apache 开源发布。

它通过 jvmstat、JMX、SA（Serviceability Agent）以及 Attach API 等多种方式从程序运行时获得实时数据，从而进行动态的性能分析。


提供了如下功能

- 内存分析
- CPU 分析
- 线程分析
- 转储功能
- 堆转储的生成与分析
- 远程分析

VisualVM 使用非常简单，如果Java项目出现内存问题，可以使用该工具调试。

## 参考地址
- 介绍 https://www.ibm.com/developerworks/cn/java/j-lo-visualvm/index.html
- 官网 https://visualvm.github.io/
