---
title: EulerOS 安装 Nodejs（ARM版本）
toc: true
date: 2021-08-11 19:18:35
categories: 
  - 运维开发
sidebar: auto
permalink: /devops/arm-install-nodejs-on-arm/
---

## 安装步骤

1. 通过Linux系统命令【uname -a】 查看操作系统位数（备注：x86_64表示X86处理器64位系统， aarch64表示ARM处理器64位系统）
2. 去官网下载ARMv8版本的压缩包（Jetson TX1的处理器是ARM57，基于ARMv8的核）
英文网址：https://nodejs.org/en/download/
3. 下载解压后建立软连接 

> ln -s ~/program/nodejs/bin/npm /usr/local/bin/
> ln -s ~/program/nodejs/bin/node /usr/local/bin/

检查是否有效

> node -v
