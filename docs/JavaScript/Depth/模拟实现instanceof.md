# 模拟 instanceof

instanceof：用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链

## 要解决的问题

1. 判断当前实力对象的原型是否存在
2. 返回一个 boolean 值

```js
function mockInstanceof(target, origin) {
  const prototype = target.__proto__;
  if (!prototype) return false;
  if (prototype === origin.prototype) {
    return true;
  } else {
    return mockInstanceof(prototype, origin);
  }
}
```
