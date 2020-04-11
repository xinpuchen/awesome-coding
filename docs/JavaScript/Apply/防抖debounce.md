# 防抖

不管事件出发频率多高，一定在事件触发后 n 秒才执行，如果在触发后 n 秒内又触发，则重新计时

## 应用场景

1. 窗口大小变化，样式调整
2. 搜索框输入后 n 秒执行
3. 表单 change 后 n 秒验证

## 要解决的问题

1. 返回一个函数
2. 对传入必包的参数透传
3. 在 debounce 函数中返回一个闭包，这里用的普通 function，里面的 setTimeout 则用的箭头函数，这样做的意义是让 this 的指向准确，this 的真实指向并非 debounce 的调用者，而是返回闭包的调用者
4. 传如第三个参数 flag，确定是否第一次执行，默认 false

```js
function debounce(func, time) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, time);
  };
}
```

添加 flag 参数，确定是否第一次执行，默认 false

```js
function debounce(func, time, flag) {
  var timer = null;
  return function() {
    var _this = this;
    clearTimeout(timer);
    if (flag) {
      var callNow = !timer;
      timer = setTimeout(function() {
        timer = null;
      }, time);
      if (callNow) func.apply(_this, arguments);
    } else {
      timer = setTimeout(function() {
        func.apply(_this, arguments);
      }, time);
    }
  };
}
```
