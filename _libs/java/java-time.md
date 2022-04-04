---
title: 【转载】Java 时间相关数据类型
from: https://www.jianshu.com/p/41a62f442325
date: 2021-08-11 19:18:36
categories: java 基础
sidebar: auto
permalink: /java/java-time/
---

### Date

Java8之前java.util 包提供了 Date 类来封装当前的日期和时间，Date 类提供两个构造函数来实例化 Date 对象。



```tsx
 public Date() 
 public Date(long date) 
```

包含时间比较，获取时间的毫秒数等方法

### LocalDate

Java8用LocalDate取代Date，原因是Date实在是太难用了。

1. Date月份从0开始，一月是0，十二月是11，LocalDate月份和星期都改成了enum。
2. Date和SimpleDateFormatter都不是线程安全的，而LocalDate和LocalTime和最基本的String一样，是不变类型，不但线程安全，而且不能修改。
3. Date是一个“万能接口”，它包含日期、时间，还有毫秒数。在新的Java 8中，日期和时间被明确划分为LocalDate和LocalTime，当然，LocalDateTime才能同时包含日期和时间。
    取当前日期：



```undefined
LocalDate today = LocalDate.now(); 
```

根据年月日取日期：



```undefined
LocalDate crischristmas = LocalDate.of(2018, 12, 25);
```

根据字符串取日期：



```bash
LocalDate endOfFeb = LocalDate.parse("2018-02-28"); 
```

Date和LocalDate互转:



```csharp
public static LocalDate dateToLocalDate(Date d) {
        Instant instant = d.toInstant();
        LocalDateTime localDateTime = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
        return localDateTime.toLocalDate();
    }

public static Date localDateToDate(LocalDate localDate) {
        Instant instant = localDate.atStartOfDay().atZone( ZoneId.systemDefault()).toInstant();
        return Date.from(instant);
    }
```

### LocalTime

LocalTime包含毫秒：



```cpp
LocalTime now = LocalTime.now(); // 11:09:09.240
```

清除毫秒：



```cpp
LocalTime now = LocalTime.now().withNano(0)); // 11:09:09
```

构造时间：



```cpp
LocalTime zero = LocalTime.of(0, 0, 0); // 00:00:00

//时间也是按照ISO格式识别，但可以识别以下3种格式：
//12:00
//12:01:02
//12:01:02.345
LocalTime mid = LocalTime.parse("12:00:00"); // 12:00:00
```

Date和LocalTime互转:



```cpp
public static LocalTime dateToLocalTime(Date d) {
        Instant instant = d.toInstant();
        LocalDateTime localDateTime = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
        return localDateTime.toLocalTime();
    }
```

### LocalDateTime

LocalDateTime类是LocalDate和LocalTime的结合体，可以通过of()方法直接创建，也可以调用LocalDate的atTime()方法或LocalTime的atDate()方法将LocalDate或LocalTime合并成一个LocalDateTime：



```undefined
LocalDateTime ldt1 = LocalDateTime.of(2017, Month.JANUARY, 4, 17, 23, 52);
LocalDate localDate = LocalDate.of(2017, Month.JANUARY, 4);
LocalTime localTime = LocalTime.of(17, 23, 52);
LocalDateTime ldt2 = localDate.atTime(localTime);
```

LocalDateTime也提供用于向LocalDate和LocalTime的转化：



```undefined
LocalDate date = ldt1.toLocalDate();
LocalTime time = ldt1.toLocalTime();
```

Date和LocalDateTime互转:



```csharp
public static Date localDateTimeToDate(LocalDateTime localDateTime) {
        Instant instant = localDateTime.atZone(ZoneId.systemDefault()).toInstant();
        return Date.from(instant);
    }

public static LocalDateTime dateToLocalDateTime(Date d) {
        Instant instant = d.toInstant();
        LocalDateTime localDateTime = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
        return localDateTime;
    }
```

### JDBC

最新JDBC映射将把数据库的日期类型和Java 8的新类型关联起来：



```rust
SQL -> Java
--------------------------
date -> LocalDate
time -> LocalTime
timestamp -> LocalDateTime
```

### Instant

Instant用于表示一个时间戳，可以精确到纳秒（Nano-Second）。
 创建方法：



```undefined
Instant now = Instant.now();
Instant instant = Instant.ofEpochSecond(120, 100000);
```

### Duration

Duration的内部实现与Instant类似，也是包含两部分：seconds表示秒，nanos表示纳秒。两者的区别是Instant用于表示一个时间戳（或者说是一个时间点），而Duration表示一个时间段。可以通过Duration.between()方法创建Duration对象：



```csharp
LocalDateTime from = LocalDateTime.of(2019, Month.JANUARY, 5, 10, 7, 0);    // 2017-01-05 10:07:00
LocalDateTime to = LocalDateTime.of(2019, Month.FEBRUARY, 5, 10, 7, 0);     // 2017-02-05 10:07:00
Duration duration = Duration.between(from, to);     // 表示从 2017-01-05 10:07:00 到 2017-02-05 10:07:00 这段时间

long days = duration.toDays();              // 这段时间的总天数
long hours = duration.toHours();            // 这段时间的小时数
long minutes = duration.toMinutes();        // 这段时间的分钟数
long seconds = duration.getSeconds();       // 这段时间的秒数
long milliSeconds = duration.toMillis();    // 这段时间的毫秒数
long nanoSeconds = duration.toNanos();      // 这段时间的纳秒数
```

