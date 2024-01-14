# 一 JavaScript函数的this指向

## 1 this的绑定规则

1. 函数在调用时，JavaScript会**默认给this绑定一个值**
2. this的**绑定和定义的位置（编写位置）**没有关系
3. this的**绑定与调用方式以及调用的位置有关**
4. this是**在运行时被绑定**的

```js
// 定义一个函数
      function foo() {
        console.log(this);
      }

      // 1.调用方式一：直接调用
      foo(); //window

      // 2.调用方式二：将foo放到一个对象中再调用
      var obj = {
        name: "why",
        foo: foo,
      };
      obj.foo(); //obj

      // 3.调用方式三：通过call/apply调用
      foo.call("abc"); //String{"abc"}对象
```

### 规则一：默认绑定

+ 独立函数调用：可以理解为**函数没有被绑定到某个对象上进行调用**
+ 严格模式下, 独立调用的函数中的this指向的是undefined

```js
    // 1.普通的函数被独立的调用
    function foo() {
      console.log("foo:", this)
    }
    foo()	 

	// 2.函数定义在对象中，但是独立调用
      var obj = {
        name: "tjj",
        bar: function () {
          console.log("bar:", this);
        },
      };
      var foo = obj.bar;
      foo();

      // 3.高阶函数
      function test(fn) {
        fn();
      }
      test(obj.bar);
```



### 规则二：隐式绑定

+ 通过**某个对象进行调用**的，即**它调用的位置中，是通过某个对象发起的函数调用**

```js
      function foo() {
        console.log("foo函数", this);
      }

      var obj = {
        bar: foo,
      };

      obj.bar();
```

+ 指向的是obj这个对象（因为是通过obj对象发起的调用）
+ 输出：foo函数{bar：f}



```js
      function foo() {
        console.log("foo函数", this);
      }

      var obj1 = {
        name: "obj1",
        foo: foo,
      };

      var obj2 = {
        name: "obj2",
        obj1: obj1,
      };

      obj2.obj1.foo();
```

+ this指向obj1，通过obj1发起的调用
+ 输出：foo函数 {name: 'obj1', foo: ƒ}



### 规则三：显式绑定

隐式绑定有一个前提条件：

+ **必须在调用对象的内部有一个对函数的引用**（比如一个属性）
+ 如果没有这样的引用，在进行函数调用时，会报找不到该函数的错误
+ 正是通过这个引用，间接的将this绑定到了这个对象上

如果我们不希望在**对象内部**包含这个**函数的引用**，同时又希望在这个对象上进行强制调用

JavaScript所有的函数都可以使用**call和apply方法(调用函数同时绑定this)。**

+ 第一个参数是相同的，要求传入一个对象
  + 这个对象的作用是给this准备的
  + 在调用这个函数时，会**将this绑定到这个传入的对象**
+ 后面的参数，apply为**数组**，call为**参数列表**

因为上面的过程，我们明确的绑定了this指向的对象，所以称之为**显式绑定**。

```js
      var obj = {
        name: "obj",
      };
      function foo() {
        console.log("foo函数", this);
      }

      foo.call(obj);
      foo.call(123); //基本数据类型会产生一个包装类的对象
      foo.call("abc");
      foo.call(undefined)//null和undefined没有包装类型的传入，指向window
```

+ 输出：*{**name**:* 'obj'}   Number {123} String {'abc'}



### 规则四：new绑定

JavaScript中的函数可以当作一个**类的构造函数**来使用，也就是new关键字

使用new关键字来调用函数，会执行如下操作：

+ 创建一个全新的对象
+ 这个新对象会被执行prototype连接
+ 这个新对象会绑定到函数调用的this上
+ 如果函数没有返回其他对象，表达式会返回这个新对象

```js
      // 1.创建新的空对象
      // 2.this指向这个新的空对象
      // 3.执行函数体中的代码
      // 4.没有显示返回非空对象时，默认返回这个对象
      function foo() {
        console.log("foo函数", this);
      }

      new foo(); //foo {}
```



### 内置函数的绑定思考

有些时候，我们会调用一些JavaScript的内置函数，或者一些第三方库中的内置函数。 

+ 这些内置函数会要求我们传入另外一个函数； 
+ 我们自己并不会显示的调用这些函数，而且JavaScript内部或者第三方库内部会帮助我们执行； 
+ 这些函数中的this又是如何绑定的呢？ 

 **setTimeout、数组的forEach、div的点击**

 ```js
// 内置函数（第三方库）:根据一些经验
      // 1.定时器
      setTimeout(function () {
        console.log("定时器",this);
      },1000)//指向window

      // 2.按钮的点击监听
      var btnEl = document.querySelector("button")
      btnEl.onclick = function () {
        console.log("btn的点击",this);
      }

      btnEl.addEventListener("click",function() {
        console.log("btn的点击",this);
      }) //指向监听的元素btnEl

      // 3.forEach
      var names = ["abc","cba","bda"]
      names.forEach(function(item) {
        console.log("forEach",this);
      },'aaa')// 三次都指向window,第二个参数可以绑定this的指向 String {'aaa'}
 ```



