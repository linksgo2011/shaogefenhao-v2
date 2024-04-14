---
title: 系统设计 | 哪些技术标准可以帮助系统设计？
date: 2024-04-12 22:04:32
sidebar: auto
category: 
  - 软件架构
head:
  - - meta
    - name: keyword
      content: RFC,技术标准,系统设计
      description: 在计算机领域，有很多成熟的技术标准非常有价值，参考技术标准容易找到标准的开源实现，也可以自己参考其原理做出更可靠的方案。
---

在计算机领域，有很多成熟的技术标准非常有价值，参考技术标准容易找到标准的开源实现，也可以自己参考其原理做出更可靠的方案。例如 IETF 的 RFC 文档是最权威的技术资料来源。查阅技术标准也是最快捷的学习方式，但是阅读门槛比较高，而且大多是英文资料。

这篇文章结合技术研讨会总结的内容，整理了在技术方案设计中可以参考和使用的技术标准。

为了更好的组织内容，先介绍一下常见的技术标准组织，并将技术标准分为计算机科学、工程应用、开发工具三类，你可以仅阅读相关内容。
 
对于不常用的技术标准依然有必要了解的技术标准不在文中说明，参考《未详细说明的标准清单》。

补充说明：**规范、标准、协议都可以指标准，协议主要指网络通信标准。**

## 技术标准组织

### IETF

IETF 应该是互联网标准组织中名气最大的，它的全称是国际互联网工程任务组（The Internet Engineering Task Force）。IETF下属有很多工作组（WG），专门负责一个领域标准的制定，例如 OAuth。IETF 工作的产出主要是 RFC 文档（Request For Comments）。IETF 最知名的规范是 TCP/IP 协议族，但是我们日常相关更多关注应用层标准，就不介绍通信相关的协议了，下面是一些常见应用层的标准。

### JCP

JCP（Java Community Process) 是一个开放的国际组织，主要由 Java 开发者以及被授权者组成。Java 之所以能发展成目前这个规模，离不开标准化进程，JCP 中的一些规范不仅影响了 Java 世界，对其他语言，例如 PHP、Nodejs 也造成了巨大的影响。在日常服务器开发工作中，用到 JCP 标准非常多，例如数据验证、数据库访问和服务器容器。

### W3C

W3C 中文名称是万维网联盟，是Web技术领域最具权威和影响力的国际中立性技术标准机构，主要负责制定浏览器上一些技术细节以消除浏览器上 HTML、CSS 渲染的差异，包括 DOM、XML 和 SVG 等技术。但是需要注意 JavaScript 不是 W3C 的范围，但 W3C 需要负责浏览器中 JavaScript API 也就是 DOM 规范的制定。

### ECMA

ECMA 中文名称是欧洲计算机制造联合会，主要负责计算机制造和编程相关的标准制定。ECMA 制定了许多编程语言的规范，例如 C#、C++ 等，有趣的是 Sun 公司曾经提交了 Java 相关标准给 ECMA 但是随后又撤销了。ECMA 下面有几个我们可能特别关注的规范：ECMAScript、JSON 和办公文档规范。

### OMG  

OMG(Object Management Group) 中文名称是对象管理组织，OMG 规范了面向对象的一些概念，开始的目的是为分布式面向对象系统建立标准，现在也包含了一些流程建模的内容。UML、BPMN 等标准都是 OMG 的工作成果。

## 计算机科学相关标准

### HTTP 协议族 RFC 723X

IETF 制定的关于 HTTP 协议值得架构师去阅读，HTTP 协议是基于文本传输的应用层协议，所以比较容易理解，充分挖掘该协议的特性能解决工作中很多问题。

RFC 723X HTTP 协议族 HTTP 标准分为多个版本，目前在用的一般是 1.1（RFC 7230）。同时 HTTP 标准分为核心标准和拓展标准，例如缓存、会话、内容编码等内容属于拓展部分，在选择 HTTP client 时，需要注意其实现程度可能并不完整。另外 method、状态码等枚举类型在 IANA 中心可以找到。

