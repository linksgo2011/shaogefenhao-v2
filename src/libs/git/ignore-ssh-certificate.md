---
title: 忽略 git SSL 证书
toc: true
date: 2021-08-11 19:18:35
categories: 
  - git
sidebar: auto
permalink: /git/ignore-ssh-certificate/
---

如果自己搭建的 gitlab 开启了自签名证书的 ssl，客户端拉取代码时候会报错


```
error: SSL certificate problem, verify that the CA cert is OK. Details:
error:14090086:SSL routines:SSL3_GET_SERVER_CERTIFICATE:certificate verify failed while accessing https://github.com/username/ExcelANT.git/info/refs
```

全局关闭 ssl 验证

> git config --global http.sslVerify false

当前仓库关闭 ssl 验证

> git config http.sslVerify false

## 参考资料

- https://stackoverflow.com/questions/3777075/ssl-certificate-rejected-trying-to-access-github-over-https-behind-firewall
