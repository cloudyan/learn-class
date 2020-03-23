# ES5 面向对象及继承

一文彻底搞懂 js 类继承

## 理解对象

### 属性类型

```js
var person = new Object()
person.name = 'jack'
person.age = 20
person.job = 'web'

person.sayName = function() {
  console.log(this.name)
}
```

等价于

```js
var person = {
  name: 'jack',
  age: 20,
  job: 'web',

  sayName: function() {
    console.log(this.name)
  },
}
```

### 读取属性的特性


## 创建对象

### 工厂模式

### 构造函数模式

### 原型模式

### 组合使用构造函数模式和原型模式

### 动态原型模式

### 寄生构造函数模式

### 稳妥构造函数模式

## 继承

实现继承

### 原型链

```js

```

### 借用构造函数

```js

```

### 组合继承

```js

```

### 原型式继承

```js

```

### 寄生式继承

```js

```

### 寄生组合式继承

```js

```

### jQuery 实现继承

```js

```

### 等价 ES6 的继承

```js

```

参考：

- 【JavaScript 高级程序设计（第三版）】
