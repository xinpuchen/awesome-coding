/*
 * @lc app=leetcode.cn id=92 lang=javascript
 *
 * [92] 反转链表 II
 *
 * https://leetcode-cn.com/problems/reverse-linked-list-ii/description/
 *
 * algorithms
 * Medium (51.32%)
 * Likes:    493
 * Dislikes: 0
 * Total Accepted:    72.3K
 * Total Submissions: 140.9K
 * Testcase Example:  '[1,2,3,4,5]\n2\n4'
 *
 * 反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。
 *
 * 说明:
 * 1 ≤ m ≤ n ≤ 链表长度。
 *
 * 示例:
 *
 * 输入: 1->2->3->4->5->NULL, m = 2, n = 4
 * 输出: 1->4->3->2->5->NULL
 *
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */

// 将前节点的 next 指向区间终点，然后将区间起点的 next 指向后节点
// 因此这一题中有四个需要重视的节点: 前节点、后节点、区间起点和区间终点
const { head2 } = require('../../data');

function ListNode(val) {
  this.val = val;
  this.next = null;
}

var reverseBetween = function(head, m, n) {
  const dummyHead = new ListNode();
  const count = n - m;
  let pre, cur, front, tail;
  let p = dummyHead;
  p.next = head;
  for(let i = 0; i < m - 1; i++){
    p = p.next;
  }
  front = p;
  pre = tail = p.next;
  cur = pre.next;
  for(let j = 0; j < count; j++){
    let next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  front.next = pre;
  tail.next = cur;
  return dummyHead.next;
};
console.log(reverseBetween(head2, 3, 6));
// @lc code=end

