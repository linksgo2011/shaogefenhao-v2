---
title: 基于服务端 store 模式的多用户实时协作方案
toc: true
date: 2021-08-11 19:18:35
categories: 
  - 架构
sidebar: auto
permalink: /architecture/real-time/
---

## 解决的问题	

在很多系统中都有一些实时交互需求，例如 A 用户拖动一个图标，B 用户需要能实时感知。这对前后端开发都有较大的挑战，带来非常大的技术挑战。



另外也有一些基本的实时协作的需求，例如收到服务器的通知，然后展示出小红点。



## 主要技术选型

- store 模式前端简化交互
- 服务器 store 模式获得最终数据交互
- 通过 websocket 订阅 event 传送
- 通过 kafka 实现多播
- 通过 nodejs 作为后端同构语言，用于响应式编程
- 使用 MongoDB 作为文档数据库（取决于业务类型）
- 前后端使用同一事件处理代码

