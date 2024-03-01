---
title: API 文档和契约
toc: true
date: 2021-08-11 19:18:36
categories: 
  - Rest API
sidebar: auto
permalink: /restful-api/api-document-and-contract/
---

实现API文档生成和前后端合作的几种方案。

- 基于注释的 API 文档：这是一种通过代码中注释生成 API 文档的轻量级方案，它的好处是简单易用，基本与编程语言无关。因为基于注释，非常适合动态语言的文档输出，例如 Nodejs、PHP、Python。由于NPM包容易安装和使用，这里推荐 nodejs 平台下的 apidocjs。

- 基于反射的 API 文档：使用 swagger 这类通过反射来解析代码，只需要定义好 Model，可以实现自动输出 API 文档。这种方案适合强类型语言例如 Java、.Net，尤其是生成一份稳定、能在团队外使用的 API 文档。

- 使用契约进行前后端协作：在团队内部，前后端协作本质上需要的不是一份 API 文档，而是一个可以供前后端共同遵守的契约。前后端可以一起制定一份契约，使用这份契约共同开发，前端使用这份契约 mock API，后端则可以通过它简单的验证API是否正确输出。


## 相关资源

- 博客 http://www.printf.cn/index.php/archives/api-design-document-and-contract.html
