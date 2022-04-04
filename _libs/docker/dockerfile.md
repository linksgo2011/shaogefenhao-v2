---
title: Dockerfile 详解
toc: true
from: 《容器云运维实战》
date: 2021-08-11 19:18:35
categories: 
  - docker
sidebar: auto
permalink: /docker/dockerfile/
---

## Dockerfile 编写基础

我们可以通过编写 Dockerfile 构建出 Docker 镜像，Dockerfile 可以看作为一个用于构建镜像的 Linux 命令集。Docker 在构建镜像的过程中，执行这个命令集，安装必要的软件以及一些基本的配置。

一个基本的 Dockerfle

```
FROM docker.io/nginx

COPY ./test.html /usr/share/nginx/htm/index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx","-g","daemon off;"]

```

- FROM 指明基础镜像，COPY 为复制资源文件命令， CMD 为容器启动时的命令。

“Dockerfile” 是 Docker 默认的的文件名，也可使用 -f 参数进行指定其他文件名。

> docker build -t user/image:tag .
> docker build -t user/image:new -f Dockerfile.new

### Dockerfile 编写的注意事项

尽可能自动化，避免 Y/n 提示导致构建失败。

考虑命令的顺序,后面的命令会依赖前面的结果。

如果很长的命令可以使用 \&& 来进行连接,例如

```
RUN echo 'this is a long message' \
&& echo 'hello'
```

如果 Dockerfile 存放的目录还有其他文件，例如 node_modules 等超大型文件集合，Docker 也会发送到 Daemon 去构建，因此可以使用 .dockerignore 来排除文件，加快构建速度。.dockerignore 文件的语法类似于 .gitignore。

另外，一个容器最好只做一件事情，如果将数据库、前端静态页面、后端网站等都放到一个容器中，这样就失去了容器的意义。如果需要编排各种应用，可以使用 docker-compose 进行编排。

## Dockerfile 命令

### 解析器命令

解析器命令是可选的，它影响 Dockerfile 后续的处理方式。解析器命令告诉 Docker 如何处理后续的命令，使用注释的形式，写下 FROM 命令之前，否则会被作为注释处理。

目前只有一个解析命令，escape 

```
# escape=`
FROM ...
COPY testfile.txt c:\\
```

因为在 windows 下转义字符为 \ 因此 c:\\ 会被解析成 c:\

### FROM 

FORM 命令用来表明，使用那个镜像作为基础构建，一般情况下都有基础镜像。FROM 必须是 Dockerfile 的第一句命令。

> FROM <imageName:tag>

可以编写多个 FROM 会以最后一个镜像为准。

### MAINTAINER

指定维护者，方便其他人联系作者，这个命令已经弃用，可以使用 LABEL 命令。

> MAINTAINER NAME <Email>

### RUN 

指定在编译阶段的命令， RUN 会在 shell 环境下执行命令，用于安装软件或者做配置使用。

> RUN echo Hi

RUN 命令会在当前的镜像的顶层执行命令，然后 commit 一个中间镜像，提交的镜像会在下一个 RUN 中使用。 Docker 构建完成后会删除中间镜像。

使用 RUN 的格式为 

> RUN ["程序名","参数1","参数2"]

### ENV

ENV 命令用来执行 docker run 命令时设置的环境变量，这个环境变量可以在后续的命令中使用。

> ENV <Key> <Value>

定义的变量可以通过另种方式在 Dockerfile 中使用

- $variable
- #{variable}

尽量把 ENV 命令写成一个命令，因为每一个命令都是一个镜像层，合并之后的机构会变得更加简单和直观。

> ENV var1=value \
    var2=value2

这些变量可以通过 docker run --env <key> = <value> 在运行更改，也可以使用 docker inspect 查看镜像或者容器中的变量。

### ARG 

ARG 定义的参数用法和 ENV 一样，但是构建结束后会消失。

> ARG test=true

### ADD 

作用和 COPY 类似，可以添加文件到容器中。同时支持从 URL 中下载文件到容器中，不过 ADD 会比 COPY 构建出来的镜像文件更大。

ADD 不能使用当前目录之外的文件，例如不能使用 add ../ 等路径。

### EXPOSE 

用于标明这个镜像的应用会监听某个端口，并且能将这个端口映射到主机的网络界面上。

EXPOSE 只负责处理容器内部的监听端口，如果 Docker 不在 RUN 的时候给容器分配端口映射，则外部无法访问容器 EXPOSE 设置的端口。

### CMD

CMD 提供了容器启动时默认执行命令，例如 java -jar app.jar 启动 Spring boot 项目。CMD 与 ENTRYPOINT 的功能机位相似，区别在于 CMD 只能使用一次，后面的会覆盖前面的。ENTRYPOINT 可以定义多次。

同时 Docker run 也会覆盖 CMD 命令。

```
FROM ubuntu

CMD ["echo","Hi"]
```

构建后运行，会输出 Hi，如果使用如下命令

> docker run 10d628b340ea echo "test"

结果会输出 test，RUN 的时候会覆盖 RUN 的命令。

### ENTRYPOINT 

ENTRYPOINT 相当于固化了 CMD 命令无法被修改，也无法被 RUN 覆盖。

当使用 ENTRYPONT 的时候，CMD 以及 RUN 命令都会作为参数传递给 ENTRYPOINT

```
FROM ubuntu

ENTRYPOINT ["echo"]
```

当我们构建并运行时，需要给一个参数 

> docker run 46e76bb0a870 "result"

### VOLUME

用于指明一个数据卷，Docker 容器最好的是无状态的，数据以及状态由数据卷提供。


```
FROM ubuntu
RUN mkdir /app && echo "Hello" > /app/test.txt
VOLUME ["/Users/nlin/www/deployment-automation/app-examples/docker-test/local","/app"]

CMD ["cat","/app/test.txt"]
```

在运行时候可以使用 -v 参数映射 （推荐这种做法）

> docker run  --rm -v /Users/nlin/www/deployment-automation/app-examples/docker-test/local:/app  521522ce40f6 

## USER

USER 命令用于指定运行容器时，使用的用户，默认为 ROOT

```
USER mysql
```

在运行时候可以使用 -u 动态指定。

## WORKDIR

WORKDIR 用于指定 RUN、CMD 等命令的工作目录，相当于 cd，多个 WORKDIR会产生连续的效果。


```
WORKDIR /a
WORKDIR b
WORKDIR c
```

相当于 cd /a/b/c

### ONBUILD 

ONBUILD 用于在子镜像的 FROM 之前运行，相当于子镜像中的一个钩子。这个命令不会在当前命令中执行。

### LABEL 

给镜像打上标签，尽量写在一起，减少构建过程的时间

```
LABEL label1=xxx label2=xxx
```

### STOPSIGNAL

用于容器停止时的信号

```
STOPSIGNAL SIGKILL 
```

这样写可以在容器停止时，发送一个信号给运行的程序。

### HEALTHCHECK 

定期发送一个 HEALTHCHECK 信号

```
HEALTHCHECK --interval=10s --timeout=3s \
    CMD curl -f http://localhost/ || exit 1
```

这样在容器运行时检查系统是否正常，然后退出。
