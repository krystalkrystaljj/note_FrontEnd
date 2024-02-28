# Proxy-Reflect使用详解

Proxy-Reflect（vue3中的响应式原理）

## 1 监听对象的操作

 我们先来看一个需求：有一个对象，我们希望监听这个对象中的属性被设置或获取的过程 

+ 通过我们前面所学的知识，能不能做到这一点呢？ 

+ 其实是可以的，我们可以通过之前的属性描述符中的存储属性描述符来做到； 监听对象的操作 

左边这段代码就利用了前面讲过的 Object.defineProperty 的存储属性描述符来 对属性的操作进行监听。

> 什么是响应式？当一处数据发生变化时，其他内容随之变化
>
> 例如被监听对象的属性发生变化时，页面也会随之刷新，展示变化后d

```js
      const obj = {
        name: "why",
        age: 18,
        height: 1.88,
      };
      // 需求: 监听对象属性的所有操作
      // 监听属性的操作
      // 1.针对一个属性
      let _name = obj.name;// 保存修改后的name值，默认值是obj.name
      Object.defineProperty(obj, "name", {
        set: function (newValue) {
          console.log("监听给name设置了新的值：", newValue);
          _name = newValue;
        },
        get: function () {
          console.log("监听:获取name的值");
          return _name;
        },
      });
      console.log(obj.name);
      obj.name = "kobe";
```



```js
    // 2.监听所有的属性: 遍历所有的属性, 对每一个属性使用defineProperty
    const keys = Object.keys(obj)
    for (const key of keys) {
      let value = obj[key]
      Object.defineProperty(obj, key, {
        set: function(newValue) {
          console.log(`监听: 给${key}设置了新的值:`, newValue)
          value = newValue
        },
        get: function() {
          console.log(`监听: 获取${key}的值`)
          return value
        }
      })
    }

    // console.log(obj.name)
    // obj.name = "kobe"
    console.log(obj.age)
    obj.age = 17
    console.log(obj.age)
```



但是这样做有什么缺点呢？ 

+ 首先，Object.defineProperty设计的初衷，不是为了去监听截止一个对象中 所有的属性的。
  + 我们在定义某些属性的时候，初衷其实是定义普通的属性，但是后面我们强 行将它变成了数据属性描述符。 
+ 其次，如果我们想监听更加丰富的操作，比如新增属性、删除属性，那么 Object.defineProperty是无能为力的。

所以我们要知道，存储数据描述符设计的初衷并不是为了去监听一个完整的对象。

## 2 Proxy类基本使用

 在ES6中，新增了一个Proxy类，这个类从名字就可以看出来，是用于帮助我们创建一个代理的： 

+ 也就是说，如果我们希望**监听一个对象的相关操作**，那么我们可以**先创建一个代理对象（Proxy对象）**； 
+ 之后对**该对象的所有操作**，都通过**代理对象来完成**，代理对象**可以监听我们想要对原对象进行哪些操作**；

我们可以将上面的案例用Proxy来实现一次： 

+ 首先，我们需要**new Proxy对象**，并且**传入需要侦听的对象以及一个处理对象**，可以称之为**handler**； 
  + const p = new Proxy(target, handler) 
+ 其次，我**们之后的操作都是直接对Proxy的操作**，而**不是原有的对象**，因为我们需要在handler里面进行侦听；





### 监听对象属性的操作

```js
    const obj = {
      name: "why",
      age: 18,
      height: 1.88
    }


    // 1.创建一个Proxy对象
    const objProxy = new Proxy(obj, {
      set: function(target, key, newValue) {
        console.log(`监听: 监听${key}的设置值: `, newValue)
        target[key] = newValue
      },
      get: function(target, key) {
        console.log(`监听: 监听${key}的获取`)
        return target[key]
      }
    })

    // 2.对obj的所有操作, 应该去操作objProxy
    // console.log(objProxy.name)
    // objProxy.name = "kobe"
    // console.log(objProxy.name)
    // objProxy.name = "james"

    objProxy.address = "广州市"
    console.log(objProxy.address)
```



## 3 Proxy常见捕获器

如果我们想要侦听某些具体的操作，那么就可以在handler中添加对应的捕捉器（Trap）： 

set和get分别对应的是函数类型； 

+ set函数有四个参数： 
  + target：目标对象（侦听的对象）； 
  + property：将被设置的属性key； 
  + value：新属性值； 
  + receiver：调用的代理对象； 
+ get函数有三个参数： 
  + target：目标对象（侦听的对象）； 
  + property：被获取的属性key； 
  + receiver：调用的代理对象；



### Proxy所有捕获器

13个活捉器分别是做什么的呢？ 

handler.getPrototypeOf()  Object.getPrototypeOf 方法的捕捉器。 

 handler.setPrototypeOf()  Object.setPrototypeOf 方法的捕捉器。 

 handler.isExtensible()  Object.isExtensible 方法的捕捉器(判断是否可以新增属性)。

handler.preventExtensions()  Object.preventExtensions 方法的捕捉器。 

handler.getOwnPropertyDescriptor()  Object.getOwnPropertyDescriptor 方法的捕捉器。 

handler.defineProperty()  Object.defineProperty 方法的捕捉器。 Proxy所有捕获器 

handler.ownKeys()  Object.getOwnPropertyNames 方法和 Object.getOwnPropertySymbols 方法的捕捉器。 

**handler.has()  in 操作符的捕捉器。** 

**handler.get()  属性读取操作的捕捉器。** 

**handler.set()  属性设置操作的捕捉器。** 

**handler.deleteProperty()  delete 操作符的捕捉器。** 

handler.apply()  函数调用操作的捕捉器。

handler.construct()  new 操作符的捕捉器。

