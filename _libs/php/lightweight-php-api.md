---
title: PHP 不同场景下技术选型的讨论
toc: true
date: 2021-08-11 19:18:36
categories: 
  - PHP 基础
sidebar: auto
permalink: /php/lightweight-php-api/
---


## 构建独立的API应用

不使用框架而搭建轻量级灵活的API接口，满足基本业务需求要求拓展性好。

### 技术选型

- Composer 包管理工具
- ToroPHP PHP路由框架
- Medoo PHP数据库ORM框架
- Monolog 日志框架
- JWT token消费和验证

## 构建小型企业网站

推荐使用 [x6cms](http://www.x6cms.com/) 这个cms的好处是构建了一个非常简单和完善的管理系统，该cms使用了CI框架开发

## 构建微信应用

推荐使用微擎，phpWechat
