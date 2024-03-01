---
title: linux 文件和目录操作
date: 2021-08-11 19:18:36
categories: 
  - linux
sidebar: auto
permalink: /linux/linux-file-and-path/
---

## 几个特殊的相对目录

- . 当前目录
- .. 上一个目录
- ~ 家目录
- ~account 另外一个用户的家目录
- `-` 上一次的目录 
  
## 对目录的几个常见操作

递归创建目录

> mkdir -p 目录名称

递归删除目录

> rm -rf 目录名称

## ls 的几个技巧

排序查看
> ls -S 

查看包含隐藏文件，以及详细信息
> ls -al 

格式化文件大小显示
> ls -h

## cp rm mv 注意事项

复制文件全部属性，包括权限，否则会当做当前用户处理

> cp -a 
  
创建符号链接

> cp -s

创建硬链接
> cp -l 


如果文件中有特殊字符，无法直接删除，可以使用 `./xxx` 的方式删除

> rm ./--xx.txt

## 获取路径的文件名和目录名称

获取文件名 network 
> basename /etc/sysconfig/network

获取目录 /etc/sysconfig
> dirname /etc/sysconfig/network

## 文本文件查看

- cat 从第一行开始显示
- tac 从最后一行开始显示
- nl 输出并显示行号
- more 分页显示文件内容
- less 往前翻页
- head 看前面几行
- tail 看后面几行
- od 使用二进制的方式读取

文本查看时几个比较方便的命令

- 空格：向下翻动一页
- / 向下查找
- ? 向上查找
- n 重复前一个查找
- N 反向上一个查找
- g 前进到数据的第一行
- G 前进到数据的最后一行
- q 离开

