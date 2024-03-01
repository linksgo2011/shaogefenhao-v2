---
title: mysql 数据导出
toc: true
date: 2021-08-11 19:18:36
categories: 
  - mysql
sidebar: auto
permalink: /mysql/mysqldump/
---

## 数据库导出

> mysqldump \
--column-statistics=0 \
--user=root \
--password=123456 \
--compatible=postgresql \
databasename

PS 我用的 Mac Mysql workbench 带的 mysqldump 命令

> /Applications/MySQLWorkbench.app/Contents/MacOS/mysqldump \
--column-statistics=0 \
--user=root \
--password=123456 \
--compatible=postgresql \

## 查询结果导出

```
mysql> SELECT * FROM runoob_tbl 
    -> INTO OUTFILE '/tmp/runoob.txt';
    
```

## 参考资料

- mysqldump 文档 https://dev.mysql.com/doc/refman/5.6/en/mysqldump.html 
- select 到文件方法 https://www.runoob.com/mysql/mysql-database-export.html

