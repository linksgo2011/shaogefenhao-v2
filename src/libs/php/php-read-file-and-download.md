---
title: php 读取文件并以文件方式下载
date: 2021-08-11 19:18:36
categories: 
  - PHP 基础
sidebar: auto
permalink: /php/php-read-file-and-download/
---

```java
if (!file_exists($filename)){  //判断能否获取这个文件
            header("Content-type: text/html; charset=utf-8");
            echo "File not found!";
            exit; 
        } else {
            Header("Content-type: application/octet-stream");
            Header("Accept-Ranges: bytes");
            Header("Accept-Length: ".filesize($filename));
            Header("Content-Disposition: attachment; filename=".basename($filename));
            echo file_get_contents($filename);
            exit();
        }
```

