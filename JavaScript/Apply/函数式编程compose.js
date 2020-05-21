/**
 * 函数式编程
 *
 * 参数在函数间就好像通过‘管道’传输一样，最右边的函数接收外界参数，返回结果传给左边的函数，最后输出结果
 */

const compose = (f, g) => (...args) => f(g(...args));

function f1(str) {
  return str.toUpperCase();
}
function f2(str) {
  return str + "!";
}
console.log(compose(f1, f2)("hello world"));
