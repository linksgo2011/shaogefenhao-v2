# Java 值对象 (Value Object) 示例

在领域驱动设计（DDD）中，值对象是一个非常重要的概念。它用于描述事物的某个方面，其核心在于它的“值”，而不是它的“身份”。本文通过一个常见的电商订单金额计算场景，来对比展示使用值对象前后的代码差异。

## 场景说明

我们需要为一个订单（`Order`）计算总金额。订单可以包含多个商品，每个商品有自己的价格。我们需要将这些价格累加起来得到最终的总价。

---

## 1. 不使用值对象的实现 (Primitive Obsession)

在不使用值对象的情况下，我们通常会使用语言提供的原生类型（如 `BigDecimal`, `String`）来表示金额和货币单位。这种做法被称为“原生类型痴迷”（Primitive Obsession）。

### 伪代码示例

```java
import java.math.BigDecimal;

// 实体 (Entity)
public class Order {
    private Long id; // 实体有唯一标识
    private BigDecimal totalPrice;
    private String currency;

    public Order(String initialCurrency) {
        this.totalPrice = BigDecimal.ZERO;
        this.currency = initialCurrency;
    }

    // 添加商品价格的方法
    public void addPrice(BigDecimal amount, String currency) {
        // 1. 验证逻辑散落在业务方法中
        if (amount == null || amount.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("金额不能为负数");
        }

        // 2. 业务规则校验分散
        if (!this.currency.equals(currency)) {
            // 在实际场景中，这里可能需要进行汇率转换，逻辑会更复杂
            throw new IllegalArgumentException("货币单位不匹配，无法直接相加");
        }

        this.totalPrice = this.totalPrice.add(amount);
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public String getCurrency() {
        return currency;
    }
}

// 使用示例
public class Demo {
    public static void main(String[] args) {
        Order order = new Order("CNY");

        // 每次调用都需要传递两个独立的原生类型参数
        order.addPrice(new BigDecimal("100.50"), "CNY");
        order.addPrice(new BigDecimal("88.00"), "CNY");

        // 容易出错：如果开发人员不小心传入了错误的货币单位
        try {
            order.addPrice(new BigDecimal("50.00"), "USD");
        } catch (IllegalArgumentException e) {
            System.out.println("发生错误: " + e.getMessage());
        }

        System.out.println("订单总价: " + order.getCurrency() + " " + order.getTotalPrice());
    }
}
```

### 问题分析

1.  **概念缺失**：代码中只有 `BigDecimal` 和 `String`，而“金额”这个重要的业务概念没有被明确地建模出来。
2.  **参数繁多**：`addPrice` 方法需要接收两个参数，如果“金额”包含更多信息（如税率），参数列表会更长。
3.  **验证逻辑分散**：关于金额的验证逻辑（如非负、货币单位匹配）散布在使用它的 `Order` 类中。如果其他类也需要处理金额，这些验证逻辑就必须被复制。
4.  **可读性差**：`addPrice(amount, currency)` 不如 `addPrice(money)` 来得直观和表意清晰。

---

## 2. 使用值对象 (Money) 的实现

现在，我们引入一个 `Money` 类作为值对象，来封装金额和货币单位，并承载相关的业务逻辑。

### 值对象 `Money` 的定义

一个好的值对象通常具备以下特征：

*   **不可变性 (Immutability)**：创建后其状态不能被修改。
*   **结构相等性 (Structural Equality)**：只要所有属性的值都相等，我们就认为这两个对象相等。
*   **自我验证 (Self-validation)**：在构造时就确保其内部状态的有效性。

