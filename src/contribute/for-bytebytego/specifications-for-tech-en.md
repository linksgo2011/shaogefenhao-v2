---
title: Technical standard organizations and common technical standards
date: 2024-04-12 22:04:32
sidebar: auto
category: 
  - 软件架构
head:
  - - meta
    - name: keyword
      content: RFC,Technical Standards,System Design
      description: In the field of computing, there are many established technical standards that are very valuable. Referring to these standards makes it easy to find standard open-source implementations, and one can also refer to their principles to develop more reliable solutions.
---

In the field of computing, numerous mature technical standards hold significant value. Consulting these standards not only facilitates finding their open-source implementations but also enables one to devise more reliable solutions based on their underlying principles. For instance, the IETF's RFC documents are among the most authoritative sources of technical information. 

This article compiles technical standards that can be referenced and utilized in designing technical solutions.

Generally, the terms "specification," "standard," and "protocol" can all refer to technical standards, with "protocol" specifically pertaining to standards for network communications.

## Overview of Technical Standards Organizations and Standards

![](./specifications-for-tech/specifications-for-tech.png)

## IETF Organization and Popular Standards

The Internet Engineering Task Force (IETF) is likely the most renowned organization among internet standard bodies. The IETF has numerous Working Groups (WGs) each tasked with developing standards for specific domains, such as HTTP protocol. The primary output of the IETF's work is the RFC documents (Request for Comments). 

### HTTP Protocol Stack RFC 723X

RFC 723X describes the HTTP protocol suite. The HTTP standard is divided into multiple versions, with the most commonly used being 1.1 (RFC 7230). Additionally, the HTTP standards are separated into core and extension standards. For example, caching, sessions, and content encoding fall under extensions. When selecting an HTTP client, it is essential to be aware that its implementation may not be complete. Furthermore, enumerative types such as methods and status codes can be found at the IANA center.

### TCP/IP Protocol Stack RFC 802.3

If you want to learn about the underlying protocols of computer networks, you can read RFC 1180. RFC 1180 serves as an introductory guide to the TCP/IP protocol suite, hence its title "A TCP/IP Tutorial." This RFC document is considered one of the most authoritative reference sources in computer networking literature.
 
### OAuth/Saml

OAuth (Open Authorization) and SAML (Security Assertion Markup Language) are both open standards for authentication and authorization on the internet.

For those needing to build authorization systems, almost all developers must understand these two standards. Both standards have related documentation under the IETF organization.

The difference between OAuth and SAML is that OAuth focuses more on third-party application authorization, while SAML concentrates on single sign-on and identity federation primarily used in enterprise environments. 

### URI RFC 3986

The title of RFC 3986 is "Uniform Resource Identifier (URI): Generic Syntax.", the use of URIs is not limited just to web pages.

URIs can be utilized in many aspects. For example, they can be used to tag the window resources of an app, facilitating a technology known as Deep Linking, which allows a web page to open a specific window of a native app.

### Media Type RFC 6838

Media types refer to the formats of common files, typically marked in the file header information. Application developers can define their own file media formats, and if they wish these formats to be adopted by other applications, they can register them with IANA for management.

## JCP Organization and Popular Standards

The Java Community Process (JCP) is an open international organization, primarily composed of Java developers and licensees. Java's development to its current scale is inseparable from the standardization process. Some specifications within the JCP have not only influenced the world of Java but have also had a significant impact on other languages, such as PHP and Node.js. In everyday server development work, JCP standards are frequently used, for instance in data validation, database access, and server containers. These standards are utilized not only by Java but also referenced by frameworks in other languages; for example, data validation is widely adopted by many frameworks.

### Java Servlet 3.1 JSR 340

Servlets can be described as one of the most important specifications within Java EE, with well-known web containers like Tomcat adhering to the Servlet specification. This is also a common question asked in many company interviews. Servlets define the conventions between Java EE applications and server containers, so during the development process, it is essential to pay special attention to the additional features provided by the web container.

