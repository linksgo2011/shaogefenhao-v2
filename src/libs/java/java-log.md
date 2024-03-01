---
title: Java 日志
toc: true
from: https://www.cnblogs.com/zyybb/p/10535735.html
date: 2021-08-11 19:18:36
categories: java 基础
sidebar: auto
permalink: /java/java-log/
---



## 日志级别

log4j 定义了8个级别的log（除去OFF和ALL，可以说分为6个级别），优先级从高到低依次为：OFF、FATAL、ERROR、WARN、INFO、DEBUG、TRACE、 ALL。

- ALL：最低等级的，用于打开所有日志记录。
TRACE： designates finer-grained informational events than the - DEBUG.Since:1.2.12，很低的日志级别，一般不会使用。
- DEBUG： 指出细粒度信息事件对调试应用程序是非常有帮助的，主要用于开发过程中打印一些运行信息。
INFO：  消息在粗粒度级别上突出强调应用程序的运行过程。打印一些你感兴趣的或者重要的信息，这个可以用于生产环境中输出程序运- 行的一些重要信息，但是不能滥用，避免打印  　　　　过多的日志。
- WARN： 表明会出现潜在错误的情形，有些信息不是错误信息，但是也要给程序员的一些提示。
- ERROR： 指出虽然发生错误事件，但仍然不影响系统的继续运行。打印错误和异常信息，如果不想输出太多的日志，可以使用这个级别。
- FATAL： 指出每个严重的错误事件将会导致应用程序的退出。这个级别比较高了。重大错误，这种级别你可以直接停止程序了。
- OFF： 最高等级的，用于关闭所有日志记录。

如果将log level设置在某一个级别上，那么比此级别优先级高的log都能打印出来。例如，如果设置优先级为WARN，那么OFF、FATAL、ERROR、WARN 4个级别的log能正常              输出，而INFO、DEBUG、TRACE、 ALL级别的log则会被忽略。Log4j建议只使用四个级别，优先级从高到低分别是ERROR、WARN、INFO、DEBUG。

从我们实验的结果可以看出，log4j默认的优先级为ERROR或者WARN（实际上是ERROR）。



## Spring boot 日志配置

