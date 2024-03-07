# await、async、事件循环

## 1 async、await 

### 异步函数 async function

async关键字用于声明一个异步函数： 

+ async是asynchronous单词的缩写，异步、非同步； 
+ sync是synchronous单词的缩写，同步、同时； 

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
      // })// aaa

      // 3.返回一个thenable对象
      // return {
      //   then: function(resolve, reject) {
      //     resolve("bbb")
      //   }
      // } //bbb
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

如果在执行JavaScript代码的过程中，有异步操作呢？ 

+ 中间我们插入了一个setTimeout的函数调用； 
+ 这个函数被放到入调用栈中，执行会立即结束，并不会阻塞后续代码的执行；

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
+ **不要无限的向微任务中加微任务，宏任务会无线延长**

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

![image-20240229085813125](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20240229085813125.png)

### localStorage和sessionStorage的区别

我们会发现localStorage和sessionStorage看起来非常的相似。 

那么它们有什么区别呢？ 

+ 验证一：关闭网页后重新打开，localStorage会保留，而sessionStorage会被删除； 
+ 验证二：**在页面内实现跳转，localStorage会保留，sessionStorage也会保留；** 
+ 验证三：在页面外实现跳转（打开新的网页），localStorage会保留，sessionStorage不会被保留；

```html
  <a href="./static/about.html" target="_blank">关于</a>

  <script>

    // 1.验证一: 关闭网页
    // 1.1.localStorage的存储保持
    localStorage.setItem("name", "localStorage")

    // 1.2.sessionStorage的存储会消失
    sessionStorage.setItem("name", "sessionStorage")


    // 2.验证二: 打开新的网页
    localStorage.setItem("info", "local")
    sessionStorage.setItem("info", "session")

    
    // 3.验证三: 打开新的页面, 并且是在新的标签中打开
    localStorage.setItem("infoTab", "local")
    sessionStorage.setItem("infoTab", "session")

  </script>
```



### Storage常见的方法和属性

Storage有如下的属性和方法： 

属性： 

+ Storage.length：只读属性 
  + 返回一个整数，**表示存储在Storage对象中的数据项数量**； 


方法： 

+ Storage.key(index)：该方法接受一个数值n作为参数，返回存储中的第n个key名称； 
+ Storage.getItem()：该方法接受一个key作为参数，并且返回key对应的value； 
+ Storage.setItem()：该方法接受一个key和value，并且将会把key和value添加到存储中。 
  + 如果key存储，则更新其对应的值； 

+ Storage.removeItem()：该方法接受一个key作为参数，并把该key从存储中删除； 
+ Storage.clear()：该方法的作用是清空存储中的所有key；



#### 工具封装

+ 后续使用的时候可以更加便捷方便

```js
class Cache {
  constructor(isLocal = true) {
    this.storage = isLocal ? localStorage: sessionStorage
  }

  setCache(key, value) {
    if (!value) {
      throw new Error("value error: value必须有值!")
    }

    if (value) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }

  getCache(key) {
    const result = this.storage.getItem(key)
    if (result) {
      return JSON.parse(result)
    }
  }

  removeCache(key) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}

const localCache = new Cache()
const sessionCache = new Cache(false)
```



```js
    localCache.setCache("sno", 111)

    // storage本身是不能直接存储对象类型的
    const userInfo = {
      name: "why",
      nickname: "coderwhy",
      level: 100,
      imgURL: "http://github.com/coderwhy.png"
    }

    // localStorage.setItem("userInfo", JSON.stringify(userInfo))
    // console.log(JSON.parse(localStorage.getItem("userInfo")))

    sessionCache.setCache("userInfo", userInfo)
    console.log(sessionCache.getCache("userInfo"))
```



![image-20240229093042298](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20240229093042298.png)

## 正则表达式的使用 

### 什么是正则表达式

我们先来看一下维基百科对正则表达式的解释： 

+ 正则表达式（英语：Regular Expression，常简写为regex、regexp或RE），又称**正则表示式、正则表示法、规则表达式、常 规表示法**，是计算机科学的一个概念； 
+ 正则表达式使用单个字符串来描述、匹配一系列匹配某个句法规则的字符串。 
+ 许多程序设计语言都支持利用正则表达式进行字符串操作。 

简单概况：正则表达式是一种字符串匹配利器，可以帮助我们搜索、获取、替代字符串；

在JavaScript中，正则表达式使用RegExp类来创建，也有对应的字面量的方式： 

