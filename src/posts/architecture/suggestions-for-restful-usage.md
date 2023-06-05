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
      description: 项目上关于 RESTFul API 的痛点和注意事项整理
---

虽然 RESTFul API 已经成为业界对于 API 的共识，但是不得不说，但是不得不说它具有很多局限性。

RESTFul API 和很多的技术流传的原因类似：始于一种非常理想化的愿景，但是在落地时却需要做出权衡和取舍。

它的流行开始于 Roy Fielding 的演讲，Roy Fielding 也是 HTTP 协议标准作者之一。

我猜测 Roy Fielding 的想法是，HTTP 协议已经是一个完善的应用层协议了，对于应用开发来说，只需要将所有的网络数据抽象为 URI 资源，然后配合可选的 Method 以及状态码就够用了。

但是，在我们实际落地的情况中，**HTTP 的表达力完全不够**。其限制主要有这几个：

- 不是所有的信息都能抽象为静态资源，总会有一些动态行为存在。例如 Github 的 Star 操作，即使抽象为 star-records 也违反人的表达认知。
- HTTP Method 无法在应用层随意拓展，很多行为难以被表达为合适的 Method
- HTTP Status 无法在应用层拓展，很多业务状态无法使用 HTTP Status 表达

基于这些原因，人们为了遵守 RESFul 不得不绞尽脑汁，而如果使用 RPC 风格的 API 只需要使用合适的动词作为 URI 以及合适的 Payload 报文格式即可。

但是，总体来说，在一定程度上，使用 RESTFul 风格，可以做到自解释性，减少了文档的依赖。而它的缺点，也可以通过一些团队规约避免。

本文基于技术研讨会讨论的内容，整理了一些使用 RESTFul 的一些建议。

## 01 使用版本号解决版本不兼容问题

版本化 API 会有很多好处，而版本化 API 有很多种风格，包括：

- 使用 URL 前缀
- 使用 URL 后缀
- 使用 Header 传参
- 使用 Query 参数

推荐使用 URL 前缀实现，这样对后面 API 定义无侵入性且能通过 URL 表达版本。

实例：`GET /v1/products/{id}`

## 02 资源路径参考领域模型

在一般情况下，可以以模块、聚合根作为路径前缀，让路径排列更有规律。

参考类似模式： `/[模块]/[版本号]/[聚合根]/{id}/[实体]/{id}/[属性/动作]`

- 在微服务项目中，模块部分可以是服务名
- 资源参考领域模型设计用词，因此需要使用名词复数
- 为了弥补 RESTFul 不足，允许在路径结尾使用属性或者动作满足特定业务需求
- 一般 URL 路径和文件名风格类似，使用中横线（Dash）
- 和领域模型的层次类似，URL 层次不要太深，通过拆分小聚合实现短 URL

## 03 谨慎选择 HTTP Method

HTTP 协议提供了很多多的 Method，但是处于团队理解成本的原因建议只使用下面几个 HTTP Method：

- GET 查询
- POST 新增
- PUT 修改/更新
- DELETE 删除

避免使用 PATCH，原因是无法表达业务含义，往往产生破坏性变更。例如，将保存的出库单提交，业务上需要修改单据的状态。应该避免使用 Patch 部分更新单据，建议使用 `PUT /xxx/submit` 的形式设计，让团队更容易理解。

## 04 实体的单复数应具有实际意义

通过 URL 应该能识别出返回的结构类型是否是一个列表或者分页的包装对象。

例如，通过 `GET /v1/orders/{id}`能猜测出返回结果是一个资源对象。

而通过 `GET /v1/orders` 能猜测出其结果是一个列表。

在某些项目中，复数词汇的 URL 默认返回分页对象，而一些项目会给分页 URL 添加一个 page 后缀，例如 `GET /v1/orders/page`。 

## 05 合理实现幂等性

幂等含义：相同输入，应得到相同返回。

- GET 天然具有幂等性
- PUT DELETE Method 应设计为具有幂等性
- POST 根据实际情况进行幂等性设计，例如在消息体中要求调用方传入事务 ID 实现幂等

