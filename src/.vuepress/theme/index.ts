import { path } from "@vuepress/utils";
import type { Theme } from "@vuepress/core";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

const blogTheme: Theme<DefaultThemeOptions> = {
  name: "blog-theme",

  // we are extending @vuepress/theme-default
  extends: "@vuepress/theme-default",

  alias: {
    '@theme/Home.vue': path.resolve(__dirname, './components/Home.vue'),
  },

  // we provide some blog layouts
  layouts: {
    Article: path.resolve(__dirname, "./layouts/Article.vue"),
    Category: path.resolve(__dirname, "./layouts/Category.vue"),
    Tag: path.resolve(__dirname, "./layouts/Tag.vue"),
    Timeline: path.resolve(__dirname, "./layouts/Timeline.vue"),
  },

  plugins: [
    [
      "blog2",
      {
        // only files under posts are articles
        filter: ({ filePathRelative }) =>
          filePathRelative && filePathRelative.startsWith("posts/"),

        // getting article info
        getInfo: ({ frontmatter, title }) => ({
          title,
          author: frontmatter.author || "",
          date: frontmatter.date || null,
          category: frontmatter.category || [],
          tag: frontmatter.tag || [],
          description: frontmatter.description || '',
        }),

        category: [
          {
            key: "category",
            path: "/posts",
            itemPath: "/posts/:name/",
            getter: (page) => (page.frontmatter.category as string[]) || [],
            layout: "Category",
            itemLayout: "Category",
            frontmatter: () => ({ title: "分类", sidebar: false }),
            itemFrontmatter: (name) => ({
              title: `Category ${name}`,
              sidebar: false,
            }),
          },
          {
            key: "tag",
            getter: (page) => (page.frontmatter.tag as string[]) || [],
            layout: "Tag",
            itemLayout: "Tag",
            frontmatter: () => ({ title: "Tags", sidebar: false }),
            itemFrontmatter: (name) => ({
              title: `Tag ${name}`,
              sidebar: false,
            }),
          },
        ],

        type: [
          {
            key: "article",
            // remove archive articles
            filter: (page) => !page.frontmatter.archive,
            path: "/article",
            layout: "Category",
            frontmatter: () => ({ title: "Articles", sidebar: false }),
            // sort pages with time and sticky
            sorter: (pageA, pageB) => {
              if (pageA.frontmatter.sticky && pageB.frontmatter.sticky)
                return pageB.frontmatter.sticky - pageA.frontmatter.sticky;

              if (pageA.frontmatter.sticky && !pageB.frontmatter.sticky)
                return -1;

              if (!pageA.frontmatter.sticky && pageB.frontmatter.sticky)
                return 1;

              if (!pageB.frontmatter.date) return 1;
              if (!pageA.frontmatter.date) return -1;

              return (
                new Date(pageB.frontmatter.date).getTime() -
                new Date(pageA.frontmatter.date).getTime()
              );
            },
          },
        ],
        hotReload: true,
      },
    ],
    [
      '@vuepress/plugin-google-analytics',
      {
        id: 'G-VWHZ3KR6PD',
      },
    ],
  ],
};

export default blogTheme;
