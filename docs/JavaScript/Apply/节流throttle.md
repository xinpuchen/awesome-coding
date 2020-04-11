# 节流

不管事件触发频率多高，只在单位时间内执行一次

## 要解决的问题

1. 返回一个函数
2. 对传入必包的参数透传

### 时间戳实现

第一次事件触发，最后一次不触发

```js
function throttle(func, time) {
  let preTime = 0;
  return function(...args) {
    if (Date.now() - preTime > time) {
      preTime = Date.now();
      func.apply(this, args);
    }
  };
}
```

### 定时器实现

第一次不触发，最后一次触发

```js
function throttle(func, time) {
  let timer = null;
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        func.apply(this, args);
      }, time);
    }
  };
}
```

### 定时器和时间戳的结合版

也相当于节流和防抖的结合版，第一次和最后一次都会触发

```js
function throttle(func, time) {
  let preTime = 0;
  let timer = null;
  return function(...args) {
    if (Date.now() - preTime > time) {
      clearTimeout(timer);
      timer = null;
      preTime = Date.now();
      func.apply(this, args);
    } else if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, args);
      }, time);
    }
  };
}
```
