---
title: Mysql 常见性能优化方法
toc: true
date: 2021-08-11 19:18:36
categories: 
  - mysql
sidebar: auto
permalink: /mysql/mysql-optimization/
---

## 优化子查询

子查询的性能是非常差的，可以优化为 select 子句。

优化前

```
update clear_res set candelete=0 where resid in
(
 select distinct resourceid from att_attentionresult where important=0
);
```

优化后

```
 update clear_res set candelete=0 where resid in
(
  select resourceid from (
    select distinct resourceid from att_attentionresult where important=0
  ) as tmp
);
```
