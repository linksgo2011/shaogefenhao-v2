---
title: 一套分布式系统架构的技术集合
toc: true
date: 2021-08-11 19:18:35
categories: 
  - 架构
sidebar: auto
permalink: /architecture/distributed-system-overview/
---

## 开发和构建

- 代码仓库
  - Git
  - Gitlab 
  - Gogos 
- CI/CD
  - Jenkins
  - Ansible
- 质量控制
  - findbugs
  - checkstyle
  - sonarQube
- 管理看板 
  - Jira
- 开发工具
  - Idea
  - Idea mybatis 插件
- 性能分析
  - AB testing
  - Jmeter
  - JMH
- 服务器调优和问题分析
  - 阿里开源工具 arthas
  - 线上问题排查工具 https://github.com/oldratlee/useful-scripts
  - VisuaVM 可视化内存分析
  -  top 命令
  -  jstack
  -  JProfiler
  -  jstat
  -  jmap
  -  MAT

## 运维

- 服务器监控平台
  - zabbix

- 防火墙
  - IPtables
  - firewall 
- 操作系统
  - CentOS

## 业务架构建模

- DDD 
- 领域驱动设计事件工作坊
- StartUML 类图
- C4paint 架构图绘制工具
  
## 分布式架构

- 分布式授权
  - OAuth2
  - Spring security 
- 企业授权管理
  - LDAP
- REST client
  - feign Client
- RPC 框架
  - dubbo
  - Grpc
  - Thrift
- 负载均衡
  - ngnix 方案
    - Linux 心跳监控 keepalived
    - 服务发现 consul
  - Spring cloud 方案
    - 服务发现 Netflix Eureka
    - 客户端负载均衡 Netflix Ribbon
  - 网络层负载均衡 LVS
  - 服务网关 
    - Netflix Zuul
- 分布式服务存储
  - fastDFS
  - GFS
- 数据源中间件
  - Druid

- 分布式链路追踪
  - OpenZipkin 
- 日志系统
  - Elasticsearch
  - FileBeat
  - Kibana

## 分布式存储
    
- MySQL
- Redis 集群
- MongoDB

## 消息中间件

- Kafka
- RabitMQ
- ActiveMQ

## 容器云

- Docker
- 集群管理
  - K8s
  - Swarm
- 容器面板
  - Portainer

## 前端单页应用

- Vue 
- Nodejs

## 高可用

- API 限流
  - LUA
  - Redis 限流
- 容灾


## 架构相关博客推荐

- https://www.cnblogs.com/f-ck-need-u/p/7576137.html

## 相关书籍推荐
