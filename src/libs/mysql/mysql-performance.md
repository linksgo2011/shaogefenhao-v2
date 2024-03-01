---
title: Mysql 性能优化
toc: true
date: 2021-08-11 19:18:36
categories: 
  - mysql
sidebar: auto
permalink: /mysql/mysql-performance/
---



## Java 基础







## MySQL基础

1、请解释关系型数据库概念及主要特点？

2、请说出关系型数据库的典型产品、特点及应用场景？

3、请详细描述 SQL 语句分类及对应代表性关键字。

4、什么是 MySQL 多实例，如何配置 MySQL 多实例？

5、如何加强 MySQL 安全，请给出可行的具体措施？

6、误操作执行了一个 drop 库 SQL 语句，如何完整恢复？

7、详述 MySQL 主从复制原理及配置主从的完整步骤。

8、MySQL 如何实现双向互为主从复制，并说明应用场景？

9、MySQL 如何实现级联同步，并说明应用场景？

10、MySQL 主从复制故障如何解决？

11、Mysql 中有哪几种锁？

12、MYSQL 数据表在什么情况下容易损坏？

13、MySQL 里记录货币用什么字段类型好

14、MYSQL 支持事务吗？

15、解释访问控制列表

16、什么是通用 SQL 函数？

17、什么是非标准字符串类型？

18、Mysql 表中允许有多少个 TRIGGERS？

19、什么样的对象可以使用 CREATE 语句创建？

20、NOW（）和 CURRENT_DATE（）有什么区别？

21、可以使用多少列创建索引？

22、InnoDB 是什么？

23、Mysql 如何优化 DISTINCT？

24、如何输入字符为十六进制数字？

25、如何显示前 50 行？



## MySQL 性能优化



1、为查询缓存优化你的查询

2、EXPLAIN 你的 SELECT 查询

3、当只要一行数据时使用 LIMIT 1

4、为搜索字段建索引

5、在 Join 表的时候使用相当类型的例，并将其索引

6、千万不要 ORDER BY RAND()

7、避免 SELECT *

8、永远为每张表设置一个 ID

9、使用 ENUM 而不是 VARCHAR

10、从 PROCEDURE ANALYSE() 取得建议

11、尽可能的使用 NOT NULL

12、Prepared Statements

13、无缓冲的查询

14、把 IP 地址存成 UNSIGNED INT

15、固定长度的表会更快

16、垂直分割

17、拆分大的 DELETE 或 INSERT 语句

18、越小的列会越快

19、选择正确的存储引擎

20、使用一个对象关系映射器(Object Relational Mapper)

21、小心“永久链接”





## 参考资料

- https://www.jianshu.com/p/73789fca138b
