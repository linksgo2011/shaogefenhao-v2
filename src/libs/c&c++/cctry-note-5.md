---
title: vc驿站视频教程笔记 对话框
toc: true
date: 2021-08-11 19:18:35
categories: 
  - C++
sidebar: auto
permalink: /c&c++/cctry-note-5/
---



\---------------------------------------------------------------------------
VC 驿站
WwW.CcTry.CoM
多抽出一分钟时间来学习，让你的生命更加精彩！
C、C++、VC++ 各种学习资源，免费教程，期待您的加入！
动画教程只是起到技术交流的作用，请大家不用利用此方法做非法用途.
由此动画造成的任何后果和动画作者及本站无关.
\----------------------------------------------------------------------------------------
大家好，我是Syc
今天给大家做的教程是：
vc++基础班[5]---模态与非模态对话框
------------------------------------------ Begin ----------------------------------------------
①、模态对话框与非模态对话框的区别：
具体见演示！

②、新对话框资源的添加及相关类的绑定：

③、模态对话框的创建：CDialog::DoModal
④、非模态对话框的创建：CDialog::Create
堆中申请内存：new、malloc
静态存储区域：全局变量
◆ 解决一闪而过的问题，为什么模态的不会发生这种情况呢？
◆ 解决重复创建的问题；

⑤、对话框的初始化工作：
◆ 在 OnInitDialog() 函数中进行，如果没有的话需自己进行添加；
◆ // TODO: Add extra initialization here 提示在哪加代码就在哪加，否则会出未知的问题的！

※※※ ⑥、两个对话框之间值的传递
◆ 此对象非彼对象；
◆ 设置新对话框的初始化值，从新对话框取值；

------------------------------------- End -------------------------------------------
全局变量存储区：http://www.cctry.com/thread-18651-1-1.html