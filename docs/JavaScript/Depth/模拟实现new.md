# 模拟 new

new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一

## 要解决的问题

1. 返回一个对象
2. 返回的对象可以访问到构造函数里的属性，也可以访问到构造函数原型上的属性
3. 构造函数是否有返回值，返回值是否有效（是否为一个对象）

```js
function mockNew() {
  var constructor = Array.prototype.shift.call(arguments);
  var obj = Object.create(constructor.prototype);
  var result = constructor.apply(obj, arguments);
  if (result && typeof result === "object") {
    return result;
  }
  return obj;
}
```
