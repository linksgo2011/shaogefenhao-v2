---
title: linux 查看域名后所有的IP
date: 2021-08-11 19:18:36
categories: 
  - linux
sidebar: auto
permalink: /linux/linux-dig/
---


> dig www.baidu.com



; <<>> DiG 9.10.6 <<>> www.baidu.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 27655
;; flags: qr rd ra; QUERY: 1, ANSWER: 3, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4096
;; QUESTION SECTION:
;www.baidu.com.			IN	A

;; ANSWER SECTION:
www.baidu.com.		198	IN	CNAME	www.a.shifen.com.
www.a.shifen.com.	371	IN	A	61.135.169.125
www.a.shifen.com.	371	IN	A	61.135.169.121

;; Query time: 48 msec
;; SERVER: 10.202.4.4#53(10.202.4.4)
;; WHEN: Wed Jan 15 16:50:48 CST 2020
;; MSG SIZE  rcvd: 101

