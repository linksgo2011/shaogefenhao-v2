---
title: 一个敏捷项目需要的相关技术实践
toc: true
date: 2021-08-11 19:18:35
categories: 
  - 架构
sidebar: auto
permalink: /architecture/ecosystem-for-project/
---

一个项目可以做的很完善,也可以做的很简单,这篇文章就是总结了一个清单,来讨论我们在一个敏捷项目中可以做的比较完善的东西,比如CI/CD

## 质量内建

1. Check style - 代码风格检查
2. Test coverage - 测试覆盖率
3. fortify - Java代码静态分析
4. TDD - 测试驱动开发
5. Eslint - 前端代码检查

## 安全

1. Penetration - 渗透测试

## 工作方式

1. CI/CD 持续部署
2. Git Flow - 基于git的团队协作方式
3. Retro - 敏捷中反思项目的会议

## 监控恢复

1. monitoring
    - Ahportal - 一种监控的实现方式
2. DR - 灾难恢复方案

## 度量

1. CPU、内存、磁盘使用率
2. Max request量
3. AB 测试

## 环境管理

1. infrastructure as code - 根据项目代码创建基础设施
2. immutable infrastructure - 每次部署创建新的服务器
3. DB migration

## 分布式解耦

1. micro-service 微服务
2. SPA Project - 前后端分离

## 发布

1. Blue-Green - 蓝绿部署
2. Gray - 灰度发布
