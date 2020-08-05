/**
  * 输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。
  *
  * https://leetcode-cn.com/problems/shun-shi-zhen-da-yin-ju-zhen-lcof
  *
  * 示例 1：
  *
  * 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
  * 输出：[1,2,3,6,9,8,7,4,5]
  * 示例 2：
  *
  * 输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
  * 输出：[1,2,3,4,8,12,11,10,9,5,6,7]
  *  
  *
  * 限制：
  *
  * 0 <= matrix.length <= 100
  * 0 <= matrix[i].length <= 100
*/

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  const yLen = matrix.length;
  const xLen = matrix[0].length;
  if (yLen === 0 || xLen === 0) return [];
  const result = [];
  let top = 0, bottom = yLen - 1, left = 0, right = xLen - 1;
  // 循环条件
  while (top < bottom && left < right) {
    for (let i = left; i < right; i++) result.push(matrix[top][i]);
    for (let i = top; i < bottom; i++) result.push(matrix[i][right]);
    for (let i = right; i > left; i--) result.push(matrix[bottom][i]);
    for (let i = bottom; i > top; i--) result.push(matrix[i][left]);
    right--;
    top++;
    bottom--;
    left++;
  }
  if (top === bottom){  // 剩一行
    for (let i = left; i <= right; i++) result.push(matrix[top][i]);
  } else if (left === right) {  // 剩一列
    for (let i = top; i <= bottom; i++) result.push(matrix[i][left]);
  }
  return result;
};
console.log(spiralOrder([[2,3,4],[5,6,7],[8,9,10],[11,12,13],[14,15,16]]));