相关地址：HTTP https://www.rfc-editor.org/rfc/rfc7230

可以拓展阅读 Websocket、HTTP/3、HTTP Over TLS 协议。

- Websocket https://datatracker.ietf.org/doc/html/rfc6455
- HTTP/3 https://datatracker.ietf.org/doc/rfc9114/
- HTTP Over TLS https://datatracker.ietf.org/doc/html/rfc2818

### 网络底层协议 TCP/IP 和 802.3

如果希望继续了解和学习计算机网络底层协议，可以阅读 RFC 1180。RFC 1180 算是 TCP/IP 协议簇的导读，所以它的标题是 《A TCP/IP Tutorial》。这份 RFC 文档可以说是计算机网络书籍最权威的材料引用来源。

相关地址：https://datatracker.ietf.org/doc/html/rfc1180

也可以拓展阅读经典的以太网协议 RFC 802.3、WIFI 协议 RFC 802.11。

- RFC 802.3：https://datatracker.ietf.org/doc/html/rfc1516
- RFC 802.11：https://datatracker.ietf.org/doc/html/rfc7494

关于网络协议也可以推荐阅读科来网络协议图谱，了解网络协议之间的关系：

- https://www.colasoft.com.cn/download/protocols_map.php

### LDAP 协议 RFC 4511

LDAP（轻量级目录访问协议）是一种用于访问和维护分布式目录信息的协议。它最初设计用于在 TCP/IP 网络上访问 X.500 目录服务，但后来被推广为在各种环境中使用的通用协议，LDAP 主要用途为提供企业应用人员、组织、部门等信息。

架构师非常有必要了解 LDAP 协议，很多企业应用产品都提供了 LDAP 协议的认证接入。

相关地址： https://datatracker.ietf.org/doc/html/rfc4511

### MQTT 协议 

物联网标准中常用的一项技术是 MQTT，它是一个应用层协议。

MQTT（Message Queuing Telemetry Transport）是一种轻量级的通信协议，设计用于在低带宽、不稳定或资源受限的网络环境中进行高效的消息传输。MQTT 最初由IBM 开发，后来成为 OASIS 标准，并被广泛应用于物联网（IoT）和分布式系统中。

相关地址：https://mqtt.org/mqtt-specification/

### WebRTC

如果需要实现浏览器中的音视频能力，可以了解 WebRTC 规范。

WebRTC（Web Real-Time Communication）是一种开放性的网络技术，旨在使浏览器和移动应用能够实现实时音频、视频通话以及点对点数据传输，无需借助第三方插件或应用程序。WebRTC 由于是关于 Web 的技术，所以由 w3 组织制定。

相关地址：https://www.w3.org/TR/webrtc/

### C、SQL、Java、Javascript、Shell 规范

一般来说，编程语言的规范和实现是分开的。例如 C 语言的实现微软、Borland 等厂商的实现；Sql 也有不同的 DBMS 的实现；Java 有 Oracle 和 OpenJDK 的实现；Javascript 有多套实现。

- C 语言规范 https://www.iso-9899.info/wiki/The_Standard
- SQL 规范 https://www.iso.org/standard/76583.html
- Java 规范 https://docs.oracle.com/javase/specs/
- Javascript 规范 https://www.ecma-international.org/publications-and-standards/standards/ecma-262/
- Shell 编程语言规范 https://pubs.opengroup.org/onlinepubs/9699919799/utilities/V3_chap02.html

## 工程应用

计算机科学中的技术标准可能离我们太远，架构师需要关注工程应用中的标准，下面整理了一些工程应用中你能用的标准。

### 开放授权协议 OAuth 和 Saml

在单点登录和开放授权协议方面，可以使用 OAuth 和 Saml 协议。OAuth 基于 Web token 实现分布式授权，而 Saml 通过 XML 实现。

使用标准的开放授权协议可以帮助我们减少开发成本，提高系统对接的便利性。

相关地址：

- Saml http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html
- OAuth https://datatracker.ietf.org/doc/html/rfc6749

