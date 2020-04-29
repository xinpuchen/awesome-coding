/**
 * 二叉树的最小深度
 *
 * 最小深度是从根节点到最近叶子节点的最短路径上的节点数量
 *
 * 说明：叶子节点是指没有子节点的节点
 */

var minDepth = function(root) {
  if (root == null) return 0;
  if (!root.left) return minDepth(root.right) + 1;
  if (!root.right) return minDepth(root.left) + 1;
  return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
};

// 非递归实现
// 采用层序遍历的方式
var minDepth = function(root) {
  if (root === null) return 0;
  var queue = [root];
  var level = 0;
  while (queue.length) {
    var size = queue.length;
    while (size--) {
      var node = queue.shift();
      if (!node.left && !node.right) return level++;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    level++;
  }
  return level;
};
