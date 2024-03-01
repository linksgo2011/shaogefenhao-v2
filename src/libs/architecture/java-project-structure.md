---
title: Java web project 概览
date: 2021-08-11 19:18:35
categories: 
  - 架构
sidebar: auto
permalink: /architecture/java-project-structure/
---

  1. Java 基础重点回顾
      - 注解
      - 异常

  2. J2EE 开发常用版本
      - Jar 引入Tomcat的J2EE的实现
      - J2EE 1.7
      - JDK 8
      - Tomcat 1.7

  3. Spring framework

      -  Beans
      -  周边生态
      -  项目配置 web.xml
      -  页面渲染
        - JSP
        - Velocity
        - FreeMaker
        - themleaf

  4. ORM
      - Mybatis
          - DAO 接口
              1. DTO
              2. PO
          - Domain 或者 Model  实体类和数据库对应
          - Mapper 使用xml实现和数据库
      - Hibernate
      - Querydsl ORM增强查询工具

  5. Validation
      - Hibernate Validation 实现
      - Java EE Validation 实现

  6. 授权验证/登录
      1. intercept 实现
      2. sharon
      3. Spring security

  7. 部署
      1. tomcat 1.7

  8. 日志
      1. log4J
      2. self4J

  9. 构建工具
      1. Maven
      2. Gradle

  10. mapping 工具
      1. orika
      2. object mapper

  11. 其他工具库
      1. poi 微软文档API
      2. guava Google工具库
      3. commons-lang apache 字符串工具
      4. quartz 计划任务
      
  12. Restful
      1. hateoas
      2. jersey 
