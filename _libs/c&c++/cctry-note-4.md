---
title: vc驿站视频教程笔记4 Cstring 讲解
toc: true
date: 2021-08-11 19:18:35
categories: 
  - C++
sidebar: auto
permalink: /c&c++/cctry-note-4/
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
vc++基础班[4]---CString常用操作讲解
------------------------------------------ Begin ----------------------------------------------
①、CString 类对象的初始化：
CString str;
CString str1(_T("abc"));
CString str2 = _T("defg");

TCHAR szBuf[] = _T("kkk");
CString str3(szBuf);
CString str4 = szBuf;

TCHAR *p = _T("1k2");
//TCHAR * 转换为 CString
CString str5(p);
CString str6 = p;

CString str7(str1);
CString str8 = str7;

②、字符串基本操作：
● 长度：GetLength();
CString str(_T("abc"));
int len = str.GetLength(); //len == 3

● 是否为空，即不含字符：IsEmpty();
● 清空字符串：Empty();
CString str(_T("abc"));
BOOL mEmpty = str.IsEmpty(); //mEmpty == FALSE
str.Empty();
mEmpty = str.IsEmpty(); //mEmpty == TRUE

● 转换大小写：MakeUpper、MakeLower
● 转换顺序：MakeReverse
CString str(_T("Abc"));
str.MakeUpper(); //str == ABC
str.MakeLower(); //str == abc
str.MakeReverse(); //str == cba

● 字符串的连接：+、+=
CString str(_T("abc"));
str = _T("de") + str + _T("kp"); //str == deabckp
str += _T("123"); //str == deabckp123
TCHAR szBuf[] = _T("789");
str += szBuf; //str == deabckp123789

● 字符串的比较：==、!=、(<、>、<=、>= 不常用)、Compare(区分大小写)、CompareNoCase(不区分大小写)
CString str1(_T("abc"));
CString str2 = _T("aBc");
if (str1 == str2){
MessageBox(_T("str1 等于 str2"));
}else{
MessageBox(_T("str1 不等于 str2"));
}

③、字符串的查找：
Find、ReverseFind、FindOneOf 三个函数可以实现字符串的查找操作
Find 从指定位置开始查找指定的字符或者字符串，返回其位置，找不到返回 -1；
举例：
CString str(_T("abcdefg"));
int idx = str.Find(_T("cde"), 0); //idx 的值为2;

ReverseFind 从字符串末尾开始查找指定的字符，返回其位置，找不到返回 -1，虽然是从后向前查找，但是位置为从开始算起；
CString str(_T("abcdefg"));
int idx = str.ReverseFind('e'); //idx 的值为4;

FindOneOf 查找参数中给定字符串中的任意字符，返回第一次出现的位置，找不到返回 -1；
CString str(_T("abcabcd"));
int idx = str.FindOneOf(_T("cbd")); //idx 的值为1;

④、字符串的替换与删除：
Replace 替换 CString 对象中的指定的字符或者字符串，返回替换的个数，无匹配字符返回 0；
CString str(_T("abcdabc"));
int num = str.Replace('b', 'k'); //str == akcdakc, num == 2

CString str(_T("abcdabc"));
int num = str.Replace(_T("bc"), _T("kw")); //str == akwdakw, num == 2

Remove 删除 CString 对象中的指定字符，返回删除字符的个数，有多个时都会删除；
CString str(_T("abcdabcb"));
int num = str.Remove('b'); //str == acdac, num == 3

Delete 删除 CString 对象中的指定位置的字符，返回处理后的字符串长度；
CString str(_T("abcd"));
int num = str.Delete(1, 3); //str == a, num == 1

⑤、字符串的提取：
Left、Mid、Right 三个函数分别实现从 CString 对象的 左、中、右 进行字符串的提取操作；
CString str(_T("abcd"));
CString strResult = str.Left(2); //strResult == ab
strResult = str.Mid(1); //strResult == bcd
strResult = str.Mid(0, 2); //strResult == ab
strResult = str.Right(2); //strResult == cd

⑥、单个字符的修改：
GetAt、SetAt 可以获取与修改 CString 对象中的单个 TCHAR 类型字符；
[] 操作符也可以获取 CString 对象中的单个字符，但为只读的，不能进行修改；
CString str(_T("abcd"));
str.SetAt(0, 'k'); //str == kbck
TCHAR ch = str.GetAt(2); //ch == c

⑦、其他类型与 CString 对象类型的转换：
● 格式化字符串：Format 方法，实现从 int、long 等数值类型、TCHAR、TCHAR * 等类型向 CString 类型的转换；
int num = 6;
CString str;
str.Format(_T("%d"), num);

● CString 类型向 int 等数值类型、TCHAR * 类型的转换：
TCHAR *pszBuf = str.GetBuffer();
str.ReleaseBuffer();

TCHAR *p = (LPTSTR)(LPCTSTR)str;

CString str1(_T("123"));
int num = _ttoi(str1);

⑧、CString 对象的 Ansi 与 Unicode 转换：
大家可以直接使用上节课给大家讲解的方法，此外这里给大家介绍一种从 Ansi 转换到 Unicode 的隐含方法：
//当前工程环境为Unicode
CString str;
str = "abc";
char *p = "defg";
str = p;

⑨、※※※ CString 对象字符串所占用的字节数：
CString str = _T("abc");
错误的求法：sizeof(CString)、sizeof(str)
正确的求法：str.GetLength()*sizeof(TCHAR)

⑩、※※※ 当作为 TCHAR * 类型传参时，确保申请了足够用的空间，比如使用 GetModuleFileName 函数；

------------------------------------- End -------------------------------------------
