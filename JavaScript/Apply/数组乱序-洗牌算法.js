/**
 * 洗牌算法：从最后一个元素开始，从数组中随机选出一个位置，交换，直到第一个元素
 */

const disorder = array => {
  const len = array.length;
  let current = len - 1;
  let random;
  while (current > -1) {
    random = Math.floor(len * Math.random());
    [array[current], array[random]] = [array[random], array[current]];
    current--;
  }
  return array;
};