```js
    const obj = {
      name: "why",
      age: 18,
      height: 1.88
    }


    // 1.创建一个Proxy对象
    const objProxy = new Proxy(obj, {
      set: function(target, key, newValue) {
        console.log(`监听: 监听${key}的设置值: `, newValue)
        target[key] = newValue
      },
      get: function(target, key) {
        console.log(`监听: 监听${key}的获取`)
        return target[key]
      },

      deleteProperty: function(target, key) {
        console.log(`监听: 监听删除${key}属性`)
        delete obj.name
      },

      has: function(target, key) {
        console.log(`监听: 监听in判断 ${key}属性`)
        return key in target
      }
    })

    delete objProxy.name

    console.log("age" in objProxy)
```



### Proxy的construct和apply

监听函数对象的操作

```js
    function foo(num1, num2) {
      console.log(this, num1, num2)
    }

    const fooProxy = new Proxy(foo, {
      apply: function(target, thisArg, otherArgs) {
        console.log("监听执行了apply操作")
        target.apply(thisArg, otherArgs)
      },
      construct: function(target, otherArray) {
        console.log("监听执行了new操作")
        console.log(target, otherArray)
        return new target(...otherArray)
      }
    })

    // fooProxy.apply("abc", [111, 222])
    new fooProxy("aaa", "bbb")
```



## 4 Reflext介绍和作用

Reflect也是ES6新增的一个API，它是一个**对象**，字面的意思是**反射**。 

那么这个Reflect有什么用呢？ 

+ 它主要提供了很多操作JavaScript对象的方法，有点像Object中操作对象的方法； 
+ 比如Reflect.getPrototypeOf(target)类似于 Object.getPrototypeOf()； 
+ 比如Reflect.defineProperty(target, propertyKey, attributes)类似于Object.defineProperty() ； 

如果我们有Object可以做这些操作，那么为什么还需要有Reflect这样的新增对象呢？ 

+ 这是因为在早期的ECMA规范中没有考虑到这种对 对象本身 的操作如何设计会更加规范，所以将这些API放到了Object上面； 
+ 但是Object作为一个构造函数，这些操作实际上放到它身上并不合适； 
+ 另外还包含一些类似于 in、delete操作符，让JS看起来是会有一些奇怪的； 
+ 所以在ES6中新增了Reflect，让我们这些操作都集中到了Reflect对象上； 
+ 另外在使用Proxy时，可以做到不操作原对象； 

那么Object和Reflect对象之间的API关系，可以参考MDN文档： 

+ https://developer.mozilla.org/zhCN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/Comparing_Reflect_and_Object_methods





## 5 Reflext的基本使用



+ 严格模式下，属性设置为不可修改时，delete 删除会报错
+ 而采用Reflect中的deleteProperty方法时不会报错，并且能够直接返回布尔值

```js
    "use strict"

    const obj = {
      name: "why",
      age: 18
    }

    Object.defineProperty(obj, "name", {
      configurable: false
    })
    // Reflect.defineProperty()

    // 1.用以前的方式进行操作
    // delete obj.name
    // if (obj.name) {
    //   console.log("name没有删除成功")
    // } else {
    //   console.log("name删除成功")
    // }

    // 2.Reflect
    if (Reflect.deleteProperty(obj, "name")) {
      console.log("name删除成功")
    } else {
      console.log("name没有删除成功")
    }

```



## 6 Reflect的receiver

### Reflext和Proxy共同完成代理

原因

+ 代理对象的目的就是 不再直接操作原对象
+ Reflect.set方法有返回Boolean值, 可以判断本次操作是否成功，而直接操作原对象，在非严格模式下会产生静默错误，严格模式下会报错

```js
    const obj = {
      name: "why",
      age: 18
    }

    const objProxy = new Proxy(obj, {
      set: function(target, key, newValue, receiver) {
        // target[key] = newValue
        // 1.好处一: 代理对象的目的: 不再直接操作原对象
        // 2.好处二: Reflect.set方法有返回Boolean值, 可以判断本次操作是否成功
        const isSuccess = Reflect.set(target, key, newValue)

        if (!isSuccess) {
          throw new Error(`set ${key} failure`)
        }
      },
      get: function(target, key, receiver) {

      }
    })

    // 操作代理对象
    objProxy.name = "kobe"
    console.log(obj)
```







Reflext设置receiver

+ setter和getter中的方法默认this是指向原对象也就是obj
+ 那么在set方法中所进行设置属性的操作是不能被监听到的
+ 若想监听可以传入参数receiver修改this指向

```js
    const obj = {
      _name: "why",
      set name(newValue) {
        console.log("this:", this) // 默认是obj,操作的是原对象，proxy是不能监听到
        this._name = newValue
      },
      get name() {
        return this._name
      }
    }


    // obj.name = "aaaa"

    // console.log(obj.name)
    // obj.name = "kobe"

    const objProxy = new Proxy(obj, {
      set: function(target, key, newValue, receiver) {
        // target[key] = newValue
        // 1.好处一: 代理对象的目的: 不再直接操作原对象
        // 2.好处二: Reflect.set方法有返回Boolean值, 可以判断本次操作是否成功
        /*
           3.好处三:
             > receiver就是外层Proxy对象
             > Reflect.set/get最后一个参数, 可以决定对象访问器setter/getter的this指向
        */
        console.log("proxy中设置方法被调用")
        const isSuccess = Reflect.set(target, key, newValue, receiver)

        if (!isSuccess) {
          throw new Error(`set ${key} failure`)
        }
      },
      get: function(target, key, receiver) {
        console.log("proxy中获取方法被调用")
        return Reflect.get(target, key, receiver)
      }
    })


    // 操作代理对象
    objProxy.name = "kobe"
    console.log(objProxy.name)
```





响应式原理中使用reflext的好处



### Reflect的construct

利用反射去执行person的构造函数，最终创建出来的对象类型是Student类型

相当于最终创建出来的隐式原型依然是Student的显示原型

```js
    function Person(name, age) {
      this.name = name
      this.age = age
    }

    function Student(name, age) {
      // Person.call(this, name, age) 借用构造函数
      const _this = Reflect.construct(Person, [name, age], Student)
      return _this
    }

    // const stu = new Student("why", 18)
    const stu = new Student("why", 18)
    console.log(stu)
    console.log(stu.__proto__ === Student.prototype)
```