## 2 apply/call/bind

### 2.1 apply/call

通过call或者apply绑定this对象 

+ 显示绑定后，this就会明确的指向绑定的对象

```js
     function foo(name, age, height) {
        console.log("foo函数被调用:", this);
        console.log("打印参数:", name, age, height);
      }

      // apply
      // 第一个参数: 绑定this
      // 第二个参数: 传入额外的实参, 以数组的形式
      foo.apply("apply", ["kobe", 30, 1.88]);

      // call
      // 第一个参数: 绑定this
      // 参数列表: 后续的参数以多参数的形式传递, 会作为实参
      foo.call("call", "james", 25, 2.5);
```



### 2.2 bind方法

如果我们希望**一个函数总是显示的绑定到一个对象上**，可以怎么做呢？

+ 使用bind方法，bind()方法创建一个新的**绑定函数（bound function BF）**
+ 绑定函数是一个**exotic function object（怪异函数对象**，ECMAScript 2015 中的术语）
+ 在 bind() 被调用时，这个**新函数的 this 被指定为 bind() 的第一个参数**，而其余参数将作为**新函数的参数**，供调用时使用。

```js
	  function foo(name, age, height, address) {
       console.log("foo:", this)
       console.log("参数:", name, age, height, address)
      }

      var obj = { name: "why" }

      // 需求：在调用函数foo时，总是绑定到obj对象上（不希望obj对象身上有函数）
      var bar = foo.bind(obj,"tjj") //绑定到对象{name: 'why'}
      bar() //独立函数调用优先级低，怪异函数对象，看起来是一个独立函数，实际已经绑定了this
      bar()
```



## 3 this绑定优先级

学习了四条规则，接下来开发中我们只需要去查找函数的调用应用了哪条规则即可，但是如果一个函数调用位置应用了多 条规则，优先级谁更高呢？

### 1.默认规则的优先级最低 

+ 毫无疑问，默认规则的优先级是最低的，因为**存在其他规则时，就会通过其他规则的方式来绑定this** 

```js
      function foo() {
        console.log("foo:",this);
      }

      var bar = foo.bind("abc")
      bar() //String {'abc'}
```



### 2.显示绑定优先级高于隐式绑定 

```js
      function foo() {
        console.log("foo:",this);
      }

	  // 显示绑定的优先级高于隐士绑定
      var obj = {
        name:'tjj',
        foo:foo
      }

      obj.foo.apply("abc") //String {'abc'}
```



```js
// 显示绑定bind优先级高于隐式绑定
      var bar = foo.bind("abc")
      var obj = {
        name:"tjj",
        baz:bar
      }
      obj.baz() //String {'abc'}
```



### 3.new绑定优先级高于隐式绑定 

```js
// new绑定优先级高于隐式绑定
      var obj = {
        name:"tjj",
        foo:function () {
          console.log("foo",this);
        }
      }
      new obj.foo() //foo {} 返沪的是新产生的空对象(foo应该是一个类型)
	  var bar = new obj.foo() //foo {}
```



### 4.new绑定优先级高于bind 

+ **new绑定和call、apply是不允许同时使用的**，所以不存在谁的优先级更高 
+ new绑定可以和bind一起使用，new绑定优先级更高 

```js
      function foo() {
        console.log(this);
      }

      var bindFn = foo.bind("aaa")
      new bindFn() // foo {}
```



## 4 绑定之外的情况

我们讲到的规则已经足以应付平时的开发，但是总有一些语法，超出了我们的规则之外。

### 情况一

**如果在显示绑定中，我们传入一个null或者undefined，那么这个显示绑定会被忽略，使用默认规则：**

```js
      "use strict"
      function foo() {
        console.log(this);
      }

      foo.call("abc") //String {'abc'}
      foo.call(null) //window
      foo.call(undefined) //window
      /* 严格模式下
         foo: abc
         foo: null
         foo: undefined
      */
```



### 情况二

创建一个函数的**间接引用**，这种情况使用默认绑定规则。

+ 赋值(obj2.foo = obj1.foo)的结果是foo函数； 
+ foo函数被直接调用，那么是**默认绑定**；

```js
      function foo() {
        console.log("foo:",this);
      }

      var obj1 = {
        name:"obj1",
        foo:foo
      }

      var obj2 = {
        name:"obj2",
      };

      
      (obj2.foo = obj1.foo)() //window 严格模式下undefined
      obj2.foo = obj1.foo
      obj2.foo() // {name: 'obj2', foo: ƒ}
```



## 5 箭头函数的使用

### 5.1 箭头函数 arrow function(重要)

1. 通过function声明一个函数

2. 函数表达式声明函数

箭头函数是ES6之后增加的一种编写函数的方法，并且它比函数表达式要更加简洁： 

+ 箭头函数**不会绑定this、arguments属性**； 
+ 箭头函数**不能作为构造函数来使用**（不能和new一起来使用，会抛出错误，因为es6中通过class来声明构造函数）； 

箭头函数如何编写呢？ 

+ (): 函数的参数 
+ {}: 函数的执行体

