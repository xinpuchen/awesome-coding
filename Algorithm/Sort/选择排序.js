/**
 * 选择排序
 *
 * 将第一个元素和其他元素进行比较，检查完所有元素后，最小的元素会被放到数组的第一个位置
 *
 * 解题思路：
 * 每次循环选取一个最小的数字放到前面的有序序列中
 *
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(1)
 */

const selectionSort = arr => {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
};
