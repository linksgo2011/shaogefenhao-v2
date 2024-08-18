---
title: 技术方案 Webinar - 基于业务指标的容量估算
date: 2024-08-17 20:54:03
sidebar: true
head:
- - meta
- name: keyword
  content: 基于业务指标的容量估算
  description:  基于业务指标的容量估算
---

## 如何根据业务规模，进行估算性能测试指标

## 如何定义这些指标？

- 怎么算在线用户？大概多久内活跃过的用户算在线用户？
  - Token 没过期的算在线用户
- 怎么算并发用户？
  - 
- 怎么算 TPS/QPS, 甚至 RPS
- 怎么通过指标推算技术指标
  - 

## 技术指标推算的过程

- 业务调用的频次，有一个业务可能 API 被调用的更加频繁，有些不是。
- 高峰期预估，28原则是否总是适用？建议：根据业务形态，比如点餐集中在饭点，电商往往集中在晚8点
- 用户操作频次，Think time 一般算多少

## 录屏

- https://www.bilibili.com/video/BV1YKpZeeEzG/?vd_source=c7e3cdfa854db5e62b71fbb1a0bc251b