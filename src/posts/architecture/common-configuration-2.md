---
title: 系统设计 | Java 应用中的配置含义和避坑 2
date: 2024-09-05 22:04:32
sidebar: auto
category: 
  - 软件架构
head:
  - - meta
    - name: keyword
      content: Redis、缓存和 JVM、线程池常用配置解释和坑
      description: Redis、缓存和 JVM、线程池常用配置解释和坑
---

这篇把配置的介绍简化一些，重点是一些遇到的坑，这篇主要有 Redis、缓存和 JVM、线程池等。

## 03 Redis

下面是一个典型的 Redis 配置 
```yaml
spring:
  redis:
    sentinel:
      master: mymaster
      nodes:
        - 127.0.0.1:26379
        - 127.0.0.2:26379
        - 127.0.0.3:26379
    password: yourpassword
    timeout: 2000ms
    database: 0
    lettuce:
      pool:
        max-active: 50 # 根据应用需求调整最大连接数
        max-idle: 25 # 保持较高的空闲连接数，减少连接创建的开销
        min-idle: 10 # 确保有足够的空闲连接
        max-wait: 5000ms # 适当增加等待时间以应对突发高峰
      shutdown-timeout: 200ms
```


Redis 需要额外配置的通常是序列化和反序列化相关的部分。Spring Boot 默认使用 JdkSerializationRedisSerializer 来序列化对象，这种方式序列化后的数据无法跨语言解码，且数据量较大。

```java
@Bean
public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory) {
    RedisTemplate<String, Object> template = new RedisTemplate<>();
    template.setConnectionFactory(connectionFactory);

    // 使用 Jackson2JsonRedisSerializer 来序列化和反序列化 redis 的 value 值
    Jackson2JsonRedisSerializer<Object> serializer = new Jackson2JsonRedisSerializer<>(Object.class);
    template.setDefaultSerializer(serializer);

    // 设置 String 的序列化器
    template.setKeySerializer(new StringRedisSerializer());
    template.setValueSerializer(serializer);

    template.afterPropertiesSet();
    return template;
}
```

避坑1：包如果被调整了，那么反序列化可能会失败，如果调整过包，上线需要清除掉缓存。

避坑2：最好通过逻辑库把缓存的配置和其它用途的配置区分开，甚至在某些高并发要求下，缓存最好使用单独的 Redis 集群。

避坑3：Payload 过大，阻塞事件循环。有时候 Payload 可能是前端过来的参数，没有校验，可以看做被攻击了，比如把用户信息放到了 Redis 中，造成高峰期无法登录。

避坑4：多个测试环境共用一个 Redis 集群，导致数据混乱。

## 04 缓存

在 Spring Boot 项目中，我们一般会同时开启本地内存缓存和 Redis 缓存。 内存缓存可以用 caffeine，然后统一使用 Spring Cache 的 CacheManager 来管理即可。

避坑1：缓存同时失效，造成雪崩。所以我们往往把缓存拆成多个管理器，然后设置不同的过期时间，避免同时失效。

基于这个坑，下面是一个典型的配置： 

```yaml
spring:
  cache:
    caffeine:
      spec:
        caffeineCache1:
          expire-after-write: 5m
          maximum-size: 500
        caffeineCache2:
          expire-after-write: 30m
          maximum-size: 1000
    redis:
      host: localhost
      port: 6379
      database: 1
      timeout: 2000
      password: yourpassword
```

自定义缓存管理器，避免两种缓存混乱，自动处理多个过期时间的配置: 

```java

@Configuration
@EnableCaching
public class CacheConfig {

    @Value("#{${spring.cache.caffeine.spec}}")
    private Map<String, String> cacheSpecs;

    @Bean
    public CacheManager caffeineCacheManager() {
        CaffeineCacheManager caffeineCacheManager = new CaffeineCacheManager();
        cacheSpecs.forEach((name, spec) -> {
            Caffeine<Object, Object> caffeineSpec = Caffeine.newBuilder();
            String[] specs = spec.split(",");
            for (String s : specs) {
                if (s.startsWith("expire-after-write")) {
                    Duration duration = Duration.parse(s.split(":")[1]);
                    caffeineSpec.expireAfterWrite(duration);
                } else if (s.startsWith("maximum-size")) {
                    int size = Integer.parseInt(s.split(":")[1]);
                    caffeineSpec.maximumSize(size);
                }
            }
            caffeineCacheManager.registerCache(name, caffeineSpec.build());
        });
        return caffeineCacheManager;
    }

    @Bean
    public CacheManager redisCacheManager(LettuceConnectionFactory redisConnectionFactory) {
        RedisCacheConfiguration redisCacheConfiguration = RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofMinutes(10))  // Default TTL
                .disableCachingNullValues();

        return RedisCacheManager.builder(redisConnectionFactory)
                .cacheDefaults(redisCacheConfiguration)
                .build();
    }

    @Bean
    public LettuceConnectionFactory redisConnectionFactory() {
        RedisStandaloneConfiguration redisStandaloneConfig = new RedisStandaloneConfiguration();
        redisStandaloneConfig.setHostName("localhost");
        redisStandaloneConfig.setPort(6379);
        redisStandaloneConfig.setPassword("yourpassword");
        redisStandaloneConfig.setDatabase(1); // Set specific Redis database if needed
        return new LettuceConnectionFactory(redisStandaloneConfig);
    }
}

```

