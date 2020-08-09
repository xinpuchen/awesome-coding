/**
 * https://leetcode-cn.com/problems/he-wei-sde-lian-xu-zheng-shu-xu-lie-lcof/
 *
 * 和为s的连续正数序列
 *
 * 输入一个正整数 target ，输出所有和为 target 的连续正整数序列（至少含有两个数）。
 *
 * 序列内的数字由小到大排列，不同序列按照首个数字从小到大排列。
 *
 * 示例 1：
 *
 * 输入：target = 9
 * 输出：[[2,3,4],[4,5]]
 * 示例 2：
 *
 * 输入：target = 15
 * 输出：[[1,2,3,4,5],[4,5,6],[7,8]]
 */

/**
 * @param {number} target
 * @return {number[][]}
 */
const genArr = (start, end) => {
  const res = [];
  while(start++ <= end){
    res.push(start - 1)
  }
  return res;
}
var findContinuousSequence = function(target) {
  if(target < 3) return -1;
  const res = [];
  let start = 1, end = 2;
  while(start <= target / 2){
    while(end <= target / 2 + 1){
      const sum = (start + end) * (end - start + 1) / 2;
      if(sum < target){
        end += 1;
        break;
      } else {
        if(sum === target) {
          res.push(genArr(start, end));
        }
        start += 1;
        end = start + 1;
      }
    }
  }
  return res;
};
console.log(findContinuousSequence(15))
