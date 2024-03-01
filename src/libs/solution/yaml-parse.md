---
title: Yaml 解析
toc: true
date: 2021-08-11 19:18:36
categories: 
  - 技术方案
sidebar: auto
permalink: /solution/yaml-parse/
---

## 使用 spring 自带功能

```java
 YamlMapFactoryBean yamlMapFactoryBean = new YamlMapFactoryBean();
        yamlMapFactoryBean.setResources(new ClassPathResource("application.yml"));
        yamlMapFactoryBean.afterPropertiesSet();
        Map<String, Object> object = yamlMapFactoryBean.getObject();
        Object nameUrl = object.get("pnameUrl");
```
