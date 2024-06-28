---
title: 系统设计 | 如何生成 PDF？
date: 2024-06-27 17:48:32
sidebar: auto
category: 
  - 软件架构
head:
  - - meta
    - name: keyword
      content: 如何导出 PDF？
      description: 一种导出 PDF 的方案，有用可以收藏。
---

如果遇到需要导出 PDF 的场景应该如何实现？这个问题在大多数应用中都会出现，所以今天把用过的一些方案整理一下，如果有更好的方案欢迎留言补充。

PS: 大家可能会觉得公众号上的内容比较简单入门，这里想解释一下在公众号上发布文章的意义。在几年前我也喜欢参加大会，听一些“高级”的内容，但是回来后发现对干活帮助不大。尝试转变思维，发现我们遇到的问题都是可以拆解成更小、更具体的方案，随着这些方案的逐渐积累，把这些小的地方做好，已经能让架构变得非常清晰、整洁。所以我组织了研讨会，提取各个公司对这些小问题上的问题、场景和经验，对这两年的工作帮助非常大。

## 01 常见的几个做法

其实导出 PDF 的方案非常多，不过这些方案很难有比较完美的做法，我把业界几种方案都整理下来，并选了一个比较通用的方案做了实现。

### iText

iText 是一个非常不错的库，可以通过模版的方式实现 PDF 导出，支持 XML/HTML/PDF等模版。

比较有吸引力的是 PDF 模版，PDF 提供了一种表单机制来作为模版使用非常方便。这样可以用 PDF 编辑器实现模版，再用 Java 填充相关字段信息，在很多场景下非常方便。

不过从 iText 5 开始就收费了，iText 提供了商业许可和 AGPL（Affero General Public License）许可，如果软件需要分发，使用了 iText 5 也需要对开发的软件进行开源。

除了通过模版生成 PDF，它的套件还提供了合并文件、优化、擦除等功能。 如果不差钱，iText 是解决 PDF 生成最好的选择。

### Apache PDFBox

Apache PDFBox 是一个开源的 Java 基础库，用于处理 PDF 文档。单独使用 Apache PDFBox 自己编写大量代码，所以可以被用于内容比较简单的情况。

用 PDFBox 的原因也往往是为了处理 PDF，而不是生成 PDF，例如编辑、分割 PDF 文件，从 PDF 文件中提取资源之类的操作 PDFBox 是最好的选择之一。

后面会介绍一种结合 PDFBox 实现 HTML 导出 PDF 的方案。

### JasperReports

其实是 JasperReports 是一个很大的报表库，用于生成复杂的报表和文档。它可以从各种数据源获取数据，生成 PDF、HTML、Excel 等多种格式的报表。

用来生成 PDF 会有点复杂，可以生成其它的报表类型。还支持图表、子报表这些，对于仅仅需要导出 PDF 来说有点庞大，但是如果确实需要这套东西的场景来说可以选择 JasperReports。

使用 JasperReports 学习成本稍微有点高。

### 无头浏览器截屏

这个方案有点骚，这个方案的思路是搭建一个无头浏览器的服务，可以对任何网页进行访问并截图，生成 PDF。

一般我们会使用 Puppeteer 这个 Node.js 的库，通过搭建一个 Node.js 服务来访问需要导出的页面，相关页面需要配置一些权限、用于打印的排版格式。

这个方案看似可以一劳永逸解决导出 PDF 的问题，但是有几个非常麻烦的缺点：

1. 如何给 PDF 导出服务配置权限？
2. 相关页面需要提供一个用于导出 PDF 的样式。
3. 性能非常差，尤其是有并发的情况下。
4. 服务之间通信比较麻烦，如果文件中断了需要重新导出。

好处其实也并非没有：

1. 用于处理非常炫酷的场景，其它方案不容易做出来。
2. 如果有需要截屏的场景，可以一起实现
3. 可以构建一个非常通用的服务

### HTML 渲染 + openhtmltopdf

相比之下，通过 HTML 的排版能力是一个非常不错的选择。好处在于 HTML 和 CSS 都非常简单，通过 Java 将 HTML 转换为 PDF 性能和成本也都非常低。

其思路是：

1. 先通过 HTML 模版和数据生成渲染后的 HTML 页面，HTML 引擎可以自己选
2. 使用 openhtmltopdf 库将 HTML 生成为 PDF
3. 通过插件或者自定义 Java 代码实现水印、页码、签名

这个方案比较中庸，兼具灵活性和性能的考量，所以我在这里将其视为一种通用的方案。

下面我们看看这个方案如何实现。

## 02 实现 HTML 渲染的方案

主要的实现流程如下所示：

