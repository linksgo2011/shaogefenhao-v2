---
title: 分享 | 如何评估模型的有效性？
toc: true
categories: 
  - 高认知软件工程星球
sidebar: auto
---

当有人提出一个模型，然后一群人喋喋不休，争吵得你死我活的时候。

让我想起了 George Box 的一句话：**All models are wrong; some are useful.**

这句话深刻的揭示了我们日常讨论心智模型时的一个原则，那就是：

> 模型当不得真，但是再看起来不可思议、违背认知的模型或许能找到有用的地方。

所以我们能看到一些奇奇怪怪的思维模型，但是居然能找到用处。

数学家布尔发现可以通过真值表来做一些逻辑判定，然后通过基本的对错进行复杂的逻辑运算，在的布尔活着的时候数学界并不承认布尔逻辑是一种数学。

在那个年代，布尔逻辑只不过是一种分析问题的小把戏。

这种观点一直持续到了布尔去世 200 年后，人们发现了门电路，当组合门电路就可以创造出复杂的逻辑装置。比如现代家庭卧室都安装了双向开关，就是一种门电路的应用。

那么既然，模型当不了真，如果我获得了一个思维模型或者理论，甚至是软件中领域模型，怎么知道它是否有用或者合适呢？

简单来说就是两个方向：拟合现状和预测未来。

一般来说，我们不会平白无故的获得什么模型，比如有很多讲性质模型的书籍，介绍了上百种模型。其实这类书籍用处不大，因为模型存在的价值首先需要问题。

找到合适的问题模型就有用了，不管是先有模型还是从模型中找到能解决的问题。

这就是拟合现状，找到的模型能满足当前的状态。比如在项目上，有一大堆的技术债需要解决。

我们可以使用一个四象限模型对这些技术债归类，这个四象限有两个维度，分别是重要性和紧急性。就能分出去处理问题的优先级：

1. 重要且紧急
2. 紧急不重要、重要不紧急
3. 不重要也不紧急

按照这种方法就可以清晰识别手上的一堆问题，这就是拟合；同时也为我们采取行动指明了方向，这就是预测未来。

我们发现，拟合 + 预测，可以作为模型评估的“模型”，要做到拟合、预测就要满足一些条件，将其展开就能得到一些模型评估的清单。

模型的拟合性：

1. 是否足够简单
2. 是否符合逻辑自洽
3. 是否能描述问题的本质
4. 是否有清晰的应用边界和局限性

模型的预测性：

1. 是否能解决提出这个模型背后的问题？
2. 是否能对行动做出指导
3. 是否能用来规划未来的发展
4. 是否能推广到其他领域



