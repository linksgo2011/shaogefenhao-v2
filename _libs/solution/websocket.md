---
title: 服务器推送方案
toc: true
date: 2021-08-11 19:18:36
categories: 
  - 技术方案
sidebar: auto
permalink: /solution/websocket/
---

在邮件、消息等场景下需要使用服务器推方案，用于在  web 上和用户实时交互。

一般有几种方案：



1. HTTP 轮询
2. HTTP stram 或 polling 技术 （Comet 技术）
3. Websocket 技术
4. HTTP/2 Server push 技术



## HTTP 轮询

轮询的原理非常简单，让浏览器每隔几秒就向服务器发送一个请求，询问服务器是否有新的信息。

这种方案也是最早期的方案，带来的问题是服务器资源消耗较大。

连接的建立和销毁是比较耗费资源的行为。

## HTTP stram 或 polling 技术 （Comet 技术）

Comet 技术和轮询差不多，不过采取的是阻塞模型，方法是客户端发起一个请求后，服务器挂起，等到需要服务器推送数据时返回 http 数据。返回数据后，客户端再次发起请求。

这种技术会造成服务器线程长时间挂起，因此在服务器阻塞网络模型时性能变得非常差，因为这种方案一般没有兼容性的问题，可以在性能和实现成本上是一个比较好的取舍。

## WebSocket 技术 

WebSocket协议（RFC 6455）提供了一种标准化的浏览器、服务器双工通信方法，通过一个TCP连接在客户机和服务器之间建立全双工、双向的通信通道。它是一种不同于 HTTP 的 TCP 协议，但设计用于在 HTTP 上工作，使用端口 80 和 443。因为可以重用端口，可以重用现有的防火墙。

WebSocket交互从一个HTTP请求开始，该请求使用HTTP升级报头进行升级，切换 WebSocket协议。

Websocket 协议只是借用了 HTTP 协议作为协议切换，建立信道后 HTTP 不在有关系。

客户端发起协议切换请求：

```http
GET /spring-websocket-portfolio/portfolio HTTP/1.1
Host: localhost:8080
Upgrade: websocket 
Connection: Upgrade 
Sec-WebSocket-Key: Uc9l9TMkWGbHFD2qnFHltg==
Sec-WebSocket-Protocol: v10.stomp, v11.stomp
Sec-WebSocket-Version: 13
Origin: http://localhost:8080
```

服务器成功切换协议后返回状态码 101 而非 200：

```http
HTTP/1.1 101 Switching Protocols 
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: 1qVdfYHU9hPOl4JYYNXF623Gzn0=
Sec-WebSocket-Protocol: v10.stomp
```

### WebSocket 和 HTTP 协议的关系

尽管 WebSocket 被设计为与 HTTP 兼容，并从 HTTP 请求开始，但重要的是要理解这两个协议导致了非常不同的体系结构和应用程序编程模型。

在HTTP 和 REST 中，应用程序被建模为许多 url 。为了与应用程序交互，客户端访问这些url，请求-响应样式。服务器根据HTTP URL、方法和标头将请求路由到适当的处理程序。

相反，在WebSockets中，初始连接通常只有一个URL。随后，所有应用程序消息都在同一TCP连接上流动。这指向一个完全不同的异步、事件驱动的消息传递体系结构。

WebSocket 实际上是一种传输层协议，与 HTTP 不同，它不对消息的内容规定任何语义。这意味着，除非客户机和服务器在消息语义上达成一致，否则无法路由或处理消息。

WebSocket 客户端和服务器可以通过 HTTP 握手请求上的 `Sec-WebSocket-Protocol` 头协商使用更高级别的消息传递协议(例如，STOMP)。在这种情况下，他们需要制定自己的惯例。



### WebSocket 和 STOMP 协议







### 技术选型



后端



Java：



SpringBoot



Nodejs



前端：





### 注意事项



**在合适的场景下使用 WebSocket** 



低延迟、高频率和高容量是 WebSocket 特点，如果应用对延迟要求并不高，WebSocket 会带来额外的编程复杂度，并不见得是比轮询更好地方案。



**反向代理和运营商网络要求**

如果 WebSocket 服务器运行在 web 服务器(例如nginx)之后，可能需要将其配置为将 WebSocket 升级请求传递给WebSocke t服务器。同样，如果应用程序在云环境中运行，请检查云提供商与 WebSocket 支持相关的说明。

```nginx
server {
      listen   80;
      server_name example.com;
      
      location / {
        proxy_pass   http://127.0.0.1:8080/; 
 　　　　proxy_http_version 1.1;
        proxy_read_timeout   3600s;
        // 启用支持 websocket 连接
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
      }
}
```



需要特别注意的是，Nginx 等反向代理服务器一定要将 `Upgrade` 相关的头转发出去，否则无法建立起来连接。这个问题非常难调试。



```nginx
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection "upgrade";
```



**wss 和 ws 协议头**

在建立连接时如果使用的 http 协议，则对应发送消息的协议为 ws，如果使用 https 协议建立的链接，则发送消息的协议为 wss。

同时需要注意，wss 还是需要配置相关证书。



**跨域**

WebSocket 协议没有同源策略，但是建立连接的 http 请求有同源策略，需要配置跨域访问。


## HTTP/2 Server push 技术
