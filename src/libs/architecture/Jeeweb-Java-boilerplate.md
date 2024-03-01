---
title: Jeeweb - SpringMVC+Spring+Hibernate 项目模板
date: 2021-08-11 19:18:35
categories: 
  - 架构
sidebar: auto
permalink: /architecture/Jeeweb-Java-boilerplate/
---

JeeWeb是一款基于SpringMVC+Spring+Hibernate的敏捷开发系统, 实际上是一个种子项目,但是用来开发CRUD项目绰绰有余了。

项目地址:https://www.oschina.net/p/jeeweb
github地址:https://github.com/white-cat/jeeweb

通过学习这个项目,可以学习Java基本的基本选型和配置。
技术选型参考如下:

JeeWeb 功能特点
-----------------------------------
* 	采用SpringMVC+Spring+Hibernate+Shiro+ Ehcache+Disruptor+Jquery + Boostrap + Ztree等基础前后端架构架构
* 	采用面向声明的开发模式， 基于泛型编写极少代码即可实现复杂的数据展示、数据编辑、表单处理等功能，在不使用代码生成器的情况下，也只需要很少的代码就能实现基础的CURD操作，再配合在线开发与代码生成器的使用，更加加快了开发的进度，将J2EE的开发效率成本提高，可以将代码减少60%以上。
* 	在线开发(通过在线配置实现一个表模型的增删改查功能，无需一行代码，支持用户自定义表单布局)
* 	代码生成器，支持多种数据模型,根据表生成对应的Entity,Service,Dao,Controller,JSP等,增删改查功能生成直接使用
* 	UI标签开发库，针对前端UI进行标准封装表，页面统一采用UI标签实现功能：数据datagrid,treegrid,FileInput,Editor,GridSelect等，实现JSP页面零JS，开发维护简洁高效
* 	查询过滤器：只需前端配置，后台动态拼SQL追加查询条件；支持多种匹配方式（全匹配/模糊查询/包含查询/不匹配查询）
* 	移动平台支持，对Bootstrap(兼容Html5)进行标准封装
* 	国际化（支持多语言，国际化的封装为多语言做了便捷支持）
*   多数据源（在线配置数据源，数据源工作类封装）
* 	数据权限：整合Shiro权限
*   计划任务控制（在线配置计划任务、方便计划任务的时间调整规划）
*   邮件发送（配置邮件模版、邮件帐号的在线配置、邮件异步发送、邮件发送日志功能统计）
*   短信发送（配置短信模版、短信帐号的在线配置、短信异步发送、短信发送日志功能统计、支持短信发送平台动态切换）
*   多种首页风格切换,支持自定义首页风格。（Inspinia风格|ACE风格）
*   数据统计报表：丰富的报表统计功能
* 	支持多种浏览器: Google, 火狐, IE,360 等
* 	支持数据库: Mysql,Oracle10g,SqlServer等
* 	基础权限: 用户，角色，菜单权限
* 	Web容器测试通过的有Jetty和Tomcat,Weblogic
* 	要求JDK1.7+

技术选型
===============

1、后端

* 核心框架：Spring Framework
* 安全框架：Apache Shiro
* 视图框架：Spring MVC
* 服务端验证：Hibernate Validator
* 布局框架：SiteMesh
* 任务调度：Quartz
* 持久层框架：Hibernate
* 数据库连接池：Alibaba Druid
* 缓存框架：Ehcache
* 并发框架：Disruptor
* 日志管理：SLF4J、Log4j
* 工具类：Apache Commons、Jackson、Xstream、

2、前端

* JS框架：jQuery。
* CSS框架：Twitter Bootstrap
* 客户端验证：Validform。
* 富文本在线编辑：markdown、simditor、Summernote、CodeMirror自由切换
* 文件上传工具:Bootstrap fileinput
* 数据表格：jqGrid
* 对话框：layer
* 树结构控件：jQuery zTree
* 日期控件： datepicker
* 代码高亮： syntaxhighlighter

简单使用说明
-----------------------------------
* 导入sql/jeeweb-mysql-v1.0.sql文件到mysql数据库
* 导入项目到Eclipse.
* 修改数据库配置文件dbconfig.properties中的账号密码.
* 启动项目,管理员账号admin/密码123456
