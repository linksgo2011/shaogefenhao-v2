---
title: Git 提交文件属性
toc: true
date: 2021-08-11 19:18:35
categories: 
  - 运维开发
sidebar: auto
permalink: /devops/git-commit-filemode/
---

默认git提交的文件没有属性，例如执行权限

可以使用下面的命令

> git update-index --chmod=+x script.sh
