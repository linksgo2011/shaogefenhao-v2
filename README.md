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