![diagram.png](https://raw.githubusercontent.com/linksgo2011/shaogefenhao-v2/master/src/posts/architecture/export-pdf/diagram.png)

HTML 的编译过程，我们可以选择 thymeleaf 来实现，下面是一个例子：

准备一个 HTML 模版。

```html
<h1>Order Summary</h1>
<p>Order ID: <span th:text="${order.id}"></span></p>
<p>Customer Name: <span th:text="${order.customerName}"></span></p>
<p>Date: <span th:text="${order.date}"></span></p>

<h2>Items</h2>
<ul>
    <li th:each="item : ${order.items}" th:text="${item.name} + ' - Quantity: ' + ${item.quantity} + ', Price: $' + ${item.price}"></li>
</ul>

<p>Total: <span th:text="${order.total}"></span></p>
```

使用 thymeleaf 编译为 HTML 内容。

```java
TemplateEngine templateEngine = new TemplateEngine();
ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
templateResolver.setTemplateMode("HTML");
templateEngine.setTemplateResolver(templateResolver);

Context context = new Context();
context.setVariable("order", OrderFixture.buildData());
return templateEngine.process("/html-templates/order_details.html", context);

```

得到 HTML 后将其转换为 PDF 的过程，我们可以使用 openhtmltopdf 库，相关 POM 依赖如下。

```xml
<dependency>
    <groupId>org.thymeleaf</groupId>
    <artifactId>thymeleaf</artifactId>
    <version>3.0.12.RELEASE</version>
</dependency>
<dependency>
    <groupId>com.openhtmltopdf</groupId>
    <artifactId>openhtmltopdf-core</artifactId>
    <version>${openhtml.version}</version>
</dependency>
<dependency>
    <groupId>com.openhtmltopdf</groupId>
    <artifactId>openhtmltopdf-pdfbox</artifactId>
    <version>${openhtml.version}</version>
</dependency>
```

相关实现代码，其中 htmlContent 即为 HTML 字符串，下面这段代码会返回生成的 PDF 字节数组，在合适的地方输出为需要的文件或者 HTTP 返回流即可。

```java
try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream();) {
    PdfRendererBuilder builder = new PdfRendererBuilder();
    builder.useFastMode();
    builder.withHtmlContent(htmlContent, null);
    builder.toStream(outputStream);
    builder.run();
    return outputStream.toByteArray();
} catch (IOException e) {
    log.error("Fail to create pdf", e);
}
```

在 openhtmltopdf 库的帮助下，它内部也是通过 PDFBox 来渲染的，也可以通过其它PDF库来实现渲染。实现这个方案比较简单，只是有时候需要解决页码和水印的问题，下面说明一下如何解决。


### 页码问题

页码可以直接通过 HTML 和 CSS 来实现， 在 HTML 和 CSS 中添加如下两端代码。

```html
<div class='page-footer'></div>"
```

```css
.page-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
}
@page {
    @bottom-center {
        content: 'Page ' counter(page);
    }
    margin-bottom: 30px;
}
```

通过 CSS 媒体查询可以轻松实现。

### 水印的问题

水印问题稍微复杂一些，尤其是非固定的矩阵水印。比较好的方式还是在 Java 代码中实现，在生成 PDF 的过程中，编写一个自定义的 ObjectDrawerFactory，这是 openhtmltopdf 的一个拓展点。

这里是我编写的一个水印类，供参考：

```java

@AllArgsConstructor
private static class WatermarkDrawer implements FSObjectDrawer {
    private String waterMark;

    @Override
    public Map<Shape, String> drawObject(Element e, double x, double y, double width, double height, OutputDevice outputDevice, RenderingContext ctx, int dotsPerPixel) {
        outputDevice.drawWithGraphics((float) x, (float) y, (float) width / dotsPerPixel, (float) height / dotsPerPixel, (Graphics2D g2d) -> {

            double realWidth = width / dotsPerPixel;
            double realHeight = height / dotsPerPixel;

            Font font;
            try {
                InputStream fontInputStream = WatermarkDrawer.class.getResourceAsStream("/fonts/Arial.ttf");
                Font parent = Font.createFont(Font.TRUETYPE_FONT, fontInputStream);
                font = parent.deriveFont(20f);
            } catch (FontFormatException | IOException e1) {
                log.error("Fail to draw watermark", e1);
                throw new BusinessException(WRITE_FILE_FAILED);
            }
            Rectangle2D bounds = font.getStringBounds(waterMark, g2d.getFontRenderContext());

            g2d.setFont(font);
            g2d.setPaint(Color.BLACK);
            g2d.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_OVER, 0.3f));
            g2d.rotate(Math.toRadians(45));
            int margin = 100;
            int offset = 600;

            // Watermark matrix
            for (int row = 0; row < 10; row++) {
                for (int column = 0; column < 10; column++) {
                    g2d.drawString(waterMark,
                            (float) ((bounds.getWidth() + margin) * (column + 1) - offset),
                            (float) ((bounds.getHeight() + margin) * (row + 1) - offset)
                    );
                }
            }
        });

        return null;
    }
}

@AllArgsConstructor
private static class WatermarkDrawerFactory implements FSObjectDrawerFactory {
    private String waterMark;

    @Override
    public FSObjectDrawer createDrawer(Element e) {
        if (isReplacedObject(e)) {
            return new WatermarkDrawer(this.waterMark);
        }
        return null;
    }

    @Override
    public boolean isReplacedObject(Element e) {
        return e.getAttribute("type").equals("watermark");
    }
}

```

在生成 PDF 的 Java 代码中添加使用该 Factory 的代码即可。

```java
builder.useObjectDrawerFactory(new WatermarkDrawerFactory(waterMark));
```

## 03 总结

生成 PDF 的场景比较多，比如各种单据的套打和导出。有时候选择一个完美的方案需要各种尝试和调研，本文提供了一个走得通又具有较好通用性的方案，非常容易被放到项目中使用。

上述的方案还是需要根据合适的场景选择。
