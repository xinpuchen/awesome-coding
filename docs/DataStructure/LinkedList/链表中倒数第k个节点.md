# 链表中倒数第 k 个节点

## 解题思路

1. pre 先走 k 步
2. 之后 pre、cur 同时走，一直到 pre 为 null
3. 如果 i < k，说明 pre 还没有走 k 步就为 null 了，此时 k 大于链表的长度，返回 null

```js
const getKthFromEnd = (head, k) => {
  let pre = head;
  let cur = head;
  let i = 0;
  while (pre) {
    pre = pre.next;
    if (i < k) {
      i++;
    } else {
      cur = cur.next;
    }
  }
  return i < k ? null : cur;
};
```
