/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 *
 * https://leetcode-cn.com/problems/permutations/description/
 *
 * algorithms
 * Medium (76.74%)
 * Likes:    905
 * Dislikes: 0
 * Total Accepted:    196.3K
 * Total Submissions: 255.2K
 * Testcase Example:  '[1,2,3]'
 *
 * 给定一个 没有重复 数字的序列，返回其所有可能的全排列。
 *
 * 示例:
 *
 * 输入: [1,2,3]
 * 输出:
 * [
 * ⁠ [1,2,3],
 * ⁠ [1,3,2],
 * ⁠ [2,1,3],
 * ⁠ [2,3,1],
 * ⁠ [3,1,2],
 * ⁠ [3,2,1]
 * ]
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  if(!nums || nums.length <= 1) return [nums];
  const result =[];
  const arr = nums.slice();
  const len = nums.length;
  const run = (i) => {
    if (i === len - 1) {
        result.push(arr.slice());
        return result;
    }
    for(let j = i; j < len; j++) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      run(i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  run(0);
  return result;
};
// @lc code=end

console.log(permute([1,2,3]))
