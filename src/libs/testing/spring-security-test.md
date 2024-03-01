---
title: 使用 spring-security-test 作为 user mock
date: 2021-08-11 19:18:36
categories: 
  - 测试技术
sidebar: auto
permalink: /testing/spring-security-test/
---

## 配置

```
this.mockMvc = MockMvcBuilders
        .webAppContextSetup(this.wac)
        .alwaysDo(MockMvcResultHandlers.print())
        .apply(springSecurity()) // 让 springSecurityFilterChain 生效
        .build();
```

## 注解使用

springSecurity提供了相关的组件spring-security-test，该组件提供了相关的注解来来*模拟用户登录信息*或者*调用用户登录的方法*，

- @WithMockUser 模拟用户，手动指定用户名和授权
- @WithAnonymousUser 模拟匿名用户
- @WithUserDetails 模拟用户，给定用户名，通过自定义UserDetails来认证
- @WithSecurityContext 通过SecurityContext构造器模拟用户





## 参考资源



- 官方文档（https://docs.spring.io/spring-security/site/docs/5.0.6.RELEASE/reference/htmlsingle/#test-method-withmockuser）
