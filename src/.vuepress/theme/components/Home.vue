<template>
    <main class="home">
        <div class="hero-image">
            <div class="mask"></div>
            <div class="slog">
                少个分号的写作空间
                <div class="focus"> 🎯 研发自测 | 软件架构 | 敏捷团队 | 技术咨询</div>
            </div>
        </div>

        <div class="center">
            <div class="guide">
                内容导航和最近更新
            </div>

            <div class="features">
                <div class="feature">
                    <h2 class="title">博客文章</h2>
                    <p class="content">原创内容，这类内容为非体系化写作，想到哪里写到哪里，具有主观色彩，发布后一般不再修改。</p>
                    <ul>
                        <li v-for="{ info,path } in latestArticles">
                            <RouterLink :to="path">
                                {{ info.title }}
                            </RouterLink>
                        </li>
                    </ul>
                </div>
                <div class="feature">
                    <h2 class="title">专题内容</h2>
                    <p class="content">原创内容，这类内容为体系化写作，将博客或者工作中成体系的内容整理下来，会持续优化，可以当做小型电子书阅读。</p>
                    <ul>
                        <li><a href="/column/books/book-list.html">书单</a></li>
                        <li><a href="/column/interview/java-server-enginer-interview.html">Java 面试指南</a></li>
                        <li><a href="/column/performance/performance-overview.html">Java 性能优化</a></li>
                        <li><a href="/column/source-analysis/spring-boot-workflow.html">Spring Boot 源码</a></li>
                        <li><a href="/column/ddd">DDD（领域驱动设计）</a></li>
                    </ul>
                </div>
                <div class="feature">
                    <h2 class="title">知识库（整理中）</h2>
                    <p class="content">半原创内容，将日常学习到的笔记、见闻、案例整理下来，比较粗糙，搜索引擎上都能找到的内容，为前面两类内容提供原料。</p>
                    <ul>
                        <li><a href="/libs/mini-notes/">一页纸笔记</a></li>
                    </ul>
                </div>
            </div>
        </div>


        <div class="center">
            <div class="guide">
                Side Project和其它资源
            </div>

            <div class="features">
                <div class="feature">
                  <ul>
                      <li><a href="http://todo.printf.cn/">极简任务管理工具</a></li>
                  </ul>
                </div>
                <div class="feature">
                    <ul>
                        <li><a href="https://edu.51cto.com/topic/5211.html">51CTO DDD 系列课程</a></li>
                    </ul>
                </div>
                <div class="feature">
                    <ul>
                        <li><a href="http://renzhi.shaogefenhao.com/">电子书：《程序员的认知心得》</a></li>
                        <li><a href="http://domain-driven-design.org/">DDD 参考指南</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer">
            Copyright © 2016-2022 少个分号 | <a href="https://beian.miit.gov.cn/">蜀ICP备15002811号-3</a> | 由 vuepress2 提供站点渲染
        </div>
    </main>
</template>

<script lang="ts" setup>
    import { useBlogType } from "vuepress-plugin-blog2/lib/client";

    import ArticleList from "../components/ArticleList.vue";
    import ParentLayout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";

    const latestArticles = useBlogType("article").value.items.slice(0,5);
</script>


<style lang="scss">
    @use "@vuepress/theme-default/lib/client/styles/mixins";

    .home {
        padding: var(--navbar-height) 0;
        max-width: 100%;
    }

    .hero-image {
        position: relative;
        background: url("/hero.jpg") center center;
        background-size: cover;
        width: 100%;
        height: 20rem;

        .mask {
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
        }

        .slog{
            width: 100%;
            top:35%;
            position: absolute;
            font-size: 2rem;
            text-align: center;
            color: #fff;
        }

        .focus{
            margin-top: 51px;
            font-size: 1rem;
        }
    }

    .home {
        .features {
            padding: 2rem;
            margin-top: 0px;
        }

        .footer{

        }

        .guide {
            text-align: center;
            font-size: 1.5rem;
            line-height: 5rem;
        }
    }
</style>
