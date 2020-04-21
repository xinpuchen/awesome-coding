# 模拟 bind

bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。

## 要解决的问题

1. 返回一个函数
2. 执行 bind 和返回函数时都可传参
3. 当 bind 返回的函数作为构造函数使用的时候，bind 传入的 this 会忽略，将原函数当作构造器，但参数依然有效

```js
Function.prototype.mockBind = function(context, ...args1) {
  if (this === Function.prototype) {
    return this;
  }
  const _this = this;
  return function fn(...args2) {
    if (this instanceof fn) {
      return new _this(...args1, ...args2);
    }
    return _this.apply(context, args1.concat(args2));
  };
};
```

向下兼容

```js
Function.prototype.mockBind = function(context) {
  if (this === Function.prototype) {
    return this;
  }
  var _this = this;
  var args1 = Array.prototype.slice.call(arguments, 1);
  var fNOP = function() {};
  var fBound = function() {
    var args2 = Array.prototype.slice.call(arguments);
    return _this.apply(
      this instanceof fNOP ? this : context,
      args1.concat(args2)
    );
  };
  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};
```
