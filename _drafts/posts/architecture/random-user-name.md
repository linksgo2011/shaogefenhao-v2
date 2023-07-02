---
title: 系统设计 | 随机用户名
date: 2023-04-18 22:04:32
sidebar: auto
category: 
  - 软件架构
head:
  - - meta
    - name: keyword
      content: 随机用户名
      description: 如何实现一个随机用户名？
---

前几天在技术方案讨论群里收到一个话题：

> 有没有好的方案来为新注册用户生成尽可能短、唯一且在高并发场景下性能良好的随机用户名？

大家给出了常见的技术方案：

- 使用 UUID
- 基于时间戳和随机数
- 基于哈希算法
- 基于名称池

这些方法都有一些显著的缺点，所以需要再讨论一下更合适的方案。

其实这个需求挺常见的，我们先分析一下这个需求背后的潜在要求可能有： 

- 不能太长，比如 8-12 位的字母、数字、下划线
- 唯一性
- 不容易被猜到，不泄露用户信息
- 生成效率高

这个问题其实和我们之前讨论的业务编号类似，不过更加简单，因为不需要考虑有序，也没有特殊规则。

经过讨论大家得出比较可行的推荐方案是： 

- 基于数据自增 ID 并通过混淆的方式得到无意义的用户名
- 混淆的方法有：
  - 设置自增起初值
  - 增加自增步长
  - 对 ID 进行进制转换获得高进制
  - 逆序
  - 使用简单的对称加密算法映射，因为不需要考虑 CPA 安全性，可以自己实现一个密文接近明文长度的密码，比如替换法、移位法