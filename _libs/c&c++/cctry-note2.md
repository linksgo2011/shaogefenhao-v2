---
title: vc驿站视频教程笔记2 ansi 和 unicode
toc: true
date: 2021-08-11 19:18:35
categories: 
  - C++
sidebar: auto
permalink: /c&c++/cctry-note2/
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
vc++基础班[2]---Ansi与Unicode
\----------------------------------------------------------------------------------------
①、Ansi与Unicode简要说明及各自的优缺点：
他们是两种字符的编码格式，Ansi=窄字节，Unicode=宽字节，Ansi用char格式表示一个字符，占用一个字节的存储空间，最多表示255个字符，
表示英文还可以，但对于中文、日文、韩文等语言来说就不够用了，所以如果你的程序是Ansi编码的话，
那么你写的中文语言的程序拿到日文、韩文等系统上面就会出现乱码。所以有了Unicode，用二个字节去表示一个字符，格式是 unsigned short，被定义成 wchar_t 格式
这样就可以表示世界上绝大多数的语言了！但有利就有弊，缺点呢？就是空间占用翻倍了，网络传输的数据量也增大了……

◆ vc++ 6.0 默认为Ansi编码，vs2005、vs2008、vs2010 等默认都是Unicode编码，当然可以进行工程的设置从而进行编码的转换，见演示！

◆ 就我个人观点：还是建议大家使用Unicode宽字节的编码格式，具体见下面：

◆ 系统提供了两种类型的 API 函数，见：user32.dll 中的 MessageBox 函数，其实 MessageBox 他只是一个宏，他对应的两个版本的函数分别为：MessageBoxA 和 MessageBoxW，你在使用的时候系统会根据是否定义了_UNICODE 宏来进行判断该使用哪个版本的函数！如果你的工程没有定义_UNICODE 宏，那么就使用窄字节的 MessageBoxA，如果定义了，那么就使用宽字节的 MessageBoxW，具体在vs2008中，右键找定义，见演示！

◆ 网摘：Windows 2000 及其以后的 Xp、2003、Vista、Win7 等系统都是使用Unicode从头进行开发的，如果调用任何一个Windows API 函数并给它传递一个 ANSI 字符串，那么系统首先要将字符串转换成Unicode，然后将Unicode字符串传递给操作系统。如果希望函数返回ANSI字符串，系统就会先将Unicode字符串转换成ANSI字符串，然后将结果返回给你的应用程序。进行这些字符串的转换需要占用系统的时间和内存。通过从头开始用Unicode来开发应用程序，就能够使你的应用程序更加高效的运行！

==================================================================

②、不同编码格式下的字符串处理及相互转化：

◆ 大家在编程时经常遇到的数据类型：
● Ansi：
char、char * 、const char *
CHAR、(PCHAR、PSTR、LPSTR)、LPCSTR

● Unicode：
wchar_t、wchar_t * 、const wchar_t *
WCHAR、(PWCHAR、PWSTR、LPWSTR)、LPCWSTR

● T 通用类型：
TCHAR、(TCHAR * 、PTCHAR、PTSTR、LPTSTR)、LPCTSTR

以上，其中：P代表指针的意思，STR代表字符串的意思，L是长指针的意思，在WIN32平台下可以忽略，C代表const常量的意思，W代表wide宽字节的意思，T大家可以理解为通用类型的意思，
就是可以根据工程中是否定义_UNICODE 宏，分别定义成不同的类型，比如：TCHAR 类型，如果工程中定义了_UNICODE 宏，那么他最终被定义成 wchar_t 类型，
如果工程中没有定义_UNICODE 宏，那么 TCHAR 被最终定义成 char 类型。

〓※※※〓 其方便性就是修改了工程的编码格式之后不用修改代码，所以还是建议大家在编写程序的时候使用通用类型！

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

◆ 字符串类型的对象的定义：
● Ansi：char *pAnsiStr = "hello";
● Unicode：wchar_t *pUnicodeStr = L"hello";
● 通用类型：TCHAR *pTStr = _T("hello"); 或者 TCHAR *pTStr = _TEXT("hello");
● 动态申请内存：TCHAR *pszBuf = new TCHAR[100];

其中，_TEXT 和 _T 是一样的，定义如下：
\#define _T(x) __T(x)
\#define _TEXT(x) __T(x)

来看看 __T 的最终定义：
\#ifdef _UNICODE
\#define __T(x) L##x
\#else
\#define __T(x) x
\#endif

