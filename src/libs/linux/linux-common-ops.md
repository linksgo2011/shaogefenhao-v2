---
title: linux 常用线上排错命令
date: 2021-08-11 19:18:36
categories: 
  - linux
sidebar: auto
permalink: /linux/linux-common-ops/
---

## 安装一些调试工具

> yum install -y telnet

> yum install git

> yum install httpd-tools

> yum install java-1.8.0-openjdk.x86_64

## 查看打开的文件数

linux tcp 连接是通过文件描述符 FD 也就是每个链接创建了一个虚拟文件。系统的连接数是有限制，如果连接数超过最大数量会得到一个异常。如果是一些流忘记关闭，会造成此类错误。

> lsof -n | awk '{print $2}' sort | uniq -c | sort -nr | more

显示的左侧是句柄数，右侧是进程号，可以查看当前系统打开的句柄数量


```
1117 83316
 714 486
 525 83525
 465 83649
 411 64791

```

通过

> ps -ax | grep 83316

查看当前进程的应用程序

> 83316 ??        14:48.23 /Applications/IntelliJ IDEA.app/Contents/MacOS/idea

发现 idea 开了 1117 个文件

