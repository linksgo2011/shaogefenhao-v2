---
title: Redis 基础
toc: true
date: 2021-08-11 19:18:36
categories: 
  - Redis
sidebar: auto
permalink: /redis/redis-foundation/
---

官网: https://redis.io/ 
基础教程：http://www.runoob.com/redis/redis-java.html

## 简介

Redis是一个开源的使用ANSI C语言编写、支持网络、可基于内存亦可持久化的日志型、Key-Value数据库，并提供多种语言的API。

## 常用的数据结构

| 类型       | 简介                                                   | 特性                                                                                                                                 | 场景                                                                                                  |
| ---------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| String     | 二进制安全                                             | 可以包含任何数据,比如jpg图片或者序列化的对象,一个键最大能存储512M                                                                    | ---                                                                                                   |
| Hash       | 键值对集合,即编程语言中的Map类型                       | 适合存储对象,并且可以像数据库中update一个属性一样只修改某一项属性值(Memcached中需要取出整个字符串反序列化成对象修改完再序列化存回去) | 存储、读取、修改用户属性                                                                              |
| List       | 链表(双向链表)                                         | 增删快,提供了操作某一段元素的API                                                                                                     | 1,最新消息排行等功能(比如朋友圈的时间线) 2,消息队列                                                   |
| Set        | 哈希表实现,元素不重复                                  | 1、添加、删除,查找的复杂度都是O(1) 2、为集合提供了求交集、并集、差集等操作                                                           | 1、共同好友 2、利用唯一性,统计访问网站的所有独立ip 3、好友推荐时,根据tag求交集,大于某个阈值就可以推荐 |
| Sorted Set | 将Set中的元素增加一个权重参数score,元素按score有序排列 | 数据插入集合时,已经进行天然排序                                                                                                      | 1、排行榜 2、带权重的消息队列                                                                         |

## cli常用操作

### Redis Select 命令

Redis 有多个数据库，默认使用 0 链接，如果需要修改到 faff

### benchmark 性能测试

> redis-benchmark -n 10000  -q

## redis 的事务特性

Redis 事务可以一次执行多个命令， 并且带有以下三个重要的保证：

- 批量操作在发送 EXEC 命令前被放入队列缓存。
- 收到 EXEC 命令后进入事务执行，事务中任意命令执行失败，其余的命令依然被执行。
 -在事务执行过程，其他客户端提交的命令请求不会插入到事务执行命令序列中。
- 一个事务从开始到执行会经历以下三个阶段：
  - 开始事务。
  - 命令入队。
  - 执行事务。

Redis 事务的本质是一组命令批量执行，并不具备原子能力，也就是说中间失败剩下的还是会被执行，用处是保持时间在一起执行。

单个 Redis 命令的执行是原子性的，但 Redis 没有在事务上增加任何维持原子性的机制，所以 Redis 事务的执行并不是原子性的。

事务可以理解为一个打包的批量执行脚本，但批量指令并非原子化的操作，中间某条指令的失败不会导致前面已做指令的回滚，也不会造成后续的指令不做。

## 在 cli 外部批量操作

批量删除 keys

> redis-cli keys "user*" | xargs redis-cli del

进入 cli 模式后删除 db
> flushdb

进入 cli 模式后删除所有
> flushall

## 启动 redis-server 


> redis-server 

后台运行

> redis-server --daemonize yes

后台运行也可以修改配置文件实现。


## redis redistemplate KEY为字符串是多双引号的问题

原因是 redistemplate 使用json进行序列化，需要对 key value 使用不同的序列化策略。

推荐使用如下配置

```
@Configuration
public class RedisConfiguration {

    @Bean
    public GenericJackson2JsonRedisSerializer genericJackson2JsonRedisJsonSerializer() {
        return new GenericJackson2JsonRedisSerializer();
    }

    @Bean
    RedisTemplate<String, Object> redisTemplate(JedisConnectionFactory jedisConnectionFactory) {
        final RedisTemplate<String, Object> restTemplate = new RedisTemplate<>();
        restTemplate.setConnectionFactory(jedisConnectionFactory);
        restTemplate.setKeySerializer(new StringRedisSerializer());
        restTemplate.setValueSerializer(genericJackson2JsonRedisJsonSerializer());
        return restTemplate;
    }
}

```

这里定义了 key 和 value 的序列化策略，如果需要使用更多的数据类型，需要添加适当的序列化策略。
