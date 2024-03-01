---
title: PHP环境 in Mac
date: 2021-08-11 19:18:36
categories: 
  - PHP 基础
sidebar: auto
permalink: /php/php-environment-in-mac/
---

实际上Mac系统自带了PHP和Apache的开发环境

1、Apache相关

Mac系统自带apache服务器，我们只需要配置相关信息并进行开启服务即可

sudo vim /etc/apache2/httpd.conf

打开对PHP的支持,第169行左右

LoadModule php5_module libexec/apache2/libphp5.so

2、测试

系统默认会访问／Library/WebServer/Document/index.html.en文件

为了方便测试，在此目录下新建一个test.php文件，并输入

``` php
<?php

phpinfo();

 ?>

```

然后访问localhost/test.php，会直接打印出phpinfo中的各种信息

3、PHP配置

在做第二步测试的时候，扩展里面date会出现错误，原因是默认php.ini没有对date.timezone进行设置，系统默认UTC的时区，所以我们要开启对php.ini的设置

sudo cp /etc/php.ini.default php.ini

先把默认配置文件复制一份，然后给复制好的配置文件增加写的权限

sudo chmod +w php.ini


找到date.timezone，先把默认的注释给删除掉，然后直接后面配置成PRC即可

4、测试

再次访问localhost/test.php，date扩展就OK了！

使用自带的Apache

sudo apachectl start

sudo apachectl stop

sudo apachectl restart

