# 模拟实现 Promise

Promise：简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果

## 基础版本

1. 设定三个状态 PENDING、FULFILLED、REJECTED，只能由 PENDING 改变成 FULFILLED 或 REJECTED，且
2. MockPromise 接收一个函数 executor，executor 接收两个参数 resolve 方法和 reject 方法
3. resolve 将 PENDING 改为 FULFILLED
4. reject 将 PENDING 改为 REJECTED
5. promise 变为 FULFILLED 状态后具有一个唯一的 value
6. promise 变为 REJECTED 状态后具有一个唯一的 reason

```js
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function MockPromise(executor) {
  this.state = PENDING;
  this.value = null;
  this.reason = null;

  const resolve = value => {
    if (this.state === PENDING) {
      this.state = FULFILLED;
      this.value = value;
    }
  };
  const reject = reason => {
    if (this.state === PENDING) {
      this.state = REJECTED;
      this.reason = reason;
    }
  };

  try {
    executor(resolve, reject);
  } catch (reason) {
    reject(reason);
  }
}
```

## then 用法

1. then 方法接受两个参数 onFulfilled、onRejected，它们分别在状态由 PENDING 改变为 FULFILLED、REJECTED 后调用
2. 一个 promise 可绑定多个 then 方法
3. then 方法可以同步调用也可以异步调用
4. 同步调用：状态已经改变，直接调用 onFulfilled 方法
5. 异步调用：状态还是 PENDING，将 onFulfilled、onRejected 分别加入两个函数数组 onFulfilledCallbacks、onRejectedCallbacks，当异步调用 resolve 和 reject 时，将两个数组中绑定的事件循环执行
6. 虽然 resolve 是同步执行的，但必须保证 then 是异步调用的，用 setTimeout 模拟调用（没有实现微任务和宏任务的执行机制）

```js
function MockPromise(executor) {
  this.state = PENDING;
  this.value = null;
  this.reason = null;
  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];

  const resolve = value => {
    if (this.state === PENDING) {
      this.state = FULFILLED;
      this.value = value;
      this.onFulfilledCallbacks.forEach(fun => {
        fun();
      });
    }
  };
  const reject = reason => {
    if (this.state === PENDING) {
      this.state = REJECTED;
      this.reason = reason;
      this.onRejectedCallbacks.forEach(fun => {
        fun();
      });
    }
  };

  try {
    executor(resolve, reject);
  } catch (reason) {
    reject(reason);
  }
}

MockPromise.prototype.then = function(onFulfilled, onRejected) {
  if (typeof onFulfilled !== "function") {
    onFulfilled = value => value;
  }
  if (typeof onRejected !== "function") {
    onRejected = reason => {
      throw reason;
    };
  }
  switch (this.state) {
    case FULFILLED:
      setTimeout(() => {
        onFulfilled(this.value);
      }, 0);
      break;
    case REJECTED:
      setTimeout(() => {
        onRejected(this.reason);
      }, 0);
      break;
    case PENDING:
      this.onFulfilledCallbacks.push(() => {
        setTimeout(() => {
          onFulfilled(this.value);
        }, 0);
      });
      this.onRejectedCallbacks.push(() => {
        setTimeout(() => {
          onRejected(this.reason);
        }, 0);
      });
      break;
  }
};
```

## then 方法链式调用

保证链式调用，即 then 方法中要返回一个新的 promise，并将 then 方法的返回值进行 resolve

```js
MockPromise.prototype.then = function(onFulfilled, onRejected) {
  if (typeof onFulfilled !== "function") {
    onFulfilled = value => value;
  }
  if (typeof onRejected !== "function") {
    onRejected = reason => {
      throw reason;
    };
  }
  const promise = new MockPromise(function(resolve, reject) {
    switch (this.state) {
      case FULFILLED:
        setTimeout(() => {
          try {
            const value = onFulfilled(this.value);
            resolve(value);
          } catch (reason) {
            onRejected(reason);
          }
        }, 0);
        break;
      case REJECTED:
        setTimeout(() => {
          try {
            const value = onRejected(this.reason);
            resolve(value);
          } catch (reason) {
            onRejected(reason);
          }
        }, 0);
        break;
      case PENDING:
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const value = onRejected(this.reason);
              resolve(value);
            } catch (reason) {
              onRejected(reason);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const value = onRejected(this.reason);
              resolve(value);
            } catch (reason) {
              onRejected(reason);
            }
          }, 0);
        });
        break;
    }
  });
  return promise;
};
```

## catch 方法

若上面没有定义 reject 方法，所以的异常会走向 catch 模块

```js
MockPromise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
};
```

## finally 方法

不管是 resolve 还是 reject 都会调用

```js
MockPromise.prototype.finally = function(fn) {
  return this.then(
    value => {
      fn();
      return value;
    },
    reason => {
      fn();
      throw reason;
    }
  );
};
```

## MockPromise.resolve

用于生成一个直接处于 FULFILLED 状态的 Promise

```js
MockPromise.resolve = function(value) {
  return new MockPromise(function(resolve, reject) {
    resolve(value);
  });
};
```

## MockPromise.reject

用于生成一个直接处于 REJECTED 状态的 Promise

```js
MockPromise.reject = functiont(reason){
  return new MockPromise(function(resolve, reject){
    reject(reason);
  })
}
```

## MockPromise.all 方法

接收一个 promise 数组，当所以的 promise 返回 resolve 后，执行 resolve，当 promise 返回第一个 reject 后，直接执行 reject

```js
MockPromise.all = function(promises){
  return new MockPromise(function(resolve, reject){
    if(promises.length === 0 ) return resolve([]);
    const result = [];
    for(let i = 0,len = promises.length; i < len; i++){
      promises[i].then(data => {
        result.push(data);
        if(i === promises.length - 1) {
          resolve(result);
        }
      }).catch(reason => {
        reject(reason);
      });
    }
  })
}
```

## MockPromise.race 方法

接收一个 promise 数组，当有一个 promise 返回 resolve 后，执行 resolve

```js
MockPromise.race = function(promises){
  return new MockPromise(function(resolve, reject){
    if(promises.length === 0) return resolve([]);
    for(let i = 0, len = promises.length; i < len; i++){
      promises[i].then(data => {
        return resolve(data);
      }).catch(reason => {
        reject(reason);
      })
    }
  })
}

```
