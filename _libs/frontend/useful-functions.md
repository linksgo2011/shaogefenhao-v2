---
title: 前端开发中常用工具函数总结
toc: true
date: 2021-08-11 19:18:35
categories: 
  - 前端工程
sidebar: auto
permalink: /frontend/useful-functions/
---

1. 时间格式化等方法

推荐使用 moment.js 的库文件

 

3. 模板\循环\MAP等方法使用

 

underscode.js 的方法

4. 表单序列化成JSON 


    $.fn.serializeJson = function() {
        var serializeObj = {};
        var array = this.serializeArray();
        var str = this.serialize();
        $(array).each(function() {
            if (serializeObj[this.name]) {
                if ($.isArray(serializeObj[this.name])) {
                    serializeObj[this.name].push(this.value);
                } else {
                    serializeObj[this.name] = [serializeObj[this.name], this.value];
                }
            } else {
                serializeObj[this.name] = this.value;
            }
        });
        return serializeObj;
    }


5. 字符串截取使用……填补
   
    ```
    String.prototype.strcut = function(number) {
        var length = this.length;
        var tmp = this.substr(0, number);
        if (this.length > number) {
            tmp += "…";
        }
        return tmp;
    ```
    
    
    
    
    
6. 时间格式为，xxxx 天，xxx分钟前，日期
   
    ```
    Date.prototype.Format = function(fmt, current) {

        if (current) {
            var diff = current - this.getTime();
            if (diff < 5 * 60 * 1000) {
                return "刚刚";
            }
            if (diff < 60 * 60 * 1000) {
                return (Math.floor(diff / (60 * 1000))) + "分钟前";
            }
            if (diff < 24 * 60 * 60 * 1000) {
                return (Math.floor(diff / (60 * 60 * 1000))) + "小时前";
            }
        
            if (diff < 30 * 24 * 60 * 60 * 1000) {
                return (Math.floor(diff / (24 * 60 * 60 * 1000))) + "天前";
            }
        
            if (diff < 12 * 30 * 24 * 60 * 60 * 1000) {
                return (Math.floor(diff / (30 * 24 * 60 * 60 * 1000))) + "月前";
            }
        
            if (diff > 12 * 30 * 24 * 60 * 60 * 1000) {
                return (Math.floor(diff / (12 * 30 * 24 * 60 * 60 * 1000))) + "年前";
            }
        }
        
        var o = {
            "Y+": this.getFullYear(), //月份 
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    
    ```

7. 解析URL
```
  function parseUrl() {
           var arr = location.search.split('?')[1].split('&');
           var params = {};
           for (var i = 0, l = arr.length; i < l; i++) {
               var param = arr[i].split('=');
               params[param[0]] = param[1];
           }
           return params;
```

8. 获取get参数
```
  function getParameterByName(name) {
           name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
           var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
               results = regex.exec(location.search);
           return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
```



9. 函数节流，让频繁事件触发更稀疏提高性能，例如及时搜索功能。使用方法为fn 为事件响应函数，delay 为间隔时间,调用 throttle(fn,delay) 返回一个新的函数给事件即可

```
        function throttle(fn, delay) {
            var timer = null;
            return function() {
                var context = this,
                    args = arguments;
                clearTimeout(timer);
                timer = setTimeout(function() {
                    fn.apply(context, args);
                }, delay);
            };
        
```


10. 防止表单多次提交，和9中一样，返回一个新的函数
        /**
         * 防止多次点击函数
         *
         * fn 完成时调用回调
         *  function fn(event,end) {
         *       (typeof end === "function") && end(); // 操作完成
         *  }
         */function noRepeateTap(fn) {
            var $obj;
            return function(event) {
                $obj = $(this);
                if ($obj.data("loadding") === "true") {
                    return;
                }
                $obj.data("loadding", "true").addClass('loadding');
                fn.call(this, event, function end() {
                    $obj.data("loadding", "").removeClass('loadding');
                    return;
                });
            }
        


第10个的使用例子


```
// 绑定事件
$(container).on('click', '.btn-cancel', noRepeateTap(cancel));


    // 事件响应函数
    function cancel(event, end) {
        event.preventDefault();
             // 模拟异步请求
              setTimeout(function(){
            end(); // 需要手动调用注入的完成函数，通知完成,函数自动添加loadding class 类，用于调整样式，完成后自动移除
        },5000)
```
