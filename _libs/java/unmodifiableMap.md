---
title: Java unmodifiableMap
date: 2021-08-11 19:18:36
categories: java 基础
sidebar: auto
permalink: /java/unmodifiableMap/
---


集合中提供了一个防止修改的方法

```
public final Map<Foo, Bar> getMap(){
    ...
    return Collections.unmodifiableMap(map);
}

```
