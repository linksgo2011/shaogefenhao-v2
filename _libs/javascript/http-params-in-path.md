---
title: Javascript 对URL中path参数绑定
toc: true
date: 2021-08-11 19:18:36
categories: 
  - Javascript
sidebar: auto
permalink: /javascript/http-params-in-path/
---

拼接URL在前端不是很好，例如 '/cate/'+ cateID +'/post/'+ postID

可以写成 `/cate/:cateID/post/:postID`

```
export function getParamlisedPath(pathString, ...params) {
  let result = pathString
  params.forEach((value) => {
    result = result.replace(/\:\w+/, value)
  })
  return result
}

```

