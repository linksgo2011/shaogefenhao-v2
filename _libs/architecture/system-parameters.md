---
title: 常见线上调优参数和性能优化
toc: true
from: other
date: 2021-08-11 19:18:35
categories: 
  - 架构
sidebar: auto
permalink: /architecture/system-parameters/
---

## tomcat

```
#最大连接数
server.tomcat.max-connections=200
#最大线程数
server.tomcat.max-threads=300
#编码方式
server.tomcat.uri-encoding=UTF-8
#post提交数据最大大小，设置为0不限制
server.tomcat.max-http-post-size=0

```

## jvm

```

nohup java -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=128m -Xms1024m -Xmx1024m -Xmn256m -Xss256k -XX:SurvivorRatio=8 -XX:+UseConcMarkSweepGC -jar xxx.jar

-XX:MetaspaceSize=128m （元空间默认大小）

-XX:MaxMetaspaceSize=128m （元空间最大大小）

-Xms1024m （堆最大大小）

-Xmx1024m （堆默认大小）

-Xmn256m （新生代大小）

-Xss256k （棧最大深度大小）

-XX:SurvivorRatio=8 （新生代分区比例 8:2）

-XX:+UseConcMarkSweepGC （指定使用的垃圾收集器，这里使用CMS收集器）

```

## druid 数据库连接信息

```
spring:
  datasource:
    druid:
      type: com.alibaba.druid.pool.DruidDataSource
      driverClassName: net.sf.log4jdbc.sql.jdbcapi.DriverSpy
      url: jdbc:log4jdbc:mysql://localhost:3306/test?serverTimezone=Asia/Shanghai&characterEncoding=utf8&useSSL=false
      username: root
      password: 123456

      # 初始化配置
      initial-size: 3
      # 最小连接数
      min-idle: 3
      # 最大连接数
      max-active: 15
      # 获取连接超时时间
      max-wait: 5000
      # 连接有效性检测时间
      time-between-eviction-runs-millis: 90000
      # 最大空闲时间
      min-evictable-idle-time-millis: 1800000
      test-while-idle: true
      test-on-borrow: false
      test-on-return: false
      validation-query: select 1

```


## 参考资源

- https://zhuanlan.zhihu.com/p/31803182
