---
title: Java 基础
toc: true
from: https://www.tutorialspoint.com/java/index.htm
date: 2021-08-11 19:18:36
categories: java 基础
sidebar: auto
permalink: /java/java-basic/
---

## Java 背景

Java是由Sun Microsystems最初开发并于1995年发布的高级编程语言。Java在各种平台上运行，例如Windows，Mac OS和各种UNIX版本。

## 保留字

|          |              |          |            |
| -------- | ------------ | -------- | ---------- |
| abstract | assert       | boolean  | break      |
| byte     | case         | catch    | char       |
| class    | const        | continue | default    |
| do       | double       | else     | enum       |
| extends  | final        | finally  | float      |
| for      | goto         | if       | implements |
| import   | instanceof   | int      | interface  |
| long     | native       | new      | package    |
| private  | protected    | public   | return     |
| short    | static       | strictfp | super      |
| switch   | synchronized | this     | throw      |
| throws   | transient    | try      | void       |
| volatile | while        |          |            |

## 数据类型

Java有两种可用的数据类型

- 原始数据类型共8种
- 引用/对象数据类型

### 原始数据类型

Byte

- 字节数据类型是8位带符号的二进制补码整数
- 最小值是-128（-2 ^ 7）
- 最大值为127（含）（2 ^ 7 -1）
- 默认值为0
- 字节数据类型用于节省大型数组中的空间，主要用于代替整数，因为字节比整数小四倍。
- 示例：字节a = 100，字节b = -50

Short

- 短数据类型是一个16位带符号的二进制补码整数
- 最小值是-32,768（-2 ^ 15）
- 最大值为32,767（含）（2 ^ 15 -1）
- 短数据类型也可以用于将内存保存为字节数据类型。短路比整数小2倍
- 预设值为0。
- 例如：short s = 10000，short r = -20000

Int

- Int数据类型是32位带符号的二进制补码整数。
- 最小值是-2,147,483,648（-2 ^ 31）
- 最大值为2,147,483,647（含）（2 ^ 31 -1）
- 除非担心内存，否则通常将整数用作整数值的默认数据类型。
- 默认值为0
- 例如：int a = 100000，int b = -200000

Long 

- 长数据类型是64位带符号的二进制补码整数
- 最小值是-9,223,372,036,854,775,808（-2 ^ 63）
- 最大值为9,223,372,036,854,775,807（含）（2 ^ 63 -1）
- 当需要比int更大的范围时使用此类型
- 默认值为0L
- 示例：长a = 100000L，长b = -200000L

Float

- 浮点数据类型是单精度32位IEEE 754浮点
- 浮点数主要用于以大数组浮点数保存内存
- 默认值为0.0f
- 浮动数据类型从不用于诸如货币之类的精确值
- 示例：float f1 = 234.5f

Double 

- double数据类型是双精度64位IEEE 754浮点
- 此数据类型通常用作十进制值的默认数据类型，通常是默认选择
- 绝对不能将双精度数据类型用于货币等精确值
- 默认值为0.0d
- 例如：double d1 = 123.4

Bool

- 布尔数据类型表示一位信息
- 只有两个可能的值：true和false
- 此数据类型用于跟踪真/假条件的简单标志
- 默认值为假
- 示例：bool isTrue = true

Char

- char数据类型是单个16位Unicode字符
- 最小值为“ \ u0000”（或0）
- 最大值为“ \ uffff”（或65,535（含））
- Char数据类型用于存储任何字符
- 示例：char letterA ='A'

### 引用数据类型

- 引用变量是使用类的已定义构造函数创建的。它们用于访问对象。这些变量被声明为无法更改的特定类型。
- 类对象和各种类型的数组变量都属于引用数据类型。
- 任何引用变量的默认值为null。
- 引用变量可用于引用声明类型或任何兼容类型的任何对象。

### 数组


定义一个数组

```
dataType[] arrayRefVar;   // 推荐的方式
or
dataType arrayRefVar[];  // 工作，但不推荐
```

创建数组

```
arrayRefVar = new dataType[arraySize];
```

使用已知数据创建数组

```
dataType[] arrayRefVar = {value0, value1, ..., valuek};
```

处理数组的一个例子


