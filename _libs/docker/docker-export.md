---
title: docker 容器导入导出
toc: true
date: 2021-08-11 19:18:35
categories: 
  - docker
sidebar: auto
permalink: /docker/docker-export/
---


涉及的命令有export、import、save、load

## 区别

export命令是从容器（container）中导出tar文件，而save命令则是从镜像（images）中导出。

export命令导出的tar文件略小于save命令导出的。

export导出的文件再import回去时，无法保留镜像所有历史（即每一层layer信息，不熟悉的可以去看Dockerfile），不能进行回滚操作；而save是依据镜像来的，所以导入时可以完整保留下每一层layer信息。如下图所示，nginx:latest是save导出load导入的，nginx:imp是export导出import导入的。

- 若是只想备份images，使用save、load即可
- 若是在启动容器后，容器内容有变化，需要备份，则使用export、import
- 需要注意这两对命令不能交错使用，否则无法启动容器
  
## save load

导出

> docker save [options] images [images...]

例如 

> docker save -o nginx.tar nginx:latest

导入 

> docker load [options]

例如

> docker load -i nginx.tar

## export  import

导出

> docker export [options] container

其中-o表示输出到文件，nginx-test.tar为目标文件，nginx-test是源容器名（name）

例如

> docker export -o nginx-test.tar nginx-test


导入

> docker import [options] file|URL|- [REPOSITORY[:TAG]]


 例如

> docker import nginx-test.tar nginx:imp



## 参考资料

- https://blog.csdn.net/ncdx111/article/details/79878098
