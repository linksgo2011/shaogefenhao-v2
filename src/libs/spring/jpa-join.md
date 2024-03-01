---
title: JPA JOIN 的用法
date: 2021-08-11 19:18:36
categories: 
  - Spring
sidebar: auto
permalink: /spring/jpa-join/
---

## JPA JOIN 支持的条件

JPA JOIN 支持 内连接和左外连接，JPA 的 Join 必须是两个实体之间存在关联当前情况下才需要这样操作。

推荐只是简单地情况下这样使用，复杂的情况直接编写 native sql 来完成。

Feature 和 FeatureValue 是一对多关系，查询方法如下

```
    @Query("select distinct feature from Feature feature inner join fetch feature.featureValues")
    List<Feature> findFeatureWithJoin();
```

Feature 中需要设置一个一对多的关联

```
public class Feature implements Serializable {

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "feature_id")
    private List<FeatureValue> featureValues;

}
```

## 迫切关联连接

在查询的 JPQL 语句中有一个 fetch，这个 fetch 可以自动将join 后的结果集使用一对多的方式组织数据，避免 N+1 问题，平时项目都是用 fetch 的方法。

