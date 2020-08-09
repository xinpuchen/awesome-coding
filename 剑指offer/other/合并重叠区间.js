/**
 * 合并重叠区间。
 *
 * 输入: [[1,3],[2,6],[8,10],[15,18]]
 *
 * 输出: [[1,6],[8,10],[15,18]]
 *
 * 解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6]
 *
 */

/**
 *
 * @param {*} arrs
 */
const mergeInterval = (arrs) => {
  if(arrs.length === 0) return [];
  const res = [];
  const len = arrs.length;
  let start = arrs[0][0], end = arrs[0][1];
  for(let i = 1; i < len; i++){
    if(arrs[i][0] < end){
      end = arrs[i][1];
    } else {
      res.push([start, end]);
      start = arrs[i][0];
      end = arrs[i][1]
    }
  }
  res.push([start, end]);
  return res;
}

const arr = [
  [1,3],
  [2,6],
  [7,9],
  [8,10],
  [12,18]
]

console.log(mergeInterval(arr));