```java
import java.math.BigDecimal;
import java.util.Objects;

// 值对象 (Value Object)
public final class Money {
    private final BigDecimal amount;
    private final String currency;

    // 1. 自我验证：在构造时就保证了数据的有效性
    public Money(BigDecimal amount, String currency) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("金额不能为负数");
        }
        if (currency == null || currency.trim().isEmpty()) {
            throw new IllegalArgumentException("货币单位不能为空");
        }
        this.amount = amount;
        this.currency = currency;
    }

    // 2. 行为与数据结合：将业务逻辑封装在值对象内部
    public Money add(Money other) {
        if (!this.currency.equals(other.currency)) {
            throw new IllegalArgumentException("货币单位不匹配，无法相加");
        }
        // 3. 不可变性：返回一个新的 Money 对象，而不是修改自身状态
        return new Money(this.amount.add(other.amount), this.currency);
    }

    // Getters
    public BigDecimal getAmount() { return amount; }
    public String getCurrency() { return currency; }

    // 4. 结构相等性：重写 equals 和 hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Money money = (Money) o;
        return Objects.equals(amount, money.amount) &&
               Objects.equals(currency, money.currency);
    }

    @Override
    public int hashCode() {
        return Objects.hash(amount, currency);
    }

    @Override
    public String toString() {
        return currency + " " + amount;
    }
}
```

### 重构后的 `Order` 类

```java
// 实体 (Entity)
public class Order {
    private Long id;
    private Money totalPrice; // 直接使用 Money 值对象

    public Order(String initialCurrency) {
        this.totalPrice = new Money(BigDecimal.ZERO, initialCurrency);
    }

    // 方法签名更清晰，参数更少
    public void addPrice(Money priceToAdd) {
        // 所有复杂的逻辑都已封装在 Money 对象中
        this.totalPrice = this.totalPrice.add(priceToAdd);
    }

    public Money getTotalPrice() {
        return totalPrice;
    }
}

// 使用示例
public class Demo {
    public static void main(String[] args) {
        Order order = new Order("CNY");

        // 调用代码更简洁、可读性更高
        order.addPrice(new Money(new BigDecimal("100.50"), "CNY"));
        order.addPrice(new Money(new BigDecimal("88.00"), "CNY"));

        // 编译前就能发现类型不匹配，或者在 Money 内部的构造/add时早期失败
        try {
            order.addPrice(new Money(new BigDecimal("50.00"), "USD"));
        } catch (IllegalArgumentException e) {
            System.out.println("发生错误: " + e.getMessage());
        }

        System.out.println("订单总价: " + order.getTotalPrice());
    }
}
```

### 优势分析

1.  **概念明确**：`Money` 类明确地代表了“金额”这个领域概念，使代码意图更清晰。
2.  **逻辑内聚**：所有与金额相关的验证和计算逻辑（如 `add` 方法）都封装在 `Money` 类中，实现了高内聚。
3.  **代码健壮**：通过构造函数中的自我验证和方法的不可变性，`Money` 对象总是处于有效状态，减少了程序出错的可能。
4.  **可重用性**：`Money` 类可以在系统的任何需要表示金额的地方被重用。
5.  **简化实体**：`Order` 实体不再关心金额计算的细节，只负责协调业务流程，职责更单一。

---

## 3. 在数据库中存储值对象

将值对象持久化到数据库通常有两种主流方法，可以根据具体场景和技术栈进行选择。

### 方法一：属性展开为独立字段

这是最常见和推荐的方法。值对象的每个属性都映射到数据库表的独立列。

#### 数据库表结构

对于包含 `Money` 值对象的 `Order` 实体，数据库表 `orders` 可能会这样设计：

```sql
CREATE TABLE orders (
    id BIGINT PRIMARY KEY,
    -- Money 值对象的属性被展开
    total_price_amount DECIMAL(19, 4),
    total_price_currency VARCHAR(3)
    -- 其他订单字段...
);
```

#### 手动映射（以 MapStruct 为例）

在不使用 ORM 框架或希望对映射过程有更精细控制的场景下，可以使用 MapStruct 这样的映射工具来自动化 DTO（数据传输对象）与领域对象之间的转换。

**1. 定义持久化对象 (Data Object / DTO)**

这个对象直接对应数据库表的扁平结构。

```java
// 通常放在持久化层
public class OrderData {
    private Long id;
    private BigDecimal totalPriceAmount;
    private String totalPriceCurrency;

    // Getters and Setters...
}
```

**2. 创建 MapStruct 映射接口**

MapStruct 会根据这个接口的定义，在编译时自动生成实现类。

