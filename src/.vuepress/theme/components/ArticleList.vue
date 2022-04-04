<template>
  <div class="article-wrapper">
    <div v-if="!items.length">Nothing in here.</div>
    <article class="article" v-for="{ info, path } in items">
      <header class="title">
        <RouterLink :to="path">
          {{ info.title }}
        </RouterLink>
      </header>
      <p class="summary">
        {{ info.description }}
      </p>
      <hr />
      <div class="article-info">
        <span v-if="info.author" class="author">Author: {{ info.author }}</span>
        <span v-if="info.date" class="date"
          >日期: {{ new Date(info.date).toLocaleDateString() }}</span
        >
        <span v-if="info.category" class="category"
          >分类: <a :href="'/posts/'+info.category.join('')+'/'">{{ info.category.join(",") }}</a></span
        >
        <span v-if="info.tag" class="tag">{{ info.tag.join("#, ") }}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts" setup>

  defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
</script>
<style lang="scss">
@use "@vuepress/theme-default/lib/client/styles/mixins";

.article-wrapper {
  @include mixins.content_wrapper;
  text-align: center;
}

.article {
  position: relative;

  box-sizing: border-box;

  width: 100%;
  margin: 0 auto 1.25rem;
  padding: 1rem 1.25rem;
  border-radius: 0.4rem;

  text-align: left;

  @media (max-width: 419px) {
    border-radius: 0;
  }

  .title {
    position: relative;

    display: inline-block;

    font-size: 1.28rem;
    line-height: 2rem;

    &::after {
      content: "";

      position: absolute;
      bottom: 0;
      left: 0;

      width: 100%;
      height: 2px;

      background: var(--c-brand);

      visibility: hidden;

      transition: transform 0.3s ease-in-out;
      transform: scaleX(0);
    }

    &:hover {
      cursor: pointer;

      &::after {
        visibility: visible;
        transform: scaleX(1);
      }
    }

    a {
      color: inherit;
    }
  }

  .article-info {
    display: flex;
    flex-shrink: 0;
    font-size: 0.75rem;

    > span {
      margin-right: 0.5em;
      line-height: 1.8;
    }
  }

  .read-more{
    position: absolute;
    right: 0px;
    border: 1px solid var(--c-text-accent);
    font-size: 14px;
    border: 1px solid #ccc;
  }
}
</style>
