---
title: 系统设计 | 多语言设计
date: 2024-04-25 20:04:32
sidebar: auto
category: 
  - 软件架构
head:
  - - meta
    - name: keyword
      content: 多语言设计,I18N,国际化
      description: 多语言设计的方案
---


多语言设计是国际化系统设计的第一步，也是最基本的内容。很多时候，我们会认为多语言设计非常简单。 对于静态资源来说确实如此，通过加载一个语言包即可，但是对于一些动态内容而言却不太一样。

这些动态内容可能是消息通知、服务器生成的导出内容等。 这里我整理了一个完整的清单，用来指导多语言的方案设计：

- 前端文案。例如菜单、表单提示信息等。
- 错误信息。表单验证或者服务器报错信息的提示。
- 导出文件。导出 Excel 或者 PDF 文件，往往为后端生成。
- 邮件和消息通知。为用户发送通知时，也需要使用对应语言的模板文件。
- 主数据。例如在电商系统中，管理员需要为支持的语言都添加一份商品数据、商品分类等。
- 业务增量数据。在业务增量数据中，为了搜索和存档的目的，有时候需要将一些主数据持久化下来用于搜索或者查看，例如订单中，需要持久化对应的商品数据。

下面我们逐个讨论。

## 多语言的基本概念

在开始进入详细的内容之前，先了解几个基本的概念。

### 语言编码

在国际标准化组织ISO 的 639-1 标准中，每个语言都被分配了一个特定的编码。例如中文的编码为“zh”，英文的编码为“en”。除了基本的语言标准外，不同地区使用的语言还需要细分，因此拓展了使用地区的编码，最终的编码由两部分组成，由中横线连接。

如果需要表达中国大陆使用的语言，可以使用 “zh-cn”编码，如果需要表达中国台湾的语言，可以使用 “zh-tw”。通常来说，中国大陆和新加坡使用简体中文，中国香港、中国台湾使用繁体中文。

对于英文来说，英国、美国等地区的英文使用习惯不同，在必要时也可以提供不同的语言包。

### 本位语言

在多币种设计中会介绍一个本位货币的概念，在多语言中也会有一个本位语言的概念。

本位语言是指在系统设计中的通用语言，通常都会使用英语作为本位语言。本位语言作为其它语言包缺失的情况下的默认语言，也可以作为其它语言包的 key。

在动态数据处理中，默认情况下使用本位语言，在需要翻译的场景使用翻译拓展表。这样就避免了到处使用 name_en,name_zh 等和语言相关的字段。


### I18N 框架

I18N是“Internationalization（国际化）”的缩写，其中数字18代表首字母I和末字母N之间的字母数。多语言是国际化中最重要的一部分之一，在很多时候，I18N 框架往往就被当做多语言框架。

I18N 能力在主流的编程框架中都有提供。在 JavaScript 项目中，i18next 框架提供了一整套 I18N 特性，包括多语言翻译、数据格式化等内容，对于 Node.js 项目 i18next 也可以在服务端发生作用。

而对于服务器端由于前后端分离的发展，相对来说就弱的多。Spring Boot 提供了一个 MessageSource 功能，配合 Java 的 Locale 对象，可以实现翻译用户消息的能力。

## 识别和传递用户语言标识

通常来说，多语言的系统会根据优先级识别语言：

- 用户账户的用户设置。
- 用户登录后会话中的语言信息。
- 用户浏览器或者 App 的语言设置。
- 操作系统语言设置。

当用户安装浏览器时，浏览器安装程序通常会自动选择与操作系统相同的语言作为默认语言。 我们可以通过 JavaScript 的 navigator.language 属性拿到当前用户的语言。如果是应用系统本身的语言，可以在登录后调用 API 获取用户的语言设置。

识别到语言信息后，需要在前后端传递语言信息，通常的做法有：

- 使用 Header 传递，通过写入 HTTP Header 的 Accept-Language 字段。
- 使用 Query 传递，在 URL 参数上增加语言标识。

在实践中，可以将识别到的用户语言信息放到浏览器 localStorage 或者 App 的本地配置中，然后通过 Header 或者 Query 传递。另外也可以将语言信息放入用户 Session 或 Token 中，不过用户在修改语言配置后需要刷新 Session 或者重新颁发 Token。

除此之外，还有一些不常用的语言标识设置方式：

- cookie
- sessionStorage/localStorage
- navigator （这个对象也可以写入）
- htmlTag，例如 <html lang="LANGUAGE" .>
- URL path
- 子域名

为了识别复杂的语言标识场景，i18next 还提供了一个 i18next-browser-languageDetector 工具，快速识别当前用户的语言标识。


