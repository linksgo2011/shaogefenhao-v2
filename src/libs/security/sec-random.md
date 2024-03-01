---
title: 常用安全随机数发生器或者接口
toc: true
date: 2021-08-11 19:18:36
categories: 
  - 安全
sidebar: auto
permalink: /security/sec-random/
---



C 语言中的  rand random，java 中的 Random 都是伪随机数，在安全性要求高的场景，应该使用安全随机数。

Unix/Linx 平台应该使用 /dev/random

Java 语言中应该使用 SecureRandom 代替 Random。

