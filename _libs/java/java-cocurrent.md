---
title: Java 并发和多线程
date: 2021-08-11 19:18:36
categories: java 基础
sidebar: auto
permalink: /java/java-cocurrent/
---

## Java 多线程的几种实现方式

### 通过实现 Runnable 接口；

```java

class RunnableDemo implements Runnable {
   private Thread t;
   private String threadName;
   
   RunnableDemo( String name) {
      threadName = name;
      System.out.println("Creating " +  threadName );
   }
   
   public void run() {
      System.out.println("Running " +  threadName );
      try {
         for(int i = 4; i > 0; i--) {
            System.out.println("Thread: " + threadName + ", " + i);
            // 让线程睡眠一会
            Thread.sleep(50);
         }
      }catch (InterruptedException e) {
         System.out.println("Thread " +  threadName + " interrupted.");
      }
      System.out.println("Thread " +  threadName + " exiting.");
   }
   
   public void start () {
      System.out.println("Starting " +  threadName );
      if (t == null) {
         t = new Thread (this, threadName);
         t.start ();
      }
   }
}
 
public class TestThread {
 
   public static void main(String args[]) {
      RunnableDemo R1 = new RunnableDemo( "Thread-1");
      R1.start();
      
      RunnableDemo R2 = new RunnableDemo( "Thread-2");
      R2.start();
   }   
}

```

### 通过继承Thread来创建线程

```java

class ThreadDemo extends Thread {
   private Thread t;
   private String threadName;
   
   ThreadDemo( String name) {
      threadName = name;
      System.out.println("Creating " +  threadName );
   }
   
   public void run() {
      System.out.println("Running " +  threadName );
      try {
         for(int i = 4; i > 0; i--) {
            System.out.println("Thread: " + threadName + ", " + i);
            // 让线程睡眠一会
            Thread.sleep(50);
         }
      }catch (InterruptedException e) {
         System.out.println("Thread " +  threadName + " interrupted.");
      }
      System.out.println("Thread " +  threadName + " exiting.");
   }
   
   public void start () {
      System.out.println("Starting " +  threadName );
      if (t == null) {
         t = new Thread (this, threadName);
         t.start ();
      }
   }
}
 
public class TestThread {
 
   public static void main(String args[]) {
      ThreadDemo T1 = new ThreadDemo( "Thread-1");
      T1.start();
      
      ThreadDemo T2 = new ThreadDemo( "Thread-2");
      T2.start();
   }   
}
```

###  通过 Callable 和 Future 创建线程

```java

public class CallableThreadTest implements Callable<Integer> {
    public static void main(String[] args)  
    {  
        CallableThreadTest ctt = new CallableThreadTest();  
        FutureTask<Integer> ft = new FutureTask<>(ctt);  
        for(int i = 0;i < 100;i++)  
        {  
            System.out.println(Thread.currentThread().getName()+" 的循环变量i的值"+i);  
            if(i==20)  
            {  
                new Thread(ft,"有返回值的线程").start();  
            }  
        }  
        try  
        {  
            System.out.println("子线程的返回值："+ft.get());  
        } catch (InterruptedException e)  
        {  
            e.printStackTrace();  
        } catch (ExecutionException e)  
        {  
            e.printStackTrace();  
        }  
  
    }
    @Override  
    public Integer call() throws Exception  
    {  
        int i = 0;  
        for(;i<100;i++)  
        {  
            System.out.println(Thread.currentThread().getName()+" "+i);  
        }  
        return i;  
    }  
}
```

###  创建线程的三种方式的对比

1. 采用实现 Runnable、Callable 接口的方式创建多线程时，线程类只是实现了 Runnable 接口或 Callable 接口，还可以继承其他类。
2. 使用继承 Thread 类的方式创建多线程时，编写简单，如果需要访问当前线程，则无需使用 Thread.currentThread() 方法，直接使用 this 即可获得当前线程。
3. 推荐使用 Callbale 方式，因为可以得到线程中的返回值和异常

## 线程安全

多线程代码中，变量会存在共享，但是如果操作不是原子性的，会造成一致性的问题。 在保证线程安全中Java提供了一些措施。

### 同步操作和只读操作

1.方法的调用是在栈中完成的，因此方法的调用不会造成线程安全的问题。这也是为什么Spring 中使用Bean管理对象，每一次请求的操作可以视为同步行为，可以避免多线程问题。

2.Java中一些对象是线程安全的，是通过使用了只读操作完成的，例如每一个String都是新的对象，在解决线程安全问题的同时需要注意性能问题。

### volatile

Java语言提供了一种稍弱的同步机制，即volatile变量，用来确保将变量的更新操作通知到其他线程。当把变量声明为volatile类型后，编译器与运行时都会注意到这个变量是共享的，因此不会将该变量上的操作与其他内存操作一起重排序。volatile变量不会被缓存在寄存器或者对其他处理器不可见的地方，因此在读取volatile类型的变量时总会返回最新写入的值。

volatile 并不能解决线程安全问题，但是需要注意，赋值操作不是原子性的，因此需要使用volatile来保证变量的可见性。


### synchronized

synchronized 有两种使用方法同步代码块和同步方法，同步代码块可以传入一个需要锁定的对象，通常是this，而同步方法可以用来修饰方法

```java 


synchronized void f() { /* body */ }

void f() { synchronized(this) { /* body */ } }

```

需要注意的是如果是类当中的静态变量 synchronized 并不会锁住

需要使用类名来锁

```java 

synchronized void f() { /* body */ }

void f() { synchronized(this) { /* body */ } }

```










