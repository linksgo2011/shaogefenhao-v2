---
title: 技术管理 ｜ 理解产品的真正需求
date: 2025-04-03 20:14:36
---

在大多数场景下，产品团队作为技术团队类似甲方的存在，作为技术团队，我们往往需要理解产品的真正需求，这样才能避免沟通矛盾。

如何同产品团队博弈请看往期另外一篇文章。

这一篇我们聊聊如何用柔软的方式和产品团队沟通。

## 01 一则寓言

从前，一座古城的国王准备修建一道坚固的城墙，以抵御外敌。他召集了三位技艺高超的工匠，分别赋予他们相同的任务：**“修筑一面高十丈、厚五尺的城墙。”**  

第一位工匠听到命令后，立即着手施工。他按照国王要求的尺寸，不多不少地砌好了墙体，完工后自豪地向国王汇报。  

然而，没过多久，大雨冲刷，城墙竟然塌了一角。国王震怒，召见工匠问责。工匠辩解：“陛下，我完全按照命令建造，没有一点差错！”  

国王叹息道：“你只关注了指令，却未曾考虑环境和城墙的实际用途。”  

第二位工匠听完命令后，心想：“城墙关系国之安危，必须建得更加牢固！” 于是，他加厚了墙体，选用了最坚硬的石料，还额外建造了两座箭楼，以确保万无一失。  

当城墙完工，他满怀自信地向国王汇报：“陛下，我不仅建好了城墙，还让它更加坚不可摧！”  

然而，国王的脸色却变得严肃：“你耗费了三倍预算，耗时过久，军队已经失去了最佳防御时机。”  

第三位工匠没有急于施工，而是先请示国王：“陛下，城墙是为了抵御何种敌人？他们擅长攻城，还是善用火攻？我们的军队将如何配合防御？”  

国王微微一笑：“敌军以轻骑兵为主，擅长疾袭，并不擅长攻城战。”  

于是，工匠采用了稳固但轻量的建造方式，使城墙足够坚固，但不至于浪费资源，并在关键位置增设了射击孔，以增强防御力。工程按时完成，预算合理，城防坚固，成功守住了国土。  

这三位工匠代表了组织中不同类型的执行者：  

- 第一位工匠 机械执行命令，缺乏独立思考，导致成果不适用实际环境。  
- 第二位工匠 过度追求完美，虽然用心，但因不顾资源和时间，影响整体效率。  
- 第三位工匠 在执行前理解任务的真实需求，合理分配资源，最终达到最优结果。  

在管理中，执行者不仅要听从指令，还要理解指令**背后的战略意图**，并根据实际情况调整策略，才能真正做到“既不盲从，也不自作聪明”。

## 02 理解产品背后的战略意图

企业战略一切都是为了盈利服务，IT 投入是为了实现业务目标。

我听过产品团队说过最有水平的一句话：“你们要理解公司是做什么生意的”。有些方案看似从技术的角度上非常美好，实际上在业务上非常糟糕，说难听点，就是“生意还做不做了”。

在一次敏捷培训中，我听到一个故事，非常有意思，分享给大家。

一家公司准备开发一个**用户登录系统**，产品经理给出了需求：  

> “请开发一个用户登录功能，要求用户能通过邮箱和手机号登录。”  

于是，公司里的三支开发团队分别开始执行任务。  

第一支团队听到需求后，立即着手开发。他们严格按照要求，实现了**邮箱+手机号登录**的功能，确保用户可以输入邮箱或手机号，再输入密码完成登录。  

结果

- 没有验证码找回密码，用户一旦忘记密码，就只能联系客服。  
- 没有社交账号快捷登录，增加了用户注册和使用门槛。  
- 交互体验差，错误提示不清晰，用户常常不知道哪里出了问题。  

用户反馈：“功能是有了，但用起来太麻烦，体验很糟糕。”  

第二支团队认为**“登录系统是用户体验的第一步，必须做到极致！”**，于是他们增加了一系列高级功能：  

- 支持所有主流社交账号绑定（微信、Facebook、Google、Twitter）  
- 双因素认证（2FA），保障安全性  
- 智能密码输入框，自动检测密码强度  
- 短信验证码登录，减少用户记忆密码的负担  

然而，**一个月过去了，登录功能仍未上线**，因为他们不断优化、测试，甚至增加了生物识别登录（Face ID、指纹）。  

结果

- 工期大幅延误，导致产品发布延期。  
- 由于需求膨胀，开发成本远超预算。  
- 很多用户其实不需要那么多功能，反而觉得系统过于复杂。  

产品经理抱怨：“虽然你们做得很先进，但这不是当前的核心需求，为什么登录功能比整个系统还难？”  

> 对应寓言中的第二位工匠：过度追求完美，忽视了成本和时机。 

第三支团队团队在开发前，主动向产品经理确认了几个关键问题：  

1. “我们的用户群体是谁？” 主要是普通消费者，不是企业用户。  
2. “核心目标是什么？” 让新用户快速完成注册并开始使用。  
3. “当前最重要的功能是什么？” 先支持邮箱和手机号登录，未来再考虑社交账号。  

基于这些信息，他们制定了一个**MVP（最小可行产品）方案**：  

- 支持手机号+邮箱登录，并提供忘记密码功能。  
- 短信验证码登录，减少用户输入密码的负担。  
- 简洁清晰的错误提示，提高用户体验。  
- 留出扩展接口，未来可以无缝集成社交账号登录。  

最终，他们**在两周内完成了开发并上线**，用户反馈良好，公司可以在后续版本中迭代优化。 

在领域驱动设计中，我们经常提到“聚焦核心域”，其实这个就是需要恰到好处的业务目标，该省省该花花。

## 03 推广到向上管理：理解领导的意图

理解领导的真实意图，才能把事情做好，这个和我们去分析用户需求也是一样。

比如，领导说，这个功能简单做做就行，不要费太多功夫。

其实，领导的意思是，这个功能很简单，不要费太多功夫，但是要快速上线，先解决有无问题。

但是基本的功能，我们还是要做的，否则领导又会说这也太简单了。

## 04 总结

如何领会真实的需求？

从第一性原理出发，需要思考我们做的工作目的是什么。

软件不是目的，而只是手段。

甚至软件是负债，而非资产，因为软件需要维护，需要持续付出成本。

能源源不断赚钱的软件才是资产，认识到这一点，就能和产品、业务部门站在同一战线，而不是对立面。