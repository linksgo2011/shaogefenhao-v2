---
title: API的contract测试之Pact
date: 2021-08-11 19:18:36
categories: 
  - 测试技术
sidebar: auto
permalink: /testing/contract-testing-pact/
---

## why?

当我们构建API的时候，需要保证API输出稳定，因此我们可以使用契约测试。
我们可以定义一个契约文件，然后消费者和API提供者并行开发，最终进行集成测试。

## pact 和 contact的区别

pact 是contact测试的一个实现

## 我的一个契约测试的例子

- https://github.com/domain-driven-design/contract-testing-mockmvc

## 一些资源

- pact文档 https://docs.pact.io
- Java 例子 https://github.com/DiUS/pact-workshop-jvm
