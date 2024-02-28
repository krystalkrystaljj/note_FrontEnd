# await、async、事件循环

## 1 async、await 

### 异步函数 async function

async关键字用于声明一个异步函数： 

+ async是asynchronous单词的缩写，异步、非同步；  sync是synchronous单词的缩写，同步、同时； 

async异步函数可以有很多中写法：

```js
    // 异步函数
    async function foo() {
      console.log("foo function1")
      console.log("foo function2")
      console.log("foo function3")
    }
    foo()

    const bar = async function() {}
    const baz = async () => {}
    class Person {
      async running() {}
    }
```



### 异步函数的执行流程

异步函数的内部代码执行过程和普通的函数是一致的，默认情况下也是会被同步执行。 

异步函数有返回值时，和普通函数会有区别： 

+ 情况一：异步函数也可以有**返回值**，但是异步函数的返回值**相当于被包裹到Promise.resolve中**； 
+ 情况二：如果我们的**异步函数的返回值是Promise**，状态由会由Promise决定； 
+ 情况三：如果我们的异步函数的返回值是一个对象并且实现了thenable，那么会由对象的then方法来决定； 

如果我们在async中抛出了异常，那么程序它并不会像普通函数一样报错，而是**会作为Promise的reject来传递**；



+ 返回值

```js
    // 2.异步函数
    async function foo2() {
      // 1.返回一个普通的值
      // -> Promise.resolve(321)
      return ["abc", "cba", "nba"]

      // 2.返回一个Promise
      // return new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     resolve("aaa")
      //   }, 3000)
      // })

      // 3.返回一个thenable对象
      // return {
      //   then: function(resolve, reject) {
      //     resolve("bbb")
      //   }
      // }
    }

    foo2().then(res => {
      console.log("res:", res)
    })
```



+ 抛出异常

 ```js
     // "abc".filter()
 
     // 什么情况下异步函数的结果是rejected
 
     // 如果异步函数中有抛出异常(产生了错误), 这个异常不会被立即浏览器处理
     // 进行如下处理: Promise.reject(error)
     async function foo() {
       console.log("---------1")
       console.log("---------2")
       // "abc".filter()
       throw new Error("coderwhy async function error")
       console.log("---------3")
 
       // return new Promise((resolve, reject) => {
       //   reject("err rejected")
       // })
 
       return 123
     }
 
     // promise -> pending -> fulfilled/rejected
     foo().then(res => {
       console.log("res:", res)
     }).catch(err => {
       console.log("coderwhy err:", err)
       console.log("继续执行其他的逻辑代码")
     })
 ```



### await关键字

async函数另外一个特殊之处就是可以在它内部使用await关键字，而普通函数中是不可以的。 

await关键字有什么特点呢？ 

+ 通常使用**await是后面会跟上一个表达式**，这个**表达式会返回一个Promise**； 
+ 那么await会等到**Promise的状态变成fulfilled状态**，之后继续执行异步函数； 

如果await后面是一个普通的值，那么会直接返回这个值； 

如果await后面是一个thenable的对象，那么会根据对象的then方法调用来决定后续的值； 

如果await后面的表达式，返回**的Promise是reject的状态**，那么会将这个reject结果直接作为函数的Promise的reject值；

```js
    // 2.await关键字
    // await条件: 必须在异步函数中使用
    function bar() {
      console.log("bar function")
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(123)
        }, 100000)
      })
    }

    async function foo() {
      console.log("-------")
      // await后续返回一个Promise, 那么会等待Promise有结果之后, 才会继续执行后续的代码
      const res1 = await bar()
      console.log("await后面的代码:", res1)
      const res2 = await bar()
      console.log("await后面的代码:", res2)

      console.log("+++++++")
    }

    foo()
```

![image-20240228153908778](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20240228153908778.png)



+ await不仅可以跟上普通函数返回一个promise，也可以跟上异步函数本身就会返回一个promise

```js
    // 1.定义一些其他的异步函数
    function requestData(url) {
      console.log("request data")
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(url)
        }, 3000)
      })
    }

    async function test() {
      console.log("test function")
      return "test"
    }

    async function bar() {
      console.log("bar function")

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("bar")
        }, 2000);
      })
    }

    async function demo() {
      console.log("demo function")
      return {
        then: function(resolve) {
          resolve("demo")
        }
      }
    }


    // 2.调用的入口async函数
    async function foo() {
      console.log("foo function")

      const res1 = await requestData("why")
      console.log("res1:", res1)

      const res2 = await test()
      console.log("res2:", res2)

      const res3 = await bar()
      console.log("res3:", res3)

      const res4 = await demo()
      console.log("res4:", res4)
    }

    foo()
```