## 前端的多语言

在前端开启多语言有一个经验需要留意。我们需要为每个语言定义一个语言包，语言包往往由 key value 构成，在一些项目中，有些开发者会使用一个简短的英文字符串作为 key，并给英文也设置了一个语言包。这种实践会造成两个坏处，首先是需要额外定义一个英文语言包，另外当需要排错时，搜索关键词会变得有一点麻烦。所以，通常来说，我们会直接使用英语作为语言包的 key，这样可以减少很多工作量。

这里以 react-i18next 开启 React 项目中的多语言设置。

导入 react-i18next i18next 两个库。

> npm install react-i18next i18next --save

编写下面初始化代码，并确保被 React 入口文件导入。

```javascript
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  zh: {
    translation: {
      "Welcome to React": "欢迎使用 React"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "zh"
  });

export default i18n;
```

在组件中使用翻译：

```javascript
import React from 'react';
import { useTranslation } from 'react-i18next';

function MyComponent () {
  const { t, i18n } = useTranslation();
  return <h1>{t('Welcome to React')}</h1>
}
```

react-i18next 还提供了其它形式的翻译方式，例如组件之类的，总之来说使用 t 函数翻译文本是最简单的一种形式，也便于搜索和排错。

## 后端服务的多语言

除了前端的多语言外，后端避免不了需要使用语言标识和翻译能力， 不过应该尽量避免在后端服务使用 I18N 相关特性。 例如，对于错误信息来说，尽量通过错误码将错误信息放到前端，而不是由后端加工。

对于导出、上下游系统等场景后端，后端服务的多语言无法避免，这里以 Spring Boot 为例，演示基本的 I18N 实现。

在 Spring Boot 项目中可以添加下面配置。

```java
@Configuration
public class InternationalizationConfig {

    @Bean
    public MessageSource messageSource() {
        // 定义多语言资源位置
        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
        // 设置资源目录
        messageSource.setBasename("messages");
        messageSource.setDefaultEncoding("UTF-8");
        return messageSource;
    }

    @Bean
    public LocaleResolver localeResolver() {
        // 设置应用如何读取语言标识，这里使用了 HTTP 头信息识别语言标识
        AcceptHeaderLocaleResolver localeResolver = new AcceptHeaderLocaleResolver();
        localeResolver.setDefaultLocale(Locale.ENGLISH);
        return localeResolver;
    }
}
```

创建在 resources 目录下默认语言包: messages.properties

```properties
greeting=Hello
```

创建一个中文语言包（记得修改 IDE 的文件编码格式，包括 properties 文件的编码）：

```properties
greeting=你好
```

这样就可以在后端拿到 Locale 对象并进行翻译了：

```java
@GetMapping("/greeting")
public String getGreeting(Locale locale) {
    return messageSource.getMessage("greeting", null, locale);
}
```

通过传入合适的语言标识就能获得相应的翻译信息了。

```shell
curl -H "Accept-Language: zh" http://localhost:8080/greeting
```

拿到合适的 Locale 对象，在后端处理错误提示、通知、邮件、导出都可以完成。为 HTTP Client 编写一个 Interceptor 自动附加 Header 信息，可以把当前请求的语言标识传递到下游服务中，解决上下文传递的问题。

## 动态数据的多语言设计

动态的数据也需要翻译，这里分两种情况：

- 主数据或者基本数据，例如商品、品牌、品类等。
- 业务增量数据，或者快照数据，例如订单、预约、工单等。

这两类数据在国际化的项目中需要分开处理。

对于主数据来说，需要在不同的语言区域保持一致，因此需要为每条数据创建翻译拓展表，以**冗余表**的方式处理。 例如，对于 brand 表中有 name 字段，brand 表本身使用前面介绍的本位语，name 字段使用英语。然后拓展一张 brand_locale 表，表中放置需要翻译的字段，并增加一个 lang 字段。

对于业务增量数据来说，如果按照主数据的处理方式，会导致数据量非常大，通常来说我们通过**冗余字段，或不冗余**的方式处理。例如，订单表中产品名称可以增加一个字段，其中一个字段存储用户下单时所用的语言（本地语言），另外一个字段存储本位语言。这样的好处是满足本地用户查询、总部人员管理相关数据，并提供足够好的搜索性能。

## 参考资料

- 多语言系统搭建 https://zhuanlan.zhihu.com/p/548263662
- 多语言系统的数据库设计 https://developer.aliyun.com/article/39819
- 网址多语言设计 https://learnku.com/articles/58725
- https://howtodoinjava.com/spring-boot/rest-i18n-example/
- https://react.i18next.com/
- https://github.com/i18next/i18next-browser-languageDetector