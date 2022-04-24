/*
 * @lc app=leetcode.cn id=771 lang=javascript
 *
 * [771] 宝石与石头
 *
 * https://leetcode-cn.com/problems/jewels-and-stones/description/
 *
 * algorithms
 * Easy (85.16%)
 * Likes:    698
 * Dislikes: 0
 * Total Accepted:    164.2K
 * Total Submissions: 192.8K
 * Testcase Example:  '"aA"\n"aAAbbbb"'
 *
 *  给你一个字符串 jewels 代表石头中宝石的类型，另有一个字符串 stones 代表你拥有的石头。 stones
 * 中每个字符代表了一种你拥有的石头的类型，你想知道你拥有的石头中有多少是宝石。
 *
 * 字母区分大小写，因此 "a" 和 "A" 是不同类型的石头。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：jewels = "aA", stones = "aAAbbbb"
 * 输出：3
 *
 *
 * 示例 2：
 *
 *
 * 输入：jewels = "z", stones = "ZZ"
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= jewels.length, stones.length <= 50
 * jewels 和 stones 仅由英文字母组成
 * jewels 中的所有字符都是 唯一的
 *
 *
 */

// @lc code=start
/**
 * @param {string} jewels
 * @param {string} stones
 * @return {number}
 */
var numJewelsInStones = function(jewels, stones) {
	let res = 0;
	const set = new Set();
	for (let i = 0; i < jewels.length; i++) {
		set.add(jewels[i]);
	}
	for (let i = 0; i < stones.length; i++) {
		if (set.has(stones[i])) res++;
	}
	return res;
};
console.log(numJewelsInStones('aA', 'aAAbbbb'));
console.log(numJewelsInStones('z', 'ZZ'));
// @lc code=end
