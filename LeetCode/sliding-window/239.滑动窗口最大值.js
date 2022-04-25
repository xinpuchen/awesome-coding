/*
 * @lc app=leetcode.cn id=239 lang=javascript
 *
 * [239] 滑动窗口最大值
 *
 * https://leetcode-cn.com/problems/sliding-window-maximum/description/
 *
 * algorithms
 * Hard (49.80%)
 * Likes:    1573
 * Dislikes: 0
 * Total Accepted:    280.6K
 * Total Submissions: 563K
 * Testcase Example:  '[1,3,-1,-3,5,3,6,7]\n3'
 *
 * 给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k
 * 个数字。滑动窗口每次只向右移动一位。
 *
 * 返回 滑动窗口中的最大值 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
 * 输出：[3,3,5,5,6,7]
 * 解释：
 * 滑动窗口的位置                最大值
 * ---------------               -----
 * [1  3  -1] -3  5  3  6  7       3
 * ⁠1 [3  -1  -3] 5  3  6  7       3
 * ⁠1  3 [-1  -3  5] 3  6  7       5
 * ⁠1  3  -1 [-3  5  3] 6  7       5
 * ⁠1  3  -1  -3 [5  3  6] 7       6
 * ⁠1  3  -1  -3  5 [3  6  7]      7
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1], k = 1
 * 输出：[1]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 10^5
 * -10^4 <= nums[i] <= 10^4
 * 1 <= k <= nums.length
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
	const window = [];
	const result = [];
	for (let i = 0; i < nums.length; i++) {
		// 当前进入的元素下标 - 窗口头部元素的下标 >= k，则头部元素移出队列（即使最大也已不在窗口内了）
		if (i - window[0] >= k) {
			window.shift();
		}
		let j = window.length - 1;
		// 从队尾巴开始，删除比当前小的位置，可保证下次循环窗口头部的元素出队后，窗口头部元素仍然为最大值
		while (j >= 0 && nums[window[j]] <= nums[i]) {
			j--;
			window.pop();
		}
		window.push(i);
		// 窗口不全时，不计入结果
		if (i >= k - 1) {
			result.push(nums[window[0]]);
		}
	}
	return result;
};
console.log(maxSlidingWindow([ 3, 3, 4, 2, 6, 2, 5, 1 ], 3));
// @lc code=end
