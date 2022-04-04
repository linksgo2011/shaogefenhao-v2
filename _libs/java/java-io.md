---
title: Java 各种流总结
date: 2021-08-11 19:18:36
categories: java 基础
sidebar: auto
permalink: /java/java-io/
---

## 字节流

字节流与字符无关，可以处理所有的资源类型。

两个抽象类

- InputStream
- OutputStream

JDK 提供常用的类有

- FileInputStream
- FileOutputSteam

## 字符流

字符流需要考虑编码，只能处理文本文件。字节流变成字符流需要解码，字符流编程字节流需要编码。

两个抽象类

- Reader
- Writer 

可用的类

- FileReader
- FileWriter

## 缓冲流

缓冲流依赖字符流,拥有缓冲区机制，可以提高性能。

- BufferedReader
- BufferedWriter


## 节点流

从字节数组中创建流，使用后无需关闭。当文件不大时，可以直接读取到字节数组。

 - ByteArrayInputSteam
 - ByteArrayOutputSteam


## 处理流

处理流在输出数据时，可以输出数据类型，只能是基本类型和字符串。处理流，用的比较少。

- DataInputSteam 
- DataOuputSteam

## 序列化处理流

用于序列化和序列化，可以将对象类型输出到文件。

- ObjectInputStream
- ObjectOutputStream

使用 Java 自带的序列化机制，被序列化对象需要增加 Seriablizable 接口。
如果不需要序列化的字段使用 transient 标注。

## 打印流

用于控制台打印输出，常见用处是将控制台的输出打印到文件中，日志框架一般通过这种方式，作为日志输出。

- PrintStream

```
System.setOut(new PrintStream(new FileOutputSteam("./test.log")，true)

```

