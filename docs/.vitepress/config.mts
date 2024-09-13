import { defineConfig } from "vitepress";

// 导入主题的配置
import { blogTheme } from "./blog-theme";

import { arithmetic, largefrontend, node, tools } from "./nav";

// 如果使用 GitHub/Gitee Pages 等公共平台部署
// 通常需要修改 base 路径，通常为“/仓库名/”
// 如果项目名已经为 name.github.io 域名，则不需要修改！
const base = process.env.GITHUB_ACTIONS === "true" ? "/starrySky-blog/" : "/";

// Vitepress 默认配置
// 详见文档：https://vitepress.dev/reference/site-config
export default defineConfig({
  // 继承博客主题(@sugarat/theme)
  extends: blogTheme,
  base,
  lang: "zh-cn",
  title: "岁月如歌请静听",
  description: "岁月如歌请静听的博客主题，基于 vitepress 实现",
  lastUpdated: true,
  // 详见：https://vitepress.dev/zh/reference/site-config#head
  head: [
    // 配置网站的图标（显示在浏览器的 tab 上）
    ["link", { rel: "icon", href: `${base}favicon.ico` }], // 修改了 base 这里也需要同步修改
    // ["link", { rel: "icon", href: "/favicon.ico" }],
  ],
  themeConfig: {
    // 展示 2,3 级标题在目录中
    outline: {
      level: [2, 3],
      label: "目录",
    },
    // 默认文案修改
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "相关文章",
    lastUpdatedText: "上次更新于",

    // 设置logo
    logo: "/logo.png",
    // editLink: {
    //   pattern:
    //     'https://github.com/ATQQ/sugar-blog/tree/master/packages/blogpress/:path',
    //   text: '去 GitHub 上编辑内容'
    // },
    nav: [
      { text: "首页", link: "/" },
      {
        text: "大前端",
        items: largefrontend,
      },
      {
        text: "node",
        items: node,
      },
      {
        text: "算法",
        items: arithmetic,
      },
      {
        text: "个人作品",
        link: "/works/",
      },
      {
        text: "工具",
        items: tools,
      },
      {
        text: "杂项",
        link: "/miscellany/",
      },
      {
        text: "问题记录",
        link: "/problemLog/",
      },
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/starrysky-future/blog",
      },
    ],
  },

  ignoreDeadLinks: [
    // 忽略所有 localhost 链接
    /^https?:\/\/localhost/,
  ],
});
