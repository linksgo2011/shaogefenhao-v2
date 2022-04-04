---
title: MySQL 根据时间段获取数据
date: 2021-08-11 19:18:36
categories: 
  - mysql
sidebar: auto
permalink: /mysql/mysql-by-time-range/
---

时间格式为2008-06-16 
查询出当天数据： 
SELECT * FROM `table` WHERE date(时间字段) = curdate(); 
查询出当月字段： 
SELECT * 
FROM `table` 
WHERE month( 时间字段) = month( now( ) ) ; 
时间格式为1219876…… UNIX时间，只要应用“FROM_UNIXTIME( )”函数 
例如查询当月： 
SELECT * 
FROM `table` 
WHERE month( from_unixtime( reg_time ) ) = month( now( ) ) ; 
查询上一个月的呢？变通一下！ 
SELECT * 
FROM `table` 
WHERE month( from_unixtime( reg_time ) ) = month( now( ) ) -1;
