---
title: Gradle 构建 Spring boot 项目
toc: true
date: 2021-08-11 19:18:35
categories: 
  - 运维开发
sidebar: auto
permalink: /devops/gradle-build-spring-boot/
---

## 背景介绍

Gradle JVM 的富有突破性构建工具，可以通过编程式的编写构建脚本，非 xml 的方式构建项目，适用于相对复杂 Java 项目构建。

特性：

- 对已有的 maven 和 ivy 仓库的全面支持
- 支持传递性依赖管理，而不需要远程仓库或者 pom.xml 或者 ivy 配置文件
- ant 式的任务和构建是 gradle 的第一公民
- 基于 groovy，其 build 脚本使用 groovy dsl 编写

## 安装

Gradle 需要依赖 Java，在 Mac 下可以使用 Homebrew 安装

> brew install gradle 

查看安装情况

> gradle -v 

Linux 下载解压后，添加 bin 目录到 path 路径下即可。

## 常见概念

### project

一个 project 或者 多个 project 是 gradle 的一个构建单位。每个 project 或许是一个 jar 包或者一个 web 应用，它也可以是一个由许多其他项目中产生的 jar 构成的 zip 压缩包。

一般默认 Java 项目以一个 project 构建，有时候也会有多模块（实际上就是多project）构建。project 可以存在父子关系。

###  task

一个具体的构建任务，例如打包、测试、发布到仓库等。大部分情况下我们都是用插件提供的 task，不需要自己编写 task。

### 插件

我们看到的 java 项目中必定有一个插件

> apply plugin: 'java'

Gradle 不一定只是为 Java 使用的，因此大部分情况下我们通过 java 插件提供构建能力。基本上 java 构建的过程比较类似。

- 编译
- 测试
- 打包
- 发布

插件是 Gradle 比较重要而概念，很多有用的 task 都是它提供的。常见的插件有：

- java
- idea
- io.spring.dependency-management
- spring-boot

### 依赖

就是 java 项目需要用到的其他 jar 包。原始的 java 开发我们都是从网上手动下载，然后倒入项目，使用 gradle 可以自动帮我们导入。

### 仓库

Gradle 是在一个被称之为仓库的地方找寻所需的外部依赖。仓库即是一个按 group，name 和 version 规则进行存储的一些文件。Gradle 可以支持不同的仓库存储格式，如 Maven 和 Ivy，并且还提供多种与仓库进行通信的方式，如通过本地文件系统或 HTTP。

默认情况下，Gradle 没有定义任何仓库，你需要在使用外部依赖之前至少定义一个仓库，例如 Maven 中央仓库。

## java 插件基本使用


引入 java 插件我们可以 通过 gradle tasks 查看该插件提供的 tasks。我们创建一个 build.gralde 然后引入  java 插件，再看看有什么任务。

> vim build.gradle 

```
// 这个 build.gradle 只有一行代码
apply plugin: 'java'
```

> gradle tasks

```
Build tasks
-----------
assemble - Assembles the outputs of this project.
build - Assembles and tests this project.
buildDependents - Assembles and tests this project and all projects that depend on it.
buildNeeded - Assembles and tests this project and all projects it depends on.
classes - Assembles main classes.
clean - Deletes the build directory.
jar - Assembles a jar archive containing the main classes.
testClasses - Assembles test classes.

Build Setup tasks
-----------------
init - Initializes a new Gradle build.
wrapper - Generates Gradle wrapper files.

Documentation tasks
-------------------
javadoc - Generates Javadoc API documentation for the main source code.

Help tasks
----------
buildEnvironment - Displays all buildscript dependencies declared in root project 'gradle-practise'.
components - Displays the components produced by root project 'gradle-practise'. [incubating]
dependencies - Displays all dependencies declared in root project 'gradle-practise'.
dependencyInsight - Displays the insight into a specific dependency in root project 'gradle-practise'.
dependentComponents - Displays the dependent components of components in root project 'gradle-practise'. [incubating]
help - Displays a help message.
model - Displays the configuration model of root project 'gradle-practise'. [incubating]
projects - Displays the sub-projects of root project 'gradle-practise'.
properties - Displays the properties of root project 'gradle-practise'.
tasks - Displays the tasks runnable from root project 'gradle-practise'.

Verification tasks
------------------
check - Runs all checks.
test - Runs the unit tests.

```

