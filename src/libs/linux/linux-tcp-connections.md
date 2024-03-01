---
title: 查看 linux 中的 TCP 连接数
date: 2021-08-11 19:18:36
categories: 
  - linux
sidebar: auto
permalink: /linux/linux-tcp-connections/
---

查看连接到本机的连接

> netstat -an

统计 80 端口的连接数

> netstat -nat|grep -i "80"|wc -l

统计httpd协议连接数

> ps -ef|grep httpd|wc -l

统计已连接上的，状态为“established

> netstat -na|grep ESTABLISHED|wc -l

查出哪个IP地址连接最多

> netstat -na|grep ESTABLISHED|awk {print $5}|awk -F: {print $1}|sort|uniq -c|sort -r +0n

> netstat -na|grep SYN|awk {print $5}|awk -F: {print $1}|sort|uniq -c|sort -r +0n


## 参考资料

- https://www.cnblogs.com/felixzh/p/7737160.html
