---
title: Nginx拦截指定国家的IP
toc: true
from: https://www.cnblogs.com/javafucker/p/10027850.html
date: 2021-08-11 19:18:36
categories: 
  - Nginx
sidebar: auto
permalink: /nginx/nginx-block-via-ip/
---

## 一、下载GeoIP数据库

```
wget http://geolite.maxmind.com/download/geoip/api/c/GeoIP.tar.gz
wget http://geolite.maxmind.com/download/geoip/database/GeoLiteCity.dat.gz
wget http://geolite.maxmind.com/download/geoip/database/GeoLiteCountry/GeoIP.dat.gz
```

## 二、安装GeoIP

```
tar -xzvf GeoIP.tar.gz
cd GeoIP
./configure
make && make install
```

## 三、解压GeoLiteCity.dat.gz和GeoIP.dat.gz

```
gunzip GeoIP.dat.gz
gunzip GeoLiteCity.dat.gz 
```

## 四、将上面两个文件夹移动到自定义目录，我这儿是/etc/nginx/geoip

```
mv GeoIP.dat /opt/nginx/geoip/
mv GeoLiteCity.dat /opt/nginx/geoip/
```

## 五、修改nginx的配置文件nginx.conf

### 5.1在http模块加入GeoIP库的路径（注意要换成你自己的路径）

```
geoip_country  /etc/nginx/geoip/GeoIP.dat;
geoip_city     /etc/nginx/geoip/GeoLiteCity.dat;
```

### 5.2在server模块拦截指定国家IP（这里以中国CN为例，其他国家的代码可以自己问问度娘或者谷歌）

```
if ($geoip_country_code = CN) {
    return 403;
}
```

这里返回403在页面上来看就是nginx的403默认页面

如果要跳转到自定义页面，第一步再定义一个server模块用于访问自定义页面

```
server {
    listen 81;    #可以自定义端口（注意不要被占用了）
    server_name your_server_name;     #这里填写你的ip或域名
    root /usr/local/nginx/html/;      # 存放自定义页面的根目录
    index index.html;     #自定义页面
}
```

第二步将“return 403”修改为重定向

```
if ($geoip_country_code = CN) {
    rewrite ^/(.*) http://your_server_name:81/ break;
}
your_server_name就是第一步中定义的server模块中的ip或域名，端口也要加上
```

ps：我看网上说可以自定义403页面然后直接“return 403”就可以跳转到自定义页面了，

我试过好像不行，在if语句里面无法直接return到自定义页面，

但是在if块外面是可以自定义403页面的。

有没有大神有更简单的方法跳转到自定义页面，欢迎评论O(∩_∩)O哈哈~
