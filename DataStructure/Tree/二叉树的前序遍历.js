/**
 * 二叉树的前序遍历
 *
 * 给定一个二叉树，返回它的前序遍历
 */

//  递归实现
const preorderTraversal = (root, array = []) => {
  if (root) {
    array.push(root.data);
    preorderTraversal(root.left, array);
    preorderTraversal(root.right, array);
  }
  return array;
};

/**
 * 非递归实现
 *
 * 取根节点为目标节点，开始遍历：
 * 1. 访问目标节点
 * 2. 左孩子入栈 -> 直至左孩子为空的节点
 * 3. 节点出栈，以右孩子为目标节点，再依次执行1、2、3
 */
const preorderTraversal = root => {
  const result = [];
  const stack = [];
  let current = root;
  while (current || stack.length) {
    while (current) {
      result.push(current.data);
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    current = current.right;
  }
  return result;
};
