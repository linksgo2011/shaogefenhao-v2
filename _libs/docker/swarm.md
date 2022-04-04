---
title: Swarm
toc: true
date: 2021-08-11 19:18:35
categories: 
  - docker
sidebar: auto
permalink: /docker/swarm/
---

Docker 官方容器编排工具。

Docker 编排的几种模式

- Docker for desktop 
- Swarm 官方的编排工具
- K8s 社区最火的编排工具

## Swarm 相关概念

### 节点

安装了 Docker 的一个物理机或者虚拟机，节点分为管理节点和工作节点。

管理节点分为 Leader 和 follower，管理节点最好是奇数。他们之间会自动选举，leader，生产上不建议将管理节点和工作节点放到一台服务器上。



### Stack

Stack 指一个应用需要的一整套容器，例如前端、后端API、BFF等，由多个 service 构成。

### Service

一个 Service 指一个 docker compose运行后的一个服务，可以存在多个容器的副本

### Image 

一个Docker镜像

### network

容器的网络和虚拟机的网络概念上类似，桥接模式、host模式，但是非常重要的一个网络模式是overlay。类似于网络中的 VLAN，可以在不同容器之间建立一个虚拟网络。

### Volumes

容器运行需要的存储空间。

## docker swarm 常见命令

### 查看运行的 service 

> docker service list 
  
### 查看某个日志

> docker service logs [servicename]

## 搭建 swarm 集群实战

在本机练习可以使用 docker-machine 来创建数台虚拟机练习网络。

使用 docker-machine 创建一个虚拟机，最好使用 virtualbox 作为虚拟机管理工具。当然也可以使用 vagrant 作为虚拟机管理工具。

> docker-machine create --driver virtualbox manager1


```
Running pre-create checks...
(manager1) No default Boot2Docker ISO found locally, downloading the latest release...
(manager1) Latest release for github.com/boot2docker/boot2docker is v19.03.5
(manager1) Downloading /Users/nlin/.docker/machine/cache/boot2docker.iso from https://github.com/boot2docker/boot2docker/releases/download/v19.03.5/boot2docker.iso...


(manager1) 0%....10%....20%....30%....40%....50%....60%....70%....80%....90%....100%
Creating machine...
(manager1) Copying /Users/nlin/.docker/machine/cache/boot2docker.iso to /Users/nlin/.docker/machine/machines/manager1/boot2docker.iso...
(manager1) Creating VirtualBox VM...
(manager1) Creating SSH key...
(manager1) Starting the VM...
(manager1) Check network to re-create if needed...
(manager1) Found a new host-only adapter: "vboxnet0"
(manager1) Waiting for an IP...
Waiting for machine to be running, this may take a few minutes...
Detecting operating system of created instance...
Waiting for SSH to be available...
Detecting the provisioner...
Provisioning with boot2docker...
Copying certs to the local machine directory...
Copying certs to the remote machine...
Setting Docker configuration on the remote daemon...
Checking connection to Docker...
Docker is up and running!
To see how to connect your Docker Client to the Docker Engine running on this virtual machine, run: docker-machine env manager1

```

这个阶段耗时比较长，创建成功之后可以使用 docker-machine env 命令查看虚拟机信息，这个过程可能需要翻墙才能成功拉取镜像。

> docker-machine env manager1

```
export DOCKER_TLS_VERIFY="1"
export DOCKER_HOST="tcp://192.168.99.100:2376"
export DOCKER_CERT_PATH="/Users/nlin/.docker/machine/machines/manager1"
export DOCKER_MACHINE_NAME="manager1"
# Run this command to configure your shell: 
# eval $(docker-machine env manager1)
```

使用  docker-machine ls 可以查看运行的虚拟机

> docker-machine ls

```
NAME       ACTIVE   DRIVER       STATE     URL                         SWARM   DOCKER     ERRORS
manager1   -        virtualbox   Running   tcp://192.168.99.100:2376           v19.03.5   

```

再创建一个虚拟机，作为 swarm 的 worker

> docker-machine create --driver virtualbox manager1

现在有两台机器了，在 manager 中初始化集群。

> docker-machine ssh manager1 docker swarm init --listen-addr 192.168.99.100:2337 --advertise-addr 192.168.99.100


会得到一个集群的 token ，使用这个 token 可以进行后续的操作。

```
Swarm initialized: current node (ifzgulv2nsw5r84dw55f8vut0) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-57k8uubh350ppnb68p4jjqmyp6nu4x2ziu8mf2ocmpqsojvc6s-5j94cvq03w9phk6vid7mgsyq4 192.168.99.100:2337

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
```

在真实的机器上，不会使用 docker-machine ssh 命令，初始化集群的命令直接就是：

> docker swarm init --listen-addr 192.168.99.100:2337 --advertise-addr 192.168.99.100

接下来把 worker1 加入集群:

