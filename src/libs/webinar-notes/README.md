---
title: Java 常见技术方案讨论
date: 2022-10-11 13:28:53
sidebar: true
head:
- - meta
- name: keyword
  content: Java 常见技术方案讨论
  description: Java 常见技术方案讨论
---

## 背景

作为开发人员会接触一些技术方案，在的设计方案时，我们更多的地想听取业界各种做法，避免闭门造车。 所以举行了一个会议，用来每周和大家交流技术话题，并做了一些记录，这些话题聚焦可落地的技术方案。


### 近期讨论活动

- 2023-07-15(周六)：系统之间集成
- 2023-07-22(周六)：智能应用的架构
- 2023-07-29(周六)：高精度计算
- 2023-08-05(周六)：跨国交易
- 2023-08-12(周六)：开发者心理和工作体验

## 会议信息

```text
会议主题：Webinar for Java Common Solutions
会议时间：2022/10/15 21:00-22:30 (GMT+08:00) 中国标准时间 - 北京
重复周期：2022/10/15-2022/11/26 21:00-22:30, 每周 (周六)

点击链接入会，或添加至会议列表：
https://meeting.tencent.com/dm/3hmMzJplIFc0

腾讯会议：438-7768-4480
```

## 交流群和话题提交

如果希望提交话题，可以添加微信：shaogefenhao 进入微信群发送在工作中遇到的问题。

## 讨论记录

1. [技术方案 Webinar - 业务单号生成](./java-solution-webinar-1.html)

2. [技术方案 Webinar - ID 类型的选择和生成](./java-solution-webinar-2.html)

3. [技术方案 Webinar - 微服务的结构](./java-solution-webinar-3.html)

4. [技术方案 Webinar - 当我们在说模型的时候说的是什么](./java-solution-webinar-4.html)

5. [技术方案 Webinar - 微服务中的鉴权（Auth）怎么做？](./java-solution-webinar-5.html)

6. [技术方案 Webinar - 邓老师 DDD 代码结构分享](./java-solution-webinar-6.html)

7. [技术方案 Webinar - 分库分表和数据库选型](./java-solution-webinar-7.html)

8. [技术方案 Webinar - 微服务下的导出方案](./java-solution-webinar-8.html)

9. [技术方案 Webinar - 审批流方案](./java-solution-webinar-9.html)

10. [技术方案 Webinar - 架构设计和规划](./java-solution-webinar-10.html)

11. [技术方案 Webinar - 如何处理业务公式？](./java-solution-webinar-11.html)

12. [技术方案 Webinar - 如何实现实时协作？](./java-solution-webinar-12.html)

13. [技术方案 Webinar - 除夕蔡老师分享技术方案图例](./java-solution-webinar-13.html)

14. [技术方案 Webinar - 国际化](./java-solution-webinar-14.html)

15. [技术方案 Webinar - 分布式事务](./java-solution-webinar-15.html)

16. [技术方案 Webinar - 库存、一盘货、批量库存扣减、秒杀](./java-solution-webinar-16.html)

17. [技术方案 Webinar - 团队的工作方式](./java-solution-webinar-17.html)

18. [技术方案 Webinar - 容量估算](./java-solution-webinar-18.html)

19. [技术方案 Webinar - CI/CD 之流水线搭建、质量扫描、测试策略](./java-solution-webinar-19.html)

20. [技术方案 Webinar - 软件工程中的政治问题](./java-solution-webinar-20.html)

21. [技术方案 Webinar - 使用 AI 编程](./java-solution-webinar-21.html)

22. [技术方案 Webinar - 遗留系统改造和切换](./java-solution-webinar-22.html)

23. [技术方案 Webinar - OpenAPI 设计](./java-solution-webinar-23.html)

24. [技术方案 Webinar - 信息检索 Information retrieval](./java-solution-webinar-24.html)

25. [技术方案 Webinar - 应用缓存设计](./java-solution-webinar-25.html)

26. [技术方案 Webinar - 架构师面试](./java-solution-webinar-26.html)

