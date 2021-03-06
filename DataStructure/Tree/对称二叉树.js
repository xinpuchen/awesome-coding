/**
 * 对称二叉树
 *
 * 如果一个二叉树同另一个二叉树的镜像是同样的，定义它们为对称二叉树
 *
 * 思路：二叉树的右子树是二叉树左子树的镜像二叉树
 *
 * 镜像二叉树：两颗二叉树根结点相同，但他们的左右两个子节点交换了位置
 *
 * 1. 两个根结点相等
 * 2. 左子树的右节点和右子树的左节点相同
 * 3. 左子树的左节点和右子树的右节点相同
 */

function isSymmetrical(root) {
  return (function isSymmetricalTree(lNode, rNode) {
    if (!lNode && !rNode) {
      return true;
    }
    if (!lNode || !rNode) {
      return false;
    }
    if (lNode.data != rNode.data) {
      return false;
    }
    return (
      isSymmetricalTree(lNode.left, rNode.right) &&
      isSymmetricalTree(lNode.right, rNode.left)
    );
  })(root, root);
}
