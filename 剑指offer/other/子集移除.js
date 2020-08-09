/**
 * 子集移除
 *
 * 输入：[[1], [1,2,3], [1,2], [2,4], [5], [4]]
 *
 * 输出： [[1,2,3], [2,4], [5]]
 *
 * @param {array} arr
 * @returns array
 */
function removeSubsets(arr){
  var res = [];
  arr = [...new Set(arr.map(e => e.toString()))]; // 除重
  for(let r of arr){
    const l = arr.filter(e => e.indexOf(r) !== -1 ).length;
    if(l === 1) res.push(r);
  }
  return res.map(e => e.split(',').map(e => Number(e)));
}

console.log(removeSubsets([[1],[1,2,3],[1,2,3], [1,2], [2,4], [5], [4]]))
