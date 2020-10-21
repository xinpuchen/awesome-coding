/*
 * @lc app=leetcode.cn id=22 lang=javascript
 *
 * [22] 括号生成
 *
 * https://leetcode-cn.com/problems/generate-parentheses/description/
 *
 * algorithms
 * Medium (76.14%)
 * Likes:    1379
 * Dislikes: 0
 * Total Accepted:    191K
 * Total Submissions: 250K
 * Testcase Example:  '3'
 *
 * 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
 *
 *
 *
 * 示例：
 *
 * 输入：n = 3
 * 输出：[
 * ⁠      "((()))",
 * ⁠      "(()())",
 * ⁠      "(())()",
 * ⁠      "()(())",
 * ⁠      "()()()"
 * ⁠    ]
 *
 *
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  const result = [];
  const dfs = (str, left, right) => {
    if(str.length === 2 * n) {
      result.push(str);
      return;
    };
    if(left < n) {
      dfs(str + '(', left + 1, right);
    }
    if(right < left){
      dfs(str + ')', left, right + 1);
    }
  }
  dfs('', 0, 0);
  return result;
};
// @lc code=end

