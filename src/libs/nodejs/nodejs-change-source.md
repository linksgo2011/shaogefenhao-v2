---
title: Nodejs 热重启工具
toc: true
date: 2021-08-11 19:18:36
categories: 
  - nodejs
sidebar: auto
permalink: /nodejs/nodejs-change-source/
---

1.通过config命令

```
npm config set registry http://registry.cnpmjs.org npm info underscore （如果上面配置正确这个命令会有字符串response）
```

2.命令行指定

```
npm --registry http://registry.cnpmjs.org info underscore
```

3.编辑 `~/.npmrc` 加入下面内容

```
registry = http://registry.cnpmjs.org
```

搜索镜像: [http://cnpmjs.org](http://cnpmjs.org/)

建立或使用镜像,参考: https://github.com/fenmgk2/cnpmjs.org