避坑2: 把 Redis 缓存和内存缓存使用时候弄错了，所以在使用缓存时，需要指定 CacheName，避免出错。

```java
@Service
public class ExampleService {
    @Cacheable(value = "cache1", cacheManager = "caffeineCacheManager")
    public String getCaffeineCachedValue(String key) {
        return "Caffeine Cached Value";
    }

    @Cacheable(value = "cache2", cacheManager = "redisCacheManager")
    public String getRedisCachedValue(String key) {
        return "Redis Cached Value";
    }
}
```

避坑3：根据变量设置 Key 时，配置写成字符串去了。

```java
@Service
public class MyService {

    @Cacheable(value = "cache1", key = "'order.id'")  // 错误：使用了固定字符串
    public String getCachedOrderValue(Order order) {
        // 模拟从数据库或其他来源获取数据
        return "Cached Value for Order ID: " + order.getId();
    }

    @Cacheable(value = "cache1", key = "#order.id")  // 正确：根据订单 ID 生成缓存 key
    public String getCachedOrderValue(Order order) {
        // 模拟从数据库或其他来源获取数据
        return "Cached Value for Order ID: " + order.getId();
    }
}
```

避坑4: 使用内存缓存时，需要重启才能清除，这条没什么可以讲的，留意就行。

## 05 JVM 典型配置

我们一般把 JVM 参数写在 Docker 文件中，跟着容器走。

典型的一个配置像这样：

```shell
ENV JAVA_OPTS="-Xms512m -Xmx2g \ 
               -XX:+UseG1GC \
               -XX:+PrintGCDetails \
               -XX:+PrintGCDateStamps \
               -XX:+HeapDumpOnOutOfMemoryError \
               -XX:HeapDumpPath=/app/heapdump.hprof \
               -Djava.security.egd=file:/dev/./urandom \
               -Xss512k"
```

下面是配置说明：

```text
-Xms512m # 配置初始堆内存大小
-Xmx2g  # 配置最大堆内存大小
-XX:+UseG1GC # 配置垃圾回收器 
-XX:+PrintGCDetails  # 打印详细的垃圾回收信息
-XX:+PrintGCDateStamps  # 打印垃圾回收时间戳
-XX:+HeapDumpOnOutOfMemoryError # 内存溢出时生成堆转储文件
-XX:HeapDumpPath=/app/heapdump.hprof # 指定堆转储文件路径
-Djava.security.egd=file:/dev/./urandom # 加快启动时间，避免使用阻塞的随机数生成器
-Xss512k # 每个线程的堆栈大小设置为 512 KB
```

避坑1：最大堆内存配置过小，导致分给容器的内存跑不满，性能还没上去就内存溢出了。

```text
Xms512m # 初始堆内存大小
-Xmx2g # 最大堆内存大小，一般设置为容器分配的 80% 左右，给容器留一点作为其它用处，防止内存用光容器直接被杀
-XX:MaxPermSize=256m  # 最大永久代大小，Java 8 以前的版本配置
-XX:MaxMetaspaceSize=256m  # 元空间，和装载的类数量和复杂性有关，现在微服务化后 256m 完全够了(静态变量不在元空间) 
```

避坑2：选一个合适的垃圾回收器。

```text
-XX:+UseG1GC # 使用 G1 垃圾回收器（适用于大内存应用）
-XX:+UseConcMarkSweepGC 使用 CMS 垃圾回收器（适用于低延迟需求）
-XX:+UseParallelGC # 使用 Parallel GC（适用于高吞吐量需求）
```

