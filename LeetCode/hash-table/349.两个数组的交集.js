/*
 * @lc app=leetcode.cn id=349 lang=javascript
 *
 * [349] 两个数组的交集
 *
 * https://leetcode-cn.com/problems/intersection-of-two-arrays/description/
 *
 * algorithms
 * Easy (73.90%)
 * Likes:    528
 * Dislikes: 0
 * Total Accepted:    288.4K
 * Total Submissions: 389.5K
 * Testcase Example:  '[1,2,2,1]\n[2,2]'
 *
 * 给定两个数组 nums1 和 nums2 ，返回 它们的交集 。输出结果中的每个元素一定是 唯一 的。我们可以 不考虑输出结果的顺序 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums1 = [1,2,2,1], nums2 = [2,2]
 * 输出：[2]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
 * 输出：[9,4]
 * 解释：[4,9] 也是可通过的
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums1.length, nums2.length <= 1000
 * 0 <= nums1[i], nums2[i] <= 1000
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
	const set1 = new Set(nums1);
	const set2 = new Set(nums2);
	const set_intersection = (s1, s2) => {
		if (s1.size < s2.size) {
			return set_intersection(s2, s1);
		}
		for (const set of set2) {
			if (!set1.has(set)) {
				set2.delete(set);
			}
		}
		return [ ...set2 ];
	};
	return set_intersection(set1, set2);
};
console.log(intersection([ 1, 2, 2, 1 ], [ 2, 2 ]));
console.log(intersection([ 4, 9, 5 ], [ 9, 4, 9, 8, 4 ]));
// @lc code=end
