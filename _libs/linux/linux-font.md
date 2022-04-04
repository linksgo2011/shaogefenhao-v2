---
title: Linux 下字体安装
toc: true
date: 2021-08-11 19:18:36
categories: 
  - linux
sidebar: auto
permalink: /linux/linux-font/
---

linux 下字体安装可以通过软件包的方式安装，例如 

> yum fonts-wqy-zenhei

另外可以使用 ttf 和 ttc 字体文件安装

安装 fontconfig 管理字体，然后将 ttf 和 ttc 文件拷贝到 /usr/share/fonts 目录下，最后更新字体缓存即可。

## 字体安装相关命令

安装 fontconfig

> yum install -y fontconfig mkfontscale

查看已经安装的字体

> fc-list

查看中文字体

> fc-list :lang=zh

拷贝字体 

> mv simsun.ttf /usr/share/fonts

执行安装字体，并更新缓存 

> mkfontscale && mkfontdir && fc-cache

使用 fc-list :lang=zh 可以验证

如果过程中安装不顺利，可能需要赋权

> chmod a+r simsun.ttc


## 参考资料

- linux安装中文字体 https://jingyan.baidu.com/article/0eb457e5d4a48703f0a90565.html
- docker alpine版本服务中显示中文 https://www.wencst.com/archives/711
