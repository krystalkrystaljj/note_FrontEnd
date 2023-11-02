# 一、邂逅Node.js

## 1.Node.js是什么

### 1.1 Node.js的概念理解

+ Node.js是一个基于V8 JavaScript引擎的JavaScript运行时环境(即建立在V8引擎之上的一个运行环境)
  + Node.js is a javaScript runtime built on Chrome's V8 JavaScript engine.

+ 也就是Node.js基于V8引擎来执行JavaScript代码，但不仅仅只有V8引擎：
  + v8可以嵌入到任何的c++应用程序中，无论是Chrome还是Node.js，事实上都是嵌入了v8引擎来执行JavaScript代码
  + 但是在Chrome浏览器中，还需要**解析、渲染HTML、CSS等相关渲染引擎**，另外还需要提供**支持浏览器操作的API、浏览器自己的事件循环**等；
  + 另外，在Node.js中我们也需要进行一些额外的操作，比如**文件系统读/写、网络IO、加密、压缩解压文件**等操作



### 1.2 浏览器和Node.js架构的区别

Node.js使用什么语言来编写的？

+ JavaScript（没有用js编写的东西，但是会有js代码，当我们使用js时调用的一些api）
+ c++（v8引擎是用c++编写的）
+ c语言（中间层libuv是用c语言编写的）

