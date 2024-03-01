---
title: Java JPA 行锁
date: 2021-08-11 19:18:36
categories: 
  - Spring
sidebar: auto
permalink: /spring/java-jpa-lock/
---

## 使用场景

当多个程序需要对同一个条数据访问，并发生争抢的情况，需要保证隔离性。例如在批量任务处理的场景下，job 1读取并更新一条数据时，job 2不应该修改这条数据。

原理为使用SQL的 select ... for update 语句。当事务被提交后，锁应该被释放。

## 使用JPA 实现

JPA 中 Repository 中有如下定义：

```

@Lock(value = LockModeType.PESSIMISTIC_WRITE)
@Query(value = "select t from Course t where t.id =?1 ")
Course queryAllById( Integer courseId);

```

在业务代码中，应加上下面语句,当事务处理完后，for update才会将行级锁解除

```
@Transactional(isolation = Isolation.READ_COMMITTED)
```


## 参考资料

- https://blog.csdn.net/zc_ad/article/details/83578487
