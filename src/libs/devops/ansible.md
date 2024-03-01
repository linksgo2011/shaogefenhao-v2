---
title: Ansible 入门和使用
toc: true
date: 2021-08-11 19:18:35
categories: 
  - 运维开发
sidebar: auto
permalink: /devops/ansible/
---



## 介绍

Ansible 是一款主流的应用部署和远程服务管理的工具，支持 Linux 和 Windows（需要做一些配置）。ansible 基于 Python 开发，需要确认安装 Python。

在 CentOS 上安装

> yum install ansible -y

## 互信配置

Ansible 的原理是通过 Master 远程连接到目标机上，连接的建立需要互信。

有几种方法：

1. 使用提前配置的 Key 完成【推荐】。尤其是使用在容器中使用 Ansible作为控制节点，需要提前配置好 key 才能通信。
2. 在 Windows 中提前启动代理节点

### SSH key 配置和分发

1）生成密匙

使用下面的命令一路回车即可

> ssh-keygen -t rsa 

2）发送密匙到目标服务器上

执行命令后输入密码

>  ssh-copy-id [用户名]@[IP]   

例如:

>  ssh-copy-id root@10.1.85.5

没有报错就说明正常了。

3）配置目标服务器清单

将需要操作的目标服务器清单配置到：/etc/ansible/hosts 每行一个

hosts 文件为目标服务器清单，我们可以通过分组进行管理，也可以创建不同的 host 文件，也不一定要放到 /etc/ansible 目录下。

4） 测试服务器是否能通信

> ansible all -m ping

显示下面的内容就说明成功了：

```
aserver.example.org | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python"
    },
    "changed": false,
    "ping": "pong"
}
```

5） 执行一个远程命令

> ansible all -a "/bin/echo hello"

可以看到在每一个目标服务器上都能执行相同的命令：

```
10.4.8.50 | CHANGED | rc=0 >>
hello
```

6）创建一个编排文件（playbook）

编排文件用于解决部署过程中命令非常多的情况。

```
---
- name: My playbook
  hosts: all
  tasks:
     - name: Leaving a mark
       command: "touch /tmp/ansible_was_here"
```

使用  ansible-playbook 命令代替 ansible 命令处理编排任务。

>  ansible-playbook mytask.yaml

基本的操作过程就到这里了，如果需要应用到项目中，只需要设计自己的配置文件即可。

## 在项目中使用

如果使用 docker 的构建机，我们可以提前生成一对密匙，然后将 public key 放到目标机上。

另外也需要动态配置主机清单，所以也可以将 host 放到项目中。

将参数组织到 ansible-playbook 中即可：

> ansible-playbook  --inventory-file ./deployment/hosts --inventory testing --private-key ./id_rsa ./deployment/playbook.yaml

## 常用命令

直接执行 ad-hoc 命令

> ansible [hosts] comamnd -a "echo xxx";

## 相关资料

- 官网: https://www.ansible.com/get-started
- 工作原理:https://www.ansible.com/how-ansible-works
- 下载和安装:http://docs.ansible.com/ansible/latest/intro_installation.html
- 编写自己的脚本:http://docs.ansible.com/ansible/latest/playbooks.html
- 一些ansible 例子:https://github.com/ansible/ansible-examples

- 使用ansible playbook部署LAMP
https://github.com/ansible/ansible-examples/tree/master/lamp_simple

- w3school 的一个教程 https://www.w3cschool.cn/automate_with_ansible/automate_with_ansible-db6727oq.html

- 我的常用脚本仓库 https://github.com/linksgo2011/deployment-automation

- ansible role 市场 https://galaxy.ansible.com/  

### 检查模式(“Dry Run”)

ansible version 1.1 后提供了一种dryrun环境，使得我们可以测试我们的脚本而不造成任何changes

http://docs.ansible.com/ansible/latest/playbooks_checkmode.html#id1

Example:

```

ansible-playbook foo.yml --check

```

### Ansible test 

http://docs.ansible.com/ansible/latest/dev_guide/testing.html
