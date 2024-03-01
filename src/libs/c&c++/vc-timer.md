---
title: 定时器
toc: true
date: 2021-08-11 19:18:35
categories: 
  - C++
sidebar: auto
permalink: /c&c++/vc-timer/
---

\--------------------------------------------------------------------------
VC 驿站
WwW.CcTry.CoM
多抽出一分钟时间来学习，让你的生命更加精彩！
C、C++、VC++ 各种学习资源，免费教程，期待您的加入！
动画教程只是起到技术交流的作用，请大家不用利用此方法做非法用途.
由此动画造成的任何后果和动画作者及本站无关.
\----------------------------------------------------------------------------------------
大家好，我是Syc
今天给大家做的教程是：
vc++基础班[9]---定时器的使用
------------------------------------------ Begin ----------------------------------------------
定时器（Timer）在 Windows 的程序设计中很多地方都能用到，他的主要用途是按程序的设定间隔时间，间歇性的产生 WM_TIMER 消息，发送到指定窗口
之后，在窗口中对 WM_TIMER 消息进行处理，完成指定的任务！

①、定时器函数的讲解：
◆ 定时器启动函数：SetTimer
◆ 定时器响应函数：OnTimer
◆ 定时器结束函数：KillTimer

时间间隔范围：USER_TIMER_MINIMUM（最小值） 到 USER_TIMER_MAXIMUM（最大值）
\#define USER_TIMER_MAXIMUM 0x7FFFFFFF 毫秒
\#define USER_TIMER_MINIMUM 0x0000000A 毫秒

如果需要更精确的定时器，详见：http://www.cctry.com/thread-6536-1-1.html

②、限制定时器的响应次数；

③、利用 CStatic 控件动态显示系统时间：
◆ CStatic 控件响应消息的准备：1>ID不能是 IDC_STATIC；2> 控件属性的 Notify 设置为 True；
◆ CTime 类的简单实用；
◆ 更改 CStatic 控件的文字颜色；
if (nCtlColor == CTLCOLOR_STATIC && pWnd->GetDlgCtrlID() == IDC_SHOW){
pDC->SetTextColor(RGB(0, 0, 255));
pDC->SetBkMode(TRANSPARENT);
return CreateSolidBrush(GetSysColor(COLOR_3DFACE));
}

◆ 时间格式中有中文的情况如何处理；
\#include <locale.h>
_tsetlocale(LC_ALL, _T("chs"));
//本函数用来配置地域的信息，设置当前程序使用的本地化信息。
------------------------------------- End -------------------------------------------
