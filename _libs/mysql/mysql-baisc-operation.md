---
title: Mysql 基本管理命令
toc: true
date: 2021-08-11 19:18:36
categories: 
  - mysql
sidebar: auto
permalink: /mysql/mysql-baisc-operation/
---

一、从命令行登录MySQL数据库服务器 1、登录使用默认3306端口的MySQL

/usr/local/mysql/bin/mysql -u root -p

2、通过TCP连接管理不同端口的多个MySQL（注意：MySQL4.1以上版本才有此项功能）

/usr/local/mysql/bin/mysql -u root -p --protocol=tcp --host=localhost --port=3307

3、通过socket套接字管理不同端口的多个MySQL

/usr/local/mysql/bin/mysql -u root -p --socket=/tmp/mysql3307.sock

4、通过端口和IP管理不同端口的多个MySQL

/usr/local/mysql/bin/mysql -u root -p -P 3306 -h 127.0.0.1

--------------------------------------------------------------------------------

二、数据库操作SQL语句 1、显示服务器上当前存在什么数据库

SHOW DATABASES;

2、创建名称为rewin的数据库

CREATE DATABASE rewin DEFAULT CHARACTER SET utf8 ;

3、删除名称为rewin的数据库

DROP DATABASE rewin;

4、选择rewin数据库

USE rewin;

--------------------------------------------------------------------------------

三、表操作SQL语句（登录之后必须用以上的USE命令选择一个数据库，再进行表操作） 1、显示当前数据库中存在什么表

SHOW TABLES;

2、创建数据库表zhangyan：在mysql>后粘贴以下SQL语句，存储引擎为MYISAM，字段id为主键、唯一索引

。

CREATE TABLE `zhangyan` ( `id` INT( 5 ) UNSIGNED NOT NULL AUTO_INCREMENT , `username` VARCHAR( 20 ) NOT NULL , `password` CHAR( 32 ) NOT NULL , `time` DATETIME NOT NULL , `number` FLOAT( 10 ) NOT NULL , `content` TEXT NOT NULL , PRIMARY KEY ( `id` ) ) ENGINE = MYISAM ;

3、查看zhangyan表结构

DESCRIBE zhangyan;

4、从表中检索信息 4.1、从zhangyan表中检索所有记录

SELECT * FROM zhangyan;

4.2、从zhangyan表中检索特定的行：字段username等于abc，字段number等于1，按字段id降序排列

SELECT * FROM zhangyan WHERE username = abc AND number=1 ORDER BY id DESC;

4.3、从zhangyan表中检索指定的字段：username和password

SELECT username, password FROM zhangyan;

4.4、从zhangyan表中检索出唯一的不重复记录：

SELECT DISTINCT username FROM zhangyan;

5、插入信息到zhangyan表

INSERT INTO zhangyan (id, username, password, time, number, content) VALUES (, abc, 123456,

2007-08-06 14:32:12, 23.41, hello world);

6、更新zhangyan表中的指定信息

UPDATE zhangyan SET content = hello china WHERE username = abc;

7、删除zhangyan表中的指定信息

DELETE FROM zhangyan WHERE id = 1;

8、清空zhangyan表

DELETE FROM zhangyan;

9、删除zhangyan表

DROP TABLE zhangyan;

10、更改表结构，将zhangyan表username字段的字段类型改为CHAR(25)

ALTER TABLE zhangyan CHANGE username username CHAR(25);

11、将当前目录下的mysql.sql导入数据库

SOURCE ./mysql.sql;

--------------------------------------------------------------------------------

四、数据库权限操作SQL语句 

1、创建一个具有root权限，可从任何IP登录的用户sina，密码为zhangyan

GRANT ALL PRIVILEGES ON *.* TO sina@% IDENTIFIED BY zhangyan;

2、创建一个具有"数据操作"、"结构操作"权限，只能从192.168.1.***登录的用户sina，密码为zhangyan

GRANT SELECT , INSERT , UPDATE , DELETE , FILE , CREATE , DROP , INDEX , ALTER , CREATE

TEMPORARY TABLES , CREATE VIEW , SHOW VIEW , CREATE ROUTINE, ALTER ROUTINE, EXECUTE ON

*.* TO sina@192.168.1.% IDENTIFIED BY zhangyan;

3、创建一个只拥有"数据操作"权限，只能从192.168.1.24登录，只能操作rewin数据库的zhangyan表的用户

sina，密码为zhangyan

GRANT SELECT , INSERT , UPDATE , DELETE ON  rewin.zhangyan TO sina@192.168.1.24 IDENTIFIED BY

zhangyan;

4、创建一个拥有"数据操作"、"结构操作"权限，可从任何IP登录，只能操作rewin数据库的用户sina，密码为

zhangyan

GRANT SELECT , INSERT , UPDATE , DELETE , CREATE , DROP , INDEX , ALTER , CREATE TEMPORARY

TABLES , CREATE VIEW , SHOW VIEW , CREATE ROUTINE, ALTER ROUTINE, EXECUTE ON rewin.* TO

sina@% IDENTIFIED BY zhangyan;

5、删除用户

DROP USER sina@%;

6.MySQL中将字符串aaa批量替换为bbb的SQL语句

UPDATE 表名 SET 字段名 = REPLACE (字段名, aaa, bbb);

7.修复损坏的表       ①、用root帐号从命令行登录MySQL： 　　     mysql -u root -p

　　②、输入root帐号的密码。

　　③、选定数据库名（本例中的数据库名为student）： 　　use student;

　　④、修复损坏的表（本例中要修复的表为smis_user_student）： 　　repair table smis_user_student;udent;
