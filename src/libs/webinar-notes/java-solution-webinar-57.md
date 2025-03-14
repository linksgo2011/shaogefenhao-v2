---
title: 技术方案 Webinar - 上线清单
date: 2024-05-18 20:54:03
sidebar: true
head:
- - meta
- name: keyword
  content:   上线清单
  description:  避免“鸡飞狗跳”的上线欣慰
---


## 上线的问题

- 怎么缩短上线的时间？
- 避免事项遗漏？
- 严格做到位某些事情？
- 怎么应对突发问题？
- 有哪些考虑事项（清单）？
- 微服务比较多，没有优雅停机，上线时从注册中心离线，业务走到一般，另外一个服务还会调用下线的机器？

## 上线措施

- 整理上线功能，分一些优先级，保证重要的优先级，拆解重要的任务。
- 任务需要指定到负责人，分配给对应的人，整理出时间节点。
- 制定回滚的计划。
- 需要指定一个总体的负责人。
- UAT 环境的演练，UAT 尽可能模拟线上环境，UAT 部署过程，就是上线过程，这个过程需要做一个计划和步骤清单。
- 人总是不靠谱的（包括我自己），双人制度，执行人和检查人分开，必须两个人同时在线才能操作线上环境。
- 初始化一个步骤清单的版本，每次上线有问题，就会复盘，优化这个清单。
- 给第三方提供的 API 上线时怎么验证正确性？

## 步骤清单（上线文档）常见事项需要考虑？

- 上线文档准备，评审，如果多个团队一起的话，会走版本火车，评审会议。把这个事情提前到技术方案时，就开始考虑上线文档，设定一个 Deadline 要求锁定变更特性内容。
- 挑选合适的上线时间，一般放到【周二、周四】上线
- UAT 演练，和锁定包的版本号。教训：本地拉发布分支的时候，没有 pull，没有把一些代码打到包里面去
- 提前申请权限
- 版本号需要放到应用中，给一个端口读取版本（部署完成，没有部署成功，必须通过一个接口检查当前的版本）
- 数据库脚本 DDL 迁移准备
- 配置准备，配置中心的清单
- 数据修复的脚本，比如前一个版本需要兼容的数据修复
- 上下游系统提前通知，上下游系统的验收 【自己系统倒是上线了，上下游系统挂了一堆，原因是集成接口变了】
- 提前发 outage 邮件，变更邮件，重要的业务无法滚动更新，需要中断流量上线 【上线的时候还有用户在用】
- 备份部署前当前的信息，比如线上的版本、包，应用配置
- 提前数据备份，误操作可以恢复。有些 DBA 只能整库回滚，时间比较长
- 人员可能突然请假 Backup
- 清理缓存（Redis 之类的）、数据清理、CDN 更新
- 监控、日志、告警信息
- 生产验收，业务验证。怎么清理清理数据？一般分为产品验收，使用一个虚拟的用户，避免产生脏数据；业务验收，寻找业务机会的时候验收。
  - 提供第三方的 API，如何协调一起验证，可以协调验证，否则做一个简单的契约测试（造一些 JSON）？
- 发送上线完成通知
- 上线应急预案，回滚方案
- 更新发布日志
- 复盘上线遇到的问题，完善上线文档机制

## 常规公司上线的停机时间

- 互联网公司：0 停机，有蓝绿部署和金丝雀发布的经验吗？用了什么方案？
- 传统公司，例如银行，晚上 10 点左右

## 微服务部分节点停机，业务一致性破坏

1. 如果业务允许停机维护，把前端流量关闭 【成本低】
2. 优雅停机，但是有时候不可靠。【分布式一致性】假定后端服务都是不可靠的，所有写入接口，关键业务都需要做重试【**业务上幂等**，定时，可靠 MQ】
3. 能不能做到真正可靠的服务部署切换？假如一个版本有多个服务需要变更，都需要一起上线，又不能停服。痛苦在于，每次上线都需要考虑，单个微服务的兼容性。
   - 开发的时候，微服务设计，具备独立承担某项能力的条件，内聚性足够强，如果能改，就把服务设计得大一点。
   - 编排的时候，让部署的过程具有前后依赖顺序【常规做法】，在 UAT 上演练安全性。
   - 接口需要兼容性设计，有可能忘记做这件事，上线时没发现。

## 录屏

链接: https://pan.baidu.com/s/1mFw2tMWyRBOZK6utON8tVw?pwd=fsxj 提取码: fsxj 复制这段内容后打开百度网盘手机App，操作更方便哦