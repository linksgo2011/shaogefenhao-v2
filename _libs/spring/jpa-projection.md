---
title: JPA 投影
date: 2021-08-11 19:18:36
categories: 
  - Spring
sidebar: auto
permalink: /spring/jpa-projection/
---

## JPA 投影的用处

在 DDD 的读模型中，使用投影可以查询和领域模型不同的字段，带来非常大的灵活性。


如果有实体

```
public class Feature implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Integer step;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "feature_id")
    private List<FeatureValue> featureValues;

    @CreationTimestamp
    @Column(name = "create_at")
    private Timestamp createAt;

    @UpdateTimestamp
    @Column(name = "update_at")
    private Timestamp updateAt;
}
```

如果只需要查询 Feature 中部分字段，则只需要定义一个接口接收即可

```
public interface FeatureInterfaceProjection {
    String getName();
}
```
在 Repository 中使用

```
@Repository
public interface FeatureRepository extends JpaRepository<Feature, Long>,
        JpaSpecificationExecutor<Feature> {

    FeatureInterfaceProjection findDistinctFirstByName(String name);
}

```

FeatureInterfaceProjection 的用法是通过接口的投影

## 使用对象的投影（更常用）

将 FeatureInterfaceProjection  定义为对象也可以使用投影，提供的 setter/getter 方法即可

```

public class FeatureProjection {
    public FeatureProjection(String name) {
        this.name = name;
    }

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

```

例如在 Repository 中编写 

```
List<FeatureProjection> findAllByName(String name);
```


## 手写 JPQL 的方式使用投影

```
    @Query("select distinct new springbootboilerplate.read.FeatureProjection(f.name) from Feature f")
    FeatureProjection findFirstByName(String name);
```

在 select 的结果集中 new 出需要对象即可。

需要注意在 JPQL 中写完整结果集的类的对象 

springbootboilerplate.read.FeatureProjection 不然会报类找不到。

如果不想使用 new 的方法，可以使用在结果集的对象上/类上，打上 @Projection 注解，并给出类的来源 types 属性


## 参考资料

- https://stackoverflow.com/questions/46083329/no-converter-found-capable-of-converting-from-type-to-type
