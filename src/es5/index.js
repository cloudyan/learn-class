
// 1. 最简单的类

function Person(name, age) {
  this.name = name
  this.age = age
}

const person = new Person('张三', 20)
console.log(person.name)


// 2. 构造函数和原型链里面增加方法
function Person2(name, age) {
  this.name = name
  this.age = age

  this.run = function() {
    console.log(this.name + '在运动')
  }
}

// 原型链上面的属性会被多个实例共享，构造函数不会
Person2.prototype.sex = '男'
Person2.prototype.work = function() {
  console.log(this.name + '在工作')
}

const p2 = new Person2('张三', 20)

console.log(p2.name)

p2.run()
p2.work()


// 3. 类里面的静态方法
function Person3(name, age) {
  this.name = name
  this.age = age

  this.run = function() {
    console.log(this.name + '在运动')
  }
}

Person3.getInfo = function() {
  console.log('我是静态方法')
}

Person3.getInfo()


// es5 里面的继承
// 4. 对象冒充实现继承
function Person4(name, age) {
  this.name = name
  this.age = age

  this.run = function() {
    console.log(this.name + '在运动')
  }
}

Person4.prototype.sex = '男'
Person4.prototype.work = function() {
  console.log(this.name + '在工作')
}

// 对象冒充实现继承
function Coder() {
  Person4.apply(this, arguments)  // 实例化子类时可以给父类传参
}

const c = new Coder('张三', 20)
c.run()  // 对象冒充可以继承构造函数里面的属性和方法
// c.work() // 但是没法继承原型链上面的属性和方法


// 5. 原型链实现继承
function Person5(name, age) {
  this.name = name
  this.age = age

  this.run = function() {
    console.log(this.name + '在运动')
  }
}

Person5.prototype.sex = '男'
Person5.prototype.work = function() {
  console.log(this.name + '在工作')
}

function Coder2() {}

// 原型链实现继承
Coder2.prototype = new Person5()

const c2 = new Coder2('张三', 20) // 此处实例化子类的时候没法给父类传参
c2.run()
c2.work()
// 可以继承构造函数里面的属性和方法 也可以继承原型链上面的属性和方法
// 但存在问题，实例化子类的时候没法给父类传参


// 6. 原型链+对象冒充的组合继承模式之一
function Person6(name, age) {
  this.name = name // 属性
  this.age = age

  this.run = function() { // 实例方法
    console.log(this.name + '在运动')
  }
}

Person6.prototype.sex = '男'
Person6.prototype.work = function() {
  console.log(this.name + '在工作')
}

// 对象冒充实现继承
function Coder3() {
  Person6.apply(this, arguments)
}
Coder3.prototype = new Person6(); // 原型链继承，结合对象冒充

const c3 = new Coder3('张三', 20)
c3.run()
c3.work()


// 7. ES5 继承最终方案
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

// 对象冒充实现继承
function Cat() {
  Animal.apply(this, arguments)
}
// 将原型链指向父类的原型链
// Coder4.prototype = Person7.prototype
Cat.prototype = Animal.prototype
// Cat.prototype.constructor = Cat

var cat = new Cat('小猫')
cat.run()
cat.eat('鱼')

function Dog() {
  Animal.apply(this, arguments)
}
Dog.prototype = new Animal()
Dog.prototype.constructor = Dog

var dog = new Dog('小狗')
dog.run()
dog.eat('骨头🦴')


