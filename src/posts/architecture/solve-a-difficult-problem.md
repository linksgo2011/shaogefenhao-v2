---
title: 系统设计 | 解决困难系统设计问题的思路
date: 2024-04-9 22:04:32
sidebar: auto
category: 
  - 软件架构
head:
  - - meta
    - name: keyword
      content: 架构，解决困难问题,系统设计
      description: 解决困难系统设计的一些方法。
---


我们想要得到什么，就要先想想什么可以失去。

有很多朋友反复问了这个问题，所以在一次系统设计的技术研讨会上（第52期）讨论了一下，本文是其总结。系统设计非常难，因此有一些朋友问有没有什么方法论或者思维工具，可以建立处理复杂系统一般过程。

在过去众多的系统设计经验和咨询过程中，每一次遇到困难问题时，我都会拿出一个非常强的思维武器，作为中国人每个人都享受到了这个思维武器带来的好处。

这个思维武器就是毛主席的矛盾论。根据矛盾论的思想，一些困难问题之所以会是困难问题，是因为有矛盾存在，由于这些矛盾被解决或者转换，世界就会发生变化。

矛盾论有几个重要原则：

1. 矛盾时刻存在，并推动事物的发展，当主要矛盾被解决后，总会有其它矛盾出现，成为新的主要矛盾。
2. 解决问题的思路就是寻找矛盾中的主要矛盾，并将其转化为其它矛盾，这些矛盾是我们期望的发展方向。

如果我们把矛盾论代入我们需要解决的系统设计问题中来看，也可以推导出几个原则：

1. 系统设计的过程中充满了各种矛盾。
2. 如果我们希望解决一个矛盾，那么就必须接受和容忍其它矛盾的出现。
3. 有一些矛盾是我们能容忍的。

所以解决系统设计难点的方法论就很清晰了：

> 尽力找到能容忍的条件，解决不能容忍的矛盾。

也就是说，当遇到复杂问题时，尽力找到一些**容忍点**，这些容忍点就是解决问题的钥匙。

下面我们使用一些例子来实例化一下。

## 解决性能问题

加缓存、使用负载均衡器增加更多的服务器，这些都是常规的性能优化方法，如果某个业务（提交某个单据）大量依赖外部系统，那么前面说的性能优化方法用处不大。但是业务人员又希望提高该业务操作的用户体验。

这就是一个典型的矛盾：上下游系统慢导致操作响应时间长和用户希望减少操作时间的矛盾。

为了解决这个矛盾，我们需要寻找容忍点。

经过对问题现状的调查，发现提交单据前需要进行一系列校验和计算，并将计算结果放到提交的表单数据中，每次提交前为了数据准确会先从其它平台上拉取参数，并使用这些参数对数据重新计算。

我们发现了两个线索：

1. 用户提交单据前会花一定时间预览表单，确认无误后提交。
2. 这些参数的时效性不敏感。

也就是说，用户对参数的失效和立即提交这两个条件可以容忍，因此我们在预览过程中加载了必要的数据并进行计算，这样提交过程就变得极快。

虽然上下游系统的响应速度并没有变化，但从用户体验上还是改善了性能的问题。

## 可用性和一致性

在关联以前解决分布式下关联查询的文章中，我们提到过类似的场景。 例如库存和价格存在于不同的服务，但需要同时在一个列表中查询出来，并有搜索、排序等功能要求。

我们依然可以使用矛盾来分析：

> 库存、价格存在于不同的服务同关联查询之间的矛盾。

为了解决这个矛盾，我们可以很容易找到一些可选方案：

1. 合并库存和价格服务。
2. 将库存数据同步到价格服务。
3. 将价格数据同步到库存服务。
4. 将价格和库存同步到搜索引擎（ElasticSearch）。

通过寻找可以业务和技术上可以容忍的点，来选择这四个方案。

#1 方案在微服务下不可以容忍，不予考虑；#2 库存数据需要实时查询，对延迟敏感，不予考虑；#3 价格的变化在列表查询时，业务没有上没有那么敏感，价格更新不像库存那么频繁，用户在下单时确认最终价格也能接受；#4 同 #2 库存服务对延迟敏感。

那么解决这个问题的方式就是 #3，将价格同步到库存服务。

在这个例子中，如果我们的容忍点更多，设计弹性就更大。假如在业务上可以容忍在列表页中，只查看商品的库存，不涉及的价格的排序、搜索，那么我们的方案会更多。可以获得商品的库存列表后，通过 ID 批量获取价格并组装即可，这也是很多场景下可选的方案。

## 系统切换和迁移

我们在系统切换的场景也常常遇到非常多的困难，而找到容忍点越多，解决这些困难的方法也就越多。

容忍点不同，也意味着不同的矛盾。

通常来说，根据业务上对新旧系统的容忍程度不同，可以选择的方案不同，这里根据难度不同分为几类：

1. 业务上能容忍停机迁移数据，并一次性切换。
2. 业务上不能停机，但是可以容忍一次性切换。
3. 业务上不能停机，部分用户迁移到新系统，但不能同时在两个系统中使用。
4. 业务上不能停机，用户能迁移到新系统，且能在两个系统中同时使用。

上面四种场景，迁移难度逐个加大，如果遇到 #4 这种场景，很多程序员觉得似乎没解了。

我们可以充分挖掘容忍点。在 #4 的场景中，我们遇到的矛盾是：

> 两个系统同时使用和数据冲突之间的矛盾。

即使在两个系统中使用，也可以对不同的数据进行隔离。例如，假设旧系统单向同步数据到新系统，旧系统中的单据被同步到新系统中不允许被编辑，只能查看。新系统的单可以查看也可以编辑。这样虽然两个系统同时运行，但是其数据不会冲突。

## 总结

找容忍点是一个容易被忽略的设计技巧，常见的容忍点还有停机、暂停某个业务、错误容忍、按批次隔离、延迟、可用性下降、增加成本、增加资源消耗、人工介入等等。充分挖掘用户的使用场景，能找到的容忍点还非常多。

解决困难的系统设计问题，除了可以找到容忍点、分析矛盾之外，还有一些经验。

- 第一性原则，先回归原始问题，再看方案，避免 XY problem 的错误路径。
- 别被不存在的假设困住，将可行的方案都写下来，无论听起来多么离谱。例如，对于互联网公司来说，停机维护听起来挺离谱，但是当其它途径的成本不可接受时，停机也算得上好的选择。
- 积累更多的方案，有一些问题已经被人解决过了，所以如果自己背景知识足够多，很多问题都很好解决。
- 寻求外部意见，人需要承认自己的无知，扩大信息的渠道。