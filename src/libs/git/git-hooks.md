---
title: 使用git钩子对提交代码进行检查
toc: true
Recommend: true
date: 2021-08-11 19:18:35
categories: 
  - git
sidebar: auto
permalink: /git/git-hooks/
---

## 简介

git hooks 是一些自定义的 shell 脚本，用于 git 提交某个生命周期中执行，用于控制 git 工作的流程，分为客户端钩子和服务。

客户端钩子：

- pre-commit

- prepare-commit-msg

- commit-msg

- post-commit

服务器端钩子：

- pre-receive

- post-receive

- update

一般我们会通过配置`pre-commit` 到项目中，约束团队成员提交代码时候进行一些检查，例如：

- 运行单元测试
- 运行代码检查，例如 checkstyle、eslint 等
- 提交的 commit 信息检查

如果有 git 服务器配置权限，也可以通过配置 `pre-receive` 在服务器端运行检查。

## pre-commit

pre-commit 是一个比较常用的钩子，可以用于提交代码前执行。例如运行构建、测试或者质量检查等。

**Java Gradle 的一个 pre-commit 脚本**

```shell
#!/bin/sh
# From gist at https://gist.github.com/chadmaughan/5889802
set -x

# run the tests with the gradle wrapper
./gradlew clean build

# store the last exit code in a variable
RESULT=$?

# return the './gradlew build' exit code
exit $RESULTs
```

在项目的根目录中添加 `pre-commit` 文件，通过配置 `gradle` 脚本在项目初始话时安装该 `hook`

```groovy
task installGitHooks(type: Copy) {
    from new File(rootProject.rootDir, 'pre-commit')
    into {
        new File(rootProject.rootDir, '.git/hooks')
    }
    fileMode 0755
}

build.dependsOn installGitHooks
```

**前端的一个 pre-commit 脚本**

```shell
#!/bin/sh
STAGE_FILES=$(git diff --cached --name-only --diff-filter=ACM -- '*.vue' '*.js')
set -x

PASS=true
for FILE in $STAGE_FILES
do
    ./node_modules/.bin/eslint $FILE
    if [[ "$?" == 1 ]]; then
        PASS=false
    fi
done

if ! $PASS; then
  echo "lint running failed！"
  exit 1
```

同样的，将该 `pre-commit` 放到项目根目录中，通过 `npm postinstall` 钩子安装。

```json
"scripts": {
  "postinstall": "cp pre-commit .git/hooks"
},
```

## pre-receive

服务器上的 `hooks` 目录为 `.git/custom_hooks` 需要，注意是否授予当前服务具有可执行权限。

下面就是一个检查 `git commit` 信息的脚本：

```sh
#!/bin/bash

set -eo pipefail

refname="$0"
oldrev="$1"
newrev="$2"

echo "Enforcing Policies..."

# Iterate over all the commits
for commit in $(git rev-list 538c33..d14fc7); do
  git cat-file commit "${commit}" | sed '1,/^$/d' | your-validator
done 
```

## 参考资料

- 官方文档 https://git-scm.com/book/zh/v2

- https://stackoverflow.com/questions/39419360/git-pre-receive-hook-to-check-commit-message

