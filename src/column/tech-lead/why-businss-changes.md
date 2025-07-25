---
title: 技术管理 ｜ 为什么业务一变，你的技术方案就废了？
date: 2025-07-15 14:21:36
---

有没有遇到这种情况：

业务那边说要改个功能，你一看，好家伙，得连夜重构。更过分的，有时候改完没两周，业务又一变，你前几天写的逻辑就彻底作废了。你心里咒骂：“早知道就别写这么复杂”。

为什么会这样？

其实，大多数技术方案一变就废，不是因为你写得不够好，而是你看问题的角度不够深。

## 一维看二维，二维看三维

这句话听起来有点绕，举个例子：

你拿一张纸看一个立方体（比如一个正方体的盒子），你只能看到某一个平面。你以为它是正方形，但你看不到它的厚度、结构，也就不知道它内部藏了多少机关。

技术方案也是这样。

如果你只是从“业务要改字段”这种二维角度来理解需求，而不是从“公司为啥要这么改”“它背后的逻辑和目的是什么”去分析，那你做出来的东西，99%都会被下一个版本推倒重来。

## 软件的皮肤、血肉、骨骼、灵魂 —— 把系统当成人来看

你可以把一个软件想象成一个人。

* 皮肤：就是界面、前端样式、按钮颜色、字体大小。
* 血肉：是你写的各种业务逻辑，流程控制、计算公式。
* 骨骼：是你抽象出来的领域模型，比如订单、客户、商品的对象建模。
* 灵魂：是产品背后的商业模式——怎么赚钱、怎么拉新、怎么形成闭环。

**技术方案经常废掉的原因，就是你只在皮肤和血肉层面下功夫，却没搞清楚骨骼和灵魂。**

## 真正不容易变的，是“灵魂”

你有没有发现：很多新项目一开始上线是套在旧系统上的。什么共享服务、拼团玩法、会员等级……都是把一个新商业模式“强行塞进”旧系统里，最后补丁打了三层，谁都不敢动。

根源是啥？

**系统的灵魂变了，但骨骼没变，血肉和皮肤只能硬撑。**

举个例子：

* 你原来做的是“标准商品售卖”系统，现在公司要做“私域分销”，这是两个灵魂级别的差异。
* 原来是“用户下单->系统结算”，现在变成“用户分享链接->拉人拼团->结算返利”。

这时候再用原来的订单模型、用户模型，简直就是在强奸逻辑——不如申请一个全新的系统，重新设计骨骼和流程。

## 骨骼变动要慎重，能重构就申请重构

再看“骨骼”，也就是领域模型。

一个好用、稳定、可扩展的领域模型，基本可以支撑一到两年的业务发展。

比如：

* 订单模型：是否考虑到了预定、退货、拆单、多币种？
* 用户模型：有没有身份切换？是否支持多个账户绑定一个用户？
* 商品模型：是否区分商品、SKU、价格策略？

如果你一开始只做“最小模型”，那就像给人画了根骨头，结果后面发现要跳舞、要翻跟头，再加关节、肌肉、韧带……迟早要出事。

建议是：

* 模型只做需要的，但要留“接口位”，比如用抽象类、策略模式等方式保留扩展性。
* 真发现骨架不行了，不要打补丁，申请预算重构。长期看，比做10次功能迭代都值。

## 用例和流程是血肉，多变是常态，要接受

再往上，就是“血肉”层级了，也就是业务流程、业务用例。

这部分是最容易变的，也是你最应该接受变的。

比如：

* 注册流程原来只要手机号，现在要加人脸识别 → 流程变了
* 结算流程原来1步搞定，现在加了会员折扣、优惠券 → 流程变了
* 商品上下架原来定时触发，现在改为运营手动干预 → 逻辑变了

**血肉层就是最灵活的部分，要支持拆卸和替换。**

这时候建议你这么干：

* 用流程图梳理用例（UML、流程图、BPMN）
* 用配置驱动业务规则，提升灵活性
* 拆成微服务不是唯一解，关键是组件解耦

总之，这一层是可以打补丁的，别怕改，但改之前最好记录一下“版本差异”，以防未来自己都看不懂。

## 皮肤是最容易换的，不要花太多时间在上面纠结

最后说说皮肤，也就是界面。

这部分最容易变。今天客户说“绿色不好看，要橙色”；明天老板说“按钮再大一点”。

如果你把皮肤写得太死（写死了字体、颜色、尺寸），那你每次都要重构 UI。你会很痛苦。

**解决方法：**

* 前端用主题配置、组件封装
* 样式变量、tailwind / scss 管理统一视觉
* 能拆皮肤的地方拆皮肤，能共享组件就组件化

你要明白：**皮肤的变化，不应该带来技术方案的灾难性后果。**

## 结语：懂商业，才能写不容易废掉的代码

写代码，是在实现系统。
实现系统，是在支撑业务。
支撑业务，归根到底，是在服务公司的商业模式。

如果你不理解业务怎么赚钱，不知道产品设计意图，不去分析“这个改动是战略性的变动还是战术上的权宜之计”，你永远只能在“修皮肤”“补血肉”的层面做事。