---
title: Hibernate bean 验证器
toc: true
date: 2021-08-11 19:18:36
categories: 
  - hibernate
sidebar: auto
permalink: /hibernate/hibernate-validator/
---



## JSR 380 Hibernate-validator

Bean Validation 遵循 Bean Validation 2.0 规范，基于 JSR 380 实现。

常见的验证器有：

| 注解 | 	作用 |
| ---- | ---- |
| @Valid| 被注释的元素是一个对象，需要检查此对象的所有字段值 |
| @Null| 被注释的元素必须为 null |
| @NotNull| 被注释的任何元素必须不为 null |
| @AssertTrue| 被注释的元素必须为 true |
| @AssertFalse| 被注释的元素必须为 false |
| @Min(value)| 被注释的元素必须是一个数字，其值必须大于等于指定的最小值 |
| @Max(value)| 被注释的元素必须是一个数字，其值必须小于等于指定的最大值 |
| @DecimalMin(value)| 被注释的元素必须是一个数字，其值必须大于等于指定的最小值 |
| @DecimalMax(value)| 被注释的元素必须是一个数字，其值必须小于等于指定的最大值 |
| @Negative| 被注释的元素必须是一个负数 |
| @NegativeOrZero| 被注释的元素必须是负数或 0 |
| @Positive| 被注释的元素必须是一个正数 |
| @PositiveOrZero| 被注释的元素必须是一个正数或 0 |
| @Size(max, min)| 被注释的元素的大小必须在指定的范围内 |
| @Digits (integer, fraction)| 被注释的元素必须是一个数字，其值必须在可接受的范围内 |
| @Past| 被注释的元素必须是一个过去的日期 |
| @PastOrPresent| 被注释的元素必须是一个过去或当前的日期 |
| @Future| 被注释的元素必须是一个将来的日期 |
| @FutureOrPresent| 被注释的元素必须是一个将来或当前的日期 |
| @Pattern(value)| 被注释的元素必须符合指定的正则表达式 |
| @NotEmpty| 集合对象的元素不为0，即集合不为空，也可以用于字符串不为 null |
| @NotBlank| 只能用于字符串不为null，并且字符串trim()以后length要大于0 |
| @Email| 被注释的元素必须是一个有效的邮箱地址 |

## 参考资料

- https://blog.csdn.net/y550918116j/article/details/78258916
- https://beanvalidation.org/
