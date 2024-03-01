---
title: 软件建模中的逻辑学基础
toc: true
recommend: true
date: 2021-08-11 19:18:35
categories: 
  - 计算机科学
sidebar: auto
permalink: /computer-science/logic-basics-in-software-modeling/
---

- 标题：软件建模中的逻辑学基础

- 主题：一些基本的逻辑概念，在软件建模中的应用

- 解决的问题：不知道如何清晰地理解一个概念，给一个概念下定义

- 文章看点：逻辑学基础

- 素材：

  - 《普通逻辑》
  - 《形式逻辑》
  - 《概念图》

- 提纲

  - 从统一语言说起
  - 什么是概念？
  - 什么是内涵和外延？
  - 如何下定义？
  - 逻辑学的三大定律
  - 在需求分析和软件建模中的应用

  

------------------------



大家都知道编程需要软件工程师具有很好地的思维逻辑，但是有意思的是，在讨论需求和业务建模过程中，会出现互相指责对方没有逻辑。在我经历过相当多次的同事的争吵中，发现了一个规律：每个人都有自己的思维方式和“逻辑”，并排斥其他人的逻辑。

大多数有经验的开发者、系统分析师都具备一定的辩证思维和方法，要说谁没有逻辑，这件事情很难说得过去。如果每个人都是用自己的思维方式和 “逻辑”，让软件建模的统一语言非常困难。我疑惑的是每个人都相信逻辑是很重要的，但几乎没有文章讨论过软件设计和开发过程中如何使用现代逻辑学。

“每个人都有自己的逻辑“ 这件事情从古希腊、先秦、古印度时期就有了，各种思想家、哲学家用自己的逻辑体系互相辩论，他们的争辩和我们普通人在日常讨论中的争辩没有特别的不同：概念的含混不清、归因谬误、偷换概念等。

本文抽取一些基本的逻辑学知识，讨论其软件建模中的应用。公认的逻辑学之父是亚里士多德，但我们现在使用的逻辑学基础来源于弗雷格、黑格尔以及莱布尼茨等人的工作。



## 什么是概念？

这个”设备“ 和你说的 ”设备“ 是一回事吗？

曾经参与一个物联网系统的模型设计，”设备“ 这个词在不同的开发者眼里有不同的概念，为此，讨论 ”设备“ 这个词花费了不少的功夫，最终依然没有怎么定义清楚。

逻辑学中非常重要的一项就是 ”概念“，将概念梳理清楚，软件设计也就非常清楚了。我们来讨论下 ”概念“。

> ”概念是反映对象特有属性或本质属性的思维形式。“

概念不仅是自然世界中的花花草草、风雨雷电等事物，还有社会经济中的商品、货币、阶级和国家等抽象事物，以及人类精神和思维活动中的思维、意识和情感的等。**通俗的来说概念就是人们可以认识世界的对象。**

柏拉图的 “洞穴神话” 可以让我们对概念的产生进一步认识。假设有些人住在地下的洞穴中，他们是一群囚徒，生来就在地下，坐在地上背对洞口，不能转头看到洞口，只能面向洞壁。在他们身后有一矮墙，墙后面有些人形的生物走过，手中举着各种不同形状的人偶。人偶高过墙头，被一把火炬照着，在洞穴后壁上投下明明灭灭的影子。这些人终生都只能看到这些影子，会认为这些影子就是具体的事物。

 “洞穴神话” 告诉了我们我们每天争论的概念，都是每个人技术、生活背景投射的影子。概念会随着人们对事物认识的加深而变化，尊重逻辑的人不会强行要求某个概念比如按照自己的解释（类比中世纪教会对经书的解释权）。



## 通过属性认识概念和区分概念



正是因为朴素的概念是来源于个人背景和理解，因此概念统一。后来哲学家认识到人们认识概念是由一些更为基础的属性构成的，那可以认为概念就是由属性组成的。比如 ”人“ 这个概念，属性有四肢、直立行走的行为、皮肤光滑等属性。

这些基本的属性又是一些更基本的概念，如果我们对这些基本的概念达成共识，那么我们就有机会对概念进行统一。类似于 Java 中的类有各种属性，这些属性最终都可以通过 8 种基本的数据结构描述。

因此属性是认识概念非常重要的一件事。属性包含了事物自身的性质、行为，比如黑白、高矮，是否能飞行，是否独立行走。事物除了自身的性质外，还与其他事物发生一定的关系，比如大于、相等、对称、属于等。事物的性质、行为以及和其他事物的关系，统称为事物的属性。

**通过属性就能找到概念的边界。** 具有相同属性的概念是同一个概念，即使是叫法不同也不应该分为不同的概念。比如土豆、马铃薯，一旦属性的增加和移除都算作不同的概念，比如小土豆是土豆吗？通过属性就就能发现生活中的命名谬误，比如小熊猫并不是小的熊猫，而是小浣熊。



##  概念的表达

概念只是我们对所认识的事物起的一个名字，词语是概念的自然语言形式，概念是词语的思想内容。

一个概念可以具有多种表达方法，对于软件设计来说，我们可以用自然语言描述概念。也可以通过定义一个类来描述，并在程序运行时实例化这个概念。通过数学或者数理逻辑，我们可以使用集合来描述一个概念。

比如 ”商品“ 这个概念，可以通过不同的方法表达。

自然语言中，商品是指可以通过货币或者其他物品交易的物品，可以是自然实体，也可以是虚拟物品。这是社会经济中对商品的描述，商品具有一个核心属性就是价格，有价格意味着可以交易。



自然语言中，概念和词语之间并不是一一对应的，这是需要日常特别注意的。



