## 一. 理解this

### 1.1. 为什么使用this

在常见的编程语言中，几乎都有this这个关键字（Objective-C中使用的是self），但是JavaScript中的this和常见的面向对象语言中的this不太一样：

- 常见面向对象的编程语言中，比如Java、C++、Swift、Dart等等一系列语言中，this通常只会出现在`类的方法`中。
- 也就是你需要有一个类，类中的方法（特别是实例方法）中，this代表的是当前调用对象。
- 但是JavaScript中的this更加灵活，无论是它出现的位置还是它代表的含义。

使用this有什么意义呢？下面的代码中，我们通过对象字面量创建出来一个对象，当我们调用对象的方法时，希望将对象的名称一起进行打印。

如果没有this，那么我们的代码会是下面的写法：

- 在方法中，为了能够获取到name名称，必须通过obj的引用（变量名称）来获取。
- 但是这样做有一个很大的弊端：如果我将obj的名称换成了info，那么所有的方法中的obj都需要换成info。

```js
var obj = {
  name: "why",
  running: function() {
    console.log(obj.name + " running");
  },
  eating: function() {
    console.log(obj.name + " eating");
  },
  studying: function() {
    console.log(obj.name + " studying");
  }
}
```



事实上，上面的代码，在实际开发中，我们都会使用this来进行优化：

- 当我们通过obj去调用running、eating、studying这些方法时，this就是指向的obj对象

```js
var obj = {
  name: "why",
  running: function() {
    console.log(this.name + " running");
  },
  eating: function() {
    console.log(this.name + " eating");
  },
  studying: function() {
    console.log(this.name + " studying");
  }
}
```

所以我们会发现，在某些函数或者方法的编写中，this可以让我们更加便捷的方式来引用对象，在进行一些API设计时，代码更加的简洁和易于复用。

当然，上面只是应用this的一个场景而已，开发中使用到this的场景到处都是，这也是为什么它不容易理解的原因。

### 1.2. this指向什么

我们先说一个最简单的，this在全局作用域下指向什么？

+ 在全局作用域下，浏览器中测试就是指向window

```js
console.log(this); // window

var name = "why";
console.log(this.name); // why
console.log(window.name); // why
```

但是，开发中很少直接在全局作用域下去使用this，通常都是在**函数中使用**。

所有的函数在被调用时，都会创建一个执行上下文：

+ 这个上下文中记录着函数的调用栈、函数的调用方式、传入的参数信息等
+ this也是其中的一个属性

我们先来看一个让人困惑的问题：

- 定义一个函数，我们采用三种不同的方式对它进行调用，它产生了三种不同的结果

```js
// 定义一个函数
function foo() {
  console.log(this);
}

// 1.调用方式一: 直接调用
foo(); // window

// 2.调用方式二: 将foo放到一个对象中,再调用
var obj = {
  name: "why",
  foo: foo
}
obj.foo() // obj对象

// 3.调用方式三: 通过call/apply调用
foo.call("abc"); // String {"abc"}对象
```

1. 函数在调用时，JavaScript会默认给this绑定一个值
2. this的绑定和定义的位置（编写的位置）没有关系
3. this的绑定与调用方式以及调用的位置有关系
4. this是在运行时被绑定的



## 二. this绑定规则

### 2.1. 默认绑定

什么情况下使用默认绑定呢？独立函数调用。

+ 独立函数调用可以理解为**函数没有绑定到某个对象上进行调用**

**案例一：普通函数调用**

+ 