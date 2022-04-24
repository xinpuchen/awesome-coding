/*
 * @lc app=leetcode.cn id=387 lang=javascript
 *
 * [387] 字符串中的第一个唯一字符
 *
 * https://leetcode-cn.com/problems/first-unique-character-in-a-string/description/
 *
 * algorithms
 * Easy (54.43%)
 * Likes:    547
 * Dislikes: 0
 * Total Accepted:    290.2K
 * Total Submissions: 530.2K
 * Testcase Example:  '"leetcode"'
 *
 * 给定一个字符串 s ，找到 它的第一个不重复的字符，并返回它的索引 。如果不存在，则返回 -1 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入: s = "leetcode"
 * 输出: 0
 *
 *
 * 示例 2:
 *
 *
 * 输入: s = "loveleetcode"
 * 输出: 2
 *
 *
 * 示例 3:
 *
 *
 * 输入: s = "aabb"
 * 输出: -1
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= s.length <= 10^5
 * s 只包含小写字母
 *
 *
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
	const map = new Map();
	for (let i = 0; i < s.length; i++) {
		if (map.has(s[i])) {
			// get 比 set 更快，去除不必要的 set
			if (map.get(s[i]) < 3) {
				map.set(s[i], map.get(s[i]) + 1);
			}
		} else {
			map.set(s[i], 1);
		}
	}
	const keys = [ ...map.keys() ];
	for (let i = 0; i < keys.length; i++) {
		if (map.get(keys[i]) === 1) {
			return s.indexOf(keys[i]);
		}
	}
	return -1;
};
console.log(firstUniqChar('leetcode'));
console.log(firstUniqChar('google'));
console.log(firstUniqChar('abccba'));
// @lc code=end