其中，##为连接起来的意思。

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

◆ 常用的字符串处理函数，具体信息见MSDN：
字符串长度：
● Ansi：strlen(char *str);
● Unicode：wcslen(wchar_t *str);
● 通用函数：_tcslen(TCHAR *str);

● Ansi：int atoi(const char *str);
● Unicode：int _wtoi(const wchar_t *str);
● 通用函数：_tstoi(const TCHAR *str);

字符串拷贝：
● Ansi：strcpy(char *strDestination, const char *strSource);
● Unicode：wcscpy(wchar_t *strDestination, const wchar_t *strSource);
● 通用函数：_tcscpy(TCHAR *strDestination, const TCHAR *strSource);

以上函数不安全，在vs2003等以上版本的编译器中会有warnning警告提示，以下为安全函数（vc++6.0不支持）：
● Ansi：strcpy_s(char *strDestination, size_t numberOfElements, const char *strSource);
● Unicode：wcscpy_s(wchar_t *strDestination, size_t numberOfElements, const wchar_t *strSource);
● 通用函数：_tcscpy_s(TCHAR *strDestination, size_t numberOfElements, const TCHAR *strSource);

numberOfElements
Size of the destination string buffer. 目的缓冲区的大小，以字节为单位，不是字符！

size_t unsigned integer，在MSDN中的解释：Result of sizeof operator，也就是说 size_t 是 unsigned integer 即无符号整数。那为什么会有size_t这个类型呢？
因为不同平台的操作系统(32/64)中 int/long 等类型所占的字节并不一样，而 size_t 在不同的平台下有不同的定义。有点类似于TCHAR类型：
\#ifndef _SIZE_T_DEFINED
\#ifdef _WIN64
typedef unsigned __int64 size_t; //8个字节，64位
\#else
typedef _W64 unsigned int size_t; //4个字节，32位
\#endif
\#define _SIZE_T_DEFINED
\#endif

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

◆ Ansi 与 Unicode 字符串类型的互相转换：
上面给大家介绍的都是窄字节就是窄字节，宽字节就是宽字节，那么下面就给大家介绍下他们两个之间的转换。
在程序中还是不建议大家来回来去的进行字符串编码之间的转换，要么就都使用Ansi，要么就都使用Unicode，
但是往往有些函数只提供了窄字节版本（比如：GetProcAddress）或者只提供宽字节版本（比如：CommandLineToArgvW），
这个时候就要进行字符串编码格式的转换了。

但是，不是所有的都需要转换，有一些是不需要转换的，比如 socket 中的 send 或者 recv 函数！

● 转换用到的最根本的 API 函数：
WideCharToMultiByte 实现宽字节转换到窄字节
MultiByteToWideChar 实现窄字节转换到宽字节

WideCharToMultiByte 的代码页用来标记与新转换的字符串相关的代码页；
MultiByteToWideChar 的代码页用来标记与一个多字节字符串相关的代码页，

[1]、常用的代码页有 CP_ACP 和 CP_UTF8 两个：
使用 CP_ACP 代码页就实现了 ANSI 与 Unicode 之间的转换；--- 我们所用的！
使用 CP_UTF8 代码页就实现了 UTF-8 与 Unicode 之间的转换。

[2]、dwFlags 参数允许我们进行额外的控制，但是，一般情况下都不使用这个标志，直接传递 0 就行了。

[3]、lpDefaultChar和pfUsedDefaultChar：只有当WideCharToMultiByte函数遇到一个宽字节字符，而该字符在uCodePage参数标识的代码页中并没有它的表示法时，WideCharToMultiByte函数才使用这两个参数。如果宽字节字符不能被转换，该函数便使用lpDefaultChar参数指向的字符。如果该参数是NULL（这是大多数情况下的参数值），那么该函数使用系统的默认字符。该默认字符通常是个问号。这对于文件名来说是危险的，因为问号是个通配符。pfUsedDefaultChar参数指向一个布尔变量，如果Unicode字符串中至少有一个字符不能转换成等价多字节字符，那么函数就将该变量置为TRUE。如果所有字符均被成功地转换，那么该函数就将该变量置为FALSE。当函数返回以便检查宽字节字符串是否被成功地转换后，可以测试该变量。

● 两个转换函数的使用：
● A2W、W2A、T2A、T2W 宏的使用：


③、CString常用操作讲解

------------------------------------- End -------------------------------------------