+ 正则表达式主要由两部分组成：**模式（patterns）**和**修饰符（flags）**

```js
    // 创建正则
    // 1> 匹配的规则pattern
    // 2> 匹配的修饰符flags
    const re1 = new RegExp("abc", "ig")
    const re2 = /abc/ig // 字面量方式创建
```



#### 正则表达式的优势

```js
    // 创建正则
    const re1 = /abc/ig

    const message = "fdabc123 faBC323 dfABC222 A2324aaBc"

    // 1.使用正则对象上的实例方法


    // 2.使用字符串的方法, 传入一个正则表达式
    // 需求: 将所有的abc(忽略大小写)换成cba
    // const newMessage = message.replaceAll("abc", "cba")
    // console.log(newMessage)
    
    const newMessage = message.replaceAll(/abc/ig, "cba")
    console.log(newMessage)

    // 需求: 将字符串中数字全部删除
    const newMessage2 = message.replaceAll(/\d+/ig, "")
    console.log(newMessage2)
```



## 4 正则表达式常见规则 

有了正则表达式我们要如何使用它呢？ 

+ JavaScript中的正则表达式被用于 RegExp 的 exec 和 test 方法； 
+ 也包括 String 的 match、matchAll、replace、search 和 split 方法；

![image-20240229095728475](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20240229095728475.png)



#### test方法案例

+ test方法: 检测某一个字符串是否符合正则的规则

```html
    输入账号: <input type="text" />
    <p class="tip">请输入账号</p>
    <script>
      const inputEl = document.querySelector("input");
      const tipEl = document.querySelector(".tip");

      inputEl.oninput = function () {
        const value = this.value;
        if (/^aaa$/.test(value)) {
          console.log("符合规则");
        } else {
          console.log("不符合规则");
        }
      };
    </script>
```



#### exec

```js
   const re1 = /abc/ig
    const message = "fdabc123 faBC323 dfABC222 A2324aaBc"

    // 1.2.exec方法: 使用正则执行一个字符串
    const res1 = re1.exec(message)
    console.log(res1)
```



exec方法: 使用正则执行一个字符串



#### match

```js
    // 2.使用字符串的方法, 传入一个正则表达式
    // 2.1. match方法:
    const result2 = message.match(re1)
    console.log(result2)

    // 2.2. matchAll方法
    // 注意: matchAll传入的正则修饰符必须加g
    const result3 = message.matchAll(re1)
    // console.log(result3.next())
    // console.log(result3.next())
    // console.log(result3.next())
    // console.log(result3.next())
    for (const item of result3) {
      console.log(item)
    }
```



#### split

```js
    // 2.4. split方法
    // const result4 = message.split(re1)
    // console.log(result4)

    // 2.5. search方法
    const result5 = message.search(re1)
    console.log(result5)
```



### 修饰符flag的使用

g:gloabl，全部的

i:ignore忽略大小写

m：多行匹配（multiple）



 需求： 

+ 获取一个字符串中所有的abc； 
+  将一个字符串中的所有abc换成大写；

```js
      let message = "Hello ABC,abc, Abc,AAaBc";
      const pattern = /abc/gi;
      const result = message.match(pattern);
      console.log(result);
      message = message.replaceAll(pattern, "ABC");
      console.log(message);
```



### 规则 – 字符类（Character classes）

**字符类（Character classes）** 是一个特殊的符号，匹配特定集中的任何符号

`\d`：匹配所有的数字，0到9的字符

`\s`：空格符号：包括空格，制表符 \t，换行符 \n 和其他少数稀有字符，例如 \v，\f 和 \r。

`\w`：“单字”字符：拉丁字母或数字或下划线 _。word => [a-z A-Z 0-9]

点 . 是一种特殊字符类，它与 “除换行符之外的任何字符” 匹配

**反向类（Inverse classes）**

\D 非数字：除 \d 以外的任何字符，例如字母。 

\S 非空格符号：除 \s 以外的任何字符，例如字母。

 \W 非单字字符：除 \w 以外的任何字符，例如非拉丁字母或空格。



### 规则 – 锚点（Anchors）



### 规则 – 转义字符串



### 集合（Sets）和范围（Ranges）

5正则练习-歌词解析

6 正则练习-日期格式化



# 防抖、节流、深拷贝 事件总线

1 认识防抖和节流 

防抖和节流的概念其实最早并不是出现在软件工程中，防抖是出现在电子元件中，节流出现在流体流动中 

