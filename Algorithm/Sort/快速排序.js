/**
 * 快速排序
 *
 * 选择基准元素，将大于和小于基准元素的元素分别放到不同的数组，重复知道数组中只有一个元素
 *
 * 通过一趟排序将需要排序的数据分割成独立的两部分，其中一部分的所有数据比另一部分的所有数据要小，
 * 再按这种方法对这两部分数据分别进行快速排序，整个排序过程可以递归进行，使整个数据变成有序序列
 *
 * 解题思路：
 *
 * 1. 选择一个基准 target，一般选择第一个数
 * 2. 将比 target 小的数据移到左边，比 target 大的元素移到数据右边
 * 3. 分别对 target 左侧和右侧的元素进行快速排序
 *
 * 时间复杂度：平均 O(nlogn)，最坏 O(n2)，实际上大多数情况下小于 O(nlogn)
 * 空间复杂度：O(logn)（递归调用消耗）
 */

/**
 * 递归解法
 *
 * 1. 单独开辟两个存储空间left和right来存储每次递归比target小和大的序列
 * 2. 每次递归直接返回left、target、right拼接后的数组
 *
 * 特点：浪费大量存储空间，写法简单
 */

const quickSort1 = (
  arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
) => {
  if (arr.length < 2) return arr;
  const [target] = arr;
  const left = [];
  const right = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < target) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort1(left), target, ...quickSort1(right)];
};
// console.log(...quickSort1());

/**
 * 索引解法
 *
 * 1. 记录一个索引l从数组最左侧开始，记录一个索引 r 从数组右侧开始
 * 2. 在 l < r 的条件下，找到右侧小于 target 的值 array[r]，并将其赋值到 array[l]
 * 3. 在 l < r 的条件下，找到左侧大于 target 的值 array[l]，并将其赋值到 array[r]
 * 4. 这样让 l = r 时，左侧的值全部小于 target，右侧的值全部小于 target，将 target 放到该位置
 *
 * 特点：不需要额外存储空间，写法思路稍复杂
 *
 */

const quickSort2 = (arr, start = 0, end = arr.length - 1) => {
  if (start >= end) return;
  const target = arr[start];
  let l = start;
  let r = end;
  while (l < r) {
    while (l < r && arr[r] >= target) {
      r--;
    }
    arr[l] = arr[r];
    while (l < r && arr[l] < target) {
      l++;
    }
    arr[r] = arr[l];
  }
  arr[l] = target;
  quickSort2(arr, start, l - 1);
  quickSort2(arr, l + 1, end);
  return arr;
};
