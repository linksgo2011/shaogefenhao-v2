---
title: Tar 命令
date: 2021-08-11 19:18:36
categories: 
  - linux
sidebar: auto
permalink: /linux/linux-tar/
---

## 解压

解压最常见的 gzip 压缩的 tar 包

>  tar -xvzf abc.tar.gz -C /opt/folder/

列出包内容

> tar -tz -f abc.tar.gz

```
./new/
./new/cde.txt
./new/subdir/
./new/subdir/in.txt
./new/abc.txt
...
```

## 压缩

创建一个 tar 包

> tar -cvf abc.tar ./new/

创建一个 tar.gz 包

> tar -cvzf abc.tar.gz ./new/

添加文件到已经存在的包

> tar -rv -f abc.tar abc.txt

一条简单的备份脚本

> tar -cvz -f archive-$(date +%Y%m%d).tar.gz ./new/

创建包时候，验证压缩包是否有效（特别有用）

> tar -cvW -f abc.tar ./new/
