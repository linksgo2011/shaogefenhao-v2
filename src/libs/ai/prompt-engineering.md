---
title: 如何写好提示词？
date: 2025-09-26 16:52:06
sidebar: true
---

## AI 友好的工作条件

- 有效的结构化的业务输入：足够清晰有效的业务输入作为工作前提
- Rules：在特定工作场景下，约束 AI 行为，避免幻觉
- MCP 集成
  - 我目前主要用 figma 和数据库 MCP，可以把基础设施的都用起来
- 友好的开发框架：AI 能理解整个项目，并隔离上下文
- 清晰的工作流程：每个阶段都有 AI 能识别的输入和输出物来帮助团队不同角色工作
- 有效的反馈机制：AI 的输出需要人工验证和迭代优化

## 提示词技巧

### 基础 Prompt 原则

使用语言描述软件并让 AI 实现的难点是：语言是一个线性结构，而代码具有更多维度的结构。我们无法完全通过语言达到我们理想的结果。

- 明确目标: 指清任务目的、受众、场景,避免模糊词，明确衡量标准（字数、语气、内容范围）。
- 提供足够上下文：加入背景信息、已知条件。
- 指定 AI 的角色或身份（如“你是一名资深数据科学家”）。
- 非常重要的点：减少歧义：用精准的词汇，对可能多义的表达给出限定。
- 结构化指令：用列表、分步、表格等格式组织任务，指定回答的结构顺序。

**典型不好的提示词：**

```
帮我设计一个用户管理的API，要好用一点，性能要好。
```

**好的提示词：**

```
请使用 Design Rule 为电商平台设计用户管理API。

【项目背景】
- 现有系统：Spring Boot + MySQL，单体架构
- 用户规模：预计10万注册用户，日活5000
- 技术栈：RESTful API，JWT认证

【具体需求】
1. 用户注册：支持邮箱/手机号注册，需邮箱验证
2. 用户登录：支持多端登录，会话管理
3. 用户信息：查询、更新个人资料，头像上传
4. 权限管理：普通用户/VIP用户/管理员三级权限

【技术约束】
- 响应时间：核心API < 200ms
- 安全要求：密码加密，敏感信息脱敏
- 数据库：需考虑索引优化
- 兼容性：需向后兼容现有移动端

【预期输出】
1. API端点清单（HTTP方法、路径、参数）
2. 请求/响应数据结构（JSON Schema）
3. 错误码定义和处理策略
4. 数据库表结构变更建议
5. 安全和性能考虑要点

请不要实现具体代码，只需要设计规范。
```

### Chain of Thought（思维链）

Chain of Thought（思维链） 是一种让 AI 在得出答案前显式地推理 的提示方法。
它的核心思想是：不要让模型直接输出结果，而是先一步步写出推理过程，再得出最终结论。

这种方法在复杂推理、数学计算、多步骤逻辑判断中尤其有效，因为：

- 让模型在生成答案时遵循“分解问题 → 逐步分析 → 得出结果”的流程
- 可以降低 AI 在复杂任务中“一步到位”出错的概率
- 模型在推理中会更倾向于自我检查错误
- 在思维链的过程中，可以进行干预纠正，然后得到后续正确的结果

例如下面这个提示词，不会让 AI 直接编写代码而是先做设计：

```
请按照以下步骤，逐步推理并设计将项目中的审批模块集成到 BPM 系统的方案：

- 分析审批模块的核心功能和业务流程；
- 明确 BPM 系统支持的集成方式（如 REST API、消息队列等）；
- 设计双方数据交互的接口，包括请求方法、路径及参数；
- 规划审批状态的同步和回调机制；
- 设计异常处理和错误回退流程；
- 最后总结完整的集成接口规格及流程说明。
需求：将现有项目的审批功能集成进 BPM 系统，实现审批任务的创建、状态更新和结果同步。
```

### Tree of Thoughts（思维树）

Tree of Thoughts（思维树） 是一种比 Chain of Thought（思维链） 更高级的推理方法。

它的核心思想是：

- 不仅让 AI 逐步推理，还让它在每一步推理时，同时探索多条可能的思路路径，形成一棵“决策树”或“思维树”。
- AI 可以在这棵树中评估和比较不同分支的结果，挑选出最优或者最合理的答案。

