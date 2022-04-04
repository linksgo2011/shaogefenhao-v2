---
title: nohup 后台运行Linux程序方法
date: 2021-08-11 19:18:36
categories: 
  - linux
sidebar: auto
permalink: /linux/linux-nohup/
---

在Linux服务器中，每个终端的应用程序会随着用户的退出被杀死。如果在用户退出也需要继续运行的话，需要使用nohup 来运行程序。

同时,nohup 并不是后台运行，意味着虽然用户退出终端可以继续运行，但是在退出之前会占用用户界面。

于是可以使用在命令后添加 & 符号的方法，让程序到后台运行。


在部署服务器应用时，我们可以即可 nohup 和 & 来运行程序。

例如：

> /usr/bin/nohup /home/hp/workspace/ngrok tcp 80 -log=stdout &

