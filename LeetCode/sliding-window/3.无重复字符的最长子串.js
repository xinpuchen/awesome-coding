/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 *
 * https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/description/
 *
 * algorithms
 * Medium (38.58%)
 * Likes:    7161
 * Dislikes: 0
 * Total Accepted:    1.6M
 * Total Submissions: 4.1M
 * Testcase Example:  '"abcabcbb"'
 *
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: s = "abcabcbb"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 *
 *
 * 示例 2:
 *
 *
 * 输入: s = "bbbbb"
 * 输出: 1
 * 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
 *
 *
 * 示例 3:
 *
 *
 * 输入: s = "pwwkew"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
 * 请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= s.length <= 5 * 10^4
 * s 由英文字母、数字、符号和空格组成
 *
 *
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */

var lengthOfLongestSubstring = function(s) {
	let left = 0;
	let long = 0;
	const map = new Map();
	for (let right = 0; right < s.length; right++) {
		// 遇到重复字符时还要判定 该重复字符的上一次出现位置是否在 滑动窗口左边界 left 的右边
		if (map.has(s[right]) && map.get(s[right]) >= left) {
			// 都满足，则更新，更新到最近出现的那个重复字符，它的上一个索引的右边
			left = map.get(s[right]) + 1;
		}
		// 比较滑动窗口大小与 long 的长度
		long = Math.max(long, right - left + 1);
		// 无论有没有重复，每次遍历都要更新字符的出现位置
		map.set(s[right], right);
	}
	return long;
};
// @lc code=end
