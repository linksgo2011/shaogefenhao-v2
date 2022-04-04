---
title: PHP拓展和使用C编写自定义拓展
toc: true
date: 2021-08-11 19:18:36
categories: 
  - PHP 基础
sidebar: auto
permalink: /php/php-plugin-c/
---

## Background ##

PHP的一个拓展方法就是使用C来编写PHP插件,可以带来极大的性能提升和实现系统层面的拓展。推荐使用C来编写,但是C++特性更为丰富并且有大量的库来支持我们的任务,因此C++也是更好的选择。

## 相关资料 ##

- PHP 源码解读和插件编写基本知识 http://www.php-internals.com/
- C++库用于简化插件编写 https://github.com/rioderelfte/php-cpp-extension
- V8引擎插件 https://github.com/phpv8/v8js
- 基于php-cpp的Qr code插件 https://github.com/Leon2012/phpqrencode
- PHP MVC框架的拓展实现 https://github.com/phalcon/cphalcon