### Bean Validation 2.0 JSR 380

In Java, the standardization of data validation is a typical practice within the JCP, evolving from the earliest JSR 349 to JSR 303, and now to Bean Validation 2.0. Hibernate's latest validator has already begun supporting the 2.0 validation standards. 

### JAX-RS JSR 339

ava API for RESTful Web Services(JAX-RS), is a set of APIs for creating web services that adhere to the REST architectural style. It utilizes Java programming language annotations to simplify the development process.

For users of Spring MVC, the presence of JAX-RS might not be apparent. If you wish to enhance your services with more RESTful capabilities, you can consider using Jersey, which fully implements the JAX-RS standard.

### Java Contexts and Dependency Injection JSR 299

Java Contexts and Dependency Injection defines the standard for CDI (Contexts and Dependency Injection for the Java EE platform). CDI is a part of the Java EE platform, providing a type-safe dependency injection mechanism designed to simplify the development of enterprise Java applications.

Spring is a typical CDI container. However, if you want to make Spring replaceable in your project, be mindful to use annotations defined by JSR 299. This approach will allow you to switch Spring with other container frameworks if necessary.

### Java Persistence API 2.1 JSR 338

JSR 338 established the Java Persistence API (JPA) 2.1 standard. JPA provides a persistence model for Java objects that is decoupled from the specific database tables.

JPA includes definitions for features such as JPQL (Java Persistence Query Language) and ORM (Object-Relational Mapping), enabling the use of different ORM vendors to increase project flexibility.

JPA 2.1 introduces the Criteria API, which allows the complete avoidance of SQL in the program, significantly improving code maintainability.

## W3C Organization and Popular Standards

W3C (World Wide Web Consortium) is the most authoritative and influential international neutral technology standards organization in the field of Web technologies. It is primarily responsible for setting technical details on browsers to eliminate differences in HTML and CSS rendering, including technologies such as DOM, XML, and SVG. However, it's important to note that JavaScript is not within W3C's scope, but W3C is responsible for setting the specifications for JavaScript APIs in browsers, namely the DOM specification.

### HTML Specifications

HTML is one of the most familiar technical standards among engineers. The standardization of HTML ensures that web pages display consistently across different browsers, significantly reducing the need for compatibility-focused development.

In the W3C's HTML standard documents, you can find many useful but uncommon HTML tags, such as the ruby tag, which is not often featured in many HTML textbooks but can be used to provide pronunciation annotations.

### CSS Specifications

CSS standards are often used in conjunction with HTML. As one of the core technologies for web design, CSS standards are not only utilized in web development but are also widely applied in typesetting software.

### DOM Specifications

DOM (Document Object Model) and JavaScript are often used together in web development, but they belong to different technical categories, each with distinct definitions and purposes.

DOM is an interface that allows programs and scripts to dynamically access and update the content, structure, and style of a document. DOM represents HTML or XML documents as a tree structure, where each node is an object in the document.

This means that DOM can be implemented not only in JavaScript but also parsed and implemented by other programming languages.

### XML Specifications

XML is widely used in areas such as the internet, software development, and business data exchange. For example, XML forms the basis of SOAP (a web service protocol) and is used for configuration files, document data exchanges, and transmitting complex data messages between various applications.

W3C has defined a series of specifications for XML including the structure of XML documents, XPath, XSLT, and more.

### WebRTC Specifications

The WebRTC standard enables developers to implement audio and video capabilities in browsers. Through simple application programming interfaces (APIs), both browsers and mobile apps can conduct real-time audio and video communication (RTC). WebRTC allows for the direct exchange of data streams between web browsers without the need for additional plugins or third-party software.

## ECMA Organization and Common Standards

ECMA (European Computer Manufacturers Association) primarily focuses on setting standards related to computer manufacturing and programming. ECMA has established specifications for many programming languages, such as C# and C++. Interestingly, Sun Microsystems once submitted standards related to Java to ECMA but later withdrew them. The most famous specifications under ECMA include ECMAScript, JSON, and office document standards.

