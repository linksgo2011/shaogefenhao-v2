---
title: Nginx 常用操作
toc: true
date: 2021-08-11 19:18:36
categories: 
  - Nginx
sidebar: auto
permalink: /nginx/nginx-usful-command/
---

# 什么是 Nginx

Nginx是一个优秀的web服务器，同时也可以用作负载均衡和反向代理 


# 安装

在Ubuntu的环境下，安装Nginx

> apt-get install nginx

## 常用命令

配置修改后不停服重载
> service nginx reload

停服重启
> service nginx start

## 配置

Nginx的配置文件位于

`/etc/nginx`

配置文件入口为 nginx.conf，其中定义了全局的配置文件，包括日志位置、gzip、邮件以及加载站点的等配置。

我们常用的站点信息配置在：

/etc/nginx/sites-enabled/*;


### 一个默认的配置文件

``
server {
	listen 80 default_server;
	listen [::]:80 default_server ipv6only=on;

    # 资源根目录
    root /var/www;
    
    # 主页
    index index.html index.htm index.php ;
    
    # Make site accessible from http://localhost/
    server_name localhost;
    
    location / {
    	# First attempt to serve request as file, then
    	# as directory, then fall back to displaying a 404.
    	try_files $uri $uri/ =404;
    	# Uncomment to enable naxsi on this location
    	# include /etc/nginx/naxsi.rules
    }
    
    # 配置反向代理 例如 host/sub-path -> http://127.0.0.1:8080; 
    # Only for nginx-naxsi used with nginx-naxsi-ui : process denied requests
    #location /RequestDenied {
    #	proxy_pass http://127.0.0.1:8080;    
    #}
    
    #error_page 404 /404.html;
    
    # redirect server error pages to the static page /50x.html
    #
    #error_page 500 502 503 504 /50x.html;
    #location = /50x.html {
    #	root /usr/share/nginx/html;
    #}
    
    # 开启PHP 解析
    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    location ~ \.php$ {
    	fastcgi_split_path_info ^(.+\.php)(/.+)$;
    	# NOTE: You should have "cgi.fix_pathinfo = 0;" in php.ini
    
    	# With php5-cgi alone:
    	fastcgi_pass 127.0.0.1:9000;
    	# With php5-fpm:
    	fastcgi_pass unix:/var/run/php5-fpm.sock;
    	fastcgi_index index.php;
    	include fastcgi_params;
    }
    
    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #	deny all;
    #}
}

``

### Nginx 解析PHP的原理

Nginx发送请求到php-fpm进程，然后php-fpm解析后返回给Nginx，即HTTP协议处理为Nginx完成，php-fpm 作为后台服务解析PHP页面

### Nginx 增加虚拟主机方法

> mv default v-host

> vim v-host

然后修改 v-host 文件中server_name为站点域名，讲该域名DNS指向本机即可

然后重在或者重启Nginx服务器 

> service nginx restart

查看服务器状态

> service nginx status

如果服务器重启有误或者无效，可以在nginx.info 中找到日志文件查看并修改。
