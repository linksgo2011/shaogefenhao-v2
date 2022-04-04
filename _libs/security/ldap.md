---
title: ldap
toc: true
date: 2021-08-11 19:18:36
categories: 
  - 安全
sidebar: auto
permalink: /security/ldap/
---

LDAP是轻量目录访问协议，英文全称是Lightweight Directory Access Protocol，一般都简称为LDAP。它是基于X.500标准的，但是简单多了并且可以根据需要定制。与X.500不同，LDAP支持TCP/IP，这对访问Internet是必须的。LDAP的核心规范在RFC中都有定义，所有与LDAP相关的RFC都可以在LDAPman RFC网页中找到。

一般在大型企业IT架构中使用，用于维护一个中心化的用户账户和权限，例如JIRA、邮箱、WIKI等。另外一个实现是windows 的活动目录（AD）

OpenLDAP是LDAP协议的一个开源实现，具有组件：

- OpenLDAP OpenLDAP的服务器本身，目录服务器
- phpLDAPadmin 管理图形界面
- PWM 用户自主账号管理
- 客户端 （各个接入的应用自己实现，例如JIRA）

## 资源

- OpenLDAP 安装https://wiki.archlinux.org/index.php/OpenLDAP_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)
