---
title: Javascript 复制到剪贴板
toc: true
date: 2021-08-11 19:18:36
categories: 
  - Javascript
sidebar: auto
permalink: /javascript/copy-to-clipboard/
---


```
/**
 * 复制到剪贴板
 * @param object
 * @param compareBy
 */
function copyToClipboard(value, document = window.document) {
  const element = document.createElement('input')
  element.style.opacity = 0
  element.value = value
  document.body.appendChild(element)
  element.select()

  setTimeout(function () {
    element.remove()
  }, 0)

  return document.execCommand('copy')
}

```
