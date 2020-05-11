/**
 * 广度优先搜索
 *
 * 广度优先搜索（BFS）是一种遍历或搜索数据结构（如树或图）的算法，它的特点是越是接近根结点的结点将越早地遍历
 *
 */

/**
 * 不分行从上到下打印
 *
 * 从上往下打印出二叉树的每个节点，同层节点从左至右打印
 *
 * 解题思路
 *
 * 1. 在打印第一行时，将左孩子节点和右孩子节点存入一个队列里
 * 2. 队列元素出队列打印，同时分别将左孩子节点和右孩子节点存入队列
 * 3. 这样打印二叉树的顺序就是没行从左到右打印
 */
const root = {
  val: 3,
  left: {
    val: 1,
    left: { val: 0, left: null, right: null },
    right: { val: 2, left: null, right: null },
  },
  right: {
    val: 8,
    left: {
      val: 5,
      left: null,
      right: {
        val: 7,
        left: { val: 6, left: null, right: null },
        right: null,
      },
    },
    right: null,
  },
};

const PrintFromTopToBottom = (root) => {
  const result = [];
  const queue = [];
  if (root === null) return [];
  queue.push(root);
  while (queue.length) {
    const node = queue.shift();
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
    result.push(node.val);
  }
  return result;
};

/**
 * 把二叉树打印成多行
 *
 * 从上到下按层打印二叉树，同一层结点从左至右输出。每一层输出一行
 *
 * 解题思路
 *
 * 1. 使用一个队列存储当前层遍历的节点
 * 2. 使用两个变量来标记当前遍历的状态：currentNums：当前层剩余的节点数；childNums：孩子节点数
 * 3. 当前层遍历完成后开始遍历孩子节点，currentNums赋值为childNums，childNums赋值为0
 *
 */
const Print = (root) => {
  const result = [];
  const queue = [];
  let lineRes = [];
  let currentNums = 1;
  let childNums = 0;
  if (root === null) return [];
  queue.push(root);
  while (queue.length) {
    const node = queue.shift();
    if (node.left) {
      queue.push(node.left);
      childNums++;
    }
    if (node.right) {
      queue.push(node.right);
      childNums++;
    }
    lineRes.push(node.val);
    currentNums--;
    if (currentNums === 0) {
      currentNums = childNums;
      childNums = 0;
      result.push(lineRes);
      lineRes = [];
    }
  }
  return result;
};
