/*
 * @lc app=leetcode.cn id=24 lang=javascript
 *
 * [24] 两两交换链表中的节点
 *
 * https://leetcode-cn.com/problems/swap-nodes-in-pairs/description/
 *
 * algorithms
 * Medium (66.61%)
 * Likes:    610
 * Dislikes: 0
 * Total Accepted:    145.2K
 * Total Submissions: 218K
 * Testcase Example:  '[1,2,3,4]'
 *
 * 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
 *
 * 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
 *
 *
 *
 * 示例:
 *
 * 给定 1->2->3->4, 你应该返回 2->1->4->3.
 *
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
const { head2 } = require('../../data');

function ListNode(val){
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
  // 如链表长度小于2，则返回直接返回
  if(!head || !head.next) return head;
  let dummyHead = p = new ListNode();
  let node1, node2;
  dummyHead.next = head;
  while((node1 = p.next) && (node2 = p.next.next)){
    node1.next = node2.next;
    node2.next = node1;
    p.next = node2;
    p = node1;
  }
  return dummyHead.next;
};
// @lc code=end
console.log(swapPairs(head2));

