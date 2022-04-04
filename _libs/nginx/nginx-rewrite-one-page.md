---
title: 转发到一个页面，用于维护或者单页应用
toc: true
from: https://www.cnblogs.com/javafucker/p/9232433.html
date: 2021-08-11 19:18:36
categories: 
  - Nginx
sidebar: auto
permalink: /nginx/nginx-rewrite-one-page/
---

## 配置文件



```
server{
            listen 80;   # nginx监听的端口
            root /opt/apache-tomcat-8.0.50/webapps/ROOT;   # tomcat的root路径
            server_name 47.95.*.*;   # 当前主机的域名或ip
            location / {
                    rewrite ^(.*)$ /maintain.html break;   # 要跳转到的页面路径
            }
}
```
