/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 *
 * https://leetcode-cn.com/problems/3sum/description/
 *
 * algorithms
 * Medium (34.84%)
 * Likes:    4683
 * Dislikes: 0
 * Total Accepted:    932.8K
 * Total Submissions: 2.6M
 * Testcase Example:  '[-1,0,1,2,-1,-4]'
 *
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0
 * 且不重复的三元组。
 *
 * 注意：答案中不可以包含重复的三元组。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [-1,0,1,2,-1,-4]
 * 输出：[[-1,-1,2],[-1,0,1]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = []
 * 输出：[]
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [0]
 * 输出：[]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0
 * -10^5
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
	const result = [];
	const len = nums.length;
	if (len < 3) return [];
	nums.sort((a, b) => a - b);
	console.log(nums);
	for (let i = 0; i < len; i++) {
		// 跳过重复数字
		if (i && nums[i] === nums[i - 1]) continue;
		let l = i + 1,
			r = len - 1;
		while (l < r) {
			const sum = nums[i] + nums[l] + nums[r];
			if (sum > 0) {
				r--;
			} else if (sum < 0) {
				l++;
			} else {
				result.push([ nums[i], nums[l], nums[r] ]);
				l++;
				r--;
				while (nums[l] === nums[l - 1]) {
					l++;
				}
				while (nums[r] === nums[r + 1]) {
					r--;
				}
			}
		}
	}
	return result;
};
console.log(threeSum([ -1, 0, 1, 2, -1, -4 ]));
// @lc code=end
