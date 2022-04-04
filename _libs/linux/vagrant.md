---
title: Linux 虚拟机管理 Vagrant
toc: true
Recommend: true
date: 2021-08-11 19:18:36
categories: 
  - linux
sidebar: auto
permalink: /linux/vagrant/
---

## 虚拟机管理工具

在 window 上下载安装包安装即可，在 Mac 上使用 brew 安装

安装 VisualBox

> brew install caskroom/cask/virtualbox

安装 Vagrant

> brew install caskroom/cask/vagrant

可以去 http://www.vagrantbox.es/  下载 Vagrant 封装好的镜像，然后直接导入，否则自己下载镜像配置。


## 常用命令

添加虚拟机

可以在 https://app.vagrantup.com/boxes/search 上寻找和下载 virtualbox 文件

> vagrant box add centos7 /Users/nlin/www/env/centos-7.0-x86_64.box

初始化虚拟机，如果未添加虚拟机文件会自动从仓库里下载，第一次初始化会生成一个 Vagrantfile 文件用于管理素所有命令操作后的变化，利于版本管理:

> vagrant init centos7  

vagrant box add 添加时可以给一个不同的名称，用于启动多个虚拟机,这里设置一个 manager 用于 swarm manager:

> vagrant box add manager /Users/nlin/www/env/centos-7.0-x86_64.box
> vagrant init manager

启动虚拟机

> vagrant up

查看当前运行的虚拟机

> vagrant box list

进入虚拟机

> vagrant ssh

更多有用命令

> vagrant -h


一份整理好的 vagrant 文件

```
# -*- mode: ruby -*-
# vi: set ft=ruby :

$setup_jenkins_server = <<SCRIPT
sudo yum -y install ansible
sudo yum -y install git
sudo chown -R ansible /vagrant
SCRIPT

$setup_ansible_user = <<SCRIPT
sudo useradd ansible --groups vagrant
sudo mkdir -p /home/ansible/.ssh/ && sudo cp -rf /home/vagrant/.ssh/authorized_keys /home/ansible/.ssh/authorized_keys
sudo chown -R ansible /home/ansible/.ssh
sudo chmod 600 /home/ansible/.ssh/authorized_keys
SCRIPT

Vagrant.configure(2) do |config|
  config.vm.box = "centos/7"
  config.vm.provider "virtualbox" do |v|
    v.memory = 1024
  end
  config.vm.box_check_update = false

  VAGRANT_COMMAND = ARGV[0]
  if VAGRANT_COMMAND == "ssh"
    config.ssh.username = 'ansible'
  end

  config.vm.define "jenkins-server" do |dev|
    config.vm.synced_folder ".", "/vagrant"
    dev.vm.network "private_network", ip: "10.132.112.10"
    dev.vm.hostname = "jenkins-server"
    dev.vm.provision :shell, inline: $setup_ansible_user
    dev.vm.provision :shell, inline: $setup_jenkins_server
  end

  config.vm.define "jenkins-agent-1" do |dev|
    dev.vm.network "private_network", ip: "10.132.112.11"
    dev.vm.hostname = "jenkins-agent"
    dev.vm.provision :shell, inline: $setup_ansible_user
  end

  config.vm.define "manager1" do |dev|
    config.vm.provider "virtualbox" do |v|
      v.memory = 2048
    end
    dev.vm.network "private_network", ip: "10.132.112.21"
    dev.vm.hostname = "manager1"
    dev.vm.provision :shell, inline: $setup_ansible_user
    # dev.vm.network :forwarded_port, guest: 80, host: 9080
  end

   config.vm.define "manager2" do |dev|
     config.vm.provider "virtualbox" do |v|
       v.memory = 2048
     end
     dev.vm.network "private_network", ip: "10.132.112.22"
     dev.vm.hostname = "manager2"
     dev.vm.provision :shell, inline: $setup_ansible_user
   end

  config.vm.define "worker1" do |dev|
    dev.vm.network "private_network", ip: "10.132.112.23"
    dev.vm.hostname = "worker1"
    dev.vm.provision :shell, inline: $setup_ansible_user
  end

  config.vm.define "worker2" do |dev|
    dev.vm.network "private_network", ip: "10.132.112.24"
    dev.vm.hostname = "worker2"
    dev.vm.provision :shell, inline: $setup_ansible_user
  end
end

```

只需要创建文件 Vagrantfile 并粘贴上面内容，然后运行：

> vagrant up

可以快速的创建一组虚拟机。启动成功后，运行 provision 命令初始化 ansible 以及 docker 等基本工具。

服务器上的 Jenkins 机器需要自己手动安装 ansible 以及 git， 最好配置一个 ansible user，否则修改 hosts 中 ansible_user 使用 root 用户连接。

> yum -y install ansible
> yum -y install git

其他机器全部使用 ansible 来操作。

## 参考资源 

- 官方文档 https://www.vagrantup.com/docs/index.html
- 安装方法 https://blog.csdn.net/yanyan42/article/details/79697659
- 一个快速上手教程 https://www.jianshu.com/p/7e8f61376053
