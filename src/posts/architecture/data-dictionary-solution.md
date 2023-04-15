---
title: 数据字典方案
date: 2023-04-15 10:29:19
sidebar: auto
category: 
  - 软件架构
head:
  - - meta
    - name: keyword
      content: 技术方案，数据字典，一周一方案
      description: 如果需要设计一个新项目的数据字典该如何设计才能使用方便维护简单？
---

## 问题分析

在应用项目中，我们总会遇到很多字典项的数据，比如类型、状态等。这些数据一般是有限个可选值，在前端可能作为 Select 控件存在，用于录入、搜索等场景。

这类数据的一般作为配置存在，怎么设计才能让前后端维护方式最低呢？

我们在团队上做了很多讨论，结合过完项目的经验把潜在方案整理如下。

## 方案枚举

假定我们经过简单的头脑风暴，可以枚举出下面的方案，再来分析其优缺点：

- 直接硬编码，前端编码到 Select 控件中，后端在代码中作为字符串出现
- 统一管理到数据库，并通过 API 输出给前端
- 放到配置中心的 YAML 文件中，并通过 API 输出给前端
- 放到 Redis 中，并通过 API 输出给前端
- 后端使用枚举，并通过 API 输出给前端

经过比较我整理了一份对比表格：

|          | 优点                                   | 缺点                                 |
| -------- | -------------------------------------- | ------------------------------------ |
| 硬编码   | 简单粗暴，不需要特别设计               | 维护困难，容易造成前后端枚举值不一致 |
| 数据库   | 灵活修改，可以不发布、不重启修改配置   | 维护困难，需要考虑每个环境的数据值   |
| 配置中心 | 维护简单，灵活修改，可以不重启修改配置 | 没有特别的缺点                       |
| Redis    | 和数据库类似                           | 维护困难，数据容易丢失               |
| 枚举类   | 简单，代码中本来也就需要使用枚举值     | 需要发布服务才能使用，枚举类可能过长 |


在实践的经验中，以上几种方案都见到过，在选择技术方案时遵守几个原则：

- **先方案枚举，避免先入为主**
- **抓主要矛盾，剔除干扰**
- **结合性价比，实用优先**

比较下来，放到数据库的实践设计过重，因为几乎用不到需要在线变更字典的情况。而放到配置中心是一种中庸的方案，既可以灵活调整维护成本也并不高。

而 Redis 的这种方案看不到特别的优点，在很多公司也不合规。

使用枚举类直接替代字符串的数据字典维护成本低，因为服务端开发本身就需要使用枚举值，这样不需要再次和字符数据字典映射。

基于枚举类的方案还可以进一步优化，通过注解标出需要作为数据字典的枚举类，或者继承一个父类，通过反射扫描出系统所有的数据字典项，并通过 API 输出给前端使用。

## 参考实现

当分析出这些技术方案后，我把这个扫描枚举类的实现方式发送给 ChatGPT，得到了一个比较满意的 Demo，经过修改就可以用到项目上了。

 ```java
@RestController
@RequestMapping("/enums")
public class EnumController {
    @GetMapping
    public List<String> getEnums() {
        List<String> result = new ArrayList<>();
        try {
            // 扫描项目中的所有类
            Reflections reflections = new Reflections("com.example");
            Set<Class<?>> classes = reflections.getTypesAnnotatedWith(MyAnnotation.class);

            for (Class<?> clazz : classes) {
                // 找到实现了 MyInterface 接口的类
                if (MyInterface.class.isAssignableFrom(clazz)) {
                    // 获取类的所有内部枚举类型
                    Class<?>[] innerClasses = clazz.getDeclaredClasses();
                    for (Class<?> innerClass : innerClasses) {
                        // 检查枚举类型是否实现了 MyInterface 接口
                        if (innerClass.isEnum() && MyInterface.class.isAssignableFrom(innerClass)) {
                            // 将枚举类型的信息添加到结果列表
                            result.add(innerClass.getName());
                        }
                    }
                }
            }
        } catch (Exception e) {
            // 处理异常
        }

        return result;
    }
}
```

## 参考资料

- https://cloud.tencent.com/developer/article/1032868
- https://bbs.huaweicloud.com/blogs/346461
- https://www.finclip.com/news/f/13948.html

