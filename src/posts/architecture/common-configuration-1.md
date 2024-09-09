---
title: 系统设计 | Java 应用中的配置含义和避坑
date: 2024-09-02 22:04:32
sidebar: auto
category: 
  - 软件架构
head:
  - - meta
    - name: keyword
      content: Java 应用中间件的配置起底
      description: Java 应用中间件的配置起底
---

这篇文章整理了 Spring Boot 和常见的应用中间件配置含义，做到这些配置的目的和原理，避免因为错误配置导致生产出现问题，特别是有一些安全事项。

PS：写下来发现东西非常多，很多时候我们都只是拷贝过来改改没问题就不管了，但是这样囫囵吞枣，会给项目带来风险。

## 01 Spring Boot 相关

### 优雅停机

优雅停机是指当应用接收到停机信号时，能够妥善地处理正在进行的请求，释放资源，并在完成这些工作后再停止应用。

如果不开启优雅停机，有可能在部署的过程中让少量未完成的任务和请求直接终止，带来意想不到的问题。

默认情况下，Spring Boot 没有启用优雅停机，而且往往需要和云环境配合使用。

在 Spring Boot 中的配置方式为（本文以 yaml 的格式）： 

```yaml
server:
  shutdown: graceful
```

同时可以设置一个优雅停机的超时时间，如果在超时时间内请求没有完成，应用将强制停机。

```yaml
spring:
  lifecycle:
    timeout-per-shutdown-phase: 30s
```

Kubernetes 在停止 Pod 时，会先发送一个 `SIGTERM`，并通过 Readiness Probe和Liveness Probe 两个探针来决定是否释放容器资源。

探针就是应用通过一个 API（可以是 HTTP 或者 TCP，通常都是 HTTP）告诉 Kubernetes 它当前的状态，让 Kubernetes 来决策何时重启，关于优雅停机的内容比较多，后面单独一篇文章讨论。

在 Spring Boot 中，探针就是 Spring Boot 的 health 接口，可以通过 Indicator 配置。

### Indicator

Spring Boot 提供了一些健康状态的 API，这样就可以给云平台优雅停机使用，也可以提供给监控系统用来拨测，如果系统长时间不健康，可以进行告警。

在代码中实现健康状态的类叫做 Indicator，基本上默认配置的 Indicator 就够用了，但有时候需要根据自己需要配置一些 Indicator。

比如依赖了一个重要的三方系统，这个三方系统不启动起来，当前系统启动了也没意义，于是就可以加一个 Indicator，甚至把三方系统的状态暴露到当前系统的健康状态信息中。

暴露相关健康 API 需要引入一个 actuator 依赖。

```yaml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

```java
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

@Component
public class CustomHealthIndicator implements HealthIndicator {

    @Override
    public Health health() {
        boolean isHealthy = checkSomeServiceHealth();
        
        if (isHealthy) {
            return Health.up().withDetail("customService", "UP").build();
        } else {
            return Health.down().withDetail("customService", "DOWN").build();
        }
    }

    private boolean checkSomeServiceHealth() {
        // 检查逻辑
        return true; 
    }
}

```

访问 /actuator/health 接口，返回结果大概像下面这样：

```json
{
  "status": "UP",
  "components": {
    "db": {
      "status": "UP",
      "details": {
        "database": "MySQL",
        "validationQuery": "isValid()"
      }
    },
    "customService": {
      "status": "UP",
      "details": {
        "CustomService": "UP"
      }
    },
    ……
  }
}

```

打开相关配置：

```yaml
management:
  endpoints:
    web:
      exposure:
        include: health,info
```

在这个配置中，info 类似 health， 提供了一些服务信息，例如名称、版本之类的，但是要注意避免把敏感信息从这个接口中暴露出去了。

### Actuator

提到了 Actuator，这里有一些配置是不能在生产环境开启的，这是比较常见的错误，需要注意。

Actuator 除了提供了 health,info 两个接口，还提供了一堆接口，方便观察 Spring Boot 应用，这些接口都可以在开发环境开启。例如：

- /health: 显示应用的健康状态及详细信息。
- /info: 显示应用的一些基本信息（例如版本、描述等）。
- /env: 查看和调试环境属性，了解配置项的来源。
- /beans: 用于调试 Bean 的创建和依赖关系。
- /metrics: 查看应用的性能指标，如内存使用情况、GC 活动等。
- /httptrace: 用于查看最近 HTTP 请求的详细信息。
- /mappings: 用于查看所有请求映射的路径，方便调试路由问题。

这些接口开启后会造成安全、性能问题。

所以推荐的配置如下。

开发环境： 

```yaml
management:
  endpoints:
    web:
      exposure:
        include: "*"
  endpoint:
    health:
      show-details: always  # 显示详细健康信息，方便调试
```

endpoints 只是暴露外部是否可以访问，实际的功能需要单独开启，health,info,metrics 三个接口是默认开启的。

如果需要打开 beans，可以单独开启：

```yaml
management:
  logfile:
    enabled: true           # 允许查看日志文件，方便调试
  env:
    enabled: true           # 允许查看环境变量配置
  configprops:
    enabled: true           # 允许查看配置属性，帮助调试
  beans:
    enabled: true           # 允许查看 Bean 信息，调试依赖关系
  heapdump:
    enabled: true           # 启用 Heap Dump，用于内存分析
  threaddump:
    enabled: true           # 启用线程转储，用于线程分析
  mappings:
    enabled: true           # 允许查看所有请求映射，调试路由问题
  httptrace:
    enabled: true           # 启用 HTTP 请求追踪
