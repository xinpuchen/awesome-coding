/**
 * 顺时针打印矩阵
 *
 * 输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
 * 输出：[1,2,3,4,8,12,11,10,9,5,6,7]
 */
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  if (matrix.length === 0) return [];
  const result = [];
  let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;
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
  if (top === bottom){ //剩下一行
    for (let i = left; i <= right; i++) result.push(matrix[top][i]);
  } else if (left === right) { // 剩下一列
    for (let i = top; i <= bottom; i++) result.push(matrix[i][left]);
  }
  return result;
};

console.log(spiralOrder([[1,2,3,4],[5,6,7,8],[9,10,11,12]]))
