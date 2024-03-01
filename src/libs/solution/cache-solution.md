---
title: Java 中的缓存策略
toc: true
date: 2021-08-11 19:18:36
categories: 
  - 技术方案
sidebar: auto
permalink: /solution/cache-solution/
---

缓存方案已经很成熟，可以参考相关的文章做技术选型。但是缓存策略比较麻烦，需要专门做一些处理。

## 根据 DDD 分层设计缓存策略

参考 DDD 分层思想进行缓存更新策略的设计：

1. 接入层缓存 - 在用例上做缓存，简单粗暴，使用的人也多，但是粒度太大，不是很好进行缓存 evict
2. 领域层缓存
	- 使用 JPA 对象做 unproxy 进行缓存，unproxy 有点像把领域模型转换层查询模型 ✅
    - 使用 CQRS，将查询模型和领域模型分开处理，只是缓存查询模型
3. 基础设施层缓存，使用 JPA hibernate 缓存（hibernate-ehcache，无需使用 unproxy）


## 使用的缓存的注意事项

1. 只在高频查询接口中使用缓存，所有为更新的查询不能使用缓存 (甚至可以使用 findForUpdate 这种专门的语句更新 JPA)
2. 缓存只是存放到无 proxy 的领域模型和查询对象上
3. 不缓存列表页，命中率太低，如果需要继续性能提升，直接配置读库即可，只是缓存热点 hash 数据。如果读库的查询性能不能满足，可以使用 ElasticSearch。



## 参考资料

-  Redis 多条件组合的查询列表页，大家怎么做缓存 https://ruby-china.org/topics/10211
-  缓存那些事 https://tech.meituan.com/2017/03/17/cache-about.html
