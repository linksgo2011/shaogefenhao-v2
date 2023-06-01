---
title: 系统设计 | RESTFul API 使用问题和建议
date: 2023-05-30 23:59:25
sidebar: auto
category: 
  - 软件架构
head:
  - - meta
    - name: keyword
      content: RESTFul，API
      description: 项目上关于 RESTFul API 的痛点和注意事项
---

管理信息开发团队RestFulAPI规范

REST：英文 representational state transfer 直译为表现层状态转移，或者表述性状态转移。URL指定资源，以HTTP方法动词进行不同的操作。URL具有很强可读性的，具有自描述性，可以规范化请求过程。

适用场景：使用云开发范式进行开发的产品、具有实体类似概念的产品。

1.[建议]使用版本号解决版本不兼容问题

在url中保留旧版本号，兼容多个版本

例：GET /v1/users/{user_id)

例：GET /v2/users/{user_id)

2.[建议]规范使用HTTP方法，描述API

POST 新增DELETE删除PUT 修改/更新GET查询

PATCH统一约定不使用

3.[强制]资源路径严格遵循从根到子的层次结构

/module/version/resources/{id}/sub-resources/{id)/[property]

/微服务名/版本号/实体/(实体号》/子实体八子实体号M[属性]

例：POST /base/v1/users/{user_id}/roles/{role_id}

4.[建议]URL层次结构不超过两层

5.[建议]GET请求的URL可以指向实体的属性，POST、PUT、

DELETE只指向实体

例：GET /v1/users/{user_id}/name//获取用户名称

例：POST /v1/user //新增用户

//添加用户的角色

例：PUT /v1/user //修改用户信息

6.[强制]URL中的实体、子实体，使用全称

7.[强制]实体的单复数应具有实际意义

Get /model/version/resources/{resource_id} //获取某一个 resource

Get /model/version/resources

//获取resources列表清单

8.[建议]合理添加名词、形容词、介词后缀，区分类似场景

API

Get /model/version/resources/all

//获取所有资源列表

Get /model/version/resources/active //获取有效的资源列表

Get /model/version/resources/mine//获取我的资源列表

9.[建议]URL尽量使用名词，避免使用动词

尽量避免使用动词，当场景较复杂无法避开动词时，仅允许在URL尾部添加1个动词

/model/version/resources/{resource_id}/{action}

10.[建议]与当前路径无关的过滤参数，可以放到请求参数里

Get /model/version/resources?pageNum=0&pageSize=20&sort=aa:asc&sort=bb:desc

11.[建议]PUT DELETE应具有幂等性

PUT DELETE 应具有幂等性，POST根据实际情况进行幂等性设计，GET天然幂等。

幂等：相同输入，应得到相同返回。具体实现中需要联合幂等因子一起设计。