# Promise使用详解

## 1 异步代码的困境 

### 异步任务的处理

在ES6出来之后，有很多关于Promise的讲解、文章，也有很多经典的书籍讲解Promise 

+ 虽然等你学会Promise之后，会觉得Promise不过如此； 
+ 但是在初次接触的时候都会觉得这个东西不好理解； 

那么这里我从一个实际的例子来作为切入点： 

+ 我们调用一个函数，这个函数中发送网络请求（我们可以用定时器来模拟）； 
+ 如果**发送网络请求成功**了，那么**告知调用者发送成功，并且将相关数据返回过去**； 
+ 如果**发送网络请求失败**了，那么**告知调用者发送失败，并且告知错误信息；**



有些操作是不会立马有结果的，我们需要传入一个回调函数，当操作完成之后执行回调函数将结果返回出去

当执行过程中出现错误时，执行错误的回调函数返回错误的结果

+ 对于设计者要求高
+ 对于使用者每个参数都需要知道传递什么样的值

```js
    // 1.设计这样的一个函数
    function execCode(counter, successCallback, failureCallback) {
      // 异步任务
      setTimeout(() => {
        if (counter > 0) { // counter可以计算的情况 
          let total = 0
          for (let i = 0; i < counter; i++) {
            total += i
          }
          // 在某一个时刻只需要回调传入的函数
          successCallback(total)
        } else { // 失败情况, counter有问题
          failureCallback(`${counter}值有问题`)
        }
      }, 3000)
    }

    // 2.ES5之前,处理异步的代码都是这样封装
    execCode(100, (value) => {
      console.log("本次执行成功了:", value)
    }, (err) => {
      console.log("本次执行失败了:", err)
    })
```



## 2 认识Promise作用 

### 什么是Promise？

 在上面的解决方案中，我们确确实实可以解决请求函数得到结果之后，获取到对应的回调，但是它存在两个主要的问题： 

+ 第一，我们**需要自己来设计回调函数、回调函数的名称、回调函数的使用等**； 
+ 第二，对于不同的人、不同的框架设计出来的方案是不同的，那么我们必须耐心去看别人的源码或者文档，以便可以理解它 这个函数到底怎么用； 

我们来看一下Promise的API是怎么样的： 

+ Promise是一个类，可以翻译成 承诺、许诺 、期约； 
+ 当我们需要的时候，给予调用者一个承诺：待会儿我会给你回调数据时，就可以创建一个Promise的对象； 
+ 在通过new创建Promise对象时，我们需要传入一个回调函数，我们称之为executor 
  + 这个**回调函数会被立即执行**，并且给**传入另外两个回调函数resolve、reject**； 
  + 当我们**调用resolve回调函数**时，会执行**Promise对象的then方法传入的回调函数**； 
  + 当我们**调用reject回调函数**时，会执行**Promise对象的catch方法传入的回调函数**；









## 3 Promise基本使用 

## 4 Promise状态变化 

我们来看一下Promise代码结构： 

上面Promise使用过程，我们可以将它划分成三个状态： 

+ 待定（pending）: 初始状态，既没有被兑现，也没有被拒绝； ✓ 当执行executor中的代码时，处于该状态； 
+ 已兑现（fulfilled）: 意味着操作成功完成； ✓ 执行了resolve时，处于该状态，Promise已经被兑现； 
+ 已拒绝（rejected）: 意味着操作失败； ✓ 执行了reject时，处于该状态，Promise已经被拒绝；

```js
    // 1.创建一个Promise对象
    const promise = new Promise((resolve, reject) => {
      // 注意: Promise的状态一旦被确定下来, 就不会再更改, 也不能再执行某一个回调函数来改变状态
      // 1.待定状态 pending
      console.log("111111")
      console.log("222222")
      console.log("333333")

      // 2.兑现状态 fulfilled
      resolve()

      // 3.拒绝状态 rejected
      reject()
    })

    promise.then(value => {
      console.log("成功的回调")
    }).catch(err => {
      console.log("失败的回调")
    })

    // executor
    const promise2 = new Promise((resolve, reject) => {

    })
```

### Executor

Executor是在创建Promise时需要传入的一个回调函数，这个回调函数会被立即执行，并且传入两个参数： 

通常我们会在Executor中确定我们的Promise状态：  通过resolve，可以兑现（fulfilled）Promise的状态，我们也可以称之为已决议（resolved）；  通过reject，可以拒绝（reject）Promise的状态； 

这里需要注意：一旦状态被确定下来，Promise的状态会被 锁死，该Promise的状态是不可更改的  在我们调用resolve的时候，如果resolve传入的值本身不是一个Promise，那么会将该Promise的状态变成 兑现（fulfilled）；  在之后我们去调用reject时，已经不会有任何的响应了（并不是这行代码不会执行，而是无法改变Promise状态）；



### resolve不同值的区别

情况一：如果resolve传入一个普通的值或者对象，那么这个值会作为then回调的参数； 

情况二：如果resolve中传入的是另外一个Promise，那么这个新Promise会决定原Promise的状态： 

情况三：如果resolve中传入的是一个对象，并且这个对象有实现then方法，那么会执行该then方法，并且根据then方法的结 果来决定Promise的状态：

```js
    const p = new Promise((resolve) => {
      // setTimeout(resolve, 2000)
      setTimeout(() => {
        resolve("p的resolve")
      }, 2000)
    })

    const promise = new Promise((resolve, reject) => {
      // 1.普通值
      // resolve([
      //   {name: "macbook", price: 9998, intro: "有点贵"},
      //   {name: "iPhone", price: 9.9, intro: "有点便宜"},
      // ])

      // 2.resolve(promise)
      // 如果resolve的值本身Promise对象, 那么当前的Promise的状态会有传入的Promise来决定
      // resolve(p)

      // 3.resolve(thenable对象)
      resolve({
        name: "kobe",
        then: function(resolve) {
          resolve(11111)
        }
      })
    })

    promise.then(res => {
      console.log("then中拿到结果:", res)
    })
```



