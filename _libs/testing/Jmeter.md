---
title: Jmeter 性能测试
date: 2021-08-11 19:18:36
categories: 
  - 测试技术
sidebar: auto
permalink: /testing/Jmeter/
---

Apache JMeter是一款纯java编写负载功能测试和性能测试开源工具软件。相比Loadrunner而言，JMeter小巧轻便且免费，逐渐成为了主流的性能测试工具，是每个测试人员都必须要掌握的工具之一。

## 安装方式

Jmeter 使用 Jar 发布，需要 java 运行环境，无需专门安装。
下载地址：http://jmeter.apache.org/download_jmeter.cgi

## 使用方式

下面是一个测试 web 访问的基本例子：

1. “测试计划” -> “添加” -> “Threads(Users)” -> “线程组”，配置线程数量、时长、循环次数等。
2. “线程组” -> “添加” -> “Sampler” -> “HTTP请求”  创建一个HTTP请求的示例
3. “线程组” -> “添加” -> “监听器” -> “察看结果树” 创建一个查看结果的方式，可以选择图形、断言等其他方式
4. 运行测试

Jmeter还可以创建变量等更高级的方式。

- 介绍文档 https://blog.csdn.net/u012111923/article/details/80705141
