---
title: php采集电影天堂首页电影下载地址
toc: true
date: 2021-08-11 19:18:36
categories: 
  - PHP 基础
sidebar: auto
permalink: /php/php-fetch-movie-script/
---



```java
<?php
// 目标url http://www.dytt8.net/
set_time_limit(0);
define('SCRIPT_ROOT',dirname(__FILE__).'/');

$result_list = array();

$domain = "http://www.dytt8.net";
$html = file_get_contents($domain);
$matchs = array();
preg_match_all("/\<a href=\'(\/html\/gndy.*)\'>.*<\/a\>/",$html,$matchs);
if ($matchs[1]) {
    foreach ($matchs[1] as $key => $one) {
        $sub_url = $domain.$one;
        $result = getUrlByPattern($sub_url);
        $result_list[] = $result;
    }
}

function getUrlByPattern($url)
{
    $html = file_get_contents($url);
    preg_match("/ftp:\/\/[^\<\"]*/",$html,$sub_url);
    return $sub_url;
}
?>
```

