---
title: 根据中奖几率百分比抽奖算法
toc: true
date: 2021-08-11 19:18:36
categories: 
  - PHP 基础
sidebar: auto
permalink: /php/random-by-percent/
---


```php


if($media_app['MediaApp']['ratio']){
                    $max_rand_number = 1 / $media_app['MediaApp']['ratio'];
                    $rand_value       = rand( 1, $max_rand_number );
                    $is_become_winner = ( $rand_value == 1 );
                }
```
