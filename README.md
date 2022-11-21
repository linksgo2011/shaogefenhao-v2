# shaogefenhao

[![Server Deployment](https://github.com/linksgo2011/shaogefenhao-v2/actions/workflows/deployment.yml/badge.svg)](https://github.com/linksgo2011/shaogefenhao-v2/actions/workflows/deployment.yml)

@少个分号的博客仓库，集成博客、学习笔记等内容。 网站地址：http://shaogefenhao.com/

## 注意事项
1. 为了方便管理图片跟随文章，如果有绘制的图片使用 xml 保存

```markdown
![名称](./xxx.png)
```

2. 知识的沉淀过程


知识流转

```text
想法 ↘       ↗ 课程
学习 →  文章 → 专栏 → 电子书 
案例 ↗        ↘ 产品
```

栏目孵化过程

```text
博客（原创文章） ↘     
知识库（非原创） →（整理）  专题（原创）→ （孵化）独立电子书 
```

3. 目录规划

文章博客类，按照 `/分类/英文路径` 设计；非文章类，案例、见闻，根据 `/case-study/英文路径`

4. 每篇内容需要输出 Keyword 和 Description 用于索引 

5. 关于内容的定义
 
- 笔记：客观的知识，尽量不增加个人的观点和立场，陈述事实，使用卡片盒笔记法，给每篇笔记总结一个恰当的标题。额外的，不同的笔记类型可以分开处理：
  - 永久笔记 Permanent Notes：经过思考和整理的内容，落入永久笔记中，用于后续翻阅。【本知识库记录这类笔记】
  - 闪念笔记 Fleeting Notes：记录到隐私的地方，收集脑中的灵感，及时思考、整理转化为正式的笔记，如果没有及时整理就不远管它。
  - 项目笔记 Project Notes：和特定项目有关，可能存在隐私问题，使用私密笔记软件记录。
- 文章：具有作者主观看法的内容。
- 专栏：具有前后联系的内容，可以看做一本小小的电子书。
- 书：具有一套完整体系的内容。
