---
title: OAuth2 架构设计
date: 2021-08-11 19:18:35
categories: 
  - 架构
sidebar: auto
permalink: /architecture/OAuth2/
---

## OAuth2 背景

OAuth（Open Authorization，开放授权）是为用户资源的授权定义了一个安全、开放及简单的标准，第三方无需知道用户的账号及密码（只是其中一种授权方式），就可获取到用户的授权信息
OAuth2.0是OAuth协议的延续版本，但不向后兼容OAuth 1.0即完全废止了OAuth1.0。

OAuth 可以让不同的资源服务器使用同一个鉴权服务器,常见应用场景为第三方授权，以及给自己的 APP 或者 SPA 应用提供鉴权服务。

OAuth 的网站 https://oauth.net/2/ 

OAuth 可以在一台服务器上完成，也可以分布式的在多台服务器上完成。

## 使用 Spring Security OAuth


Spring Security OAuth 体系中，依照 OAuth2 的规范有三个角色

- Provider 授权提供者，负责签发token
- Authorization Server 授权验证服务器，负责验证token
- Resource Service 资源服务器，资源提供者同时验证是否有权限访问

