---
title: FastDFS 分布式文件系统方案
date: 2021-08-11 19:18:36
categories: 
  - 开源组件
sidebar: auto
permalink: /tech-components/fastDFS/
---

## 简介

FastDFS是一个开源的轻量级分布式文件系统，它对文件进行管理，功能包括：文件存储、文件同步、文件访问（文件上传、文件下载）等，解决了大容量存储和负载均衡的问题。特别适合以文件为载体的在线服务，如相册网站、视频网站等等。

## 基本原理

上传
1. client询问tracker上传到的storage，不需要附加参数；
2. tracker返回一台可用的storage；
3. client直接和storage通讯完成文件上传。

下载
1. client询问tracker下载文件的storage，参数为文件标识（卷名和文件名）；
2. tracker返回一台可用的storage；
3. client直接和storage通讯完成文件下载。
