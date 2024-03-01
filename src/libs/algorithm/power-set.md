---
title: 幂集算法
toc: true
date: 2021-08-11 19:18:35
categories: 
  - 算法
sidebar: auto
permalink: /algorithm/power-set/
---



## 问题

香水可以由各种花香味组合，给定花香集合 F，如何列出所有的可以制造的香水？



## 思路



可以使用迭代的思路，每一轮迭代复制上一轮的数据然后一种新的香水即可。



## 算法



### 普通写法

```java

```



### 高级写法

```javascript
const powerset = arr => arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);
```





## 参考资料

