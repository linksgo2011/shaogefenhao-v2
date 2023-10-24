---
title: 系统设计 | 对象转换方案
date: 2023-10-09 22:04:32
sidebar: auto
category: 
  - 软件架构
head:
  - - meta
    - name: keyword
      content: POJO，对象转换，冗余代码
      description: 如何轻松的转换和映射 Java 对象？
---

在 Java 项目中，对象转换是一个比较繁琐的工作，常见的转换场景有：

- 页面请求对象（Use Case Command）转领域模型实体（Entity）。
- 领域模型转换为数据库操作对象（PO）。
- 领域模块转返回给前端的结果对象（Use Case Response）。
- ……

这些对象统称为 POJOs，也就是 Plan Object Java Object 的缩写。

这一期的系统设计，聊聊如何对 POJOs 进行相互转换，以及一些技巧和心得。

## 可选方案

在我编写 Java 代码的经历中，就逃不了转换这些对象。

我用过的方案有：

- 手动转换，使用 Setter 或者 Getter，有些时候可以使用 Lombok 简化它们。
- Commons-BeanUtils：这是 Apache 的一个通用包，在很多框架中被大量使用。这个包提供了一个 BeanUtils 类，它包装了反射 API，提供了一些方便的对象转换方法。正是因为反射的原因，它不需要任何构建工具的配置，缺点是性能比较差，且功能比较简单。
- Dozer：Dozer 是一个早期的对象转换框架，提供的功能比 Commons-BeanUtils 多，但是已经停止维护和更新了。
- ModelMapper：ModelMapper 也是通过反射完成的，并通过递归相关机制，实现嵌套对象的映射，映射过程比较智能。
- MapStruct：MapStruct 在功能性上和 ModelMapper 类似，特别的地方在于它不是运行时动态完成转换，而是在编译期通过代码生成的方式实现的。

还有一些取巧的方法但是不推荐使用：

- 直接使用 Spring 框架中的 BeanUtils 类，该类和 Commons-BeanUtils 功能和实现原理类似。
- 使用 Jackson 的 ObjectMapper，通过序列化和反序列化实现转换逻辑。

总的下来，如果想要找一个对象映射转换的工具，MapStruct 是比较好的方案。原因如下：

- 编译期生成代码的方式实现，性能更好，容易 Debug，类型安全。
- 映射转换的过程非常灵活。
- 自动递归嵌套转换自动子对象。
- 可配置和干预转换过程，实在不行也可以自定义转换过程。

## Mapstruct 技巧

Mapstruct 使用比较简单，只是需要配置一下构建工具（Maven、Gradle），参考官方文档即可：https://mapstruct.org/documentation/stable/reference/html/#setup。 不过在实践上，这里整理和收集了一些使用技巧对我们可能比较有帮助（官方文档的内容非常多，使用起来并不方便）。

### 单个对象转换

Mapstruct 的典型使用方法是定义一个接口，在编译后会生成相关的实现代码，然后在 Spring Boot 项目中引用使用即可。

例如：

```Java
@Mapper
public interface CarMapper {

    @Mapping(target = "manufacturer", source = "make")
    @Mapping(target = "seatCount", source = "numberOfSeats")
    CarDto carToCarDto(Car car);

    @Mapping(target = "fullName", source = "name")
    PersonDto personToPersonDto(Person person);
}
```

默认情况下，转换会发生同名的属性不需要设置 @Mapping 注解，会自动实现转换逻辑。在生成的代码中，默认通过 Setter 来实现。如果需要通过 Builder、构造方法来完成也可以进行配置，选择不同的策略即可。

获取生成的 CarMapper 实例常用有三种方式:

1. 生成 Spring 支持的依赖注入。在 Mapper 类加上注解 @Mapper(componentModel = MappingConstants.ComponentModel.Spring) 即可实现 Spring 的依赖注入。
2. 使用单例。在接口中增加 CarMapper INSTANCE = Mappers.getMapper( CarMapper.class ) 即可。
3. 使用工厂方法获取示例对象。CarMapper mapper = Mappers.getMapper( CarMapper.class );

在项目中通常使用依赖注入的形式使用，这样和 JPA 的 Repository、Mybatis 的 Mapper 风格统一，其实这不是一个好的实践。原因在于，数据转换不应该去调用数据库、外部 API 等业务逻辑，如果通过单例引入，就可以在开发过程中避免此类操作。

