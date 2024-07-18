---
title: 系统设计 | 数据同步（全量+增量）方案选型
date: 2024-07-14 17:00:32
sidebar: auto
category: 
  - 软件架构
head:
  - - meta
    - name: keyword
      content: 寻找一种可靠的方案来同步数据。
      description: 寻找一种可靠的方案来同步数据。
---
![img_1.png](./data-synchronization%2Fimg_1.png)
## 01 全量同步

- SQL 全量 Dump 
- 数据导出

## 02 增量同步

- 主从复制：
- CDC：适合无感同步
- 时间：适合
- 自增ID：适合无更新的场景

## 03 技术选型

- Flink CDC
- Debezium
- Canal
- Maxwell
- Datax
- Kettle
- Stream Sets
- Spring Batch
- AWS DMS
- Azure Data Factory
- GCP Cloud Data Transfer Service
- AliCloud DTS

## 04 增量同步实战

