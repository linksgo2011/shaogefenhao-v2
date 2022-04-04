---
title: jquery 常用代码
toc: true
date: 2021-08-11 19:18:35
categories: 
  - 前端工程
sidebar: auto
permalink: /frontend/jquery-useful-code/
---

1、下拉菜单的制作方法

```
                $('#nav .nav >li').mouseover(function(){
                    $(this).children('ul').show();
                }).mouseout(function(){
                    $(this).children('ul').hide();
                })
```

2、输入框的文字提示

```
    var tmp;  
    $('.user').focus(function(){
        tmp = $(this).val();
        if($(this).val() == '用户名')
          $(this).val('');
    }).blur(function(){
        if($(this).val() == '')
          $(this).val(tmp);
    })
```

 说明：1、如果不输入还是会显示为提示字符

　　  如果输入了就不会再消失

3、一个技巧，显示当前的菜单状态

```
<script type="text/javascript">
    var key = "home";  //使用<php? echo $key; >
    $("#"+key).addClass('active');
</script>
```

 4、文本框加减,如果使用了html5 的number直接就可以了

```
                $(function(){
                //获得文本框对象
                var t = $("#text_box");
                //数量增加操作
                $("#add").click(function(){        
                    t.val(parseInt(t.val())+1)
                    if (parseInt(t.val())!=1){
                        $('#text_box').attr('disabled',false);
                    }
                })    
                //数量减少操作
                $("#min").click(function(){
                    t.val(parseInt(t.val())-1);
                    if (parseInt(t.val()) <=0){
                        //节点操作
                        t.val(1);
                    }
                })
            })
```

 5、unload请求一次数据

2中方法

　　1、设置ajax为同步

　　2、使用open window会浏览器拦截，

```
        var i = new Image(1,1); 
        i.src='url';
```

上面这种方法很巧妙

智能浮动的jquery 插件

```
        $.fn.smartFloat = function() {
            var position = function(element) {
                var top = element.position().top, pos = element.css("position");
                $(window).scroll(function() {
                    var scrolls = $(this).scrollTop();
                    if (scrolls > top) {
                        if (window.XMLHttpRequest) {
                            element.css({
                                position: "fixed",
                                top: 0
                            });    
                        } else {
                            element.css({
                                top: scrolls
                            });    
                        }
                    }else {
                        element.css({
                            position: "absolute",
                            top: top
                        });    
                    }
                });
            };
            return $(this).each(function() {
                position($(this));                         
            });
        };
        $(".sp-list").smartFloat();
```

 获取radio值的方法

```
var` `ck = $(``"input[name='ck']:checked"``).val()
```

多文件文件上传的插件

官方demo

http://blueimp.github.io/jQuery-File-Upload/

5、自适应内容宽度


```
(function ($) {
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

6、一个相当简单的语音搜索技巧

<input type="text" class="text" name="value_2" id="value_2" x-webkit-speech>

就可以实现语音搜索，当然只是web-kit浏览器 
