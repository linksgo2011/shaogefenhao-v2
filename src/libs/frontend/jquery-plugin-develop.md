---
title: jQuery 插件开发分析
toc: true
date: 2021-08-11 19:18:35
categories: 
  - 前端工程
sidebar: auto
permalink: /frontend/jquery-plugin-develop/
---



1、使用;开始

2、使用闭包(function($))($);

3、合并参数 $.extend();

4、return this 返回对象本身

5、this是选择器匹配到的对象


```
;(function($){
    $.fn.fun = function(options){
        var options = $.extend({
            //默认配置参数

        },options);

        return this;  //这里的this指的是jquer 对象
    }

    var a1; //局部变量
    function f1(){ //局部方法

    }
})($);
```


上面是一个例子

下面贴上一个例子


```
;(function ($) {
  var loadImg = function (url, fn) {
    var img = new Image();
    img.src = url;
    if (img.complete) {
      fn.call(img);
    } else {
      img.onload = function () {
        fn.call(img);
        img.onload = null;
      };    
    };
  };

  $.fn.imgAutoSize = function (padding) {
    var maxWidth = this.innerWidth() - (padding || 0);
    return this.find('img').each(function (i, img) {
      loadImg(this.src, function () {
        if (this.width > maxWidth) {
          var height = maxWidth / this.width * this.height,
            width = maxWidth;
          img.width = width;
          img.maxHeight = height;
        };
      });
    });
  };
})(jQuery);    
```