```js
      var names = ["abc","bdc","cba"]
      names.forEach((item,index,arr) => {
        console.log(item,index,arr);
      })
```



### 5.2 箭头函数的编写优化(重要)

优化一: 如果只有一个参数()可以省略

```js
      var names = ["abc","bdc","cba"]
      names.forEach( item => {
        console.log(item);
      })
```



优化二: **如果函数执行体中只有一行代码, 那么可以省略大括号** (一行代码中不能包括return，或者将return一起省略)

```js
      var names = ["abc","bdc","cba"]
      names.forEach( item => console.log(item))
```

优化三：**并且这行代码的返回值会作为整个函数的返回值**

```js
      var nums = [20,30,11,15,111]
      var newNums = nums.filter( item => item %2 === 0)
      console.log(newNums);
```



优化四: 如果函数执行体只有返回一个对象, 那么**需要给这个对象加上()**

```js
      var arr = () => {}//函数执行体
      var arrFn = () => ({name:"tjj"})
      console.log(arrFn());
```



### 5.3  案例

箭头函数实现nums的所有偶数平方和

```js
      var nums = [20,30,11,15,111]
      var result = nums.filter(item => item % 2 === 0)
                       .map(item => item*item)
                       .reduce((prevValue,item) => prevValue + item)
      console.log(result);
```



### 5.4 箭头函数中this使用(重要)

箭头函数中不绑定this  

```js
      // 2.箭头函数中没有this
      var bar = () => {
        console.log("bar:",this);
      }
      bar() //window
      bar.apply("aaa") //window
```

  

#### 案例一

```js
    var obj = {
      name: "obj",
      foo: function() {
        console.log("foo",this);
        var bar = () => {
          console.log("bar:", this)
        }
        return bar
        
      }
    }
    var fn = obj.foo()
    fn.apply("bbb")
```

+ 通过obj对象调用执行后的foo函数赋值给fn，也就是foo函数的返回值bar函数，bar函数因为是一个箭头函数所以不能进行显式绑定this

```js
    var fn = obj.foo
    fn.apply("bbb")

    var bar = fn()
    bar()
```

+ 输出：foo：String {'bbb'}

​				  window

​				  window

```js
    var fn = obj.foo.apply("bbb")
    fn() 

```

+ 输出：foo: String {'bbb'} 

  ​           bar: String {'bbb'}