+ 而JavaScript是事件驱动的，大量的操作会触发事件，加入到事件队列中处理。 
+ 而对于**某些频繁的事件处理会造成性能的损耗**，我们就可以通过防抖和节流来限制事件频繁的发生； 

防抖和节流函数目前已经是前端实际开发中两个非常重要的函数，也是面试经常被问到的面试题。 

但是很多前端开发者面对这两个功能，有点摸不着头脑： 

+ 某些开发者根本无法区分防抖和节流有什么区别（面试经常会被问到）； 
+ 某些开发者可以区分，但是不知道如何应用； 
+ 某些开发者会通过一些第三方库来使用，但是不知道内部原理，更不会编写； 

接下来我们会一起来学习防抖和节流函数： 

+ 我们不仅仅要区分清楚防抖和节流两者的区别，也要明白在实际工作中哪些场景会用到； 
+ 并且我会带着大家一点点来编写一个自己的防抖和节流的函数，不仅理解原理，也学会自己来编写；



### 认识防抖debounce函数

我们用一副图来理解一下它的过程： 

+ 当事件触发时，**相应的函数并不会立即触发，而是会等待一定的时间**； 
+ **当事件密集触发时，函数的触发会被频繁的推迟；** 
+ **只有等待了一段时间也没有事件触发，才会真正的执行响应函数；**

防抖的应用场景很多：

+ 输入框中频繁的输入内容，搜索或 者提交信息；
+ 频繁的点击按钮，触发某个事件；
+ 监听浏览器滚动事件，完成某些特 定操作；
+ 用户缩放浏览器的resize事件；

> 在输入框输入一个字符时，下拉框会进行很多联想，这些联想词汇一定不是放在本地的，会发送网络请求
>
> 用户快速输入时不会频繁的进行交互，对服务器压力非常大，

### 防抖函数的案例

我们都遇到过这样的场景，在某个搜索框中输入自己想要搜索的内容： 

比如想要搜索一个MacBook：  当我输入m时，为了更好的用户体验，通常会出现对应的联想内容，这些联想内容通常是保存在服务器的，所以需要一次网 络请求；  当继续输入ma时，再次发送网络请求；  那么macbook一共需要发送7次网络请求；  这大大损耗我们整个系统的性能，无论是前端的事件处理，还是对于服务器的压力; 

但是我们需要这么多次的网络请求吗？  不需要，正确的做法应该是在合适的情况下再发送网络请求；  比如如果用户快速的输入一个macbook，那么只是发送一次网络请求；  比如如果用户是输入一个m想了一会儿，这个时候m确实应该发送一次网络请求；  也就是我们应该监听用户在某个时间，比如500ms内，没有再次触发时间时，再发送网络请求； 

这就是防抖的操作：只有在某个时间内，没有再次触发某个函数时，才真正的调用这个函数；

> 需要传入什么样的参数
>
> 参数一：回调函数
>
> 参数二：延迟时间
>
> 有什么返回值
>
> 内部实现

![image-20240229112304976](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20240229112304976.png)



![image-20240229124011941](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20240229124011941.png)

2 underscore使用 

3 防抖函数实现优化

```js
    function hydebounce(fn, delay) {
      // 1.用于记录上一次事件触发的timer
      let timer = null

      // 2.触发事件时执行的函数
      const _debounce = () => {
        // 2.1.如果有再次触发(更多次触发)事件, 那么取消上一次的事件
        if (timer) clearTimeout(timer)

        // 2.2.延迟去执行对应的fn函数(传入的回调函数)
        timer = setTimeout(() => {
          fn()
          timer = null // 执行过函数之后, 将timer重新置null
        }, delay);
      }

      // 返回一个新的函数
      return _debounce
    }
```

+ this和参数绑定
+ 取消功能
+ 立即执行的功能，第一次立刻发送请求
+ 获取返回值





4 节流函数实现优化 

![image-20240229140509919](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20240229140509919.png)

```js
```



# 5深拷贝函数的实现

前面我们已经学习了对象相互赋值的一些关系，分别包括： 

+ 引入的赋值：指向同一个对象，相互之间会影响； 
+ **对象的浅拷贝：只是浅层的拷贝，内部引入对象时，依然会相互影响；** 
+ 对象的深拷贝：两个对象不再有任何关系，不会相互影响； 

前面我们已经可以通过一种方法来实现深拷贝了：**JSON.parse** 