## 6 Promise的类方法

then方法—接受参数

then方法是Promise对象上的一个方法（实例方法）： 

+ 它其实是放在**Promise的原型上的 Promise.prototype.then** 

then方法接受两个参数： 

+ fulfilled的回调函数：当状态变成fulfilled时会回调的函数； 
+ reject的回调函数：当状态变成reject时会回调的函数；

```js
    const promise = new Promise((resolve, reject) => {
      resolve("success")
      // reject("failure")
    })

    promise.then(res => {
    }).catch(err => {
    })

    // 1.then参数的传递方法: 可以传递两个参数
    // 这种写法也是可以的
    promise.then(res => {
      console.log("成功回调~", res)
    }, err => {
      console.log("失败回调~", err)
    })
```



then-多次调用

一个Promise的then方法是可以被多次调用的： 

+ 每次调用我们都可以传入对应的fulfilled回调； 
+ 当Promise的状态变成fulfilled的时候，这些回调函数都会被执行；

```js
    const promise = new Promise((resolve, reject) => {
      resolve("success")
      // reject("failure")
    })

    promise.then(res => {
      console.log("成功回调~", res)
    })
    promise.then(res => {
      console.log("成功回调~", res)
    })
    promise.then(res => {
      console.log("成功回调~", res)
    })
    promise.then(res => {
      console.log("成功回调~", res)
    })
```



### then方法—返回值

then方法本身是有返回值的，它的**返回值是一个Promise**，所以我们可以进行如下的**链式调用**： 

+ 但是then方法返回的Promise到底处于什么样的状态呢？ 

Promise有三种状态，那么这个Promise处于什么状态呢？ 

+ 当then方法中的回调函数本身在执行的时候，那么它处于pending状态； 
+ 当then方法中的回调函数返回一个结果时，那么它处于fulfilled状态，并且会将结果作为resolve的参数； 
  + 情况一：返回一个普通的值，那么它处于fulfille状态，并且会将结果作为resolve的参数； 
  + 情况二：返回一个Promise，由新的Promise的状态来决定；
  +  情况三：返回一个thenable值，会调用then方法决定状态； 
+ 当then方法抛出一个异常时，那么它处于reject状态；

```js
    const promise = new Promise((resolve, reject) => {
      resolve("aaaaaaa")
      // reject()
    })

    // 1.then方法是返回一个新的Promise, 这个新Promise的决议是等到then方法传入的回调函数有返回值时, 进行决议
    // Promise本身就是支持链式调用
    // then方法是返回一个新的Promise, 链式中的then是在等待这个新的Promise有决议之后执行的 resolve（result）
    promise.then(res => {
      console.log("第一个then方法:", res)
      return "bbbbbbbb"
    }).then(res => {
      console.log("第二个then方法:", res)
      return "cccccccc"
    }).then(res => {
      console.log("第三个then方法:", res)
    })

    promise.then(res => {
      console.log("添加第二个then方法:", res)
    })
```



+ 第二个promise中的then方法是返回一个新的promise，是由第一个then的返回值为一个promise执行完决议之后的执行结果

```js
      const promise = new Promise((resolve, reject) => {
        resolve("aaaaaaa");
        // reject()
      });

      // 2.then方法传入回调函数的返回值类型
      const newPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("why");
        }, 3000);
      });

      promise
        .then((res) => {
          console.log("第一个Promise的then方法:", res); // aaaaaaa
          return newPromise;
        })
        .then((res) => {
          console.log("第二个Promise的then方法:", res); // why等待几秒
        });
```





```js
      promise
        .then((res) => {
          console.log("第一个Promise的then方法:", res);
          // 1.普通值
          // return "bbbbbbb";
          // 2.新的Promise
          // return newPromise
          // 3.thenable的对象
          // return {
          //   then: function(resolve) {
          //     resolve("thenable")
          //   }
          // }
        })
        .then((res) => {
          console.log("第二个Promise的then方法:", res); // undefined
        });
```



catch方法也是Promise对象上的一个方法（实例方法）：  它也是放在Promise的原型上的 Promise.prototype.catch ◼ 一个Promise的catch方法是可以被多次调用的：  每次调用我们都可以传入对应的reject回调；  当Promise的状态变成reject的时候，这些回调函数都会被执行；



### catch方法—返回值

事实上catch方法也是会返回一个Promise对象的，所以catch方法后面我们可以继续调用then方法或者catch方法： 

+ 下面的代码，后续是catch中的err2打印，还是then中的res打印呢？ 
+ 答案是res打印，这是因为catch传入的回调在执行完后，默认状态依然会是fulfilled的； 

那么如果我们希望后续继续执行catch，那么需要抛出一个异常：

```js
    const promise = new Promise((resolve, reject) => {
      // reject("error: aaaaa")
      resolve("aaaaaa")
    })

    // 1.catch方法也会返回一个新的Promise
    // promise.catch(err => {
    //   console.log("catch回调:", err)
    //   return "bbbbb"
    // }).then(res => {
    //   console.log("then第一个回调:", res)
    //   return "ccccc"
    // }).then(res => {
    //   console.log("then第二个回调:", res)
    // })

    // 2.catch方法的执行时机
    promise.then(res => {
      console.log("then第一次回调:", res)
      // throw new Error("第二个Promise的异常error") 
      return "bbbbbb"
    }).then(res => {
      console.log("then第二次回调:", res)
      throw new Error("第三个Promise的异常error")
    }).then(res => {
      console.log("then第三次回调:", res)
    }).catch(err => {
      console.log("catch回调被执行:", err)
    })

    // 中断函数继续执行:
    // 方式一: return
    // 方式二: throw new Error()
    // 方式三: yield 暂停(暂时性的中断)
```



### finally方法

finally是在ES9（ES2018）中新增的一个特性：表示无论Promise对象无论变成fulfilled还是rejected状态，最终都会被执行 的代码。 

finally方法是不接收参数的，因为无论前面是fulfilled状态，还是rejected状态，它都会执行。

