---
title: 系统设计 | 如何管理应用系统中的配置？
date: 2023-05-14 12:04:32
sidebar: auto
category: 
  - 软件架构
head:
  - - meta
    - name: keyword
      content: 配置管理
      description: 应用系统中不同类型的配置应该如何处理？
---

当一个应用系统演变地非常大时，配置会变得非常混乱。

有一些业务配置在数据库的配置表中，有一些又在配置中心，其它一些可能又在前端。

如何管理这些配置呢？我把项目上的一次技术例会整理出来如下。

首先配置管理需要考虑的一些问题和原则有：

- 安全：配置可靠，不容易丢失配置导致不同环境逻辑出现差异，进而造成线上事故。
- 透明：方便查找，当业务人员需要调查逻辑问题时，能快速找出配置。
- 成本：不需要太多时间在不同环境的配置，以及时刻注意它们的差异。

经过分析，我们把常见的配置分为如下几类，并考虑其处理方式：

- 通用应用程序配置：技术配置。例如端口号，数据库连接等和业务无关的配置。需要将其放到 application.yml 中，将其构建到软件包中，该配置文件不应该掺杂和环境有关的信息
- 环境应用配置：和环境相关的通用配置信息。例如，开发环境和测试环境的数据库连接地址，应该存放到配置中心，环境相关信息如果存在密码凭证，需要加密处理
- 通用业务规则：和技术无关的业务规则。例如，用户注册时的密码强度。这部分配置，前后端可能都会使用，我们需要想办法通过 API 将这些配置传递给前端。
- 用户或者管理员需要维护的基础数据：例如行业、行政区划，这些视为系统资源使用，可能需要提供管理界面维护。

将这些配置分类后，为了避免通用业务规则在前后端定义两套，我们可以设计一个类似数据字典的通用接口，将后端的通用业务规则传递给前端。

基本设计思路很简单：

将通用业务规则放置到 resources/business-rules/ 目录中，约定一套配置使用一 YAML 文件保存，并通过扫描目录的方式读取文件名。

我们可以定义 RESTFul API /business-rules/{name}。 name 和业务规则名称同名。

接下来我们问下 ChatGPT 如何 实现。

问题：将一组 YAML 业务规则放到 Spring Boot 项目的资源目录下，并创建 business-rules 文件夹存放。实现一个 RESTFul API /business-rules/{name}，扫描该目录并生成同名 API，以 JSON 的形式返回相关业务规则。

生成的 Demo 项目如下：

```java
@RestController
@RequestMapping("/business-rules")
public class BusinessRulesController {

    private final ResourceLoader resourceLoader;

    @Autowired
    public BusinessRulesController(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    @GetMapping("/{name}")
    public ResponseEntity<String> getBusinessRule(@PathVariable String name) {
        try {
            String ruleFileName = name + ".yaml";
            Resource resource = resourceLoader.getResource("classpath:business-rules/" + ruleFileName);
            if (resource.exists()) {
                String content = new String(Files.readAllBytes(Paths.get(resource.getURI())), StandardCharsets.UTF_8);
                return ResponseEntity.ok().body(content);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error reading business rule");
        }
    }
}
```

其生成的代码质量还不错，只是少了一步将 YAML 文件转换为 JSON 形式。一般可以通过 Spring 的 Properties 来实现，先将 YAML 转换为 Property，再输出为对象；也可以直接使用序列化工具直接将 YAML 文件翻译为 JSON。

如果需要在 Java 中使用这些配置，可以考虑前者，如果不需要可以直接使用后者，性能更高。

我们可以再次问 ChatGPT，将 YAML 文件转换为 JSON 形式。参考结果如下：

```java
 // 创建ObjectMapper实例，用于读取YAML和生成JSON
ObjectMapper objectMapper = new ObjectMapper(new YAMLFactory());

// 从YAML文件中读取数据并转换为Java对象
Object yamlObject = objectMapper.readValue(new File(yamlFilePath), Object.class);

// 将Java对象转换为JSON字符串
String json = objectMapper.writeValueAsString(yamlObject);
```

也可以直接使用 YAMLMapper 实现。

```java
// 创建 YAMLMapper 实例
YAMLMapper yamlMapper = new YAMLMapper();

// 从 YAML 文件中读取数据并转换为 Java 对象
Object yamlObject = yamlMapper.readValue(new File(yamlFilePath), Object.class);

// 创建 ObjectMapper 实例用于生成 JSON
ObjectMapper objectMapper = new ObjectMapper();

// 将 Java 对象转换为 JSON 字符串
String json = objectMapper.writeValueAsString(yamlObject);
```

## 总结

整理了一个配置文件管理的表格方便在团队规约中使用。

| 数据类型     | 参考示例     | 处理方式                   |
|----------|----------|------------------------|
| 通用应用程序配置 | 端口、数据库配置 | 程序内 application.yml 文件 |
| 环境应用配置   | 数据库连接    | 配置中心配置或者凭证加密配置         |
| 通用业务规则   | 用户密码强度   | 一组程序内资源目录 YAML 文件      |
| 需维护基础数据  | 行政区划     | 数据库存储，专用 API 返回        |