使用 java 插件，我们需要按照规范设置目录，然后 gradle 会帮我们自动构建,这个目录不需要我们自己创建，按照 IDE 生成即可。

```
project  
    +build  
    +src/main/java  
    +src/main/resources  
    +src/test/java  
    +src/test/resources  
```
Gradle 默认会从 src/main/java 搜寻打包源码，在 src/test/java 下搜寻测试源码。并且 src/main/resources 下的所有文件按都会被打包，所有 src/test/resources 下的文件 都会被添加到类路径用以执行测试。所有文件都输出到 build 下，打包的文件输出到 build/libs 下

比较有用的几个命令

编译、打包、测试

> build

编译，以及运行单元测试
> test 

清理项目
> clean 

## 简单配置 java 项目

配置依赖仓库，也就是依赖寻找的位置，可以使用本地仓库（自动缓存）、mavenCentral、Jcenter、阿里云或者自己搭建的镜像。

```
    repositories {
        mavenLocal()
        maven { url 'http://maven.aliyun.com/nexus/content/groups/public/' }
        maven { url 'http://maven.aliyun.com/nexus/content/repositories/jcenter' }
        mavenCentral()
    }
```

配置依赖

```
dependencies {
    testCompile group: 'junit', name: 'junit', version: '4.+'
}
```

gralde 总依赖除了有很多种类型，目前Gradle版本支持的依赖配置有：implementation、api、compileOnly、runtimeOnly 和 annotationProcessor，已经废弃的配置有：compile、provided、apk、providedCompile。

- implementation 会添加依赖到编译路径，并且会将依赖打包到输出（aar或apk），但是在编译时不会将依赖的实现暴露给其他module，也就是只有在运行时其他module才能访问这个依赖中的实现。
- api 与compile对应，功能完全一样，会添加依赖到编译路径，并且会将依赖打包到输出（aar或apk），与implementation不同，这个依赖可以传递，其他module无论在编译时和运行时都可以访问这个依赖的实现，也就是会泄漏一些不应该不使用的实现。举个例子，A依赖B，B依赖C，如果都是使用api配置的话，A可以直接使用C中的类（编译时和运行时），而如果是使用implementation配置的话，在编译时，A是无法访问C中的类的。
- compileOnly 与provided对应，Gradle把依赖加到编译路径，编译时使用，不会打包到输出（aar或apk）。这可以减少输出的体积，在只在编译时需要，在运行时可选的情况，很有用。
- runtimeOnly 与apk对应，gradle添加依赖只打包到APK，运行时使用，但不会添加到编译路径。这个没有使用过。
- annotationProcessor。编译前处理注解，例如 lombok。

一个最简单的 java 项目可以由这两部分构成即可完成。

## spring boot 插件

在使用 Spring Boot 时，bootrun 这个task就是 Spring boot 插件提供的。

使用这个插件需要先配置 buildScript 告诉 gradle 插件从哪里找，因为 spring boot 并不是 gradle 的核心插件。


```
buildscript {
    ext {
        springBootVersion = '2.1.4.RELEASE'
    }

    repositories {
        gradlePluginPortal()
    }

    dependencies {
    classpath("org.springframework.boot:spring-boot-gradle-plugin:${springBootVersion}" as Object)
    }
}

```

然后添加

```
apply plugin: 'org.springframework.boot'
```

再查看 gradle tasks，就会多了一些 bootRun 等任务。