+ 如果有一段代码想在promise决议之后执行，由于事件队列的原因必然会在promise之前执行

```js
    const promise = new Promise((resolve, reject) => {
      // pending

      // fulfilled
      resolve("aaaa")

      // rejected
      // reject("bbbb")
    })

    promise.then(res => {
      console.log("then:", res)
      // foo()
    }).catch(err => {
      console.log("catch:", err)
      // foo()
    }).finally(() => {
      console.log("哈哈哈哈")
      console.log("呵呵呵呵")
    })


    function foo() {
      console.log("哈哈哈哈")
      console.log("呵呵呵呵")
    }
```





### resolve方法

前面我们学习的then、catch、finally方法都属于**Promise的实例方法**，都是存放在**Promise的prototype**上的。 

+ 下面我们再来学习一下Promise的类方法。 

有时候我们已经有一个**现成的内容**了，希望将其转成Promise来使用，这个时候我们可以**使用 Promise.resolve 方法**来完成。 

+ Promise.resolve的用法相当于**new Promise**，并且执行resolve操作： 

resolve参数的形态： 

+ 情况一：参数是一个普通的值或者对象 
+ 情况二：参数本身是Promise 
+ 情况三：参数是一个thenable

```js
    // 实例方法
    // const promise = new Promise((resolve) => {
    //   // 进行一系列的操作
    //   resolve("result")
    // })
    // promise.catch

    // 类方法
    const studentList = []
    const promise = Promise.resolve(studentList)

    promise.then(res => {
      console.log("then结果:", res)
    })
    // 相当于
    // new Promise((resolve) => {
    //   resolve("Hello World")
    // })
```



### reject方法

reject方法类似于resolve方法，只是会将Promise对象的状态设置为reject状态。 

Promise.reject的用法相当于new Promise，只是会调用reject： 

Promise.reject传入的参数无论是什么形态，都会直接作为reject状态的参数传递到catch的

```js
    // 类方法
    const promise = Promise.reject("rejected error")
    promise.catch(err => {
      console.log("err:", err)
    })
    // 相当于
    // new Promise((_, reject) => {
    //   reject("rejected error")
    // })

```



### all方法

另外一个类方法是Promise.all： 

它的作用是**将多个Promise包裹在一起**形成一个新的Promise； 

新的Promise状态由包裹的所有Promise共同决定： 

+ 当**所有的Promise状态变成fulfilled状态时**，新的Promise状态为fulfilled，并且会**将所有Promise的返回值组成一个数组**； 
+ 当**有一个Promise状态为reject时**，新的Promise状态为reject，并且会**将第一个reject的返回值作为参数**；

```js
    // 创建三个Promise
    const p1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        // resolve("p1 resolve")
        reject("p1 reject error")
      }, 3000)
    })

    const p2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("p2 resolve")
      }, 2000)
    })
    
    const p3 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("p3 resolve")
      }, 5000)
    })

    // all:全部/所有
    Promise.all([p1, p2, p3]).then(res => {
      console.log("all promise res:", res)
    }).catch(err => {
      console.log("all promise err:", err)
    })
```



### allSettled方法

all方法有一个缺陷：当有其中一个Promise变成reject状态时，**新Promise就会立即变成对应的reject状态**。 

+ 那么对于resolved的，以及依然处于pending状态的Promise，我们是获取不到对应的结果的； 

在ES11（ES2020）中，添加了新的API **Promise.allSettled**： 

+ 该方法会在所有的Promise都有结果（settled），无论是fulfilled，还是rejected时，才会有最终的状态；
+ 并且这个Promise的结果一定是fulfilled的；

我们来看一下打印的结果： 

+ allSettled的结果是一个数组，**数组中存放着每一个Promise的结果，并且是对应一个对象的**；
+ 这个对象中包含**status状态**，以及对应的**value值**；

```js
    // 创建三个Promise
    const p1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        // resolve("p1 resolve")
        reject("p1 reject error")
      }, 3000)
    })

    const p2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("p2 resolve")
      }, 2000)
    })
    
    const p3 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("p3 resolve")
      }, 5000)
    })

    // 类方法: allSettled
    Promise.allSettled([p1, p2, p3]).then(res => {
      console.log("all settled:", res)
    })
```



### race方法

如果有一个Promise有了结果，我们就希望决定最终新Promise的状态，那么可以使用race方法： 

+ race是竞技、竞赛的意思，表示**多个Promise相互竞争**，**谁先有结果，那么就使用谁的结果**；

```js
    // 创建三个Promise
    const p1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("p1 resolve")
        // reject("p1 reject error")
      }, 3000)
    })

    const p2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        // resolve("p2 resolve")
        reject("p2 reject error")
      }, 2000)
    })
    
    const p3 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("p3 resolve")
      }, 5000)
    })


    // 类方法: race方法
    // 特点: 会等到一个Promise有结果(无论这个结果是fulfilled还是rejected)
    Promise.race([p1, p2, p3]).then(res => {
      console.log("race promise:", res)
    }).catch(err => {
      console.log("race promise err:", err)
    })
```



### any方法

any方法是ES12中新增的方法，和race方法是类似的： 

+ any方法会等到一个**fulfilled状态**，才会**决定新Promise的状态**； 
+ 如果**所有的Promise都是reject**的，那么也**会等到所有的Promise都变成rejected状态**； 

如果**所有的Promise都是reject的，那么会报一个AggregateError**的错误

```js
    // 创建三个Promise
    const p1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        // resolve("p1 resolve")
        reject("p1 reject error")
      }, 3000)
    })

    const p2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        // resolve("p2 resolve")
        reject("p2 reject error")
      }, 2000)
    })
    
    const p3 = new Promise((resolve, reject) => {
      setTimeout(() => {
        // resolve("p3 resolve")
        reject("p3 reject error")
      }, 5000)
    })

    // 类方法: any方法
    Promise.any([p1, p2, p3]).then(res => {
      console.log("any promise res:", res)
    }).catch(err => {
      console.log("any promise err:", err)
    })
```





