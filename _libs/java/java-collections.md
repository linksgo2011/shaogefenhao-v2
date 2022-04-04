---
title: Java 集合
date: 2021-08-11 19:18:36
categories: java 基础
sidebar: auto
permalink: /java/java-collections/
---

## 队列

java 中队列分为单项队列和双向队列

 - 单项队列 Queue 接口
   - 队列通常 FIFO （先进先出）
   - 优先级队列和堆栈 LIFO （后进先出）
 - 双向队列 Deque (Double ended queue)
    - 是一种具有队列和栈性质的数据结构
    - 可以两头操作

ArrayDeque 是通过数组实现的双向队列。ArrayDeque不是线程安全的。 
ArrayDeque不可以存取null元素，因为系统根据某个位置是否为null来判断元素的存在。 当作为栈使用时，性能比Stack好；当作为队列使用时，性能比LinkedList好。 

常用的方法有:

### 添加元素

- addFirst(E e)在数组前面添加元素
- addLast(E e)在数组后面添加元素
- offerFirst(E e) 在数组前面添加元素，并返回是否添加成功
- offerLast(E e) 在数组后天添加元素，并返回是否添加成功

### 删除元素

removeFirst()删除第一个元素，并返回删除元素的值,如果元素为null，将抛出异常
pollFirst()删除第一个元素，并返回删除元素的值，如果元素为null，将返回null
removeLast()删除最后一个元素，并返回删除元素的值，如果为null，将抛出异常
pollLast()删除最后一个元素，并返回删除元素的值，如果为null，将返回null
removeFirstOccurrence(Object o) 删除第一次出现的指定元素
removeLastOccurrence(Object o) 删除最后一次出现的指定元素

### 获取元素
- getFirst() 获取第一个元素,如果没有将抛出异常
- getLast() 获取最后一个元素，如果没有将抛出异常
   

### 队列操作
- add(E e) 在队列尾部添加一个元素
- offer(E e) 在队列尾部添加一个元素，并返回是否成功
- remove() 删除队列中第一个元素，并返回该元素的值，如果元素为null，将抛出异常(其实底层调用的是removeFirst())
- poll()  删除队列中第一个元素，并返回该元素的值,如果元素为null，将返回null(其实调用的是pollFirst())
- element() 获取第一个元素，如果没有将抛出异常
- peek() 获取第一个元素，如果返回null
      

### 栈操作

- push(E e) 栈顶添加一个元素
- pop(E e) 移除栈顶元素,如果栈顶没有元素将抛出异常
        
### 通用操作
- size() 获取队列中元素个数
- isEmpty() 判断队列是否为空
- iterator() 迭代器，从前向后迭代
- descendingIterator() 迭代器，从后向前迭代
- contain(Object o) 判断队列中是否存在该元素
- toArray() 转成数组
- clear() 清空队列
- clone() 克隆(复制)一个新的队列

## 参考资料

- ArrayDeque类的使用详解 https://blog.csdn.net/skh2015java/article/details/74840513