+ 这种**深拷贝的方式其实对于函数、Symbol等是无法处理的；** 
+ 并且如果**存在对象的循环引用，也会报错的**； 

![image-20240229141633484](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20240229141633484.png)

自定义深拷贝函数： 

+ 1.自定义深拷贝的基本功能； 
+ 2.对Symbol的key进行处理； 
+ 3.其他数据类型的值进程处理：数组、函数、Symbol、Set、Map； 
+ 4.对循环引用的处理；

```js
      function isObject(value) {
        const valueType = typeof value;
        return (
          value != null && (valueType === "object" || valueType === "function")
        );
      }
      function deepCopy(originValue) {
        // 1.如果是原始类型, 直接返回
        if (!isObject(originValue)) return originValue;

        // 2.如果是对象类型, 才需要创建对象
        const newObj = Array.isArray(originValue) ? [] : {};
        for (const key in originValue) {
          newObj[key] = deepCopy(originValue[key]);
        }
        return newObj;
      }
      const info = {
        name: "why",
        age: 18,
        friend: {
          name: "kobe",
          address: {
            name: "洛杉矶",
            detail: "斯坦普斯中心",
          },
        },
      };

      const newObj = deepCopy(info);
      info.friend.address.name = "北京市";
      console.log(newObj.friend.address.name);

      const books = [
        {
          name: "黄金时代",
          price: 28,
          desc: { intro: "这本书不错", info: "这本书讲了一个很有意思的故事" },
        },
        { name: "你不知道JavaScript", price: 99 },
      ];

      const newBooks = deepCopy(books);
      books[0] = "1";
      console.log(newBooks);
```



#### 属性为Set类型

+ for in 不支持set，for in主要用于遍历数组

![image-20240229162148261](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20240229162148261.png)



#### function类型

不需要进行深拷贝，函数只是调用执行

```js
      // 3.如果是函数function类型, 不需要进行深拷贝
      if (typeof originValue === "function") {
        return originValue
      }
```

#### 值为Symbol类型

+ 默认为原始类型直接返回了

![image-20240229165954878](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20240229165954878.png)



```js
        // 0.如果值是Symbol的类型
        if (typeof originValue === "symbol") {
          return Symbol(originValue.description);
        }
```



#### Symbol作为key

+ symbol用for in去进行遍历时，不会进行遍历symbol

```js
        // 单独遍历symbol
        const symbolKeys = Object.getOwnPropertySymbols(originValue);
        // symbolKeys是一个数组用for of
        for (const symbolKey of symbolKeys) {
          newObj[Symbol(symbolKey.description)] = deepCopy(
            originValue[symbolKey]
          );
        }
```





![image-20240229172838713](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20240229172838713.png)



![image-20240229190719698](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20240229190719698.png)

6 事件总线工具实现

自定义事件总线

 **自定义事件总线属于一种观察者模式**，其中包括三个角色： 

+ 发布者（Publisher）：**发出事件（Event）；** 
+ 订阅者（Subscriber）：**订阅事件（Event），并且会进行响应（Handler）；** 
+ 事件总线（EventBus）：无论是发布者还是订阅者都是通过事件总线作为中台的； 

当然我们可以选择一些第三方的库： 

+ Vue2默认是带有事件总线的功能； 
+ Vue3中推荐一些第三方库，比如**mitt**； 

当然我们也可以实现自己的事件总线： 

+ **事件的监听方法on**； 
+ **事件的发射方法emit**； 
+ **事件的取消监听off**；



# JavaScript XHR、Fetch

1 前端数据请求方式

前后端分离优势

早期的网页都是通过后端渲染来完成的：**服务器端渲染（SSR，server side render）**： 

+ **客户端发出请求 -> 服务端接收请求并返回相应HTML文档 -> 页面刷新**，客户端加载新的HTML文档； 

服务器端渲染的缺点： 

+ 当用户点击页面中的某个按钮向服务器发送请求时，**页面本质上只是一些数据发生了变化，而此时服务器却要将重绘的整个页面再返 回给浏览器加载**，这显然有悖于程序员的“DRY（ Don‘t repeat yourself ）”原则； 
+ 而且明明**只是一些数据的变化却迫使服务器要返回整个HTML文档**，这本身也会给网络带宽带来不必要的开销。 

有没有办法在页面数据变动时，**只向服务器请求新的数据，并且在阻止页面刷新的情况下**，动态的替换页面中展示的数据呢？ 