## 06 提前设计查询语言或关键字

如果需要实现复杂的查询，可以提前设计一套基于 Query 参数的查询规则，尽可能实现通用的数据库字段查询。

需要考虑：

- 分页
- 排序
- 关键字搜索
- 与过滤条件
- 并过滤条件
- 开闭区间查询

这类实现一般需要结合具体数据库查询框架，例如 JPA、QueryDsl、Mybatis Plus 的 Wrapper 查询能力。

例如下面一个基于 Mybatis Plus 的通用 QueryWrapper：

```java

// 查询条件的父类
public class QueryCondition {
    private String name;
    private Integer age;
}

// 为通用字段生成查询 Wrapper
public class MyMapper<T> extends BaseMapper<T> {
    public List<T> queryByCondition(QueryCondition condition) {
        QueryWrapper<T> queryWrapper = new QueryWrapper<>();
        LambdaQueryWrapper<T> lambdaQueryWrapper = queryWrapper.lambda();

        // 根据条件动态构建查询
        if (condition.getName() != null) {
            lambdaQueryWrapper.like(T::getName, condition.getName());
        }

        if (condition.getAge() != null) {
            lambdaQueryWrapper.eq(T::getAge, condition.getAge());
        }

        // 执行查询
        return selectList(queryWrapper);
    }
}
```

## 07 状态码的选用

状态码的选用只用于前端处理一些通用的错误，而具体的业务规则错误统一使用 409（业务规则冲突）来返回，并返回约定的错误码、报错信息。

参考如下：

- 200 请求成功
- 201 创建成功
- 400 数据校验失败
- 401 用户未认证
- 403 权限检查失败
- 404 资源找不到
- 405 不支持的 Method
- 409 业务规则冲突
- 415 不支持的数据请求格式
- 500 服务器内部错误
- 503 BFF 转发后端错误

## 08 批量处理接口

批量处理也是 RESTFul 风格 API 不好处理的地方。有一些常见的做法：

1. 由于 URL 使用复数已经代表资源，因此需要增加 `/batch` 后缀作为 URL 区分
2. 使用类似版本号的处理方式在 URL 前增加 `/batch` 前缀
3. URL 上可以不区分，在传入参数的格式上区分。例如批量创建用户，通过传入一个列表

方案 2 看似更符合 RESTFul API 风格，实际上非常容易让人困惑，无法通过 URL 语义区分批量接口；方案 2 的问题是，批量接口并不常见，使用前缀会影响很多接口的语义。

在一些文章中，还会区分 bulk 和 batch 的区别，认为 bulk 是对多个资源处理同样的操作，而 batch 是针对多个资源处理不同的操作。

当然在实践中我们不用如此区分，但在微服务环境下一些基础服务往往需要提供批量接口，避免循环调用带来的性能问题。

一些分页接口的例子： 

- 批量创建订单  `POST /v1/orders/batch`
- 批量提交订单 `POST /v1/orders/batch-submit`

## 09 动词名词化技巧和场景

有些情况下动词 API 在充分建模的情况下也可以名词化。

比如登录的接口，我们在建模充分后识别到登录行为本质上创建了一个会话或者凭证，于是可以将：

`POST /v1/users/login `

改写为： 

`POST /v1/authorizes`

另外一个例子，在金融领域需要对资产进行估值，看似应该使用：

`POST /v1/assets/calculate`

其实应该改写为：

`POST /v1/capital-rating-transactions`

每次评估后都会产生一次事务 ID。

## 10 可以参考的 API 规范和示例

除了前面的建议外，我们也经常参考一些真实的 API 设计规范，下面是一些常见可参考模仿的 API 设计示例：

- https://docs.github.com/en/rest?apiVersion=2022-11-28
- https://jsonapi.org/
- https://wiki.onap.org/display/DW/RESTful+API+Design+Specification

## 参考资料

- https://en.wikipedia.org/wiki/Representational_state_transfer
- https://www.codementor.io/blog/batch-endpoints-6olbjay1hd
- https://medium.com/paypal-tech/batch-an-api-to-bundle-multiple-paypal-rest-operations-6af6006e002
