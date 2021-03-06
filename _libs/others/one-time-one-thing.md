---
title: 专注编码，一次只做一件事
date: 2021-11-16 16:38:56
categories: 
  - 自我管理
sidebar: auto
permalink: /others/one-time-one-thing/
---

在做了程序员 8 年以后，吃了编程上一个小小的亏。

让 CI（持续构建服务）构建失败一上午，而我却无法立即修好，不得不回滚代码，重新开始。
这看起来没什么，毕竟大部分程序员不都是复制、粘贴然后让程序跑起来么，我本身并不需要介意这件事情。不过问题的关键在于，我意识到了一个错误：**在这次修改中，我随手改了太多东西。**

这违反了“小步提交” 的原则，也切实感受到了它的意义。

在这次提交中，我为一个高频操作增加了缓存，使用了 @Cacheable 注解，因为需要在其他操作更新缓存，于是同步修改了几个代码的坏味道。其中一次修改让测试失败，并且错误原因比较隐蔽，让我无法在短时间内修复。

这件事情，让我总结了一下专注编码的几个心得。

## 一次修改一个目标

在敏捷方法论中提倡 “小步提交”，尤其是在重构中。

在重构时，有时候会同时遇到多个代码坏味道，会忍不住想要顺手改掉。不过往往这一个顺手就会坏事儿。“顺手改掉” 这种行为有点类似在开会的时候主题被发散了，就像爱丽丝梦游仙境中的兔子洞，一时半会无法收回。

一次修改达成一个目标，然后运行测试（如果有的话），测试通过了提交代码。

小步提交有几个好处：

1. 不丢失目标感。人们做事情容易三心二意，如果被另外一件事情打断，往往无法再兜回来。
2. 获得快速地反馈。这里的反馈包含心理上的满足感，以及程序正确性的反馈。新手程序员，往往一次性做出巨大的改动，这些改动如果出现错误极其难以发现。小步提交，把测试成功的问题隔离到版本库中，如果有未提交的小部分代码出现错误，比较难发现，可以通过对比未提交的少量代码来发现问题。
3. 每一步的提交记录清晰。小步提交还可以让后续的代码评审更容易，在需要评审时像时光机一样回溯自己的工作。不过做到这点的前提是，认真填写提交日志。
4. 减少代码冲突。这个毋庸置疑，频繁提交代码，可以让冲突减到最小。

## 测试和实现二选一

当我们在做重构时候，测试和实现尽可能避免同时被修改。

如何做到这一点？

答案是，测试尽可能的使用字面量和硬编码。这个有点违反我们日常收到的编程认知——尽可能的复用。

让测试代码尽可能的不依赖实现中的 DTO 等对象，有几个好处：

1. 测试的意图直观。单元测试和集成测试，可以作为活文档来使用，如果在测试用例中使用太多常量、公用方法，会让文档的作用大大降低。
2. 避免实现修改的时候波及测试。编写测试的目的是为了在修改时候检查错误，比如，在 API 测试中使用了 DTO 对象，由于 IDE 有重构能力，可以同步修改字段值，这样就让 API 测试失真。API 测试的请求中，可以直接使用 Map 等数据结构，让参数一目了然，也可以让实现被重构后快速发现问题。



## 一次只做一件事

处理编程经验之外，日程工作中，一次只做一件事非常重要。

> 若同时追两只兔子,你一只也抓不到。——俄罗斯谚语

如果专注做一件事情，很容易进入一种类似禅定的忘我状态，这种状态被有些人叫做 “心流”。进入这种状态，可以获得极大的效率。

这种状态不仅可以获得较高生产力，还可以让内心充盈、满足的愉悦感。忘记自己、忘记时间、忘记烦劳，工作便成为了一种享受，而非负担。

不过想要常常进去这种状态相当不容易，在我的认识里，必须有一些前提条件才能容易进入。

1. 做真正喜欢的事情。如果你做的事情不是自己喜欢的，非常困难进入这种状态。编程和写文章是我喜欢的工作，在这两件事情上我可以容易的进去状态。当然，编写的代码是需要在合理的逻辑之上的。
2. 充足的休息。我们的时间可以有很多，但是精力却有限，当没有精力时，很难集中注意力，这个时候还不如直接休息。
3. 良好的任务管理机制。我们无法专注的一部分原因是，脑子中记录了很多事情，害怕现在不做马上就会忘掉。于是大脑需要额外的开销来随时提醒自己，不要忘记，不要忘记，不要忘记。与其这样，不然使用一个清单记录下来即可。

