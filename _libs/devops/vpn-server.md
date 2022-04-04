---
title: vps 下 搭建vpn
toc: true
date: 2021-08-11 19:18:35
categories: 
  - 运维开发
sidebar: auto
permalink: /devops/vpn-server/
---

**1、用root账户登陆服务器**

**2、安装PPTPD**

```
apt-get install pptpd
```

**3、编辑pptpd.conf文件**

```
vi /etc/pptpd.conf
```

取消注释下面内容

```
option /etc/ppp/pptpd-options
localip 192.168.0.1
remoteip 192.168.0.234-238,192.168.0.245
```

这几句的意思是：当外部计算机通过pptp联接到vpn后所能拿到的ip地址范围和服务器的ip地址设置。

**4、添加用于登陆的账户**

```
vi /etc/ppp/chap-secrets
```

格式如下：

```
用户名 pptpd "密码" *
```

密码需要用英文双引号
星号(*)代表允许接入的ip可以是任意ip。
这样，vpn就搭建好了，不过大多数人包括我在内，用国外服务器搭VPN都是为了偶尔能跳出局域网，所以我们还需要配置转发。

**5、设置DNS解析，编辑pptpd-options文件**

```
vi /etc/ppp/pptpd-options
```

找到ms-dns，取消掉注释，并修改DNS地址，这里我推荐大家用Google DNS 8.8.8.8 和 8.8.4.4

**6、开启转发**

```
vi /etc/sysctl.conf
```

取消注释以下内容

```
net.ipv4.ip_forward=1
```

这句话意思是：打开内核IP转发

这里需要生效 

>  sudo sysctl -p

**7、安装iptables并设置**

```
apt-get install iptables
iptables -t nat -I POSTROUTING -j MASQUERADE
```

后面这句话作用是：立刻让LINUX支持NAT(platinum)

**8、重新启动服务**

```
/etc/init.d/pptpd restart
```

**9、大功告成，你可以使用你的VPN在无疆的互联网中翱翔啦～**
