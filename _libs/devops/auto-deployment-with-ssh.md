---
title: 使用SSH实现自动化部署
toc: true
date: 2021-08-11 19:18:35
categories: 
  - 运维开发
sidebar: auto
permalink: /devops/auto-deployment-with-ssh/
---

## 相关解决方案

在web项目中有时候，需要部署代码上线，因此有一些问题在于怎么自动化部署。通常的做法是使用CI/CD平台配合自定义的脚本来实现。

- 对于PHP可以使用git、SVN直接同步代码，配合Puppet使用
- Java和前端等项目可以使用包管理来发布

## 小型SSH部署代码实现

对于小型团队和自己的项目贴一段用SSH实现的Spring boot部署方案

SCP jar文件到远程服务器

```shell

scp -i "./.circleci/aws.pem" whoisspy-0.0.1-SNAPSHOT.jar ubuntu@ec2-18-217-113-62.us-east-2.compute.amazonaws.com:/home/ubuntu/workspace/whoisspy-0.0.1-SNAPSHOT.jar


```

kill原来的端口，然后启动新的进程

```shell

ssh -i "./.circleci/aws.pem" ubuntu@ec2-18-217-113-62.us-east-2.compute.amazonaws.com 'ls
            cd workspace
            #kill old instance
            output=$( netstat -apn | grep 8086 | grep LISTEN) && read num1 num2 num3 num4 num5  <<<${output//[^0-9]/ } && kill -9 $num5 || pwd

            # todo start new instance
            java -jar whoisspy-0.0.1-SNAPSHOT.jar > /dev/null 2>&1 &

            # test if it has been started
            netstat -apn | grep 8086'


```

清理本地SSH链接

```shell

pid=$( ps aux | grep amazonaws | awk '{print $2}' | sort -n | head -n 1 )
leep 5 && kill ${pid} && echo "ssh command is complete"

```

关于怎么远程执行命令并合理退出，参考了文章：http://blog.csdn.net/fdipzone/article/details/23000201


