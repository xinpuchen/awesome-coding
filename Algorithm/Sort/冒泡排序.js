/**
 * 冒泡排序
 *
 * 解题思路：
 * 循环数组，比较当前元素和下一个元素，如果当前元素比下一个元素大，向上冒泡
 * 这样一次循环之后最后一个数就是本数组最大的数
 * 下一次循环继续上面的操作，不循环已经排序好的数
 *
 * 优化：当一次循环没有发生冒泡，说明已经排序完成，停止循环
 *
 * 时间复杂度：O(n^2)
 * 空间复杂度：O(1)
 */

const bubbleSort = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    let complete = true;
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        complete = false;
      }
    }
    if (complete) {
      break;
    }
  }
  return arr;
};
