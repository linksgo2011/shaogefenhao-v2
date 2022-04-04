---
title: 认证和授权的基本概念
toc: true
from: self
date: 2021-08-11 19:18:36
categories: 
  - 安全
sidebar: auto
permalink: /security/iam/
---

## 认证

认证是 authentication，指的是当前用户的身份，当用户登陆过后系统便能追踪到他的身份做出符合相应业务逻辑的操作。即使用户没有登录，大多数系统也会追踪他的身份，只是当做来宾或者匿名用户来处理。认证技术解决的是 “我是谁？”的问题。

## 授权

授权是 authorization，指的是什么样的身份被允许访问某些资源，在获取到用户身份后继续检查用户的权限。单一的系统授权往往是伴随认证来完成的，但是在开放 API 的多系统结构下，授权可以由不同的系统来完成，例如 OAuth。授权技术是解决“我能做什么？”的问题。

## 凭证

实现认证和授权的基础是需要一种媒介（credentials）来标记访问者的身份或权利，在现实生活中每个人都需要一张身份证才能访问自己的银行账户、结婚和办理养老保险等，这就是认证的凭证；在古代军事活动中，皇帝会给出战的将军颁发兵符，下级将领不关心持有兵符的人，只需要执行兵符对应的命令即可。在互联网世界中，服务器为每一个访问者颁发 session ID 存放到 cookie，这就是一种凭证技术。数字凭证还表现在方方面面，SSH 登录的密匙、JWT 令牌、一次性密码等。

## 一些权限模型

### RBAC

RBAC  是基于角色的访问控制（Role-Based Access Control ）在 RBAC  中，权限与角色相关联，用户通过成为适当角色的成员而得到这些角色的权限。

### ABAC 

ABAC（Attribute Base Access Control） 基于属性的权限控制，用于解决权限和对象之间的关系，例如用户有创建贴吧的权限，但是删除某个贴吧，需要具体某个仓库的权限。


## IAM 设计检查清单

- 登录时把其他人挤下线
- 图形验证码
- 撤回和注销
- 密码修改
- 密码输入错误次数
- 用户锁定
- 检查密码是否过期

## 参考资料

- http://www.printf.cn/index.php/archives/api-authentication-authorization-credential.html
- https://docs.microsoft.com/en-us/azure/role-based-access-control/overview

