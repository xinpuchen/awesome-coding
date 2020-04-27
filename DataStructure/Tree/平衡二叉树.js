/**
 * 平衡二叉树
 *
 * 每个子树的深度之差不超过 1
 *
 * 解题思路：
 *
 * 1. 后续遍历二叉树
 * 2. 在遍历二叉树每个节点前都会遍历其左右子树
 * 3. 比较左右子树的深度，若差值大于 1 则返回一个标记 -1，表示当前子树不平衡
 * 4. 左右子树有一个不是平衡的，或左右子树差值大于 1，则整课树不平衡
 * 5. 若左右子树平衡，返回当前树的深度（左右子树的深度最大值+1）
 */

const isBalanced = (node) => {
  return BalancedTree(node) !== -1;
};

const BalancedTree = (root) => {
  if (!root) return 0;
  const left = isBalanced(root.left);
  const right = isBalanced(root.right);
  if (left === -1 || right === -1 || Math.abs(left - right) > 1) {
    return -1;
  }
  return Math.max(left, right) + 1;
};
