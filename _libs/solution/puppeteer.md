---
title: 网页快照方案 puppeteer
toc: true
date: 2021-08-11 19:18:36
categories: 
  - 技术方案
sidebar: auto
permalink: /solution/puppeteer/
---

```
const puppeteer = require('puppeteer');

(async() => {
    const browser = await puppeteer.launch({
        executablePath:'/usr/bin/chromium-browser',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });
    const page = await browser.newPage();
    await page.goto('https://www.google.com/', {waitUntil: 'networkidle2'});
    browser.close();
})();

```

## 使用容器启动

- https://hub.docker.com/r/supernisor/armv7-puppeteer
