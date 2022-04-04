---
title: Mac 环境下使用MAMP安装PHP环境
toc: true
date: 2021-08-11 19:18:36
categories: 
  - PHP 基础
sidebar: auto
permalink: /php/php-mamp/
---

下载安装MAMP

https://www.mamp.info/en/mamp-pro/

设置默认的PHP为MAMP

> export PATH="/Applications/MAMP/bin/php/php5.5.38/bin:$PATH"

另一种方法更为简便,为MAMP的PHP设置一个别名即可

> alias phpmamp=/Applications/MAMP/bin/php/php5.5.38/bin/php


破解安装更多版本的PHP

MAMP PRO 提供了更多的PHP版本选择,但是MAMP只提供了2个,实际上在MAMP安装目录下有多个PHP版本我们可以删除一些无用的PHP版本即可。


