/**
 * 继承分类
 *
 * 不使用 Object.create
 * 1. 原型链继承
 * 2. 构造函数继承
 * 组合为：组合继承
 *
 * 使用 Object.create
 * 1. 原生式继承
 * 2. 寄生式继承
 * 改造为：寄生组合继承
 *
 * 组合继承可优化为：寄生组合继承
 *
 * 继承组合继承改造为：ES6 class extends
 */

/**
 * 原型链继承
 * 核心：将父类的实例作为子类的原型
 * 优点：父类的方法子类可以复用
 * 缺点：
 * 1. 父类的引用属性被所以子类实例共享
 * 2. 子类构建实例时不能向父类传递参数
 */
function SuperType() {
  this.property = true;
}
SuperType.prototype.getProperty = function() {
  return this.property;
};
function SubType() {
  this.subProperty = false;
}
SubType.prototype.getSubProperty = function() {
  return this.subProperty;
};
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
var sub = new SubType();
console.log(sub.getProperty());

/**
 * 构造函数继承
 * 核心：将父类构造函数的内容复制给了子类的构造函数。这是所有继承中唯一一个不涉及到 prototype 的继承
 * 优点：和原型链继承完全反过来
 * 1. 父类的引用属性不会被共享
 * 2. 子类构建实例时可以向父类传递参数
 * 缺点：
 * 1. 只能继承父类的实例属性和方法，不能继承原型属性/方法
 * 2. 无法实现复用，每个子类都有父类实例函数的副本，影响性能
 */

function SuperType(name) {
  this.name = name;
}
function SubType() {
  SuperType.apply(this, arguments);
}
var sub = new SubType("xinpu");
console.log(sub.name);

/**
 * 组合继承
 * 核心：原型式继承和构造函数继承的组合，兼具了二者的优点
 * 优点：
 * 1. 父类的方法可以被复用
 * 2. 父类的引用属性不会被共享
 * 3. 子类构建实例时可以向父类传递参数
 * 缺点：调用了两次父类的构造函数，造成了性能上的浪费
 * 1. 第一次给子类的原型添加了父类的属性
 * 2. 第二次又给子类的构造函数添加了父类的属性，从而覆盖了子类原型中的同名参数
 */
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.getName = function() {
  return this.name;
};
function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.getAge = function() {
  return this.age;
};
var sub = new SubType("xinpu", 24);
console.log(sub.getName());

/**
 * 原型式继承
 * 核心：原型式继承的 object 方法本质上是对参数对象的一个浅复制
 * 优点：父类方法可以复用
 * 缺点：
 * 1. 父类的引用属性会被所有子类实例共享
 * 2. 子类构建实例时不能向父类传递参数
 *
 * ECMAScript 5 通过新增 Object.create() 方法规范化了原型式继承，object(obj) ==> Object.create(obj)
 */
function object(obj) {
  var F = function() {};
  F.prototype = obj;
  return new F();
}

/**
 * 寄生式继承
 * 核心：使用原型式继承获得一个目标对象的浅复制，然后增强这个浅复制的能力
 * 优点：父类方法可以复用
 * 缺点：
 * 1. 原型链继承多个实例的引用类型属性指向相同，存在篡改的可能
 * 2. 子类构建实例时不能向父类传递参数
 */

function object(obj, name) {
  var F = function() {};
  F.prototype = obj;
  return new F();
}

function createAnother(original) {
  var clone = object(original);
  clone.getName = function() {
    return this.name;
  };
  return clone;
}
var person = {
  name: "xinpu",
  age: 24
};
var per = createAnother(person);
console.log(per.getName());

/**
 * 寄生组合继承
 * 解决问题：组合继承会有两次调用父类的构造函数而造成浪费的缺点
 * 核心：在于 inheritPrototype(SubType, SuperType)，让子类的 prototype 指向父类原型的拷贝，这样就不会调用父类的构造函数，进而引发内存的浪费问题
 */

function inheritPrototype(SubType, SuperType) {
  var prototype = Object.create(SuperType.prototype);
  prototype.constructor = SubType;
  SubType.prototype = prototype;
}
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.getColors = function() {
  return this.colors;
};
function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}
inheritPrototype(SubType, SuperType);
var sub = new SubType();
console.log(sub.getColors());

/**
 * ES6 Extends
 * 核心：ES6 继承的结果和寄生组合继承相似，本质上，ES6 继承是一种语法糖。
 *  但是，寄生组合继承是先创建子类实例 this 对象，然后再对其增强
 *  而ES6先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），
 *  然后再用子类的构造函数修改 this
 *
 * ES6继承与ES5继承的异同：
 * 相同点：本质上ES6继承是ES5继承的语法糖
 * 不同点：
 * 1. ES6继承中子类的构造函数的原型链指向父类的构造函数，ES5中使用的是构造函数复制，没有原型链指向
 * 2. ES6子类实例的构建，基于父类实例，ES5中不是
 */
// 源码
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) {
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
  }
}

/**
 * 总结
 * 1. ES6 Class extends 是 ES5 继承的语法糖
 * 2. JS 的继承除了构造函数继承之外都基于原型链构建的
 * 3. 函数声明和类声明的区别
 * 4. 函数声明会提升，类声明不会。首先需要声明你的类，然后才能访问它
 * 5. 可以用寄生组合继承实现ES6 Class extends，但是还是会有细微的差别
 * 6. ES6的继承有所不同，实质上是先创建父类的实例对象this，然后再用子类的构造函数修改this。因为子类没有自己的this对象，所以必须先调用父类的super()方法，否则新建实例报错。
 */
