---
title: JPA 批量增删改
date: 2021-08-11 19:18:36
categories: 
  - Spring
sidebar: auto
permalink: /spring/jpa-batch-operation/
---

## 批量增加

可以自定义一个 Repository 的实现，然后使用 entitymanager 的 persist 语句完成。

```

@Override
    @Transactional
    public <S extends T> Iterable<S> batchSave(Iterable<S> var1) {
        Iterator<S> iterator = var1.iterator();
        int index = 0;
        while (iterator.hasNext()){
            em.persist(iterator.next());
            index++;
            if (index % BATCH_SIZE == 0){
                em.flush();
                em.clear();
            }
        }
        if (index % BATCH_SIZE != 0){
            em.flush();
            em.clear();
        }
        return var1;
    }

```

在application.properties,设置spring.jpa.properties.hibernate.jdbc.batch_size
在application.properties,设置spring.jpa.properties.hibernate.generate_statistics（只是为了检查批处理是否正常）
在application.properties设置JDBC URL中rewriteBatchedStatements=true （特定于MySQL的优化）
在application.properties设置 JDBC URL中使用cachePrepStmts=true（启用缓存，如果您决定设置prepStmtCacheSize，  则也很有用  prepStmtCacheSqlLimit;等等;如果没有此设置，则禁用缓存）
在application.properties设置 JDBC URL中useServerPrepStmts=true（通过这种方式切换到服务器端预处理语句（可能会显着提升性能））
在实体中，使用指定的生成器，  因为MySQL IDENTITY将导致批处理被禁用
在DAO中，不时刷新并清除持久性上下文。这样，您就可以避免“压跨”持久化上下文。

不建议使用 JPQL 语句进行批量增加，会有一些奇怪的问题，实际工作中更多的使用原生 SQL 进行批量的增加。

## 批量删除

```
    @Modifying
    @Query("delete from Feature")
    void batchDeleteAll();
```

需要注意，在 @Query 做数据修改时，需要机上 @Modifying 注解

## 批量更新

```
    @Modifying
    @Query("update Feature feature set feature.name = ?1")
    void batchUpdateName(String newName);
```
