---
title: Spring Bean validation 最佳实践
toc: true
date: 2021-08-11 19:18:36
categories: 
  - Spring
sidebar: auto
permalink: /spring/spring-bean-validation/
---

## @Validated 和 @Valid 区别

- @Validated：用在方法入参上无法单独提供嵌套验证功能。不能用在成员属性（字段）上，也无法提示框架进行嵌套验证。能配合嵌套验证注解@Valid进行嵌套验证。

- @Valid：用在方法入参上无法单独提供嵌套验证功能。能够用在成员属性（字段）上，提示验证框架进行嵌套验证。能配合嵌套验证注解@Valid进行嵌套验证。

Spring Validation验证框架对参数的验证机制提供了@Validated（Spring’s JSR-303规范，是标准JSR-303的一个变种），javax提供了@Valid（标准JSR-303规范），配合BindingResult可以直接提供参数验证结果。

推荐使用 @Valid，如果需要嵌套验证也需要增加 @Valid 注解。
