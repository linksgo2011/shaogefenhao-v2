---
title: 防火墙暴露端口
toc: true
date: 2021-08-11 19:18:36
categories: 
  - linux
sidebar: auto
permalink: /linux/linux-fire-wall/
---

## 操作方法

开启端口 

> sudo firewall-cmd --zone=public --add-port=80/tcp --permanent

命令含义：

--zone #作用域

--add-port=80/tcp  #添加端口，格式为：端口/通讯协议

--permanent  #永久生效，没有此参数重启后失效

重启防火墙 

> sudo firewall-cmd --reload

## 相关资料

- https://blog.csdn.net/qq_27870421/article/details/93165382
