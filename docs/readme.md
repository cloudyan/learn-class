# 理解 prototype, __proto__, constructor

## 概念理解

### 理解js中的原型链, prototype与__proto__的关系

- `prototype`: 每个函数对象**都有**名为 `prototype` 的属性, 用于引用原型对象(Function.prototype函数对象是个例外, 没有prototype属性)
- `__proto__`: 每个对象**都有**一个名为 `__proto__` 的内部隐藏属性, 指向于它所对应的原型对象(chrome、firefox中名称为__proto__, 并且可以被访问到)。

原型链正是基于 `__proto__` 才得以形成(note：不是基于函数对象的属性prototype)

```js
var o1 = {};              // typeof o1 === "object"
var o2 =new Object();     // typeof o2 === "object"

function f1(){}           // typeof f1 === "function"
var f2 = function(){}     // typeof f2 === "function"
var f3 = new Function('str','console.log(str)'); // typeof f3 === "function"
```

- 通常我们认为o1、o2是对象, 即普通对象；f1、f2、f3为函数。
- 但是其实函数也是对象, 是由Function构造的,
- f3这种写法就跟对象的创建的写法一样。f1、f2最终也都像f3一样是有Function这个函数构造出来的
- f1、f2、f3为函数对象, Function跟Object本身也是函数对象。

Js中每个对象(null除外)都和另一个对象相关联, 通过以下例子跟内存效果图来分析Function、Object、Prototype、__proto__对象间的关系。

```js
function Animal(){  }
var anim = new Animal();

// Animal anim proto
typeof Animal.prototype // 'object'
anim.__proto__ === Animal.prototype               // true
Animal.__proto__ === Function.prototype           // true
Animal.prototype.__proto__ === Object.prototype   // true

// Function proto
typeof Function.prototype             // 'function';
typeof Function.__proto__             // 'function'
typeof Function.prototype.prototype   // 'undefined'
typeof Function.prototype.__proto__   // 'object'
Function.prototype === Function.__proto__ // true

// Object proto
typeof Object.prototype             // 'object'
typeof Object.__proto__             // 'function' 对象本质是 new Object(), 由函数构造出来
typeof Object.prototype.prototype   // 'undefined'
Object.prototype.__proto__          // null

// Function Object proto关系
Function.prototype === Object.__proto__
Function.__proto__ === Object.__proto__
Function.prototype.__proto__ === Object.prototype

// 系统定义的对象 Array, Date
var array = new Array()
var date = new Date()

array.__proto__ === Array.prototype       // true
Array.__proto__ === Function.prototype    // true
date.__proto__  === Date.prototype        // true
Date.__proto__  === Function.prototype    // true
```

Function、Object、Prototype、__proto__内存关系图

![prototype](./img/prototype.png)

通过上图Function、Object、Prototype关系图中, 可以得出一下几点：

1. 所有对象都有 `__proto__` 属性
   - `__proto__` 指向产生它的类(函数/构造器)的 `prototype`
   - 实例只能查看 `__proto__`, 得知自己是基于什么 `prototype` 知道出来的, 而不能再重新构造实例
2. 所有函数(也是对象, 是一等公民)对象都有 `prototype` 属性, 用于引用原型对象 !!! 但 `Function.prototype` 是特例
   - new 之后的实例的 `__proto__` 属性指向这个 `prototype` 属性
   - 函数/构造函数通过定义 prototype 来约定其实例的规格, 再通过 new 来构造出实例, 他们的作用就是生产对象.
   - 构造函数(方法)本身又是方法(Function)的实例, 因此也可以查到它的 __proto__ 属性(原型链), 指向 `Function.prototype`
   - `prototype` 它是一个对象（在声明函数变量时在函数内部由js自动创建）, 因此它也有`__proto__`, 并且指向 `Object.prototype`。
   - 有 `prototype` 的东西(函数/类/构造器)可以产生实例（即可以作为new 后边的值）
   - `Function.prototype` 是一个函数对象, 但是个**特例**, 没有 prototype 属性
3. Object 是一个函数对象, 是由 Function 构造的
   - `Object.__proto__ === Function.prototype`
   - `Object.prototype` 是一个普通对象, 是原型链的终点, 不再有 `__proto__`
   - Object 虽是 Function 构造的一个函数对象, 但是 `Object.prototype` 没有指向 `Function.prototype` ?
4. js 没有类, 只有对象, 所有东西都是 Object 衍生出来的(包括函数对象), 所以所有东西的原型链最终都指向了 `Object.prototype`
   - `Object.prototype.__proto__ === null`, 原型链至此结束

### constructor 是什么

每个函数对象(构造函数)都有名为 `prototype` 的属性, 用于引用原型对象。此原型对象又有名为 `constructor` 的属性, 它反过来引用函数本身。这是一种循环引用

```js
// 都是 true
var Animal = new Function('console.log(111)')      // 本质
// var Animal = function () { console.log(111) }   // 效果同上
// function Animal() { console.log(111) }          // 效果同上
var anim = new Animal();

anim.constructor === Animal
Animal.prototype.constructor === Animal
Animal.constructor === Function

Function.prototype.constructor === Function
Function.constructor === Function.prototype.constructor
Function.__proto__ === Function.prototype // 一个对象__proto__指向产生它的类的prototype
anim.__proto__ === Animal.prototype

// var Object = new Function() // Object 本质是 Function 函数构造出来的
var obj = new Object()

Object.prototype.constructor === Object
Object.constructor === Function
```

结论:

- 任何一个 prototype 对象都有一个 constructor 属性，指向它的构造函数

参考：

- http://www.blogjava.net/heavensay/archive/2013/10/20/405440.html
- https://www.cnblogs.com/fool/archive/2010/10/07/1845226.html
- https://blog.fundebug.com/2019/06/25/javascript-first-class-function/
- https://blog.csdn.net/Backee/article/details/83378772
