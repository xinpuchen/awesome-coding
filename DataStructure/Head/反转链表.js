/**
 * 反转链表
 *
 * 将链表反转
 */
function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * 头插法
 *
 * 解题思路
 *
 * 每次生成一个新节点，插入到新链表的头部
 */
const reverseList1 = (head) => {
  let newHead = null;
  let cur = head;
  while (cur) {
    let node = new ListNode(cur.val);
    node.next = newHead;
    newHead = node;
    cur = cur.next;
  }
  return newHead;
};

/**
 * 双指针
 *
 * 解题思路
 *
 * 1. 使用双指针，当前指针cur, 它的前指针 pre
 * 2. 保存cur.next
 * 3. 每次 让cur指针的next指向pre
 * 4. 局部反转完成后，pre和cur向前移动一个位置
 * 5. 循环上述过程，直至pre到达链表尾部
 */
const reverseList2 = (head) => {
  let pre = null;
  let t = null;
  while (head) {
    t = head.next;
    head.next = pre;
    pre = head;
    head = t;
  }
  return pre;
};
