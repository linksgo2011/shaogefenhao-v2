---
title: Java 性能调优
toc: true
date: 2021-08-11 19:18:36
categories: java 基础
sidebar: auto
permalink: /java/java-performance/
---

# 参考资料

-《Java性能权威指南》

# 性能优化的一些原则

- 性能优化需要注意性价比，避免过早优化
- 找出性能瓶颈比优化更重要
- JVM性能优化只是非常小的一部分，更重要的是数据库和业务逻辑
- 优化之前使用性能测试工具，进行基准测试

# 性能优化工具

## 操作系统工具

- vmstat 查看CPU利用率
- typeperf CPU运行队列
- iostat 磁盘IO使用率
- nicstat 网络使用率

## Java 性能分析工具

- jcmd 显示JVM 信息工具
  - jcmd jinfo 显示JVM运行参数
  - jdcmd process_id 显示栈运行信息 
- jsstack 显示栈运行信息
- jconsole 显示Java编译

## 一些明显的  Java 性能问题

- SimpleDataFormat
- String
