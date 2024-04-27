---
title: 系统设计 | 建议开发者知道的 8 个技术标准
date: 2024-04-12 22:04:32
sidebar: auto
category: 
  - 软件架构
head:
  - - meta
    - name: keyword
      content: RFC,技术标准,系统设计
      description: 建议开发者知道的 8 个技术标准
---

![8-speficications.png](./specifications-for-tech-v2/8-standards x2.jpg)

## TCP/IP

TCP/IP 协议是互联网的基础，也是最有名的网络标准之一，由 IETF 组织制定。 如果希望深入了解和学习计算机网络底层协议，可以阅读 RFC 1180 文档。RFC 1180 算是 TCP/IP 协议簇的导读，所以它的标题是 《A TCP/IP Tutorial》。

## HTTP

IETF 还制定了被广泛使用的 HTTP 协议，是所有 Web 开发者必须学习的知识。 RFC 723X 文档描述了 HTTP 协议族的详细信息。HTTP 标准分为多个版本，目前在用的一般是 1.1（RFC 7230）。同时 HTTP 标准分为核心标准和拓展标准，例如缓存、会话、内容编码等内容属于拓展部分。

## Servlet

Servlet 可以说是 J2EE 中最重要的标准之一，由 JCP 组织制定，Tomcat 等知名 Web 容器都遵守 Servlet 标准。这也是很多公司面试一般都会问的问题，对于 Java 开发者来说，必须了解 Servlet 标准。Servlet 定义了 J2EE 应用和服务器容器之间的约定，这样在必要时可以轻松替换 J2EE 服务器。

## OAuth

OAuth（Open Authorization）是一套开放授权体系的标准，特别是应用于为第三方资源提供的授权服务。 和 OAuth 标准类似的是 SAML（Security Assertion Markup Language），如果需要构建授权系统，开发者最好了解一下这两个标准。 OAuth 的标准文档可以在 RFC 6749 中被找到。

## HTML/CSS

HTML 是工程师们最熟悉的技术标准之一，HTML 的标准化让网页在不同的浏览器中渲染效果统一，也大大减少了兼容开发的工作。 在 W3C 的 HTML 标准文档中，可以找到非常多有用但不常见的 HTML 标签。 CSS 标准常常和 HTML 搭配使用，CSS 作为网页设计的核心技术之一，其标准不仅被用于网页开发，还被广泛应用于排版软件中。

HTML/CSS 都是 W3C 组织制定的标准，不过需要注意的是 JavaScript 语言相关标准并不是 W3C 制定的。

## ECMAScript

ECMAScript 是 JavaScript 的标准化版本，它定义了这种编程语言的核心语法、类型、语句、关键字、保留字、操作符、对象及其方法。ECMAScript 标准由 ECMA（European Computer Manufacturers Association）组织制定，其标准文档编号为 ECMA-262。

## ISO Date

在日常开发中，不统一的时间格式往往会带来很多麻烦。 ISO 8601 是一个日期和时间的格式标准，由 ISO（International Organization for Standardization） 组织制定，旨在提供一种跨国界、跨文化和跨行业通用的日期和时间数据交换格式。 遵守 ISO 8601 对日期和时间的处理会变得简单，它包括时间格式、解析、时区、时间范围等内容。采用 ISO 8601 格式的数据结构，可以完美地解决前后端、数据库中的时区问题。

## OpenAPI

OpenAPI 被用来设计、构建、记录和消费 RESTful Web 服务的标准。对于需要构建和消费 API 的开发者来说，OpenAPI 提供了一种表达 API 设计的 DSL，使其非常容易被转换为文档，也很容易生成需要的代码。