在提示词中直接要求 AI 使用思维树：

```
请采用“思维树”（Tree of Thoughts）的方法，针对将项目中的审批模块集成到 BPM 系统的需求，展开多条可能的设计思路和方案分支。具体要求如下：

- 针对审批模块的核心功能和业务流程，列出多种理解和拆解方式，探索不同切入点和重点；
- 针对 BPM 系统的集成方式，分别考虑 REST API、消息队列、Webhook 等多种集成技术方案，分析各自优缺点和适用场景；
- 针对数据交互接口，设计多套请求方法、路径和参数方案，评估它们在安全性、易用性和性能上的表现；
- 针对审批状态同步和回调机制，提出多种同步策略和容错方案，比较它们的复杂度和可靠性；
- 针对异常处理和错误回退流程，思考多条应对路径，包含重试机制、告警策略和数据一致性保障；
- 在每个步骤的多条思路中，评估优劣、结合项目实际情况筛选最合适的方案分支；
- 最终整合各阶段的最佳方案，形成完整、清晰的集成接口规格和流程说明。

需求背景：将现有项目的审批功能集成进 BPM 系统，实现审批任务的创建、状态更新和结果同步。
```
### Few-shot learning

Few-shot learning（少样本学习）是机器学习，尤其是自然语言处理（NLP）里的一种学习方式，它的核心思想是：模型只需要很少的示例，就能理解任务并做出正确的输出。

在传统机器学习中，模型通常需要大量标注数据来学习任务规律；而 Few-shot learning 假设模型已经通过大规模预训练掌握了大量通用知识，只需要给它提供几个任务示例（shots），就能快速泛化到新任务。

这里的 “shot” 就是示例的数量：

- Zero-shot：不给示例，只靠任务描述
- One-shot：只给一个示例
- Few-shot：给几个（通常 2~10 个）示例

通俗来说，好的提示词中应该包含一些示例。

例如，下面这个提示词，给了 AI 一个例子。


```
你是一名资深后端系统设计师。  
你的任务是根据给定的系统需求，生成详细的 API 规格说明，并严格遵循下面示例中的格式和风格。

=== 示例 1 ===
需求：一个用户可以通过邮箱和密码注册、登录的系统。

API 规格：
1. POST /api/register
   - 描述：创建一个新的用户账户。
   - 请求体：
     {
       "email": "string",
       "password": "string"
     }
   - 响应：
     201 Created
     {
       "user_id": "string",
       "email": "string"
     }

2. POST /api/login
   - 描述：使用邮箱和密码进行用户身份验证。
   - 请求体：
     {
       "email": "string",
       "password": "string"
     }
   - 响应：
     200 OK
     {
       "token": "string",
       "expires_in": "integer"
     }

=== 示例 2 ===
需求：一个电商系统，客户可以查看商品详情，并将商品加入购物车。

API 规格：
1. GET /api/products/{product_id}
   - 描述：获取指定商品的详细信息。
   - 参数：
     - product_id（路径参数）：商品 ID。
   - 响应：
     200 OK
     {
       "product_id": "string",
       "name": "string",
       "price": "number",
       "description": "string"
     }

2. POST /api/cart
   - 描述：将商品添加到购物车。
   - 请求体：
     {
       "product_id": "string",
       "quantity": "integer"
     }
   - 响应：
     200 OK
     {
       "cart_id": "string",
       "total_items": "integer"
     }

=== 你的任务 ===
需求：{在这里填写你的系统需求}

```

### 使用分隔符

使用分隔符可以让提示词变得更有结构化一些，例如使用三重引号、XML标签、章节标题等分隔符可以帮助划分文本的不同部分，便于 AI 更好地理解，以便进行不同的处理。

下面这个提示词就是结构化的提示词，而不是线性的语句：

```
根据下面 SQL 模版和订单表字段，生成订单表的 DDL。

<sql-template>
CREATE TABLE table_name (
    id INT PRIMARY KEY AUTO_INCREMENT,
    column_name1 VARCHAR(255) NOT NULL,
    column_name2 INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
</sql-template>

订单字段：

<fields>
    订单ID
    用户ID
    订单状态（如：待支付、已支付、已发货、已完成、已取消）
    总金额
    支付方式（如：微信、支付宝、信用卡）
    支付状态（如：未支付、已支付、退款中）
    收货地址
    账单地址
    创建时间
    更新时间
    发货时间
    送达时间
    取消时间
    备注（可存储特殊说明、客户留言等）
</fields>

```

