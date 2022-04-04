---
title: 批量任务执行
toc: true
date: 2021-08-11 19:18:35
categories: 
  - 架构
sidebar: auto
permalink: /architecture/batch/
---

## 痛点

- 能分片跑
- 能看到进度
- 中途失败能重启
- 能手动干预启停

### 方案

- kettle
- sqoop
- datax

## 参考资料 

- Spring batch 官方文档 https://docs.spring.io/spring-batch/docs/4.2.x/reference/html/index-single.html#spring-batch-intro
- 批处理框架spring batch基础知识介绍[https://blog.csdn.net/topdeveloperr/article/details/84337956#%E5%A6%82%E4%BD%95%E9%BB%98%E8%AE%A4%E4%B8%8D%E5%90%AF%E5%8A%A8job](https://blog.csdn.net/topdeveloperr/article/details/84337956#如何默认不启动job)
- 大数据批处理框架Spring Batch 的全面解析 https://blog.csdn.net/weixin_44233163/article/details/85992105

