---
title: Spring boot 部署的几种方式
toc: true
from: self
date: 2021-08-11 19:18:36
categories: 
  - Spring
sidebar: auto
permalink: /spring/spring-boot-deploy/
---

## 打包 Spring Boot 应用

推荐使用 Spring Boot 的 jar 包进行部署，自带容器对环境依赖。当然也可以打包成 war 格式，并部署到 Servlet3.0 或者早期的 Servlet2.0 的容器中。

使用 Maven 或者 Gradle 打包 jar 文件,一般在工程中使用 wapper 构建。

可以通过 Initializr 构建一个基本的 SPring Boot 项目练习， https://start.spring.io/ 

## 使用 Maven 构建

在 Maven 的 pom.xml 文件中配置如下插件。

```
	<build>
		<plugins>
            ...
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>
```

在工程目录下的命令行运行 `./mvnw clean package`

> ./mvnw clean package 

构建成功后可以看到下面的信息。

```
[INFO] --- maven-jar-plugin:3.1.2:jar (default-jar) @ spring-boot-boilerplate ---
[INFO] Building jar: /Users/nlin/Downloads/spring-boot-boilerplate/target/spring-boot-boilerplate-0.0.1-SNAPSHOT.jar
[INFO] 
[INFO] --- spring-boot-maven-plugin:2.2.1.RELEASE:repackage (repackage) @ spring-boot-boilerplate ---
[INFO] Replacing main artifact with repackaged archive
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  4.237 s
[INFO] Finished at: 2019-11-17T22:28:04+08:00
[INFO] ------------------------------------------------------------------------

```

### 使用 gradle 构建


在 build.gradle 文件中有如下配置， org.springframework.boot 是用来运行和构建 Spring Boot 应用程序的，io.spring.dependency-management 是用来管理 Spring 项目各个依赖的版本，让其保持一致。

```
plugins {
    id 'org.springframework.boot' version '2.1.3.RELEASE'
    id "io.spring.dependency-management" version "1.0.3.RELEASE"
}

```

运行命令

> ./gradle clean package 


我的项目名称是 spring-boot-boilerplate，因此制品是 spring-boot-boilerplate-0.0.1-SNAPSHOT.jar

## 使用 Linux 命令 nohup 部署

可以通过 `java -jar` 来运行 jar 文件，但是关闭窗口后会挂断应用程序，因此可以使用 `nohup` 来持续运行，需要注意的是使用 `nohup` 需要修改日志文件的流向 log.txt。

但 `nohup` 只是不挂断程序，不是指在后台运行，因此部署 Spring Boot 应用程序，还需要 `&`。`&` 指后台运行。

> nohup java -jar spring-boot-boilerplate-0.0.1-SNAPSHOT.jar > log.txt &

这条需要在部署的服务器上运行，我们可以编写一个简单的 shell 脚本来完成。工作中，更多的是使用 ansible 脚本用于多台服务器批量操作。

先设置 ssh key，确保自己能使用 ssh 无密码能访问到目标服务器。然后通过 scp 拷贝文件到服务器。

>  scp spring-boot-boilerplate-0.0.1-SNAPSHOT.jar root@192.168.1.86:/home/workspace

192.168.1.86 为一台内网服务器地址。

然后通过远程执行 shell 脚本命令启动

>  ssh root@192.168.1.86 'nohup java -jar /home/workspace/spring-boot-boilerplate-0.0.1-SNAPSHOT.jar > log.txt &'

启动之前需要杀死之前运行的 java 程序，否则会端口被占用。根据端口杀死占用的进程

> ssh root@192.168.1.86 'output=$( netstat -apn | grep 8080 | grep LISTEN) && read num1 num2 num3 num4 num5  <<<${output//[^0-9]/ } && kill -9 $num5 || pwd'

## 通过注册服务运行

上面的方法比较简单，但是有一个问题，部署之后如果服务器重启需要再次启动程序。可以将 `java -jar xxx.jar` 这条命令作为服务注册到系统中，也可以方便的提供启动、销毁的方法供系统启动的时候使用。 

可以使用 `systemd` 的一系列方法，同时 ansible 等自动化工具也提供了非常方便的 API。

创建一个 service 文件

> vim spring-boot-boilerplate.service 

然后添加配置。

```

[Unit]
Description=spring-boot-boilerplate java application
After=syslog.target

[Service]
ExecStart=/usr/bin/nohup /usr/bin/java -jar /home/workspace/spring-boot-boilerplate.jar --spring.profiles.active=dev
SuccessExitStatus=143

[Install]
WantedBy=multi-user.target
```

ExecStart 填写 java 应用启动命令，当 `systemctl start` 的时候会调用这个命令。注意依然需要使用 `nohup` 保持后台运行。

配置完成后拷贝 service 文件到系统目录

> mv spring-boot-boilerplate.service /usr/lib/systemd/system/spring-boot-boilerplate.service

然后启动

> systemctl start spring-boot-boilerplate

可以通过 `systemctl status` 查看状态，也能看到启动的日志，如果有错误这个时候能看到异常信息。

> systemctl status spring-boot-boilerplate

另外，不要忘记允许开机启动。

> systemctl enable spring-boot-boilerplate


## 使用 docker 运行

使用 docker 运行 Spring Boot 就非常简单了，编译完成 jar 文件之后，只需要编写一个 Dockerfile

> vim Dockerfile

```
FROM openjdk:8-jdk-slim
VOLUME /tmp
ADD target/spring-boot-boilerplate.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

cd 目录到当前目录下

> docker build -t spring-boot-docker  .

使用 docker 查看构建出来的镜像

> docker images

运行镜像，并将容器内端口（9999）映射到 8080

> docker run -it -p 9999:8080 spring-boot-docker

如果单体机器可以直接使用 `nohup` 运行即可

> nohup docker run -it -p 9999:8080 spring-boot-docker &

如果需要部署集群，可以使用 swarm 和 kubernetes 构建弹性云系统。

## 参考资料

- https://spring.io/guides/gs/spring-boot-docker/
- https://m.jb51.net/article/146105.htm
