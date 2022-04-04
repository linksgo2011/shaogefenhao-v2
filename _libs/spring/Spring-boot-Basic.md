---
title: Spring boot 学习指南
date: 2021-08-11 19:18:36
categories: 
  - Spring
sidebar: auto
permalink: /spring/Spring-boot-Basic/
---

## 什么是Spring boot

Spring boot是一个基于Spring、Spring MVC的开发框架，特点是约定大于配置，使用Jar和内嵌容器的方式运行。


## 一些资源

- Spring boot原理：http://blog.csdn.net/liaokailin/article/category/5765237

## Spring boot原理的个人理解

- 内嵌Tomcat，使用JAR包部署，和一般java应用一致，不再使用web容器的方式编写代码
- 在使用Spring boot中非常不解的一件事是为什么可以直接引入包就可以使用，因为Spring boot有自动化配置的方式，常用的配置被定义在在autoconfigure这个包下，可以使用@Config注解来覆盖

