---
title: 技术方案 Webinar - 常见报表方案
date: 2023-10-21 20:54:03
sidebar: true
head:
- - meta
- name: keyword
  content:  常见报表方案
  description:  常见报表方案
---

## 常见的 BI 和报表的需求有哪些？

- BI：商业洞见或者分析，BI 肯定有报表的一部分，会提供一些预测模型和分析模型。一般来说都是数据团队来实现，实时性不高，往往是 T+1。简单来说，偏向于图表渲染。
- 报表：现有数据呈现，分为实时数据（从库）、准实时数据（流处理平台）、离线 T+1 报表。简单来说，偏向于数据统计、查询、导出和分析。

## 常见的报表类型有哪些？

- BI 报表（OLAP）
  - 图表报表
  - 分组统计报表（维度数据）
  - 交互报表（自定义组合分析）
  - 智能预测报表（销量和库存预测）
  - 画像分析
- 普通离线统计报表（OLAP）
  - 从库、数仓、T+1 报表
- 应用内实时报表（OLTP）
  - 导出报表
  - 套打报表（制式表格、word）
  - 清单列表（非常复杂的组合查询）
  - 普通统计报表
- 驾驶舱大屏（OLAP+OLTP）
  - 数据应用和普通应用混合体

## 常见的技术选型有那些？

商业 BI 报表类： 

- Power BI
- Tableau
- Smartbi
- QlikView
- 帆软 FineBI
- 水晶报表

开源 BI 工具：

- eazyBI
- dataease
- pentaho
- birt

国内风格开源报表：

- 润乾报表: 类 Excel 展开，早期的报表模型，比较主流的报表方案。还有一本书，可以了解。
- poli：一个极其轻量级的 SQL 报表服务，比较容易集成到系统中。

大数据平台类（含分布式计算和加工）：

- 永红 BI

开源信息化图表工具： 

- kibana
- Grafana
- Apache ECharts
- 阿里 DataV
- datart
- DataEase
- jimureport

## 常见的场景的最佳的技术选型？

### 普通的列表报表导出

- EasyExcel

### 详情的 Excel 异型表单导出
单头、单行、多 tab 页

- 自己实现一个 XML Excel Writer 代替 POI 操作，也可以使用模板

### 非线性报表（多源分片）

类似交叉报表，润乾发明的概念，相对于线性报表，单元格之间会互相影响。

本质上实现了非线性报表的理论，有另外一套数学模型支持（层次坐标的概念和算法）：

- 润乾报表
- 帆软 FineBI

参考： https://www.raqsoft.com.cn/r/r-model

### 复杂的数据源和拖拽定制化开发

- 选择一个 BI 平台
  - 
- 购买搭建一套传统的商业报表，一般订阅制
  - 帆软 FineBI
  - 润乾报
- 自研一套小的报表服务，使用开源平台
  - 

## 常见的反模式有那些？

- 报表的数据源如何集成？
  - RESTful 实现 （不推荐）
  - 数据库 Driver 链接
  - CSV、JSON 文件
  - 数据流方式

## 读写分离策略

- 主：写、为写入而读的查询（详情），详情加缓存，禁止做报表业务。
- 从：只为查询（Q）单独处理，报表全部走 Q 的逻辑。

CQRUD：CRUD 走主库，Q 从库。

## 参考资料

- 报表类型 https://www.cnblogs.com/powertoolsteam/p/Report_Knowledge.html

## 录屏

链接: https://pan.baidu.com/s/1EPtqDeOuWYoOIYcAkVhv_g?pwd=24i6 提取码: 24i6 复制这段内容后打开百度网盘手机App，操作更方便哦
