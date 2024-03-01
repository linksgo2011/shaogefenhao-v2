---
title: java 异常
date: 2021-08-11 19:18:36
categories: java 基础
sidebar: auto
permalink: /java/java-exception/
---

#### 什么是异常和错误

异常和错误都会阻止当前方法或作用域继续执行,但是异常最大的特点是可以被handle,
这是异常和错误最大的区别。

异常(exception)的例子:

- 数据库链接失败
- 网络中断

错误(errors)的例子:

- 内存溢出
- CPU超时

异常可以被捕获然后进行处理,比如渲染错误页面。错误会导致程序直接退出或崩溃。

#### Java 中的 Exception

Throwable 类是 Java 语言中所有错误或异常的超类（这就是一切皆可抛的东西）。它有两个子类：Error和Exception。

Error：用于指示合理的应用程序不应该试图捕获的严重问题。这种情况是很大的问题，大到你不能处理了，所以听之任之就行了，你不用管它。比如说VirtualMachineError：当 Java 虚拟机崩溃或用尽了它继续操作所需的资源时，抛出该错误。好吧，就算这个异常的存在了，那么应该何时，如何处理它呢？？交给JVM吧，没有比它更专业的了。

Exception：它指出了合理的应用程序想要捕获的条件。Exception又分为两类：一种是CheckedException，一种是UncheckedException。这两种Exception的区别主要是CheckedException需要用try...catch...显示的捕获，而UncheckedException不需要捕获。通常UncheckedException又叫做RuntimeException。《effective java》指出：对于可恢复的条件使用被检查的异常（CheckedException），对于程序错误（言外之意不可恢复，大错已经酿成）使用运行时异常（RuntimeException）。

常见的RuntimeExcepiton有IllegalArgumentException、IllegalStateException、NullPointerException、IndexOutOfBoundsException

#### 异常的捕获

一个数组越界的例子
``` java

    try {
        System.out.println(ints[4]);
        System.out.println("是否还能执行");// 发生异常以后，后面的代码不能被执行
    } catch (IndexOutOfBoundsException e) {
        System.out.println("数组越界错误");
    }
    System.out.println("异常出现后");

```

**catch 规则: 可以使用多个catch 一旦捕获到的类型同样的或者它的父类就停止捕获。**
根据这个经验我们都需要把特定的一样类放到前面,最后一个catch用一个基本类型来捕获。

比如 IOException 是FileNotFoundException 的父类,如果FileNotFoundException产生但是产生了其他
IOException的异常

``` java
public void readFile() {
    BufferedReader reader = null;
    try {
        try {
            reader = new BufferedReader(new InputStreamReader(
                    new FileInputStream("file")));
            // do some other work

            // close reader
        } finally {
            reader.close();
        }
    } catch (FileNotFoundException e) {
        e.printStackTrace();
    } catch (IOException e) {
        e.printStackTrace();
    }
}

```

#### 异常链

丢出新的异常时避免丢失旧的异常,需要把旧的异常放入新的异常链中

c.initCause(e);

``` java
public class NeverCaught {
    static void f() throws ExceptionB{
        throw new ExceptionB("exception b");
    }

    static void g() throws ExceptionC {
        try {
            f();
        } catch (ExceptionB e) {
            ExceptionC c = new ExceptionC("exception a");
            //异常连
            c.initCause(e);
            throw c;
        }
    }

    public static void main(String[] args) {
            try {
                g();
            } catch (ExceptionC e) {
                e.printStackTrace();
            }
    }

}
/*
exception.ExceptionC
at exception.NeverCaught.g(NeverCaught.java:12)
at exception.NeverCaught.main(NeverCaught.java:21)
Caused by: exception.ExceptionB
at exception.NeverCaught.f(NeverCaught.java:5)
at exception.NeverCaught.g(NeverCaught.java:10)
... 1 more
*/

```

#### 运行时异常和检查异常

检查异常:编译时期比如处理的异常,比如FileNotFoundException,
比如使用try catch捕获。

运行时异常:可以不用处理,最终jvm会处理的异常。比如NullPointerException


#### throw、throws

throws: 当我们遇到检查异常时,如果不想在方法内处理,可以加上throws关键字,然上一级方法调用者
检查,throws会抛出所有检查异常。

throw:在方法内部抛出一个异常。