# Iterator-Generator详解

生成器是一种特殊的迭代器

## 1 迭代器可迭代对象

### 什么是迭代器？

迭代器（iterator），使用户在容器对象（container，例如链表或数组）上遍访的对象，使用该接口无需关心对象的内部实现细节。 

+ 其行为像数据库中的光标，迭代器最早出现在1974年设计的CLU编程语言中； 
+ 在各种编程语言的实现中，迭代器的实现方式各不相同，但是基本都有迭代器，比如Java、Python等； 

从迭代器的定义我们可以看出来，**迭代器是帮助我们对某个数据结构进行遍历的对象**。 

在JavaScript中，迭代器也是一个具体的对象，这个对象需要**符合迭代器协议**（iterator protocol）： 

+ 迭代器协议定义了**产生一系列值（无论是有限还是无限个）的标准方式**； 
+ 在JavaScript中这个标准就是一个**特定的next方法**； 

next方法有如下的要求： 

+ 一个无参数或者一个参数的函数，返回一个应当拥有以下两个属性的对象： 
+ done（boolean） 
  + 如果迭代器可以产生序列中的下一个值，则为 false。（这等价于没有指定 done 这个属性。） 
  + 如果迭代器已将序列迭代完毕，则为 true。这种情况下，value 是可选的，如果它依然存在，即为**迭代结束之后的默认返回值**。 
+ value 
  + 迭代器返回的任何 JavaScript 值。**done 为 true 时可省略**。

```js
      const names = ["abc", "cba", "nba"];

      let index = 0;
      const namesIterator = {
        next: function () {
          if (index < names.length) {
            return { done: false, value: names[index++] };
          } else {
            return { done: true };
          }
        },
      };
      console.log(namesIterator.next());
      console.log(namesIterator.next());
      console.log(namesIterator.next());
      console.log(namesIterator.next());
```



+ 为数组创建迭代器，封装一个函数

```js
      const names = ["abc", "cba", "nba"];

      function createArrayInterator(arr) {
        let index = 0;
        return {
          next: function () {
            if (index < arr.length) {
              return { done: false, value: arr[index++] };
            } else {
              return { done: true };
            }
          },
        };
      }

      const namesIterator = createArrayInterator(names);
      console.log(namesIterator.next());
```



### 可迭代对象

但是上面的代码整体来说看起来是有点奇怪的： 

+ 我们获取一个数组的时候，需要自己创建一个index变量，再创建一个所谓的迭代器对象； 
+ 事实上我们可以对上面的代码进行进一步的封装，让其变成一个可迭代对象； 

什么又是可迭代对象呢？ 

+ 它和迭代器是不同的概念； 
+ 当一个对象**实现了iterable protocol协议**时，它就是**一个可迭代对象**； 
+ 这个对象的要求是必须**实现 @@iterator 方法**，在代码中我们**使用 Symbol.iterator 访问该属性**； 

当然我们要问一个问题，我们转成这样的一个东西有什么好处呢？ 

+ 当**一个对象变成一个可迭代对象**的时候，就可以**进行某些迭代操作**； 
+ 比如 **for...of 操作**时，其实就会调用它的 @@iterator 方法；

```js
    // 将infos变成一个可迭代对象
    /*
      1.必须实现一个特定的函数: [Symbol.iterator]
      2.这个函数需要返回一个迭代器(这个迭代器用于迭代当前的对象)
    */
    const infos = {
      friends: ["kobe", "james", "curry"],
      [Symbol.iterator]: function() {
        let index = 0
        const infosIterator = {
          next: function() {
            // done: Boolean
            // value: 具体值/undefined
            if (index < infos.friends.length) {
              return { done: false, value: infos.friends[index++] }
            } else {
              return { done: true }
            }
          }
        }
        return infosIterator
      }
    }

    // 可迭对象可以进行for of操作
    for (const item of infos) {
      console.log(item)
    }
    // 可迭代对象必然有一个[Symbol.iterator]函数
    // 数组是一个可迭代对象
    const students = ["张三", "李四", "王五"]
    console.log(students[Symbol.iterator])
	// 调用这个函数会返回一个迭代器
    const studentIterator = students[Symbol.iterator]()
    console.log(studentIterator.next())
    console.log(studentIterator.next())
    console.log(studentIterator.next())
    console.log(studentIterator.next())
```

+ **`Symbol.iterator`** 为每一个对象定义了默认的迭代器



+ 迭代对象中的属性值

```js
    // 2.迭代infos中的key/value
    const infos = {
      name: "why",
      age: 18,
      height: 1.88,

      [Symbol.iterator]: function() {
        // const keys = Object.keys(this)
        // const values = Object.values(this)
        const entries = Object.entries(this)
        let index = 0
        const iterator = {
          next: function() {
            if (index < entries.length) {
              return { done: false, value: entries[index++] }
            } else {
              return { done: true }
            }
          }
        }
        return iterator
      }
    }


    // 可迭对象可以进行for of操作
    for (const item of infos) {
      const [key, value] = item
      console.log(key, value)
    }
```



2 原生的迭代器对象

事实上我们平时创建的很多原生对象已经实现了可迭代协议，会生成一个迭代器对象的：  String、Array、Map、Set、arguments对象、NodeList集合；



那么这些东西可以被用在哪里呢？ 

+ JavaScript中语法：**for ...of、展开语法（spread syntax）、yield*（后面讲）、解构赋值（Destructuring_assignment）**； 
+ 创建一些对象时：**new Map([Iterable])、new WeakMap([iterable])、new Set([iterable])、new WeakSet([iterable]);** 
+ 一些方法的调用：**Promise.all(iterable)、Promise.race(iterable)、Array.from(iterable);**

3 自定义类的迭代器

在前面我们看到Array、Set、String、Map等类创建出来的对象都是可迭代对象： 

+ 在面向对象开发中，我们可以通过class定义一个自己的类，这个类可以创建很多的对象： 
+ 如果我们也希望自己的类创建出来的对象默认是可迭代的，那么在设计类的时候我们就可以添加上 @@iterator 方法； 

