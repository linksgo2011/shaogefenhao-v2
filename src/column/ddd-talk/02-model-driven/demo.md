# 业务逻辑模式与领域模型示例

本文档通过 Java 伪代码演示了三种常见的业务逻辑组织模式（事务脚本、Smart UI、领域模型）以及领域模型的三种不同实现方式（充血、贫血、涨血）。

## 1. 事务脚本、Smart UI 与领域模型

### 1.1 事务脚本 (Transaction Script)

事务脚本模式将所有业务逻辑都组织在单个过程或函数中。每个业务操作对应一个脚本，脚本负责处理从接收请求到访问数据库的所有逻辑。

**示例：创建一个订单**

```java
public class OrderService {

    public void createOrder(HttpRequest request) {
        // 1. 解析和验证输入
        String productId = request.getParameter("productId");
        int quantity = Integer.parseInt(request.getParameter("quantity"));
        if (quantity <= 0) {
            throw new InvalidArgumentException("Quantity must be positive.");
        }

        // 2. 检查库存
        ProductData product = Database.findProductById(productId);
        if (product.getStock() < quantity) {
            throw new InsufficientStockException("Not enough stock.");
        }

        // 3. 计算总价
        double price = product.getPrice();
        double totalPrice = price * quantity;

        // 4. 创建订单记录
        OrderData order = new OrderData();
        order.setProductId(productId);
        order.setQuantity(quantity);
        order.setTotalPrice(totalPrice);
        order.setStatus("CREATED");
        Database.saveOrder(order);

        // 5. 更新库存
        product.setStock(product.getStock() - quantity);
        Database.updateProduct(product);

        // 6. (可能)发送邮件、记录日志等
        EmailService.sendOrderConfirmation(order);
    }
}

// 数据传输对象 (DTO)
class OrderData {
    // getters and setters
}

class ProductData {
    // getters and setters
}
```

**特点**:
- 简单直接，易于理解。
- 逻辑集中在一个地方，但随着业务变复杂，函数会变得臃肿，难以维护。
- 容易产生重复代码。

### 1.2 Smart UI

Smart UI 模式将大量的业务逻辑放在用户界面（UI）层。后端可能只提供简单的数据存取服务。这种模式在早期的客户端/服务器（C/S）架构或一些简单的 CRUD 应用中很常见。

**示例：**
在 Smart UI 模式下，上述 `createOrder` 的大部分逻辑会由前端控件（如按钮的点击事件处理器）来编排和调用。后端可能只提供如下简单的接口：

```java
// 后端服务可能非常简单
public class ProductApi {
    public ProductData getProduct(String id) {
        return Database.findProductById(id);
    }

    public void updateProductStock(String id, int newStock) {
        // ... 更新库存
    }
}

public class OrderApi {
    public void saveOrder(OrderData order) {
        Database.saveOrder(order);
    }
}
```
前端（伪代码）:
```javascript
function onCreateOrderClick() {
    // 1. 从界面获取输入
    const productId = document.getElementById('product-id').value;
    const quantity = parseInt(document.getElementById('quantity').value);

    // 2. 验证逻辑在前端
    if (quantity <= 0) {
        alert("数量必须为正数");
        return;
    }

    // 3. 调用后端API获取数据
    const product = Api.Product.getProduct(productId);

    // 4. 业务逻辑在前端
    if (product.stock < quantity) {
        alert("库存不足");
        return;
    }
    const totalPrice = product.price * quantity;

    // 5. 准备数据并调用后端保存
    const order = { productId, quantity, totalPrice, status: 'CREATED' };
    Api.Order.saveOrder(order);

    // 6. 更新库存
    Api.Product.updateProductStock(productId, product.stock - quantity);

    // 7. 更新UI
    alert("订单创建成功!");
}
```

**特点**:
- 快速开发简单的应用。
- 业务逻辑分散在 UI 中，难以重用和测试。
- 使后端服务退化为“数据库的包装器”。

### 1.3 领域模型 (Domain Model)

领域模型模式通过创建一系列相互关联的对象来表示业务领域。这些对象不仅包含数据，还包含处理这些数据的业务逻辑。

**示例：**
在领域模型中，`Order` 和 `Product` 是包含业务行为的“富”对象。

```java
// 领域服务 (Application Service)
public class OrderService {
    public Order createOrder(String productId, int quantity) {
        // 1. 验证输入
        if (quantity <= 0) {
            throw new InvalidArgumentException("Quantity must be positive.");
        }

        // 2. 加载领域对象
        Product product = productRepository.findById(productId);

        // 3. 委托给领域对象执行业务逻辑
        Order order = product.createOrder(quantity);

        // 4. 持久化
        orderRepository.save(order);

        // 5. (可选) 发布领域事件
        eventPublisher.publish(new OrderCreatedEvent(order.getId()));

        return order;
    }
}

// 领域对象 (Entity)
public class Order {
    private OrderId id;
    private List<OrderItem> items;
    private Money totalPrice;
    private OrderStatus status;

    // 构造函数私有，强制通过工厂方法或聚合根创建
    private Order(...) { ... }

    // 包含计算总价的逻辑
    public void calculateTotalPrice() {
        this.totalPrice = items.stream()
                               .map(OrderItem::getPrice)
                               .reduce(Money.ZERO, Money::add);
    }

    // 其他业务方法，如 applyDiscount, cancel, ship...
}

public class Product {
    private ProductId id;
    private int stock;
    private Money price;

    // 业务方法，封装了创建订单和扣减库存的逻辑
    public Order createOrder(int quantity) {
        if (this.stock < quantity) {
            throw new InsufficientStockException("Not enough stock.");
        }
        // 扣减库存
        this.stock -= quantity;
        // 创建订单（可能通过工厂）
        return OrderFactory.createFromProduct(this, quantity);
    }
}
```

