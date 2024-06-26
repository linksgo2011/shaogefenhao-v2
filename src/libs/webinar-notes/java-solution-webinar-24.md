---
title: 技术方案 Webinar - 信息检索 Information retrieval
date: 2023-05-06 20:55:03
sidebar: true
head:
- - meta
- name: keyword
  content:  信息检索 Information retrieval
  description:  信息检索 Information retrieval
---

## 信息检索领域在谈什么？

IR 一种计算机技术，用于帮助人们把需要的信息获取回来，并进行加工得到有效的信息，完成信息检索。

## 信息检索技术的历史

信息检索技术的历史来源于图书馆学，讨论关于如何将信息分类，高效的检索出需要的图书。

## 相关的计算机系统

- 搜索引擎
  - 基本工作流程：
    - 摄取：ingest，文档进入到搜索引擎的过程
      - 数据爬取：不在 IR 领域中
      - 符号化：tokenization，通过分词算法实现，目前没有理想解决方案，和预料相关，也可以通过机器学习的方案实现
      - 索引收录，计算 TF-IDF
    - 用户输入一个 Query 将相关文档高效准确的排列出来
      - 在 Yahoo 以前是通过操作符指令的方式检索，例如通过一些表达式、通配符来约束 Query 的书写
      - 在 Yahoo 和 Google/Baidu 出现后通过 NLP 技术进行自然语言处理的搜索
      - Google/Baidu 相对于 Yahoo 的差异是商业排名和其他排序算法 PageRank
    - Query Parsing：通过 NLP 技术解析自然语言为 Token 和表达式，Token 解析阶段和 ingest 数据时候需要一致
    - 召回（recall/Matching）：把符合语句语法的一系列结果查询出来，基于倒排索引
      - 倒排索引的技术：Lucene 可以理解为表达式解析和倒排索引实现的库，本质上倒排索引引擎就是一个标签库（Token）
      - 传统召回：基于文档的召回
      - 非传统的召回：基于向量的召回，应用场景是基于图片来搜索图片
        - 基于两个向量的 cosin 值的大小来度量相似度，从而实现图片查询，参考：Faiss
      - 多路召回：在重排阶段，可以由多个数据源（例如不同的召回形式：向量召回、标签召回）
    - 粗排（Pre-Ranking）：在分布式系统的每个节点获取相关的数据，并汇总到主节点
      - 根据关键的统计值：TF-IDF (Term Frequency - Inverse Document Frequency)
      - 在一组关键词中，怎么判断关键词命中到文档中，这个某个关键词非常重要？例如"上海的火锅"，怎么判断上海更重要还是火锅更重要，就是通过 IDF 评估。
      - 关键的 TF-IDF 的算法：BM25（Best Match 25）
      - 由于在每个分片上的 TF-IDF 值浮动，多次搜索的结果顺序可能不同（概率比较小）
    - 精排（Ranking）：将多个分片获取的数据精细化排序，类似于 Reduce 操作。例如，"上海火锅" 在文章中出现的间距，根据间距再次计算优先级，优先选择让间距更近的文章
    - 重排（Re-Ranking）：LTR（Learning to Rank）通过机器学习的技术进行决策，可以看做一种决策树，其目的是排序，通过用户点击的行为来训练，可以使用 GBT
      - 一般在搜索引擎外部实现，如果没有机器学习机制，那么精排完成后就可以结束了
  - Trades-off: 索引的实时性和性能之间的权衡，在性能比较好的情况下，索引会存放到内存中
  - 搜索引擎的本质：一个大型的 MapReduce 分布式系统，基于统计的方式获得有效结果
  - PageRank 算法：基于外链数量来评估文档的价值，作为一种投票的机制
  - 搜索相关性指标：
    - DCG(Discounted cumulative gain) 折扣累计收益
    - MRR（Mean Reciprocal Rank）平均排名的倒数
    - MAP (Mean Average Precision) 平均正确率
  - 反作弊：不属于 IR 领域
  - teaser: 用户在搜索引擎上看到的标题下一段描述，引诱用户点击进去。它并不是摘要，而是吸引用户的关键信息。
