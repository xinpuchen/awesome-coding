/**
 * 归并排序
 *
 * 把一系列排好序的子序列，合并成一个大的完整有序序列
 *
 * 利用归并的方法实现的排序方法
 * 该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。（分治法将问题分成一些小的问题然后递归求解，
 * 而治的阶段则将各分的阶段得到的各答案"修补"在一起，即分而治之)
 *
 * 1. 将已有的子序列合并，得到完全有序的序列
 * 2. 即先使每个子序列排序，再使子序列段间有序
 * 3. 若将两个有序列表合并成一个有序列表，称为二路归并
 *
 * 分割：
 * 1. 将数组从中点进行分割，分为左右两个数组
 * 2. 归并分割左右数组，知道数组长度小于 2
 *
 * 归并：
 * 1. 如果需要合并，那么左右两个数组已经有序了
 * 2. 创建一个临时存储数组 temp，比较两个数组第一个元素，将较小的元素存储到临时数组
 * 3. 若左右数组有一个为空，那么此时另一个数组一定比临时数组元素都要大，可一次全部加入
 *
 * 时间复杂度：O(nlogn)
 * 空间复杂度：O(n)
 */

/**
 * 解法一
 *
 * 分割数组时直接将数组分割为两个数组，合并时直接合并数组
 *
 * 优点：思路简单，写法简单
 * 缺点：空间复杂度略高，需要复制多个数组
 *
 */
const mergeSort1 = (
  arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
) => {
  if (arr.length < 2) return arr;
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  return merge1(mergeSort1(left), mergeSort1(right));
};
const merge1 = (left, right) => {
  const temp = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      temp.push(left.shift());
    } else {
      temp.push(right.shift());
    }
  }
  while (left.length) {
    temp.push(left.shift());
  }
  while (right.length) {
    temp.push(right.shift());
  }
  return temp;
};
console.log(...mergeSort1());

/**
 * 解法二
 *
 * 记录数组的索引
 * 使用left、right两个索引来限定当前分割的数组
 *
 * 优点：空间复杂度低，只需一个temp存储空间，不需要拷贝数组
 * 缺点：写法复杂
 */
const mergeSort2 = (arr, left = 0, right = arr.length - 1, temp = []) => {
  if (left < right) {
    const middle = Math.floor((left + right) / 2);
    mergeSort2(arr, left, middle, temp);
    mergeSort2(arr, middle + 1, right, temp);
    merge2(arr, left, right, temp);
  }
  return arr;
};
const merge2 = (arr, left, right, temp) => {
  const middle = Math.floor((left + right) / 2);
  let l = left;
  let r = middle + 1;
  let tempIndex = 0;
  while (l <= middle && r <= right) {
    if (arr[l] < arr[r]) {
      temp[tempIndex++] = arr[l++];
    } else {
      temp[tempIndex++] = arr[r++];
    }
  }
  while (l <= middle) {
    temp[tempIndex++] = arr[l++];
  }
  while (r <= right) {
    temp[tempIndex++] = arr[r++];
  }
  tempIndex = 0;
  for (let i = left; i <= right; i++) {
    arr[i] = temp[tempIndex++];
  }
};

console.log(
  ...mergeSort2([3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48])
);