**特点**:
- 业务逻辑封装在领域对象中，高内聚，低耦合。
- 代码结构清晰，易于维护和扩展。
- 学习曲线较陡峭，需要对业务有深入的理解。

---

## 2. 充血、贫血与涨血模型

这三者是领域模型在实践中的不同表现形式。

### 2.1 贫血模型 (Anemic Domain Model)

对象只包含数据（属性和 getters/setters），没有任何业务逻辑。业务逻辑完全由外部的服务类（如 `OrderService`）处理。这实际上是事务脚本模式的一种变体，只不过使用了对象来传递数据。

**示例：**

```java
// 贫血的领域对象 (更像是数据容器)
public class Order {
    private String id;
    private String productId;
    private int quantity;
    private double totalPrice;
    private String status;

    // 只有 getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    // ... 其他 getters/setters
}

// 所有逻辑都在 Service 中
public class OrderManager {
    public void createOrder(String productId, int quantity) {
        // ... 所有逻辑都在这里，类似于事务脚本
        // 1. 检查库存
        // 2. 计算价格
        // 3. 创建 Order 对象并设置所有属性
        Order order = new Order();
        order.setProductId(productId);
        // ...
        // 4. 保存 Order
        // 5. 更新库存
    }
}
```
**解释**: `Order` 对象只是一个数据结构，它自己不知道如何计算总价或验证状态，所有操作都由 `OrderManager` 完成。

### 2.2 充血模型 (Rich Domain Model)

对象既包含数据，也包含与这些数据相关的业务逻辑。这是 Martin Fowler 所推崇的真正的领域模型。

**示例：**

```java
public class Order {
    private OrderId id;
    private List<OrderItem> items;
    private Money totalPrice;
    private OrderStatus status;

    public Order(List<OrderItem> items) {
        this.items = items;
        this.status = OrderStatus.CREATED;
        this.calculateTotalPrice(); // 创建时就计算总价
    }

    // 行为与自身状态紧密相关
    private void calculateTotalPrice() {
        this.totalPrice = items.stream()
                               .map(OrderItem::getPrice)
                               .reduce(Money.ZERO, Money::add);
    }

    public void cancel() {
        if (this.status == OrderStatus.SHIPPED) {
            throw new IllegalStateException("Cannot cancel a shipped order.");
        }
        this.status = OrderStatus.CANCELLED;
    }

    public Money getTotalPrice() {
        return this.totalPrice;
    }
}
```
**解释**: `Order` 对象封装了计算总价（`calculateTotalPrice`）和取消订单（`cancel`）的逻辑。这些逻辑直接操作 `Order` 自身的内部状态（`totalPrice`, `status`），外部调用者只需调用相应方法即可。

### 2.3 涨血模型 (Bloated Domain Model)

对象的行为超出了自身的范围，承担了本应由其他对象或服务承担的职责。这破坏了单一职责原则。

**示例：**

```java
public class Order {
    private OrderId id;
    private List<OrderItem> items;
    private Money totalPrice;
    private OrderStatus status;
    private CustomerId customerId;

    // ... 其他属性和方法

    // "涨血"的方法：包含了不属于订单核心领域的职责
    public void processPayment(PaymentGateway paymentGateway, CreditCardDetails creditCard) {
        // 职责过重：订单不应该直接与支付网关交互
        PaymentResult result = paymentGateway.charge(this.totalPrice, creditCard);
        if (result.isSuccess()) {
            this.status = OrderStatus.PAID;
        }
    }

    public void sendConfirmationEmail(EmailService emailService) {
        // 职责过重：订单不应该负责发送邮件
        String message = "Your order " + id + " has been confirmed.";
        emailService.send(customerId.getEmailAddress(), "Order Confirmation", message);
    }

    public void updateInventory(InventoryService inventoryService) {
        // 职责过重：订单不应该直接操作库存服务
        for (OrderItem item : items) {
            inventoryService.decreaseStock(item.getProductId(), item.getQuantity());
        }
    }
}
```
**解释**: `Order` 对象包含了支付、发送邮件、更新库存等行为。这些行为超出了“订单”本身的核心职责：
- **支付** 是支付领域的职责，应该由 `PaymentService` 或 `Payment` 聚合来处理。
- **发送邮件** 是通知服务的职责。
- **更新库存** 是库存领域的职责。

正确的做法是，这些操作应该由应用服务（Application Service）或领域服务（Domain Service）来协调，或者通过领域事件来解耦。例如，`OrderService` 在保存订单后，可以调用 `PaymentService` 来处理支付，或者发布一个 `OrderCreated` 事件，让 `InventoryService` 和 `NotificationService` 去监听并执行相应操作。