案例：创建一个classroom的类 

+ 教室中有自己的位置、名称、当前教室的学生； 
+ 这个教室可以进来新学生（push）； 
+ 创建的教室对象是可迭代对象；

```js
    // 1.用在特定的语法上
    const names = ["abc", "cba", "nba"]
    const info = {
      name: "why",
      age: 18,
      height: 1.88,
      [Symbol.iterator]: function() {
        const values = Object.values(this)
        let index = 0
        const iterator = {
          next: function() {
            if (index < values.length) {
              return { done: false, value: values[index++] }
            } else {
              return { done: true }
            }
          }
        }
        return iterator
      }
    }

    function foo(arg1, arg2, arg3) {
      console.log(arg1, arg2, arg3)
    }

    foo(...info)

    // 2.一些类的构造方法中, 也是传入的可迭代对象
    const set = new Set(["aaa", "bbb", "ccc"])
    const set2 = new Set("abc")
    console.log(set2)
    const set3 = new Set(info)
    console.log(set3)


    // 3.一些常用的方法
    const p1 = Promise.resolve("aaaa")
    const p2 = Promise.resolve("aaaa")
    const p3 = Promise.resolve("aaaa")
    const pSet = new Set()
    pSet.add(p1)
    pSet.add(p2)
    pSet.add(p3)
    Promise.all(pSet).then(res => {
      console.log("res:", res)
    })

    function bar() {
      // console.log(arguments)
      // 将arguments转成Array类型
      const arr = Array.from(arguments)
      console.log(arr)
    }

    bar(111, 222, 333)
```



+ 通过自定义类创建出来的对象都是可迭代的

## 4 生成器理解和作用

### 什么是生成器？

生成器是ES6中新增的一种函数控制、使用的方案，它可以让我们更加灵活的**控制函数什么时候继续执行、暂停执行**等。 

+ 平时我们会编写很多的函数，这些函数终止的条件通常是返回值或者发生了异常。 

生成器函数也是一个函数，但是和普通的函数有一些区别： 

+ 首先，**生成器函数需要在function的后面加一个符号：*** 
+ 其次，生**成器函数可以通过yield关键字来控制函数的执行流程**： 
+ 最后，**生成器函数的返回值是一个Generator（生成器）**： 
  + **生成器事实上是一种特殊的迭代器**； 
  + MDN：Instead, they return a special type of iterator, called a Generator

```js
    /*
      生成器函数: 
        1.function后面会跟上符号: *
        2.代码的执行可以被yield控制
        3.生成器函数默认在执行时, 返回一个生成器对象
          * 要想执行函数内部的代码, 需要生成器对象, 调用它的next操作
          * 当遇到yield时, 就会中断执行
    */

    // 1.定义了一个生成器函数
    function* foo() {
      console.log("1111")
      console.log("2222")
      yield
      console.log("3333")
      console.log("4444")
      yield
      console.log("5555")
      console.log("6666")
    }

    // 2.调用生成器函数, 返回一个 生成器对象
    const generator = foo()
    // 调用next方法
    generator.next()
    generator.next()
    generator.next()
```

![image-20240228125615056]()

![image-20240228141446135](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20240228141446135.png)

### 生成器函数执行

我们发现下面的生成器函数foo的执行体压根没有执行，它只是返回了一个生成器对象。 

+ 那么我们**如何可以让它执行函数中的东西**呢？**调用next即可**； 
+ 我们之前学习迭代器时，知道**迭代器的next是会有返回值**的； 
+ 但是我们很多时候**不希望next返回的是一个undefined**，这个时候我们**可以通过yield来返回结果**；



### 生成器传递参数 – next函数

函数既然可以暂停来分段执行，那么函数应该是可以**传递参数**的，我们是否可以给每个分段来传递参数呢？ 

+ 答案是可以的； 
+ 我们在**调用next函数的时候，可以给它传递参数，那么这个参数会作为上一个yield语句的返回值**； 
+ 注意：也就是说**我们是为本次的函数代码块执行提供了一个值**；

```js
      // 1.定义了一个生成器函数
      function* foo(name1) {
        console.log("执行内部代码:1111", name1);
        console.log("执行内部代码:2222", name1);
        const name2 = yield "aaaa";
        console.log("执行内部代码:3333", name2);
        console.log("执行内部代码:4444", name2);
        const name3 = yield "bbbb";
        // return "bbbb"
        console.log("执行内部代码:5555", name3);
        console.log("执行内部代码:6666", name3);
        yield "cccc";
        return undefined;
      }

      // 2.调用生成器函数, 返回一个 生成器对象
      const generator = foo("next1");
      // 调用next方法
      console.log(generator.next()); // { done: false, value: "aaaa" }
      console.log(generator.next()) // { done: false, value: "bbbb" }
      console.log(generator.next()) //  { done: false, value: "cccc" }
      console.log(generator.next()) // {done: true, value: undefined}

      // 3.在中间位置直接return, 结果
      console.log(generator.next()) // { done: false, value: "aaaa" }
      console.log(generator.next()) // { done: true, value: "bbbb" }
      console.log(generator.next()) // { done: true, value: undefined }
      console.log(generator.next()) // { done: true, value: undefined }
      console.log(generator.next()) // { done: true, value: undefined }
      console.log(generator.next()) // { done: true, value: undefined }

      // 4.给函数每次执行的时候, 传入参数
      console.log(generator.next());
      console.log(generator.next("next2"));
      console.log(generator.next("next3"));
      console.log(generator.next())
```

![image-20240228141924661](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20240228141924661.png)



![image-20240228142221440](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20240228142221440.png)

### 生成器提前结束 – return函数

还有一个可以给生成器函数传递参数的方法是通过return函数： 

+ return传值后这个**生成器函数就会结束，之后调用next不会继续生成值了**；





### 生成器抛出异常 – throw函数

 除了给生成器函数内部传递参数之外，也可以给**生成器函数内部抛出异常**： 

