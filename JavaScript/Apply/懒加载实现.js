/**
 * 懒加载
 *
 * 思路：在标签上用另外一个属性存储真正的 src 地址
 *
 * 是否加载判断：
 *
 * 1. 通过图片 offsetTop 和 window 的 innerHeight，scrollTop 判断图片是否位于可视区域
 * 2. IntersectionObserver
 */

// 节流函数，保证每200ms触发一次
function throttle(event, time) {
  let timer = null;
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        event.apply(this, args);
      }, time);
    }
  };
}

var imgs = document.getElementsByTagName("img");
var n = 0; // 存储图片加载到的位置，避免每次都从第一张图片开始遍历

// 页面载入完毕加载可是区域内的图片
function lazyload() {
  var seeHeight = window.innerHeight;
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  for (var i = n; n < imgs.length; i++) {
    if (
      imgs[i].offsetTop < seeHeight + scrollTop &&
      imgs[i].getAttribute("src") === "loading.gif"
    ) {
      imgs[i].src = imgs[i].getAttribute("data-src");
    }
    n = i + 1;
  }
}

lazyload(); //页面载入完毕加载可是区域内的图片
window.addEventListener("scroll", throttle(lazyload, 200));

// IntersectionObserver
var lazyImageObserver = new IntersectionObserver(
  entries => {
    entries.forEach(({ target, intersectionRatio }) => {
      if (intersectionRatio > 0) {
        if (target.getAttribute("src") === "loading.gif") {
          target.src = target.getAttribute("data-src");
        }
        lazyImageObserver.unobserve(target);
      }
    });
  },
  {
    root: document.body,
    rootMargin: "100px 100px 100px 100px",
    thresholds: [0],
    delay: 0,
    trackVisibility: false
  }
);
var imgs = document.getElementsByTagName("img");
var n = 0;
for (var i = n; i < imgs.length; i++) {
  lazyImageObserver.observe(imgs[i]);
}
