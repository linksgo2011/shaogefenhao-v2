---
title: Docker 基础
toc: true
date: 2021-08-11 19:18:35
categories: 
  - docker
sidebar: auto
permalink: /docker/docker-basic/
---

## 常用命令

docker pull 拉取镜像

> docker pull userxy2015/ngnix


docker images 查看所有的本地镜像

> docker images 

docker rmi 删除不必要的镜像

> docker rmi userxy2015/ngnix

docker run 启动容器

> docker run -p 8080:80 -d docker.io/nginx

- -p 参数为设置端口映射
- -d 为后台运行 --daemon 

docker exec 进入容器

> docker exec -it ngnix bash 

docker build 构建容器，在当前目录下加入一个 Dockerfile

```
FROM docker.io/nginx
COPY ./test.html /usr/share/nginx/htm/index.html

```

> docker build -t linksgo2011/frontend .

-t 指的是给容器打一个标签，最后的 . 指出 dockerfile的位置

docker login 登录 docker hub

> docker login 然后输入密码

docker push 推 docker 镜像到仓库，需要提前建一个 linksgo2011/frontend 仓库。https://hub.docker.com/repository

> docker push linksgo2011/frontend:latest

如果之前的镜像已经存在，可以通过 

docker tag 旧标签名 新标签名

> docker frontend linksgo2011/frontend

docker commit 将当前的容器提交为镜像，一般不常用

> docker commit c9e5bb7a524f linksgo2011/frontend

拷贝文件到 docker 容器 

> docker cp [OPTIONS] CONTAINER:SRC_PATH DEST_PATH|-


## docker 的版本说明

docker 仓库的版本约定为 用户/仓库/标签

例如 linksgo2011/fonrtend:01 标签的镜像推送时，会推送到 linksgo2011 下面的 fonrtend 中为 01 标签

如果在构建镜像时候，不指定最后的标签名称，会使用 latest 标签，并且每次会覆盖上一次的镜像。

## 一些和 docker 相关的排错命令

重启 docker daemon

> sudo systemctl restart docker


## docker 清理镜像和容器

> docker container prune

> docker image prune


## 用 ansible 操作 docker 时候需要使用 docker for Python 的插件

在目标机上需要有 docker、Python、以及 python 的docker 插件

```
- name: install certain python modules for docker
  pip:
    name: "{{ item.name }}"
    version: "{{ item.version }}"
    state: present
  with_items:
  - { name: docker, version: 2.0.0 }
  
```

http://www.it1352.com/647250.html



## 清理 docker

列出docker ID

```
docker ps -aq
```

停止所有容器

```
docker stop $(docker ps -aq)
```

docker 内置的docker 镜像清理

```
docker image prune --force --all
```

 删除所有停止的容器

```
docker container prune
```

docker 整体清理

```
docker system prune -a
```


## docker 文档 

https://docs.docker.com/