+ 答案正是“AJAX”。 

AJAX是“Asynchronous JavaScript And XML”的缩写(异步的JavaScript和XML)，是一种实现 **无页面刷新 获取服务器数据的技术。** 

+ AJAX最吸引人的就是它的“异步”特性，也就是说它可以在**不重新刷新页面的情况下与服务器通信**，交换数据，或更新页面。 

你可以使用AJAX最主要的两个特性做下列事： 

+ 在**不重新加载页面的情况下发送请求给服务器**； 
+ **接受并使用从服务器发来的数据**。 

### 网页的渲染过程 – 服务器端渲染

+ SEO优化
+ 首屏渲染速度

![image-20240229202038138](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20240229202038138.png)

开发好的前端项目静态资源部署在前端服务器上，由浏览器向前端服务器发送请求，服务器返回对应的静态资源，包含JavaScript的代码，执行JavaScript代码，在js中会有例如fetch这样的api然后向后端请求数据，后端服务器就会去数据库查询数据，拿到对应的数据之后，由后端将这些数据组装好，然后返回给前端，再由js将这些DOM添加到整个document中

2 Http协议的解析

 什么是HTTP呢？我们来看一下维基百科的解释： 

+ 超文本传输协议（英语：HyperText Transfer Protocol，缩写：HTTP）是一种用于**分布式、协作式和超媒体信息系统的应用层协议；** 
+ HTTP是万维网的数据通信的基础，设计HTTP最初的目的是**为了提供一种发布和接收HTML页面的方法**； 
+ 通过HTTP或者HTTPS协议**请求的资源**由**统一资源标识符（Uniform Resource Identifiers，URI）来标识**； 

HTTP是一个客户端（用户）和服务端（网站）之间请求和响应的标准。 

+ 通过使用网页浏览器、网络爬虫或者其它的工具，客户端发起一个HTTP请求到服务器上指定端口（默认端口为80）； 
  + 我们称这个客户端为**用户代理程序（user agent）**； 
+ 响应的服务器上存储着一些资源，比如HTML文件和图像。 
  + 我们称这**个响应服务器为源服务器（origin server）**；

## http的组成

## 请求方式

GET：**GET 方法请求一个指定资源的表示形式，使用 GET 的请求应该只被用于获取数据。** 

HEAD：**HEAD 方法请求一个与 GET 请求的响应相同的响应，但没有响应体。**

+ 比如在准备下载一个文件前，先获取文件的大小，再决定是否进行下载； 

POST：**POST 方法用于将实体提交到指定的资源**。 

PUT：PUT 方法用请求有效载荷（payload）替换目标资源的所有当前表示； 

DELETE：**DELETE 方法删除指定的资源；** 

PATCH：PATCH 方法用于对资源应部分修改； 

CONNECT：CONNECT 方法建立一个到目标资源标识的服务器的隧道，通常用在代理服务器，网页开发很少用到。 

TRACE：TRACE 方法沿着到目标资源的路径执行一个消息环回测试

### 请求头

**content-type**是这次**请求携带的数据的类型：** 

+ application/x-www-form-urlencoded：表示数据被编码成以 '&' 分隔的键 - 值对，同时以 '=' 分隔键和值 
+ application/json：表示是一个json类型； 
+ text/plain：表示是文本类型； 
+ application/xml：表示是xml类型； 
+ multipart/form-data：表示是上传文件；



**content-length**：文件的大小长度 

**keep-alive**： 

**http是基于TCP协议的，但是通常在进行一次请求和响应结束后会立刻中断**； 

在http1.0中，如果想要继续保持连接： 

+ 浏览器需要在请求头中添加 connection: keep-alive； 
+ 服务器需要在响应头中添加 connection:keey-alive； 
+ 当客户端再次放请求时，就会使用同一个连接，直接一方中断连接； 

在http1.1中，所有连接默认是 connection: keep-alive的； 

+ 不同的Web服务器会有不同的保持 keep-alive的时间； 
+ Node中默认是5s中； 

**accept-encoding**：告知服务器，客户端支持的文件压缩格式，比如js文件可以使用gzip编码，对应 .gz文件； 

**accept**：告知服务器，客户端可接受文件的格式类型； 

**user-agent**：客户端相关的信息；

![image-20240307092848604](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20240307092848604.png)

## 响应行

### 响应状态码

200 OK 客户端请求成功

201 Created POST请求，创建新的资源

