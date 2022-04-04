import { defineUserConfig } from "@vuepress/cli";
import { path } from "@vuepress/utils";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

const BASE = process.env.BASE as "/" | `/${string}/`;

export default defineUserConfig<DefaultThemeOptions>({
  base: BASE || "/",

  lang: "zh-CN",
  title: "少个分号",
  description: "少个分号,软件架构,高认知软件工程,DDD,领域驱动设计,敏捷,研发自测,敏捷团队",

  theme: path.resolve(__dirname, "./theme"),

  themeConfig: {
    logo: "/logo.png",

    navbar: [
      "/",
      {
        text: "博客文章",
        link: "/posts",
      },
      {
        text: "专题文章",
        activeMatch: "/column/*",
        children:[
          {
            text: "Java面试指南",
            link: "/column/interview/java-server-enginer-interview.html",
          },
          {
            text: "研发自测【建设中】",
            link: "/column/xxx",
          },
          {
            text: "高认知软件工程【建设中】",
            link: "/column/xxx",
          },
          {
            text: "DDD【建设中】",
            link: "/column/xxx",
          },
        ]
      },
      {
        text: "知识库",
        link: "/libs/",
      },
      {
        text: "找到我",
        children:[
          {
            text: "公众号：DDD和微服务",
            link: "",
          },
          {
            text: "知乎",
            link: "https://www.zhihu.com/people/printf.cn/posts",
          },
          {
            text: "知识星球",
            link: "https://wx.zsxq.com/dweb2/index/group/15522848288852",
          },
        ]
      },
      {
        text: "关于我",
        link: "/aboutme.html",
      },
    ],
  },
});
