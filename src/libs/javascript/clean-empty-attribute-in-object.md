---
title: Javascript 清理对象中的空值
toc: true
date: 2021-08-11 19:18:36
categories: 
  - Javascript
sidebar: auto
permalink: /javascript/clean-empty-attribute-in-object/
---

```

export function cleanNull(object){
  const returnValue = {}
  Object.keys(object).map((key)=>{
    const value = object[key]
    if (value === undefined || value === null || value === '') {
      return
    }
    returnValue[key] = value
    return key
  })

  return returnValue
}

```


