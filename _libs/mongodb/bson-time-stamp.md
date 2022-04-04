---
title: mongodb 中时间戳的问题
date: 2021-08-11 19:18:36
categories: 
  - mongodb
sidebar: auto
permalink: /mongodb/bson-time-stamp/
---

Java 中 BsonTimestamp 的时间是秒数。

注意生成当前时间戳的时候需要做一些处理，例如 

> new BSONTimestamp((int) (now.getTime() / 1000), 0))

推荐使用 BSONTimestamp 类型。

## 相关资料

- https://www.programcreek.com/java-api-examples/index.php?api=org.bson.types.BSONTimestamp
