---
title: Spring boot 本地开发工具
toc: true
from: self
date: 2021-08-11 19:18:36
categories: 
  - Spring
sidebar: auto
permalink: /spring/spring-boot-dev-tools/
---



## Developer Tools

Spring Boot包含一组额外的工具，这些工具可以使应用程序开发体验更加愉快。 spring-boot-devtools模块可以包含在任何项目中，以提供其他开发时功能。

```
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
        <optional>true</optional>
    </dependency>
</dependencies>
```



## 注意事项

- 运行完全打包的应用程序时，将自动禁用开发人员工具。用 java -jar 运行，开发工具就不起作用了，可以手动开启 -Dspring.devtools.restart.enabled=false
- dev tool 会修改默认配置，例如禁用缓存、打印日志
  - spring.devtools.add-properties 关闭 dev tool 的额外配置
  - spring.mvc.log-request-details 开启请求日志，方便开发
- 自动重启的原理是监听 classpath 的变化，像模板、配置之类的东西会自动触发重启，但是如果是源代码修改，需要手动进行构建然后触发 重启，也可以开启 IDE 的自动编译
- 监控除了 classpath 之外的目录 spring.devtools.restart.additional-paths
- dev tool 也支持模板等资源文件的 livereload，需要去下载 livereload 插件
- dev tool 可以单独配置在文件 spring-boot-devtools.properties 或者 spring-boot-devtools.yml，实现对各个项目的配置，配置文件需要放到 ~/.config/spring-boot/ 目录下面。不过这个目录下和 profile 无关。