### URI 规范 RFC 3986

RFC 3986 规范的标题是 Uniform Resource Identifier (URI): Generic Syntax，中文名是统一资源定位符，所以 URI 的用途并不仅仅用于网页。

在很多方面都可以使用 URI 规范。例如，可以标记 APP 的窗口资源，来实现一种叫做 Deep Link 的技术，可以从网页打开原生 APP 的某个窗口。

相关地址：https://datatracker.ietf.org/doc/html/rfc3986

### Bean Validation

在 Java 中数据校验的规范化是 JCP 一个典型的实践，从最早的 JSR 349 到 JSR 303，目前已经发展到了 Bean validation 2.0，并开始支持 2SE。Hibernate 最新的 validator 已经开始支持 2.0 的验证规范。早期讲 Java 的书谈到使用 JSR 验证容易让人感到困惑，JSR 只是验证规范，数据验证是由其他的验证器实现的。同时一些非 Java 的验证框架也在参考实现 JCP 的标准。

相关地址：https://beanvalidation.org/2.0/spec/

### JPA Java Persistence

API JPA 定义了对象关系映射以及如何持久化到数据中，JPA、ORM、Hibernate 在 Java 开发时是非常容易被混淆的概念。其中 ORM 只是一个对象映射的概念，JPA 规范了 ORM、数据访问 API、查询语言，Hibernate 对 JPA 进行了实现，JPA 其他的实现还有 Open JPA 和 Eclipse Link 等技术。

相关地址：https://download.oracle.com/otn-pub/jcp/persistence-2_2-mrel-spec/JavaPersistence.pdf

### JAX-RS Java API for RESTful Web Services

JAX-RS 定义了 Restful API 构建相关的规范，包括一些常见的注解都来源这个规范，例如 @Path @GET 等，关于 JAX-RS 的实现除了 Spring 全家桶之外，还有 Jersey、RESTeasy 等实现。

相关地址：https://download.oracle.com/otn-pub/jcp/jaxrs-2_0_rev_A-mrel-eval-spec/jsr339-jaxrs-2.0-final-spec.pdf

### Java Servlet

Servlet 可以说是 J2EE 中最重要的规范之一，如果不去看 servlet 的规范很难理解 servlet 到底是什么。这也是很多公司面试一般都会问的问题。servlet 定义了 J2EE 应用和服务器容器之间的约定，所以在开发过程中就需要特别注意 web 容器提供的额外的特性，造成耦合。

相关地址：https://download.oracle.com/otndocs/jcp/servlet-4-final-spec/index.html

### Office Open XML

ECMA 下一个非常重要的规范，简称 OOXML，现已成为国际文档格式标准。如果在项目中需要使用编程的方式解析 word 文档，参考这个规范下的实现。

相关地址：https://www.ecma-international.org/publications-and-standards/standards/ecma-376/

### JSON API 规范

RESTFul API 并没有定义如何设计详细的 API 消息体，所以你可以参考一些规范来更好的设计 API。jsonapi.org 提供了一套不错的 API 设计规范，可以参考。

相关地址：https://jsonapi.org/

### ISO 时间规范

一般时间的表达、格式化、频率表达、区间表达、时区等时间相关的内容都可以参考 ISO 8601 规范，不仅可以减少关于时间设计的心智负担，还可以复用大量 JDK 中关于时间的实现。

在计算机中，时间的表示被 RFC 3339 进一步规范化，包括时间格式化的代号，表达范围和限制条件。

相关地址：

- RFC 3339 https://www.iso.org/iso-8601-date-and-time-format.html
- ISO 8601 https://datatracker.ietf.org/doc/html/rfc3339

从国际化的时间规范引申出来的还有币种规范，可以使用标准的币种规范作为系统之间通信的代号：

相关地址：ISO 4217 https://www.iso.org/iso-4217-currency-codes.html

### 媒体类型 RFC 6838

媒体类型是指常见文件的格式，通常被标记在文件头信息中。应用开发者可以定义自己的文件媒体格式，如果希望能被其它应用程序也能采纳可以注册到 iana.org 组织。