- 推荐系统
  - 为什么推荐和搜索相关？推荐系统解决是什么问题？什么时候需要引入推荐系统？
    - 对于之前的系统来说，一般是现有搜索再有推荐，很多基础设施都可以共用
    - 解决两大问题：搜索的长尾问题，对于搜索来说排在后面，但是对部分受众来说其实很有价值；马太效应（强者愈强），排在前面的内容会越来越被强化，但不是最有价值的内容
      - 对于特定用户来说，搜索引擎的 weight 不平衡问题，query 不能完整表达用户意图。例如地域信息，人在上海搜索火锅无法得到上海的的火锅。
    - 推荐系统形式
      - 人对人：根据人推荐好友，通过人的关系、标签、向量实现匹配
        - 通过人做向量的方式：通过不同维度的信息值进行量化，比如年龄、职业等信息进行匹配，类似 personal
      - 人对物：根据人推荐文章或者其他资源
        - 通过用户的交互记录（购买、收藏等）
      - 物对物：根据资源的相关性推荐其它资源
    - 用户信息收集
      - 数据联盟：
        - 资本控制：国家要求公开用户信息收集方式，一般是淘系、腾讯系不同的联盟收集
        - 灰产： 地理位置信息，比如通过 WiFi
        - 推送平台：友盟
      - 用户交互数据收集：前端埋点
        - 屏幕的信息
        - 停留时间
        - 拇指滑动方式
        - 眼睛停留位置
        - 麦克风
      - 用户录入的数据：关注的人或者标签、主题等内容
    - 实现方式
      - 奇异值分解(Singular Value Decomposition，以下简称SVD)：把用户和商品做了一个矩阵，通过互动记录赋值，并拆分矩阵，描述人和物之间的关系，或者物和人的关系
      - 协同过滤（collaborative filtering）是一种在推荐系统中广泛使用的技术。 该技术通过分析用户或者事物之间的相似性（“协同”），来预测用户可能感兴趣的内容并将此内容推荐给用户。奇异值分解是协同过滤的实现方式。
      - 遇到的困难，特征工程困难
        - 商城推荐：
          - 不同商家对于商品的描述不标准化
          - 文字匮乏，可以通过图像进行识别好分析
        - 文档推荐：
          - 文字量过大，实现摘要
          - 打标签
        - 视频推荐
          - 音频转换为文字，并使用文字进行推荐
      - 搜索和推荐评价
        - 相关性：参考搜索引擎部分
        - 新鲜度：推荐出来的东西是否过时
        - 多样性：反复推荐相同的商品，需要限制同样品类出现在推荐的首页，需要作为一种规则放到引擎中。
          - 使用多路召回，保证多样性
        - 惊喜性：尝试推荐一些相关性不强内容
        - 可解释性：推荐的逻辑能被解释，例如因为你玩过 xx 游戏，再根据被推荐的游戏的标签告诉用户的可解释性。相比之下，内容生成的 AI 很难做到可解释性。
      - 搭建推荐系统
        - 评估用户的输入信息，如果没有可以先做物对物的推荐
          - 最简单的物对物推荐计算关联，使用词向量计算实现，可以使用 ElasticSearch
        - 如果有用户输入信息，使用 AI 
          - 
      - SEO 攻击
        - 推荐系统 SEO，如何让推荐系统更喜欢你的内容？
          - SEO 
          - 官方竞价排名
          - 广告联盟
          - 灰产，大部分内容都是假的
- 人工智能内容生成（NLP）

## 参考资料

- https://www.cnblogs.com/datasnail/p/13088964.html
- https://en.wikipedia.org/wiki/Learning_to_rank
- https://en.wikipedia.org/wiki/Information_retrieval
- https://en.wikipedia.org/wiki/Tf%E2%80%93idf
- https://en.wikipedia.org/wiki/Okapi_BM25

## 录屏

搜索引擎部分 链接: https://pan.baidu.com/s/1TtSC_4XR8HGhZSr5CrQ5Rw?pwd=ktcx 提取码: ktcx 复制这段内容后打开百度网盘手机App，操作更方便哦

推荐系统部分 链接: https://pan.baidu.com/s/1SHEC2qlAJa6yjWGE28U61g?pwd=j6ux 提取码: j6ux 复制这段内容后打开百度网盘手机App，操作更方便哦



