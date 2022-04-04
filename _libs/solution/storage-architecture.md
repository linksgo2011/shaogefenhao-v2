---
title: 储存高性能架构
date: 2021-08-11 19:18:36
categories: 
  - 技术方案
sidebar: auto
permalink: /solution/storage-architecture/
---

常见方案

- 读写分离
- 分库
- 分表
  - 水平切分
  - 垂直切分
- 使用No SQL 
- 使用 Redis
- 使用 MemoCache
- 使用 Elastic Search
- 使用 Hbase 列数据库

## 读写分离

MySQL 读写分离后很可能有1s 左右的延迟需要考虑，解决主从延迟的方案

- 写操作后从主库完成读操作，缺点是对业务侵入较大
- 二次读取方案。先从从读取，如果没有读取成功，再从主机读取，可以从中间件层实施
- 关键业务从主机读取，例如用户信息，类似


## 分库分表

常见问题：

- 路由算法
  - 范围路由
  - HASH 路由
  - 配置路由
- join 问题
- count 问题
- 排序问题

实现方案：

- 代码层实现 
  - TDDL Taobao Distributed data layer

- 中间件
  - 阿里开源中间件 Drup
  -  官方 mysql-proxy
  -  奇虎开源中间件 Atals


分表经验：

- 单表数据超过1000W 行就需要考虑分表

## 全文索引

讲关系型数据库的内容转换成 json 输入给 Elastic Search 等全文数据库。


