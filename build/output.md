---
title: 系统设计 | 业务编号生成
date: 2023-04-25 21:43:50
sidebar: auto
category: 
  - 软件架构
head:
  - - meta
    - name: keyword
      content: 业务编号生成,系统设计
      description: 描述
---

为了在系统设计上做的更客观，避免闭门造车，这里有一个小型的线上 Webinar。

我们每周会围绕一个架构或者系统设计问题进行讨论，分享各自公司的实践和做法。

目前已经进行了二十多次，最近逐步整理相关材料到文章中。

如果感兴趣或者在工作中遇到领域建模、系统设计相关的话题可以参与。

会议邀请、笔记和往期录屏如下：

http://shaogefenhao.com/libs/webinar-notes/

<hr />

本文为其中一次讨论后整理，部分信息来自会议参与者。

## 问题

假设，业务上需要生成订单编号，其要求为：

1. 不能太长，固定 10 位。
2. 生成规则为："订单类型字母缩写" + "年月日" + 步长为 1 的递增序列。
3. 单号每天重新开始。

性能要求一般，日均单量一万左右，订单均匀分布，并发不高。

经过分析，考虑如下特点：

1. 不能使用 UUID，因为过长且有顺序问题。
2. 不能直接使用数据库的自增 ID 主键，可以考虑通过自增主键进行复合处理。
3. 并发量不高，无需考虑分布式生成，可以集中生成。
4. 业务上是否需要做到严格连续？如果不需要严格连续，可以提高生成性能。

## 方案分析

在方案阶段，我们通过头脑风暴枚举出所有可行的方案和考虑点（这是一条做方案的经验，可能有些方案看起来有些愚蠢，但是往往后面真的有用）。

1. 直接使用时间戳，如果被占用就重试一次。虽然脑洞有点大，但是确实可行。不过在这个场景中有长度限制，加上前缀后可能超长。
2. 直接使用数据库的 sequence 来实现，取决于是使用数据库是否支持，也需要手动重置序列或者为每个 key 生成一个序列。
3. 使用自增 ID 组合实现，使用另外一张表的自增 ID 作为计数器实现，并通过定时任务每天晚上重置。
4. 使用表锁，直接在订单表中操作，每次 select max(number) + 1 然后 insert 一条数据到数据库。
5. 使用行锁，在数据库中将前缀作为 key，这样每天一行数据，通过 set number=number+1 where key='当天的 key 值'。
6. 在内存中的原子类实现。
7. 使用发号服务，从服务器申请规划号段，在应用服务实例领取号段并在内存中使用。
8. 使用 Redis 结合单号前缀作为 Key 这样可以天然的支持当日自增，用后即可丢弃。
9. 在数据库中冗余一个序号字段，通过这个字段拼接前缀作为编码。
10. 使用自定义的存储过程实现。
11. 为每个服务器实例编号，在内存中各自实现，类似于雪花算法。

将方案枚举后，经过分析：

- 方案 1 确实脑洞过大，不太实用。
- 如果数据库支持 方案 2 是最佳方案，无需维护额外的配置信息，非常简洁。
- 方案 3、4 在很多项目中确实存在，但是可维护性和性能都不佳。
- 方案 5 看似很奇怪，但是除了额外多一个编码表外，没有过多的维护逻辑，在没有 Redis 的情况下可以使用。
- 方案 6 在现代系统基本不可行。
- 方案 7 在并发要求极高的情况下才需要使用，一般项目不至于做的这么复杂。
- 方案 8 无需引入额外的数据库表，根据日期作为 Key 生成序号，但是需要使用 Redis 作为发号器，且 Redis 数据可能丢失。
- 方案 9 需要冗余一个额外的字段。
- 方案 10、11 虽然可行，但是维护性太差，且方案太冷门，出问题不好解决。

## 推荐方案

根据上面的分析，最终选择方案需要考虑这几个点：

- 是否满足业务需要
- 基础设施是否满足
- 可维护性
- 性能
- 可靠性

假定使用了 Oracle、PostgreSQL 可以直接使用方案 2 的 sequence 实现。

假定我们使用了 Mysql，对性能没有过高要求，且具有高可用的哨兵 Redis 也容易获得，那么可以考虑方案 8。

假定使用 Mysql 且没有趁手的 Redis 基础设施，也可以额外通过一张数据库表每行一个 key 值来实现不同场景下的计数需求。

假定需要极高性能，则通过方案 7 的发号服务来实现。

## 其它注意事项

编号往往通过前端调用后端提前生成，因为需要在受理业务的时候（还没持久化）用户就能看到，如果前端取消数据提交可能浪费掉部分编号，所以需要提前和业务方沟通。

避免通过  select count(0) 来获取最大的值这类方案，效率低下且需要锁表。

如果 Redis 中的 Key 丢失，解决方案是手动的提取业务单号的最大值，或者系统启动时候检查，自动修复一次。

