---
title: Shell 文字处理函数
toc: true
from: self
date: 2021-08-11 19:18:36
categories: 
  - linux
sidebar: auto
permalink: /linux/shell-wording/
---

## cat

用于查看文件

> cat file.txt

多个文件同时使用

> cat file1.txt  file2.txt

显示行号

> cat -n [filename]

甚至从命令行写入文件

> cat > [name-of-new-file]

复制文件（通常不要这样干，用 cp）

> cat file1.txt > file3.txt

行尾高亮

> cat -E file1.txt

显示空白字符

> cat -v file9.txt

## grep

从指定文件中搜索字符串。

简单搜索

> grep word sample2

多个文件搜索

> grep word sample sample2 sample3

搜索当前文件夹

> grep word *

搜索完整的文字

> grep -w word *

不区分大小写

> grep -i word *

子目录递归搜索

> grep -r word *

反向搜索,排除关键字

> grep -v word sample


整行匹配

> grep -x “word line1” *

获取匹配的文件列表

> grep -l word *

统计匹配行数

> grep -c word *

限制输出行数

> grep –m2 word sample

## awk

awk shell 中非常强大的命令，通常用来提取固定模式的字符串。

TODO 

## seed 

和 awk 一样是非常重要的一个命令，开发者必须掌握。

## wc

统计文本数量的工具，例如

> wc myfile.txt

5 13 57 myfile.txt

5 是文件行数，13 是单词数，57 是字符数量。

只获取行数

> wc -l 

结合管道使用获取当前目录文件数量

> ls -1 | wc -l

## sort

sort 不仅在文字处理上非常有用，服务器调优的时候也非常有用,可以快速地找 cpu 性能较差的服务。

> sort list.txt

根据第二列排序 

> sort -k2 list.txt

如果排序的字符是数字可以加上 n

> sort -nk9 list.txt

## uniq

这个命令比较简单，将重复的数据只显示一行，一般配合 sort 使用，常用有两个参数，计数和忽略大小写。

> uniq -c list.txt 

> uniq -i list.txt


## tr 

这个命令可以用来转换和修改输入字符，例如大小写转换和提取数字

> cat testfile |tr a-z A-Z 

> echo "2014年7月21日" | tr -cd "[0-9]" 提取出数字


## 综合应用

提取字符串中的数字

sed
> sed 's/[^0-9]*//g'

shell 自带功能
> echo “${VAR1//[!0-9]/}”

grep
> echo $VAR1 | grep -o -E '[0-9]+'
