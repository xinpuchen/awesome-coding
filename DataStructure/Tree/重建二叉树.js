/**
 * 二叉树重建
 *
 * 问题：输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字
 *
 * 示例：例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回
 *
 * 思路：
 * 1. 前序遍历：跟节点 + 左子树前序遍历 + 右子树前序遍历
 * 2. 中序遍历：左子树中序遍历 + 跟节点 + 右字数中序遍历
 * 3. 后序遍历：左子树后序遍历 + 右子树后序遍历 + 跟节点
 *
 * 根据思路得出结论：
 * 1. 前序遍历找到根结点root
 * 2. 找到root在中序遍历的位置 -> 左子树的长度和右子树的长度
 * 3. 截取左子树的中序遍历、右子树的中序遍历
 * 4. 截取左子树的前序遍历、右子树的前序遍历
 * 5. 递归重建二叉树
 */
const readline = require("readline");

function Node(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
}

function reConstructBinaryTree(pre, mid) {
  if (pre.length === 0) {
    return null;
  }
  if (pre.length === 1) {
    return new TreeNode(pre[0]);
  }
  const data = pre[0];
  const index = mid.indexOf(data);
  const midLeft = mid.slice(0, index);
  const midRight = mid.slice(index + 1);
  const preLeft = pre.slice(1, index + 1);
  const preRight = pre.slice(index + 1);
  const node = new TreeNode(data);
  node.left = reConstructBinaryTree(preLeft, midLeft);
  node.right = reConstructBinaryTree(preRight, midRight);
  return node;
}

/**
 * 求二叉树的遍历
 *
 * 问题：给定一棵二叉树的前序遍历和中序遍历，求其后序遍历
 *
 * 输入描述：两个字符串，其长度n均小于等于26。 第一行为前序遍历，第二行为中序遍历。 二叉树中的结点名称以大写字母表示：A，B，C....最多26个结点
 *
 * 输出描述：每输入一组样例，输出后序遍历字符串
 *
 * 思路：
 * 1. 前序遍历找到根结点root
 * 2. 找到root在中序遍历的位置 -> 左子树的长度和右子树的长度
 * 3. 截取左子树的中序遍历、右子树的中序遍历
 * 4. 截取左子树的前序遍历、右子树的前序遍历
 * 5. 递归拼接二叉树的后序遍历
 *
 */

function getHRD(pre, mid) {
  if (!pre) {
    return "";
  }
  if (pre.length === 1) {
    return pre;
  }
  const head = pre[0];
  const splitIndex = mid.indexOf(head);
  const midLeft = mid.substring(0, splitIndex);
  const midRight = mid.substring(splitIndex + 1);
  const preLeft = pre.substring(1, splitIndex + 1);
  const preRight = pre.substring(splitIndex + 1);
  return getHRD(preLeft, midLeft) + getHRD(preRight, midRight) + head;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "input > \n"
});

const lines = [];

rl.prompt();
rl.on("line", line => {
  lines.push(line);
  if (lines.length === 2) {
    if (lines[0].length === lines[1].length) {
      console.log(`output > ${getHRD(...lines)}\n`);
      lines.length = 0;
      rl.prompt();
    } else {
      console.log("Incorrect format.");
      rl.prompt();
    }
  }
});
