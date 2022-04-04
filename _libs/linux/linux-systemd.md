---
title: Systemd 常见用法
date: 2021-08-11 19:18:36
categories: 
  - linux
sidebar: auto
permalink: /linux/linux-systemd/
---

Systemd 是一套用来管理系统服务的命令，Cent OS默认使用它管理系统服务。

## Systemd 命令组用法

参考 http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-part-two.html

## Systemd servcie 文件编写

参考 https://www.cnblogs.com/wutao666/p/9781567.html

## 一个注册 ngrok （内网穿透工具） 的实例

1. 编写ngrok.servcie 服务文件

```

[Unit]
Description="Ngrok service "
After=network.target

[Service]
Type=forking
ExecStart=/usr/bin/nohup /home/hp/workspace/ngrok tcp 80 -log=stdout &
ExeStart=ps -ef | grep ngrok | head -1 | awk '{print $2}' |xargs kill -9 
KillSignal=SIGQUIT
TimeoutStopSec=5
KillMode=process
PrivateTmp=true

[Install]
WantedBy=multi-user.target

```


2. 拷贝服务文件到系统指定目录

> sudo cp ngrok.service /etc/systemd/system

3. 加载到系统中

> sudo systemctl daemon-reload
   
4. 启动服务

> sudo systemctl start ngrok.service

