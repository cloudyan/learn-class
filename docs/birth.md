# 创生记

看这篇之前请先看 [readme.md](./readme.md)

> 在js里万物皆对象

深入剖析js 的 prototype, Function 和 Object 之间的关系并简单实现

先了解一点历史[Javascript诞生记](http://www.ruanyifeng.com/blog/2011/06/birth_of_javascript.html)

> 一等公民定义: 在编程语言中, **一等公民可以作为函数参数, 可以作为函数返回值, 也可以赋值给变量**。

js里的对象, 属性等说法, 其实就是指针, 它们指向自己的实例空间（除了基本类型）

在 js 中, 万物皆对象

- 一切函数实际都是函数对象
- Object也是函数

Function 和 Object 之间关系复杂, 那么他们是怎么从无到有的? 可以使用 Firefox 浏览器查看 log

```js
Function
Function.__proto__
Object
Object.__proto__
```

[`instanceof`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof) 检测构造函数的 prototype 属性是否出现在某个实例对象的原型链

```js
var fn = new Function()
var obj = new Object()

fn instanceof Function  // true
obj instanceof Object   // true
fn instanceof Object    // true
obj instanceof Function   // false

Function instanceof Object // true
Object instanceof Function // true
```

下面这个怎么理解

```js
class A {}
class B extends A {}
class C extends B {}

C.__proto__ === B  C 由 B 构造而来
C.prototype
C.prototype.__proto__ === B.prototype // true
```

使用 es5 语法, 实现一个等价 es6 class 效果的继承实现

注意：

- `Object.constructor === Function` 本身Object就是Function函数构造出来的
- 如何查找一个对象的constructor, 就是在该对象的原型链上寻找碰到的第一个constructor属性所指向的对象

## 了解 new 的过程

```js
function Animal() { }
var anim = new Animal()
```

上述过程拆分如下, 也是每次分析需要的思考过程

1. `var anim = {}` 初始化一个对象
2. `anim.__proto__ = Animal.prototype`
3. `Animal.call(anim)` 构造 anim, 也可以说是初始化 anim

### 更复杂点

cat 按什么流程找到 run 和 eat 方法

```js
function Animal(name) {
  this.name = name // 属性

  this.run = function() { // 实例方法
    console.log(this.name + '在跑')
  }
}

Animal.prototype.color = 'black'
Animal.prototype.eat = function(food) {
  console.log(this.name + '在吃' + food)
}

function Cat() {
  Animal.apply(this, arguments)
}

Cat.prototype = new Animal()
var cat = new Cat('小猫')
cat.run()
cat.eat('鱼')
```

分析过程：

1. 因为 `new Cat()` 得到 `cat.__proto__ === Cat.prototype`
2. 记 `tempAnimal = new Animal()` 得到 `tempAnimal.__proto__` 指向 `Animal.prototype`
3. 因为赋值 `Cat.prototype = tempAnimal`
4. 由 2&3 得到 `Cat.prototype.__proto__ === tempAnimal.__proto__ === Animal.prototype`
5. 结合 3&1, 得到 `cat.__proto__.__proto__ === Cat.prototype.__proto__ === Animal.prototype`

## 创生

模拟实现 Object 和 Function


```js
// 已知

Object.__proto__ === Function.__proto__
Function.__proto__ === Function.prototype
Function.prototype.__proto__ === Object.prototype
Object.prototype.__proto === null // 终结

Object.prototype !== Function.prototype
```

模拟实现

```js

var MyObject = new Function()

MyObject.prototype = Object.create(null)

MyObject.prototype.name = 'Object'
MyObject.prototype.name = function (v) {
  if (v === null) return Object.create(null)
  else console.log('暂未处理')
}
MyObject.prototype.__proto__ = null


```

参考:

- https://blog.csdn.net/Backee/article/details/83378772
- https://ecma262.docschina.org/
