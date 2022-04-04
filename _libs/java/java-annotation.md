---
title: Java 注解基础
toc: true
date: 2021-08-11 19:18:36
categories: 
  - java 基础
sidebar: auto
permalink: /java/java-annotation/
---

## 简介

注解是插到源代码中的标签，使用其他工具可以对其进行处理。例如  RequestMapping 这个注解的定义。Spring MVC 会使用 AOP 等机制在启动时对 RequestMapping 进行处理，添加到 RequestMap 列表中，响应用户请求。

```
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Mapping
public @interface RequestMapping {
    
}
```

Java 提供了一些元注解，用于修饰自定义的注解。

- @Target 限制注解使用的位置
- @Retention 注解保留的时间，RetentionPolicy.RUNTIME 会保留到运行时
- @Document 生成的文档是否包含这个注解
- @Inherited 使用在类上，是否运行子类继承这个注解

另外注解上还可以使用其他注解，从而实现复合注解。复合注解是 Spring 提供的注解增强能力。
