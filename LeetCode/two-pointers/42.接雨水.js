/*
 * @lc app=leetcode.cn id=42 lang=javascript
 *
 * [42] 接雨水
 *
 * https://leetcode-cn.com/problems/trapping-rain-water/description/
 *
 * algorithms
 * Hard (60.09%)
 * Likes:    3377
 * Dislikes: 0
 * Total Accepted:    464.1K
 * Total Submissions: 765.6K
 * Testcase Example:  '[0,1,0,2,1,0,1,3,2,1,2,1]'
 *
 * 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
 * 输出：6
 * 解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。
 *
 *
 * 示例 2：
 *
 *
 * 输入：height = [4,2,0,3,2,5]
 * 输出：9
 *
 *
 *
 *
 * 提示：
 *
 *
 * n == height.length
 * 1 <= n <= 2 * 10^4
 * 0 <= height[i] <= 10^5
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */

/**
 * 按行来求
 * 时间复杂度：如果最大的数是 mm，个数是 nn，那么就是 O(m*n)
 * 空间复杂度：O(1)
 */
var trap = function(height) {
	let result = 0;
	const max = Math.max(...height);
	for (let i = 1; i <= max; i++) {
		let isStart = false;
		let temp = 0;
		for (let j = 0; j < height.length; j++) {
			if (isStart && height[j] < i) {
				temp++;
			} else if (height[j] >= i) {
				result += temp;
				temp = 0;
				isStart = true;
			}
		}
	}
	return result;
};

/**
 * 按列来求
 * 时间复杂度：O(n²），遍历每一列需要 nn，找出左边最高和右边最高的墙加起来刚好又是一个 nn，所以是 n²
 * 空间复杂度：O(1）
 */
var trap = function(height) {
	let result = 0;
	for (let i = 1; i < height.length - 1; i++) {
		// 使用 Math.max() 太暴力了，hhh
		// const leftMax = Math.max(...height.slice(0, i));
		// const rightMax = Math.max(...height.slice(i + 1));
		let leftMax = 0,
			rightMax = 0;
		for (let j = 0; j < i; j++) {
			if (height[j] > leftMax) {
				leftMax = height[j];
			}
		}
		for (let j = i + 1; j < height.length; j++) {
			if (height[j] > rightMax) {
				rightMax = height[j];
			}
		}
		const min = Math.min(leftMax, rightMax);
		if (height[i] < min) {
			result += min - height[i];
		}
	}
	return result;
};

/**
 * 动态规划
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)，用来保存每一列左边最高的墙和右边最高的墙
 */
var trap = function(height) {
	let result = 0;
	const maxLefts = [];
	const maxRights = [];
	for (let i = 1; i < height.length - 1; i++) {
		maxLefts[i] = Math.max(maxLefts[i - 1] || 0, height[i - 1]);
	}
	for (let i = height.length - 2; i >= 0; i--) {
		maxRights[i] = Math.max(maxRights[i + 1] || 0, height[i + 1]);
	}
	for (let i = 1; i < height.length - 1; i++) {
		const min = Math.min(maxLefts[i], maxRights[i]);
		if (height[i] < min) {
			result += min - height[i];
		}
	}
	return result;
};

/**
 * 双指针
 * 时间复杂度： O(n)
 * 空间复杂度： O(1)
 * 最优解
 */
var trap = function(height) {
	let result = 0;
	let lMax = 0,
		rMax = 0;
	let l = 0,
		r = height.length - 1;
	while (l < r) {
		if (height[l] < height[r]) {
			if (height[l] > lMax) {
				lMax = height[l];
			} else {
				result += lMax - height[l];
			}
			l++;
		} else {
			if (height[r] > rMax) {
				rMax = height[r];
			} else {
				result += rMax - height[r];
			}
			r--;
		}
	}
	return result;
};
// 双指针精简写法
var trap = function(height) {
	let result = 0;
	let min = 0, // 左右最大值中的较小值
		max = 0; // 左右最大值中的较大值
	let l = 0,
		r = height.length - 1;
	while (l < r) {
		min = height[height[l] < height[r] ? l++ : r--];
		max = Math.max(max, min);
		result += max - min;
	}
	return result;
};

/**
 * 使用栈
 * 时间复杂度：虽然 while 循环里套了一个 while 循环，但是考虑到每个元素最多访问两次，入栈一次和出栈一次，所以时间复杂度是 O(n)
 * 空间复杂度：O(n)，栈的空间
 */
var trap = function(height) {
	let result = 0;
	const stacks = [];
	const getStackTop = () => {
		try {
			return stacks.at(-1);
		} catch (e) {
			return stacks[stacks.length - 1];
			console.error(e);
		}
	};
	for (let i = 0; i < height.length; i++) {
		while (stacks.length && height[i] > height[getStackTop()]) {
			const top = stacks.pop();
			if (stacks.length === 0) break;
			const w = i - getStackTop() - 1;
			const h = Math.min(height[i], height[getStackTop()]) - height[top];
			result += w * h;
		}
		stacks.push(i);
	}
	return result;
};
console.log(trap([ 4, 2, 0, 3, 2, 5 ]));
console.log(trap([ 0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1 ]));
// @lc code=end