## 2 浏览器进程、线程

线程和进程是操作系统中的两个概念： 

+ 进程（process）：计算机已经运行的程序，是操作系统管理程序的一种方式； 
+ 线程（thread）：操作系统能够运行运算调度的最小单位，通常情况下它被包含在进程中； 

听起来很抽象，这里还是给出我的解释： 

+ 进程：我们可以认为，启动一个应用程序，就会默认启动一个进程（也可能是多个进程）； 
+ 线程：每一个进程中，都会启动至少一个线程用来执行程序中的代码，这个线程被称之为主线程； 
+ 所以我们也可以说进程是线程的容器； 

再用一个形象的例子解释： 

+ 操作系统类似于一个大工厂； 
+ 工厂中里有很多车间，这个车间就是进程； 
+ 每个车间可能有一个以上的工人在工厂，这个工人就是线程；



### 操作系统的工作方式

操作系统是如何做到同时让多个进程（边听歌、边写代码、边查阅资料）同时工作呢？ 

+ 这是因为CPU的运算速度非常快，它可以快速的在多个进程之间迅速的切换； 
+ 当我们**进程中的线程获取到时间片时，就可以快速执行我们编写的代码**； 
+ 对于用户来说是感受不到这种快速的切换的； 

你可以在Mac的活动监视器或者**Windows的资源管理器中查看到很多进程**：



### 浏览器中的JavaScript线程

我们经常会说JavaScript是**浏览器中的JavaScript线程**的，但是JavaScript的线程应该有自己的**容器进程**：**浏览器或者Node**。 

浏览器是一个进程吗，它里面只有一个线程吗？ 

+ 目前多数的浏览器其实都是多进程的，当我们打开一个tab页面时就会开启一个新的进程，这是为了防止一个页面卡死而造成 所有页面无法响应，整个浏览器需要强制退出； 
+ 每个进程中又有很多的线程，其中包括执行JavaScript代码的线程； 

JavaScript的代码执行是在一个单独的线程中执行的： 

+ 这就意味着JavaScript的代码，在同一个时刻只能做一件事； 

+ **如果这件事是非常耗时的，就意味着当前的线程就会被阻塞**； 

所以真正耗时的操作，实际上并不是由JavaScript线程在执行的： 

+ 浏览器的每个进程是多线程的，那么其他线程可以来完成这个耗时的操作； 
+ 比如网络请求、定时器，我们只需要在特性的时候执行应该有的回调即可；



为什么要设计成多线程

数据安全的考虑 上锁 解锁



## 3 宏任务、微任务队列

### 浏览器的事件循环

如果在执行JavaScript代码的过程中，有异步操作呢？  中间我们插入了一个setTimeout的函数调用；  这个函数被放到入调用栈中，执行会立即结束，并不会阻塞后续代码的执行；

![image-20240228161524764](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20240228161524764.png)



### 宏任务和微任务

但是事件循环中并非只维护着一个队列，事实上是有两个队列： 

+ **宏任务队列（macrotask queue）**：ajax、setTimeout、setInterval、DOM监听、UI Rendering等 
+ **微任务队列（microtask queue）**：Promise的then回调、 Mutation Observer API、queueMicrotask()等 

那么事件循环对于两个队列的优先级是怎么样的呢？ 

1. main script中的代码优先执行（编写的顶层script代码）； 

2. 在执行任何一个宏任务之前（不是队列，是一个宏任务），都会先查看微任务队列中是否有任务需要执行 
   + 也就是宏任务执行之前，必须保证微任务队列是空的； 
   + 如果不为空，那么就优先执行微任务队列中的任务（回调）；

4 Promise面试题解析

+ 同步任务执行完成之后再执行任务队列中的队伍，在执行任何宏任务之前必须先将微任务队列中的任务清空
+ 不要无限的向微任务中加微任务，宏任务会无线延长

![image-20240228170638218](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20240228170638218.png)

+ 答案：script start   promise1 2  script end      then1 queueMicrotask1 then3      setTimeout1  then2 then4       setTimeout2

![image-20240228231902805](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20240228231902805.png)

```js
    console.log("script start")

    function requestData(url) {
   
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("setTimeout")
          resolve(url)
        }, 2000);
      })
    }


    function getData() {
      console.log("getData start")
      requestData("why").then(res => {
        console.log("then1-res:",res);
      })
      console.log("getData end")
    }

    getData()
    
    console.log("script end")
```