```

Application tasks
-----------------
bootRun - Runs this project as a Spring Boot application.

Build tasks
-----------
assemble - Assembles the outputs of this project.
bootBuildInfo - Generates a META-INF/build-info.properties file.
bootJar - Assembles an executable jar archive containing the main classes and their dependencies.
build - Assembles and tests this project.
buildDependents - Assembles and tests this project and all projects that depend on it.
buildNeeded - Assembles and tests this project and all projects it depends on.
classes - Assembles main classes.
clean - Deletes the build directory.
generateGitProperties
jar - Assembles a jar archive containing the main classes.
testClasses - Assembles test classes.


```

## dependency-management 插件

上面讲插件的依赖引入后，Spring boot 还提供了另外一个非常高级的插件。

引入

```
apply plugin: 'io.spring.dependency-management'
```

Spring 版本火车中的子项目都可以不在需要指定版本号，版本号由 Spring boot 指定，从而解决 Spring 家族版本不一致的问题。

## wrapper

wapper 是为了解决开发者拿到一个新项目没有本地安装的 gradle，或者版本不一致，导致非常不方便的问题。

配置项目时，需要用到 gradle 然后生成 gradle wrapper 文件（bat 或者 shell脚本）

- gradlew
- gradlew.bat

以及一些配置文件 .gradle

下一个开发者，运行项目时只需要有 java 不需要 gradle 即可使用 ./gradlew 运行即可。

首次生成 wrapper 的命令

> gradle wrapper 

## 对 java 开发者需要注意的几个插件

- java 插件
- spring-boot 插件
- dependency-management 插件

## 一份相对完整 spring boot 配置清单

```
// Gradle 构建本身需要的配置（例如插件仓库）
buildscript {
    // 配置变量
    ext {
        flywayVersion = '3.2.1'
        hibernateVersion = '5.3.7.Final'
    }
    // 插件仓库
    repositories {
        gradlePluginPortal()
    }
    // 应用插件需要的依赖包
    dependencies {
        classpath("org.springframework.boot:spring-boot-gradle-plugin:${springBootVersion}" as Object)
    }
}

// idea 插件，用来生成 idea 工程目录
apply plugin: 'idea'
// java 插件,提供 build、jar 等task
apply plugin: 'java'
// spring boot 插件提供 bootrun 等task，非必须
apply plugin: 'org.springframework.boot'
// dependency-management 插件，为spring 版本火车项目提供一致的版本号
apply plugin: 'io.spring.dependency-management'

// 指定构建输出目录
buildDir = './out'

// 指定包信息
group = 'cn.printf'
version = '1.0.0'

// java 版本
sourceCompatibility = 1.8
targetCompatibility = 1.8

// 编译字符集
tasks.withType(JavaCompile) { options.encoding = 'utf-8' }

// 包依赖仓库
repositories {
    mavenLocal()
    maven { url 'http://maven.aliyun.com/nexus/content/groups/public/' }
    maven { url 'http://maven.aliyun.com/nexus/content/repositories/jcenter' }
    mavenCentral()
}

// 依赖
dependencies {
    // 监控
    compile 'org.springframework.boot:spring-boot-starter-actuator'

    compileOnly "org.projectlombok:lombok"
    testCompileOnly "org.projectlombok:lombok"

    // web 
    compile 'org.springframework.boot:spring-boot-starter-web'

    // Session
    compile 'org.springframework.boot:spring-boot-starter-data-redis'
    compile 'org.springframework.session:spring-session-data-redis'

    // database
    compile 'org.springframework.boot:spring-boot-starter-data-jpa'
    runtimeOnly 'mysql:mysql-connector-java'

    // 数据库迁移
    compile 'org.flywaydb:flyway-core'

    // 对象转换
    compile group: 'org.modelmapper', name: 'modelmapper', version: '1.1.1'

    // 加密库
    compile 'commons-codec:commons-codec:1.13'

    // 测试
    testCompile("org.springframework.boot:spring-boot-starter-test")

    // 开发热启动工具
    runtime('org.springframework.boot:spring-boot-devtools')
}
```

## 相关资料

- 教程 https://www.w3cschool.cn/gradle/6qo51htq.html
- https://docs.gradle.org/current/userguide/command_line_interface.html
- https://www.jianshu.com/p/59fd653a54d2


