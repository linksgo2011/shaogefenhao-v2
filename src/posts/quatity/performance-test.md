---
title: 几种性能测试工具总结
date: 2021-08-11 19:18:36
sidebar: auto
category: 
  - 软件质量
head:
  - - meta
    - name: keyword
      content: 微基准测试 (JMH),AB (Apache Benchmark) 测试,Jmeter,性能测试
description: 我们经常会谈论性能、并发等问题，但是衡量性能不是说写段代码循环几百次这么简单。最近从项目上的同事了解到了代码化的测试性能测试工具 k6，以及结合之前用过的Java 微基准测试 (JMH)、AB (Apache Benchmark) 测试、Jmeter 做一下总结。
---

我们经常会谈论性能、并发等问题，但是衡量性能不是说写段代码循环几百次这么简单。最近从项目上的同事了解到了代码化的测试性能测试工具 k6，以及结合之前用过的Java 微基准测试 (JMH)、AB (Apache Benchmark) 测试、Jmeter 做一下总结。

谈性能，实际上结合实际的业务背景、网络条件、测试数据的选择等因素影响非常大，单纯的谈 QPS 等数据意义不大。

这里介绍的几个工具刚好能满足平时开发工作中不同场景下衡量性能的需求，因此整理出来。

- Java 微基准测试 (JMH) 可以用于衡量一段 Java 代码到底性能如何，例如我们平时总是谈 StringBuilder 比 new String() 快很多。我们有一个很好地量化方法，就可以很直观的展示出一段代码的性能优劣。
- AB (Apache Benchmark) 测试是 Apache 服务器内置的一个 http web 压测工具，非常简单易用。Mac 预装了 Apache，因此可以随手使用来测试一个页面或者 API 的性能。贵在简单易用，无需额外安装。
- k6 一款使用 go 语言编写，支持用户编写测试脚本的测试套件。弥补了 ab 测试功能不足，以及 jemeter 不容易代码化的缺点。也是项目上需要使用，从同事那里了解到的。
- Jmeter 老牌的性能测试工具，有大量专门讲 jmeter 的资料，本文不再赘述。

那我们从 JMH 开始从来看下这几个工具的特点和使用吧。

## Java 微基准测试

> StringBuilder 到底比 new String() 快多少呢？

我们可以使用 JMH 来测试一下。JMH 是一个用于构建、运行和分析 Java 方法运行性能工具，可以做到 nano/micro/mili/macro 时间粒度。JMH 不仅可以分析 Java 语言，基于 JVM 的语言都可以使用。

JMH 由 OpenJDK 团队开发，由一次下载 OpenJDK 时注意到官网还有这么一个东西。

OpenJdk 官方运行 JMH 测试推的方法是使用 Maven 构建一个单独的项目，然后把需要测试的项目作为 Jar 包引入。这样能排除项目代码的干扰，得到比较可靠地测试效果。当然也可以使用 IDE 或者 Gradle 配置到自己项目中，便于和已有项目集成，代价是配置比较麻烦并且结果没那么可靠。

### 使用 Maven 构建基准测试

根据官网的例子，我们可以使用官网的一个模板项目。

> mvn archetype:generate \
>      -DinteractiveMode=false \
>      -DarchetypeGroupId=org.openjdk.jmh \
>      -DarchetypeArtifactId=jmh-java-benchmark-archetype \
>      -DgroupId=org.sample \
>      -DartifactId=test \
>      -Dversion=1.0

创建一个项目，导入 IDE，Maven 会帮我们生成一个测试类，但是这个测试类没有任何内容，这个测试也是可以运行的。

先编译成 jar

> mvn clean install

然后使用 javar -jar 来运行测试

> java -jar target/benchmarks.jar

运行后可以看到输出信息中包含 JDK、JVM 等信息，以及一些用于测试的配置信息。