1. 自然语言中，任何概念都必须通过词语来表达，但不是所有的词语都表达概念。在语言中，基本上都会将词分为虚词和实词两大类，只有实词（注意不是名词）可以表达概念。
2. 同一个概念可以由不同的词语表达，比如前面提到的土豆、马铃薯。
3. 一个词在不同的的情况下（上下文），可以用来表达几个不同的概念，多义词就是这样，同一个词表达不同的概念，叫做这个词的词项。



如果通过计算机语言来描述一个概念，其实就是面向对象中的一个类，这里定义商品有两个属性名称和价格：

```java

public class Goods{
  private String name;
  private int price;
}
```

如果用集合的枚举法来表述就是商品就是：

```java
Goods{name,price}
```

计算机语言和数学语言是一种形式化的语言，是可以精确的描述一个概念，但是自然语言只能通过模糊的给出概念的描述。自然语言翻译成计算机语言的不确定性，带来了无休无止的争吵，但这也是软件设计者的主要工作。



## 概念的内涵和外延

正是因为自然语言的这种模糊性，为了更加具体的描述一个概念。哲学上概念的共识是概念有两个基本的逻辑特征，即内涵和外延。概念反应对象的特有属性或者本质属性，同时也反映了具有这种特有属性或者本质属性的对象，因而概念有表达属性的范围。



- 概念的内涵是指反映在概念中的对象特有属性或本质属性。
- 概念的外延是指具有这些属性的所有对象，即囊括对象的范围。



例如商品这个概念的内涵是 ”能进行交换的商品“，本质属性是能进行交换，从本质上区别产品。它的外延就是投入市场能卖的所有事物。

对概念的外延的清晰描述对我们设计软件产品的定位非常有帮助，我们购买软件服务无非两种情况，生活娱乐使用，或者工作使用。马克思社会经济学精妙的描述为生产资料、生活资料。这其中的逻辑完全不同，按照生活资料的逻辑设计一款生产资料的产品注定要走弯路。

概念的内涵和外延在一定条件下或者上下文中被确定的，这取决于参与人的共识。严格锁定概念的内涵和外延，不能帮助我们讨论问题和改进软件模型。随意修改内涵和外延这是典型的偷换概念和诡辩。

概念的内涵和外延是一个此消彼长的兄弟。当内涵扩大时，外延就会缩小，概念就会变得越具体。当内涵缩小时，外延就会扩大，反映的事物就会越多。

在面向对象软件建模中的影响非常明显。对象特有属性或者本质属性越少，那么这个对象能被复用的场景越多，也就是内涵越小。反之，特有属性越多，能被复用的情况就越少了。软件建模过程中随意修改概念往往意识不到，但是每一次属性的添加和移除都带来概念的内涵和外延发生变化。

非常典型的一个例子发生在订单模型中。一般来说，我们会把支付单和订单分开设计，订单的概念中没有支付这个行为，但有时候觉得支付单的存在过于复杂，会将支付单的属性放到订单中，这个时候订单的内涵和外延变了。

内涵和外延发生变化但是设计人员没有意识到，会使用同一个词语。一旦使用同一个词语就会产生二义性，二义性的存在对软件建模是致命性打击。比如用户维护的地址、地址库中的地址、订单中的地址，这三个 ”地址“ 虽然名字相同，但是内涵和外延不同。

意识不到概念的内涵和外延，是无法设计好逻辑良好的软件模型的。



## 对象命名就是下定义

变量命名和缓存失效是编程中最让人头疼的两件事。

变量命名其实就是在给一个概念下定义。定义是揭示概念的内涵和外延的逻辑方法，一个准确的定义需要反映出对象的本质属性或特有属性。下定义困难普遍有两个痛点：

1. 不懂好的下定义的逻辑方法。
2. 对业务概念或者领域不熟悉。



对于第一个痛点，根据概念的属性、内涵和外延，逻辑学中有一些很好地下定义方法。

**属加种差定义法。**这种下定义的方法通俗来说就是先把某一个概念放到另一个更广泛的概念中，逻辑学中将这个大的概念叫做 ”属概念“，小的概念叫做 ”种概念“。从这个属概念中找到一个相邻的种概念，进行比较，找出差异化本质属性，就是”种差“。比如，对数学的定义，数学首先是一种科学，和物理学处于同类，它的本质属性是研究空间形式和数量关系。于是可以得到数学这个概念定义：数学是一种研究现实世界的空间形式和数量关系的科学。

用这种方法给订单、支付单、物流单下一个定义：

- 订单是一种反映用户对商品购买行为的凭据。属概念是”凭据“，种差是”反映用户对商品购买行为“。
- 支付单是一种反映用户完成某一次支付行为的凭据。属概念是”凭据“，种差是”用户完成某一次支付行为“。
- 物流单是一种反映管理员完成某一次发货行为的凭据。属概念是”凭据“，种差是”管理员完成某一次发货行为“。

在逻辑中可以参考下面的公式：

>  被定义的概念 = 种差 + 属概念



对于第二个痛点，这不是软件建模能解决的问题，需要充分和领域专家讨论，获取足够的业务知识。人们对概念的定义或者认识是随着对事物的认识不断加深而变化的。一个完全对某个领域没有基本认识的软件工程师很难做出合理的软件建模，例如银行、交易所、财会等领域的软件需要大量的行业知识。



我们做消费者业务的互联网开发时，往往因为和我们的生活相关，所以这种感受并不明显。当做行业软件时，领域知识对软件模型的影响甚至是决定性的。




## 总结



软件是现实世界在计算机领域的投影，而面向对象建模是软件的骨架。理解面向对象实际上就是在理解哲学、逻辑学，理解概念在现实世界中内涵和外延。也需要理解概念在现实世界中的上下文，也就是逻辑学中的 ”论域“。

对业务模型明确的给出定义，就能给出清晰地对象设计，划分出软件模块。








