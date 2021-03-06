/**
 * 柯里化：是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术
 *
 * 解题思路：
 * 1. 判断当前函数传入的参数个数是否大于等于 fn 需要的参数个数，如果是，直接运行函数 fn
 * 2. 如果传入的参数数量不够，返回一个闭包，暂存存入的参数，并重新返回 currying 函数
 */

function currying(fn, ...args) {
  if (args.length >= fn.length) {
    return fn(...args);
  } else {
    return (...newArgs) => currying(fn, ...args, ...newArgs);
  }
}
