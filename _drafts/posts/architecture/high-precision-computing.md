---
title: 系统设计 | 高精度计算
date: 2023-04-18 22:04:32
sidebar: auto
category: 
  - 软件架构
head:
  - - meta
    - name: keyword
      content: 关键字
      description: 描述
---

在金融、保险、电商等涉及金额计算的领域，常常需要高精度计算。但是由于计算机原理受限，普遍存在精度丢失问题。

例如，使用 JavaScript 在浏览器控制台输入：

> (0.1+0.2) == 0.3

我们会得到一个 false 的计算结果。

如果使用编程语言原生的计算方法会大量遇到精度问题。一般来说，我们可以考虑使用整数计算，例如在电商领域为了简单往往以分为单位计算金额。另外也可以使用编程语言提供的解决方案——高精度数据类型 Decimal。

所以今天我们以 BigDecimal 数据类型在应用设计中的使用来聊聊高精度计算（在 Java 中还有 BigInteger，但是基本上用不到）。

## Java 应用

在 Java 中，基本的数据类型可以用双精度浮点数和单精度浮点数表示。float 占 4 个字节 32 位，double 占 8 个字节 64 位（可以表达十进制 16 位数）。有限的长度也就意味着精度有限。其次基本数据类型在使用四则运算时候会得到意想不到的结果，不能用于金额、利率、汇率等有精度要求的计算场景。
    
例如，在金融领域利率可能需要计算到小数点后面 7-10 位，小数点前 10 位，使用基本数据类型需要手动处理比较、取整等问题。 所以一般我们在 Java 中使用 BigDecimal 这个包装类型来表达高精度数据。

但这都不是我们使用 BigDecimal 的本质原因，更重要的原因是 double 是浮点数，

**Decimal 常见使用方式**


**Decimal 原理**


## Mysql 数据库

## 前端



## 注意事项

- 传输过程中精度被截断。
- 使用基本单位。
- 截断策略
- 金融领域常见单位和长度

## 参考资料

- 從 IEEE 754 標準來看為什麼浮點誤差是無法避免的 https://medium.com/starbugs/see-why-floating-point-error-can-not-be-avoided-from-ieee-754-809720b32175
- 为什么叫浮点数? https://www.zhihu.com/question/19848808/answer/2480255398
- Double-precision floating-point format https://en.wikipedia.org/wiki/Double-precision_floating-point_format
- Java double.MAX_VALUE? https://stackoverflow.com/questions/16146219/java-double-max-value
- 不掌握这些坑，你敢用BigDecimal吗？https://juejin.cn/post/7121852516228136996
- 小数计算为什么要用BigDecimal而不是使用Double直接运算 https://juejin.cn/post/7107141352336392206
- Class BigDecimal https://docs.oracle.com/javase/1.5.0/docs/api/java/math/BigDecimal.html
- 饿了么技术专家总结之——double与BigDecimal使用姿势 https://zhuanlan.zhihu.com/p/94144867
- 你以为用了BigDecimal后，计算结果就一定精确了？ https://developer.aliyun.com/article/785039