![image-20231022194531887](https://raw.githubusercontent.com/bigshcool/myPic/main/image-20231022194531887.png)

### 1.3 Node.js的架构图

+ libuv提供了**事件循环、文件系统读写、网络IO、线程池**等等内容
+ 我们来看一个单独的Node.js的架构图： 
+ 我们编写的JavaScript代码会经过V8引擎，再通过Node.js的Bindings，将任务放到Libuv的事件循环中； 
+ libuv（Unicorn Velociraptor—独角伶盗龙）是使用C语言编写的库； 
+ libuv提供了事件循环、文件系统读写、网络IO、线程池等等内容；

![image-20231022194702403](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20231022194702403.png)



## 2.Node.js的应用场景

Node的应用场景，内部嵌入了一个v8引擎，可以帮助我们执行js的代码，另外通过调用一些API可以做一些系统级别的相关操作，网络的操作、文件的读写

+ electron项目：VSCode



+ 应用一：目前前端开发的库都是以node包的形式进行管理（第三方库vue/pinia/react等）
+ 应用二：**npm、yarn、pnpm工具成为前端开发使用最多的工具**
+ 应用三：越来越多的公司**使用Node.js作为web服务器开发、中间件、代理服务器**
+ 应用四：大量项目需要**借助Node.js完成前后端渲染的同构应用**
+ 应用五：为项目**编写脚本工具**（前端通常使用JavaScript而不是python或者shell）
+ 应用六：很多企业在**使用Electron来开发桌面应用**



## 3.Node的安装

### 3.2 Node的版本管理工具nvm(了解)

在实际开发学习中，我们只需要使用一个Node版本来开发或者学习即可。 

 但是，如果你希望通过可以快速更新或切换多个版本时，可以借助于一些工具： 

+ nvm：Node Version Manager； 
+ n：Interactively Manage Your Node.js Versions（交互式管理你的Node.js版本） 

 问题：这两个工具都不支持window 

+ n：n is not supported natively on Windows. 
+ nvm：nvm does not support Windows

Window的同学怎么办？ 

+ 针对nvm，在GitHub上有提供对应的window版本：https://github.com/coreybutler/nvm-windows 
+ 通过 nvm install latest 安装最新的node版本 
+ 通过 nvm list 展示目前安装的所有版本 
+ 通过 nvm use 切换版本

## 4.Node的输入和输出



## 5.Node的全局对象

### 5.1 Node的REPL

什么是REPL呢？感觉挺高大上 

+ REPL是**Read-Eval-Print Loop**的简称，翻译为**“读取-求值-输出”**循环； 
+ REPL是一个**简单的、交互式的编程环境**； 

**事实上，我们浏览器的console就可以看成一个REPL。** 

Node也给我们提供了一个REPL环境，我们可以在其中演练简单的代码。



### 5.2 Node程序传递参数

正常情况下执行一个node程序，直接跟上我们对应的文件即可：

```
node index.js
```

但是，在某些情况下执行node程序的过程中，我们可能希望给node传递一些参数： 

```
node index.js env=development coderwhy
```

如果我们这样来使用程序，就意味着我们需要在程序中获取到传递的参数： 

+ 获取参数其实是在**process的内置对象**中的； 
+ 如果我们**直接打印这个内置对象**，它里面包含特别的信息： 
+ 其他的一些信息，比如**版本、操作系统**等大家可以自行查看，后面用到一些其他的我们还会提到； 

现在，我们先找到其中的**argv属性**： 

+ 我们发现它是一个数组，里面包含了我们需要的参数；(执行`console.log(process.argv)`)

![image-20231022212335445](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20231022212335445.png)



```js
const num1 = process.argv[2]
const num2 = process.argv[3]

const sum = Number(num1)+Number(num2)
console.log(sum); //输出12
```



+ 你可能有个疑问，为什么叫argv呢？ 
+  在C/C++程序中的main函数中，实际上可以获取到两个参数： 
  + argc：argument counter的缩写，传递参数的个数； 
  + argv：argument vector（向量、矢量）的缩写，传入的具体参数。 
    + vector翻译过来是矢量的意思，在程序中表示的是一种数据结构。 
    + 在C++、Java中都有这种数据结构，是一种数组结构；
    + 在JavaScript中也是一个数组，里面存储一些参数信息； 
+ 我们可以在代码中，将这些参数信息遍历出来，使用：

```js
process.argv.forEach(item => {
  console.log(item);
});
```



### 5.3 特殊的全局对象

这些全局对象实际上是**模块中的变量，只是每个模块都有，看来像是全局变量**； 

+ 在命令行交互中是不可以使用的； 

+ 包括：__dirname、__filename、exports、module、require() 

__dirname：获取当前文件所在的路径： (重要)

+ 注意：不包括后面的文件名  

__filename：获取当前文件所在的路径和文件名称： 

+ 注意：包括后面的文件名称



* __dirname
* __filename
* exports/require/module.exports



### 5.4 常见的全局对象

 process对象：process提供了Node进程中相关的信息： 

+ 比如Node的运行环境、参数信息等； 
+ 后面在项目中，我也会讲解，如何将一些环境变量读取到 process 的 env 中；

console对象：提供了简单的调试控制台，在前面讲解输入内容时已经学习过了。 

+ 更加详细的查看官网文档：https://nodejs.org/api/console.html 

定时器函数：在Node中使用定时器有好几种方式： 

+ setTimeout(callback, delay[, ...args])：callback在delay毫秒后执行一次； 
+ setInterval(callback, delay[, ...args])：callback每delay毫秒重复执行一次； 
+ setImmediate(callback[, ...args])：callbackI / O事件后的回调的“立即”执行； 
  +  这里先不展开讨论它和setTimeout(callback, 0)之间的区别；
  +  因为它涉及到事件循环的阶段问题，我会在后续详细讲解事件循环相关的知识； 
+ process.nextTick(callback[, ...args])：添加到下一次tick队列中； ✓ 具体的讲解，也放到事件循环中说明；

#### 1.5.2. 其他的全局对象

* process
* console
* 定时器
  * setTimeout
  * setInterval
  * setImmediate
  * process.next
* global
  * 和window的区别
  * globalThis

global是一个全局对象，事实上前端我们提到的process、console、setTimeout等都有被放到global中： 

+ 在新的标准中还有一个globalThis，也是指向全局对象的； 
+ 类似于浏览器中的window；

#### global和window的区别（面试）

在浏览器中，全局变量都是在window上的，比如有document、setInterval、setTimeout、alert、console等等 

在Node中，我们也有一个global属性，并且看起来它里面有很多其他对象。

但是在浏览器中执行的JavaScript代码，如果我们在顶级范围内通过var定义的一个属性，默认会被添加到window对象上： 

```js
var name = 'tjj'
console.log(window.name); //输出为tjj
```

但是在node中，我们通过var定义一个变量，它只是在当前模块中有一个变量，不会放到全局中：

```js
var name = 'tjj'
console.log(global.name); //输出为undefined
```



# 二、什么是JavaScript的模块化

## 什么是模块化

到底什么是模块化、模块化开发呢？ 

+ 事实上**模块化开发**最终的目的是**将程序划分成一个个小的结构**；
+ 这个结构中编写属于自己的**逻辑代码**，有自己的**作用域**，定义变量名词时**不会影响到其他的结构**； 
+ 这个结构可以将自己希望暴露的变量、函数、对象等导出给其结构使用； 
+ 也可以通过某种方式，导入另外结构中的**变量、函数、对象**等； 

上面说提到的结构，就是模块；按照这种结构划分开发程序的过程，就是模块化开发的过程； 

无论你多么喜欢JavaScript，以及它现在发展的有多好，它都有很多的缺陷： 

+ **比如var定义的变量作用域问题；** 
+ **比如JavaScript的面向对象并不能像常规面向对象语言一样使用class；** 
+ **比如JavaScript没有模块化的问题；** 

对于早期的JavaScript没有模块化来说，确确实实带来了很多的问题；



## 模块化的历史

在网页开发的早期，Brendan Eich开发JavaScript仅仅作为一种**脚本语言**，做一些简单的表单验证或动画实现等，那个时候代 码还是很少的：

+ 这个时候我们只需要讲JavaScript代码写到 `<scxript>`标签中去
+ 并没有必要放到多个文件中来编写；甚至流行：通常来说 JavaScript 程序的长度只有一行。

但是随着前端和JavaScript的快速发展，JavaScript代码变得越来越复杂了： 

+ ajax的出现，前后端开发分离，意味着后端返回数据后，我们需要通过**JavaScript进行前端页面的渲染**； 
+ SPA的出现，前端页面变得更加复杂：包括**前端路由、状态管理**等等一系列复杂的需求需要通过JavaScript来实现； 
+ 包括Node的实现，JavaScript编写**复杂的后端程序**，没有模块化是致命的硬伤；

所以，模块化已经是JavaScript一个非常迫切的需求： 

+ 但是JavaScript本身，直到**ES6（2015）才推出了自己的模块化方案**； 
+ 在此之前，为了让JavaScript支持模块化，涌现出了很多不同的模块化规范：**AMD、CMD、CommonJS**等； 

在我们的课程中，我将详细讲解JavaScript的模块化，尤其是CommonJS和ES6的模块化。



### 没有模块化带来的问题

没有模块化带来的问题

早期没有模块化带来了很多的问题：**比如命名冲突的问题** 

![image-20231102195137180](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231102195137180.png)

当然，我们有办法可以解决上面的问题：**立即函数调用表达式**（IIFE） 

+ IIFE (Immediately Invoked Function Expression) 

```js
(function () {
  let name = "aaa"
  console.log(name);
}())
```





但是，我们其实带来了新的问题： 

+ 第一，我必须记得**每一个模块中返回对象的命名**，才能在其他模块使用过程中正确的使用； 
+ 第二，代码写起来混乱不堪，每个文件中的代码都需要包裹在**一个匿名函数中来编写**； 
+ 第三，在没有**合适的规范**情况下，每个人、每个公司都可能会任意命名、甚至出现模块名称相同的情况； 

所以，我们会发现，虽然实现了模块化，但是我们的实现过于简单，并且是没有规范的。 

+ 我们需要制定一定的规范来约束每个人都**按照这个规范去编写模块化的代码**； 
+ 这个规范中应该包括核心功能：**模块本身可以导出暴露的属性，模块又可以导入自己需要的属性**； 
+ JavaScript社区为了解决上面的问题，涌现出一系列好用的规范，接下来我们就学习具有代表性的一些规范。

![image-20231102200017215](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231102200017215.png)



### CommonJS规范和Node关系

我们需要知道CommonJS是一个规范，最初提出来是在浏览器以外的地方使用，并且当时被命名为ServerJS，后来为了体现它 的广泛性，修改为CommonJS，平时我们也会简称为CJS。 

+ **Node**是CommonJS在服务器端一个具有代表性的实现； 
+ Browserify是CommonJS在浏览器中的一种实现； 
+ **webpack打包工具**具备对CommonJS的支持和转换； 

所以，Node中对**CommonJS进行了支持和实现**，让我们在开发node的过程中可以方便的进行模块化开发： 

+ 在Node中**每一个js文件都是一个单独的模块**； 
+ 这个模块中包括**CommonJS规范的核心变量**：**exports、module.exports、require；** 
+ 我们可以使用这些变量来方便的进行模块化开发； 

前面我们提到过模块化的核心是**导出和导入**，Node中对其进行了实现： 

+ **exports和module.exports**可以负责对**模块中的内容进行导出**； 
+ **require函数**可以帮助我们导入**其他模块（自定义模块、系统模块、第三方库模块）**中的内容；





exports导出

注意：exports是一个对象，我们可以在这个对象中添加很多个属性，添加的属性会导出； 

另外一个文件中可以导入： 

上面这行完成了什么操作呢？理解下面这句话，Node中的模块化一目了然 

+ 意味着main中的bar变量等于exports对象； 
+ 也就是require通过各种查找方式，最终找到了exports这个对象； 
+ 并且将这个exports对象赋值给了bar变量； 
+ bar变量就是exports对象了；





### module.exports导出

但是Node中我们经常导出东西的时候，又是通过module.exports导出的：

+  module.exports和exports有什么关系或者区别呢？ 

我们追根溯源，通过维基百科中对CommonJS规范的解析： 

+ CommonJS中是没有module.exports的概念的； 
+ 但是为了实现模块的导出，Node中使用的是**Module的类**，每一个模块都是**Module的一个实例**，也就是module； 
+ 所以在**Node**中真正用于导出的其实根本不是exports，而是**module.exports**； 
+ 因为module才是导出的真正实现者； 

但是，为什么exports也可以导出呢？ 

+ 这是因为**module对象的exports属性是exports对象的一个引用；** 
+ 也就是说 **module.exports = exports = main中的bar**；