选择的依据是应用的类型，大部分情况下服务器应用 G1 就非常合适了。垃圾回收是一种取舍：对内存利用率敏感，还是回收时产生的停顿非常敏感。

G1 比较均衡，ConcMarkSweepGC 用于低延迟（有一些人用 Java 写游戏就需要考虑这个问题）。

可以通过 VisualVM 观察一下这三个常用而垃圾回收器回收时的效果，如果配置错了就会有潜在的问题。

避坑3：提前指定堆转储文件路径，不要等内存溢出后再去生产改配置。

一般云平台都提供了这种分析能力，如果没有的话，可以同 Pod 的 sidcar 容器转存出来，像下面这样：

```yaml
  - name: heapdump-handler
    image: alpine:latest
    command: ["/bin/sh", "-c"]
    args:
    - |
      while true; do
        if [ -f /heapdumps/heapdump.hprof ]; then
          echo "Heap dump found, copying to external storage..."
          cp /heapdumps/heapdump.hprof /external-storage/heapdump.hprof
          echo "Heap dump copied successfully."
          # Optionally, you can delete the heap dump from local storage after copying
          rm /heapdumps/heapdump.hprof
        fi
        sleep 60
      done
    volumeMounts:
    - name: heapdump-storage
      mountPath: /heapdumps
```

避坑4：随机函数导致启动很慢

可以使用下面这个配置： 

```text
-Djava.security.egd=file:/dev/./urandom \
```

我第一次看到有人配置这个也有点懵，查了一下原来是这样： 

> Java 的默认熵源可能会导致 SecureRandom 初始化时变得非常慢，特别是在没有足够系统熵的情况下。通过指定 /dev/urandom，可以避免这种阻塞，从而提高应用程序启动的速度。


## 06 线程池

线程池的配置的文章其实非常多，典型的配置如下： 

```yaml
spring:
  task:
    execution:
      pool:
        core-size: 4
        max-size: 8
        queue-capacity: 100
        keep-alive: 60
      thread-name-prefix: executor-
```

重要的配置这么四个核心数量、最大数量、队列容量、空间时间。

- core-size：核心线程数，即线程池中保持的最小线程数量。即使这些线程是空闲的，它们也会被保留在池中。
- max-size：线程池中允许的最大线程数。当队列满时，线程池可以创建新线程来处理任务。
- queue-capacity：任务队列的容量。当核心线程数忙碌时，新的任务会被放入这个队列。队列满时，线程池会根据 max-size 创建新线程。
- keep-alive：线程空闲时间。线程在空闲超过这个时间后会被终止。对于核心线程，这个设置只在 allow-core-thread-timeout 为 true 时生效。

避坑1：最关键的配置是线程满了怎么办？也就是线程池饱和策略。

- AbortPolicy： 抛出一个 RejectedExecutionException 异常，通知调用者任务无法被执行，该策略适合于不允许任务丢失或任务延迟处理的场景。大部分情况应该使用这个策略。
- CallerRunsPolicy：调用者线程执行被拒绝的任务。即任务会在调用 execute 方法的线程中执行，而不是在线程池中执行。这样会阻塞调用线程，用途不多，其实用到这个策略，任务就应该持久化到数据库或者 MQ 中了，不应该用线程池的队列。
- DiscardPolicy：默默丢弃无法处理的任务，不抛出异常。任务将被丢弃，线程池不会做任何通知。
- DiscardOldestPolicy：丢弃最旧的任务，并尝试提交当前任务。即在队列已满时，会丢弃队列中最早的任务，并将当前任务添加到队列中。

例如，Tomcat 响应用户请求的策略就是 AbortPolicy，这样负载过高时就不会进入系统，而直接被拒绝，从而触发限流规则。

避坑2：如何选择合适的核心线程数？

这个问题本质是看 CPU 核数，以及任务类型。CPU 的数量就像是有多少人真实干活，而同一个 CPU 多个线程，就相当于一个人同时做多个事情。

线程池最适合的场景是**有等待的场景**，多线程模型又比异步变编程简单。

如果计算密集型任务，按照 CPU 核数配置就行，如果是 I/O 密集型任务，就需把线程数加上来，根据性能测试把 CPU 和内存榨干，就算配置合格。

一般的任务，我们可以先把核心线程数配置为 CPU 核数的 2 倍（一半的时间在等待），最大线程数为 4 倍（至少 1/4 的时间在工作），再根据性能测试压测，找到内存和 CPU 利用率比较平衡的值即可。