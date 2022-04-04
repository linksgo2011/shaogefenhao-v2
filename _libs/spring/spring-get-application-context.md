---
title: 获取 Spring 的 ApplicationContext
toc: true
from: https://www.cnblogs.com/wangcp-2014/p/8126187.html
date: 2021-08-11 19:18:36
categories: 
  - Spring
sidebar: auto
permalink: /spring/spring-get-application-context/
---

## 获取 Spring 的 ApplicationContext

## 通过Spring提供的工具类获取ApplicationContext对象

```
import org.springframework.web.context.support.WebApplicationContextUtils;
ApplicationContext ac1 = WebApplicationContextUtils.getRequiredWebApplicationContext(ServletContext sc);
ApplicationContext ac2 = WebApplicationContextUtils.getWebApplicationContext(ServletContext sc);
ac1.getBean("beanId");
ac2.getBean("beanId");

```

 

说明:这种方式适合于采用Spring框架的B/S系统，通过ServletContext对象获取ApplicationContext对象，然后在通过它获取需要的类实例。

上面两个工具方式的区别是，前者在获取失败时抛出异常，后者返回null。

## 继承自抽象类ApplicationObjectSupport

说明：抽象类ApplicationObjectSupport提供getApplicationContext()方法，可以方便的获取到ApplicationContext。
Spring初始化时，会通过该抽象类的setApplicationContext(ApplicationContext context)方法将ApplicationContext 对象注入。

## 实现接口ApplicationContextAware

说明：实现该接口的setApplicationContext(ApplicationContext context)方法，并保存ApplicationContext 对象。
Spring初始化时，会通过该方法将ApplicationContext对象注入。

虽 然，spring提供了后三种方法可以实现在普通的类中继承或实现相应的类或接口来获取spring 的ApplicationContext对象，但是在使用是一定要注意实现了这些类或接口的普通java类一定要在Spring 的配置文件application-context.xml文件中进行配置。否则获取的ApplicationContext对象将为null。

```
package quartz.util;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class SpringConfigTool implements ApplicationContextAware{//extends ApplicationObjectSupport{

private static ApplicationContext context = null;
private static SpringConfigTool stools = null;
public synchronized static SpringConfigTool init(){
  if(stools == null){
   stools = new SpringConfigTool();
  }
  return stools;
}

public void setApplicationContext(ApplicationContext applicationContext)
throws BeansException {
  context = applicationContext;
}

public synchronized static Object getBean(String beanName) {
  return context.getBean(beanName);
}

}


```

### 通过 class loader 获取

org.springframework.web.context.ContextLoader

Title1 import org.springframework.web.context.ContextLoader; 
import org.springframework.web.context.WebApplicationContext; 

WebApplicationContext wac = ContextLoader.getCurrentWebApplicationContext(); 
  wac.getBean(beanID);