> docker-machine ssh worker1 docker swarm join --token SWMTKN-1-57k8uubh350ppnb68p4jjqmyp6nu4x2ziu8mf2ocmpqsojvc6s-5j94cvq03w9phk6vid7mgsyq4 192.168.99.100:2337

```
This node joined a swarm as a worker.
```

然后两台机器就被添加到集群了。进入其中一个管理节点，可以使用 docker node 命令查看节点信息。

> docker-machine ssh manager1 docker node ls

能看到两台机器已经在集群里面作为 node 存在

```
ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
ifzgulv2nsw5r84dw55f8vut0 *   manager1            Ready               Active              Leader              19.03.5
iwtggbei2por21t4z9q3x9usx     worker1             Ready               Active                                  19.03.5

```

接下来创建更多的虚拟器 manager2、worker1、worker2、worker3


> docker-machine create --driver virtualbox manager2
> docker-machine create --driver virtualbox worker2
> docker-machine create --driver virtualbox worker3

也将他们加入集群，然后就可以部署应用了。

> docker-machine ssh worker2 docker swarm join --token SWMTKN-1-57k8uubh350ppnb68p4jjqmyp6nu4x2ziu8mf2ocmpqsojvc6s-5j94cvq03w9phk6vid7mgsyq4 192.168.99.100:2337
> docker-machine ssh worker3 docker swarm join --token SWMTKN-1-57k8uubh350ppnb68p4jjqmyp6nu4x2ziu8mf2ocmpqsojvc6s-5j94cvq03w9phk6vid7mgsyq4 192.168.99.100:2337

加入 manager 需要先获取 manager 的token，到 leader 的机器上获取 token

> docker-machine ssh manager1 docker swarm jon-token manager

```
To add a manager to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-57k8uubh350ppnb68p4jjqmyp6nu4x2ziu8mf2ocmpqsojvc6s-4tbwy1t6rnlfjn1lnw84v13bq 192.168.99.100:2337

```

将 manager2 加入集群

> docker-machine ssh manager2 docker swarm join --token SWMTKN-1-57k8uubh350ppnb68p4jjqmyp6nu4x2ziu8mf2ocmpqsojvc6s-4tbwy1t6rnlfjn1lnw84v13bq 192.168.99.100:2337

这样我们共有 5 台机器。

```
ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
ifzgulv2nsw5r84dw55f8vut0     manager1            Ready               Active              Leader              19.03.5
ypzwukwsof5ec7r4itkvkzxa3 *   manager2            Ready               Active              Reachable           19.03.5
iwtggbei2por21t4z9q3x9usx     worker1             Ready               Active                                  19.03.5
sdtzfghzoafij246b272ob4wl     worker2             Ready               Active                                  19.03.5
uc27drfjn1anv01yy24y9d5g5     worker3             Ready               Active                                  19.03.5
```

这样一个 swarm 集群就建立好了，然后可以对它进行一些管理。

查看网络：

> docker-machine ssh manager1 docker network ls


## 部署应用到集群

使用 nginx 打一镜像用于部署前端项目，编写如下 docker-compose.yml 文件

```
version: "3.5"
services:
  frontend:
    image: linksgo2011/frontend:latest
    networks:
      - sample-network
    ports:
      - 8000:80
    deploy:
      replicas: 1
      labels:
        app: sample-app
        environment: local

networks:
  sample-network:
    driver: overlay

```

使用 docker-machine 的 scp命令拷贝 compose 文件到一台 manager 中

> docker-machine scp  docker-compose.yml docker@manager1:~/docker-compose.yml

然后在这台 manager 中执行 stack 部署命令

> docker-machine ssh manager1 docker stack deploy -c docker-compose.yml sample-stack

Docker 会自动帮助创建网络，然后部署 sample-stack 到 worker 中。

可以查看部署的服务

> docker-machine ssh manager1 docker service ls

ID                  NAME                    MODE                REPLICAS            IMAGE                         PORTS
ovifr1oldnc7        sample-stack_frontend   replicated          1/1                 linksgo2011/frontend:latest   *:8000->80/tcp

可以查看某个服务的日志，对调试和排错非常有用

> docker-machine ssh manager1 docker service logs  sample-stack_frontend



## docker swarm 一些调试方法

查看 service 无法启动的错误信息
> docker service ps --no-trunc {serviceName}

查看服务的 task
> docker service ps <service-name>

查看 task 的启动情况，可以看到容器、节点情况
> docker inspect <task-id>

找到了容器可以查看日志
> docker logs <container-id>

daemon.json 可以开启 debug 模式。

## TODO 

- 使用 docker-compose 部署应用
- 容器内部的通信
- 使用 Jenkins 自动化搭建 swarm 集群
- 安装 portainer

## 参考资料

- https://blog.xiodi.cn/?s=swarm
- https://docs.docker.com/v17.09/engine/swarm/
