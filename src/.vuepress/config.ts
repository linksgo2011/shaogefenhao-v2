import {defineUserConfig} from "@vuepress/cli";
import {path} from "@vuepress/utils";
import type {DefaultThemeOptions} from "@vuepress/theme-default";

const BASE = process.env.BASE as "/" | `/${string}/`;

export default defineUserConfig<DefaultThemeOptions>({
  base: BASE || "/",

  lang: "zh",
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
            text: "书单",
            link: "/column/books/book-list.html",
          },
          {
            text: "DDD（领域驱动设计）",
            link: "/column/ddd",
          },
          {
            text: "Java 面试指南",
            link: "/column/interview/java-server-enginer-interview.html",
          },
          {
            text: "Java 性能优化",
            link: "/column/performance/performance-overview.html",
          },
          {
            text: "RESTFul API 设计",
            link: "/column/restful-api",
          },
          {
            text: "源码分析",
            link: "/column/source-analysis",
          },
          {
            text: "敏捷团队工作方法",
            link: "/column/agile-team",
          },
        ]
      },
      {
        text: "演讲",
        activeMatch: "/speech/*",
        children: [
          // {
          //   text: "单元测试基础",
          //   link: "/speech/unit-testing.html"
          // },
          {
            text: "计算机中的模型思维",
            link: "/speech/model-thinking.html"
          },
          {
            text: "领域驱动设计基础",
            link: "/speech/fundamental-of-ddd.html"
          },
          {
            text: "深入 DDD：主客体建模法",
            link: "/speech/subject-object-modeling.html"
          },
          {
            text: " DDD 建模工作坊（快剪版）",
            link: "/speech/ddd-workshop.html"
          },
          {
            text: "团队系统论（上）",
            link: "/speech/team-system.html"
          },
        ]
      },
      {
        text: "知识库",
        activeMatch: "/libs/*",
        children: [
          {
            text: "一页纸笔记",
            link: "/libs/mini-notes/"
          },
          {
            text: "Thoughtworks Inception 笔记",
            link: "/libs/mini-notes/inception.html"
          }
        ]
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
    sidebar:{
      '/column/restful-api': [
        {
          text: 'RESTful API指南',
          link: '',
          children: [
            '',
            '/column/restful-api/restful-api-introduction.md',
            '/column/restful-api/api-design-document-and-contract.md',
            '/column/restful-api/api-authentication-authorization-credential.md',
          ],
        },
      ],
      '/column/source-analysis': [
        {
          link: '',
          children: [
            '',
            '/column/source-analysis/spring-boot-workflow.md',
          ],
        },
      ],
      '/column/ddd': [
        {
          link: '',
          children: [
            '',
            '/column/ddd/01.ddd-foundamental.md',
            '/column/ddd/02.ddd-concepts.md',
            '/column/ddd/03.ddd-distribution-architecture.md',
            '/column/ddd/04.ddd-guide-team.md',
            '/column/ddd/05.ddd-implement-repository.md',
            '/column/ddd/06.ddd-is-base-on-oo.md',
            '/column/ddd/07.ddd-layer.md',
            '/column/ddd/08.ddd-many-to-many-relation.md',
            '/column/ddd/09.ddd-micro-service-authorize-issue.md',
            '/column/ddd/10.ddd-micro-service-query-issue.md',
            '/column/ddd/11.ddd-micro-service-transaction-issue.md',
            '/column/ddd/12.ddd-questions.md',
            '/column/ddd/13.ddd-visualization.md',
            '/column/ddd/14.ddd-workshop-event-storming.md',
            '/column/ddd/15.why-ddd-works.md',
            '/column/ddd/16.ddd-clinic-layer-architecture.md',
            '/column/ddd/17.ddd-limitation.md',
            '/column/ddd/18.QA-for-DDD.md',
            '/column/ddd/19.tactical-modeling-principles.md',
          ],
        },
      ],
      '/column/agile-team': [
        {
          link: '',
          children: [
            '',
            '/column/agile-team/02.agile-basic-work-flow.md',
            '/column/agile-team/03.agile-calendar.md',
            '/column/agile-team/04.agile-diagnose-model.md',
            '/column/agile-team/05.agile-interview.md',
            '/column/agile-team/06.better-estimation.md',
            '/column/agile-team/07.bugbush.md',
            '/column/agile-team/08.code-review.md',
            '/column/agile-team/09.handover.md',
            '/column/agile-team/10.interviewer-guide.md',
            '/column/agile-team/12.on-boarding.md',
            '/column/agile-team/13.release.md',
            '/column/agile-team/14.release-hotfix-oncall.md',
            '/column/agile-team/15.requirement-review.md',
            '/column/agile-team/16.retro.md',
            '/column/agile-team/17.security.md',
            '/column/agile-team/18.spike.md',
            '/column/agile-team/19.standup.md',
            '/column/agile-team/20.team-role.md',
            '/column/agile-team/21.tech-huddle.md',
            '/column/agile-team/22.why-need-agile.md',
          ],
        },
      ],
    }
  },
});
