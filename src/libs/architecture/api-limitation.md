---
title: 接口访问限制方案
toc: true
date: 2021-08-11 19:18:35
categories: 
  - 架构
sidebar: auto
permalink: /architecture/api-limitation/
---

## 使用 nginx 缓存限制


expires起到控制页面缓存的作用，合理的配置expires可以减少很多服务器的请求
要配置expires，可以在http段中或者server段中或者location段中加入
PS. 可以限制单个接口的访问


只需要增加一个反向代理，然后设置 1 秒过期即可，1 s内拿到的是同样的内容。可以将图片等静态资源文件设置时间较长，接口 API 时间设置较短即可。

```
location ~ ^/user/ {

  	proxy_pass http://user.example.com;

    	expires 1;   //1h //1d //expires max; 部分文件看需要可以永久
 }

```

## 利用 Ngnix 的IP限制访问次数

nginx可以通过HttpLimitReqModul和HttpLimitZoneModule配置来限制ip在同一时间段的访问次数。

HttpLimitReqModul用来限制连单位时间内连接数的模块，使用limit_req_zone和limit_req指令配合使用来达到限制。一旦并发连接超过指定数量，就会返回503错误。

HttpLimitConnModul用来限制单个ip的并发连接数，使用limit_zone和limit_conn指令。

这两个模块的区别前一个是对一段时间内的连接数限制，后者是对同一时刻的连接数限制。

配置实例

```
http{
    ...
    #定义一个名为allips的limit_req_zone用来存储session，大小是10M内存，
    #以$binary_remote_addr 为key,限制平均每秒的请求为20个，
    #1M能存储16000个状态，rete的值必须为整数，
    #如果限制两秒钟一个请求，可以设置成30r/m
     
    limit_req_zone $binary_remote_addr zone=allips:10m rate=20r/s;
    ...
    server{
        ...
        location {
            ...
            #限制每ip每秒不超过20个请求，漏桶数burst为5
            #brust的意思就是，如果第1秒、2,3,4秒请求为19个，
            #第5秒的请求为25个是被允许的。
            #但是如果你第1秒就25个请求，第2秒超过20的请求返回503错误。
            #nodelay，如果不设置该选项，严格使用平均速率限制请求数，
            #第1秒25个请求时，5个请求放到第2秒执行，
            #设置nodelay，25个请求将在第1秒执行。
             
            limit_req zone=allips burst=5 nodelay;
            ...
        }
        ...
    }
    ...
}
```

## 使用 Redis 在应用层面限制


使用拦截器对请求根据 IP 计数，写入 redis。这种方案没有 Ngnix 高效。
可以参考 el-admin 中的实现。

## 参考资料

- https://www.cnblogs.com/wangdaijun/p/6264288.html
- https://www.cnblogs.com/saneri/p/5315535.html
