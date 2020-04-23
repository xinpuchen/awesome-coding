/**
 * 接雨水
 *
 * 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水
 *
 * 输入：[0,1,0,2,1,0,1,3,2,1,2,1]
 * 输出：6
 *
 */
const trap = (arr) => {
  let min = 0,
    max = 0;
  let l = 0,
    r = arr.length - 1;
  let result = 0;
  while (l < r) {
    min = arr[arr[l] < arr[r] ? l++ : r--];
    max = Math.max(max, min);
    result += max - min;
  }
  return result;
};
console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));