![image-20240107173129587](https://raw.githubusercontent.com/bigshcool/myPic/main/image-20240107173129587.png)

注意：

+ es5作用域只有**全局作用域和函数作用域**，所以**对象obj不能形成作用域**
+ es6之后也只有**代码块**才能形成作用域，而**对象obj不是代码块也不能形成作用域**

#### 案例二

```js
    var obj = {
      name: "obj",
      foo: () => {
        var bar = () => {
          console.log("bar:", this)
        }
        return bar
        
      }
    }
    var fn = obj.foo()
    fn.apply("bbb")
```



![image-20240107173309742](https://raw.githubusercontent.com/bigshcool/myPic/main/image-20240107173309742.png)



### 箭头函数this原理

箭头函数**不使用this的四种标准规则（也就是不绑定this）**，而是**根据外层作用域来决定this。** 

我们来看一个模拟网络请求的案例： 

+ 这里我使用setTimeout来模拟网络请求，请求到数据后如何可以存放到data中呢？ 
+ 我们需要拿到obj对象，设置data； 
+ 但是直接拿到的this是window，我们需要在外层定义：var _this = this _
+ _在setTimeout的回调函数中使用_this就代表了obj对象

```js
      // 网络请求的工具函数
      function request(url,callbackFn) {
        var result = ["abc","cba","nba"]
        callbackFn(result)
      }

      // 实际操作的位置(业务)
      var obj = {
        names:[],
        network:function () {
          // 1.早期时候
          var _this = this
          request("/home",function (res) {
            _this.names = [].concat(res)
          })

          // 2.现在：箭头函数不绑定this,直接查找外层作用域的this
          request("/home", (res)=> {
            this.names = [].concat(res)
          })
        }
      }

      obj.network()
      console.log(obj.names);
```

![image-20240107201435255](https://raw.githubusercontent.com/bigshcool/myPic/main/image-20240107201435255.png)



## 6 this面试题

### 面试题一

```js
var name = "window";

var person = {
  name: "person",
  sayName: function () {
    console.log(this.name);
  }
};

function sayName() {
  var sss = person.sayName;
    
  sss(); 
  person.sayName(); 
  (person.sayName)(); 
  (b = person.sayName)(); 
}

sayName();
```

+ 输出：window	person	person	window（术语: 间接函数引用,返回的是一个独立函数）



### 面试题二

```js
var name = 'window'


// {} -> 对象
// {} -> 代码块
var person1 = {
  name: 'person1',
  foo1: function () {
    console.log(this.name)
  },
  foo2: () => console.log(this.name),
  foo3: function () {
    return function () {
      console.log(this.name)
    }
  },
  foo4: function () {
    // console.log(this) // 第一个表达式this -> person1
    // console.log(this) // 第二个表达式this -> person2
    // console.log(this) // 第三个表达式this -> person1
    
    return () => {
      console.log(this.name)
    }
  }
}

var person2 = { name: 'person2' }


// 开始题目:
person1.foo1(); // 隐式绑定: person1
person1.foo1.call(person2); // 显式绑定: person2

person1.foo2(); // 上层作用域: window
person1.foo2.call(person2); // 上层作用域: window

person1.foo3()(); // 默认绑定: window person1.foo3()执行foo函数之后会返回一个函数直接调用所以是独立函数调用
person1.foo3.call(person2)(); // 默认绑定: window
person1.foo3().call(person2); // 显式绑定: person2

person1.foo4()(); // person1
person1.foo4.call(person2)(); // person2
person1.foo4().call(person2); // person1
```



### 面试题三

构造函数通过new来进行调用

类可以通过new来创建相应的对象（实例instance）

创建一个person1对象，在堆内存中开辟一块空间，首先在这个对象上会有一个属性person1，还有foo1函数，会再开辟一个foo函数对象空间，foo指向这个对象的内存地址，最后会将整块空间的地址赋值给栈内存中的变量person1（画图 530 9分钟）

```js
var name = 'window'

/*
  1.创建一个空的对象
  2.将这个空的对象赋值给this
  3.执行函数体中代码
  4.将这个新的对象默认返回
*/
function Person(name) {
  this.name = name
  this.foo1 = function () {
    console.log(this.name)
  },
  this.foo2 = () => console.log(this.name),
  this.foo3 = function () {
    return function () {
      console.log(this.name)
    }
  },
  this.foo4 = function () {
    return () => {
      console.log(this.name)
    }
  }
}

// person1/person都是对象(实例instance)
var person1 = new Person('person1')
var person2 = new Person('person2')


// 面试题目:
person1.foo1() // 隐式绑定: person1
person1.foo1.call(person2) // 显式绑定: person2

person1.foo2() // 上层作用域查找: person1
person1.foo2.call(person2) // 上层作用域查找: person1

person1.foo3()() // 默认绑定: window
person1.foo3.call(person2)() // 默认绑定: window
person1.foo3().call(person2) // 显式绑定: person2

person1.foo4()() // 上层作用域查找: person1(隐式绑定)
person1.foo4.call(person2)() //  上层作用域查找: person2(显式绑定)
person1.foo4().call(person2) // 上层作用域查找: person1(隐式绑定)
```



### 面试题四

```js
var name = 'window'

/*
  1.创建一个空的对象
  2.将这个空的对象赋值给this
  3.执行函数体中代码
  4.将这个新的对象默认返回
*/
function Person(name) {
  this.name = name
  this.obj = {
    name: 'obj',
    foo1: function () {
      return function () {
        console.log(this.name)
      }
    },
    foo2: function () {
      return () => {
        console.log(this.name)
      }
    }
  }
}

var person1 = new Person('person1')
var person2 = new Person('person2')

person1.obj.foo1()() // 默认绑定: window
person1.obj.foo1.call(person2)() // 默认绑定: window
person1.obj.foo1().call(person2) // 显式绑定: person2

person1.obj.foo2()() // 上层作用域查找: obj(隐式绑定)
person1.obj.foo2.call(person2)() // 上层作用域查找: person2(显式绑定)
person1.obj.foo2().call(person2) // 上层作用域查找: obj(隐式绑定)
```



# 二 深入浏览器的渲染原理

## 1 网页渲染原理

### 网页被解析的过程

![image-20240114213335942](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20240114213335942.png)



### 浏览器内核

+  浏览器内核指的是浏览器的排版引擎（layout engine），也称为浏览器引擎（browser engine）、页面渲染引擎（rendering engine）或样版引擎

**浏览器解析网页的过程**通常是由**浏览器内核**完成的，浏览器内核又可以分成两部分：

+ **浏览器内核**是指浏览器中负责解析HTML、CSS JavaScript等文件的核心组成，也被称为**渲染引擎**
+ **JS 引擎**则是解析 Javascript 语言，执行 javascript 语言来实现网页的动态效果。

常见的浏览器内核有 

+ Trident （ 三叉戟）：IE、360安全浏览器、搜狗高速浏览器、百度浏览器、UC浏览器；
+ Gecko（ 壁虎） ：Mozilla Firefox；
+ Presto（急板乐曲）-> Blink （眨眼）：Opera 
+ Webkit ：Safari、360极速浏览器、搜狗高速浏览器、移动端浏览器（Android、iOS） 
+ Webkit -> Blink ：Google Chrome，Edge

## 2 浏览器渲染流程

### 页面渲染整体流程

渲染引擎在拿到一个页面后，如何解析整个页面并且最终呈现出我们的网页呢？

![image-20230925154624141](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230925154624141.png)



### 渲染页面的详细流程

![](https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/S9TJhnMX1cu1vrYuQRqM.png?auto=format&w=741)

​																									

+ https://www.html5rocks.com/en/tutorials/internals/howbrowserswork



### 解析一：HTML解析过程

+ 因为默认情况下服务器会给浏览器返回index.html文件，所以解析HTML是所有步骤的开始： 

+ 解析HTML，会构建DOM Tree：



### 解析二 – 生成CSS规则

在解析的过程中，如果遇到CSS的link元素，那么会由浏览器负责下载对应的CSS文件： 

+ 注意：下载CSS文件是不会影响DOM的解析的； 

浏览器下载完CSS文件后，就会对CSS文件进行解析，解析出对应的规则树：

+  我们可以称之为 CSSOM（CSS Object Model，CSS对象模型）；



### 解析三 – 构建Render Tree

+ 当有了DOM Tree和 CSSOM Tree后，就可以两个结合来构建Render Tree了

![preview](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/view)

注意一：

+ 需要注意的是，link元素不会阻塞DOM树的构建过程，但会阻塞Render Tree的构建过程
+ 这是因为Render Tree在构建时需要对应的CSSOM Tree

注意二：

+ 同时，需要注意的是Render Tree和DOM Tree并不是一一对应的关系
+ 例如，对于display为none的元素，它不会在Render Tree中出现。这是因为该元素被隐藏了，不会影响页面的呈现，因此也不需要在渲染树中进行渲染



### 解析四 – 布局（layout）和绘制（Paint）

第四步是在**渲染树（Render Tree）上运行布局（Layout）以计算每个节点的几何体。** 

+ 渲染树会表示显示哪些节点以及其他样式，但是**不表示每个节点的尺寸、位置等信息；** 
+ 布局是确定呈现树中**所有节点的宽度、高度和位置信息；** 

第五步是将**每个节点绘制（Paint）到屏幕上** 

+ 在绘制阶段，浏览器将布局阶段计算的**每个frame转为屏幕上实际的像素点；** 
+ 包括**将元素的可见部分进行绘制**，比如**文本、颜色、边框、阴影、替换元素（比如img）**



## 3 回流和重绘解析

#### 2.6.1. 回流的解析

理解回流reflow：（也可以称之为重排）

+ 第一次确定节点的大小和位置，称之为布局（layout）
+ 之后对节点的大小、位置修改重新计算称之为回流。

也就是说回流是指浏览器必须 重新计算渲染树中部分或全部元素的集合信息（位置和大小）



**触发回流**的情况有很多，常见的包括：

1. DOM结构的变化，比如添加、删除、移动元素等操作
2. 改变元素的布局，比如修改元素的宽高、padding、margin、border、position、display 等属性；
3. 页面尺寸的变化，比如浏览器窗口大小的变化，或者文档视口的变化

回流的代价比较高，因为它会涉及到大量的计算和页面重排，这会导致页面的性能和响应速度下降。



#### 2.6.2. 重绘的解析

理解重绘repaint：

+ 第一次渲染内容称为绘制（paint）
+ 之后重新渲染称之为重绘

重绘是指浏览器不需要重新计算元素的几何信息，而只需要重新绘制元素的内容的过程。



**触发重绘**的情况有很多，常见的包括：

1. 修改元素的颜色、背景色、边框颜色、文本样式等属性；
2. 修改元素的 box-shadow、text-shadow、outline 等属性；
3. 添加、移除、修改元素的 class；
4. 使用 JavaScript 直接修改样式。

重绘的代价比较小，因为它不涉及到元素的位置和大小等计算，只需要重新绘制元素的内容即可。

**回流一定会引起重绘，所以回流是一件很消耗性能的事情。**

## 





## 4 合成和性能优化

## 2.3 **composite**合成

默认情况下，标准流中的内容都是被绘制在同一个图层（Layer）中的；

而一些特殊的属性，会创建一个新的合成层（ CompositingLayer ），并且新的图层可以利用GPU来加速绘制；

- 因为每个合成层都是单独渲染的；



有些属性可以触发合成层的创建，包括：

1. 3D 变换（3D Transforms）：如 rotateX、rotateY、translateZ 等属性，可以创建一个新的合成层。
2. video、iframe 等标签：这些标签会创建一个新的合成层。
3. opacity 动画转换时：当元素透明度发生变化时，会创建一个新的合成层。
4. position: fixed：将元素定位为固定位置时，也会创建一个新的合成层。
5. will-change 属性：可以通过这个实验性的属性，告诉浏览器元素可能会发生哪些变化，从而预先创建合成层。

需要注意的是，过度使用合成层也会带来一些问题，如占用更多的内存、增加页面的复杂度等。

因此，在使用合成层时需要谨慎，避免滥用

## 5 defer和async属性

### script元素和页面解析的关系

 我们现在已经知道了页面的渲染过程，但是JavaScript在哪里呢？

+ 事实上，浏览器在解析HTML的过程中，遇到了**script元素是不能继续构建DOM树的；** 
+ 它会**停止继续构建，首先下载JavaScript代码，并且执行JavaScript的脚本；** 
+ 只有**等到JavaScript脚本执行结束后，才会继续解析HTML，构建DOM树；** 

为什么要这样做呢？

这是**因为JavaScript的作用之一就是操作DOM，并且可以修改DOM；** 

如果我们**等到DOM树构建完成并且渲染再执行JavaScript，会造成严重的回流和重绘，影响页面的性能**； 

所以会在**遇到script元素时，优先下载和执行JavaScript代码，再继续构建DOM树；**

但是这个也往往会带来新的问题，特别是现代页面开发中： 

+ 在目前的开发模式中（比如Vue、React），**脚本往往比HTML页面更“重”，处理时间需要更长；** 
+ 所以会**造成页面的解析阻塞，在脚本下载、执行完成之前，用户在界面上什么都看不到；** 

为了解决这个问题，script元素给我们提供了两个属性（attribute）：**defer和async**。



### defer属性

+ defer属性告诉浏览器**不要等待脚本下载**，而**继续解析HTML，构建DOM Tree**
  + 脚本**会由浏览器进行下载，但是不会阻塞DOM Tree**的构建过程
  + 如果脚本提前下载好了，他会**等待DOM Tree构建完成，在DOMContentLoaded事件之前先执行defer中的代码**
+ 所以**DOMContentLoaded总是会等待defer中的代码先执行完成**。
+ 另外**多个带defer的脚本是可以保持正确的顺序执行的**。
+ 从某种角度来说，**defer可以提高页面的性能，并且推荐放到head元素中；**
+ 注意：**defer仅适用于外部脚本，对于script默认内容会被忽略。**



### async属性

+ async属性与defer属性类似，他也能够让脚本不阻塞页面
+ async是一个让脚本完全独立的：
  + 浏览器不会因 async 脚本而阻塞（与 defer 类似）； 
  + **async脚本不能保证顺序，它是独立下载、独立运行，不会等待其他脚本；** 
  + **async不会能保证在DOMContentLoaded之前或者之后执行；**
+ defer通常用于需要在文档解析后操作DOM的JavaScript代码，并且对多个script文件有顺序要求的；
+ async通常用于独立的脚本，对其他脚本，甚至DOM没有依赖的；

# 三 深入JavaScript的运行原理

## 1 深入V8引擎原理

### JavaScript代码的执行

WebKit事实上由两部分组成的：

- WebCore：负责HTML解析、布局、渲染等等相关的工作。
- JavaScriptCore：解析、执行JavaScript代码。

![image-20231106101720224](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231106101720224.png)



### V8引擎的执行原理

V8引擎是一款Google开源的高性能JavaScript和WebAssembly引擎，它是使用**C++编写**的。

- V8引擎的主要目标是**提高JavaScript代码的性能和执行速度。**
- V8引擎可以在多种操作系统上运行，包括Windows 7或更高版本、macOS 10.12+以及使用x64、IA-32、ARM或MIPS处理器的Linux系统。

V8引擎可以作为一个**独立的应用程序运行，也可以嵌入到其他C++应用程序中，例如Node.js**。

- 由于V8引擎的开源性和高性能，许多现代浏览器都使用了V8引擎或其修改版本，以提供更快、更高效的JavaScript执行体验。

![image-20240114220736623](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20240114220736623.png)



### V8引擎的架构

V8引擎本身的源码非常复杂，大概有超过100w行C++代码，通过了解它的架构，我们可以知道它是如何对JavaScript执行的：

**Parse**模块会将JavaScript代码转化为AST抽象语法树，这是因为解释器并不直接认识JavaScript代码：

+ 如果函数没有被调用，那么是不会被转换成AST的
+ Parse的V8官方文档：https://v8.dev/blog/scanner

**Ignition**是一个解释器，会将AST转换成ByteCode（字节码）

+ 同时会收集TurboFan优化所需要的信息（比如函数参数的类型信息，有了类型才能进行真实的运算）
+ 如果函数只调用一次，Ignition会执行解释执行ByteCode
+ Ignition的V8官方文档：https://v8.dev/blog/ignition-interpreter

**TurboFan**是一个编译器，可以将字节码编译为CPU可以直接执行的机器码；

+ 如果一个函数被多次调用，那么就会被标记为**热点函数**，那么就会

**经过TurboFan转化成优化的机器码，提高代码的执行性能**；

+ 但是，**机器码实际上也会被还原为ByteCode**，这是因为后续执行函数的过程中，**类型发生了变化（比如sum函数原来执行的是number类型，后来执行变成了string类型）**，之前优化的机器码并不能正确处理运算，就会逆向的转化为字节码

+ TurboFan的V8官方文档：https://v8.dev/blog/turbofan-jit

### V8引擎的解析图（官方）

![image-20240114221054940](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20240114221054940.png)

词法分析（英文lexical analysis）

+ 将字符序列转换成token序列 的过程。 
+ token是记号化 （tokenization）的缩写 
+ 词法分析器（lexical analyzer，简称lexer），也 叫扫描器（scanner）

语法分析（英语：syntactic analysis，也叫 parsing）

+ 语法分析器也可以称之为 parser。

## 2 JS执行上下文

这段代码在真正开始执行之前（进入到执行上下文之前），这段代码要先进行js引擎（解析ast树->翻译生成对应的字节码-> 再生成机器码）js在对js代码进行翻译之前会对其进行一个作用域的提升，代码中定义了许多标识符（变量）会在js进行解析代码的时候已经知道了有哪些标识符，会将这些标识符放到VO对象中（在翻译过程中发现有这个变量会将这些变量放到VO对象中）

其他变量在执行之前都是undefined，js引擎会对函数进行特殊处理，会将函数的对象提前创建出来，目的是可以提前对函数进行调用

```js
console.log(message,num1,num2); //undefined undefined undefined
foo() //foo function
      
var message = "Global Message"
function foo() {
	var message = "Foo Message"
	console.log("foo function");
}

var num1 = 10 
var num2 = 20
var result = num1 + num2
console.log(result);
```



+ 函数是先被作用域提升（js优化）被提前声明的（相比于其他对象）

```js
var foo = "abc"
console.log(foo);//abc

var message = "Global Message"
function foo() {
	var message = "Foo Message"
	console.log("foo function");
}

var num1 = 10
var num2 = 20
var result = num1 + num2
console.log(result); 
```



`var message = "Global Message"`语句的执行就是在栈中执行的，因为栈中的全局执行上下文关联了一个GO，将这个message加入到了GO中，多了一个属性，堆内存中也保存了这个值





### 初始化全局对象

JS引擎在**执行代码之前**，会在**堆内存中创建一个全局对象**：Global Object（GO）

+ 该对象所有作用域都可以访问
+ 里面会包含**Date、Array、String、Number、setTimeout、setInterval**等等；
+ 其中还有一个**window属性**指向自己

![image-20240112125235176](https://raw.githubusercontent.com/bigshcool/myPic/main/image-20240112125235176.png)

### 执行上下文（ Execution Contexts ）

js引擎内部有一个**执行上下文栈（Ececution Context Stack，简称ECS）**，它是用于**执行代码的调用栈**

首先执行的是全局的代码块

+ 全局的代码块为了执行会构建一个Global Excution Context（GEC）
+ GEC会被放入到ECS中执行

GEC被放入到ECS中里面包含两部分内容：

+ 第一部分：在代码执行前，在**parse转成AST的过程中**，会将**全局定义的变量、函数**等加入到**GlobalObject**中，但并**不会赋值**
  + 这个过程也称之为**变量的作用域提升（hoisting）**
+ 第二部分：在代码执行中，对变量赋值，或者执行其他的函数；

![image-20240112130525675](https://raw.githubusercontent.com/bigshcool/myPic/main/image-20240112130525675.png)

### 认识VO对象（Variable Object）

每一个执行上下文会关联一个VO（Variable Object，变量对象），**变量和函数声明**会被添加到这个VO对象中。

◼ 当全局代码被执行的时候，VO就是GO对象了

## 3 全局代码执行过程



## 4 函数代码执行过程

在执行的过程中**执行到一个函数时**，就会根据**函数体**创建一个**函数执行上下文（Functional Execution Context，简称FEC）**， 并且压入到**EC Stack**中。

因为每个执行上下文都会关联一个VO，那么函数执行上下文关联的VO是什么呢？

+ 当进入一个函数执行上下文时，会创建一个**AO对象（Activation Object）；**
+  这个AO对象会**使用arguments作为初始化**，并且**初始值是传入的参数**；
+ 这个**AO对象会作为执行上下文的VO来存放变量的初始化；**

![image-20240112133326712](https://raw.githubusercontent.com/bigshcool/myPic/main/image-20240112133326712.png)

### 函数的执行过程（执行前）

## 5 作用域和作用域链

当进入到一个执行上下文时，执行上下文也会关联一个作用域链（Scope Chain）

+ **作用域链是一个列表对象**，用于变量标识符的求值
+ 当进入一个执行上下文时，这个**作用域被创建，并根据代码类型，创建一系列的对象**



+ 函数被创建时决定了它的作用域链，函数在解析时它的作用域链就已经确定了，与调用位置方式无关,函数定义的位置
+ 当执行上下文的时候，会将我们AO对象中作用域链的值赋值给执行上下文中的作用域链
+ 作用域链本身就是保存在函数中，函数在创建的那一刻，就形成了自己的作用域链

```js
// 2.函数中没有自己的message
      var message = "Global Message";

      debugger;

      function foo() {
        console.log(message);
      }

      foo();

      var obj = {
        name: "obj",
        bar: function () {
          var message = "bar message";
          foo();
        },
      };

      obj.bar();
```



## 6 作用域提升面试题

```js
    // 1.面试题一:
    var n = 100
    function foo() {
      n = 200
    }
    foo()
	console.log(n)
```

输出：200



```js
    var n = 100
    function foo() {
      console.log(n)
      var n = 200
      console.log(n)
    }

    foo()
```

输出：undefined 200

在代码执行之前就已经创建了自己的AO，AO中已经存在n了



```js
    // 3.面试题三:
    var n = 100

    function foo1() {
      console.log(n)
    }
    function foo2() {
      var n = 200
      console.log(n)
      foo1()
    }
    foo2()
```

输出：200 100 



```js
    // 4.面试题四:
    var n = 100
    function foo() {
      console.log(n)
      return
      var n = 200
    }
    foo()
```

输出：undefined

return是执行时代码结束



```js
    // 5.在开发中可能会出现这样错误的写法
    function foo() {
      message = "Hello World" //当作一个全局变量，在全局中进行解析
    }
    foo()
    console.log(message)
```

输出：Hello World



```js
      // 6.面试题五:
      function foo() {
        var a = (b = 100);
      }
      foo();
      console.log(a); // 访问不到，a是在函数中定义的（AO中存在）
      console.log(b); // b并没有进行声明直接定义，所以是一个全局变量
```

输出： 报错 100





代码执行过程设计的目的？

+ 最主要的目的：闭包

# JavaScript内存管理和闭包

## 1 JavaScript内存管理

不管什么样的编程语言，在代码的执行过程中都是需要给它**分配内存**的，不同的是某些编程语言需要我们**自己手动的管理内存**， 某些编程语言会可以**自动帮助我们管理内存**： 

不管以什么样的方式来管理内存，内存的管理都会有如下的生命周期：

+ **第一步：分配申请你需要的内存**
+ **第二步：使用分配的内存**
+ **第三步：不需要使用时，对其进行释放**

不同的编程语言对于第一步和第三步会有不同的实现： 

+ **手动管理内存**：比如C、C++，包括早期的OC，都是需要手动来管理内存的申请和释放的（malloc和free函数）； 
+ **自动管理内存**：比如Java、JavaScript、Python、Swift、Dart等，它们有自动帮助我们管理内存；

对于开发者来说，JavaScript 的内存管理是自动的、无形的。 

+ 我们创建的**原始值、对象、函数……这一切都会占用内存；** 
+ 但是我们**并不需要手动来对它们进行管理，JavaScript引擎**会帮助我们处理好它；



JavaScript会在定义数据时为我们分配内存。 

但是内存分配方式是一样的吗？

+  JS对于**原始数据类型内存的分配**会在执行时， 直接在栈空间进行分配； （js中有作用域和作用域链的概念，在堆内存GO对象中也存在一个一样的属性，相当于某一个时刻存在两份，栈内存中的变量执行完成后就销毁了）
+  JS对于**复杂数据类型内存的分配**会在堆内存中 开辟一块空间，并且将这块空间的指针返回值 变量引用；

## 2 垃圾回收机制算法



根对象不能被清除，保存着对别的对象的引用，根对象 window

## 3 闭包的概念理解



### JavaScript的函数式编程

在前面我们说过，JavaScript是支持函数式编程的 

在JavaScript中，函数是非常重要的，并且是一等公民： 

+ 那么就意味着函数的使用是非常灵活的； 
+ 函数可以作为另外一个函数的参数，也可以作为另外一个函数的返回值来使用； 

所以JavaScript存在很多的高阶函数： 

+ 自己编写高阶函数 
+ 使用内置的高阶函数 

目前在vue3+react开发中，也都在趋向于函数式编程： 

+ vue3 composition api: setup函数 -> 代码（函数hook，定义函数）； 
+ react：class -> function -> hooks



### 闭包的定义

这里先来看一下闭包的定义，分成两个：在**计算机科学**中和在**JavaScript**中。 

在计算机科学中对闭包的定义（维基百科）： 

+ 闭包（英语：Closure），又称**词法闭包**（Lexical Closure）或**函数闭包**（function closures）； 
+ 是在支持**头等函数**的编程语言中，实现**词法绑定的一种技术**； 
+ 闭包在实现上是一个**结构体**，它存储了**一个函数**和**一个关联的环境**（相当于一个符号查找表）； 
+ 闭包跟函数最大的区别在于，当捕捉闭包的时候，它的 **自由变量** 会在捕捉时被确定，这样即使脱离了捕捉时的上下文，它也能照常运行；

> 一个函数和关联环境组成结构的就是闭包



 闭包的概念出现于60年代，最早实现闭包的程序是 **Scheme**，那么我们就可以理解为什么JavaScript中有闭包： 

+ **因为JavaScript中有大量的设计是来源于Scheme的；** 



我们再来看一下MDN对JavaScript闭包的解释： 

+ **一个函数和对其周围状态（lexical environment，词法环境）的引用捆绑**在一起（或者说函数被引用包围），这样的组合就是**闭包（closure）**； 
+ 也就是说，闭包让你可以在一个**内层函数中访问到其外层函数的作用域；** 
+ 在 JavaScript 中，每当创建一个函数，**闭包就会在函数创建的同时被创建出来**； 



那么我的理解和总结： 

+ 一个普通的函数function，如果它可以访问外层作用域的自由变量，那么这个函数和周围环境就是一个闭包； 
+ 从广义的角度来说：**JavaScript中的函数都是闭包**； 
+ 从狭义的角度来说：JavaScript中一个函数，如果访问了外层作用域的变量，那么它是一个闭包；

## 4 闭包的形成过程



## 5 闭包的内存泄漏   