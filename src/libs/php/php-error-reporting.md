---
title: $_POST $_GET $_COOKIE的递归转义
date: 2021-08-11 19:18:36
categories: 
  - PHP 基础
sidebar: auto
permalink: /php/php-error-reporting/
---

网上是这样说的

```
说白了就是PHP页面报错的级别设置，我感觉这个功能很鸡肋，说白了，这玩意儿能报出来的错对于对PHP熟悉的人也不会犯，不熟悉的人你报出来也不知道是啥意思。

想起以前经常改现成代码的时候经常遇到，好好的页面上挂一个“Warning:xxx”挺烦的...看着好象也没什么正经错误，但就是警告你，反正人家也没说当时就要抽你，但是警告你。

解决方案就是加个error_reporting(0);意思是无视警告。

内时候觉得特慎的慌，不敢使，怕万一有致命错误丫不报了咋整...在这里我就告诉各位，真有有致命错误你的程序根本运行不了，真是带BUG的可执行语句丫也报不出来！

所以，到此为止，（0）就够了。

 

有人好矫情，我就把这个函数详细说说，实际上人家分14个等级供你自定义报错的方式，有数字和字符串两种参数的写法，中文说明对应如下：

数字    字符串          说明

1       E_ERROR         致命的运行时错误。 错误无法恢复过来。脚本的执行被暂停 00000000 00000001
2       E_WARNING       非致命的运行时错误。脚本的执行不会停止  00000000
4       E_PARSE         编译时解析错误。解析错误应该只由分析器生成
8       E_NOTICE        运行时间的通知。该脚本发现一些可能是一个错误，但也可能发生在正常运行一个脚本
16      E_CORE_ERROR    在PHP启动时的致命错误。这就好比一个在PHP核心的E_ERROR
32      E_CORE_WARNING  在PHP启动时的非致命的错误。这就好比一个在PHP核心E_WARNING警告
64      E_COMPILE_ERROR  致命的编译时错误。这就像由Zend脚本引擎生成了一个E_ERROR
128     E_COMPILE_WARNING 非致命的编译时错误。这就像由Zend脚本引擎生成了一个E_WARNING警告
256     E_USER_ERROR    致命的用户生成的错误。这就像由使用PHP函数trigger_error（程序员设置E_ERROR）
512     E_USER_WARNING   非致命的用户生成的警告。这就像由使用PHP函数trigger_error（程序员设定的一个E_WARNING警告）
1024    E_USER_NOTICE    用户生成的通知。这就像一个由使用PHP函数trigger_error（程序员一个E_NOTICE集）
2048    E_STRICT        运行时间的通知。

4096    E_RECOVERABLE_ERROR 捕捉致命的错误。这就像一个E_ERROR，但可以通过用户定义的处理捕获（又见set_error_handler（））
8191    E_ALL来        所有的错误和警告，除非横向E_STRICT（E_STRICT将是PHP 6.0中E_ALL来一部分的）
```

其实是根据一个二进制的掩码来计算的具体规则如下

  00000000 00000000

根据燕十八的讲解很容易理解这个东西,把上面的规则计算成2进制出来即可

进一步拓展就可以使用位运算进行计算（位运算在这里发挥作用了啊）

```
按位与    &                        两边全为1  结果是1
按位或    |                         两个有一个是1  结果是1
按位异或   ^                    两边必须一个是0一个是1  结果才是1          
按位取反  ~               0变1   1变0            
```

举个例子即可E_ALL^E_NOTICE的意思就是去除掉notice类型的错误