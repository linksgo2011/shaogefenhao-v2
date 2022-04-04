---
title: 微服务异常处理
date: 2021-08-11 19:18:35
categories: 
  - 架构
sidebar: auto
permalink: /architecture/microservice-exception/
---

在微服务调用中需要解决的一个问题是，怎么样远程调用看起来像使用本地方法。如果服务提供方抛出了异常，服务消费方可以直接catch，而不是在业务代码中解析HTTP的返回值等。

基本方案是服务的提供者使用 @ControllerAdvice 对异常进行输出包装（code、message），在调用方使用Feign 或者resttemplate 再转换成异常即可。

## 参考资料

http://www.cnblogs.com/wudimanong/archive/2019/04/15/10710923.html
