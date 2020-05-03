/**
 * 在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。
 * 请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数
 *
 */

/**
 * 解题思路
 *
 * 1. 可以直接利用左下角数字开始查找
 * 2. 大于：比较上移
 * 3. 小于：比较右移
 */
const Find = (arr, target) => {
  let i = arr.length - 1;
  let j = 0;
  return compare(arr, target, i, j);
};

const compare = (arr, target, i, j) => {
  if (arr[i] === undefined || arr[i][j] === undefined) return false;
  if (arr[i][j] === target) {
    return true;
  } else if (arr[i][j] < target) {
    return compare(arr, target, i, j + 1);
  } else if (arr[i][j] > target) {
    return compare(arr, target, i - 1, j);
  }
};
