---
title: 使用 DataJpaTest 对接数据库测试
date: 2021-08-11 19:18:36
categories: 
  - 测试技术
sidebar: auto
permalink: /testing/data-jpa-test/
---

## 一个测试基类


```
@RunWith(SpringRunner.class)
@ActiveProfiles(profiles = "test")
@DataJpaTest
public abstract class BusinessBaseTest {

    @Autowired
    private Flyway flyway;

    @Before
    public void setUp() throws Exception {
        flyway.clean();
        flyway.migrate();
    }
}
```

## 一些有用的注解

### RunWith(SpringRunner.class)

SpringRunner 启动了 Spring 上下文环境，但是没有启动 Spring boot 相关自动配置。


### @DataJpaTest

自动配数据源相关的配置。

