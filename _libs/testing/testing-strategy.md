---
title: 测试策略
date: 2021-08-11 19:18:36
categories: 
  - 测试技术
sidebar: auto
permalink: /testing/testing-strategy/
---

一个项目需要做多少测试，做到什么程度，这属于测试策略的范畴。

## 分层测试

- API 层使用 MockMVC 进行简单的测试，目的是快速验证，mock 掉 Service
  - 测试的目标是返回的状态码等等信息
- Service 层结合 Repository 测试，测试业务逻辑，结合 DataFixture 来进行测试，这是测试重心之一
- Domain 测试使用纯的单元测试，测试业务逻辑, domain 保持干净可以不使用 Mock 工具,这也是测试重心
- Repository 有 ORM 实现，在 Service 处做测试

## 测试块描述风格

使用驼峰描述单元测试, 必须满足 it should xxx [when xxx] 格式

例如 

> it should return user list


## 数据准备

DataFixture 以实体为单位准备
  
## 集成测试

只做 API 测试，使用 user journey 测试方法，覆盖所有场景，本质上是一种集成测试方法。

断言各司其职，例如创建用户的测试需要断言创建后的信息，但是编辑的时候直接使用创建用户的场景，但不对用户创建再次断言。

集成测试只负责 Happy Path 测试