+ **抛出异常后我们可以在生成器函数中捕获异常**； 

+ 但是在**catch语句中不能继续yield新的值了，但是可以在catch语句外使用yield继续中断函数的执行**；

```js
      function* foo(name1) {
        console.log("执行内部代码:1111", name1);
        console.log("执行内部代码:2222", name1);
        const name2 = yield "aaaa";
        console.log("执行内部代码:3333", name2);
        console.log("执行内部代码:4444", name2);
        const name3 = yield "bbbb";
        // return "bbbb"
        console.log("执行内部代码:5555", name3);
        console.log("执行内部代码:6666", name3);
        yield "cccc";

        console.log("最后一次执行");
        return undefined;
      }

      const generator = foo("next1");

      // 1.generator.return提前结束函数
      console.log(generator.next());
      console.log(generator.return("next2"));
      console.log("-------------------");
      console.log(generator.next("next3"));
      console.log(generator.next("next4"));

      // 2.generator.throw向函数抛出一个异常
      console.log(generator.next())
      console.log(generator.throw(new Error("next2 throw error")))
      console.log("-------------------")
      console.log(generator.next("next3"))
      console.log(generator.next("next4"))
```



![image-20240228130855711](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20240228130855711.png)



### 生成器替代迭代器

```js
    // 1.对之前的代码进行重构(用生成器函数)
    const names = ["abc", "cba", "nba"]
    const nums = [100, 22, 66, 88, 55]

    function* createArrayIterator(arr) {
      for (let i = 0; i < arr.length; i++) {
        yield arr[i]
      }
      // yield arr[0]
      // yield arr[1]
      // yield arr[2]
      // return undefined
    }

    // const namesIterator = createArrayIterator(names)
    // console.log(namesIterator.next())
    // console.log(namesIterator.next())
    // console.log(namesIterator.next())
    // console.log(namesIterator.next())

    // const numsIterator = createArrayIterator(nums)
    // console.log(numsIterator.next())
    // console.log(numsIterator.next())
    // console.log(numsIterator.next())
    // console.log(numsIterator.next())
    // console.log(numsIterator.next())
    // console.log(numsIterator.next())
```





```js
    // 2.生成器函数, 可以生成某个范围的值
    // [3, 9)
    function* createRangeGenerator(start, end) {
      for (let i = start; i < end; i++) {
        yield i
      }
    }

    const rangeGen = createRangeGenerator(3, 9)
    console.log(rangeGen.next())
    console.log(rangeGen.next())
    console.log(rangeGen.next())
    console.log(rangeGen.next())
    console.log(rangeGen.next())
    console.log(rangeGen.next())
    console.log(rangeGen.next())
    console.log(rangeGen.next())
```

### 生成器yield语法糖

yield*拿到可迭代对象，并且依次开始迭代

事实上我们还可以使用yield*来生产一个可迭代对象： 

+ 这个时候相当于是一种yield的语法糖，只不过会依次迭代这个可迭代对象，每次迭代其中的一个值；

```js
      const names = ["abc", "cba", "nba"]
      const nums = [100, 22, 66, 88, 55]

      function* createArrayIterator(arr) {
        yield* arr
      }
```



## 5 自定义生成器方案

```js
// 2.yield替换类中的实现
    class Person {
      constructor(name, age, height, friends) {
        this.name = name
        this.age = age
        this.height = height
        this.friends = friends
      }

      // 实例方法
      *[Symbol.iterator]() {
        yield* this.friends
        // yield* Object.keys(this);
      }
    }

    const p = new Person("why", 18, 1.88, ["kobe", "james", "curry"])
    for (const item of p) {
      console.log(item)
    }

    const pIterator = p[Symbol.iterator]()
    console.log(pIterator.next())
    console.log(pIterator.next())
    console.log(pIterator.next())
    console.log(pIterator.next())
```



## 6 异步处理方案解析

```js
    /*
      需求: 
        1.发送一次网络请求, 等到这次网络请求的结果
        2.发送第二次网络请求, 等待这次网络请求的结果
        3.发送第三次网络请求, 等待这次网络请求的结果
    */
    // 方式一: 层层嵌套(回调地狱 callback hell)
    function getData() {
      // 1.第一次请求
      requestData("why").then(res1 => {
        console.log("第一次结果:", res1)

        // 2.第二次请求
        requestData(res1 + "kobe").then(res2 => {
          console.log("第二次结果:", res2)

          // 3.第三次请求
          requestData(res2 + "james").then(res3 => {
            console.log("第三次结果:", res3)
          })
        })
      })
    }

    // 方式二: 使用Promise进行重构(解决回调地狱)
    // 链式调用
    function getData() {
      requestData("why").then(res1 => {
        console.log("第一次结果:", res1)
        return requestData(res1 + "kobe")
      }).then(res2 => {
        console.log("第二次结果:", res2)
        return requestData(res2 + "james")
      }).then(res3 => {
        console.log("第三次结果:", res3)
      })
    }

    // 方式三: 最终代码
    function* getData() {
      const res1 = yield requestData("why")
      console.log("res1:", res1)

      const res2 = yield requestData(res1 + "kobe")
      console.log("res2:", res2)

      const res3 = yield requestData(res2 + "james")
      console.log("res3:", res3)
    }

    const generator = getData()
    generator.next().value.then(res1 => {
      generator.next(res1).value.then(res2 => {
        generator.next(res2).value.then(res3 => {
          generator.next(res3)
        })
      })
    })
```



![image-20240228142720212](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20240228142720212.png)



```js
    // 自动化执行生成器函数(了解)
    function execGenFn(genFn) {
      // 1.获取对应函数的generator
      const generator = genFn()
      // 2.定义一个递归函数
      function exec(res) {
        // result -> { done: true/false, value: 值/undefined }
        const result = generator.next(res)
        if (result.done) return
        result.value.then(res => {
          exec(res)
        })
      }
      // 3.执行递归函数
      exec()
    }

    execGenFn(getData)
```

