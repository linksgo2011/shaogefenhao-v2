---
title: 技术方案 Webinar - 领域特定语言
date: 2023-08-12 20:54:03
sidebar: true
head:
- - meta
- name: keyword
  content:  领域特定语言
  description:  领域特定语言
---

## 什么是dsl?

领域特定语言，一般来说是非图灵完备的。

## 项目中那些场景适合做 dsl？（重点）

- 查询语言，例如 SQL，或者 SCIM 规范
- 以容易被解析和阅读的数据格式：JSON、XML、YAML
- 表达式执行和求值

## 怎么做dsl？

- 语法解析：难度就在这里
- 对 AST 使用
  - 直接在业务中使用
  - 编译为目标（例如 kotlin 到 Java/JS）

## 编译原理知识

- 词法分析算法，递归下降和向前看
- 语法解析、语义分析
- 构建流水线
- AST
- 语法解析

## 使用 DSL 的案例

- 邓老师分享的查询语言、导入导出
- JSON Path
- Pact 自动测试断言
- 使用特定模板语言实现数据导出
- Java domain Language
- 基于 PlantUML 类图的代码生成
- FEL 表达式作为流程编排语言
- 使用注解也算一种 DSL
- 使用校验器 DSL 同时生成后端、前端的校验器
- OpenAPI、PlantUML 等模型语言都算 DSL 
- 

## 好处

- DSL 给业务暂时系统的规则，并嵌入到系统中运行
- 可以演绎为活文档

## 参考资料

- https://bookstack.soffid.com/books/scim/page/scim-query-syntax
- https://github.com/bobdeng/dslquery
- https://github.com/bobdeng/wordreport
- https://bookstack.soffid.com/books/scim/page/scim-query-syntax
- https://wizardforcel.gitbooks.io/antlr4-short-course/content/
- https://www.antlr.org/
- https://github.com/antlr/grammars-v4/tree/master/xyz
- https://asm.ow2.io/
- https://craftinginterpreters.com/a-map-of-the-territory.html

## 录屏

链接: https://pan.baidu.com/s/1qZDvo1rmcTXW2Z5izLD6ag?pwd=rx9n 提取码: rx9n 复制这段内容后打开百度网盘手机App，操作更方便哦

