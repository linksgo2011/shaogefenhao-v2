---
title: html 常用代码块
toc: true
date: 2021-08-11 19:18:35
categories: 
  - 前端工程
sidebar: auto
permalink: /frontend/html-sections-collections/
---



```
html申明
对ie6-8在html中添加no-css3这个class和各个版本的class，对ie7以下添加lte7这个class，然后根据我们目前使用浏览器的比例，把第一的ie6放在判断第一位。

<!DOCTYPE HTML>
<!--[if IE 6]><html class="ie6 lte9 lte7 no-css3" lang="zh-cn"><![endif]-->
<!--[if IE 8]><html class="ie8 lte9 no-css3" lang="zh-cn"><![endif]-->
<!--[if IE 9]><html class="ie9 lte9 no-css3" lang="zh-cn"><![endif]-->
<!--[if IE 7]><html class="ie7 lte9 lte7 no-css3" lang="zh-cn"><![endif]-->
<!--[if !(IE 6) | !(IE 7) | !(IE 8) | !(IE 9)  ]><!--><html lang="zh-cn"><!--<![endif]-->
<head>
<meta charset="UTF-8">
<title>无标题文档</title>
</head>

<body>

</body>
</html>
```



```
判断浏览器，添加所需文件
//为ie6-8添加一个ie.css文件
<!--[if lte IE 8]><link href="css/ie.css" type="text/css" rel="stylesheet" media="all"><![endif]-->
//为ie6添加处理png的js文件
<!--[if IE 6]>
      <script type="text/javascript" src="js/DD_belatedPNG_0.0.8a-min.js?_v=<%=JS_VERSION%>"></script>
      <script type="text/javascript">
          //给所有需要处理的png图片加上dd-pngifx这个class，就可以处理了
          DD_belatedPNG.fix(".dd-pngfix");
      </script>
<![endif]-->
```



```
常规布局
这个布局的特点是border，margin，padding由里面的inner部分来完成，所以左中右三个加起来就是总的宽度，而不用考虑左中右的margin，border，padding之类的，当然之所有选择这个布局，还有其他的一些变化，详细请参看布局。这里列出左右边栏布局的代码以供参考。

<div class="page asides-two">
    <div class="wrap-header">
        <div id="header">
            <div class="inner clearfix"></div>
        </div>
    </div><!--wrap-header-->
    <div class="wrap-container">
        <div id="container" class="clearfix">
            <div id="aside_left" class="aside">
                <div class="inner"></div>
            </div><!--aside_left-->

            <div id="main">
                <div class="inner clearfix"></div>
            </div><!--main-->

            <div id="aside_right" class="aside">
                <div class="inner"></div>
            </div><!--aside_right-->
        </div>
    </div><!--wrap-container-->
    <div class="wrap-footer">
        <div id="footer">
            <div class="inner clearfix"></div>
        </div>
    </div><!--wrap-footer-->
</div>
```



```
边栏区块
边栏一般加有aside-block这个class，然后每个区块有一个属于自己的id，以方便协作查阅及日后修改。内容由block-content这个class包括起来，如果标题右侧有更多等信息，使用head-title结构。当然如果边栏区块足够简单如就一张图片，那就根本就不需要这个结构了。

<div id="" class="aside-block">
  <h2></h2>
  <div class="block-content"></div>
</div>

<!-- 标题右侧有更多等文字信息 -->
<div id="" class="aside-block">
  <div class="head-title clearfix">
    <h2></h2>
    <a href="#" class="more"></a>
  </div>
  <div class="block-content"></div>
</div>
```



```
关于H1
在首页的时候，网站的h1标题为站点名字，当网站在内页的时候，内页标题为h1。所以对站点名字输出进行判断，以jsp为例：

<% if(isFront) { %>
  <h1 class="ele-invisible">天涯游戏</h1>
<% }else { %>
  <strong class="ele-invisible">天涯游戏</strong>
<% } %>
当然大多数时候其实我们一般是显示logo，而网站名称我们也许是需要隐藏的，那样我们添加了个ele-invisible的class，这个class的样式为：

/*ele-invisible  */
.ele-invisible{
    position: absolute;
    clip:rect(1px 1px 1px 1px);/* ie6,7*/
    clip: rect(1px, 1px, 1px, 1px);
}
```

