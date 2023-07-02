---
title: 技术方案 Webinar - 二方包和服务间对象复用
date: 2023-07-01 20:54:03
sidebar: true
head:
- - meta
- name: keyword
  content:  二方包和服务间对象复用
  description:  二方包和服务间对象复用
---

## 微服务化后对象很多重复对象怎么处理？

微服务化后，如果一个服务提供的 API 被多个服务使用，这些服务都需要定义一次 FeignClient，这样造成每个地方都需要重复编写很多 DTO，是否可以简化这些逻辑。

Product 服务，这个服务自己在编写一些类：Product、ProductPO、ProductResponse、ProductController、ProductCreateCommand（请求）

调用者在使用时，也要一堆，多个调用者会写多个，尤其是一些基础服务，例如机构、用户、系统配置、产品。

解决办法有哪些？

- 重复定义，调用方自己再写一些 DTO、FeignClient 来承接 API【目前常态】
  - 为什么很多人坚持这种理念？微服务的理念中，集成关系是弱耦合，不应强制调用方升级。
  - 好处是：不会因为对方 SDK Snapshot 变化导致编译都不过，非常灵活
  - 坏处是：上游服务方更新需要人工通知消费方
- 使用提供服务项目的二方包
  - 即 SDK，通过一些技术自动生成 SDK，把消费方需要定义的类提前封装为 SDK，例如 OpenFeign 自动生成、Swagger 也可以自动生成 SDK
  - 好处：减少代码量，对消费方来说，调用 API 就像本地调用一样，可以减少消费方代码量，减少发散性变更工作量。破坏性变化，构建失败反而是个好事情。
  - 坏处是：开发阶段往往使用 SDK Snapshot 版本，导致有调整就可能会让消费方构建失败【开发阶段】，非常容易干扰开发团队
    - 认知差异：有些项目会认为影响非常大，有些项目会觉得这个影响不大。
    - 一般看团队规模，有可能微服务划分太细，没有统一管控 API，跨团队不适用这种 SDK 依赖，而同一个团队会好很多。
    - 总结：跨团队使用 Snapshot SDK 确实存在问题，同团队会好很多，或者说对 API 设计、管控、变更管理优良时在跨团队的时候也会消除其负面影响。
  - 改进方案：
    - 提供 SDK 但是不做强制要求（跨团队使用），当 SDK 不满足需求时可以使用 API call 回退降级。如果官方 SDK 设计太差，甚至可以提供社区版的 SDK 使用，这样避免了相关矛盾。
    - API 管理：API 提出设计，如果 API 变更需要走变更流程
    - 如果完全不用 SDK，意味着放弃了生产力。 如果用一些不受控制的 SDK，又可能让自己在现在或者将来被别人坑到。 所以要识别合作方，在靠谱的合作方就用 SDK，有风险就不用。用 SDK 的话要制定好的外部 API 规范。
    - 制定一些团队契约，如果发布的 SDK 不合格造成其它服务构建失败，影响其考核
    - 认知提升：**不能因为一个实践用不好，而反过来评价这个实践不行；同理，这个思维也被很多咨询师反向使用，一个实践本身有很多缺陷，但是咨询师会说是你不会用。**
- 使用 Common 包，把常见的对象放到 Common 中，不使用二方包 【不推荐】
  - 多个微服务都会依赖的基本包，分为项目级、集团级等，如果是项目级的 Common 包，一般是团队内部管理的，在开发阶段使用 snapshot 版本。 
  - 坏处：Common 和二方包的用途和适用场景是不同的，Common 应该是所有服务都可以用的内容，二方包只是消费方使用即可。
  - 好处：不用发布和管理太多的二方包。


## 是否可以使用二方包解决对象复用问题？

什么是二方包？

一方包，二方包，三方包：

- 一方包：本工程中，各个模块的依赖关系
- 二方包：公司内部的依赖库，内部发布到中央仓库的 Jar 包
- 三方包：公司外部的依赖库，外部发布的中央仓库

可考的出处：阿里开发手册

## 常见二方包实现方式是什么？

- 使用多模块方案将相关模型发布为单独的 Jar 包
  - 可以使用多模块把 Feign 相关的 Interface 发布出去
- 使用 Jdk9 的模块化方案，暴露需要的接口和包【不推荐，不是很好用，尽量在项目初期使用】

## 服务之间相对前端要不要使用单独的接口？

- 不区分内外使用的接口，内部接口也需要使用 Response 封装一次
  - 好处：不用重复编写相关接口
  - 坏处：无法隔离，消费方得到的是 DTO 不是领域对象
- 内部使用单独的接口，直接暴露领域模型作为 DTO，方便发布二方包
  - 好处：代码量少，不用重复编写相关接口
  - 坏处：无法隔离

权衡：

- 非常取决于业务形态
  - B 端：接口尽量使用一套
  - C 端: 为每个端分开，各个端的差异非常大

## 服务之间通信是否可以直接使用领域对象通信？

- 服务内部和服务外部 API 区分，系统内部服务之间通信，直接使用模型，不再封装为 DTO
  - 前端调用 Product 服务，一定使用 Query 对象作为查询参数，使用 ProductResponse 对象返回结果
  - Order 服务调用 Product，还需要把 Product 对象转换为 ProductResponse 吗？那么 Order 服务领域层如何使用 Product 相关模型呢？又比如例如 Policy 模型上使用了 userId，PolicyResponse 上可以拼装一个 UserResponse。
    - Product 类在 Order 服务中如何体现？可以使用 Common 包或者二方包
- 使用领域模型，例如 Policy 直接返回 Policy 对象，不拼装用户信息，在使用的地方拼装。
  - 好处：互相干扰比较少
  - 坏处：需要使用单独的接口，比如为前端接口编写使用 PolicyResponse 作为传输对象，为服务之间调用使用之间传输 Policy 对象。

### 补充

1.如果 Order 直接使用 Product，那么 Product 就像一个富客户端，客户端有几个版本 Product 就有几个快照， 每个快照 Product 的同个行为都可能不一样。 比如 Product 下架，在 A 版本是更改 Product 的状态， 而 B 版本即更改状态又删除主图。 这种混乱怎么管控？

2. 如果直接使用 ProductDTO， 那么一旦 ProductDTO 要替换成 ItemDTO，那么所有原本直接依赖的地方都要变更。这种发散更改会导致你不敢做操作。

## 共识

- 跨团队才防腐，同团队高效解决，领域模型可以复用（Common 包或者二方包），将领域模型通过单独的 API 输出到下游系统。
- 在应用层去依赖外部系统，这样避免领域服务使用第三方系统的结果还需要转换为领域模型的问题。【推荐】这样会把领域层、领域服务做薄，但是优势很明显。
- 应用层厚薄是个伪概念。
- 领域服务之间要不要直接复用对方的模型，需要看场景：
  - 共享内核，直接用 Common 包复用对象，尽可能只对核心稳定的类进行共享内核
  - 防腐设计，可能不同上下文中的同名模型含义不同，需要裁剪，这时候不要复用对象
  - 优先分而治之，抽离统一后再复用，复用意味着耦合
- 实践之间需要权衡成本、优势，不能过于遵循书中写的东西

## 录屏

链接: https://pan.baidu.com/s/145dnAWG2E2IrZhesr1Dy7g?pwd=3v4i 提取码: 3v4i 复制这段内容后打开百度网盘手机App，操作更方便哦