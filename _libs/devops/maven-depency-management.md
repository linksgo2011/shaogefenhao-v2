---
title: Maven Dependency Management 统一管理多模块项目
toc: true
date: 2021-08-11 19:18:35
categories: 
  - 运维开发
sidebar: auto
permalink: /devops/maven-depency-management/
---



## 父级 pom + DepencyManagement

当我们的项目模块很多的时候，我们使用Maven管理项目非常方便，帮助我们管理**构建、文档、报告、依赖、scms、发布、分发**的方法。可以方便的**编译代码、进行依赖管理、管理二进制库**等等。
 由于我们的模块很多，所以我们又抽象了一层，如下图抽出一个**parent**来管理子项目的公共的依赖。为了项目的正确运行，必须让所有的子项目使用依赖项的统一版本，必须确保应用的各个项目的依赖项和版本一致，才能保证测试的和发布的是相同的结果。

 在我们项目顶层的POM文件中，我们会看到dependencyManagement元素。



## 在父级定义 dependencyManagement 标签

```xml
<groupId>printf.cn</groupId>
<artifactId>base</artifactId>
<version>1.0.0-SNAPSHOT</version>
<!--// 这个很重要，否则报找不到 jar 文件-->
<packing>pom</packing> 
```

```xml
 <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>com.alibaba</groupId>
                <artifactId>fastjson</artifactId>
                <version>1.2.33</version>
            </dependency>
            <dependency>
                <groupId>com.alibaba</groupId>
                <artifactId>druid</artifactId>
                <version>1.0.11</version>
            </dependency>
        </dependencies>
    </dependencyManagement>
```



## 子项目配置

```xml
<?xml version="1.0"?>
<project
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd"
    xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <modelVersion>4.0.0</modelVersion>
    <parent>
      <groupId>printf.cn</groupId>
      <artifactId>base</artifactId>
      <version>1.0.0-SNAPSHOT</version>
    </parent>
    <artifactId>app</artifactId>
    <name>femicro-cache</name>
    <url>http://maven.apache.org</url>
    <dependencies>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
             <!--这些不需要设置版本号-->
        </dependency>
    </dependencies>
</project>
```

