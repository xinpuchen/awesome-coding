/**
 * 希尔排序
 *
 * 是插入排序的升级，分组插入排序。插入排序间隔为 gap 的元素，逐渐减少 gap 至 1
 * 相同的元素会分到不同的子序列，可能会破坏相对顺序，故为不稳定的排序算法
 *
 * 时间复杂度：O(nlogn)
 * 空间复杂度：O(1)
 */

const shellSort = arr => {
  if (arr && arr.length === 0) return;
  let len = arr.length;
  let gap = 1;
  while (gap < len / 3) {
    gap = 3 * gap + 1; //设置间隔
  }
  while (gap >= 1) {
    for (var i = gap; i < len; i++) {
      for (j = i; j >= gap && arr[j] < arr[j - gap]; j -= gap) {
        [arr[j], arr[j-gap]] = [arr[j-gap], arr[j]]
      }
    }
    gap = (gap - 1) / 3;
  }
  return arr;
}
