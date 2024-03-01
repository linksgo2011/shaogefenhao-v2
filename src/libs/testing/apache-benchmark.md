---
title: 使用 ab(apache benchmark) 进行压力测试
date: 2021-08-11 19:18:36
categories: 
  - 测试技术
sidebar: auto
permalink: /testing/apache-benchmark/
---

Apache Benchmark 简称 ab 是 Apache web 服务器自带的性能测试工具，在 windows 或者 linux 上安装了 Apache 服务器就可以在其安装位置的 bin 目录中找到 ab 这个程序。

ab 使用起来非常简单，一般只需要 -n 参数指明发出请求的总数，以及 -c 参数指明测试期间的并发数。

例如对 thoughtworks 官网首页发出 100 个请求，模拟并发数为 10：

> ab -n 100 -c 10 https://thoughtworks.com/

需要注意的是 ab 工具接收一个 url 作为参数，仅仅是一个域名是不合法的，需要增加 `/` 表示首页。稍等片刻后就可以看到测试报告:



```
Server Software:        nginx/1.15.6
Server Hostname:        thoughtworks.com
Server Port:            443
SSL/TLS Protocol:       TLSv1.2,ECDHE-RSA-AES256-GCM-SHA384,2048,256
Server Temp Key:        ECDH P-256 256 bits
TLS Server Name:        thoughtworks.com

Document Path:          /
Document Length:        162 bytes

Concurrency Level:      10
Time taken for tests:   42.079 seconds
Complete requests:      100
Failed requests:        0
Non-2xx responses:      100
Total transferred:      42500 bytes
HTML transferred:       16200 bytes
Requests per second:    2.38 [#/sec] (mean)
Time per request:       4207.888 [ms] (mean)
Time per request:       420.789 [ms] (mean, across all concurrent requests)
Transfer rate:          0.99 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:     1056 2474 3006.1   1144   23032
Processing:   349  740 1003.5    379    8461
Waiting:      349  461 290.9    377    2265
Total:       1411 3214 3273.9   1674   23424

Percentage of the requests served within a certain time (ms)
  50%   1674
  66%   2954
  75%   3951
  80%   4397
  90%   6713
  95%   9400
  98%  14973
  99%  23424
 100%  23424 (longest request)
```

从这个报告中可以看到服务器的一些基本信息，以及请求的统计信息。比较重要的指标是 `Requests per second` 每秒钟完成的请求数量，不严格的说也就是我们的平时说的 QPS。

ab 测试是专为 http 请求设计的，因此 ab 的其他参数和 curl 的参数比较类似，也可以指定 http method 以及 cookies 等参数。