### 提示词增强

在书写提示词之前，先套一个优化模版。

```
“在处理下面的任务之前，先分析指令模糊的地方，并和我确认，是否需要我提供更多的上下文信息。
根据我的输入优化指令，并写入文档中，我可以反复提问，直到问题清晰无误。

任务指令如下：

帮我编写一个可以自动下载 Youtube 视频的 SaaS 网站。
”
```

这算是网络上流传的万能提示词，除此之外很多工具也提供了现有的能力。

### 关注点分离的 Rules

在操作时，通过应用不同的 Rule 来约束 AI 的行为，让 AI 在该发挥的时候发挥，在认真执行的时候执行。

也可以把前面提示词中的一些重复内容提炼成 Rule，按需应用即可。

例如:

- 探索行为的 Rule 不应该修改任何代码库，AI 应该阅读项目代码总结可行的方案，以供备选
- 决策行为的 Rule 提供了架构决策日志的编写，决策工作有团队完成【可选】
- 设计行为的 Rule 提供了基本的技术方案设计，比如代码修改点、数据库变更、API 变更、主要逻辑流程。前后端的交付形式可能不同。
- 编码行为的 Rule 严格执行前面的设计行为，不要自我发挥。

```md

Rule: Discovery
================

Goal
----
Understand the problem space and explore potential solutions before any design or coding begins.

Guidelines
----------
1. Clarify the business goal, constraints, and success criteria in plain Chinese.
2. Read existing code and documentation to identify reusable components and gaps.
3. Brain-storm at least two viable technical approaches and list pros / cons / risks for each.
4. Surface unknowns, external dependencies, or stakeholder questions that require follow-up.
5. Deliverable: a concise **Discovery Note** summarising requirements, explored options, open questions, and next actions.
6. No need any implementation.

```

```md
Rule: Decision
===============

Goal
----
Make informed architectural or implementation choices and document the rationale.

Guidelines
----------
1. List all considered options with objective comparison criteria (cost, effort, scalability, maintainability, etc.).
2. Highlight trade-offs, long-term implications, and areas of uncertainty.
3. Record the chosen option with a clear justification (e.g. `Chosen option → because …`).
4. Capture dissenting opinions or deferred decisions, if any, for future reference.
5. Deliverable: a **Decision Log** entry containing date, context, options, decision, and owner.

```

```
Rule: Design
=============

Goal
----
Define the high-level scheme (APIs, data models, module boundaries) before code implementation.

Guidelines
----------
1. Produce API contracts (end-points, request / response models, status codes).
2. Draft database schema / migration outline (tables, fields, keys, indexes).
3. Sketch module or service boundaries and public interfaces (class & method signatures).
4. Use diagrams or tables for clarity; avoid language-specific implementation details.
5. Deliverable: a **Design Spec** that reviewers can sign off prior to coding.
6. No need test case right now.
7. No need any implementation.

```

```
Rule: Coding
=============

Goal
----
Implement the approved design with production-quality, maintainable code.

Guidelines
----------
1. Follow project coding standards (naming, formatting, lint rules, commit style).
2. Implement only the functions/classes specified in the Design Spec—no feature creep.
3. Write self-documenting code; add comments only for non-obvious logic or decisions.
4. Keep functions small and pure where possible; favour composition over inheritance.
5. Add or update automated tests; ensure the entire test suite passes locally/CI.
6. Deliverable: a clean pull-request with descriptive commits, passing CI, ready for review.

```
### MCP 集成

MCP（Model Context Protocol）服务集成可以允许 AI 访问 Figma 设计、数据库等外部资源，大大提高工作效率。

配置 MCP 后，AI 可以：

- 直接读取 Figma 设计稿，自动生成组件代码
- 查询数据库结构，生成准确的 SQL 和 API
- 访问其他外部服务和工具

### 配置方法

在 Cursor 的设置中，找到 MCP 配置文件（通常在 `.cursor/settings.json` 或类似位置），添加以下配置：

