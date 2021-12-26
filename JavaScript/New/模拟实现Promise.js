/**
 * 模拟实现 Promise
 * Promise：简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果
 */

/**
 * 基础版本
 *
 * 1. 设定三个状态 PENDING、FULFILLED、REJECTED，只能由 PENDING 改变成 FULFILLED 或 REJECTED，且
 * 2. Promise 接收一个函数 executor，executor 接收两个参数 resolve 方法和 reject 方法
 * 3. resolve 将 PENDING 改为 FULFILLED
 * 4. reject 将PENDING 改为 REJECTED
 * 5. promise 变为 FULFILLED 状态后具有一个唯一的 value
 * 6. promise 变为 REJECTED 状态后具有一个唯一的 reason
 */

const STATUS = {
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
}

function Promise(executor) {
  this.value = null;
  this.reason = null;
  this.status = STATUS.pending;

  const resolve = (value) => {
    if(this.status !== STATUS.pending) return;
    this.value = value;
    this.status = STATUS.fulfilled;
  }

  const reject = (reason) => {
    if(this.status !== STATUS.pending) return;
    this.reason = reason;
    this.status = STATUS.rejected;
  }

  try {
    executor(resolve, reject);
  } catch (reason) {
    reject(reason);
  }
}

/**
 * then 用法
 *
 * 1. then 方法接受两个参数 onFulfilled、onRejected，它们分别在状态由 PENDING 改变为 FULFILLED、REJECTED 后调用
 * 2. 一个 promise 可绑定多个 then 方法
 * 3. then 方法可以同步调用也可以异步调用
 * 4. 同步调用：状态已经改变，直接调用 onFulfilled 方法
 * 5. 异步调用：状态还是 PENDING，将 onFulfilled、onRejected 分别加入两个函数数组 onFulfilledCallbacks、onRejectedCallbacks，
 *    当异步调用 resolve 和 reject 时，将两个数组中绑定的事件循环执行
 * 6. 虽然 resolve 是同步执行的，但必须保证 then 是异步调用的，用 setTimeout 模拟调用（没有实现微任务和宏任务的执行机制）
 * 7. 保证链式调用，即 then 方法中要返回一个新的 promise，并将 then 方法的返回值进行 resolve
 */

function Promise(executor) {
  this.value = null;
  this.reason = null;
  this.status = STATUS.pending;
  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];

  const resolve = (value) => {
    if(this.status !== STATUS.pending) return;
    this.value = value;
    this.status = STATUS.fulfilled;
    this.onFulfilledCallbacks.forEach(callback => callback());
  }

  const reject = (reason) => {
    if(this.status !== STATUS.pending) return;
    this.reason = reason;
    this.status = STATUS.rejected;
    this.onRejectedCallbacks.forEach(callback => callback());
  }

  try {
    executor(resolve, reject);
  } catch (reason) {
    reject(reason);
  }
}

Promise.prototype.then = function(onFulfilled, onRejected) {
  if(typeof onFulfilled !== 'function') onFulfilled = (value) => value;
  if(typeof onRejected !== 'function') onRejected = (reason) => { throw reason };

  const promise = new Promise((resolve, reject) => {
    if(this.status === STATUS.fulfilled) {
      setTimeout(() => {
        try {
          const value = onFulfilled(this.value);
          resolve(value);
        } catch (reason) {
          reject(reason);
        }
      });
    } else if(this.status === STATUS.rejected) {
      setTimeout(() => {
        try {
          const value = onRejected(this.reason);
          resolve(value);
        } catch (reason) {
          reject(reason);
        }
      });
    } else {
      this.onFulfilledCallbacks.push(() => setTimeout(() => {
        try {
          const value = onFulfilled(this.value);
          resolve(value);
        } catch (reason) {
          reject(reason);
        }
      }));
      this.onRejectedCallbacks.push(() => setTimeout(() => {
        try {
          const value = onRejected(this.reason);
          resolve(value);
        } catch (reason) {
          reject(reason);
        }
      }));
    }
  })

  return promise
}

/**
 * catch 方法
 * 若上面没有定义 reject 方法，所以的异常会走向 catch 模块
 */
Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
}

/**
 * finally 方法
 * 不管是 resolve 还是 reject 都会调用
 */
Promise.prototype.finally = function(callback) {
  this.then((value) => {
    return Promise.resolve(callback()).then(() => value);
  }, (reason) => {
    return Promise.resolve(callback()).then(() => { throw reason });
  });
}

/**
 * Promise.resolve
 * 用于生成一个直接处于 fulfilled 状态的 Promise
 */
Promise.resolve = function(value) {
  return new Promise(resolve => resolve(value));
}

/**
 * Promise.reject
 * 用于生成一个直接处于 rejected 状态的 Promise
 */
Promise.reject = function(reason) {
  return new Promise((resolve, reject) => reject(reason));
}

/**
 * Promise.all 方法
 * 接收一个 promise 数组，当所有的 promise 返回 fulfilled 后，执行 resolve，当 promise 返回第一个 rejected 后，直接执行 reject
 */
Promise.all = function(promises){
  return new Promise((resolve, reject) => {
    if(promises.length === 0) resolve([]);
    const result = [];
    promises.forEach((promise, index) => {
      promise.then(value => {
        result[index] = value;
        if(index === promises.length - 1) {
          resolve(result);
        }
      }, reason => {
        reject(reason);
        return;
      })
    })
  })
}

/**
 * Promise.race 方法
 * 接收一个 promise 数组，当有一个 promise 改变状态后，返回的 promise 的状态就跟着改变
 */
Promise.race = function(promises) {
  return new Promise((resolve, reject) => {
    if(promises.length === 0) return resolve();
    promises = promises.map(p => p instanceof Promise ? p : Promise.resolve(p));
    promises.forEach((promise, index) => {
      promise.then(value => {
        resolve(value);
        return;
      }, reason => {
        reject(reason);
        return;
      })
    })
  })
}

/**
 * Promise.allSettled 方法
 * 接收一个 promise 数组，当来确定一组异步操作是否都结束，状态改变为 fulfilled，返回 allSettledPromise 成员对象
 */
Promise.allSettled = function(promises) {
  return new Promise((resolve, reject) => {
    if(promises.length === 0) return Promise.resolve([]);
    promises = promises.map(p => p instanceof Promise ? p : Promise.resolve(p));
    const result = [];
    promises.forEach((promise, i) => {
      promise.then(value => {
        result[i] = { status: STATUS.fulfilled, value };
        if(i === promises.length - 1) resolve(result);
      }, reason => {
        result[i] = { status: STATUS.rejected, reason };
        if(i === promises.length - 1) resolve(result);
      })
    })
  })
}


/**
 * Promise.any 方法
 * 接收一个 promise 数组，当有一个 promise 返回 fulfilled 后，执行 resolve，当所有 promise 改变为 rejected 时，执行 reject，
 * 抛出的错误是一个 AggregateError 类型的实例
 */
Promise.any = function(promises) {
  return new Promise((resolve, reject) => {
    if(promises.length === 0) return Promise.resolve([]);
    promises = promises.map(p => p instanceof Promise ? p : Promise.resolve(p));
    promises.forEach((promise, i) => {
      promise.then(value => {
        resolve(value);
      }, reason => {
        if(i === promises.length - 1) {
          reject(new AggregateError('All promises were rejected'))
        }
      })
    })
  })
}
