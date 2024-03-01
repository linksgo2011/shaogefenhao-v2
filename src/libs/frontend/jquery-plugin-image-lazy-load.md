---
title: jQuery 插件图片延迟加载
toc: true
date: 2021-08-11 19:18:35
categories: 
  - 前端工程
sidebar: auto
permalink: /frontend/jquery-plugin-image-lazy-load/
---

```java
(function() {
    if ($('#id').length) {
        var win = $(window);
        var elements = $('#id').find('img');
        var checkShow = function(event) {
                var fold = win.height() + win.scrollTop();
                elements.each(function() {
                    if (fold > $(this).offset().top) {
                        $(this).trigger("appear");
                        elements = elements.not(this);
                    }
                });
                !elements.length && win.unbind("scroll", checkShow);
            };
        elements.each(function() {
            $(this).one("appear", function() {
                $(this).attr("src", $(this).attr("longdesc"));
            });
        });
        win.bind("scroll", checkShow);
        checkShow();
    }
})();
```

