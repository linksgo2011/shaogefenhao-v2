---
title: 大型系统 IAM 机制
toc: true
date: 2021-08-11 19:18:36
categories: 
  - 安全
sidebar: auto
permalink: /security/sso-oauth/
---

对于大型系统来说，IAM 不仅需要考虑多端的接入，还需要考虑性能。主流的使用如下方案：

- web 走 CAS，通过全局 Session 和 本地 Session 的方案，session 通过使用 spring-session 存放数据到redis
- APP 和客户端走 OAuth
  - 通过 JWT 实现本地验证，节省流量
  - 设置 access_token 为10mins 快速过期
  - 设置 refresh_token 为 JWT token，并通过一定时间的黑名单的机制进行 token 撤销操作