```
public class TestArray {

   public static void main(String[] args) {
      double[] myList = {1.9, 2.9, 3.4, 3.5};

      // Print all the array elements
      for (int i = 0; i < myList.length; i++) {
         System.out.println(myList[i] + " ");
      }
     
      // Summing all elements
      double total = 0;
      for (int i = 0; i < myList.length; i++) {
         total += myList[i];
      }
      System.out.println("Total is " + total);
      
      // Finding the largest element
      double max = myList[0];
      for (int i = 1; i < myList.length; i++) {
         if (myList[i] > max) max = myList[i];
      }
      System.out.println("Max is " + max);  
   }
}
```

数组的内存空间分为两部分，一块用于存储引用，一块存储真实的数据。

![数组地址空间](./1-java-basic/java_array.jpg);


## 运算符

| 操作符     | 描述                                   | 范例           |
| ---------- | -------------------------------------- | -------------- |
| +（加法）  | 在运算符的任一侧添加值。               | A + B会得到30  |
| -（减法）  | 从左操作数中减去右操作数。             | A-B会得到-10   |
| *（乘法）  | 将运算符两边的值相乘。                 | A * B会得到200 |
| /（部门）  | 用左手操作数除以右手操作数。           | B / A会得到2   |
| ％（模量） | 将左操作数除以右操作数，然后返回余数。 | B％A得到0      |
| ++（增量） | 将操作数的值增加1。                    | B++得到21      |
| -（减量）  | 将操作数的值减1。                      | B--得到19      |

运算注意长度

```
int a = 2147483647*2 // 得到 -2 因为超长了
long a = 2147483647*2 // 也不行，因为还是 int 

long a = 2147483647*2L // 工作了，转换成long 了
```

整数除法不是四舍五入，而是直接舍去小数

```
double d = 10/4 // 结果是2
double d = 10/4.0 // 正确
double d = 10/(double)4 // 正确

```

小数比较无意义

```
boole same = 2.0 == 1.0+1.0 //false 计算机浮点问题
```

小数计算结果不精确

float f = 0.1F * 0.1F // 结果是 0.00000001

自增（++）理解很简单 

```
b = a++-1

本质是

b = (a++)-1

等效于

a = a + 1
b = a -1
```

原理是 --/++ 的运算优先级很高。a++ 是先做其他操作，在自增;a++ 是先自增再做其他操作。

对象的比较是比较的引用，而非值本身

## 转义表

| 符号   | 含义                        |
| ------ | --------------------------- |
| \n     | 换行（0x0a）                |
| \r     | 回车（0x0d）                |
| \F     | 换页（0x0c）                |
| \b     | 退格键（0x08）              |
| \s     | 空格（0x20）                |
| \t     | 制表符                      |
| \“     | 双引号                      |
| \'     | 单引号                      |
| \\     | 反斜杠                      |
| \DDD   | 八进制字符（ddd）           |
| \uxxxx | 十六进制UNICODE字符（xxxx） |


## Java 各个版本更新特性

- JDK5 foreach 迭代方式、可变参数、枚举、自动拆装箱、泛型、注解
- JDK6 SystemTray 类、 COmpiler API、Command Annotations
- JDK7 switch 支持字符串匹配条件、泛型类型自动推断、try-with-resources 资源关闭、Objects 类、ForkJoinPool 等
- JDK8 接口的默认方法实现和静态方法、Lambda 表达式、函数式接口、方法和构造函数引用、新的日期和时间API、流处理
- JDK9 模块化、简化进程API、JSON API、钱和货币的API
- JDK10 局部变量的类型推断、改进 GC和内存管理、线程本地握手、备用内存设备上的堆分配

## this 与 super

共同点

- 都是关键字，起指代作用
- 在构造方法中必须出现在第一行

this

- 访问本类示例属性和方法
- 先找本类没有再找父类
- 单独使用表示当前对象

super 

- 用于子类直接访问父类的实例属性和方法
- 直接找到父类
- 在子类复写父类方法时，访问父类同名方法

## Java 中参数传递

- 无论是对于基本数据类型，还是引用类型，java 中的参数传递都是值复制的传递过程。对于引用变量，复制指向对象的首地址。

## 什么时候防御编程做参数验证

一般在最外层做数据校验，使用 bean validation 做数据的基本校验，然后在内部使用业务的校验。

## 常见 POJO 缩写的含义

- POJO Plain Ordinary Java Object 
- DO Data Object 
- BO Business Object
- DTO Data Transfer Object
- VO View Object 
- AO Application Object

## 参考资料

- https://www.tutorialspoint.com/java/index.htm
