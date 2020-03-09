/**
 * call 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法，apply 的区别是传入一个数组参数
 *
 * 要解决的问题：
 * 1. 判断当前 this 是否为函数，防止 Function.prototype.call 直接调用
 * 2. context 为可选参数，不如不传默认上下文为 window
 * 3. 为 context 创建不重名的属性，将当前函数赋值给这个属性
 * 4. 处理参数，传入第一个后面的所以参数
 * 5. 调用函数后删除这个不重名的属性
 */

Function.prototype.fakeCall = function(obj, ...args) {
  if (this === Function.prototype) {
    return undefined;
  }
  const context = obj || window;
  const fn = Symbol();
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
};

// apply 实现与 call 类似，参数为数组
Function.prototype.fakeApply = function(obj, args) {
  if (this === Function.prototype) {
    return undefined;
  }
  const context = obj || window;
  const fn = Symbol();
  context[fn] = this;
  let result;
  if (Array.isArray(args)) {
    result = context[fn](...args);
  } else {
    result = context[fn]();
  }
  delete context[fn];
  return result;
};

// 因为 call、apply 是 ES3 的方法，向下兼容
Function.prototype.fakeCall = function(obj){
  var context = obj || window;
  var args = [];
  context.fn = this;
  for(var i = 1; len = arguments.length; i < len; i++){
    args.push("arguments[" + i + "]");
  }
  var result = eval("context.fn(" + args + ")");
  delete context.fn;
  return result;
}
