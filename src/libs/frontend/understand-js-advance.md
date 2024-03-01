---
title: 理解js 的作用域链 原型链 闭包 词法分析
toc: true
date: 2021-08-11 19:18:35
categories: 
  - 前端工程
sidebar: auto
permalink: /frontend/understand-js-advance/
---

1、作用域链　　


```
    <script type="text/javascript">
        //作用域链
        b = '没有使用var 声明，因此是一个全局变量。';
        var a = "使用了var声明，声明在最顶级的部分，属于window对象下的，一个变量，我们所有的程序都在window下运行，因此也是一个全局变量";
        function fa(){
            fa_b  = "虽然在fa下面，但是我没有进行使用var 声明，所以我还是一个全局变量;";
            var fa_a = "我使用了var 声明，变量的作用域在方法 fa下面";
            alert('这是 window下面的一个方法');    
            function fa_fa(){
                alert('这是 fa_fa下面的一个方法,只能在fa方法下面调用。');
　　　　　　　　　alert(b);//寻找变量b的步骤为  fa_fa > fa > Window > 全局。    
            }
        }
        /*
            总结:
                1、js里面一切都是对象    
                2、js里面一切对象都是引用
                3、作用域链说白了就是从内到外寻找变量而已;    
        */
    </script>
```


 预编译和词法分析

先来一个典型的例子


```
<script type="text/javascript">
    function fa(age){
        // var age = 10;
        var age;
        function age(){
            alert(age);
        }
        alert(age);
        // var age;
        age= 12;
        alert(age);
    }
    fa('11');
    //结果  10 12
</script>
```

js,执行的内部顺序，

　　1、词法分析或者又称为预编译，就是先对代码进行检查，检查变量的声明，具体赋值操作，在具体运行的时候，

　　　　词法分析分为3个阶段和优先级，优先级低的最先被分析，然后出现优先级高的情况就会被，优先级高的覆盖。

　　　　1、分析参数里面的变量，如果方法中出现了形参，相当于把变量 var 定义了一次，

　　　　2、分析局部变量的定义

　　　　3、分析方法的定义，如果开始被定义了为变量，然后被定义了为方法，会按照方法解释。

　　总结：方法的优先级 》  var声明的变量 》 传过来的参数 ，在JS 中不仅一切都是对象，连方法都是属性，可以给方法赋值一个普通数据。

2、闭包

　　　所谓闭包，就是一个方法里面可以定义局部变量和局部方法，一旦这个方法被调用，方法内部就会形成一个活动域，方法内部的变量互相调用不受影响。


```
    <!-- 闭包 -->
    <script type="text/javascript">
        function fa(){
            function fa_fa(){
                alert(b);
            }();
            var b = "注意这是一个局部变量;";
        }
        /*
            总结：
                1、变量b外部是无法获取到的,方法fa 被调用时，fa_fa被声明，并立即执行（）为立即执行,
                此时，fa中间的所有资源被激活，fa_fa 能访问到变量b,但是由于b 在fa 里面，fa构成了一个闭包;
        */
    </script>
```


3、原型链

```javascript
    <!-- //原型链 -->
    <script type="text/javascript">
        var orgen = new Object({"id":'haha'});
        function Person(age,color){
            var word = 'hello';
            this.age = age;
            this.color = color;
            this.speak = function (){
                _speak();
            }();

            function _speak(){
                alert(age);
            }
            this.prototype = orgen;
        }    

        var me = new Person(1,'red');
        me.money = 12;

        me.prototype.getMoney = function(){
            orgen.money = 12;
            console.log(this);
        }();

        alert(me.prototype.money);
        console.log(me);
        console.log(me.prototype);    

        /*
            说明：
                1、一个对象由一个构造方法实例化而来,但是构造方法是一个Function对象。
                2、一个构造方法需要继承，是根据一个对象来继承的，注意不是构造方法、
                3、prototype 指向的是，原型对象，注意不是原型对象的方法
                4、如果对象本身没有属性，系统会向对象的原型继续寻找，一直循着这个链条寻找，这就是原型链
        */
    </script>
```
