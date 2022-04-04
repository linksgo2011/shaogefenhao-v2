---
title: mysql 存储过程编写示例
toc: true
date: 2021-08-11 19:18:36
categories: 
  - mysql
sidebar: auto
permalink: /mysql/mysql-stored-procedure/
---

## 一个创建模拟数据的存储过程

```mysql

DROP PROCEDURE IF EXISTS `insertStubData`;
DELIMITER $$
CREATE PROCEDURE `insertStubData`()
BEGIN
    DECLARE i int unsigned DEFAULT 0;
    WHILE i < 30000 DO
		SET i = i+1;
		INSERT INTO `sso_login`(`id`,
		`phone_nbr`,
		`open_id`,
		`project_from`,
		`task_id`)
		VALUES
		(null,CONCAT("133",i),i,"TW",10);
    END WHILE;
END $$
DELIMITER ;

CALL insertStubData();

```

## 编写 mysql 存储过程的基础

- 基本教程 https://www.runoob.com/w3cnote/mysql-stored-procedure.html

## 一些注意事项

- 定义变量需要和SQL保持一致
- 使用 SET 为变量赋值
