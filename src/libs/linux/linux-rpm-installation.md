---
title: rpm 和 yum 包管理器的使用
from: self
date: 2021-08-11 19:18:36
categories: 
  - linux
sidebar: auto
permalink: /linux/linux-rpm-installation/
---

## 背景

rpm 是 RedHat 的包管理工具，因此叫 RedHat Package Manager，但由于目前 rpm 非常流行，基本上已经是事实标准。

rpm 包适用于 Fedora, CentOS, Red Hat Enterprise Linux, OpenSUSE, Mandriva, PCLinuxOS 等操作系。和 rpm 类似的是 deb 包。

尤其是 CentOS 用的比较多, rpm 比较有用。另外在 CentOS 有另外一个工具 yum。

- rpm，底层工具用来安装和删除软件包文件
- yum，上层工具完成元数据搜索和依赖解析

两种工具都可以，完成软件的安装。

> yum install package_name
> rpm -i package_file

不同之处在于，rpm 需要自己下载软件包并且安装，如果依赖不满足可能报错。yum 会从资源库（repo）中搜索安装，并自动解决依赖问题。

## 推荐的安装方式

所以我们一般使用 yum 安装，如果资源库中没有，软件的官网往往提供了 repo，我们可以导入然后使用 yum 安装。

Jenkins 的安装页面，提供如下的安装方式

下载 repo 描述文件

> sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo

导入 repo 信息

> sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key

使用 yum 安装

> yum install jenkins

我们在编写安装脚本的时候，推荐使用这种安装方式，基本上能解决大部分的软件安装，又容易管理。

https://pkg.jenkins.io/redhat-stable/

## Linux 包安装方式

- yum，默认仓库有安装包时
- yum + rpm，软件包提供了自己的 repo 时
- rpm，找不到 repo 时
- 源代码编译或使用通用二进制方式