```json
{
    "mcpServers": {
        "figma-developer-mcp": {
            "command": "npx",
            "args": [
                "-y",
                "figma-developer-mcp",
                "--stdio"
            ],
            "env": {
                "FIGMA_API_KEY": "your_figma_api_key_here"
            }
        },
        "mcp_server_mysql": {
          "command": "npx",
          "args": [
            "-y",
            "@benborla29/mcp-server-mysql"
          ],
          "env": {
            "MYSQL_HOST": "127.0.0.1",
            "MYSQL_PORT": "3306",
            "MYSQL_USER": "root",
            "MYSQL_PASS": "password",
            "MYSQL_DB": "enladder",
            "ALLOW_INSERT_OPERATION": "false",
            "ALLOW_UPDATE_OPERATION": "false",
            "ALLOW_DELETE_OPERATION": "false"
          }
        }
    }
}
```

## 常见的 AI 工作方法论

### RIPER-5

参考地址: https://forum.cursor.com/t/i-created-an-amazing-mode-called-riper-5-mode-fixes-claude-3-7-drastically/65516

### BMAD

“BMAD AI”／“BMAD-METHOD”（Breakthrough Method for Agile AI-Driven Development）是一种面向 AI 辅助/协同开发的新型方法论，其核心在于通过 Agent（角色型 AI） + 上下文工程（Context Engineering） 来使 AI 与人类协作地、高效地完成软件或产品开发。

全称为 Breakthrough Method for Agile AI-Driven Development，即“AI 驱动的敏捷突破方法”。

其两个关键创新点通常被强调为：

1. Agentic Planning（智能代理规划） — 让不同角色（如 Analyst、PM、Architect）由不同 AI Agent 承担，协作完成 PRD、架构设计等产物。 
2. Context-Engineered Development（上下文工程驱动开发） — 在从规划到执行阶段，保留、传递详尽的上下文，使 Dev Agent 在“拿到故事/任务”时就具备足够的语境、实现细节和约束，减少情景丢失或误解。

参考地址: https://github.com/bmad-code-org/BMAD-METHOD

### GitHub spec-kit

GitHub 的 Spec Kit 是一个由 GitHub（微软）开源的工具包／框架，用来支持 规范驱动开发（Spec-Driven Development, SDD），即将 “写规范 → 写代码” 的流程反向：让你的规范成为驱动 AI 与代码生成的“源头”，以减少 AI 在开发过程中的猜测与误用。

传统的软件开发里，规范／需求文档常常处于“指导”状态，项目做起来后常常被忽视或变成过时文档。而在 AI 辅助代码生成时代，代码代理(such as Copilot, Claude Code, Gemini) 极度依赖输入的上下文与 prompt，因此模糊的规范容易导致代码偏差或逻辑错误。 Spec Kit 的理念是：让规范成为可执行、可驱动的“第一公民”，让 AI 在清晰、结构化的规范之下去生成/校验代码。

Spec Kit 是一套 使 AI 代理编程流程“以规范为中心” 的工具集与流程标准，它提供命令行工具、模板、提示(prompt)规范、流程分阶段（specify / plan / tasks / implement）等支持。

参考地址：https://github.com/github/spec-kit

## 其他实用经验

### memory-bank

把项目的架构信息，比如目录结构，文件内容，数据库结构等，都放到 memory-bank 中，方便 AI 理解项目的上下文。

比如，对于一个微服务项目，把所有的服务放到一个目录中，然后通过一个 MD 文件定义出每个服务的目录结构。

### 技术规范

在项目中使用一个专用的种子项目，作为技术规范，比如拿一个 spike 专用的微服务，把所有的技术规范都放到这个项目中，包括代码示例，提供给 AI 抄写代码。

比如 DDD 的分层调用关系。

## 不同的 AI IDE 使用体验

TODO 

## 不同模型之间的差别

- grok-fast-1 不用 VPN
- sonnet 
- 03

如何写出跨模型一致性的提示词，先定义角色很重要。


## 心得

软件开发的本质是一个学习的过程，把业务知识用形式化的代码固化下来。

所以在软件开发的过程中需要通过“规格 or 模型 or 文档”来描述知识，我们无法在一开始把所有的精确的需求给出来，

规格驱动的意义是不同收敛问题和决策，并用更低的成本纠正方向。