### Period

Period在概念上和Duration类似，区别在于Period是以年月日来衡量一个时间段，比如2年3个月6天：



```cpp
Period period = Period.of(2, 3, 6);

// 2017-01-05 到 2017-02-05 这段时间
Period period = Period.between(
                LocalDate.of(2019, 1, 5),
                LocalDate.of(2019, 2, 5));
```

### 时区

ZoneId替换了原有的TimeZone。
 初始化方法：



```bash
ZoneId shanghaiZoneId = ZoneId.of("Asia/Shanghai");
ZoneId systemZoneId = ZoneId.systemDefault();
```

of()方法接收一个“区域/城市”的字符串作为参数，你可以通过getAvailableZoneIds()方法获取所有合法的“区域/城市”字符串：



```dart
Set<String> zoneIds = ZoneId.getAvailableZoneIds();
```

对于老的时区类TimeZone，Java 8也提供了转化方法：



```undefined
ZoneId oldToNewZoneId = TimeZone.getDefault().toZoneId();
```

### ZonedDateTime

ZonedDateTime表示一个带时区的时间。我们就可以将一个LocalDate、LocalTime或LocalDateTime对象转化为ZonedDateTime对象：



```undefined
LocalDateTime localDateTime = LocalDateTime.now();
ZonedDateTime zonedDateTime = ZonedDateTime.of(localDateTime, shanghaiZoneId);
```

另一种表示时区的方式是使用ZoneOffset，它是以当前时间和世界标准时间（UTC）/格林威治时间（GMT）的偏差来计算，例如：



```bash
ZoneOffset zoneOffset = ZoneOffset.of("+09:00");
LocalDateTime localDateTime = LocalDateTime.now();
OffsetDateTime offsetDateTime = OffsetDateTime.of(localDateTime, zoneOffset);
```

### 日期的操作和格式化

#### 增加和减少日期



```dart
LocalDate date = LocalDate.of(2017, 1, 5);          // 2017-01-05

LocalDate date1 = date.withYear(2016);              // 修改为 2016-01-05
LocalDate date2 = date.withMonth(2);                // 修改为 2017-02-05
LocalDate date3 = date.withDayOfMonth(1);           // 修改为 2017-01-01

LocalDate date4 = date.plusYears(1);                // 增加一年 2018-01-05
LocalDate date5 = date.minusMonths(2);              // 减少两个月 2016-11-05
LocalDate date6 = date.plus(5, ChronoUnit.DAYS);    // 增加5天 2017-01-10

LocalDate date7 = date.with(nextOrSame(DayOfWeek.SUNDAY));      // 返回下一个距离当前时间最近的星期日
LocalDate date9 = date.with(lastInMonth(DayOfWeek.SATURDAY));   // 返回本月最后一个星期六
```

dayOfWeekInMonth    返回同一个月中每周的第几天
 firstDayOfMonth 返回当月的第一天
 firstDayOfNextMonth 返回下月的第一天
 firstDayOfNextYear  返回下一年的第一天
 firstDayOfYear  返回本年的第一天
 firstInMonth    返回同一个月中第一个星期几
 lastDayOfMonth  返回当月的最后一天
 lastDayOfNextMonth  返回下月的最后一天
 lastDayOfNextYear   返回下一年的最后一天
 lastDayOfYear   返回本年的最后一天
 lastInMonth 返回同一个月中最后一个星期几
 next / previous 返回后一个/前一个给定的星期几
 nextOrSame / previousOrSame 返回后一个/前一个给定的星期几，如果这个值满足条件，直接返回

#### 格式化日期

新的日期API中提供了一个DateTimeFormatter类用于处理日期格式化操作，它被包含在java.time.format包中，Java 8的日期类有一个format()方法用于将日期格式化为字符串，该方法接收一个DateTimeFormatter类型参数：



```dart
LocalDateTime dateTime = LocalDateTime.now();
String strDate1 = dateTime.format(DateTimeFormatter.BASIC_ISO_DATE);    // 20170105
String strDate2 = dateTime.format(DateTimeFormatter.ISO_LOCAL_DATE);    // 2017-01-05
String strDate3 = dateTime.format(DateTimeFormatter.ISO_LOCAL_TIME);    // 14:20:16.998
String strDate4 = dateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));   // 2017-01-05
String strDate5 = dateTime.format(DateTimeFormatter.ofPattern("今天是：YYYY年 MMMM DD日 E", Locale.CHINESE)); // 今天是：2017年 一月 05日 星期四
```

同样，日期类也支持将一个字符串解析成一个日期对象，例如：



```dart
String strDate6 = "2017-01-05";
String strDate7 = "2017-01-05 12:30:05";

LocalDate date = LocalDate.parse(strDate6, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
LocalDateTime dateTime1 = LocalDateTime.parse(strDate7, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
```

总结：

```dart
Instant：时间戳
Duration：持续时间，时间差
LocalDate：只包含日期，比如：2016-10-20
LocalTime：只包含时间，比如：23:12:10
LocalDateTime：包含日期和时间，比如：2016-10-20 23:14:21
Period：时间段
ZoneOffset：时区偏移量，比如：+8:00
ZonedDateTime/OffsetDateTime：带时区的时间
```