#### await和async

+ 异步函数默认情况下是与普通函数执行一样的
+ await后面的代码不执行，一定会等到promise有结果后再执行，await后面的代码相当于加入到一个微任务后的代码

![image-20240228232915363](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20240228232915363.png)

![image-20240228171726040](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20240228171726040.png)

+ 答案：script start   getData start   requestData  script end       setTimeout        then1-res: why   getData end



![image-20240228171747783](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20240228171747783.png)

+ 答案：script start    async1 start  async2   promise1  script end  async1 end  promise2   setTimeout

start getData start    getData end sctipt end    then1-res res  setTimeout

![image-20240228233238911](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20240228233238911.png)

```js
    async function async1 () {
      console.log('async1 start')
      await async2();
      console.log('async1 end')
    }

    async function async2 () {
      console.log('async2')
    }

    console.log('script start')

    setTimeout(function () {
      console.log('setTimeout')
    }, 0)
    
    async1();
    
    new Promise (function (resolve) {
      console.log('promise1')
      resolve();
    }).then (function () {
      console.log('promise2')
    })

    console.log('script end')
```

![image-20240228233824333](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20240228233824333.png)

这个回调函数连队列都没有加进去

Node事件循环



## 5 throw、try、catch

### 错误处理方案

开发中我们会封装一些工具函数，封装之后给别人使用： 

+ 在其他人使用的过程中，可能会传递一些参数； 
+ 对于函数来说，需要**对这些参数进行验证**，否则可能得到的是我们不想要的结果； 

很多时候我们可能验证到不是希望得到的参数时，就会直接return： 

+ 但是return存在很大的弊端：**调用者不知道是因为函数内部没有正常执行**，还是**执行结果就是一个undefined**； 
+ 事实上，正确的做法应该是如果没有通过某些验证，那么应该让外界知道函数内部报错了； 

如何可以让一个函数告知外界自己内部出现了错误呢？ 

+ 通过throw关键字，抛出一个异常； 

throw语句： 

+ **throw语句用于抛出一个用户自定义的异常；** 
+ 当**遇到throw语句**时，当**前的函数执行会被停止**（throw后面的语句不会执行）； 

如果我们执行代码，就会报错，拿到错误信息的时候我们可以及时的去修正代码。

> 函数遇到throw之后就会停止运行,有中止代码的作用
>
> 可以通过throw抛出具体的错误信息

### throw关键字

hrow表达式就是在throw后面可以跟上一个表达式来表示具体的异常信息： 

throw关键字可以跟上哪些类型呢？ 

+ **基本数据类型**：比如number、string、Boolean 
+ **对象类型**：对象类型可以包含更多的信息 

但是每次写这么长的对象又有点麻烦，所以我们可以创建一个类：



### Error类型

事实上，JavaScript已经给我们提供了一个Error类，我们可以直接创建这个类的对象： 

Error包含三个属性： 

+ **messsage**：创建Error对象时传入的message； 
+ name：Error的名称，通常和类的名称一致； 
+ **stack**：整个Error的错误信息，包括函数的调用栈，当我们直接打印Error对象时，打印的就是stack； 

Error有一些自己的子类： 

+ RangeError：下标值越界时使用的错误类型； 
+ SyntaxError：解析语法错误时使用的错误类型； 
+ TypeError：出现类型错误时，使用的错误类型；

```js
    function foo() {
      console.log("foo function1")
      // 1.number/string/boolean
      // throw "反正就是一个错误"

      // 2.抛出一个对象
      // throw { errMessage: "我是错误信息", errCode: -1001 }
      // throw new HYError("错误信息", -1001)

      // 3.Error类: 错误函数的调用栈以及位置信息
      throw new Error("我是错误信息")

      console.log("foo function2")
      console.log("foo function3")
      console.log("foo function4")
    }
```



异常的处理

我们会发现在之前的代码中，一个函数抛出了异常，调用它的时候程序会被强制终止： 

+ 这是因为如果我们在调用一个函数时，这个**函数抛出了异常**，但是我们并**没有对这个异常进行处理**，那么**这个异常会继续传 递到上一个函数调用中**； 
+ 而如果到了**最顶层（全局）的代码中依然没有对这个异常的处理代码**，这个时候就会报错并且终止程序的运行； 

我们先来看一下这段代码的异常传递过程： 