301 Moved Permanently 请求资源的URL已经修改，响应中会给出新的URL

400 Bad Request 客户端的错误，服务器无法或者不进行处理

401 Unauthorized 未授权的错误，必须携带请求的身份信息

403 Forbidden 客户端没有权限访问，被拒接

404 Not Found 服务器找不到请求的资源。

500 Internal Server Error 服务器遇到了不知道如何处理的情况。 503 Service Unavailable 服务器不可用，可能处理维护或者重载状态，暂时无法访问



3 XHR的基本用法 



```js
    // 1.创建XMLHttpRequest对象
    const xhr = new XMLHttpRequest()

    // 2.监听状态的改变(宏任务)
    xhr.onreadystatechange = function() {
      // console.log(xhr.response)
      if (xhr.readyState !== XMLHttpRequest.DONE) return

      // 将字符串转成JSON对象(js对象)
      const resJSON = JSON.parse(xhr.response)
      const banners = resJSON.data.banner.list
      console.log(banners)
    }

    // 3.配置请求open
    // method: 请求的方式(get/post/delete/put/patch...)
    // url: 请求的地址
    xhr.open("get", "http://123.207.32.32:8000/home/multidata")

    // 4.发送请求(浏览器帮助发送对应请求)
    xhr.send()
```

+ **创建XMLHttpRequest（xhr）对象**
+ **监听状态的改变**
+ **配置请求open（method url）**
+ **发送请求**



AJAX 是异步的 JavaScript 和 XML（Asynchronous JavaScript And XML） 

+ 它可以使用 JSON，XML，HTML 和 text 文本等格式发送和接收数据； 

如何来完成AJAX请求呢？ 

+ 第一步：创建**网络请求的AJAX对象（使用XMLHttpRequest）** 
+ 第二步：监听XMLHttpRequest对象状态的变化，或者监听onload事件（请求完成时触发）； 
+ 第三步：配置网络请求（通过open方法）； 
+ 第四步：发送send网络请求；

# 4 XHR的进阶和封装

post请求的参数放在请求体里面

传递一个Content-type的参数，目的告诉服务器参数的类型

常见的传递给服务器数据的方式有如下几种： 

+ 方式一：GET请求的query参数 
+ 方式二：POST请求 x-www-form-urlencoded 格式 
+ 方式三：POST请求 FormData 格式 
+ 方式四：POST请求 JSON 格式

# 5 Fetch的使用详解 

认识Fetch和Fetch API

Fetch可以看做是早期的XMLHttpRequest的替代方案，它提供了一种更加现代的处理方案：

+ 比如**返回值是一个Promise，提供了一种更加优雅的处理结果方式** 
  + 在请求发送成功时，调用resolve回调then； 
  + 在请求发送失败时，调用reject回调catch； 
+ 比如不像XMLHttpRequest一样，所有的操作都在一个对象上； 



fetch函数的使用： 

+ input：**定义要获取的资源地址**，可以是一个URL字符串，也可以使用一个Request对象（实验性特性）类型； 
+ init：**其他初始化参数** 
  + method: 请求使用的方法，如 GET、POST； 
  + headers: 请求的头信息； 
  + body: 请求的 body 信息；

# 6 前端文件上传流程

拿到这个文件然后调用服务器的某个接口，将这个文件传递给服务器，然后服务器将这个文件保存到某个位置（本地文件）（服务器硬盘），然后服务器返回这个图片的url地址

1. 创建一个type类型为file的input组件（被选择的文件会记录到这个元素上）
2. 监听结果
3. 配置请求参数，设置响应的数据类型
4. 将这个文件加到表单
5. 发送表单请求到服务器

```html
  <input class="file" type="file">
  <button class="upload">上传文件</button>
  
  <script>

    // xhr/fetch

    const uploadBtn = document.querySelector(".upload")
    uploadBtn.onclick = function() {
      // 1.创建对象
      const xhr = new XMLHttpRequest()

      // 2.监听结果
      xhr.onload = function() {
        console.log(xhr.response)
      }

      xhr.onprogress = function(event) {
        console.log(event)
      }

      xhr.responseType = "json"
      xhr.open("post", "http://123.207.32.32:1888/02_param/upload")

      // 表单
      const fileEl = document.querySelector(".file")
      const file = fileEl.files[0]

      const formData = new FormData()
      formData.append("avatar", file)

      xhr.send(formData)
    }
```

fetch的话就是将参数（表单）放在body中