### ECMAScript ECMA-262

ECMAScript is the standardized version of JavaScript, defining the core syntax, types, statements, keywords, reserved words, operators, objects, and their methods of this programming language.

### JavaScript Object Notation ECMA-404

JavaScript Object Notation (JSON) is a lightweight data interchange format designed to be easy for humans to read and write, while also being simple for machines to parse and generate. JSON is based on a subset of the JavaScript programming language and has become a language-independent data format, widely used in various programming environments and applications.

Compared to XML, JSON is more machine-friendly and easier to parse, which has contributed to its growing popularity.

### Office Open XML ECMA-376

ECMA has established standards for Office suites, facilitating the parsing of document files across different software applications.

Office Open XML is based on the open XML standard and ZIP compression technology (in fact, office documents are essentially ZIP packages of XML files). Understanding the Office Open XML standards can help engineers easily locate relevant libraries and implementations for manipulating file types of office software such as Word, Excel, and PowerPoint.

## OMG Organization and Common Standards

OMG (Object Management Group) has formalized some object-oriented concepts initially aimed at establishing standards for distributed object-oriented systems, and now it also includes some process modeling content. Standards like UML and BPMN are the results of OMG's work.

### UML

UML (Unified Modeling Language) is a standard modeling language used for requirements capturing, system analysis and design, documentation, and communicating complex software design information to non-technical stakeholders during the design phase. The standardization of UML diagrams allows UML graphics and modeling software to be independent, and referencing the UML standard can eliminate ambiguities in expressing software design and modeling.

### BPMN

BPMN (Business Process Model and Notation) is similar to UML but focuses on defining models and notations related to processes. Standard BPMN models can be parsed by software like process engines, thereby achieving separation between process design and execution.

### MOF

MOF (Meta Object Facility) defines a language and structure for creating meta-models. These meta-models define data types, relationships, constraints, and semantics in a manner similar to UML.

Defining meta-models allows software to have greater versatility and is widely used in SaaS platforms and data warehouses.

## ISO Organization and Common Standards

ISO (International Organization for Standardization) is the world’s largest international standard-setting body. ISO not only sets standards for the computing field but also covers a wide range, including quality, food safety, and some information technology-related standards.

### Date and Time Format ISO 8601

ISO 8601 is a standard for date and time formats aimed at providing a universal format for date and time data exchange across borders, cultures, and industries.

Adhering to ISO 8601 simplifies the handling of dates and times, including formats, parsing, time zones, and time ranges. Using the ISO 8601 format in data structures can perfectly resolve timezone issues in front-end and back-end systems, as well as databases.

### C Language ISO/IEC 9899

ISO/IEC 9899 is the international standard for the C language and is widely regarded as the official definition of the C language. This set of standards is updated periodically by year.

The international standard for the C language promotes compatibility and support across different compilers and IDEs.

### SQL ISO/IEC 9075-1

ISO also defines the standards for SQL (Structured Query Language). Although the SQL standard does not cover many conventions, it is often challenging to avoid using database-specific syntactic features. However, using standard SQL syntax features can significantly enhance the portability of SQL code.

## Standards Under Other Organizations

There are also some useful, but less well-known, standards established by standard-setting organizations that can assist us in completing technical solutions.

### JSON:API

JSON:API provides a set of standards for designing APIs that use JSON format for data exchange, making API design clearer and more unified.

It standardizes the request and response structure, resources, errors, filtering, sorting, and pagination formats. JSON:API is maintained by a niche community, and the standards are simple and easy to read.

### OpenAPI/Raml

OpenAPI and RAML (RESTful API Modeling Language) are used to design, build, document, and consume RESTful web services. These formats provide tools and methods to describe the structure of APIs.

Understanding these two standards is beneficial as they provide a standardized way to describe API designs and the documentation of final implementations. They can also be used to generate code.

### CommonMark

CommonMark is an open-source Markdown specification designed to resolve ambiguities and inconsistencies in the original Markdown syntax.

