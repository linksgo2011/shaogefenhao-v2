---
title: Rest template 使用
toc: true
date: 2021-08-11 19:18:36
categories: 
  - Spring
sidebar: auto
permalink: /spring/spring-rest-template/
---

## Spring boot 2.0 后定义方式


Spring boot 2.0 后可以使用 RestTemplateBuilder 来定义，下面是一个定义 bean 并设置超时时间的方法。

```
@Configuration
public class RestConfig {

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        
        return builder
                .setConnectTimeout(Duration.ofMillis(3000))
                .setReadTimeout(Duration.ofMillis(3000))
                .build();
    }
}
```

## 相关资料
- 定义 RestTemplate 方法 https://stackoverflow.com/questions/13837012/spring-resttemplate-timeout
