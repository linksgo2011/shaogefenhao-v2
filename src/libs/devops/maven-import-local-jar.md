---
title: Maven 将本地 jar 打包到项目
toc: true
date: 2021-08-11 19:18:35
categories: 
  - 运维开发
sidebar: auto
permalink: /devops/maven-import-local-jar/
---

## 使用 install 到本地仓库的方案

使用 mvn install 到本地，如果使用 CI 可以先于 mvn package 执行。

```
mvn install:install-file \
   -Dfile=<path-to-file> \
   -DgroupId=<group-id> \
   -DartifactId=<artifact-id> \
   -Dversion=<version> \
   -Dpackaging=<packaging> \
   -DgeneratePom=true
```

然后按照正常的方式引入依赖即可。

## 其他方案

systemPath 方式导入，但是这种方式，测试和本地运行可以，服务器运行会报找不到 class 的错误。

```
<dependency>
    <groupId>com.sample</groupId>
    <artifactId>sample</artifactId>
    <version>1.0</version>
    <scope>system</scope>
    <systemPath>${project.basedir}/src/main/resources/Name_Your_JAR.jar</systemPath>
</dependency>
```

这种方式需要将jar 包通过 resources 引入,现在使用maven 打包，虽然添加到仓库里了，但是打包后到boot-info lib里是找不到的。

```
<resources>
            <resource>
                <directory>lib</directory>
                <targetPath>BOOT-INF/lib/</targetPath>
                <includes>
                    <include>**/*.jar</include>
                </includes>
            </resource>
        </resources>
```

## 参考资料
- https://blog.csdn.net/guogenfang/article/details/53734826
