/**
 * https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/
 *
 * 面试题05. 替换空格
 * 请实现一个函数，把字符串 s 中的每个空格替换成"%20"。
 *
 * 示例 1：

 * 输入：s = "We are happy."
 * 输出："We%20are%20happy."

 * 限制：

 * 0 <= s 的长度 <= 10000
 *
 */

/**
 * @param {string} s
 * @return {string}
 */
var replaceSpace = function(s) {
  var arr = s.split(' ');
  return arr.join('%20');
};

var replaceSpace = str => str.replace(/\s/g, '%20');

var test = {
  str: 'We Are Happy',
};

// 空格替换
console.log(replaceSpace(test.str));
// 浏览器编码
console.log(encodeURIComponent(test.str));
