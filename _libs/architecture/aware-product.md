---
title: Java web 项目线上环境配置清单
toc: true
from: self
date: 2021-08-11 19:18:35
categories: 
  - 架构
sidebar: auto
permalink: /architecture/aware-product/
---

[toc]

## Linux VM 配置

- 用户配置
  - 数据库
  - 应用
- 开启防火墙
- 开启服务器监控
- 确保开启日志
- 合理设置安全组，关闭不常用的端口
  - iptables 设置
  - firewall 设置
- 设置合理的时区
- 常见异常的处理
- 系统监控
- 密匙管理



## docker file 配置

- 使用合理的基础镜像，减少大小 （alphine）




## Mysql 配置

- 开启 bin-log 复制

- 设置合理的时区

- 设置合理的字符集

- 设置合理的存储引擎

- 有合理的唯一健和索引

- 视情况使用的外键，高并发的场景不建议使用外键

- 对 UUID 采用合理的索引

- 考虑数据迁移的便利性

  

## JVM 配置



## Nginx 配置

- gzip
- js 压缩和混淆

## 应用配置


###  Java 应用 线程池配置

Spring boot项目中一般会配置一个全局线程池，我们一般会使用  Executor 类型作为各种多线程的场景。

一个典型的配置如下，如果需要精细的调优，需要结合CPU数量、内存、网络 IO、应用类型等实际情况优化。


```java 

@Bean("taskExecutor")
ThreadPoolTaskExecutor createTaskExecutor(){
  ThreadPoolTaskExecutor threadPoolTaskExecutor = new ThreadPoolTaskExecutor();
  // 核心线程数量为线程常驻数量，一般和 CPU 数量保持一致
  threadPoolTaskExecutor.setCorePoolSize(8);
  // 最大的线程数量为弹性值，往往和应用是否为计算密集还是 IO 密集有关系，可以一般设置为 CPU 数量的两倍
  threadPoolTaskExecutor.setMaxPoolSize(16);
  // 等待队列的大小和业务处理能力有关，根据实际情况调整
  threadPoolTaskExecutor.setQueueCapacity(200);
  // 说明该线程池的用途，用于日志中输出
  threadPoolTaskExecutor.setThreadNamePrefix("async-task-executor");
	//当线程队列满了时候的拒绝策略，这里设置为直接调用执行，也就是阻塞模式
threadPoolTaskExecutor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
  threadPoolTaskExecutor.initialize();
  return threadPoolTaskExecutor;
}
```

### Jedis Pool 配置


Jedis 是一个 Redis 连接客户端，在主动和哨兵模式下需要使用连接池来提高性能，Jedis 的性能受制于单次 Redis 存取的效率、并发连接数等，下面是一个典型的配置。


```java
public JedisPoolConfig() {
		// 最大连接数，一般取决于并发量，大多数网站来说几百的连接数已经够用
 		setMaxTotal(500);
    // 最大空闲连接数，一定的空闲有利于性能，否则会反复创建和释放连接，如果并发量比较均匀可以设置小一点
    setMaxIdle(100);
    // 默认是 0 可以不设置，一般设置为 0，当没有请求时，释放全部连接
    setMinIdle(0);
    // 当资源池用尽后，调用者是否要等待。一般建议开启，否则会抛出错误，有回退策略的情况下可以关闭，防止雪崩效应
    setBlockWhenExhausted(true);
    //BlockWhenExhausted 开启后才有效，设置最大的等待时间，超出最大的时间会报错
    setMaxWaitMillis(1000*60*1000);
    // 向资源池借用连接时是否做连接有效性检测，无效连接会被移除，建议开启。并发量大可以关闭，会增加一次 ping
    setTestOnBorrow(true);
    // 向资源池归还连接时是否做连接有效性检测,无效连接会被移除，建议开启。一个机房内一般不会出现无效连接
    testOnReturn(true);
    // 下面几个是空闲资源监测的配置，一般可以不用配置，采用默认配置即可
    // 是否开启空闲资源监测
    setTestWhileIdle(true);
    // 资源池中资源最小空闲时间
    setMinEvictableIdleTimeMillis(60000);
    // 空闲资源的检测周期
    setTimeBetweenEvictionRunsMillis(30000);
    // 空闲资源检测的连接数， -1 是所有连接
    setNumTestsPerEvictionRun(5);
}
```

### Elastic Search 配置

ES 使用 HTTP Client  通信，因此配置比较简单。

```yml
spring:
  data:
    elasticsearch:
      # 地址相关略过
      # 连接超时时间
      connection-timeout: 5000
      # socket 连接超时时间
      socket-timeout: 5000
      # 请求的的链接超时时间
      connection-request-timeout: 200
      
      # 最大连接数
      max-connect-num: 200
      # 最大连接数对于某个 url 或者端口
      max-connect-per-route: 200
      
```

### 日志配置

- 数据库日志
- 错误信息日志
- 第三方API调用日志

参考文章 https://www.iteye.com/blog/aub-1101260



### RedisTemplate  配置

```
    @Bean
    RedisTemplate<String, Object> redisTemplate() {
        RedisTemplate<String, Object> template = new RedisTemplate<String, Object>();
        template.setConnectionFactory(redisConnectionFactory);
        Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        objectMapper.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jackson2JsonRedisSerializer.setObjectMapper(objectMapper);
        StringRedisSerializer stringRedisSerializer = new StringRedisSerializer();
        // key采用String的序列化方式
        template.setKeySerializer(stringRedisSerializer);
        // hash的key也采用String的序列化方式
        template.setHashKeySerializer(stringRedisSerializer);
        // value序列化方式采用jackson
        template.setValueSerializer(jackson2JsonRedisSerializer);
        // hash的value序列化方式采用jackson
        template.setHashValueSerializer(jackson2JsonRedisSerializer);
        template.afterPropertiesSet();
        return template;
    }
```

