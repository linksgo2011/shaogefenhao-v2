---
title: JPA Criteria
date: 2021-08-11 19:18:36
categories: 
  - Spring
sidebar: auto
permalink: /spring/jpa-criteria/
---

## 在 EntityManager 中使用 Criteria 

```
// 1. 获取 builder
CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
// 2. 创建 query
CriteriaQuery<Feature> query = criteriaBuilder.createQuery(Feature.class);
// 3. 获取根对象，根对象可以有多个
Root<Feature> root = query.from(Feature.class);

// 4. 查询大于 1 的条件
Predicate predicate = criteriaBuilder.greaterThanOrEqualTo(root.get("id"), 1L);
Predicate predicate1 = criteriaBuilder.equal(root.get("name"), "年龄");

query.where(criteriaBuilder.and(predicate, predicate1));

// 4. 执行构造出的条件

List<Feature> resultList = entityManager.createQuery(query).getResultList();

```