```
# JMH version: 1.22
# VM version: JDK 1.8.0_181, Java HotSpot(TM) 64-Bit Server VM, 25.181-b13
# VM invoker: /Library/Java/JavaVirtualMachines/jdk1.8.0_181.jdk/Contents/Home/jre/bin/java
# VM options: <none>
# Warmup: 5 iterations, 10 s each
# Measurement: 5 iterations, 10 s each
# Timeout: 10 min per iteration
# Threads: 1 thread, will synchronize iterations
# Benchmark mode: Throughput, ops/time
# Benchmark: org.sample.MyBenchmark.testSimpleString
```

下面是一些配置信息说明

- Warmup 因为 JVM 即时编译的存在，所以为了更加准确有一个预热环节，这里是预热  5，每轮 10s。
- Measurement 是真实的性能测量参数，这里是 5轮，每轮10s。
- Timeout 每轮测试，JMH 会进行 GC 然后暂停一段时间，默认是 10 分钟。
- Threads 使用多少个线程来运行，一个线程会同步阻塞执行。
- Benchmark mode 输出的运行模式，常用的有下面几个。
  - Throughput 吞吐量，即每单位运行多少次操作。
  - AverageTime 调用的平均时间，每次调用耗费多少时间。
  - SingleShotTime 运行一次的时间，如果把预热关闭可以测试代码冷启动时间
- Benchmark 测试的目标类

实际上还有很多配置，可以通过 -h 参数查看

> java -jar target/benchmarks.jar -h

由于默认的配置停顿的时间太长，我们通过注解修改配置，并增加了 Java 中最基本的字符串操作性能对比。

```
@BenchmarkMode(Mode.Throughput)
@Warmup(iterations = 3)
@Measurement(iterations = 5, time = 5, timeUnit = TimeUnit.SECONDS)
@Threads(8)
@Fork(1)
@OutputTimeUnit(TimeUnit.MILLISECONDS)
public class MyBenchmark {

    @Benchmark
    public void testSimpleString() {
        String s = "Hello world!";
        for (int i = 0; i < 10; i++) {
            s += s;
        }
    }

    @Benchmark
    public void testStringBuilder() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 10; i++) {
            sb.append(i);
        }
    }
}

```

在控制台可以看到输出的测试报告，我们直接看最后一部分即可。

```
Benchmark                       Mode  Cnt      Score      Error   Units
MyBenchmark.testSimpleString   thrpt   10    226.930 ±   16.621  ops/ms
MyBenchmark.testStringBuilder  thrpt   10  80369.037 ± 3058.280  ops/ms
```

Score 这列的意思是每毫秒完成了多少次操作，可见 StringBuilder 确实比普通的 String 构造器性能高很多。

### 更多有趣的测试

实际上平时 Java 开发中一些细节对性能有明显的影响，虽然对系统整体来说影响比较小，但是注意这些细节可以低成本的避免性能问题堆积。

其中一个非常有意思细节是自动包装类型的使用，即使是一个简单的 for 循环，如果不小心讲 int 使用成 Integer 也会造成性能浪费。

我们来编写一个简单的基准测试

```
    @Benchmark
    public void primaryDataType() {
        int sum = 0;
        for (int i = 0; i < 10; i++) {
            sum += i;
        }
    }

    @Benchmark
    public void boxDataType() {
        int sum = 0;
        for (Integer i = 0; i < 10; i++) {
            sum += i;
        }
    }
```

运行测试后，得到下面的测试结果

```
AutoBoxBenchmark.boxDataType       thrpt    5   312779.633 ±   26761.457  ops/ms
AutoBoxBenchmark.primaryDataType   thrpt    5  8522641.543 ± 2500518.440  ops/ms
```

基本类型的性能高出了一个数量级。当然你可能会说基本类型这种性能问题比较微小，但是性能往往就是这种从细微处提高的。另外编写 JMH 测试也会让团队看待性能问题更为直观。

### 一份直观的 Java 基础性能报告

下面是我写的常见场景的性能测试，例如 StringBuilder 比 new String() 速度快几个数量级。

