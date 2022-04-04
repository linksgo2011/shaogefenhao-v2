---
title: 几种易于管理的写作排版方案
toc: true
date: 2021-08-11 19:18:36
categories: 
  - 写作
sidebar: auto
permalink: /writing/writing-tool/
---

## 背景

很长一段时间，我都在探索写作的排版方案。从大学开始做校报，使用过 Word、WPS、方正飞腾等用于报纸的排版系统。

到现在互联网写作，原来的方式不再适用了，特别是

- 不要和样式捆绑，方便多平台发布
- 易于版本管理，最好是文本格式
- 方便生成 pdf、word、html 等多种格式
  

探索出来对于互联网写作者来说，可以采用 markdown 作为写作格式，Git 或者 SVN 作为版本管理，使用一系列工具生成各种格式发布。

我收集和整理了一些工具，用于不同的写作场景。


## hexo 静态网站生成

如果你是一前端开发者，熟悉 npm 的使用，你可以安装好 npm 后，安装 hexo

> npm install -g hexo-cli

然后运行

```
$ hexo init <folder>
$ cd <folder>
$ npm install

```

就能看到生成的一个项目

```
.
├── _config.yml
├── package.json
├── scaffolds
├── source
|   ├── _drafts
|   └── _posts
└── themes

```

然后在 `source/_posts` 添加文档即可（也可以用命令添加）。文档头部加入一些元数据，例如标题，分类等。

```
---
title: 几种易于管理的写作排版方案
toc: true
---

正文

```

最后使用命令，`hexo generate` 即可生成你想要的静态网站。

> hexo generate

你可以参考官网文档：https://hexo.io  进行配置和使用更多命令。另外需要注意图片的问题，你可以安装一个插件即可。

插件地址：

https://github.com/CodeFalling/hexo-asset-image.git

我用这套东西，搭建了一个自己的知识系统，用了另外一个网友的主题，这里表示感谢：

https://github.com/linksgo2011/wiki

## pandoc

如果你只想简单的将 markdown 文章转成 html、pdf、epub，可以使用一个工具叫做

`pandoc`

使用 Mac 或者 Linux 同学可以通过编写 shell 脚本或者 Makefile 实现，对想写电子书的同学非常方便。

```

html: 
	pandoc -s $(filename).md -t html5 -o index.html \
		--title-prefix $(title) \
		--toc

epub: 
	pandoc -s $(filename).md --normalize --smart -t epub -o $(filename).epub --toc

rtf: 
	pandoc -s $(filename).md -o $(filename).rtf \
		--title-prefix $(title) \
		--normalize \
		--smart

pdf: 
	pandoc -s $(filename).md -o $(filename).pdf \
		--title-prefix $(title) \
		--toc \
		--latex-engine=`which xelatex`
```

## gitbook 

对于没有编程经验，但是也想版本话管理自己的作品，可以使用 https://www.gitbook.com/ 网上非常多的教程可以参考。


## Sphinx 和 LaTeX

对于专业写作者，尤其是需要编写公式的写作者。Sphinx 和 LaTeX 是非常好的一套方案。

- Sphinx 是一套专业的文档管理工具，很多开源软件和出版社使用这套工具
- LaTeX 是一套公式编写工具，通过文本的编写格式，生成图形化的公式

使用 Sphinx 的编写的文档示例参考

http://www.sphinx-doc.org/en/stable/examples.html


## 其他资源

还有一些资源辅助在写作过程中可能需要用到。

### Markdown 专用样式库

- http://markedstyle.com/styles

### 多平台文章发布器

有一些开源的工具，但是做的都不是很好,收费的好用一点

- 简媒 https://www.8qwe5.com


### 图标库

- 一套扁平的图标库资源  https://www.flaticon.com 
- 阿里的图标库 https://www.iconfont.cn/

### 字体

- 推荐使用思源黑体,Google 开源的免费中文简体字体 https://fonts.adobe.com/fonts/source-han-sans-simplified-chinese



### Markdown+Pandoc+Sphinx+Git

参考 Cakephp 文档 https://github.com/cakephp/docs

使用Sphinx的文档列表
http://www.sphinx-doc.org/en/stable/examples.html

### HEXO 静态网站生成
官网：https://hexo.io 
模板根据有定制性，图片问题不好处理

### Markdown+GitBook+Git
Gitbook使用教程：https://segmentfault.com/a/1190000005859901

以后如果需要编辑产品文档优先使用这种方法

### Markdown+Pandoc+Git 
这个方法更加灵活
参考这个项目的 Makefile



## Vuepress



Vuepress 是一个功能比较强大的文档生成系统，同时可以使用 vue 的一些特性，非常适合构建知识系统。

官网：https://www.vuepress.cn/



## docsify 

如果不想构建静态 html 内容，而是直接渲染 markdown 可以使用 docsify，对于一些简单的文档比较实用。



官网：https://docsify.js.org/



## 微信排版

https://mdnice.com/

## 简历排版

https://github.com/mdnice/markdown-resume

### 写书

简单可以使用 markdown 分章节，Spring 和各种框架文档都是通过 adoc 写的，非常容易编排一本书，以及进行章节跳转。
