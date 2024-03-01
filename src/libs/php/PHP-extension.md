---
title: PHP拓展Linux/unix 下的编译安装
toc: true
date: 2021-08-11 19:18:36
categories: 
  - PHP 基础
sidebar: auto
permalink: /php/PHP-extension/
---

在Linux下PHP如果出现了拓展不能被安装的情况时,需要自己安装拓展。

一般来说需要安装相应系统库:比如libmcrypt和相应的拓展.so文件,下面使用mycrypt作为例子

MCrypt是一个功能强大的加密算法扩展库，它包括有22种算法。

1:下载并解压mcrypt-2.6.8.tar.bz2。（2.6.8为版本号，可以自行选择，但是注意后边步骤要与下载的版本号一致。）
2:在终端执行命令（注意如下命令需要安装xcode支持）：


```

cd ~/Downloads/mcrypt-2.5.8
./configure --disable-posix-threads --enable-static
make
sudo make install

```

*实际上这一步在Ubuntu上可以使用 apt-get 工具安装,在Mac上使用homebrew安装*

3：下载并解压php源码，根据自己情况选择对应版本。(注意以下命令中php的版本)
在终端执行命令：（如果出错请看后边）

```
cd ~/Downloads/php-5.5.14/ext/mcrypt
phpize
./configure
make
cd modules
sudo cp mcrypt.so /usr/lib/php/extensions/no-debug-non-zts-20121212/
//上面可以使用make install 代替

```

（cd modules后当出现

Build complete.
Don't forget to run 'make test'.
表示安装成功。）

*

直接安装拓展
https://stackoverflow.com/questions/24749950/error-no-available-formula-for-php54-mcrypt-on-mac-os-x-mavericks

*

4：打开php.ini

```
sudo vi /etc/php.ini

```

添加如下代码：（注意no-debug-non-zts-20121212版本号，如果不清楚可以前往/usr/lib/php/extensions/查看）

extension=/usr/lib/php/extensions/no-debug-non-zts-20121212/mcrypt.so
*如果phpize出现如下错误：

grep: /usr/include/php/main/php.h: No such file or directory
grep: /usr/include/php/Zend/zend_modules.h: No such file or directory
grep: /usr/include/php/Zend/zend_extensions.h: No such file or directory
Configuring for:
PHP Api Version:
Zend Module Api No:
Zend Extension Api No:
Cannot find autoconf. Please check your autoconf installation and the
$PHP_AUTOCONF environment variable. Then, rerun this script.
表示需要安装autoconf

*如果make出现如下错误：

/ext/mcrypt/mcrypt.c:25:10: fatal error: 'php.h' file not found
执行如下命令即可：

```
sudo ln -s /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.10.sdk/usr/include /usr/include

```
*注意MacOSX10.10.sdk修改为自己系统的版本号*

如果遇到
Configuring for:
PHP Api Version:         20121113
Zend Module Api No:      20121212
Zend Extension Api No:   220121212
Cannot find autoconf. Please check your autoconf installation and the
$PHP_AUTOCONF environment variable. Then, rerun this script.

参考:https://stackoverflow.com/questions/31583646/cannot-find-autoconf-please-check-your-autoconf-installation-xampp-in-centos


For CentOS:

> # yum install autoconf

for Ubuntu :

> # apt-get install autoconf

for fedora 24-27:

> # dnf install autoconf

For Mac

> brew install autoconf

对于Mac系统遇到 /etc/权限问题

参考:https://apple.stackexchange.com/questions/208815/error-configuring-mcrypt-after-upgrading-to-el-capitan

我们可以安装到另外的地方
```
sudo make EXTENSION_DIR='/usr/local/lib/php/extensions' install

```

### 更多Mac的安全策略

在最新的OSX中限制用户访问某些系统目录
https://developer.apple.com/library/content/documentation/Security/Conceptual/System_Integrity_Protection_Guide/Introduction/Introduction.html

无法访问的地址

```
/bin
/sbin
/usr
/System

```

```

/usr/local
/Applications
/Library
~/Library

```
