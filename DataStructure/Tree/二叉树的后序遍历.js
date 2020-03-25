/**
 * 二叉树的后序遍历
 *
 * 给定一个二叉树，返回它的 后序 遍历
 */

// 递归实现
const postorderTraversal = (root, array = []) => {
  if (root) {
    postorderTraversal(root.left, array);
    postorderTraversal(root.right, array);
    array.push(root.data);
  }
  return array;
};

/**
 * 非递归实现
 *
 * 取跟节点为目标节点，开始遍历
 * 1. 左孩子入栈 -> 直至左孩子为空的节点
 * 2. 栈顶节点的右节点为空或右节点被访问过 -> 节点出栈并访问他，将节点标记为已访问
 * 3. 栈顶节点的右节点不为空且未被访问，以右孩子为目标节点，再依次执行1、2、3
 */
const postorderTraversal = root => {
  const result = [];
  const stack = [];
  let last = null; // 标记上一个访问的节点
  let current = root;
  while (current || stack.length > 0) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack[stack.length - 1];
    if (!current.right || current.right == last) {
      current = stack.pop();
      result.push(current.data);
      last = current;
      current = null; // 继续弹栈
    } else {
      current = current.right;
    }
  }
  return result;
};
