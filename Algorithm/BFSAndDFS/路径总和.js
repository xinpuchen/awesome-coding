/**
 * 路径总和
 *
 * 给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和
 *
 * 说明：叶子节点是指没有子节点的节点
 *
 * 示例：给定如下二叉树，以及目标和 sum = 22
 *
 *              5
 *             / \
 *            4   8
 *           /   / \
 *          11  13  4
 *         /  \      \
 *        7    2      1
 *
 * 返回 true, 因为存在目标和为 22 的根节点到叶子节点的路径 5->4->11->2
 *
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
const hasPathSum = (root, sum) => {
  if (root === null) return false;
  const stack = [root];
  const sumStack = [sum - root.val];
  while (stack.length) {
    const node = stack.pop();
    const curSum = sumStack.pop();
    if (!node.left && !node.right && curSum === 0) {
      return true;
    }
    if (node.left) {
      stack.push(node.left);
      sumStack.push(curSum - node.left.val);
    }
    if (node.right) {
      stack.push(node.right);
      sumStack.push(curSum - node.right.val);
    }
  }
  return false;
};
