---
title: 技术方案 Webinar -  哪些技术标准可以帮助系统设计？
date: 2023-08-26 20:54:03
sidebar: true
head:
- - meta
- name: keyword
  content:  技术标准
  description:  哪些技术标准可以帮助系统设计？
---

## 问题

哪些技术标准可以帮助系统设计？例如可以使用 OAuth 协议实现通用、开放的认证机制，使用 JCP 规范可以找到很多权威材料。

今天的话题是梳理常见、实用的技术标准。

## 常见的标准化组织

- IETF
- JCP
- W3C
- ECMA
- ISO
- OpenGroup
- OMG
- 国家标准委

## 根据分层的常用规范

### 芯片和物理规范（太超纲了，不聊了）

- ARM  https://ieeexplore.ieee.org/document/7886675

### 计算机和网络协议相关

- 802.3 协议 https://datatracker.ietf.org/doc/html/rfc1516
- RFC 723X HTTP https://www.rfc-editor.org/rfc/rfc7230
- Websocket https://datatracker.ietf.org/doc/html/rfc6455
- TCP/IP  https://datatracker.ietf.org/doc/html/rfc1180
- HTTP/3 https://datatracker.ietf.org/doc/rfc9114/
- HTTP Over TLS https://datatracker.ietf.org/doc/html/rfc2818
- 科来网络协议图谱 https://www.colasoft.com.cn/download/protocols_map.php
- POSIX 协议 https://pubs.opengroup.org/onlinepubs/9699919799.2018edition/
- YANG 网络配置模型 https://datatracker.ietf.org/doc/html/rfc6020
- LDAP 协议 https://datatracker.ietf.org/doc/html/rfc4511
- RDP 远程桌面协议 https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-rdpbcgr/5073f4ed-1e93-45e1-b039-6e30c385867c
- MQTT 协议 https://mqtt.org/mqtt-specification/
- webrtc https://www.w3.org/TR/webrtc/

### 算法相关

- RSA https://www.rfc-editor.org/rfc/rfc8017
- 国密算法：SM2 https://www.oscca.gov.cn/app-zxfw/zxfw/bzgfcx.jsp
- 国家 QRCode、Barcode 规范：
- QRCode https://www.qrcode.com/en/about/standards.html
- 音视频相关 https://www.itu.int/rec/T-REC-H.265
- PDF https://pdfa.org/resource/pdf-specification-index/
- AI 模型 https://onnx.ai/onnx/intro/concepts.html
- 开放容器协议 https://opencontainers.org/

### 编程语言相关

- C语言规范 https://www.iso-9899.info/wiki/The_Standard
- SQL 规范 https://www.iso.org/standard/76583.html
- Java 规范 https://docs.oracle.com/javase/specs/
- Javascript 规范 https://www.ecma-international.org/publications-and-standards/standards/ecma-262/ 
- Shell 编程语言规范 https://pubs.opengroup.org/onlinepubs/9699919799/utilities/V3_chap02.html

### 应用系统和架构相关

- 分布式应用架构通用技术能力要求 第1部分：微服务平台 https://www.doc88.com/p-31473045316869.html
- 认证规范
  - http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html
  - OAuth2 https://datatracker.ietf.org/doc/html/rfc6749
- URI 规范 https://datatracker.ietf.org/doc/html/rfc3986
- Jakarta Bean Validation https://beanvalidation.org/2.0/spec/
- JPA 规范 https://download.oracle.com/otn-pub/jcp/persistence-2_2-mrel-spec/JavaPersistence.pdf
- JAX-RS Java API for RESTful Web Services https://download.oracle.com/otn-pub/jcp/jaxrs-2_0_rev_A-mrel-eval-spec/jsr339-jaxrs-2.0-final-spec.pdf
- JSR-000369 Java Servlet 4.0 Specification Final Release https://download.oracle.com/otndocs/jcp/servlet-4-final-spec/index.html
- Office 文件格式 https://www.ecma-international.org/publications-and-standards/standards/ecma-376/
- JSON API 参考规范 https://jsonapi.org/
- ISO 时间规范 
  - https://www.iso.org/iso-8601-date-and-time-format.html
  - https://datatracker.ietf.org/doc/html/rfc3339
- ISO 币种规范 https://www.iso.org/iso-4217-currency-codes.html
- IETF 媒体类型 https://datatracker.ietf.org/doc/html/rfc6838
- API 设计规范
  - OpenAPI https://spec.openapis.org/oas/latest.html
  - raml https://raml.org/
- 企业架构
  - https://c4model.com/
  - https://github.com/structurizr/dsl
  - https://www.opengroup.org/togaf-standard-version-92-evaluation-license
  - https://bian.org/deliverables/bian-standards/
- 流程规范
  - https://www.bpmn.org/
- HTML 微格式 https://microformats.org/wiki/metaformats
- 依赖注入规范 https://jcp.org/en/jsr/detail?id=365

### 项目管理和软件工程相关  

- 敏捷联盟 https://www.agilealliance.org/
- Scrum 规范 https://scrumguides.org/scrum-guide.html
- 软件工程术语规范 https://www.iso.org/standard/67223.html
-  Spotify 规模化敏捷框架 Scaling Agile https://blog.crisp.se/wp-content/uploads/2012/11/SpotifyScaling.pdf 
- CMMI 规范 https://resources.sei.cmu.edu/asset_files/technicalreport/2010_005_001_15287.pdf

### 工具

- UML 2.5 规范 https://www.omg.org/spec/UML/2.5/PDF
- Markdown 规范 https://commonmark.org/
- SCIM 查询语言规范 https://bookstack.soffid.com/books/scim/page/scim-query-syntax
-  http://www.stats.gov.cn/sj/tjbz/tjyqhdmhcxhfdm/2022/51.html
- DOT 绘图规范 https://graphviz.org/doc/info/lang.html
- LaTeX https://www.latex-project.org

## 录屏

链接: https://pan.baidu.com/s/1N5bJXlEdyC0sFbTGWnK4zw?pwd=xiq8 提取码: xiq8 
