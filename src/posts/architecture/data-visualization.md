---
title: 系统设计 | 数据可视化和图编辑引擎库选型
date: 2024-07-05 10:48:32
sidebar: auto
category:
  - 软件架构
head:
  - - meta
    - name: keyword
      content: 如何实现项目中的数据可视化需求？
      description: 如何实现项目中的数据可视化需求？
---

数据可视化是一个非常大的领域，在这里我想讨论一下，数据可视化在 Web 项目中的常见需求，以及一些实现方案的技术选型。

有时候我们会觉得，这不就是找个图表库就能搞定的事情嘛，何必还写一篇文章。实际上在我工作经历中，数据可视化的需求非常杂，以至于这个领域的开源框架也非常繁杂。

这篇文章根据常见的需求，对这些开源框架做一些梳理和归类。

## 01 常见需求

最常见的需求是展示数据图表，例如电商网站会提供一些订单汇总的图表展示，显示每年每月的销量。这类需求是日常开发工作的主流，通过一些开箱即用的图表库就能实现。

另外一种是交互式的数据可视化。例如基于一个沙盘模型，点击沙盘模型的热点，出现相关的数据或者信息，一般开箱即用的图表库无法满足相关需要，我们可以使用一些更“低级”的图形库实现。这里的低级是指 API 的封装程度不高，灵活性较强。

还有一种是实时监控大屏，时髦一点的说法就是“智能驾驶舱”，用于在大屏上关注实时动态。比如景区人流量、医院、车站的繁忙情况等。这类场景已经比较成熟，往往有专业的开源、商业解决方案。

另外一种是数据分析仪表盘，根据数据分析模型展示数据洞察和动态，往往由 BI 工具完成，这部分在后续的文章中整理。

## 02 框架和选型

所以我把市面上常见的框架做了一个表格，便于归类和寻找，并对一些框架做了专门说明。

| 类型      | 用途                                               | 工具                                        |
|---------|--------------------------------------------------|-------------------------------------------|
| 图表库     | 用于嵌入到应用程序或网站中的静态或动态图表                            | ECharts,Chart.js, Highcharts, Antv.vision |
| 实时数据监控  | 实时监控和报警系统，适用于需要即时反馈的场景，一般需要支持时序数据。               | Grafana, Kibana, Prometheus               |
| GIS 可视化 | 显示地理分布和地理模式                                      | Leaflet,Mapbox                            | 
| 图和关系可视化 | 例如知识图谱，血缘关系等类型的图表展示                              | Cytoscape, Neo4j Bloom                    |
| 基础图形库   | 使用图形库的基础 API 实现更高级自定义数据可视化                       | D3.js, Three.js                           |
| 数据分析    | 适合数据分析师，科研用途的图表展示                                | Plotly,Dash                               |
| 图形绘制和编辑 | 例如网络设备拓扑图、流程图、时序图等，如果我们要集成这类能力到应用中，需要适当的图形库,又被称为图编辑引擎 | JointJS,drawio,Mermaid,AntV x6    |

上面这些图形库基本满足日常应用开发需求，下面挑选一些重点的说明。

### 前端报表场景用哪一个图表库？

在这些常见的图表库中（ECharts,Chart.js, Highcharts, Antv.vision）哪一个更适合被拿来开发报表？这个问题我在前端圈子中问过一轮，在 2024 年来说 ECharts 还是首选。

我们可以从这几个维度来评价前端图表库：

- 商业授权：其它都没问题，Highcharts 有商业授权问题。
- 功能：基本都比较强，大部分场景差不了太多。
- 性能：ECharts 性能不错，Highcharts 文件稍大，Chart.js 性能差一点。
- 体验：AntV 的体验和设计非常不错，其它的差异不大。
- 定制化难度：Chart.js 最简单，其它都差不多。
- 文档：AntV 社区支持少，文档不足。

所以综合下来，如果是常规的报表需求，ECharts 比较安全；如果图表非常简单 Chart.js 轻量级一些，上手也简单；追求设计感的话 AntV 可以尝试，但需要花更多时间去调研。

补充说明：ECharts 是很多年前百度捐赠给 Apache 的项目，一直在更新， AntV 的前身好像是阿里巴巴收购的 Datav。

### Three.js 和 D3.js 如何选？

如果上面的一些开箱即用的图表库不满足需求时，我们可以用更基础的一些库。

Three.js 是一个基于 WebGL 的 JavaScript 库，主要用于创建和显示复杂的 3D 图形和动画，一般用于各种仿真场景。例如使用 3D 效果显示建筑构件的结构。

Three.js 学习难度挺高的，需要一些专门的图形学知识，例如坐标变换、光照处理等。

而 D3.js 虽然名字有点像 3D, 但是说的完全不是一回事，它的 D3 意思是 Data-Driven Documents? D3.js 是一个用于创建动态、交互式数据可视化的 JavaScript 库，主要用于 2D 图表和数据驱动的 DOM 操作。提供了大量的 API 可以对数据进行复杂的转换和映射，适合各种类型的 2D 数据可视化。

当遇到一些复杂图表需求时，选择 D3.js 实现个性化的图表是没问题的。

### 图编辑引擎有哪些使用经验？

drawio 是一个非常强大的绘图软件，原网站名是 draw.io，库名叫做 mxGraph，现在网站改名为 diagrams.net。它把图形库开源出来了，很多国内的一些图形编辑软件都用的这个库（包括我自己参与过的一个图形编辑软件）。

mxGraph 通过点和边抽象了一套图形库，缺点是使用的 JavaScript 特性比较老，样式也比较老，现在好像还没有 TypeScript 的版本。优点在于，在很多需要拖拽编辑的图形的场景，用 mxGraph 实现起来非常快，也很灵活。

JointJS 是一个更新可以平替 mxGraph 的开源库，其样式和 API 都比较新，如果有类似需要内嵌的图编辑引擎，可以参考使用 JointJS。

除此之外， AntV 中有一个模块 x6 也可以实现类似 JointJS 的效果，可以作为另外一个选项。

## 参考资料

- 数据可视化：在线设计与网页实现的技巧与工具 https://cloud.baidu.com/article/1861248
- https://threejs.org/
- https://antv.antgroup.com/
- https://d3js.org/
- https://github.com/clientIO/joint
- https://github.com/jgraph/mxgraph