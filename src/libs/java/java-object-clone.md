---
title: Java 对象克隆
date: 2021-08-11 19:18:36
categories: java 基础
sidebar: auto
permalink: /java/java-object-clone/
---

Java变量赋值对于简单变量来说没有什么特别的,对于对象来说有几种情况,

- shallow 赋值
- 深拷贝
- 克隆


#### shallow 赋值

这种赋值情况为共享内存空间,多个变量指向同一个地址空间

``` java

Object obj1 = new Object();
Object obj2 = obj1;
```
这里的obj1 和 obj2 共享内存空间, 修改其中一个会导致另外一个对象发生变化。

#### 深拷贝

递归复制对象中所有的成员变量


``` java

Object obj1 = new Object();
obj1.a = 1;

Object obj2 = new Object();
obj2.a = obj1.a;
```

#### 对象克隆

使用对象的clone方法

``` Java

Person p = new Person(23, "zhang");
Person p1 = (Person) p.clone();

System.out.println(p);
System.out.println(p1);
```
