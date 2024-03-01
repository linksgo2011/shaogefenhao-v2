---
title: jQuery 评分插件
toc: true
date: 2021-08-11 19:18:35
categories: 
  - 前端工程
sidebar: auto
permalink: /frontend/jquery-plugin-rate/
---



```javascript
/**    
 *  Simple rate 插件
 *  V1.0
 *  @author ln
 *  html :  <input id="rating" range-max="12" value="10"/>
 *  $('#rating').rate();
 */
;(function($){
    $.fn.rate = function(op){
        var defaults = {
            'range_max':5,
            'bg_path':'img/rate.png',  //未选中图片
            'bg_path_rating':'img/rating.png', //选中的图片
            'star_width':36,
            'star_height':36,
            'call_back':function(){}
        }    
        if(this.length > 0){
            return this.each(function(){
                var opts = $.extend(defaults,op); //配置
                var $rate = $(this);            //input
                var $rate_bar;  //构建的评分条

                if($(this).attr('range-max'))
                    opts.range_max = parseInt($(this).attr('range-max'));

                _build.call(this,opts);
                $rate_bar = $(this).next()
                _init_set.call(this);

                //下面这段代码必须重构
                $(this).next().children().bind('mouseover',function(){
                    _pre_rate.call(this);
                });

                $(this).next().children().bind('mouseout',function(){
                    var rate_value  = $rate.val();
                    rate_value = rate_value>0?rate_value:0;
                    _set_style(rate_value);
                });

                $(this).next().children().bind('click',function(){
                    _pre_rate.call(this);
                    var index = $(this).parent().children().index($(this));
                    _init_set.call(this,index+1);

                    opts.call_back(index+1);
                });

                //初始化页面
                function _build(opts){
                    var ele_mark = '<ul style="list-style:none;'+
                                        'display:block;">';
                    if(opts.range_max){
                        for (var i = opts.range_max - 1; i >= 0; i--) {
                            ele_mark+='<li         style="display:block;'+
                                                'width:'+opts.star_width+'px;'+
                                                'height:'+opts.star_height+'px;'+
                                                'cursor:pointer;'+
                                                'float:left;"'+
                                        '></li>';
                        };
                    }
                    ele_mark+="</ul>";
                    $(this).hide().after(ele_mark);
                }    

                function _init_set(rate_value){
                    if(rate_value){
                        $rate.val(rate_value);
                    }else{
                        rate_value = $rate.val();
                    }
                    _set_style(rate_value);
                }
                function _pre_rate(){
                    var index = $rate_bar.children().index($(this));
                    _set_style(index+1);
                }

                function _set_style(rate_value){
                    $rate_bar.children().css('background','url(\"'+opts.bg_path+'\") no-repeat #fff');
                    $rate_bar.children().slice(0,rate_value).css('background','url(\"'+opts.bg_path_rating+'\") no-repeat #fff');
                }
            });
        }
    }
})(jQuery);
```

