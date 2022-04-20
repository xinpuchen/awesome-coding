/*
 * @lc app=leetcode.cn id=39 lang=javascript
 *
 * [39] 组合总和
 *
 * https://leetcode-cn.com/problems/combination-sum/description/
 *
 * algorithms
 * Medium (72.77%)
 * Likes:    1907
 * Dislikes: 0
 * Total Accepted:    477.8K
 * Total Submissions: 656.6K
 * Testcase Example:  '[2,3,6,7]\n7'
 *
 * 给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target
 * 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。
 *
 * candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。 
 *
 * 对于给定的输入，保证和为 target 的不同组合数少于 150 个。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：candidates = [2,3,6,7], target = 7
 * 输出：[[2,2,3],[7]]
 * 解释：
 * 2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
 * 7 也是一个候选， 7 = 7 。
 * 仅有这两种组合。
 *
 * 示例 2：
 *
 *
 * 输入: candidates = [2,3,5], target = 8
 * 输出: [[2,2,2,2],[2,3,3],[3,5]]
 *
 * 示例 3：
 *
 *
 * 输入: candidates = [2], target = 1
 * 输出: []
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= candidates.length <= 30
 * 1 <= candidates[i] <= 200
 * candidate 中的每个元素都 互不相同
 * 1 <= target <= 500
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
	const result = [];
	// start是当前选择的起点索引 temp是当前的集合 sum是当前求和
	const dfs = (start, temp, sum) => {
		if (sum > target) return; // 结束当前递归
		if (sum === target) {
			result.push([ ...temp ]); // temp的拷贝 加入解集
			return;
		}
		// 枚举当前可选的数，从start开始
		for (let i = start; i < candidates.length; i++) {
			temp.push(candidates[i]); // 选这个数
			dfs(i, temp, sum + candidates[i]); // 基于此继续选择，传i，下一次就不会选到i左边的数
			temp.pop(); // 撤销选择，回到选择candidates[i]之前的状态，继续尝试选同层右边的数
		}
	};
	dfs(0, [], 0); // 最开始可选的数是从第0项开始的，传入一个空集合，sum也为0
	return result;
};
// @lc code=end