+ foo函数在被执行时会抛出异常，也就是我们的bar函数会拿到这个异常； 
+ 但是bar函数并没有对这个异常进行处理，那么这个异常就会被继续传递到调用bar函数的函数，也就是test函数； 
+ 但是test函数依然没有处理，就会继续传递到我们的全局代码逻辑中； 
+ 依然没有被处理，这个时候程序会终止执行，后续代码都不会再执行了；



### 异常的捕获

但是很多情况下当出现异常时，我们并不希望程序直接推出，而是希望可以正确的处理异常： 

+ 这个时候我们就可以使用**try catch** 

在ES10（ES2019）中，catch后面绑定的error可以省略。 

当然，如果有一些必须要执行的代码，我们可以使用finally来执行： 

+ finally表示最终一定会被执行的代码结构； 
+ 注意：**如果try和finally中都有返回值，那么会使用finally当中的返回值；**

+ 捕获了异常就不会传递给上一层的调用者

```js
    function foo() {
      console.log("foo function1")
      // throw new Error("我是错误信息")
      console.log("foo function2")
      console.log("foo function3")
      console.log("foo function4")
    }

    function test() {
      // 自己捕获了异常的话, 那么异常就不会传递给浏览器, 那么后续的代码可以正常执行
      try {
        foo()
        console.log("try后续的代码")
      } catch(error) {
        console.log("catch中的代码")
        // console.log(error)
      } finally {
        console.log("finally代码")
      }
    }

    function bar() {
      test()
    }

    bar()

    console.log("--------")
```



# Storage、正则表达式

## 6 浏览器存储Storage

### 认识Storage

WebStorage主要提供了一种机制，可以让浏览器提供一种比cookie更直观的key、value存储方式： 

+ localStorage：**本地存储**，提供的是一种永久性的存储方法，**在关闭掉网页重新打开时，存储的内容依然保留；** 
+ sessionStorage：**会话存储**，提供的是本次会话的存储，**在关闭掉会话时，存储的内容会被清除；**



+ 发送的请求服务端返回到的数据中会进行cookie的设置,下次再发送请求时会携带cookie,查看是否有权限做相应的操作,有的话返回数据,没有的话请求数据失败
+ cookie存在缺陷
+ 采用token机制

> 数据保存在内存中,但是我们的数据可能不是写死的,来自于服务器的



### localStorage和sessionStorage的区别

我们会发现localStorage和sessionStorage看起来非常的相似。 

那么它们有什么区别呢？ 

+ 验证一：关闭网页后重新打开，localStorage会保留，而sessionStorage会被删除； 
+ 验证二：在页面内实现跳转，localStorage会保留，sessionStorage也会保留； 
+ 验证三：在页面外实现跳转（打开新的网页），localStorage会保留，sessionStorage不会被保留；



### Storage常见的方法和属性

Storage有如下的属性和方法： 

属性： 

+ Storage.length：只读属性 ✓ 返回一个整数，表示存储在Storage对象中的数据项数量； 

方法： 

+ Storage.key(index)：该方法接受一个数值n作为参数，返回存储中的第n个key名称； 
+ Storage.getItem()：该方法接受一个key作为参数，并且返回key对应的value； 
+ Storage.setItem()：该方法接受一个key和value，并且将会把key和value添加到存储中。 ✓ 如果key存储，则更新其对应的值； 
+ Storage.removeItem()：该方法接受一个key作为参数，并把该key从存储中删除； 
+ Storage.clear()：该方法的作用是清空存储中的所有key；



## 正则表达式的使用 

### 什么是正则表达式

我们先来看一下维基百科对正则表达式的解释： 

+ 正则表达式（英语：Regular Expression，常简写为regex、regexp或RE），又称正则表示式、正则表示法、规则表达式、常 规表示法，是计算机科学的一个概念； 
+ 正则表达式使用单个字符串来描述、匹配一系列匹配某个句法规则的字符串。 
+ 许多程序设计语言都支持利用正则表达式进行字符串操作。 

简单概况：正则表达式是一种字符串匹配利器，可以帮助我们搜索、获取、替代字符串；

在JavaScript中，正则表达式使用RegExp类来创建，也有对应的字面量的方式： 

+ 正则表达式主要由两部分组成：模式（patterns）和修饰符（flags）



4 正则表达式常见规则 

5正则练习-歌词解析

6 正则练习-日期格式化



# 防抖、节流、深拷贝 事件总线

1 认识防抖和节流 

2 underscore使用 

3 防抖函数实现优化 

4 节流函数实现优化 

5深拷贝函数的实现 

6 事件总线工具实现