相关地址：https://datatracker.ietf.org/doc/html/rfc6838

### OpenAPI 和 Raml

在做技术方案时，需要一些标准化的规范表达 API 设计，这时可以使用 OpenAPI 和 Raml。OpenAPI 的前身就是 Swagger 的 API 定义格式。

相关地址：

- OpenAPI https://spec.openapis.org/oas/latest.html
- raml https://raml.org/

### 微格式

在 HTML 或者 XML 中，为了让标记语言更为语义化，用于第三方应用程序识别，出现了微格式这类规范。例如，航空公司通过 HTML 格式的邮件发送了机票信息，邮件客户端可以通过微格式识别其中的关键信息，并添加到提示列表中。

另外的用途是浏览器可以识别微格式，并记录用户的表单输入，减少用户的重复输入。

相关地址：https://microformats.org/wiki/metaformats

### 架构相关规范

在企业级的架构规划工作中，C4 模型是一种轻量级的表达架构视图的规范。重量级的架构规范可以参考企业架构 Togaf，对于垂直领域也有类似 BIAN 对银行、金融领域的架构规范。

- C4 模型 https://c4model.com/
- Togaf https://www.opengroup.org/togaf-standard-version-92-evaluation-license
- BIAN https://bian.org/deliverables/bian-standards/

### 微服务架构规范

微服务架构中的一些术语定义目前没有成熟的标准和规范，不过在网上流传了一份《分布式应用架构通用技术能力要求 第1部分：微服务平台》规范草案可以参考。

相关地址：https://www.doc88.com/p-31473045316869.html


### SCIM 查询语言规范

我们很多时候需要编写一些给前端表单使用的查询 API，有时候可能会出现比较、排序等需求，我们可以参考 scim-query-syntax 定义的一套规范，用来表达参数的格式。

例如属性的比较 equal、not equal、contains、starts with 等，可以被缩写为 eq、ne、co、sw。

相关地址： https://bookstack.soffid.com/books/scim/page/scim-query-syntax

## 开发工具

还有一些规范可能不直接被应用于项目中，而是作为日常工具使用存在。

### 流程建模规范 BPMN

BPMN 由OMG（Object Management Group）制定和维护，它提供了一种统一的方法来描述和可视化业务流程，使业务分析师、流程设计师和技术人员能够更好地理解、沟通和优化业务流程。

相关地址：https://www.bpmn.org/

### UML

UML 是由 OMG 制定的一种用于软件工程和系统设计的标准化图形化建模语言。UML 定义了常见规范化的模型绘图方式，但又不仅仅只是绘图。OMG 的目标其实是利用 UML，标准化的阐述面向对象相关概念，因此可以看做面向对象最权威的材料。

相关地址：https://www.omg.org/spec/UML/2.5/PDF

### commonmark 规范

我们可能会在日常工作中使用 Markdown 编辑文档，Markdown 有很多变种导致各个渲染器或者平台不兼容，从而衍生出 commonmark 这个 Markdown 规范。

相关地址：https://commonmark.org/

## 总结

目前国内对技术规范的采纳和应用还不成熟，而对于国外的应用来说，基本上会优先基于规范来进行架构设计。

例如，认证协议、LDAP 等规范被海外厂商采纳，但是国内应用都使用了自己的私有 API。

随着国内 IT 行业发展，技术规范的采用、建设应该会是一个趋势，尽可能采用技术规范也能提高架构师的竞争力。

## 附录：未详细说明的标准清单

- RDP 远程桌面协议 https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-rdpbcgr/5073f4ed-1e93-45e1-b039-6e30c385867c
- YANG 网络配置模型 https://datatracker.ietf.org/doc/html/rfc6020
- POSIX 协议 https://pubs.opengroup.org/onlinepubs/9699919799.2018edition/~~
- 国家行政区划 http://www.stats.gov.cn/sj/tjbz/tjyqhdmhcxhfdm/2022/51.html
