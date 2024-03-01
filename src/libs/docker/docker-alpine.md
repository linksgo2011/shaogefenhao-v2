---
title: Alpine apk 命令
toc: true
date: 2021-08-11 19:18:35
categories: 
  - docker
sidebar: auto
permalink: /docker/docker-alpine/
---

## 关于 Alpine 

Alpine Linux是一个面向安全应用的轻量级Linux发行版。它采用了musl libc和busybox以减小系统的体积和运行时资源消耗，同时还提供了自己的包管理工具apk。

## Apk

alpine 提供了非常好用的apk软件包管理工具


### apk update

update：从远程镜像源中更新本地镜像源索引。

update命令会从各个镜像源列表下载APKINDEX.tar.gz并存储到本地缓存，一般在/var/cache/apk/(Alpine在该目录下)、/var/lib/apk/ 、/etc/apk/cache/下。

### apk add

add：安装PACKAGES并自动解决依赖关系。

add命令从仓库中安装最新软件包，并自动安装必须的依赖包，也可以从第三方仓库添加软件包。


```
$ apk add openssh openntp vim
$ apk add --no-cache mysql-client
$ apk add docker --update-cache --repository http://mirrors.ustc.edu.cn/alpine/v3.4/main/ --allow-untrusted

```


安装指定版本软件包

```
apk add asterisk=1.6.0.21-r0
$ apk add 'asterisk<1.6.1'
$ apk add 'asterisk>1.6.1

```


### apk del

del：卸载并删除PACKAGES

> apk del openssh openntp vim
