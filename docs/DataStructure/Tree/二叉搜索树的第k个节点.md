# 二叉搜索树的第 k 个节点

给定一棵二叉搜索树，请找出其中的第 k 小的节点

例如：(5，3，7，2，4，6，8) 中，按结点数值大小顺序第三小节点的值为 4

## 思路

二叉搜索树的中序遍历即排序后的节点，本题实际考察二叉树的遍历

## 递归实现

```js
function KthNode(root, k) {
  const arr = [];
  loopThrough(root, arr);
  if (k > 0 && k <= arr.length) {
    return arr[k - 1];
  }
  return null;
}

function loopThrough(node, result) {
  if (node) {
    loopThrough(node.left, result);
    result.push(node);
    loopThrough(node.right, result);
  }
}
```

## 非递归实现

```js
function KthNode(root, k) {
  const result = [];
  const stack = [];
  let current = root;
  while (stack.length || current) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    result.push(current.data);
    current = current.right;
  }
  if (k > 0 && k <= result.length) {
    return result[k - 1];
  }
  return null;
}
```
