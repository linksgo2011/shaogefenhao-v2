---
title: 常用的GIT命令
toc: true
date: 2021-08-11 19:18:35
categories: 
  - 运维开发
sidebar: auto
permalink: /devops/git-commands/
---


配置全局邮箱和名字

> git config --global user.email "email"

> git config --global user.name "name"


查看服务器和本地上分支

> git branch -a

获取服务器分支并映射到本地

> git fetch origin 远程分支名x:本地分支名x


设置pull  push映射

> git branch --set-upstream-to=origin/<branch> localBranchName



临时缓存本地更改并清空工作区

> git stash 

从 stash 中取出

> git stash pop

## 资源

- http://onlywei.github.io/explain-git-with-d3/#branch  Explain Git with D3
- https://learngitbranching.js.org/ Learn Git Branching
- https://github.com/Gazler/githug Lean git by game 


