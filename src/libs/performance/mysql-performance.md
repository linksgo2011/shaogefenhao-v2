---
title: SQL 性能优化
toc: true
date: 2021-08-11 19:18:36
categories: 
  - 性能优化
sidebar: auto
permalink: /performance/mysql-performance/
---

数据库优化方法

  1. 优化SQL（非常重要）
  2. 使用HandlerSocket
  3. 选择合适的数据库存储引擎
  4. 选择合适的数据库索引类型 hash 或者 btree

sql优化　

  1. 创建索引
  2. 复合索引
  3. 索引不会包含有NULL值的列
  4. 使用短索引
  5. 排序的索引问题
  6. like语句操作
  7. 不要在索引列上进行运算，会破坏索引
  8. 不使用NOT IN和<>操作s