```java
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface OrderMapper {

    OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);

    // 将扁平的 OrderData 转换为包含 Money 值对象的 Order
    @Mapping(source = "totalPriceAmount", target = "totalPrice.amount")
    @Mapping(source = "totalPriceCurrency", target = "totalPrice.currency")
    Order toDomain(OrderData data);

    // 将包含 Money 值对象的 Order 转换为扁平的 OrderData
    @Mapping(source = "totalPrice.amount", target = "totalPriceAmount")
    @Mapping(source = "totalPrice.currency", target = "totalPriceCurrency")
    OrderData toData(Order domain);
}
```

**3. 在代码中使用映射**

```java
public class OrderRepository {
    // 假设有方法可以从数据库获取 OrderData
    public Order findById(Long id) {
        OrderData data = // ... 从数据库查询得到 OrderData 对象
        
        // 使用 MapStruct 进行转换
        return OrderMapper.INSTANCE.toDomain(data);
    }

    public void save(Order order) {
        // 使用 MapStruct 进行转换
        OrderData data = OrderMapper.INSTANCE.toData(order);
        
        // ... 将 OrderData 对象存入数据库
    }
}
```

通过 `@Mapping` 注解，我们清晰地声明了源对象属性（`source`）和目标对象属性（`target`）之间的对应关系，即使目标属性是嵌套在值对象内部的（如 `totalPrice.amount`），MapStruct 也能正确处理。

*   **优点**：
    *   数据库结构清晰，符合关系数据库范式。
    *   可以方便地对值对象的属性进行查询、索引和聚合。
    *   映射逻辑集中在 Mapper 接口中，类型安全且易于维护。
    *   将领域模型与持久化模型解耦，领域模型可以保持纯净，不被持久化框架的注解污染。
*   **缺点**：
    *   需要额外定义 DTO 和 Mapper 接口，增加了一些样板代码。
    *   对于复杂的嵌套映射，`@Mapping` 注解可能会变得比较多。

### 方法二：序列化为 JSON 或 XML

另一种方法是将整个值对象序列化成一个字符串（通常是 JSON 格式），并存储在数据库表的单个文本列中。

#### 数据库表结构

```sql
CREATE TABLE orders (
    id BIGINT PRIMARY KEY,
    -- 将整个 Money 对象存储为 JSON 字符串
    total_price_json TEXT,
    -- 其他订单字段...
);
```

#### ORM 映射（以 JPA/Hibernate 为例）

JPA 2.1 引入了 `@Converter`，可以自定义类型转换器来自动完成对象与 JSON 字符串之间的转换。

**1. 创建一个类型转换器**

```java
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import com.fasterxml.jackson.databind.ObjectMapper; // 假设使用 Jackson 库

@Converter(autoApply = true) // autoApply=true 会自动应用于所有 Money 类型的属性
public class MoneyConverter implements AttributeConverter<Money, String> {

    private final static ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(Money money) {
        // 将 Money 对象转换为 JSON 字符串
        try {
            return objectMapper.writeValueAsString(money);
        } catch (Exception e) {
            throw new RuntimeException("Could not convert Money to JSON", e);
        }
    }

    @Override
    public Money convertToEntityAttribute(String dbData) {
        // 将 JSON 字符串转换回 Money 对象
        try {
            return objectMapper.readValue(dbData, Money.class);
        } catch (Exception e) {
            throw new RuntimeException("Could not convert JSON to Money", e);
        }
    }
}
```

**2. 在实体中使用**

由于转换器设置了 `autoApply = true`，JPA 会自动对 `Order` 实体中的 `totalPrice` 字段生效，无需额外注解。

```java
@Entity
public class Order {
    @Id
    private Long id;

    // JPA 会自动使用 MoneyConverter 进行转换
    private Money totalPrice;

    // ...
}
```

*   **优点**：
    *   无论值对象内部结构多复杂，都只占用一个数据库字段，简化了表结构。
    *   当值对象的结构频繁变化时，可能不需要修改数据库 schema。
*   **缺点**：
    *   **查询困难**：几乎无法在数据库层面直接查询值对象的内部属性（除非使用支持 JSON 查询的数据库，如 PostgreSQL 或 MySQL 5.7+，但语法复杂且性能较低）。
    *   **可读性差**：数据库中的数据不是人类可直接阅读的。
    *   **跨语言/系统风险**：如果其他系统也需要访问此数据库，它们必须理解并能反序列化这种 JSON 结构。
