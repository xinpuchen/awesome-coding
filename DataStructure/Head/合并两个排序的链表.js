/**
 * 合并两个排序的链表
 *
 * 解题思路
 *
 * 1. 先建立一个容器节点
 * 2. 当 l1 和 l2 有一个不为空遍历
 * 3. 判断 l1.val 与 l2.val 的大小进行接入
 * 4. 当 l1 为 null 或遍历至为空，则直接将 l2 添加至尾部
 * 5. 同理，当 l2 为 null 或遍历至为空，则直接将 l1 添加至尾部
 */

function ListNode(val) {
  this.val = val;
  this.next = null;
}
const mergeTwoLists = (l1, l2) => {
  let node = new ListNode(-1);
  let cur = node;
  while (l1 || l2) {
    if (!l1) {
      cur.next = l2;
      break;
    }
    if (!l2) {
      cur.next = l1;
      break;
    }
    if (l1.val > l2.val) {
      cur.next = l2;
      l2 = l2.next;
      cur = cur.next;
    } else {
      cur.next = l1;
      l1 = l1.next;
      cur = cur.next;
    }
  }
  return node.next;
};
