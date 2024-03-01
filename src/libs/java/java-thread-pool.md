---
title: Java 线程池使用
toc: true
date: 2021-08-11 19:18:36
categories: java 基础
sidebar: auto
permalink: /java/java-thread-pool/
---

在计算密集型的项目中，需要用到多线程来做并发操作，java 多线程最好的方案就是使用线程池。
可以通过使用 Spring 中封装好的线程池类，也可以使用 Java 原生接口。

## 使用 Spring 中ThreadPoolTaskExecutor实现线程池

如果项目中已经存在 Spring 则可以使用一个由Spring 封装好了的线程池单例

声明下面 Bean

```
@Configuration
public class ThreadPoolConfig {
    @Bean("threadPoolTaskExecutor")
    public ThreadPoolTaskExecutor threadPoolTaskExecutor(){
        ThreadPoolTaskExecutor threadPoolTaskExecutor=new ThreadPoolTaskExecutor();
        threadPoolTaskExecutor.setCorePoolSize(4);
        threadPoolTaskExecutor.setKeepAliveSeconds(10);
        threadPoolTaskExecutor.setMaxPoolSize(10);
        threadPoolTaskExecutor.setQueueCapacity(10);
        return threadPoolTaskExecutor;

    }
}
```

创建一个测试的线程类，继承 Thread 或者实现 Runnable 都可

```
public class MyThread extends Thread {

    @Override

    publicvoid run() {

        System.out.println(Thread.currentThread().getName() + "正在执行。。。");

    }

}

```

在需要使用的地方只需要注入 Bean，然后执行任务即可

```
@Autowired
ThreadPoolTaskExecutor threadPoolTaskExecutor;
threadPoolTaskExecutor.execute(new MyThread());

```


## 使用 Java 原生接口

在 Java 中，原生的线程池接口为 ExecutorService。Executors 默认提供了数个实现，其中创建固定的线程个数的线程池比较常用 newFixedThreadPool。


```
ExecutorService executor = Executors.newFixedThreadPool(10);
executor.execute(new MyThread());
executor.shutdown;
```

需要特别注意的是，线程池中的线程不会被自动释放，需要自己手动调用 shutdown 释放。
