module.exports = {
  title: "Awesome-coding",
  description: "前端算法进阶之路",
  base: "/awesome-coding/",
  themeConfig: {
    sidebarDepth: 2,
    lastUpdated: "Last Updated",
    nav: [
      { text: "JavaScript", link: "/JavaScript/" },
      { text: "数据结构", link: "/DataStructure/" },
      { text: "算法", link: "/Algorithm/" },
      { text: "博客", link: "https://xinpuchen.github.io" },
      { text: "github", link: "https://github.com/xinpuchen" },
    ],
    sidebar: {
      "/JavaScript/": [
        "/JavaScript/",
        {
          title: "深入系列",
          children: [
            "/JavaScript/Depth/模拟实现call、apply.md",
            "/JavaScript/Depth/模拟实现bind.md",
            "/JavaScript/Depth/模拟实现new.md",
            "/JavaScript/Depth/模拟实现instanceof.md",
            "/JavaScript/Depth/继承的多种方式.md",
          ],
        },
        {
          title: "应用系列",
          children: [
            "/JavaScript/Apply/防抖debounce.md",
            "/JavaScript/Apply/节流throttle.md",
            "/JavaScript/Apply/函数柯里化.md",
            "/JavaScript/Apply/深拷贝.md",
            "/JavaScript/Apply/数组去重、扁平.md",
            "/JavaScript/Apply/数组乱序-洗牌算法.md",
            "/JavaScript/Apply/Promise封装ajax.md",
            "/JavaScript/Apply/懒加载实现.md",
          ],
        },
        {
          title: "ES6+系列",
          children: [
            "/JavaScript/New/模拟实现Promise.md",
            "/JavaScript/New/模拟实现Set.md",
            "/JavaScript/New/模拟实现reduce.md",
          ],
        },
        {
          title: "设计模式",
          children: ["/JavaScript/Mode/观察者模式.md"],
        },
      ],
      "/DataStructure/": [
        "/DataStructure/",
        {
          title: "二叉树",
          children: [
            "/DataStructure/Tree/二叉树的基本操作.md",
            "/DataStructure/Tree/二叉树的前序遍历.md",
            "/DataStructure/Tree/二叉树的中序遍历.md",
            "/DataStructure/Tree/二叉树的后序遍历.md",
            "/DataStructure/Tree/重建二叉树.md",
            "/DataStructure/Tree/对称二叉树.md",
            "/DataStructure/Tree/二叉树的镜像.md",
            "/DataStructure/Tree/二叉搜索树的第k个节点.md",
            "/DataStructure/Tree/二叉树的最大深度.md",
            "/DataStructure/Tree/二叉树的最小深度.md",
            "/DataStructure/Tree/平衡二叉树.md",
          ],
        },
      ],
      "/Algorithm/": [
        "/Algorithm/",
        {
          title: "排序",
          children: [
            "/Algorithm/Sort/插入排序.md",
            "/Algorithm/Sort/冒泡排序.md",
            "/Algorithm/Sort/选择排序.md",
            "/Algorithm/Sort/快速排序.md",
            "/Algorithm/Sort/归并排序.md",
            "/Algorithm/Sort/堆排序.md",
          ],
        },
        {
          title: "查找",
          children: [
            "/Algorithm/Find/二维数组查找.md",
            "/Algorithm/Find/旋转数组的最小数字.md",
          ],
        },
        {
          title: "贪心",
          children: [
            "/Algorithm/Greedy/分发饼干.md",
            "/Algorithm/Greedy/接雨水.md",
            "/Algorithm/Greedy/盛最多水的容器.md",
          ],
        },
      ],
    },
  },
};
