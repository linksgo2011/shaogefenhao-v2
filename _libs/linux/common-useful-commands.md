---
title: 最实用的Linux命令
date: 2021-08-11 19:18:36
categories: 
  - linux
sidebar: auto
permalink: /linux/common-useful-commands/
---

查看操作系统信息

> head -n 1 /etc/issue


install JDK8 in ubuntu 14.04

Add the webupd8 ppa, and install from that -

> sudo add-apt-repository ppa:webupd8team/java

> sudo apt-get update

> sudo apt-get install oracle-java8-installer

Then

> java -version


should show you using Oracle Java 8. If not, or if you want to use a different version - run update-java-alternatives with something like,

> sudo update-java-alternatives -s java-8-oracle

or

> sudo update-java-alternatives -s java-7-oracle

As appropriate.

Got the error: apt-get-repository Command is Missing

fixed by

> sudo apt-get update

> sudo apt-get install software-properties-common


https://stackoverflow.com/questions/25549492/install-jdk8-in-ubuntu-14-04

打包备份

> tar -zcvf "jiaonuobg_assets_$(date "+%Y%m%d").tar.gz" jiaonuobg/assets

备份nodejs+mysql项目

TBC

Maven wrapper 生成

> mvn -N io.takari:maven:wrapper


根据端口查询Linux PID

> netstat -apn | grap $port

从字符串中提取数字，例如PID

> output=$( netstat -apn | grep 8086 | grep LISTEN) && read num1 num2 num3 num4 num5  <<<${output//[^0-9]/ } 
> echo $num5

让进程在后台执行

> java -jar package.jar &

执行一段Linux命令并给变量赋值

> output=$(netstat -apn | grep 8086 | sed 's/[0-9]*//g')
> echo $output

查看服务器内存用量

> sudo free

查看服务器磁盘用量

> sudo df -h

Git 增加文件执行权限

> git update-index --chmod=+x $script


查看sudo 环境下有哪些可用的权限

> sudo -l


搜索文件相关

当前文件目录下搜索

> grep -RI 'keyword'  .  