使用一个公共服务或者使用一个 Common 包来实现此类功能。

## 参考实现代码（ChatGPT 实现）

在实现代码上可以利用 AI 快速实现 Demo，这恰好是 AI 擅长的工作领域。

**提问 1：请使用 Oracle、PostgreSQL 的 sequence 实现一个按日生成的业务单号，单号包含"D"作为前缀，单号序列每日重置。**

回复如下：

使用 Oracle 的 sequence 实现，首先创建一个序列（sequence）：

```sql
CREATE SEQUENCE daily_sequence
INCREMENT BY 1
START WITH 1
MAXVALUE 999999999
MINVALUE 1
CYCLE
NO CACHE;
```
然后，可以在插入数据时使用序列来生成单号：

```
INSERT INTO your_table (id, name, create_date)
VALUES ('D' || TO_CHAR(SYSDATE, 'YYYYMMDD') || lpad(daily_sequence.nextval, 6, '0'), 'your name', SYSDATE);
```
该语句将在插入数据时将 "D" 作为前缀，然后使用 SYSDATE 函数获取当前日期，并将其格式化为 YYYYMMDD 的字符串。然后，使用 lpad 函数将序列号左侧补齐 0，确保单号长度为 10 位。最后，将前缀、日期和序列号连接在一起，作为该行的主键。

为了每日重置序列，可以使用 DBMS_SCHEDULER 包中的定时任务来在每日零点重新设置序列的起始值。例如：

```sql
BEGIN
  DBMS_SCHEDULER.CREATE_JOB (
    job_name => 'reset_daily_sequence',
    job_type => 'PLSQL_BLOCK',
    job_action => 'BEGIN daily_sequence.NEXTVAL; END;',
    start_date => TRUNC(SYSDATE) + 1,
    repeat_interval => 'FREQ=DAILY',
    enabled => TRUE,
    comments => 'Reset the daily_sequence every day at midnight.');
END;
/
```
该语句将创建一个名为 reset_daily_sequence 的定时任务，该任务将在每日零点之后的第一秒开始运行，然后每日重复执行，即每天将序列的起始值重置为 1。

**PostgreSQL 的生成方式略过，可以自行询问 ChatGPT 或其他 AI。**

**提问 2：请使用 Java 和 Redis 实现一个按日生成的业务单号，单号包含"D"作为前缀，单号序列每日重置。**

回复如下：

可以使用 Java 和 Redis 实现按日生成业务单号，并实现每日重置序列的功能。下面是一个示例实现：

```java
import redis.clients.jedis.Jedis;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class DailySequenceGenerator {
    
    private final String prefix = "D";
    private final String dateFormat = "yyyyMMdd";
    private final String sequenceKey = "daily_sequence";
    private final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern(dateFormat);
    private final Jedis jedis = new Jedis("localhost", 6379); // Redis 连接配置

    public String generate() {
        // 获取当天日期并格式化为字符串
        String dateStr = LocalDate.now().format(dateFormatter);

        // 生成单号，格式为 "DYYYYMMDD000001"
        String key = prefix + dateStr;
        Long sequence = jedis.incr(sequenceKey);
        String sequenceStr = String.format("%06d", sequence);
        String id = key + sequenceStr;

        return id;
    }

    public void reset() {
        // 重置序列
        jedis.del(sequenceKey);
    }

    public static void main(String[] args) {
        DailySequenceGenerator generator = new DailySequenceGenerator();

        // 生成单号并打印
        String id = generator.generate();
        System.out.println(id);

        // 重置序列并生成新的单号
        generator.reset();
        id = generator.generate();
        System.out.println(id);
    }
}
```

该类中包含了生成和重置序列的方法。在 generate 方法中，首先获取当天日期并将其格式化为字符串。然后，使用 Redis 的 incr 命令递增名为 daily_sequence 的键的值，生成一个序列号。接下来，将前缀、日期和序列号连接在一起，作为单号的主键。

在 reset 方法中，只需要删除 Redis 中存储的序列键即可实现每日重置序列的功能。

最后，在 main 方法中，可以通过调用 generate 方法来生成单号，并通过调用 reset 方法来重置序列。

## 总结

技术方案分析是富有经验的软件工程师的强项，经过探索技术方案做合适的系统设计，并通过 AI 给出 Demo，提高开发效率。

充分系统设计也可以避免软件项目后期的问题，另外出具的系统设计方案也需要经过评审。

在技术决策上，坚持"先澄清问题-枚举方案-权衡选择"的过程，一定要避免直接先入为主进入解决方案。

在系统设计的过程中，大部分问题基本都是对问题没有充分分析，以及过早进入解决方案，先入为主的通过过往经验直接进行决策。

## 参考资料

- https://blog.51cto.com/u_11576068/4795982
- http://www.yufumoju.com/post/87594.html







