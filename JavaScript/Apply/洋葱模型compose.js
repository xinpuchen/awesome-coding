/**
 * 洋葱模型 compose 串联中间件实现
 *
 * 1. 递归函数 dispatch 的执行取出了数组中的第一个中间件函数并执行
 * 2. 在执行时传入了一个函数，并递归执行了 dispatch，传入的参数 +1
 * 3. 这样就执行了下一个中间件函数，依次类推，直到所有中间件都执行完毕
 * 4. 不满足中间件执行条件时，会跳出
 * 5. async 函数中 await 后面执行的异步代码要实现等待，带异步执行后继续向下执行，
 *    需要等待 Promise，所以我们将每一个中间件函数在调用时最后都返回了一个成功态的 Promise
 */

class Koa {
  constructor() {
    this.middleWares = [];
  }
  use(fn) {
    this.middleWares.push(fn);
  }
  compose() {
    const dispatch = index => {
      if (index === this.middleWares.length) return Promise.resolve();
      const route = this.middleWares[index];
      return Promise.resolve(route(() => dispatch(index + 1)));
    };
    dispatch(0);
  }
}

const app = new Koa();

function fn() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(123);
      console.log('hello');
    }, 1000);
  });
}

app.use(async next => {
  console.log(1);
  await next();
  console.log(2);
});

app.use(async next => {
  console.log(3);
  await fn();
  await next();
  console.log(4);
});

app.use(async next => {
  console.log(5);
  await next();
  console.log(6);
});

app.compose();
