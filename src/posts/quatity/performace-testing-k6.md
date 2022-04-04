---
title: 使用 k6 进行压力测试
date: 2021-08-11 19:18:36
sidebar: auto
category: 
  - 软件质量
head:
  - - meta
    - name: keyword
      content: K6,性能测试
description: k6 没有使用 nodejs 而是 golang 程序，通过包裹了一个 JavaScript 运行时来运行 JavaScript 脚本。
---

## 简介

k6 是一个压力测试套件，使用 golang 编写。主要特性有：

- 提供了友好的 CLI  工具
- 使用 JavaScript 代码编写测试用例
- 可以根据性能条件设置阈值，表明成功还是失败

k6 没有使用 nodejs 而是 golang 程序，通过包裹了一个 JavaScript 运行时来运行 JavaScript 脚本，因此不能直接使用 npm 包以及 Nodejs 提供的一些 API。

同时，k6 在运行测试时，没有启动浏览器，主要用于测试页面以及 API 加载速度。k6 提供了通过网络请求（HAR）生成测试脚本的方法，实现更简便的测试脚本编写，以及 session 的维护。

## 安装 

在 Mac 上比较简单，直接使用 HomeBrew 即可安装：

> brew install k6

其他平台官网也提供了相应的安装方式，比较特别的是提供了 Docker 的方式运行。

## 使用

直接使用 k6 的命令运行测试，官网提供了一个例子：

> k6 run github.com/loadimpact/k6/samples/http_get.js

也可以编写自己的测试脚本:

```
import http from "k6/http";
import { sleep } from "k6";

export default function() {
  http.get("https://www.thoughtworks.com");
  sleep(1);
};

```

保存文件 script.js 后运行 k6 命令

> k6 run script.js

然后可以看到 http 请求的各项指标

```
        /\      |‾‾|  /‾‾/  /‾/   
     /\  /  \     |  |_/  /  / /    
    /  \/    \    |      |  /  ‾‾\  
   /          \   |  |‾\  \ | (_) | 
  / __________ \  |__|  \__\ \___/ .io

  execution: local
     output: -
     script: k6.js

    duration: -,  iterations: 1
         vus: 1, max: 1

    done [==========================================================] 1 / 1

    data_received..............: 108 kB 27 kB/s
    data_sent..................: 1.0 kB 252 B/s
    http_req_blocked...........: avg=2.35s    min=2.35s    med=2.35s    max=2.35s    p(90)=2.35s    p(95)=2.35s   
    http_req_connecting........: avg=79.18ms  min=79.18ms  med=79.18ms  max=79.18ms  p(90)=79.18ms  p(95)=79.18ms 
    http_req_duration..........: avg=639.03ms min=639.03ms med=639.03ms max=639.03ms p(90)=639.03ms p(95)=639.03ms
    http_req_receiving.........: avg=358.12ms min=358.12ms med=358.12ms max=358.12ms p(90)=358.12ms p(95)=358.12ms
    http_req_sending...........: avg=1.79ms   min=1.79ms   med=1.79ms   max=1.79ms   p(90)=1.79ms   p(95)=1.79ms  
    http_req_tls_handshaking...: avg=701.46ms min=701.46ms med=701.46ms max=701.46ms p(90)=701.46ms p(95)=701.46ms
    http_req_waiting...........: avg=279.12ms min=279.12ms med=279.12ms max=279.12ms p(90)=279.12ms p(95)=279.12ms
    http_reqs..................: 1      0.249921/s
    iteration_duration.........: avg=4s       min=4s       med=4s       max=4s       p(90)=4s       p(95)=4s      
    iterations.................: 1      0.249921/s
    vus........................: 1      min=1 max=1
    vus_max....................: 1      min=1 max=1
```

运行压力测试时，需要增加更多的虚拟用户（VU），vus 参数和持续时间的参数:

> k6 run --vus 10 --duration 30s script.js


## 编写测试脚本的一些规则

`default` 方法是用于给每个 VU 以及每次迭代重复运行的，因此需要把真正的测试代码放到这个方法中，例如访问某个页面。

为了保证测试的准确性，一些初始化的代码不应该放到 `default` 方法中。尤其是文件的读取等依赖环境上下文的操作不能放到 `default` 方法中执行，这样做也会丢失 k6 分布式运行的能力。

前面提到的命令行参数，例如指定虚拟用户数量 `--vus 10`，这些参数也可以放到脚本代码中。通过暴露一个 options 对象即可。

```
export let options = {
  vus: 10,
  duration: "30s"
};
```

为了更为真实的模拟用户访问的场景，k6 提供了在整个测试期间让用户数量和访问时间呈阶段性变化的能力。只需要在 options 中增加 stages 参数即可：

```
export let options = {
 stages: [
    { duration: "30s", target: 20 },
    { duration: "1m30s", target: 10  },
    { duration: "20s", target: 0 },
  ]
};
```

在测试过程中需要检查网络请求是否成功，返回的状态码是否正确，以及响应时间是否符合某个阈值。在脚本中可以通过调用 check() 方法编写检查语句，以便 k6 能收集到报告。

```
import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 10,
  duration: "30s"
};

export default function() {
  let res = http.get("http://test.loadimpact.com");
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 200
  });
  sleep(1);
};

```

## 报告输出

k6 默认将报告输出到 stdout 控制台，同时也提供了多种格式报告输出，包括：

- JSON
- CSV
- InfluxDB
- Apache Kafka
- StatsD
- Datadog
- Load Impact cloud platform

当然，我们在编写测试的时候不可能只有一个用例，对多个场景可以在脚本中通过 `group` 进行分组，分组后输出的报告会按照分组排列。同时，也可以使用对一个组整体性能衡量的指标 `group_duration`。

```
import { group } from "k6";

export default function() {
  group("user flow: returning user", function() {
    group("visit homepage", function() {
      // load homepage resources
    });
    group("login", function() {
      // perform login
    });
  });
};

```

InfluxDB 等外部数据收集平台时，还可以打上标签，供过滤和检索使用。k6 提供了一些内置的标签，并允许用户自定义标签。

## 相关资料

- 官方文档 https://docs.k6.io/docs
