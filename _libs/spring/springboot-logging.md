---
title: Spring boot 项目中常见的日志配置
toc: true
from: self
date: 2021-08-11 19:18:36
categories: 
  - Spring
sidebar: auto
permalink: /spring/springboot-logging/
---

## 建议开启 webclient 相关的日志

### 使用 RestTemplate

使用 application.properties 的方法

```
logging.level.org.springframework.web.client=DEBUG
```
使用 application.yml 的方法

```
logging:
  level:  
    root: WARN
    org.springframework.web.client: DEBUG
```

### 使用 FeignClient

增加一个 Feign 配置类

```
@Configuration
public class FeignConfiguration {
    @Bean
    Logger.Level feignLoggerLevel() {
        //这里记录所有，根据实际情况选择合适的日志level
        return Logger.Level.FULL;
    }
}
```

在 feign 的接口上增加配置类 

```
configuration = FeignConfiguration.class
```

修改日志级别

```
logging.level.<FeignClient类的全路径> = DEBUG
```

## 参考资源

- https://stackoverflow.com/questions/7952154/spring-resttemplate-how-to-enable-full-debugging-logging-of-requests-responses
- FeignClient日志打印 https://www.cnblogs.com/lemondada/p/11270648.html