不过基本的转换方式不太能满足我们的需求，例如自动嵌套转换、列表转换等。

### 列表转换

最常用的需求是需要将列表中的对象循环转换，这种场景在 Mapstruct 是自动的，在日常工作中使用非常高频。

```java
@Mapper
public interface CarMapper {
    // 可以直接使用 carsToCarDtos，在生成的代码中会自动循环调用 carToCarDto
    List<CarDto> carsToCarDtos(List<Car> cars);
    CarDto carToCarDto(Car car);
}
```

除了 List 这种集合容器之外，Set 等常见 Collection 实现都支持类似操作，甚至支持将 Map 对象转换为 Bean 对象。其实可以被迭代的集合都可以使用这个特性，一些分页对象也可以利用这个特性简化开发。

需要注意的是，在单个转换时尽量不要进行耗时操作否则会不小心引入 N+1 问题。

除了集合有这个特性之外，子对象也会被自动调用。如果有另外的一个对象的属性为类型为 Car 的对象，那么在转换时也会自动调用 carToCarDto 方法。

### 自定义转换方法

对于复杂的嵌套对象，如果当中一个子对象的转换比较麻烦，无法使用注解映射转换，可以在接口中实现一个自定义的方法。

```java
@Mapper
public interface CarMapper {

    @Mapping(...)
    ...
    CarDto carToCarDto(Car car);

    default PersonDto personToPersonDto(Person person) {
        //自定义实现的方法也会被其它转换方法调用
    }
}
```

### 命名转换

嵌套的自动转换是根据类型来定位需要的方法，在大多数场景下都能满足需求。有一些场景，例如将时间转换为字符串，可能在不同的场景下有不同的格式化方法。

那么可以给多个转换方法定义不同的名称，并在属性映射时使用即可。

```java
@Named("TIME_TO_DATE_STRING")
default String timeToDateString(LocalDateTime time) {
// 格式化为日期字符串
}

@Named("TIME_TO_TIME_STRING")
default String timeToTimeString(LocalDateTime time) {
// 格式化为时间字符串
}
```

例如，需要将对象的创建时间转换为创建日期字符串，以便输出给前端。

```Java
@Mapping( target = "createdDate", source = "createdTime" , qualifiedByName = "TIME_TO_DATE_STRING")
CarDto carToCarDto(Car car);
```

### 自动通用转换

如果一些转换逻辑被重复使用，我们也可以编写一个类，通过 @Mapper uses 属性注入进来，达到复用的作用。

在任意一个 Mapper 接口上使用注解：

```java
@Mapper(uses = CommonMapperMethod.class)
```
然后在 CommonMapperMethod 中定义一些方法，这些方法就会被 Mapper 生成的代码引用，比较常用的场景是将系统中的字典数据转换为实体。

例如，将对象中的币种ID，转换为完整的币种对象。

```java

public class CommonMapperMethod {
     @Named("TO_CURRENCCY_ENTITY")
     public Currency toCurrencyEntity(String currencyId) {
         return // 从币种字典中获取币种对象
     }
}
```

这样如果对象上有 currencyId 就可以比较方便的转换为 Currency 对象，而无需多次编写。

```java
@Mapping( target = "currency", source = "currencyId" , qualifiedByName = "TO_CURRENCCY_ENTITY")
CarDto carToCarDto(Car car);
```

## 使用表达式转换

有些场景下，需要对某些属性执行额外的操作，但是设计多个字段。这样使用命名转换就不太方面。那么还可以使用表达式转换。

例如，使用 Java 表达式将人的姓名拼接到一起。

```java
@Mapper
public interface UserMapper {
    @Mapping(target = "fullName",
    expression = "java(user.getfirstName() + user.getLastName())")
    UserResponse toUserResponse(User user);
}
```

在使用表达式的时候如果需要引入一些通用的工具类，可以用 @Mapper 的 imports 属性引入一个包含静态方法的工具类即可，这样相关的工具类也会出现在生成的代码 import 语句中。

使用表达式转换可以实现更多有用的功能，但是维护性比较差，建议谨慎使用。

## 参考资料

[1] https://mapstruct.org/documentation/stable/reference/html/

[2] https://stackoverflow.com/questions/1432764/any-tool-for-java-object-to-object-mapping

[3] http://modelmapper.org/

[4] https://github.com/DozerMapper/dozer/

[5] https://github.com/mapstruct/mapstruct