```

而生产环境，需要将其关闭，只保留需要开启的配置：

```yaml
management:
  endpoints:
    web:
      exposure:
        include: "health,info,metrics"
  endpoint:
    health:
      show-details: never   # 隐藏健康检查的详细信息，防止敏感数据泄露
```

### 日志

日志配置错误会导致磁盘被日志写满，另外**日志级别过低，性能会急剧下降。**

在以前还不是容器时代，我们常常使用日志文件存储日志，再使用一些工具转存走，有时候清理日志的脚本失效，导致磁盘被日志写爆的场景非常多。

下面是一个在容器环境下 Spring Boot 默认日志库的配置： 

```yaml
logging:
  level:
    root: INFO
    org.springframework: WARN #这里放上特定包的日志配置
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n"
  file:
    enabled: false # 生产环境通常不直接写入文件，而是由 K8s 日志收集系统处理
  stdout:
    enabled: true
```

在生产上我们一般将日志级别设置为 INFO，并关闭文件输出，而是将日志输出到 stdout 中，由容器捕获。

在开发环境，我们通常把日志设置为 DEBUG，更加方便调试。

## 秘钥和口令

正常情况下，大多数应用都不会把口令存放到配置文件中，敏感信息需要放到秘钥管理系统中(Key Management System)。

例如，在 k8s 中，我们可以使用 Secrets 代替明文的 ConfigMap；云平台往往提供了相关的 KMS 产品，例如 Alicloud KMS。

## 02 Mysql

这里给出一个 Mysql 和 Mybatis 的典型配置，并解释一下关键配置的含义和避坑经验。

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/mydatabase?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=UTC&autoReconnect=true&rewriteBatchedStatements=true
    username: your_username
    password: your_password
    driver-class-name: com.mysql.cj.jdbc.Driver
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5
      idle-timeout: 30000
      max-lifetime: 1800000
      connection-timeout: 30000

mybatis:
  mapper-locations: classpath*:mapper/*.xml
  type-aliases-package: com.example.project.domain
  configuration:
    map-underscore-to-camel-case: true
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
```

连接字符串中的配置：

- useUnicode： 启用了 Unicode 支持。
- characterEncoding： 字符编码，最好在 useUnicode 配置后，characterEncoding 也明确配置一下，否则它会选择一个默认的 Unicode 字符编码。另外，我们现在用的更多的是 utf8mb4，它是 UTF8 的拓展字符集，可以处理更多特性，例如表情，最多占用 4 个字节的空间。
- useSSL： 如果启用，需要证书，一般我们都没有配置。
- serverTimezone：关于时区，我们一般都不让数据库决策，而让应用决定写入数据的时区，这个问题我在以前的文章，《系统设计中需要考虑到的时间问题》，做过详细说明。
- autoReconnect： 自动重连，如果不开启的话，数据库重启了应用也必须重启。
- rewriteBatchedStatements： 自动优化批量插入时的性能。

关于 driver-class-name，对于 MySQL Connector/J 8.0 以上，类名换成了 com.mysql.cj.jdbc.Driver，旧版本是 com.mysql.jdbc.Driver。

关于 hikari 配置的含义：

- maximum-pool-size: 最大连接数，连接池中的最大连接数。
- minimum-idle: 最小空闲连接数。
- idle-timeout: 空闲连接被回收前的最大等待时间（毫秒）。
- max-lifetime: 连接在池中的最长存活时间（毫秒）。
- connection-timeout: 获取连接的超时时间（毫秒）。

hikari 的配置只是建议值，hikari 配置逻辑是什么呢？一般是基于性能测试反复调整，但还是有一些规律。

这里有个坑，有时候为了优化性能，提高了最大连接数。但一般数据库的连接数是有限制的，比如 1000。假设一个系统共同一个Mysql实例，系统共有 10 个服务，每个服务如果有 10 个容器，最大连接数最多就只能配置到 10 了，否则就会报没有链接的错误（而且是偶尔出现这类问题）。

maximumPoolSize 通常设置为数据库的并发连接限制的 50% 到 80% 之间，单个容器允许 10 个 Mysql 连接并不大，maximum-pool-size 可以在 10 - 50 之间调整。

connection-timeout 过短，在数据库负载高或网络不稳定的情况下，可能导致频繁的连接超时，可以尝试往长一点调整。

max-lifetime、minimum-idle 取决于负载情况，如果持续负载比较高，可以设置长一些，不用为数据库节省资源，让连接长时间保持。

关于 Mybatis 的 map-underscore-to-camel-case 配置有一个坑，这个配置的含义是把数据库列名中的下划线自动映射为 Java 对象中的驼峰命名。例如，user_name 列将映射为 userName 属性。但有的时候，命名不规范，有些词可能是一个词组而没有大写，会导致匹配失败。

## 03 未完待续

本以为是一个很简单的文章，有点长准备拆一下，把 Tomcat、线程池、Redis、Kafka、JVM 等内容留在后面，大家也可以留言补充这些经验，我添加到后面的内容中。