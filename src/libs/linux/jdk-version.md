---
title: linux 使用 alternatives 切换Java版本
from: self
date: 2021-08-11 19:18:36
categories: 
  - linux
sidebar: auto
permalink: /linux/jdk-version/
---

lternatives与update-alternatives好像是同一样工具（各个linux发行版使用的不一样）

## 原理

如果 linux 机器上安装了多个 java 版本，需要切换。可以使用 alternatives。

原来是在/usr/bin目录下创建一个符号链接，指向/etc/alternatives/ 下的的文件，而该文件依然是一个符号链接。

```
[root@node1 mec]# ll /usr/bin/java  
lrwxrwxrwx. 1 root root 22 4月  16 16:06 /usr/bin/java -> /etc/alternatives/java  
```


## 切换 java 版本

> alternatives --config java  

```

共有 3 个程序提供“java”。  
  
  选择    命令  
-----------------------------------------------  
   1           /usr/lib/jvm/jre-1.5.0-gcj/bin/java  
*  2           /usr/lib/jvm/jre-1.7.0-openjdk.x86_64/bin/java  
 + 3           /usr/java/default/bin/java  
```

然后选择你想要选择的选项保存就好了


## 添加的新的 java 版本到 alternatives 管理


> alternatives --install /usr/bin/java java /usr/lib/jdk1.8/bin/java 500  

参数说明：

- /usr/bin/java java path 逻辑,会被 alternatives 软连接
- java java 命令
- /usr/lib/jdk1.8/bin/java 新的 java 版本目标地址
- 500 选择的时候的序号

## 参考资料

- https://blog.csdn.net/ccfxue/article/details/53822740