Markdown is a very effective documentation tool, but there are many differences in implementation. When choosing a Markdown compiler, considering support for the CommonMark standard can help avoid some issues later on.

### ONNX

ONNX (Open Neural Network Exchange) sets the data exchange standards for deep learning models, standardizing the deep learning toolchain, which is very meaningful for AI application developers.

### C4 model

The C4 model, strictly speaking, is not a standard, but it is very useful in describing architectures. C4 stands for Context, Containers, Components, and Code, describing the software system architecture at four progressively detailed levels. The C4 model allows architectural design participants to understand issues at the same level of abstraction.

### TOGAF

TOGAF (The Open Group Architecture Framework) has effectively become the standard material for enterprise architecture.

Enterprise architecture is a superset of system architecture, covering technology, business, and people. Understanding the specifications of enterprise architecture can provide a clearer description of architecture and architectural levels.

### OCI Runtime Specification

The OCI (Open Container Initiative) Runtime Specification is a set of standards defined by the Open Container Initiative organization.

This standard outlines how the runtime environment for containers should be configured and operated, making container technology more open through these guidelines. Due to commercial licensing issues with Docker, many companies are beginning to seek open-source implementations that support the OCI Runtime Specification.

### OCI Image Specification

The OCI Image Specification, similar to the OCI Runtime Specification, standardizes the data format and structure of containers themselves, allowing different tools to encapsulate containers. This set of standards includes specifications for image formats, image manifests, configuration objects, and more.

## Appendix: Access Addresses

- Saml http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html
- OAuth https://datatracker.ietf.org/doc/html/rfc6749
- URI RFC 3986 https://datatracker.ietf.org/doc/html/rfc3986
- Media Type Specifications https://datatracker.ietf.org/doc/html/rfc6838
- Java Servlet 3.1 JSR 340 https://www.jcp.org/en/jsr/detail?id=340
- Bean Validation 2.0 JSR 380 https://beanvalidation.org/2.0-jsr380/
- JAX-RS JSR 339 https://jcp.org/en/jsr/detail?id=339
- Java Contexts and Dependency Injection JSR 299 https://jcp.org/en/jsr/detail?id=299
- Java Persistence API 2.1 JSR 338 https://jcp.org/en/jsr/detail?id=338
- HTML Specifications https://html.spec.whatwg.org/
- CSS Specifications https://www.w3.org/Style/CSS/specs.en.html
- DOM Specifications https://dom.spec.whatwg.org/
- XML Specifications https://www.w3.org/TR/xml/
- WebRTC Specifications https://www.w3.org/TR/webrtc/
- ECMAScript ECMA-262 https://tc39.es/ecma262/
- JavaScript Object Notation ECMA-404https://ecma-international.org/publications-and-standards/standards/ecma-404
- Office Open XML ECMA-376 https://ecma-international.org/publications-and-standards/standards/ecma-376/
- UML https://www.omg.org/spec/UML/2.5.1
- BPMN https://www.omg.org/spec/BPMN/2.0/
- MOF https://www.omg.org/mof/
- Date and time format ISO 8601 https://www.iso.org/iso-8601-date-and-time-format.html
- C Language ISO/IEC 9899 https://www.iso.org/standard/74528.html
- SQL ISO/IEC 9075-1 https://www.iso.org/standard/53681.html
- JSON:API https://jsonapi.org/
- OpenAPI https://spec.openapis.org/oas/v3.1.0
- Raml https://github.com/raml-org/raml-spec/blob/master/versions/raml-10/raml-10.md/
- CommonMark https://spec.commonmark.org/
- ONNX https://onnx.ai/onnx/intro/concepts.html
- C4 model https://c4model.com/
- TOGAF https://pubs.opengroup.org/architecture/togaf9-doc/arch/
- OCI Runtime Specification https://opencontainers.org/posts/blog/2024-02-18-oci-runtime-spec-v1-2/
- OCI Image Specification https://specs.opencontainers.org/image-spec/