---
title: Spring 中 @Async注解
date: 2021-08-11 19:18:36
categories: 
  - Spring
sidebar: auto
permalink: /spring/spring-async/
---

1. 注解的方法必须是public方法。
2. 方法一定要从另一个类中调用，也就是从类的外部调用，类的内部调用是无效的。
3. 如果需要从类的内部调用，需要先获取其代理类，下面上代码

```
@Service
public class XxxService{
  public void methodA(){
    ...
    XxxService xxxServiceProxy = SpringUtil.getBean(XxxService.class);
    xxxServiceProxy.methodB();
    ...
  }
 
  @Async
  public void methodB() {
    ...
  }
}
```
