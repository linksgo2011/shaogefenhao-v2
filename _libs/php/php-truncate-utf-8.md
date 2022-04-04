---
title: 截取utf-8字符串原理
toc: true
date: 2021-08-11 19:18:36
categories: 
  - PHP 基础
sidebar: auto
permalink: /php/php-truncate-utf-8/
---

```java
<?php
//分析写在注释中
class StringComponent{
    //大致原理就是一个一个字节去读，如果第一个字符ascll数值大于224连续三个组成一个字，如果大于192就是2个，否则就是一个字母或标点
    public static function cutString($sourceStr, $cutLength = 10, $extStr = '...'){
        $returnStr = ''; $i = 0; $n = 0; //$i用于指针，$n 统计字符长度
        $strLength = strlen($sourceStr);  //获取字符长度，注意这个不是字数的个数
        if ($strLength > $cutLength){　　　//判断参数合法
            while (($n < $cutLength) and ($i <= $strLength)){  //限定循环范围
                $tempStr = substr($sourceStr, $i, 1);　　　　//取出指针下一个字符
                $ascnum = Ord($tempStr);　　　　//取出ascll值
                if ($ascnum >= 224){   //判断值的大小
                    $returnStr = $returnStr . substr($sourceStr, $i, 3);  //弹出取到的汉字到结果中
                    $i = $i+3;　　　　//指针移动三个字符长度
                    $n++;  //字数统计+1
                }elseif ($ascnum >= 192){ 
                    $returnStr=$returnStr.substr($sourceStr,$i,2);   //如上
                    $i=$i+2;
                    $n++;
                }elseif ($ascnum >= 65 && $ascnum <= 90){
                    $returnStr = $returnStr.substr($sourceStr, $i, 1); //如上
                    $i = $i+1;
                    $n++;
                }else{ 
                    $returnStr = $returnStr.substr($sourceStr, $i, 1);  //这里要说下，如果小于65就是标点字符了，算作0.5个字符
                    $i = $i+1;
                    $n = $n+0.5;
                }
            }
            if ($strLength > $i){
                $returnStr = $returnStr.$extStr;  //如果结果字符串小于长度那么，填上后缀标志
            }
            return $returnStr;
        }
        else
            return $sourceStr;   //如果截取长度大于总长，返回原来的字符串
    }
}

?>
```

