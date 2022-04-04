---
title: linux yum
date: 2021-08-11 19:18:36
categories: 
  - linux
sidebar: auto
permalink: /linux/linux-yum/
---

## 常见的 yum 使用

1. 添加源

例如 docker ce

> wget https://download.docker.com/linux/centos/docker-ce.repo
> mv docker-ce.repo /ect/yum.repo.d/

   
2. 显示软件的可选版本 

例如显示出 docker 的各个版本

> yum list docker-ce --showduplicates | sort -r


    ```
docker-ce.aarch64            3:19.03.5-3.el7                    docker-ce-stable
docker-ce.aarch64            3:19.03.4-3.el7                    docker-ce-stable
docker-ce.aarch64            3:19.03.3-3.el7                    docker-ce-stable
docker-ce.aarch64            3:19.03.2-3.el7                    docker-ce-stable
docker-ce.aarch64            3:19.03.1-3.el7                    docker-ce-stable
docker-ce.aarch64            3:19.03.0-3.el7                    docker-ce-stable
docker-ce.aarch64            3:18.09.9-3.el7                    docker-ce-stable
docker-ce.aarch64            3:18.09.8-3.el7                    docker-ce-stable
docker-ce.aarch64            3:18.09.7-3.el7                    docker-ce-stable
docker-ce.aarch64            3:18.09.6-3.el7                    docker-ce-stable
docker-ce.aarch64            3:18.09.5-3.el7                    docker-ce-stable
docker-ce.aarch64            3:18.09.4-3.el7                    docker-ce-stable
docker-ce.aarch64            3:18.09.3-3.el7                    docker-ce-stable
docker-ce.aarch64            3:18.09.2-3.el7                    docker-ce-stable
docker-ce.aarch64            3:18.09.1-3.el7                    docker-ce-stable
docker-ce.aarch64            3:18.09.0-3.el7                    docker-ce-stable
docker-ce.aarch64            18.06.3.ce-3.el7                   docker-ce-stable
docker-ce.aarch64            18.06.2.ce-3.el7                   docker-ce-stable
docker-ce.aarch64            18.06.1.ce-3.el7                   docker-ce-stable
docker-ce.aarch64            18.06.0.ce-3.el7.centos            docker-ce-stable
docker-ce.aarch64            18.03.1.ce-1.el7.centos            docker-ce-stable
docker-ce.aarch64            18.03.0.ce-1.el7.centos            docker-ce-stable
    ```

第二列中，冒号到第一个中横线才是版本号，安装指定版本： 

> sudo yum install docker-ce-docker-ce-18.09.1 docker-ce-cli-docker-ce-18.09.1 containerd.io
