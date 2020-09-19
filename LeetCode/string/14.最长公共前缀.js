/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 *
 * https://leetcode-cn.com/problems/longest-common-prefix/description/
 *
 * algorithms
 * Easy (38.71%)
 * Likes:    1271
 * Dislikes: 0
 * Total Accepted:    362.4K
 * Total Submissions: 934.8K
 * Testcase Example:  '["flower","flow","flight"]'
 *
 * 编写一个函数来查找字符串数组中的最长公共前缀。
 *
 * 如果不存在公共前缀，返回空字符串 ""。
 *
 * 示例 1:
 *
 * 输入: ["flower","flow","flight"]
 * 输出: "fl"
 *
 *
 * 示例 2:
 *
 * 输入: ["dog","racecar","car"]
 * 输出: ""
 * 解释: 输入不存在公共前缀。
 *
 *
 * 说明:
 *
 * 所有输入只包含小写字母 a-z 。
 *
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  if(!strs || strs.length === 0) return '';
  if(strs.length === 1) return strs[0];
  let max = 0, min = 0;
  // 找出最大、最小值的字符串，处在中间位置的一定有公共前缀
  for(let i = 1; i < strs.length; i++){
    if(strs[min] > strs[i]) min = i;
    if(strs[max] < strs[i]) max = i;
  }
  // 寻找最大值与最小值的公共前缀
  for(let j = 0; j < strs[min].length; j++){
    if(strs[min].charAt(j) !== strs[max].charAt(j)){
      return strs[min].substring(0, j);
    }
  }
  return strs[min];
};

console.log(longestCommonPrefix(["flower","flow","flopght"]));
// @lc code=end

