---
title: PHP 包管理工具
toc: true
date: 2021-08-11 19:18:36
categories: 
  - PHP 基础
sidebar: auto
permalink: /php/PHP-package-manager/
---

PHP中可以使用的包管理工具为 composer
官网:https://getcomposer.org

安装:https://getcomposer.org/download/

安装composer

> php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"

> php -r "if (hash_file('SHA384', 'composer-setup.php') === '669656bab3166a7aff8a7506b8cb2d1c292f042046c5a994c43155c0be6190fa0355160742ab2e1c88d40d5be660b410') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"

> php composer-setup.php

> php -r "unlink('composer-setup.php');"

浏览PHP包:

http://packagist.org

使用composer

在工作目录下添加composer.json

```
{
    "name": "cakephp-boilerplate",
    "require": {
        "cakephp/cakephp": "2.9.*"
    },
    "config": {
        "vendor-dir": "Vendor/"
    }
}

```

> php composer.phar install

