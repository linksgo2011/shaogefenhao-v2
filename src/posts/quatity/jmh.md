---
title: Java JMH 微基准测试
date: 2021-08-11 19:18:36
sidebar: auto
category: 
  - 软件质量
head:
  - - meta
    - name: keyword
      content: JMH,微基准测试
description: JMH 是一个用于构建、运行和分析 Java 方法运行性能工具，可以做到 nano/micro/mili/macro 时间粒度。
---

## 背景介绍

当我们在谈论某个 Java 语法特性的性能，或者一段业务代码的性能时，往往是凭经验或者写一个简单的循环来测试其是效果。实际上 JVM 的开发者们，已经有一个非常好的工具来做方法层面的基准测试（相对于 ab 测试和 jmeter）。

JMH 是一个用于构建、运行和分析 Java 方法运行性能工具，可以做到 nano/micro/mili/macro 时间粒度。JMH 不仅可以分析 Java 语言，基于 JVM 的语言都可以使用。

OpenJdk 官方运行 JMH 测试推的方法是使用 Maven 构建一个单独的项目，然后把需要测试的项目作为 Jar 包引入。这样能排除项目代码的干扰，得到比较可靠地测试效果。当然也可以使用 IDE 或者 Gradle 配置到自己项目中，便于和已有项目集成，代价是配置比较麻烦并且结果没那么可靠。

## 使用 Maven 构建基准测试

根据官网的例子，我们可以使用官网的一个模板项目。

> mvn archetype:generate \
          -DinteractiveMode=false \
          -DarchetypeGroupId=org.openjdk.jmh \
          -DarchetypeArtifactId=jmh-java-benchmark-archetype \
          -DgroupId=org.sample \
          -DartifactId=test \
          -Dversion=1.0

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

## 更多有趣的测试

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

基本类型的性能高出了一个数量级。当然你可能会说基本类型这种性能问题比较微笑，但是性能往往就是这种从细微处提高的。另外编写 JMH 测试也会让团队看待性能问题更为直观。


## 一份直观的 Java 基础性能报告

下面是我写的常见场景的性能测试，例如 StringBuilder 比 new String() 速度快几个数量级。

| Test                                                                  | Mode    | OPS               | Unit  |
| --------------------------------------------------------------------- | ------- | ----------------- | ----- |
| "cn.printf.jmhreports.AutoBoxBenchmark.boxDataType"                   | "thrpt" | 323693300.862712  | ops/s |
| "cn.printf.jmhreports.AutoBoxBenchmark.primaryDataType"               | "thrpt" | 9421830157.195677 | ops/s |
| "cn.printf.jmhreports.CacheValueBenchmark.test"                       | "thrpt" | 204814.611974     | ops/s |
| "cn.printf.jmhreports.CacheValueBenchmark.testStringBuilder"          | "thrpt" | 80039810.903665   | ops/s |
| "cn.printf.jmhreports.StringBenchmark.constructStringByAssignment"    | "thrpt" | 197815.644537     | ops/s |
| "cn.printf.jmhreports.StringBenchmark.constructStringByConstructor"   | "thrpt" | 205494.677150     | ops/s |
| "cn.printf.jmhreports.StringBenchmark.constructStringByStringBuilder" | "thrpt" | 66162972.690813   | ops/s |

代码仓库和持续更新的基准测试可以看下面的仓库。

https://github.com/linksgo2011/jmh-reports

## 参考资料

- http://openjdk.java.net/projects/code-tools/jmh/
- https://github.com/melix/jmh-gradle-plugin
