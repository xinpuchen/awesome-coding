/**
 * 模拟实现 Set：类似于数组，但是成员的值都是唯一的，没有重复的值
 *
 * Set 分析：
 * 1. Set 本身是一个构造函数，返回生成 Set 数据结构
 * 2. Set 函数接收一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化
 *
 * 属性分析：
 * 1. Set.prototype.constructor：构造函数，默认就是 Set 函数
 * 2. Set.prototype.size：返回 Set 实例的成员个数
 *
 * 操作方法分析：
 * 1. add(value)：添加某个值，返回 Set 结构本身
 * 2. delete(value)：删除某个值，返回一个布尔值，表示删除是否成功
 * 3. has(value)：返回一个布尔值，表示该值是否为 Set 的成员
 * 4. clear()：清除所有成员，无返回值
 *
 * 遍历方法分析：
 * 1. keys()：返回键名的遍历器
 * 2. values()：返回键值的遍历器
 * 3. entries()：返回键值对的遍历器
 * 4. forEach()：使用回调函数遍历每个成员，无返回值
 *
 */

(function(_this) {
  var NaNSymbol = Symbol("NaN");

  var encodeVal = function(value) {
    return value !== value ? NaNSymbol : value;
  };

  var decodeVal = function(value) {
    return value === NaNSymbol ? NaN : value;
  };

  var makeIterator = function(array, iterator) {
    var nextIndex = 0;
    // new Set(new Set()) 会调用这里
    var obj = {
      next: function() {
        if (nextIndex < array.length) {
          return { value: iterator(array[nextIndex++]), done: false };
        }
        return { value: void 0, done: true };
      }
    };
    // [...set.keys()] 会调用这里
    obj[Symbol.iterator] = function() {
      return obj;
    };
    return obj;
  };

  function forOf(obj, cb) {
    let iterable;
    let result;
    if (typeof obj[Symbol.iterator] !== "function") {
      throw new TypeError(obj + " is not iterable");
    }
    if (typeof cb !== "function") {
      throw new TypeError("cb must be callable");
    }
    iterable = obj[Symbol.iterator]();
    result = iterable.next();
    while (!result.done) {
      cb(result.value);
      result = iterable.next();
    }
  }

  function Set(data) {
    this.values = [];
    this.size = 0;
    if (data) {
      data.forEach(function(item) {
        this.add(item);
      }, this);
    }
  }

  Set.prototype.add = function(value) {
    value = encodeVal(value);
    if (this.values.indexOf(value) === -1) {
      this.values.push(value);
      ++this.size;
    }
    return this;
  };

  Set.prototype.has = function(value) {
    return this.values.indexOf(encodeVal(value)) !== -1;
  };

  Set.prototype.delete = function(value) {
    var idx = this.values.indexOf(encodeVal(value));
    if (idx === -1) return false;
    this.values.splice(idx, 1);
    --this.size;
    return true;
  };

  Set.prototype.clear = function(value) {
    this.values = [];
    this.size = 0;
  };

  Set.prototype.forEach = function(callback, thisArg = _this) {
    var iterator = this.entries();
    forOf(iterator, item => {
      callback.call(thisArg, item[1], item[0], this);
    });
  };

  Set.prototype.keys = Set.prototype.values = function() {
    return makeIterator(this._values, function(value) {
      return decodeVal(value);
    });
  };

  Set.prototype.entries = function() {
    return makeIterator(this._values, function(value) {
      return [decodeVal(value), decodeVal(value)];
    });
  };

  Set.prototype[Symbol.iterator] = function() {
    return this.values();
  };

  Set.length = 0;

  _this.Set = Set;
})(this);
