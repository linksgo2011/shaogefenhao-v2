---
title: Cake PHP 学习笔记
toc: true
date: 2021-08-11 19:18:35
categories: 
  - cakephp
sidebar: auto
permalink: /cakephp/cakephp-save-field/
---

```php
$this->User->id = $user['User']['id'];
$this->User->saveField("last_login", time());
```

