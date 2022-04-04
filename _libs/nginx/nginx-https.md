---
title: nginx 配置 https
toc: true
from: https://www.cnblogs.com/javafucker/p/9274627.html
date: 2021-08-11 19:18:36
categories: 
  - Nginx
sidebar: auto
permalink: /nginx/nginx-https/
---

##  准备证书

###  1、生成RSA私钥

命令：openssl genrsa -des3 -out server.key 1024

说明：生成rsa私钥，des3算法，1024强度，server.key是秘钥文件名

### 2、生成证书签名请求CSR

命令： openssl req -new -key server.key -out server.csr -config openssl.cnf

说明：openssl.cnf是OpenSSL的配置文件，通常放在/usr/lib/ssl/openssl.cnf

注意：需要依次输入国家，地区，城市，组织，组织单位，Common Name和Email。其中Common Name，必须写域名，若是测试可以写localhost

### 3、生成自签名的证书

命令： openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt



## 配置 nginx

```
server{

    listen  443 ssl;
    server_name 你的域名或ip;

    keepalive_timeout   70;

    ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers         AES128-SHA:AES256-SHA:RC4-SHA:DES-CBC3-SHA:RC4-MD5;
    ssl_certificate     /etc/nginx/ssl/server.crt;   #证书路径
    ssl_certificate_key /etc/nginx/ssl/server.key;   #私钥路径
    ssl_session_cache   shared:SSL:10m;
    ssl_session_timeout 10m;

    location / {
        proxy_pass http://127.0.0.1:8080/;   #转发到tomcat
        proxy_set_header Host       $http_host;
        proxy_set_header X-Real-IP $remote_addr;  
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  
        proxy_set_header X-Forwarded-Proto $scheme;
    }

}
```



## http 跳转到 https 

```java
server {
    listen 80;
    server_name 你的域名或ip;
     
    rewrite ^(.*)$  https://$host$1 permanent;   #强制转https
  
    location ~ / {
    　　root /var/www/html/8080;
    　　index index.html index.php index.htm;
    }
}
```



## 参考资料

- OpenSSL生成自签名的证书：https://www.cnblogs.com/hnxxcxg/p/7610582.html

- nginx配置https：[https://blog.csdn.net/hylexus/article/details/53152701](https://www.cnblogs.com/kevingrace/p/6187072.html)

- http强转https：https://www.cnblogs.com/kevingrace/p/6187072.html
