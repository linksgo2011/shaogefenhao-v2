---
title: 技术方案 Webinar - 遗留系统改造和切换
date: 2023-04-15 20:55:03
sidebar: true
head:
- - meta
- name: keyword
  content: 遗留系统改造和切换
  description: 遗留系统改造和切换
---


## 如何改造一个遗留系统，且安全切换？

Ideas：

- 切换点
  - 用户
  - 上游系统（数据流入，依赖 API 取数、暴露的 API）
  - 下游系统（数据流出，数据推送和回传）
  - 报表
  - 数仓或者 MDM
- 数据迁移
- 新老系统并行
  - 试点
  - 数据同步
- API 兼容
  - 契约测试
  - OpenAPI 兼容
- 回退策略和预案
- 高级切换，准实时数据同步

## 录屏
