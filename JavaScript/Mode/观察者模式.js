/**
 * 观察者模式
 *
 * 优点：
 * 1. 可以广泛应用于异步编程，它可以代替我们传统的回调函数
 * 2. 不需要关注对象在异步执行阶段的内部状态，我们只关心事件完成的时间点
 * 3. 取代对象之间硬编码通知机制，一个对象不必显式调用另一个对象的接口，而是松耦合的联系在一起
 *
 * Nodejs 的 EventEmitter
 *
 * Api：
 *
 * addListener(event, listener)：
 * 为指定事件添加一个监听器，默认添加到监听器数组的尾部
 *
 * removeListener(event, listener)：
 * 移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器。它接受两个参数，第一个是事件名称，第二个是回调函数名称
 *
 * setMaxListeners(n)：
 * 默认情况下， EventEmitters 如果你添加的监听器超过 10 个就会输出警告信息。 setMaxListeners 函数用于提高监听器的默认限制的数量
 *
 * once(event, listener)：
 * 为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器
 *
 * emit(event, [arg1], [arg2], [...])：
 * 按监听器的顺序执行执行每个监听器，如果事件有注册监听返回 true，否则返回 false
 */

function EventEmitter() {
  this._maxListeners = 10;
  this._events = Object.create(null);
}

// 向事件队列添加事件，prepend为true表示向事件队列头部添加事件
EventEmitter.prototype.addListener = function (type, listener, prepend) {
  if (!this._events) {
    this._events = Object.create(null);
  }
  if (this._events[type]) {
    if (prepend) {
      this._events[type].unshift(listener);
    } else {
      this._events[type].push(listener);
    }
  } else {
    this._events[type] = [listener];
  }
};

// 移除某个事件
EventEmitter.prototype.removeListener = function (type, listener) {
  if (Array.isArray(this._events[type])) {
    if (!listener) {
      delete this._events[type];
    } else {
      this._events[type] = this._events[type].filter(
        (e) => e !== listener && e.origin !== listener
      );
    }
  }
};

// 向事件队列添加事件，只执行一次
EventEmitter.prototype.once = function (type, listener) {
  const only = (...args) => {
    listener.apply(this, args);
    this.removeListener(type, listener);
  };
  only.origin = listener;
  this.addListener(type, only);
};

// 执行某类事件
EventEmitter.prototype.emit = function (type, ...args) {
  if (Array.isArray(this._events[type])) {
    this._events[type].forEach((fn) => {
      fn.apply(this, args);
    });
  }
};

// 设置最大事件监听个数
EventEmitter.prototype.setMaxListeners = function (count) {
  this.maxListeners = count;
};
