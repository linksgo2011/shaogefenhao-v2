---
title: 实用的 SQL 语句技巧
date: 2021-08-11 19:18:36
categories: 
  - mysql
sidebar: auto
permalink: /mysql/useful-mysql-statement/
---
使用SQL完成文本替换操作

> update typecho_contents set text=REPLACE (addr,'http://bcs.duapp.com/helpjs','http://helpjs.bj.bcebos.com/')

表之间复制数据,可以使用 select into table1(field1,field2) select (value1,value2) from table2

>  insert into user_temp(id,phone_nbr,open_id,project_from,task_id)
           select id,phone_nbr,open_id,project_from,task_id from user where task_id=#{taskId}



查询重复数据，GROUP BY  可以使用多个字段

> ```sql
> SELECT `user_id` , COUNT(user_id) c FROM `tenant_user_relation` GROUP BY tenant_id,user_id HAVING c > 1;
> ```
>
> 

