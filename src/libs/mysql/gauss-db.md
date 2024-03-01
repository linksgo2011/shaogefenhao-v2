---
title: GaussDB 安装教程
toc: true
date: 2021-08-11 19:18:36
categories: 
  - mysql
sidebar: auto
permalink: /mysql/gauss-db/
---

pvcreate /dev/vdb
vgcreate mate /dev/vdb

lvcreate -n gaussdb -L 150G mate 
mkdir /GDEMate
mkfs.xfx /dev/mate/gaussdb
mount /dev/mate/gaussdb /GDEMate

echo "mount /dev/mate/gaussdb /GDEMate" >> /etc/rc.lcoal

规划目录

groupadd dbgrp 
useradd -g dbgrp -d /GDEMate/gaussdba -m -s /bin/bash gaussdba

echo "GDEMate#321" | passwod --stdin gaussdba

mkdir /GdeMate/gaussdba/data
chown -R gaussdba:dbgrp /GDEMate/gaussdba

chmod -R 0750 /GDEMate/gaussdba
chmod -R 0700 /GDEMate/gaussdba/data

安装

mkdir -p  /opt/software/guassdb

