/**
 * 输入一个非负整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。
 *
 * https://leetcode-cn.com/problems/ba-shu-zu-pai-cheng-zui-xiao-de-shu-lcof
 *
 * 示例 1:
 *
 * 输入: [10,2]
 * 输出: "102"
 * 示例 2:
 *
 * 输入: [3,30,34,5,9]
 * 输出: "3033459"
 *  
 *
 * 提示:
 *
 * 0 < nums.length <= 100
 *
 * 说明:
 *
 * 输出结果可能非常大，所以你需要返回一个字符串而不是整数
 * 拼接起来的数字可能会有前导 0，最后结果不需要去掉前导 0
 *
 */

/**
 * @param {number[]} nums
 * @return {string}
 */
var minNumber = function(nums) {
  if(nums.length === 0) return '';
  nums.sort((a, b) => {
    const m = +`${a}${b}`;
    const n = +`${b}${a}`;
    return m - n; // 如求最大的那个数，这是 return n - m; 即可
  });
  return nums.reduce((res, cur) => `${res}${cur}`, '')
};

console.log(minNumber([3,30,34,5,9]))
