/*
 * @lc app=leetcode.cn id=498 lang=javascript
 *
 * [498] 对角线遍历
 *
 * https://leetcode-cn.com/problems/diagonal-traverse/description/
 *
 * algorithms
 * Medium (41.57%)
 * Likes:    114
 * Dislikes: 0
 * Total Accepted:    21.1K
 * Total Submissions: 50.7K
 * Testcase Example:  '[[1,2,3],[4,5,6],[7,8,9]]'
 *
 * 给定一个含有 M x N 个元素的矩阵（M 行，N 列），请以对角线遍历的顺序返回这个矩阵中的所有元素，对角线遍历如下图所示。
 *
 * 示例:
 *
 * 输入:
 * [
 * ⁠[ 1, 2, 3 ],
 * ⁠[ 4, 5, 6 ],
 * ⁠[ 7, 8, 9 ]
 * ]
 *
 * 输出:  [1,2,4,7,5,3,6,8,9]
 *
 * 说明:
 *
 * 给定矩阵中的元素总数不会超过 100000 。
 *
 *
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var findDiagonalOrder = function(matrix) {
  const yLen = matrix.length;
  const xLen = yLen && matrix[0].length;
  if(yLen === 0 || xLen === 0) return [];
  const res = [];
  let x = 0, y = 0;
  let flag = true; // true 为右上， false 为左下
  while(x < yLen && y < xLen){
    res.push(matrix[x][y]);
    if(flag){
      if(x === 0 || y === xLen - 1){
        if(y === xLen - 1){
          x++;
        } else {
          y++;
        }
        flag = false;
      } else {
        y++;
        x--;
      }
    } else {
      if(y === 0 || x === yLen - 1){
        if(x === yLen - 1){
          y++;
        }else{
          x++;
        }
        flag = true;
      }else{
        x++;
        y--;
      }
    }
  }
  return res;
};
// @lc code=end

console.log(findDiagonalOrder([
  [ 1, 2, 3 ],
  [ 4, 5, 6 ],
  [ 7, 8, 9 ],
  [10, 11, 12],
  [13, 14, 15]
 ]))
