/**
 * 中序遍历
 *
 * 给定一个二叉树，返回它的中序遍历
 */

//  递归实现
const inorderTraversal = (root, array = []) => {
  if (root) {
    inorderTraversal(root.left, array);
    array.push(root.data);
    inorderTraversal(root.right, array);
  }
  return array;
};

/**
 * 非递归实现
 *
 * 1. 左孩子入栈 -> 直至左孩子为空的节点
 * 2. 节点出栈 -> 访问该节点
 * 3. 以右孩子为目标节点，再依次执行1、2、3
 */
const inorderTraversal = root => {
  const result = [];
  const stack = [];
  let current = root;
  while (current || stack.length) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    result.push(current.data);
    current = current.right;
  }
  return result;
};
console.log(inorderTraversal(root));
