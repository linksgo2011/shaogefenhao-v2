---
title: Java 一些开源后台管理种子项目
toc: true
from: self
date: 2021-08-11 19:18:35
categories: 
  - 架构
sidebar: auto
permalink: /architecture/java-admin-boilerplate/
---

## 背景

我们做的业务系统大部分都是 xxx 管理系统，除了独有的业务逻辑之外，大部分都有一些公共的业务需求

- 权限管理
- 登录登出
- 图片上传
- 列表
- 表单
- 支付
- ...

于是很多人做了一些后台管理的脚手架，我整理了一些，吸收一些好的东西和方法到系统中。

## https://github.com/elunez/eladmin


项目基于 Spring Boot 2.1.0 、 Jpa、 Spring Security、redis、Vue的前后端分离的后台管理系统，项目采用分模块开发方式， 权限控制采用 RBAC，支持数据字典与数据权限管理，支持一键生成前后端代码，支持动态路由 


## https://github.com/white-cat/jeeweb

JEEWEB是一款基于SpringMVC+Spring+Hibernate的JAVA WEB敏捷开发系统；它是一款具有代码生成功能的智能快速开发平台；是以Spring Framework为核心容器，Spring MVC为模型视图控制器，Hibernate为数据访问层， Apache Shiro为权限授权层，Ehcahe对常用数据进行缓存，Disruptor作为并发框架，Bootstrap作为前端框架的优秀开源系统。

## https://github.com/lmxdawn/vue-admin-java

spring boot + mybatis + vue + element-ui 实现后台管理API接口

## https://gitee.com/xiandafu/springboot-plus

一个基于SpringBoot 2 的管理后台系统,有数十个基于此的商业应用，包含了用户管理，组织机构管理，角色管理，功能点管理，菜单管理，权限分配，数据权限分配，代码生成等功能 相比其他开源的后台开发平台脚手架，SpringBoot-Plus 使用简单，可以轻易完成中型，大型系统开发。

## https://github.com/yangzongzhuan/RuoYi

基于SpringBoot2.0的权限管理系统 易读易懂、界面简洁美观。 核心技术采用Spring、MyBatis、Shiro没有任何其它重度依赖。直接运行即可用。

## https://github.com/lihengming/spring-boot-api-project-seed

Spring Boot API Project Seed 是一个基于Spring Boot & MyBatis的种子项目，用于快速构建中小型API、RESTful API项目，没有后台管理系统，只有一个 API。

## https://gitee.com/naan1993/guns/

Guns基于Spring Boot2，致力于做更简洁的后台管理系统。包含系统管理，代码生成，多数据库适配，SSO单点登录，工作流，短信，邮件发送，OAuth2登录，任务调度，持续集成，docker部署等功。支持Spring Cloud Alibaba微服务。社区活跃，版本迭代快，加群免费技术支持。

## https://github.com/paascloud/paascloud-master

spring cloud + vue + oAuth2.0全家桶实战，前后端分离模拟商城，完整的购物流程、后端运营平台，可以实现快速搭建企业级微服务项目。支持微信登录等三方登录。

## https://github.com/macrozheng/mall

mall项目是一套电商系统，包括前台商城系统及后台管理系统，基于SpringBoot+MyBatis实现。 前台商城系统包含首页门户、商品推荐、商品搜索、商品展示、购物车、订单流程、会员中心、客户服务、帮助中心等模块。 后台管理系统包含商品管理、订单管理、会员管理、促销管理、运营管理、内容管理、统计报表、财务管理、权限管理、设置等模块。

## https://github.com/huanzi-qch/base-admin

Base Admin一套简单通用的后台管理系统
这套Base Admin是一套简单通用的后台管理系统，主要功能有：权限管理、菜单管理、用户管理，系统设置、实时日志，实时监控，API加密，以及登录用户修改密码、配置个性菜单等
