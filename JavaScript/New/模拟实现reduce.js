/**
 * 模拟实现 reduce
 *
 * 要点：
 * 1. 初始值不传怎么处理
 * 2. 回调函数的参数有哪些，返回值如何处理
 */

Array.prototype.mockReduce = function(fn, initialValue) {
  var arr = Array.prototype.slice.call(this);
  var result = initialValue || arr[0];
  var startIndex = initialValue ? 0 : 1;
  for (var i = startIndex, len = arr.length; i < len; i++) {
    result = fn.call(null, result, i, this);
  }
  return result;
};
