---
title: 使用和生成 SSH key 登录 Linux 服务器
toc: true
date: 2021-08-11 19:18:36
categories: 
  - linux
sidebar: auto
permalink: /linux/linux-gen-ssh-key/
---

## 基本原理


基本原理为服务器持有公钥，客户端持有私钥。服务器 authorized_keys 中允许添加多个公钥，则允许多个持有私钥的客户端登陆上来。客户端生成密匙对，然后讲公钥文件注册到 authorized_keys 即可登录。

## 操作方法

在客户端打开控制台，输入命令

> ssh-keygen -t rsa

Enter file in which to save the key (/home/hp/.ssh/id_rsa): 

输入生成 key 的位置

选择默认选项的话，可以在指定的位置得到 id_rsa  id_rsa.pub 两个文件。
，id_rsa 私钥，id_rsa.pub 为公钥，公钥为服务器持有，私钥为客户端登录上来的凭证。

需要把公钥添加到系统的密匙文件中，才能启用公钥。

> cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys 


完成上面的步骤后，即可使用下面的命令登录：

> ssh -i id_rsa username@host

注意

- 如果密匙对是在服务器上生成的，可以吧 id_rsa 文件拷贝到本机 ./ssh/ 下即可登录。
- 如果本机已经存在 id_rsa 文件，为了不影响登录其他服务，可以直接把存在的 id_rsa.pub 拷贝到 authorized_keys 即可登录。


## 参考资料