| Test                                                         | Mode    | OPS               | Unit  |
| ------------------------------------------------------------ | ------- | ----------------- | ----- |
| "cn.printf.jmhreports.AutoBoxBenchmark.boxDataType"          | "thrpt" | 323693300.862712  | ops/s |
| "cn.printf.jmhreports.AutoBoxBenchmark.primaryDataType"      | "thrpt" | 9421830157.195677 | ops/s |
| "cn.printf.jmhreports.CacheValueBenchmark.test"              | "thrpt" | 204814.611974     | ops/s |
| "cn.printf.jmhreports.CacheValueBenchmark.testStringBuilder" | "thrpt" | 80039810.903665   | ops/s |
| "cn.printf.jmhreports.StringBenchmark.constructStringByAssignment" | "thrpt" | 197815.644537     | ops/s |
| "cn.printf.jmhreports.StringBenchmark.constructStringByConstructor" | "thrpt" | 205494.677150     | ops/s |
| "cn.printf.jmhreports.StringBenchmark.constructStringByStringBuilder" | "thrpt" | 66162972.690813   | ops/s |

代码仓库和持续更新的基准测试可以看下面的仓库。

https://github.com/linksgo2011/jmh-reports

## Apache Benchmark 测试

> 我想用命令行快速简单的压测一下网站该怎么办呢？

Apache Benchmark (简称 ab，不同于产品领域的 A/B 测试) 是 Apache web 服务器自带的性能测试工具，在 windows 或者 linux 上安装了 Apache 服务器就可以在其安装位置的 bin 目录中找到 ab 这个程序。

ab 使用起来非常简单，一般只需要 -n 参数指明发出请求的总数，以及 -c 参数指明测试期间的并发数。

例如对 ThoughtWorks 官网首页发出 100 个请求，模拟并发数为 10：

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

## K6 测试套件

> 我需要编写复杂的测试脚本，并保留压测的脚本、参数、数据，以及版本化该怎么做呢？

k6 是一个压力测试套件，使用 golang 编写。主要特性有：

- 提供了友好的 CLI  工具
- 使用 JavaScript 代码编写测试用例
- 可以根据性能条件设置阈值，表明成功还是失败

k6 没有使用 nodejs 而是 golang 程序，通过包裹了一个 JavaScript 运行时来运行 JavaScript 脚本，因此不能直接使用 npm 包以及 Nodejs 提供的一些 API。

同时，k6 在运行测试时，没有启动浏览器，主要用于测试页面以及 API 加载速度。k6 提供了通过网络请求（HAR）生成测试脚本的方法，实现更简便的测试脚本编写，以及 session 的维护。

### 使用

在 Mac 上比较简单，直接使用 HomeBrew 即可安装：

> brew install k6

其他平台官网也提供了相应的安装方式，比较特别的是提供了 Docker 的方式运行。

直接使用 k6 的命令运行测试，官网提供了一个例子：

> k6 run github.com/loadimpact/k6/samples/http_get.js

也可以编写自己的测试脚本:

```
import http from "k6/http";
import { sleep } from "k6";

export default function() {
  http.get("https://www.thoughtworks.com/");
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


k6 提供的性能指标相对 ab 工具多很多，也可以通过脚本自己计算性能指标。和 ab 工具中表明每秒钟处理完的请求数是 http_reqs，上面的测试默认只有一个用户的一次请求，如果通过参数增加更多请求，可以看到和 ab 工具得到的结果比较接近。

运行压力测试时，需要增加更多的虚拟用户（VU），vus 参数和持续时间的参数:

> k6 run --vus 10 --duration 30s script.js

### 编写测试脚本的一些规则

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
  let res = http.get("https://www.thoughtworks.com/");
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 200
  });
  sleep(1);
};

```

### 报告输出

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

## 总结

实际上用于性能测试的工具还有很多，也有一些专门的工具针对网络质量（iperf） 、数据库（sysbench）、前端页面（PageSpeed）等专门方面进行性能测试。

写本文的初衷是想说评价性能，以及做性能优化的第一步应该是寻找到合适工具做一次基准测试，这样的优化往往才有意义。我在使用 JMH 后不仅在工作中使用它对一些代码片段进行测试以及优化，同时更重要的是，在codereview 中对某些操作关于性能的讨论不再基于经验，而是事实。
