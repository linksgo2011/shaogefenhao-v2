---
title: 常用断言写法
date: 2021-08-11 19:18:36
categories: 
  - 测试技术
sidebar: auto
permalink: /testing/assert-basic/
---


## 基本断言写法

使用 assertEquals

```
assertEquals(roleResponse.getName(), "new_super_admin");
```

使用 assertThat 配合 result matcher 实现
```
assertThat(roleResponse.getCreateAt(), isA(Timestamp.class));
```

## 使用 assertJ 中的BDD写法

使用 hasSize 和 contains 方法
```
assertThat(customers).hasSize(3).contains(customer1, customer2, customer3);
```

使用 equalTo 方法

```
assertThat(foundCustomer).isEqualTo(customer2);

```
