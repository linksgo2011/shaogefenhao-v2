---
title: 技术方案 Webinar - 微服务中的鉴权（Auth）怎么做？
date: 2022-11-05 22:14:00
sidebar: true
head:
- - meta
- name: keyword
  content: 微服务的 Auth
  description: 微服务的 Auth
---

## 话题聚焦

在微服务架构中，Authentication 和 Authorization 一般怎么实现？用什么框架？

一般都会做一个单独的服务实现一个 IAM。 比如，如果我现在创建了一个项目，需要编写一个 AuthServer 如何实现？

## 案例输入

李威：API6 作为认证的 Client，在云原生微服务网关，API6 提供了相关的管理面板，用户体系还是自己实现。

林宁：

- 自己实现，使用 WebFilter 做 Auth 服务，全部自己写，比如使用 JWT。
- 使用 Spring Security，Spring Security Core 比较简单，可以使用这个代替 Spring Security。
- 使用 Apache Shiro 非常简单，功能不多。
- 使用 Spring Security OAUth2 实现微服务的鉴权。
- 使用 Auth0、Okta、Forgrok 等第三方鉴权服务和体系（IDAAS）。

SimonHan：有的项目 SAML 用来做 SSO，spring-cloud-starter-oauth2。

邓老师：JWT + WebFilter 自己实现一套鉴权体系，没有使用 OAUth2 协议，也没有使用框架。


根据现状，用的比较多还是 OAUth2 体系。


## IAM 技术选型

微服务鉴权，按照选型优先级：

- jwt + WebFilter
- spring-security-core
- spring-security-web
- spring-security-oauth2
- spring-cloud-starter-oauth2
- shiro-core

## 其他问题

**怎么理解常见的协议? **

**前端 token 存在哪里？Cookie 还是 LocalStorage、SessionStorage**

Cookie 需要设置为 HTTP only，防止 XSS 攻击。

**鉴权拦截在哪里做？**

**生产上 OAUth2 常见的参数配置，比如过期时间怎么设置？**

- 一般的会话过期时间
- Access Token 的过期时间
- 密码修改时间
- 密码强度策略

TODO 

## 相关包框架的说明

**spring-security-oauth2 vs spring-cloud-starter-oauth2**

https://stackoverflow.com/questions/53500219/spring-security-oauth2-vs-spring-cloud-starter-oauth2

**spring-security-core vs spring-security-web**

网上很多的教程使用了 spring-security-web 改写为了 token 模式。

参考：https://stackoverflow.com/questions/54821191/differences-between-spring-security-lib

## 常见的 Auth 服务需要提供的功能

- CSRF token、XSS 过滤
- 两步认证，比如电话、邮箱
- 集成各种三方登录（实现 OAUth2/Saml 客户端）
- 设备绑定和绑定
- 给第三方提供登录，比如第三方 API，提供（OAuth2/Saml 服务）
- 重试限制
- 集成验证码平台，人机校验
- 活体校验
- 密码周期
- 密码强度

## 相关的分布式授权协议

**OAUth2**



**SAML**


## 拓展话题

服务间的 Auth 怎么做？按照场景的情况排序如下：

1. 网络隔离，同子网可以互相调用，不用鉴权，不同的网络直接网络不同，相当于使用防火墙策略实现。
2. 如果是直接调用，可以使用一个服务间的 Token，或者一个 Service Account，通过服务名来验证时候调用的来源可靠。
3. JWT 的共享密匙，如果用户的 Token 能被解开，说明有密匙，可以信任。
4. 如果使用 API 市场，可以使用 AK/SK 机制。
