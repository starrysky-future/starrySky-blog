const base = process.env.GITHUB_ACTIONS === "true" ? "/starrySky-blog/" : "/";

export default [
  {
    title: "星乐app",
    description: "基于 Electron 实现的桌面音乐软件",
    time: {
      start: "2023/10/01",
    },
    github: {
      owner: "starrysky-future",
      repo: "starrysky-music-desktop",
      branch: "main",
      path: "",
    },
    status: {
      text: "请试用",
    },
    url: "https://github.com/starrysky-future/starrysky-music-desktop/tags",
    cover: [
      `${base}electron/music/songList.png`,
      `${base}electron/music/rankingList.png`,
      `${base}electron/music/collect.png`,
      `${base}electron/music/search.png`,
      `${base}electron/music/seeting.png`,
      `${base}electron/music/lyric.png`,
    ],
    tags: ["Electron", "Vue3", "typescript"],
    links: [
      {
        title: "一个简约风的桌面端音乐软件",
        url: "https://github.com/starrysky-future/starrysky-music-desktop/tags",
      },
    ],
  },
  {
    title: "复制记录工具",
    description: "基于 Electron 实现的记录复制的小工具",
    time: {
      start: "2023/07/28",
    },
    github: {
      owner: "starrysky-future",
      repo: "copyRecord",
      branch: "main",
      path: "",
    },
    status: {
      text: "请试用",
    },
    url: "https://github.com/starrysky-future/copyRecord/tags",
    cover: `${base}electron/copyRecord/menu.jpg`,
    tags: ["Electron", "js"],
    links: [
      {
        title: "一个简单的记录复制的小工具",
        url: "https://github.com/starrysky-future/copyRecord/tags",
      },
    ],
  },
  {
    title: "摄像头软件",
    description: "基于 Electron 实现的摄像头软件",
    time: {
      start: "2022/11/05",
    },
    github: {
      owner: "starrysky-future",
      repo: "myCamera",
      branch: "main",
      path: "",
    },
    status: {
      text: "",
    },
    url: "https://github.com/starrysky-future/myCamera/tags",
    cover: [
      `${base}electron/camera/seeting.png`,
      `${base}electron/camera/camera.png`,
    ],
    tags: ["Electron", "vue"],
    links: [
      {
        title: "一个摄像头软件",
        url: "https://github.com/starrysky-future/myCamera/tags",
      },
    ],
  },
];
