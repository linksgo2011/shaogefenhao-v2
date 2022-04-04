---
title: Hibernate 主键生成策略
toc: true
date: 2021-08-11 19:18:36
categories: 
  - hibernate
sidebar: auto
permalink: /hibernate/hibernate-id/
---

## 使用 JPA 生成策略

在实体中使用 @GeneratedValue 即可生成

```
public class Role implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

}
```

JPA 标准中默认支持四种策略

- TABLE //使用一个额外的数据库表来保存主键
- SEQUENCE //使用序列的方式，且其底层数据库要支持序列，一般有postgres、Oracle等
- IDENTITY //主键由数据库生成，一般为自增型主键，支持的有MySql和Sql Server
- AUTO //由程序来决定主键规则

如果不指定策略，默认为 AUTO

## Hibernate 内置策略

除了 JPA 标准策略之外 Hibernate 还有很多其他策略。可以在实体类中定义一个生成器。然后再 GeneratedValue 注解中使用即可。

```
@Entity
@Table(name = "ip_user")
@GenericGenerator(name = "jpa-uuid", strategy = "uuid")
public class User  implements Serializable {
    @Id
    @GeneratedValue(generator = "jpa-uuid")
    @Column(length = 32)
    private String userId;
    ...
}
```

在 Hibernate 源码中，DefaultIdentifierGeneratorFactory 注册了大量的生成器。


```
 public DefaultIdentifierGeneratorFactory() {
        register( "uuid2", UUIDGenerator.class );
        register( "guid", GUIDGenerator.class );            // can be done with UUIDGenerator + strategy
        register( "uuid", UUIDHexGenerator.class );         // "deprecated" for new use
        register( "uuid.hex", UUIDHexGenerator.class );     // uuid.hex is deprecated
        register( "assigned", Assigned.class );
        register( "identity", IdentityGenerator.class );
        register( "select", SelectGenerator.class );
        register( "sequence", SequenceStyleGenerator.class );
        register( "seqhilo", SequenceHiLoGenerator.class );
        register( "increment", IncrementGenerator.class );
        register( "foreign", ForeignGenerator.class );
        register( "sequence-identity", SequenceIdentityGenerator.class );
        register( "enhanced-sequence", SequenceStyleGenerator.class );
        register( "enhanced-table", TableGenerator.class );
    }

    public void register(String strategy, Class generatorClass) {
        LOG.debugf( "Registering IdentifierGenerator strategy [%s] -> [%s]", strategy, generatorClass.getName() );
        final Class previous = generatorStrategyToClassNameMap.put( strategy, generatorClass );
        if ( previous != null ) {
            LOG.debugf( "    - overriding [%s]", previous.getName() );
        }
    }
```

常用的说明

### uuid

采用 128位的uuid算法生成主键，uuid被编码为一个32位16进制数字的字符串。
当使用strategy为uuid时，使用的时hibernate自己定义的UUID生成算法，此策略已过时，其具体实现参照org.hibernate.id. UUIDHexGenerator, 生成的字符串如402880876359adeb016359ae27190000
当使用strategy为uuid2时，此为此版本推荐使用的uuid生成算法，其默认采用标准的生成策略StandardRandomStrategy，实现为使用jdk自带的uuid生成方法，生成的字符串如
4af17c8e-8317-43e9-aff9-12d5590a71c6

### assigned

插入主键时，由程序来指定。相当于JPA中的AUTO。

### guid

采用数据库底层的guid算法机制，对应MYSQL的uuid()函数，SQL Server的newid()函数，ORACLE的rawtohex(sys_guid())函数等