27. [技术方案 Webinar - 如何成为咨询师和如何做好咨询师？](./java-solution-webinar-27.html)

28. [技术方案 Webinar - 术语管理](./java-solution-webinar-28.html)

29. [技术方案 Webinar - 企业级数字化资产治理](./java-solution-webinar-29.html)

30. [技术方案 Webinar - 二方包](./java-solution-webinar-30.html)

31. [技术方案 Webinar - 锁和并发](./java-solution-webinar-31.html)

## Agenda 和准备材料

- 讨论的形式和话题话题枚举 
  - 要录屏吗？录屏 
  - 讨论维度是什么？ 
    - 不同项目的工作中方案？不同的项目都是怎么做的？ 有哪些坑？ 做一些案例输入
    - 方案优点，亮点 
    - 方案缺点，局限性 
    - 其他可选的代替方案 
    - 推荐主流的方式 
    - 有没有参考案例资料
    - 产出是什么？整理成会议纪要，更像是一种方案盘点
    - 原则：以严肃对待、生产可用、深入为原则。避免 "这个很简单，但是项目总是会发生问题"。
- 本次讨论的议题，例如："业务单号生成实现的最佳方案"

### Java solutions 议题常用话题参考

1. 如何检查业务输入？启动一个新的项目需要要求产品/BA 提供那些业务材料？
2. 如何做概要设计？概要设计做到什么程度？产出物是什么？✅
3. 如何做详细设计？详细设计做到什么程度？如何管理开发过程中和详细设计不一致的情况，如何保持设计文档更新？
4. 典型的微服务的结构是什么样的？每个项目的微服务结构有哪些差异？【高优先级】（胖瘦 BFF）✅
5. CRUD 无脑方案，有哪些主流技术选型? 优缺点是什么？如何做到性能可靠、类型安全、冗余代码少、方便抄代码？✅
6. 实现 Auth 和用户中心设计的主流方式是什么？✅
7. 实现通用权限的方案是什么？怎么实现权限配置？基于什么做权限配置？在哪里做权限检查？✅
8. 数据字典的最佳实践是什么样的？
9. 导入导出的方案有哪些，主流的做法是什么？
10. 不同时区的问题怎么解决？数据库和 Java 代码推荐使用什么具体的数据类型？✅
11. 多语言怎么设计？语言包怎么管理？✅
12. 全球部署的应用本地数据不允许出境如何实现？数据法案的问题。✅
13. 分布式锁的实现最佳方案？
14. 一致性实现和分布式事务的推荐解决方案和思路？✅
15. 缓存的最佳实践是什么？如何设计良好的失效策略？
16. 业务单号生成实现的最佳方案？✅
17. ID 类型的选择和生成方式最佳方案是什么？✅
17. 软删除方案中比较好和透明的做法是什么，哪些数据需要软删除？什么情况下不要使用软删除？
18. 数据掩码加密，哪些数据算敏感数据？如何对数据库的敏感数据字段加密，加密后如何解决运维问题？✅
19. 如何做数据迁移？如何安全的对线上数据进行修复？如何校验迁移后的数据是可靠的？
20. 服务之间调用有哪些方案？推荐什么形式？使用二方包？
21. 一般性能指标有哪些？实际项目中最具有参考价值的是什么？
22. 系统数据容量怎么计算？如何对历史数据归档？✅
23. 建模的坏味道，建模的原则
24. 分库分表的最佳实践 ✅
25. 幂等方案和防重方案解决 
26. 私有化部署 ✅
27. API 版本设计
28. 服务治理 @刘彦龙 ESB 上怎么做的 ✅
29. 排序如何建模？
30. 在线协作如何实现（画图软件）？
31. 性能如何估算的方法是什么？
32. 离线对账 
33. 数据同步、主数据管理、基础数据分发、报表（数据同步） 
34. 核心系统+元模型+插件化 
35. 技术规范，例如 RESTful 
36. 团队协作，前后端契约
37. OpenAPI 开放平台设计
38. 遗留系统改造和切换方案 ✅
