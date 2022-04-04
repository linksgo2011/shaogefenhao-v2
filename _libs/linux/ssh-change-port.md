---
title: SSH 修改端口
toc: true
from: self
date: 2021-08-11 19:18:36
categories: 
  - linux
sidebar: auto
permalink: /linux/ssh-change-port/
---

修改修改配置文件

> vim /etc/ssh/sshd_config

找到#port 22 这一行，默认端口 22，可以添加多个端口

重启 ssh 服务即可

> sudo systemctl restart sshd

可能需要配置防火墙

重启时遇到错误  

```
Job for sshd.service failed because the control process exited with error code. See "systemctl status sshd.service" and "journalctl -xe" for details.
[ansible@manager1 ~]$ systemctl status sshd.service
● sshd.service - OpenSSH server daemon
   Loaded: loaded (/usr/lib/systemd/system/sshd.service; enabled; vendor preset: enabled)
   Active: activating (auto-restart) (Result: exit-code) since Wed 2019-12-18 14:22:24 UTC; 29s ago
     Docs: man:sshd(8)
           man:sshd_config(5)
  Process: 6503 ExecStart=/usr/sbin/sshd -D $OPTIONS (code=exited, status=255)
 Main PID: 6503 (code=exited, status=255)

```

需要关闭 SeLinux

查看 selinux 状态
> sestatus 

修改配置
> vim /etc/selinux/config

编辑配置并修改
> SELINUX=disabled

然后重启即可


## 参考资料

- 关闭 se linux https://www.landui.com/help/show-8381
- https://zhidao.baidu.com/question/1951738957393461188.html
- 关于重启失败的错误 https://stackoverflow.com/questions/11672525/centos-6-3-ssh-bind-to-port-xxx-on-0-0-0-0-failed-permission-denied
