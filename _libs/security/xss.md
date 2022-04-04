---
title: XSS 攻击和处理
toc: true
date: 2021-08-11 19:18:36
categories: 
  - 安全
sidebar: auto
permalink: /security/xss/
---

人们经常将跨站脚本攻击（Cross Site Scripting）缩写为CSS，但这会与层叠样式表（Cascading Style Sheets，CSS）的缩写混淆。因此，有人将跨站脚本攻击缩写为XSS。

基本思路就是，通过向系统注入一些恶意的 JavaScript 代码，例如发帖时候带上 JavaScript 代码片段。如果系统不经处理就将用户的输入渲染到页面上，那么另外一个用户在浏览页面时就会触发该片段的执行。

因为代码运行到页面上，基于网页发送请求自动发送 cookies 的原理，从而可以利用被攻击者的身份完成一些特定的行为。这也是为什么客户端不需要处理 XSS 攻击的原因。



## 解决方案



### 对输出简单的转码

```
// 在 Spring 中可以通过 HtmlUtils 的工具类进行输出转码
HtmlUtils.htmlEscape()
```



### 使用专门的 filter 进行转码

http://opensource.finn.no/xss-html-filter/



```java
// retrieve input from user...
String input = ...
String clean = new HTMLInputFilter().filter( input );
```



### 使用 spring security 框架的 xssFilter



 spring security 会默认加载一个 xss filter



https://stackoverflow.com/questions/37606227/is-xss-protection-in-spring-security-enabled-by-default



