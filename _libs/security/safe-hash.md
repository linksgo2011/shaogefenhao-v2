---
title: 使用 Bcrypt 代替 md5/sha1
toc: true
from: self
date: 2021-08-11 19:18:36
categories: 
  - 安全
sidebar: auto
permalink: /security/safe-hash/
---

## 背景

如果数据库被“拖库”明文存储的密码就变得不安全。之前的做法是使用 md5 散列的方式，因为 md5 不可逆，无法从密文推出原文。

但是 HASH 算法最大的问题是，会发生撞库，也就是说，有可能出现多个原文得到同一个密码。

下面这个式子是存在的，如果原文是 M1，只需要另外一个同样 HASH 值的密码即可登录。

> MD5(M1) = MD5(M2) = MD5(M3)

一种攻击方法是，攻击者记录了一张巨大的密码库，预先计算了常用密码的 hash 值，这样只需要搜索 hash 值就能寻找到一个合适的密码用于登录。

这就是被彩虹表攻击。

解决彩虹表的问题是加盐，在加密之前，对原文混入其他信息，混入的信息不存放到数据库中。实际寻找到其他原文也无法登录。

第二中攻击方法是王小云教授寻找到的一种新的方法，通过算法快速的找到 M2，这样不依赖彩虹表就可以实施攻击。

> MD5(M1) = MD5(M2)

当被攻击者价值非常大，攻击者获取足够多的撞库原文，还是能分析盐值。

## Bcrypt

Bcrypt 有两个特点

- 每一次 HASH 出来的值不一样
- 计算非常缓慢

因此使用 Bcrypt 进行加密后，攻击者想要使用算出 M2 成本变得不可接受。但代价是应用自身也会性能受到影响，不过登录行为并不是随时在发生，因此能够忍受。对于攻击者来说，需要不断计算，让攻击变得不太可能。

因此推荐使用 Bcrypt 进行密码加密。

## 在 Java 中使用 Bcrypt

如果引入了 Spring Security, BCryptPasswordEncoder 提供了相关的方法。

```
    public String encode(CharSequence rawPassword) {
        String salt;
        if (this.strength > 0) {
            if (this.random != null) {
                salt = BCrypt.gensalt(this.strength, this.random);
            } else {
                salt = BCrypt.gensalt(this.strength);
            }
        } else {
            salt = BCrypt.gensalt();
        }

        return BCrypt.hashpw(rawPassword.toString(), salt);
    }
```

BCryptPasswordEncoder 调用了另外一个类 BCrypt 完成加密操作，实际工作工作中可以直接使用 BCryptPasswordEncoder 类即可。

## 相关资源

- https://blog.csdn.net/nnsword/article/details/78191292
- https://www.cnblogs.com/qianjinyan/p/10636404.html







