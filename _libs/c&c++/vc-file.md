---
title: 文件操作
toc: true
date: 2021-08-11 19:18:35
categories: 
  - C++
sidebar: auto
permalink: /c&c++/vc-file/
---

```
查找文件代码：

CString strFileTitle; 
CFileFind finder; 
BOOL bWorking = finder.FindFile("D:\\*.txt"); 
while(bWorking) 
{ 
bWorking=finder.FindNextFile(); 
//strFileTitle=finder.GetFileTitle(); //只有文件名字
//strFileTitle=finder.GetFileName(); //包含了后缀名
//strFileTitle=finder.GetFileURL(); //文件路径
strFileTitle=finder.GetRoot(); // 获取根目录

AfxMessageBox(strFileTitle);
}

文件读操作：

char sRead[10]; 
CFile mFile(_T("D:\\file.txt"),CFile::modeRead); 
if(mFile.GetLength()<10) 
return; 
mFile.Read(sRead,10);
CString k;
k.Format("%s",sRead);
AfxMessageBox(k);
mFile.Close();    
文件写操作：
CFile mFile(_T("user.txt "), CFile::modeWrite|CFile::modeCreate);
mFile.Write(sRead,2);
mFile.Flush();
mFile.Close();


CArchive方法：

写操作
CString strTemp;
CFile mFile;
mFile.Open("D:\\file1.txt",CFile::modeCreate|CFile::modeNoTruncate|CFile::modeWrite);
CArchive ar(&mFile,CArchive::store); //创建文件了
CString y="fuck you";
ar<<y;
ar.Close();
mFile.Close();
读操作：
　CFile mFile; 
　　if(mFile.Open("d:\\dd\\try.TRY",CFile::modeRead)==0) 
　　return; 
　　CArchive ar(&mFile,CArchive::load); 
　 　ar>>strTemp; 
　 ar.Close(); 
　　mFile.Close();


　如果你要进行的文件操作只是简单的读写整行的字符串，我建议你使用CStdioFile
CStdioFile mFile;
CFileException mExcept;
mFile.Open( "d:\\temp\\aa.bat", CFile::modeWrite, &mExcept); //只能打开已经存在的文件
CString string="I am a string.";
mFile.WriteString(string);
mFile.Close();


　4．临时文件的使用 

　　正规软件经常用到临时文件，你经常可以会看到C:\Windows\Temp目录下有大量的扩展名为tmp的文件，这些就是程序运行是建立的临时文件。临时文件的使用方法基本与常规文件一样，只是文件名应该调用函数GetTempFileName()获得。它的第一个参数是建立此临时文件的路径，第二个参数是建立临时文件名的前缀，第四个参数用于得到建立的临时文件名。得到此临时文件名以后，你就可以用它来建立并操作文件了，如： 
　　char szTempPath[_MAX_PATH],szTempfile[_MAX_PATH]; 
　　GetTempPath(_MAX_PATH, szTempPath); 
　　GetTempFileName(szTempPath,_T ("my_"),0,szTempfile); 
　　CFile m_tempFile(szTempfile,CFile:: modeCreate|CFile:: modeWrite); 
　　char m_char='a'; 
　　m_tempFile.Write(&m_char,2); 
　　m_tempFile.Close();

　5．文件的复制、删除等 
　　MFC中没有提供直接进行这些操作的功能，因而要使用SDK。SDK中的文件相关函数常用的有CopyFile()、CreateDirectory()、DeleteFile()、MoveFile()。它们的用法很简单，可参考MSDN


二、 解读VC++编程中的文件操作API和CFile类
在VC编程中，操作文件的方法主要有两种：利用API函数和MFC的CFile类。微软在其中封装了文件的一般操作，下面我就介绍一下如何利用这两种方法实现文件操作。

 


1．创建或打开一个文件

　　API函数CreateFile可打开和创建文件、管道、邮槽、通信服务、设备以及控制台，但是在此时只是介绍用这个函数怎么实现创建和打开一个文件。

HANDLE CreateFile(
　LPCTSTR lpFileName, // 要打开的文件名
　DWORD dwDesiredAccess, // 文件的操作属性
　DWORD dwShareMode, // 文件共享属性 
　LPSECURITY_ATTRIBUTES lpSecurityAttributes,// 文件安全特性
　DWORD dwCreationDisposition, //文件操作
　DWORD dwFlagsAndAttributes, // 文件属性
　HANDLE hTemplateFile // 如果不为零，则指定一个文件句柄。新文件将从这个文件中复制扩展属性 
);

　　文件的操作属性：如果为零，表示只允许获取与一个设备有关的信息，GENERIC_READ 表示允许对设备进行读访问；如果为 GENERIC_WRITE 表示允许对设备进行写访问（可组合使用）；

　　文件的共享属性：零表示不共享； FILE_SHARE_READ 或 FILE_SHARE_WRITE 表示允许对文件进行读/写共享访问；

　　文件的操作有：

　　 CREATE_NEW：创建文件；如文件存在则会出错
　　 CREATE_ALWAYS：创建文件，会改写前一个文件
　　 OPEN_EXISTING：文件必须已经存在。由设备提出要求
　　 OPEN_ALWAYS：如文件不存在则创建它
　　 TRUNCATE_EXISTING：将现有文件缩短为零长度

　　文件属性有：

　　 FILE_ATTRIBUTE_ARCHIVE：标记归档属性
　　 FILE_ATTRIBUTE_COMPRESSED：将文件标记为已压缩，或者标记为文件在目录中的默认压缩方式
　　 FILE_ATTRIBUTE_NORMAL：默认属性
　　 FILE_ATTRIBUTE_HIDDEN：隐藏文件或目录
　　 FILE_ATTRIBUTE_READONLY：文件为只读
　　 FILE_ATTRIBUTE_SYSTEM：文件为系统文件
　　 FILE_FLAG_WRITE_THROUGH：操作系统不得推迟对文件的写操作
　　 FILE_FLAG_OVERLAPPED：允许对文件进行重叠操作
　　 FILE_FLAG_NO_BUFFERING：禁止对文件进行缓冲处理。文件只能写入磁盘卷的扇区块
　　 FILE_FLAG_RANDOM_ACCESS：针对随机访问对文件缓冲进行优化
　　 FILE_FLAG_SEQUENTIAL_SCAN：针对连续访问对文件缓冲进行优化
　　 FILE_FLAG_DELETE_ON_CLOSE：关闭了上一次打开的句柄后，将文件删除。特别适合临时文件

　　可以组合的属性有：FILE_FLAG_WRITE_THROUGH，FILE_FLAG_OVERLAPPED，FILE_FLAG_NO_BUFFERING，FILE_FLAG_RANDOM_ACCESS，FILE_FLAG_SEQUENTIAL_SCAN，FILE_FLAG_DELETE_ON_CLOSE，FILE_FLAG_BACKUP_SEMANTICS，FILE_FLAG_POSIX_SEMANTICS，FILE_FLAG_OPEN_REPARSE_POINT，FILE_FLAG_OPEN_NO_RECALL

　　如果成功返回一个打开文件得句柄，如果调用函数之前文件存在，文件操作属性为：CREATE_ALWAYS 或 OPEN_ALWAYS，使用GetLastError函数返回的是ERROR_ALREADY_EXISTS（包括函数操作成功），如果之前函数不存在，则返回0。使用失败返回INVALID_HANDLE_VALUE，要取得更多的信息，使用GetLastError函数。

　　文件关闭用：

BOOL CloseHandle(HANDLE hObject // handle to object to close);

　　例子1、在当前目录下面创建一个文件：

HANDLE handle;
DWORD Num;
handle= ::CreateFile("new.tmp",GENERIC_READ|GENERIC_WRITE,0,NULL,OPEN_ALWAYS,
FILE_FLAG_DELETE_ON_CLOSE,NULL);
if(INVALID_HANDLE_VALUE!= handle )
{
　::SetFilePointer(handle,0,0,FILE_BEGIN);
　char Buffer[] = "这是个刚创建的文件";
　::WriteFile(handle,Buffer,sizeof(Buffer),&Num,NULL);
　ZeroMemory(Buffer,sizeof(Buffer));
　::SetFilePointer(handle,0,0,FILE_BEGIN);
　::ReadFile(handle,Buffer,sizeof(Buffer),&Num,NULL);
　MessageBox(Buffer);
　::CloseHandle(handle); 
}
　　可以改变上面的创建文件的属性和操作看下不同效果。

　　CFile创建和打开一个文件：

　　创建文件和打开文件的方法有很多种，下面简单介绍下几个构造函数：

CFile( LPCTSTR lpszFileName, UINT nOpenFlags );
throw( CFileException );
CFile( );
BOOL Open( LPCTSTR lpszFileName, UINT nOpenFlags, CFileException* pError = NULL );

　　lpszFileName:文件名称，可以是相对路径，绝对路径或网络路径

　　nOpenFlags：打开方式有：

　　?CFile::modeCreate 调用构造函数构造一个新文件，如果文件已存在，则长度变成0。

　　?CFile::modeNoTruncate 此值与modeCreate组合使用。如果所创建的文件已存在则其长度不变为0。因而此文件被打开，或者作为一个新文件或者作为一个已存在的文件。这将是很有用的，例如当打开一个可能存在也可能不存在的文件时。

　　?CFile::modeRead 打开文件仅供读。

　　?CFile::modeReadWrite 打开文件供读写。

　　?CFile::modeWrite 打开文件仅供写。

　　?CFile::modeNoInherit 阻止文件被子进程继承。

　　?CFile::ShareDenyNone 不禁止其它进程读或写访问，打开文件。如果文件已被其它进程以兼容模式打开，则Create失败。

　　?CFile::ShareDenyRead 打开文件，禁止其它进程读此文件。如果文件已被其它进程以兼容模式打开，或被其它进程读，则Create失败。

　　?CFile::ShareDenyWrite 打开文件，禁止其它进程写此文件。如果文件已被其它进程以兼容模式打开，或被其它进程写，则Create失败。

　　?CFile::ShareExclusive 以独占模式打开文件，禁止其它进程对文件的读写。如果文件已经以其它模式打开读写（即使被当前进程），则构造失败。

　　 CFile::ShareCompat 此标志在32位MFC中无效。此标志在使用CFile:: Open时映射为CFile::ShareExclusive。

　　 CFile::typeText 对回车换行设置特殊进程（仅用于派生类）。

　　 CFile::typeBinary 设置二进制模式（仅用于派生类）。

　　下面给出MSDN中的一个例子：

char* pFileName = "test.dat";
TRY
{
　CFile f( pFileName, CFile::modeCreate | CFile::modeWrite );
}
CATCH( CFileException, e )
{
　#ifdef _DEBUG
　　afxDump << "File could not be opened " << e->m_cause << "\n";
　#endif
}
END_CATCH 
CFile fileTest;
char* pFileName = "test.dat";
TRY
{
　fileTest.Open(pFileName, CFile::modeCreate |CFile::modeWrite);
}
CATCH_ALL(e)
{
　fileTest.Abort( );
　THROW_LAST ( );
}
END_CATCH_ALL


2．文件的读写定位

　　定位文件中的数据是很重要的，这决定了写入的数据在文件中的位置。API函数

DWORD SetFilePointer(
　HANDLE hFile, //文件的句柄
　LONG lDistanceToMove, //字节偏移量r
　PLONG lpDistanceToMoveHigh, //指定一个长整数变量，其中包含了要使用的一个高双字偏移（一般用来操作大型文件）。可设为零，表示只使用lDistanceToMove 
　DWORD dwMoveMethod //文件定位
);

　　dwMoveMethod文件定位的方式有三种：

　　 FILE_BEGIN：从文件开始处。

　　 FILE_CURRENT：从当前位置。

　　 FILE_END：从文件的末尾。

　　此函数可以用来定位大型文件，lpDistanceToMoveHigh是高32位，lDistanceToMove是低32位。如果lpDistanceToMoveHigh为NULL时，函数操作成功，返回的是当前文件数据的偏移量，如果lpDistanceToMoveHigh不NULL，则返回数据的偏移量高32位放在 lpDistanceToMoveHigh中，函数调用失败返回的是0xffffffff.

BOOL SetEndOfFile(HANDLE hFile //文件的句柄);

　　CFile类的文件数据定位函数有：

LONG Seek(LONG lOff,UINT nFrom);
throw(CFileException);

　　如果要求的位置合法，则Seek返回从文件开始起的新字节偏移量

　　lOff：指针移动的字节数。

　　nFrom：指针移动的模式。可以是CFile::begin，CFile::current，CFile::end
void SeekToBegin( );

　　DWORD SeekToEnd( );//返回文件长度（字节数）。

　　下面是一个读取位图文件的信息的例子：

CFile file;
BITMAPINFOHEADER bmpinfo;
try
{
　file.Open("D:\\ToolBar.bmp",CFile::modeRead);
　file.Seek(sizeof(BITMAPFILEHEADER),CFile::begin);
　file.Read(&bmpinfo,sizeof(BITMAPINFOHEADER ));
　CString str;
　str.Format("位图文件的长是%d,高%d",bmpinfo.biWidth,bmpinfo.biHeight);
　MessageBox(str);
　file.Close();
}
catch(CFileException *e)
{
　CString str;
　str.Format("读取数据失败的原因是:%d",e->m_cause);
　MessageBox("str");
　file.Abort();
　e->Delete();
}

　　读取数据：

BOOL ReadFile(
　HANDLE hFile, //文件的句柄
　LPVOID lpBuffer, //用于保存读入数据的一个缓冲区
　DWORD nNumberOfBytesToRead, //要读入的字符数
　LPDWORD lpNumberOfBytesRead, //从文件中实际读入的字符数
　LPOVERLAPPED lpOverlapped //如文件打开时指定了FILE_FLAG_OVERLAPPED，那么必须，用这个参数引用一个特殊的结构。该结构定义了一次异步读取操作。否则，应将这个参数设为NULL
);

　　CFile的成员函数有：

UINT Read (void* lpBuf,UINT nCount); 
throw(CFileException);// 返回值是传输到缓冲区的字节数。

　　写入数据：

BOOL WriteFile(
　HANDLE hFile, //文件的句柄
　LPCVOID lpBuffer, //要写入的一个数据缓冲区
　DWORD nNumberOfBytesToWrite, //要写入数据的字节数量。如写入零字节，表示什么都不写入，但会更新文件的"上一次修改时间"。
　LPDWORD lpNumberOfBytesWritten, //实际写入文件的字节数量
　LPOVERLAPPED lpOverlapped // OVERLAPPED，倘若在指FILE_FLAG_OVERLAPPED的前提下打开文件，这个参数就必须引用一个特殊的结构。该结构定义了一次异步写操作。否则，该参数应置为NULL
);
void Write(const void* lpBuf,UINT nCount);
throw (CFileException);

　　lpBuf：指向用户提供的缓冲区，包含将写入文件中的数据

　　nCount：从缓冲区内传输的字节数。对文本模式的文件，回车换行作为一个字符。

　　下面是象一个文件中写入数据的例子：

CFile file;
try
{
　file.Open("d:/my.dat",CFile::modeCreate|CFile::modeWrite);
　file.SeekToBegin();
　char Data[] = "111111111\n1111111111";
　file.Write(Data,sizeof(Data));
　file.Flush();
　file.Close();
}
catch(CFileException *e)
{
　CString str;
　str.Format("读取数据失败的原因是:%d",e->m_cause);
　MessageBox("str");
　file.Abort();
　e->Delete();
}

3．取得和设置文件的创建时间、最后访问时间、最后写时间

BOOL GetFileTime(
　HANDLE hFile, // 文件句柄
　LPFILETIME lpCreationTime, // 创建时间
　LPFILETIME lpLastAccessTime, // 最后访问时间
　LPFILETIME lpLastWriteTime // 最后写时间 
);
BOOL SetFileTime(
　HANDLE hFile, 
　CONST FILETIME *lpCreationTime, 
　CONST FILETIME *lpLastAccessTime, 
　CONST FILETIME *lpLastWriteTime 
);
typedef struct _FILETIME { 
　DWORD dwLowDateTime; 
　DWORD dwHighDateTime; 
} FILETIME;

　　取得三个参数都是FILETIME结构，得到的都是UTC时间，可以通过API函数FileTimeToLocalFileTime（）和FileTimeToSystemTime()将他们转换为本地时间和系统时间格式，也可以通过LocalFileTimeToFileTime 和SystemTimeToFileTime()转换回来，通过SetFileTime设置文件的创建时间、最后访问时间、最后写时间。由于使用的时候要先打开文件，而且取得的最后访问时间就是当前时间，没有多大意义，且比较麻烦，下面介绍CFile类中的静态方法。

static BOOL PASCAL GetStatus( LPCTSTR lpszFileName, CFileStatus& rStatus );
static void SetStatus( LPCTSTR lpszFileName, const CFileStatus& status );
throw( CFileException );

　　返回的是一个CfileStatus对象，这个结构的具体的成员变量包括：

struct CFileStatus
{
　CTime m_ctime; // 文件创建时间
　CTime m_mtime; // 文件最近一次修改时间
　CTime m_atime; // 文件最近一次访问时间
　LONG m_size; // 文件大小
　BYTE m_attribute; // 文件属性
　BYTE _m_padding; // 没有实际含义，用来增加一个字节
　TCHAR m_szFullName[_MAX_PATH]; //绝对路径
　#ifdef _DEBUG
　　//实现Dump虚拟函数，输出文件属性
　　void Dump(CDumpContext& dc) const;
　#endif
};

　　下面就举一个例子来实现：

CFileStatus status;
char *path = "D:\\VSS";
if(CFile::GetStatus( path, status ))
{
　CString cTime,mTime,aTime;
　cTime = status.m_ctime.Format("文件建立时间：%Y年%m月%d日 %H时%M分%S秒");
　mTime = status.m_mtime.Format("文件最近修改时间：%Y年%m月%d日 %H时%M分%S秒");
　aTime = status.m_atime.Format("文件最近访问时间：%Y年%m月%d日 %H时%M分%S秒");
　CString str;
　str = cTime + "\n" + mTime +"\n" + aTime ;
　MessageBox(str);

}

　　4．取得和设置文件的属性

DWORD GetFileAttributes(
　LPCTSTR lpFileName //文件或文件夹路经
);
BOOL SetFileAttributes(
　LPCTSTR lpFileName, // 文件名
　DWORD dwFileAttributes // 要设置的属性
);

　　取得的文件属性包括：FILE_ATTRIBUTE_ARCHIVE，FILE_ATTRIBUTE_HIDDEN，FILE_ATTRIBUTE_NORMAL，FILE_ATTRIBUTE_OFFLINE，FILE_ATTRIBUTE_READONLY，FILE_ATTRIBUTE_SYSTEM，FILE_ATTRIBUTE_TEMPORARY

　　不能设置的文件属性包括有：FILE_ATTRIBUTE_COMPRESSED，FILE_ATTRIBUTE_DIRECTORY，FILE_ATTRIBUTE_ENCRYPTED，FILE_ATTRIBUTE_REPARSE_POINT，FILE_ATTRIBUTE_SPARSE_FILE，FILE_ATTRIBUTE_SYSTEM。

　　CFileStatus中也定义了一组属性：

enum Attribute { 
　normal,
　readOnly,
　hidden,
　system,
　volume,
　directory,
　archive
};

　　可以通过if((status. m_attribute& readOnly) = =FILE_ATTRIBUTE_READONLY)来判断，这里利用另外的API来实现获得文件的详细信息：

HANDLE FindFirstFile(
　LPCTSTR lpFileName, //文件或文件夹路经r
　LPWIN32_FIND_DATA lpFindFileData 
);
BOOL FindNextFile(
　HANDLE hFindFile,
　LPWIN32_FIND_DATA lpFindFileData 
);
BOOL FindClose(HANDLE hFindFile );

　　取得的是一个WIN32_FIND_DATA结构;

typedef struct _WIN32_FIND_DATA {
　DWORD dwFileAttributes; //文件属性
　FILETIME ftCreationTime; // 文件创建时间
　FILETIME ftLastAccessTime; // 文件最后一次访问时间
　FILETIME ftLastWriteTime; // 文件最后一次修改时间
　DWORD nFileSizeHigh; // 文件长度高32位
　DWORD nFileSizeLow; // 文件长度低32位
　DWORD dwReserved0; // 系统保留
　DWORD dwReserved1; // 系统保留
　TCHAR cFileName[ MAX_PATH ]; // 长文件名
　TCHAR cAlternateFileName[ 14 ]; // 8.3格式文件名
} WIN32_FIND_DATA, *PWIN32_FIND_DATA;

　　也可以利用另外一个函数来取得文件的信息:

BOOL GetFileInformationByHandle(
HANDLE hFile, // 文件的句柄 
LPBY_HANDLE_FILE_INFORMATION lpFileInformation 
);

　　函数填充的是BY_HANDLE_FILE_INFORMATION结构体:

typedef struct _BY_HANDLE_FILE_INFORMATION { 
　DWORD dwFileAttributes; 
　FILETIME ftCreationTime; 
　FILETIME ftLastAccessTime; 
　FILETIME ftLastWriteTime; 
　DWORD dwVolumeSerialNumber; // 文件所在的磁盘的序列号
　DWORD nFileSizeHigh; 
　DWORD nFileSizeLow; 
　DWORD nNumberOfLinks; //链接的数目
　DWORD nFileIndexHigh; 
　DWORD nFileIndexLow; 
} BY_HANDLE_FILE_INFORMATION;

　　下面就举一个例子来实现：

HANDLE handle;
WIN32_FIND_DATA find_data;
handle = :: FindFirstFile("D:\\VSS",&find_data);
FindClose(handle);
find_data.dwFileAttributes = find_data.dwFileAttributes|FILE_ATTRIBUTE_READONLY;
::SetFileAttributes("D:\\VSS",find_data.dwFileAttributes);

　　在上面的介绍中,除了可以设置文件的属性之外，在操作的过程当中也可以取得文件的其他一些信息，可以根据具体的需要来实现。
5．获取文件名,文件类型,文件长度,文件路径

　　用利用CFile打开一个文件时,可以在利用成员函数

virtual CString GetFileName( ) const, 
virtual CString GetFileTitle( ) const, 
virtual CString GetFilePath( ) const, 
virtual DWORD GetLength( ) const;throw( CFileException );

　　来取得相关信息,如果一个文件的全路经是: c:\windows\write\myfile.wri,则每个函数取得的是: myfile.wri, myfile, c:\windows\write\myfile.wri. GetLength取得文件大小是按字节为单位的。

　　也可以利用：

virtual void SetLength( DWORD dwNewLen );throw( CFileException );
virtual void SetFilePath( LPCTSTR lpszNewName );

　　来设置文件的长度和路径。

　　在当前的文件下面新建一个Text.txt文件，在里面写点东西，然后运行下面程序：

CFile file("Text.txt",CFile::modeReadWrite);
ULONGLONG length;
CString strFilePath;
length = file.GetLength();
length = length + 1024*10;
file.SetLength(length);
file.SetFilePath("D:\\Text.txt");
strFilePath = file.GetFilePath();
MessageBox(strFilePath);
file.Close();

　　最后发现文件的路径变了，但是在D盘下面并没有找到Text.txt，原因是SetFilePath只能指定一个路径给文件，SetFilePath并不能做为移动文件来使用。

　　CFile并没有给出取得文件类型的函数，有了上面基础，这个很容易实现。

　　API函数中也有获得文件路径的操作，这里只是做简单介绍，可以参照MSDNN的说明：GetFileSize可以获得文件的大小，GetFullPathName 函数获取文件的完整路径名，只有当该文件在当前目录下，结果才正确。GetModuleFileName函数获取文件的完整路径名，这些函数有些用到文件句柄的。

　　用CFileDialog打开的文件,可以使用它的成员变量m_ofn,或者成员函数GetFileName, GetFileTitle, GetFilePath, GetFileExt来取得相关信息.

CFileDialog( BOOL bOpenFileDialog, LPCTSTR lpszDefExt = NULL, LPCTSTR lpszFileName = NULL, DWORD dwFlags = OFN_HIDEREADONLY | OFN_OVERWRITEPROMPT, LPCTSTR lpszFilter = NULL, CWnd* pParentWnd = NULL );

　　各个参数如下：

　　?bOpenFileDialog 为TRUE为打开对话框，为FALSE为保存对话文件对话框

　　?lpszDefExt 指定默认的文件扩展名。

　　?lpszFileName 指定默认的文件名。

　　?dwFlags 指明一些特定风格。

　　?lpszFilter它指明可供选择的文件类型和相应的扩展名。参数格式如：

　　"Chart Files (*.xlc)|*.xlc|Worksheet Files (*.xls)|*.xls|Data Files (*.xlc;*.xls)|*.xlc; *.xls|All Files (*.*)|*.*||";文件类型说明和扩展名间用 | 分隔，同种类型文件的扩展名间可以用 ; 分割，每种文件类型间用 | 分隔，末尾用 || 指明。

　　pParentWnd 为父窗口指针

CString FileFilter = "所有文件(*.*)|*.*||";
CFileDialog FileDialog(true,NULL,NULL,OFN_HIDEREADONLY,FileFilter,NULL);
FileDialog.DoModal();
MessageBox(FileDialog.GetFileName());


四、 介绍几个操作文件的API函数

在VC中,大多数情况对文件的操作都使用系统提供的 API 函数，但有的函数我们不是很熟悉，以下提供一些文件操作 API 函数介绍：

一般文件操作 API

　　CreateFile
　　打开文件
　　要对文件进行读写等操作，首先必须获得文件句柄，通过该函数可以获得文件句柄，该函数是通向文件世界的大门。

　　ReadFile
　　从文件中读取字节信息。 
　　在打开文件获得了文件句柄之后，则可以通过该函数读取数据。

　　WriteFile 
　　向文件写入字节信息。 
　　同样可以将文件句柄传给该函数，从而实现对文件数据的写入。

　　CloseHandle 
　　关闭文件句柄。 
　　打开门之后，自然要记得关上。

　　GetFileTime 
　　获取文件时间。 
　　有三个文件时间可供获取：创建时间、最后访问时间、最后写时间。 
　　该函数同样需要文件句柄作为入口参数。

　　GetFileSize 
　　获取文件大小。 
　　由于文件大小可以高达上数G（1G需要30位），因此一个32位的双字节类型无法对其精确表达，因此返回码表示低32位，还有一个出口参数可以传出高32位。 
　　该函数同样需要文件句柄作为入口参数。

　　GetFileAttributes 
　　获取文件属性。 
　　可以获取文件的存档、只读、系统、隐藏等属性。 
　　该函数只需一个文件路径作为参数。

　　SetFileAttributes 
　　设置文件属性。 
　　能获取，自然也应该能设置。 
　　可以设置文件的存档、只读、系统、隐藏等属性。 
　　该函数只需一个文件路径作为参数。

GetFileInformationByHandle 
　　获取所有文件信息 
　　该函数能够获取上面所有函数所能够获取的信息，如大小、属性等，同时还包括一些其他地方无法获取的信息，比如：文件卷标、索引和链接信息。 
　　该函数需要文件句柄作为入口参数。

　　GetFullPathName 
　　获取文件路径，该函数获取文件的完整路径名。
　　需要提醒的是：只有当该文件在当前目录下，结果才正确。如果要得到真正的路径。应该用GetModuleFileName函数。

　　CopyFile 
　　复制文件 
　　注意：只能复制文件，而不能复制目录

　　MoveFileEx 
　　移动文件 
　　既可以移动文件，也可以移动目录，但不能跨越盘符。（Window2000下设置移动标志可以实现跨越盘符操作）

　　DeleteFile 
　　删除文件

　　GetTempPath 
　　获取Windows临时目录路径

　　GetTempFileName 
　　在Windows临时目录路径下创建一个唯一的临时文件

　　SetFilePoint 
　　移动文件指针。 
　　该函数用于对文件进行高级读写操作时。


　　文件的锁定和解锁

　　LockFile 
　　UnlockFile 
　　LockFileEx 
　　UnlockFileEx

　　以上四个函数用于对文件进行锁定和解锁。这样可以实现文件的异步操作。可同时对文件的不同部分进行各自的操作。

文件的压缩和解压缩

　　LZOpenFile 
　　打开压缩文件以读取

　　LZSeek 
　　查找压缩文件中的一个位置

　　LZRead 
　　读一个压缩文件

　　LZClose 
　　关闭一个压缩文件

　　LZCopy 
　　复制压缩文件并在处理过程中展开

　　GetExpandedName 
　　从压缩文件中返回文件名称。

　　以上六个函数为32位 API 中的一个小扩展库，文件压缩扩展库中的函数。文件压缩可以用命令 compress 创建。


　　文件内核对象

　　32位 API 提供一个称为文件映像的特性，它允许将文件直接映射为一个应用的虚拟内存空间，这一技术可用于简化和加速文件访问。

　　CreateFileMapping 
　　创建和命名映射

　　MapViewOfFile 
　　把文件映射装载如内存

　　UnmapViewOfFile 
　　释放视图并把变化写回文件

　　FlushViewOfFile 
　　将视图的变化刷新写入磁盘

希望通过以上几个常用的 API 函数，能快速的提高文件操作过程函数的编写。

如何进行文件操作

[1]显示对话框，取得文件名

CString FilePathName;
CFileDialog dlg(TRUE);///TRUE为OPEN对话框，FALSE为SAVE AS对话框
if (dlg.DoModal() == IDOK)
FilePathName=dlg.GetPathName();

相关信息：CFileDialog 用于取文件名的几个成员函数：
假如选择的文件是C:\WINDOWS\TEST.EXE
则(1)GetPathName();取文件名全称，包括完整路径。取回C:\WINDOWS\TEST.EXE
(2)GetFileTitle();取文件全名：TEST.EXE
(3)GetFileName();取回TEST
(4)GetFileExt();取扩展名EXE
[2]打开文件
CFile file("C:\HELLO.TXT",CFile::modeRead);//只读方式打开
//CFile::modeRead可改为 CFile::modeWrite(只写),
//CFile::modeReadWrite(读写),CFile::modeCreate(新建)
例子：
{
CFile file;
file.Open("C:\HELLO.TXT",CFile::modeCreate|Cfile::modeWrite);
.
.
.
}

[3]移动文件指针
file.Seek(100,CFile::begin);///从文件头开始往下移动100字节
file.Seek(-50,CFile::end);///从文件末尾往上移动50字节
file.Seek(-30,CFile::current);///从当前位置往上移动30字节
file.SeekToBegin();///移到文件头
file.SeekToEnd();///移到文件尾

[4]读写文件
读文件：
char buffer[1000];
file.Read(buffer,1000);
写文件：
CString string("自强不息");
file.Write(string,8);

[5]关闭文件
file.Close();


一.将信息写入.INI文件中.

　　1.所用的WINAPI函数原型为:

BOOL WritePrivateProfileString( 
LPCTSTR lpAppName, 
LPCTSTR lpKeyName, 
LPCTSTR lpString, 
LPCTSTR lpFileName 
);

　　其中各参数的意义:

　　　LPCTSTR lpAppName 是INI文件中的一个字段名.

　　　LPCTSTR lpKeyName 是lpAppName下的一个键名,通俗讲就是变量名.

　　　LPCTSTR lpString 是键值,也就是变量的值,不过必须为LPCTSTR型或CString型的.

　　　LPCTSTR lpFileName 是完整的INI文件名.

　　2.具体使用方法:设现有一名学生,需把他的姓名和年龄写入 c:\stud\student.ini 文件中.

CString strName,strTemp; 
int nAge; 
strName="张三"; 
nAge=12; 
::WritePrivateProfileString("StudentInfo","Name",strName,"c:\\stud\\student.ini");

　　此时c:\stud\student.ini文件中的内容如下:

　　　[StudentInfo] 
　　　

　　3.要将学生的年龄保存下来,只需将整型的值变为字符型即可:

strTemp.Format("%d",nAge); 
::WritePrivateProfileString("StudentInfo","Age",strTemp,"c:\\stud\\student.ini");

.将信息从INI文件中读入程序中的变量.

　　1.所用的WINAPI函数原型为:

DWORD GetPrivateProfileString( 
LPCTSTR lpAppName, 
LPCTSTR lpKeyName, 
LPCTSTR lpDefault, 
LPTSTR lpReturnedString, 
DWORD nSize, 
LPCTSTR lpFileName 
);

　　其中各参数的意义:

　　　前二个参数与 WritePrivateProfileString中的意义一样.

　　　lpDefault : 如果INI文件中没有前两个参数指定的字段名或键名,则将此值赋给变量.

　　　lpReturnedString : 接收INI文件中的值的CString对象,即目的缓存器.

　　　nSize : 目的缓存器的大小.

　　　lpFileName : 是完整的INI文件名.

　　2.具体使用方法:现要将上一步中写入的学生的信息读入程序中.

CString strStudName; 
int nStudAge; 
GetPrivateProfileString("StudentInfo","Name","默认姓名",strStudName.GetBuffer(MAX_PATH),MAX_PATH,"c:\\stud\\student.ini");

　　执行后 strStudName 的值为:"张三",若前两个参数有误,其值为:"默认姓名".

　　3.读入整型值要用另一个WINAPI函数:

UINT GetPrivateProfileInt( 
LPCTSTR lpAppName, 
LPCTSTR lpKeyName, 
INT nDefault, 
LPCTSTR lpFileName 
);

　　这里的参数意义与上相同.使用方法如下:

nStudAge=GetPrivateProfileInt("StudentInfo","Age",10,"c:\\stud\\student.ini");


在我们写的程序当中,总有一些配置信息需要保存下来,以便完成程序的功能,最简单的办法就是将这些信息写入INI文件中,程序初始化时再读入.具体应用如下:

　　一.将信息写入.INI文件中.

　　1.所用的WINAPI函数原型为:

BOOL WritePrivateProfileString( 
LPCTSTR lpAppName, 
LPCTSTR lpKeyName, 
LPCTSTR lpString, 
LPCTSTR lpFileName 
);

　　其中各参数的意义:

　　　LPCTSTR lpAppName 是INI文件中的一个字段名.

　　　LPCTSTR lpKeyName 是lpAppName下的一个键名,通俗讲就是变量名.

　　　LPCTSTR lpString 是键值,也就是变量的值,不过必须为LPCTSTR型或CString型的.

　　　LPCTSTR lpFileName 是完整的INI文件名.

　　2.具体使用方法:设现有一名学生,需把他的姓名和年龄写入 c:\stud\student.ini 文件中.

CString strName,strTemp; 
int nAge; 
strName="张三"; 
nAge=12; 
::WritePrivateProfileString("StudentInfo","Name",strName,"c:\\stud\\student.ini");

　　此时c:\stud\student.ini文件中的内容如下:

　　　[StudentInfo] 
　　　

　　3.要将学生的年龄保存下来,只需将整型的值变为字符型即可:

strTemp.Format("%d",nAge); 
::WritePrivateProfileString("StudentInfo","Age",strTemp,"c:\\stud\\student.ini");


　二.将信息从INI文件中读入程序中的变量.

　　1.所用的WINAPI函数原型为:

DWORD GetPrivateProfileString( 
LPCTSTR lpAppName, 
LPCTSTR lpKeyName, 
LPCTSTR lpDefault, 
LPTSTR lpReturnedString, 
DWORD nSize, 
LPCTSTR lpFileName 
);

　　其中各参数的意义:

　　　前二个参数与 WritePrivateProfileString中的意义一样.

　　　lpDefault : 如果INI文件中没有前两个参数指定的字段名或键名,则将此值赋给变量.

　　　lpReturnedString : 接收INI文件中的值的CString对象,即目的缓存器.

　　　nSize : 目的缓存器的大小.

　　　lpFileName : 是完整的INI文件名.

　　2.具体使用方法:现要将上一步中写入的学生的信息读入程序中.

CString strStudName; 
int nStudAge; 
GetPrivateProfileString("StudentInfo","Name","默认姓名",strStudName.GetBuffer(MAX_PATH),MAX_PATH,"c:\\stud\\student.ini");

　　执行后 strStudName 的值为:"张三",若前两个参数有误,其值为:"默认姓名".

　　3.读入整型值要用另一个WINAPI函数:

UINT GetPrivateProfileInt( 
LPCTSTR lpAppName, 
LPCTSTR lpKeyName, 
INT nDefault, 
LPCTSTR lpFileName 
);

　　这里的参数意义与上相同.使用方法如下:

nStudAge=GetPrivateProfileInt("StudentInfo","Age",10,"c:\\stud\\student.ini");

三.循环写入多个值,设现有一程序,要将最近使用的几个文件名保存下来,具体程序如下:

　　1.写入:

CString strTemp,strTempA; 
int i; 
int nCount=6; 
file://共有6个文件名需要保存 
for(i=0;i {strTemp.Format("%d",i); 
strTempA=文件名; 
file://文件名可以从数组,列表框等处取得. 
::WritePrivateProfileString("UseFileName","FileName"+strTemp,strTempA, 
"c:\\usefile\\usefile.ini"); 
} 
strTemp.Format("%d",nCount); 
::WritePrivateProfileString("FileCount","Count",strTemp,"c:\\usefile\\usefile.ini"); 
file://将文件总数写入,以便读出.

　　2.读出:

nCount=::GetPrivateProfileInt("FileCount","Count",0,"c:\\usefile\\usefile.ini"); 
for(i=0;i {strTemp.Format("%d",i); 
strTemp="FileName"+strTemp; 
::GetPrivateProfileString("CurrentIni",strTemp,"default.fil", strTempA.GetBuffer(MAX_PATH),MAX_PATH,"c:\\usefile\\usefile.ini");

file://使用strTempA中的内容.

}

　　补充四点: 
　　　1.INI文件的路径必须完整,文件名前面的各级目录必须存在,否则写入不成功,该函数返回 FALSE 值. 
　　　2.文件名的路径中必须为 \\ ,因为在VC++中, \\ 才表示一个 \ . 
　　　3.也可将INI文件放在程序所在目录,此时 lpFileName 参数为: ".\\student.ini".

//---------------------------------------------------------------------------------- 
/* 
类名：CIni 
版本：v2.0 
最后更新： 
v2.0 
梦小孩于2004年2月14日情人节 
加入高级操作的功能 
v1.0 
梦小孩于2003年某日 
一般操作完成

类描述： 
本类可以于.ini文件进行操作 
*/

文件 1:

#pragma once

#include "afxTempl.h"

class CIni 
{ 
private: 
CString m_strFileName; 
public: 
CIni(CString strFileName):m_strFileName(strFileName) 
{ 
} 
public: 
//一般性操作： 
BOOL SetFileName(LPCTSTR lpFileName); //设置文件名 
CString GetFileName(void); //获得文件名 
BOOL SetValue(LPCTSTR lpSection, LPCTSTR lpKey, LPCTSTR lpValue,bool bCreate=true); //设置键值，bCreate是指段名及键名未存在时，是否创建。 
CString GetValue(LPCTSTR lpSection, LPCTSTR lpKey); //得到键值. 
BOOL DelSection(LPCTSTR strSection); //删除段名 
BOOL DelKey(LPCTSTR lpSection, LPCTSTR lpKey); //删除键名


public: 
//高级操作： 
int GetSections(CStringArray& arrSection); //枚举出全部的段名 
int GetKeyValues(CStringArray& arrKey,CStringArray& arrValue,LPCTSTR lpSection); //枚举出一段内的全部键名及值

BOOL DelAllSections();

};

文件 2:

#include "StdAfx.h" 
#include "ini.h"

#define MAX_ALLSECTIONS 2048 //全部的段名 
#define MAX_SECTION 260 //一个段名长度 
#define MAX_ALLKEYS 6000 //全部的键名 
#define MAX_KEY 260 //一个键名长度

BOOL CIni::SetFileName(LPCTSTR lpFileName) 
{ 
CFile file; 
CFileStatus status;

if(!file.GetStatus(lpFileName,status)) 
return TRUE;

m_strFileName=lpFileName; 
return FALSE; 
}

CString CIni::GetFileName(void) 
{ 
return m_strFileName; 
}

BOOL CIni::SetValue(LPCTSTR lpSection, LPCTSTR lpKey, LPCTSTR lpValue,bool bCreate) 
{ 
TCHAR lpTemp[MAX_PATH] ={0};

//以下if语句表示如果设置bCreate为false时，当没有这个键名时则返回TRUE（表示出错） 
//!*&*none-value*&!* 这是个垃圾字符没有特别意义，这样乱写是防止凑巧相同。 
if (!bCreate) 
{ 
GetPrivateProfileString(lpSection,lpKey,"!*&*none-value*&!*",lpTemp,MAX_PATH,m_strFileName); 
if(strcmp(lpTemp,"!*&*none-value*&!*")==0) 
return TRUE; 
}

if(WritePrivateProfileString(lpSection,lpKey,lpValue,m_strFileName)) 
return FALSE; 
else 
return GetLastError(); 
}

CString CIni::GetValue(LPCTSTR lpSection, LPCTSTR lpKey) 
{ 
DWORD dValue; 
TCHAR lpValue[MAX_PATH] ={0};

dValue=GetPrivateProfileString(lpSection,lpKey,"",lpValue,MAX_PATH,m_strFileName); 
return lpValue; 
}

BOOL CIni::DelSection(LPCTSTR lpSection) 
{ 
if(WritePrivateProfileString(lpSection,NULL,NULL,m_strFileName)) 
return FALSE; 
else 
return GetLastError(); 
}

BOOL CIni::DelKey(LPCTSTR lpSection, LPCTSTR lpKey) 
{ 
if(WritePrivateProfileString(lpSection,lpKey,NULL,m_strFileName)) 
return FALSE; 
else 
return GetLastError(); 
}


int CIni::GetSections(CStringArray& arrSection) 
{ 
/* 
本函数基础： 
GetPrivateProfileSectionNames - 从 ini 文件中获得 Section 的名称 
如果 ini 中有两个 Section: [sec1] 和 [sec2]，则返回的是 'sec1',0,'sec2',0,0 ，当你不知道 
ini 中有哪些 section 的时候可以用这个 api 来获取名称 
*/ 
int i; 
int iPos=0; 
int iMaxCount; 
TCHAR chSectionNames[MAX_ALLSECTIONS]={0}; //总的提出来的字符串 
TCHAR chSection[MAX_SECTION]={0}; //存放一个段名。 
GetPrivateProfileSectionNames(chSectionNames,MAX_ALLSECTIONS,m_strFileName);

//以下循环，截断到两个连续的0 
for(i=0;i<MAX_ALLSECTIONS;i++) 
{ 
if (chSectionNames[i]==0) 
if (chSectionNames[i]==chSectionNames[i+1]) 
break; 
}

iMaxCount=i+1; //要多一个0号元素。即找出全部字符串的结束部分。 
arrSection.RemoveAll();//清空原数组

for(i=0;i<iMaxCount;i++) 
{ 
chSection[iPos++]=chSectionNames[i]; 
if(chSectionNames[i]==0) 
{ 
arrSection.Add(chSection); 
memset(chSection,0,MAX_SECTION); 
iPos=0; 
}

}

return (int)arrSection.GetSize(); 
}

int CIni::GetKeyValues(CStringArray& arrKey,CStringArray& arrValue, LPCTSTR lpSection) 
{ 
/* 
本函数基础： 
GetPrivateProfileSection- 从 ini 文件中获得一个Section的全部键名及值名 
如果ini中有一个段，其下有 "段1=值1" "段2=值2"，则返回的是 '段1=值1',0,'段2=值2',0,0 ，当你不知道 
获得一个段中的所有键及值可以用这个。 
*/ 
int i; 
int iPos=0; 
CString strKeyValue; 
int iMaxCount; 
TCHAR chKeyNames[MAX_ALLKEYS]={0}; //总的提出来的字符串 
TCHAR chKey[MAX_KEY]={0}; //提出来的一个键名

GetPrivateProfileSection(lpSection,chKeyNames,MAX_ALLKEYS,m_strFileName);

for(i=0;i<MAX_ALLKEYS;i++) 
{ 
if (chKeyNames[i]==0) 
if (chKeyNames[i]==chKeyNames[i+1]) 
break; 
}

iMaxCount=i+1; //要多一个0号元素。即找出全部字符串的结束部分。 
arrKey.RemoveAll();//清空原数组 
arrValue.RemoveAll();

for(i=0;i<iMaxCount;i++) 
{ 
chKey[iPos++]=chKeyNames[i]; 
if(chKeyNames[i]==0) 
{ 
strKeyValue=chKey; 
arrKey.Add(strKeyValue.Left(strKeyValue.Find("="))); 
arrValue.Add(strKeyValue.Mid(strKeyValue.Find("=")+1)); 
memset(chKey,0,MAX_KEY); 
iPos=0; 
}

}

return (int)arrKey.GetSize(); 
}

BOOL CIni::DelAllSections() 
{ 
int nSection; 
CStringArray arrSection; 
nSection=GetSections(arrSection); 
for(int i=0;i<nSection;i++) 
{ 
if(DelSection(arrSection[i])) 
return GetLastError(); 
} 
return FALSE; 
}


使用方法： 
CIni ini("c:\\a.ini"); 
int n;

/*获得值 
TRACE("%s",ini.GetValue("段1","键1")); 
*/

/*添加值 
ini.SetValue("自定义段","键1","值"); 
ini.SetValue("自定义段2","键1","值",false); 
*/

/*枚举全部段名 
CStringArray arrSection; 
n=ini.GetSections(arrSection); 
for(int i=0;i<n;i++) 
TRACE("%s\n",arrSection[i]); 
*/

/*枚举全部键名及值 
CStringArray arrKey,arrValue; 
n=ini.GetKeyValues(arrKey,arrValue,"段1"); 
for(int i=0;i<n;i++) 
TRACE("键：%s\n值：%s\n",arrKey[i],arrValue[i]); 
*/

/*删除键值 
ini.DelKey("段1","键1"); 
*/

/*删除段 
ini.DelSection("段1"); 
*/

/*删除全部 
ini.DelAllSections(); 
*/


VC++中以追加方式向文本文件写入数据

今天，我要用MFC中的CStdioFile类进行文件操作，读写等。

可是，看了下好像没有简单的方法，

于是在网上看到这样的写法：

CStdioFile file(strFile,CFile::modeCreate|CFile::modeNoTruncate|CFile::modeWrite);

file.WriteString(strTmp);

file.Close;


modeNoTruncate的意思就是不要截取的意思吧

可是，试了下这段代码，并没有起作用，不知道是什么原因。

于是，在WriteString写字符串之前加了个把指针先定位到文件末尾的代码，就可以了

CString strTmp="hehe\r\n";

CStdioFile file(strFile,CFile::modeCreate|CFile::modeNoTruncate|CFile::modeWrite);

file.SeekToEnd();//先定位到文件尾部

file.WriteString(strTmp);

file.Close;
```

