---
title: CentOS 搭建 vsftp
toc: true
date: 2021-08-11 19:18:36
categories: 
  - linux
sidebar: auto
permalink: /linux/linux-vsftpd/
---

## 安装和启动

查看是否已经安装
> rpm -q vsftpd

"package vsftpd is not installed" 说明没有安装。

> yum  install -y  vsftpd

```
Installed:

 vsftpd.x86_64 0:3.0.2-25.el
 
Complete!

```

> whereis  vsftpd


vsftpd: /usr/sbin/vsftpd /etc/vsftpd /usr/share/man/man8/vsftpd.8.gz

启动服务

> systemctl start vsftpd


如果需要允许随系统启动的话可以使用

> systemctl enable vsftpd

## 基本配置

使用 

> systemctl status vsftpd

查看配置文件地址和安装情况。


```
vsftpd.service - Vsftpd ftp daemon
   Loaded: loaded (/usr/lib/systemd/system/vsftpd.service; disabled; vendor preset: disabled)
   Active: active (running) since Sun 2019-11-17 15:56:40 CST; 4s ago
  Process: 15115 ExecStart=/usr/sbin/vsftpd /etc/vsftpd/vsftpd.conf (code=exited, status=0/SUCCESS)
 Main PID: 15118 (vsftpd)
   CGroup: /system.slice/vsftpd.service
           └─15118 /usr/sbin/vsftpd /etc/vsftpd/vsftpd.conf
```


编辑配置文件

> vim /etc/vsftpd/vsftpd.conf

vsftp 的匿名用户默认目录为

> /var/ftp/pub

## ftp 服务需要特别开启防火墙服务

> firewall-cmd --permanent --zone=public --add-service=ftp 
> firewall-cmd --reload 

通过 ftp://{host} 访问
