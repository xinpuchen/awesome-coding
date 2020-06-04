/**
 * https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/
 *
 * 面试题09. 用两个栈实现队列
 * 用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，deleteHead 操作返回 -1 )
 *
 * 示例 1：
 *
 * 输入：
 * ["CQueue","appendTail","deleteHead","deleteHead"]
 * [[],[3],[],[]]
 * 输出：[null,null,3,-1]
 * 示例 2：
 *
 * 输入：
 * ["CQueue","deleteHead","appendTail","appendTail","deleteHead","deleteHead"]
 * [[],[],[5],[2],[],[]]
 * 输出：[null,-1,null,null,5,2]
 *
 */

var CQueue = function() {
  this.inStack = [];
  this.outStack = [];
};

/**
* @param {number} value
* @return {void}
*/
CQueue.prototype.appendTail = function(value) {
  this.inStack.push(value);
};

/**
* @return {number}
*/
CQueue.prototype.deleteHead = function() {
  const { inStack, outStack } = this;
  if (outStack.length) {
      return outStack.pop();
  } else {
      while (inStack.length) {
          outStack.push(inStack.pop());
      }
      return outStack.length ? outStack.pop() : -1;
  }
};

var obj = new CQueue()
obj.appendTail(["CQueue","deleteHead","appendTail","appendTail","deleteHead","deleteHead"])
var param_2 = obj.deleteHead()
console.log(param_2);
