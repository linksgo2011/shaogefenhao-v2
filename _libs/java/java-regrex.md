---
title: Java 正则
date: 2021-08-11 19:18:36
categories: java 基础
sidebar: auto
permalink: /java/java-regrex/
---

## 提取字符串中的字符

提取字符串中的数字

```
public static void main(String[]args) {
    Pattern p = Pattern.compile("\\d+");
    Matcher m = p.matcher("string1234more567string890");
    while(m.find()) {
        System.out.println(m.group());
    }
}
```


## 参考资料

- https://www.testingexcellence.com/extract-numbers-string-java-regular-expressions/
