<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <div class="category-wrapper">
          <RouterLink class="category" :to="'/posts'">
            全部
            <span class="category-num">
              {{ articles.items.length }}
            </span>
          </RouterLink>
          <RouterLink
            v-for="({ items, path }, name) in categoryMap.map"
            :key="name"
            :to="path"
            class="category"
          >
            {{ name }}
            <span class="category-num">
              {{ items.length }}
            </span>
          </RouterLink>
        </div>
        <ArticleList v-if="isRootCategory()"  :items="articles.items" />
        <ArticleList v-if="!isRootCategory()"  :items="categoryMap.currentItems" />
      </main>
    </template>
  </ParentLayout>
</template>
<script setup lang="ts">
import { RouterLink,useRoute} from "vue-router";
import {useBlogCategory, useBlogType} from "vuepress-plugin-blog2/lib/client";

import ArticleList from "../components/ArticleList.vue";
import ParentLayout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";

const articles = useBlogType("article");
const categoryMap = useBlogCategory("category");
const isRootCategory = ()=>{
  const route = useRoute()
  return route.path === '/posts';
}

</script>
<style lang="scss">
@use "@vuepress/theme-default/lib/client/styles/mixins";

.category-wrapper {
  @include mixins.content_wrapper;

  padding-top: 1rem !important;
  padding-bottom: 0 !important;

  font-size: 14px;

  a {
    color: inherit;
  }

  .category {
    display: inline-block;
    vertical-align: middle;

    overflow: hidden;

    margin: 0.3rem 0.6rem 0.8rem;
    padding: 0.4rem 0.8rem;
    border-radius: 0.25rem;

    cursor: pointer;

    transition: background-color 0.3s, color 0.3s;

    @media (max-width: 419px) {
      font-size: 0.9rem;
    }

    .category-num {
      display: inline-block;

      min-width: 1rem;
      height: 1.2rem;
      margin-left: 0.2em;
      padding: 0 0.1rem;
      border-radius: 0.6rem;

      font-size: 0.7rem;
      line-height: 1.2rem;
      text-align: center;
    }

    &.router-link-active {
      background-color: var(--c-brand);
      color:#fff;

      .category-num {
        color: var(--c-bg);
      }
    }
  }
}
</style>
