# 一、TypeScript

## 1、背景

著名的Atwood定律： 

> + Stack Overflow的创立者之一的 Jeff Atwood 在2007年提出了著名的 Atwood定律。 
>
> + **any application that can be written in JavaScript, will eventually be written in JavaScript.** 
>
> + 任何可以使用JavaScript来实现的应用都最终都会使用JavaScript实现。 

其实我们已经看到了，这句话正在一步步被应验： 

+ Web端的开发我们一直都是使用JavaScript； 

+ 移动端开发可以借助于ReactNative、Weex、Uniapp等框架实现跨平台开发； 

+ 小程序端的开发也是离不开JavaScript； 

+ 桌面端应用程序我们可以借助于Electron来开发； 

+ 服务器端开发可以借助于Node环境使用JavaScript来开发。

### 1.1 JavaScript的痛点

并且随着近几年前端领域的快速发展，让JavaScript迅速被普及和受广大开发者的喜爱，借助于JavaScript本身的 强大，也让使用JavaScript开发的人员越来越多。 

优秀的JavaScript没有缺点吗？ 

+ 其实上由于各种历史因素，JavaScript语言本身存在很多的缺点； 
+ 比如ES5以及之前的使用的var关键字关于作用域的问题； 
+ 比如最初JavaScript设计的数组类型并不是连续的内存空间； 
+ 比如直到今天JavaScript也没有加入类型检测这一机制； 

JavaScript正在慢慢变好 

+ 不可否认的是，JavaScript正在慢慢变得越来越好，无论是从底层设计还是应用层面。 
+ ES6、7、8等的推出，每次都会让这门语言更加现代、更加安全、更加方便。 
+ 但是知道今天，JavaScript在类型检测上依然是毫无进展（为什么类型检测如此重要，我后面会聊到）



### 1.2 类型带来的问题

首先你需要知道，编程开发中我们有一个共识：错误出现的越早越好 

+ 能在写代码的时候发现错误，就不要在代码编译时再发现（IDE的优势就是在代码编写过程中帮助我们发现错 误）。 

+ 能在代码编译期间发现错误，就不要在代码运行期间再发现（类型检测就可以很好的帮助我们做到这一点）。 

+ 能在开发阶段发现错误，就不要在测试期间发现错误，能在测试期间发现错误，就不要在上线后发现错误。 

在我们想探究的就是如何在 代码编译期间 发现代码的错误： pJavaScript可以做到吗？不可以，我们来看下面这段经常可能出现的代码问题。

```js
function getLength(str) {
  return str.length
}

console.log(getLength("abc"));
getLength()
```



### 1.3 类型错误

这是我们一个非常常见的错误： 

+ 这个错误很大的原因就是因为JavaScript没有对我们**传入的参数进行任何的限制**，只能等到**运行期间才发现这个 错误**； 
+ 并且当这个错误产生时，会影响后续代码的继续执行，也就是整个项目都因为一个小小的错误而深入崩溃； 

当然，你可能会想：我怎么可能犯这样低级的错误呢？ 

+ 当我们写像我们上面这样的简单的demo时，这样的错误很容易避免，并且当出现错误时，也很容易检查出来； 
+ 但是当我们开发一个大型项目时呢？你能保证自己一定不会出现这样的问题吗？而且如果我们是调用别人的类 库，又如何知道让我们传入的到底是什么样的参数呢？ 

但是，如果我们可以给JavaScript加上很多限制，在开发中就可以很好的避免这样的问题了： 

+ 比如我们的getLength函数中str是一个必传的类型，没有调用者没有传编译期间就会报错； 
+ 比如我们要求它的必须是一个String类型，传入其他类型就直接报错； 
+ 那么就可以知道很多的错误问题在编译期间就被发现，而不是等到运行时再去发现和修改；



### 1.4 类型思维的缺失

我们已经简单体会到没有类型检查带来的一些问题，JavaScript因为从设计之初就没有考虑类型的约束问题，所以 造成了前端开发人员关于类型思维的缺失：

+ 前端开发人员通常不关心变量或者参数是什么类型的，如果在必须确定类型时，我们往往需要使用各种判断验 证； 

+ 从其他方向转到前端的人员，也会因为没有类型约束，而总是担心自己的代码不安全，不够健壮； 

所以我们经常会说JavaScript不适合开发大型项目，因为当项目一旦庞大起来，这种宽松的类型约束会带来非常多 的安全隐患，多人员开发它们之间也没有良好的类型契约。 

+ 比如当我们去实现一个核心类库时，如果没有类型约束，那么需要对别人传入的参数进行各种验证来保证我们 代码的健壮性； 

+ 比如我们去调用别人的函数，对方没有对函数进行任何的注释，我们只能去看里面的逻辑来理解这个函数需要 传入什么参数，返回值是什么类型；



### 1.5 JavaScript添加类型约束

为了弥补JavaScript类型约束上的缺陷，增加类型约束，很多公司推出了自己的方案： 

> 2014年，Facebook推出了flow来对JavaScript进行类型检查； 
>
> 同年，Microsoft微软也推出了TypeScript1.0版本； 
>
> 他们都致力于为JavaScript提供类型检查；

而现在，无疑TypeScript已经完全胜出： 

> Vue2.x的时候采用的就是flow来做类型检查； 
>
> Vue3.x已经全线转向TypeScript，98.3%使用TypeScript进行了重构； 
>
> 而Angular在很早期就使用TypeScript进行了项目重构并且需要使用TypeScript来进行开发； 
>
> 而甚至Facebook公司一些自己的产品也在使用TypeScript；

学习TypeScript不仅仅可以为我们的代码增加类型约束，而且可以培养我们前端程序员具备类型思维。



## 2、认识TypeScript

typescript定义

> GitHub说法：TypeScript is a superset of JavaScript that compiles to clean JavaScript output. 
>
> TypeScript官网：TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. 
>
> 翻译一下：TypeScript是拥有类型的JavaScript超集，它可以编译成普通、干净、完整的JavaScript代码。

我们可以将TypeScript理解成加强版的JavaScript。  

+  JavaScript所拥有的特性，TypeScript全部都是支持的，并且它紧随ECMAScript的标准，所以ES6、ES7、ES8等新语法标准，它都是 支持的； 
+ 并且在语言层面上，不仅仅增加了类型约束，而且包括一些语法的扩展，比如枚举类型（Enum）、元组类型（Tuple）等； 
+ TypeScript在实现新特性的同时，总是保持和ES标准的同步甚至是领先； 
+ 并且TypeScript最终会被编译成JavaScript代码，所以你并不需要担心它的兼容性问题，在编译时也不需要借助于Babel这样的工具； 

可以把TypeScript理解成更加强大的JavaScript，不仅让JavaScript更加安全，而且给它带来了诸多好用的好用特性



### 2.1 TypeScript的特点

官方对TypeScript有几段特点的描述，我觉得非常到位（虽然有些官方，了解一下），我们一起来分享一下： 

+ **始于JavaScript，归于JavaScript** 

> TypeScript从今天数以百万计的JavaScript开发者所熟悉的语法和语义开始。使用现有的JavaScript代码，包括流行的JavaScript库， 并从JavaScript代码中调用TypeScript代码； 
>
> TypeScript可以编译出纯净、 简洁的JavaScript代码，并且可以运行在任何浏览器上、Node.js环境中和任何支持ECMAScript 3（或 更高版本）的JavaScript引擎中； 

+ **TypeScript是一个强大的工具，用于构建大型项目** 

> 类型允许JavaScript开发者在开发JavaScript应用程序时使用高效的开发工具和常用操作比如静态检查和代码重构； 
>
> 类型是可选的，类型推断让一些类型的注释使你的代码的静态验证有很大的不同。类型让你定义软件组件之间的接口和洞察现有 JavaScript库的行为

+ **JavaScript库的行为；** 

> TypeScript提供最新的和不断发展的JavaScript特性，包括那些来自2015年的ECMAScript和未来的提案中的特性，比如异步功能和 Decorators，以帮助建立健壮的组件；
>
> 这些特性为高可信应用程序开发时是可用的，但是会被编译成简洁的ECMAScript3（或更新版本）的JavaScript；



### 2.2 众多项目采用TypeScript

正是因为有这些特性，TypeScript目前已经在很多地方被应用： 

> Angular源码在很早就使用TypeScript来进行了重写，并且开发Angular也需要掌握TypeScript； 
>
> Vue3源码也采用了TypeScript进行重写，在前面阅读源码时我们看到大量TypeScript的语法； 
>
> 包括目前已经变成最流行的编辑器VSCode也是使用TypeScript来完成的； 
>
> 包括在React中已经使用的ant-design的UI库，也大量使用TypeScript来编写； 
>
> 目前公司非常流行Vue3+TypeScript、React+TypeScript的开发模式； 
>
> 包括小程序开发，也是支持TypeScript的；



### 2.3 大前端的发展趋势

大前端是一群最能或者说最需要折腾的开发者： 

+ 客户端开发者：从Android到iOS，或者从iOS到Android，到RN，甚至现在越来越多的客户端开发者接触前端 相关知识（Vue、React、Angular、小程序）； 

+ 前端开发者：从jQuery到AngularJS，到三大框架并行：Vue、React、Angular，还有小程序，甚至现在也要 接触客户端开发（比如RN、Flutter）； 

+ 目前又面临着不仅仅学习ES的特性，还要学习TypeScript； 

+ 新框架的出现，我们又需要学习新框架的特性，比如vue3.x、react18等等； 

但是每一样技术的出现都会让惊喜，因为他必然是解决了之前技术的某一个痛点的，而TypeScript真是解决了 JavaScript存在的很多设计缺陷，尤其是关于类型检测的。 

并且从开发者长远的角度来看，学习TypeScript有助于我们前端程序员培养 类型思维，这种思维方式对于完成大 型项目尤为重要。



## 3、TypeScript的编译环境

### 3.1 安装

+ TypeScript最终会被编译成JavaScript来运行，所以我们需要搭建对应的环境： 

+ 我们需要在电脑上安装TypeScript，这样就可以通过TypeScript的Compiler将其编译成JavaScript；

```
# 安装命令
npm install typescript -g
# 查看版本
tsc --version
```



![image-20230725152543595](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230725152543595.png)

### 3.2 步骤

+ 第一步：通过tsc编译TypeScript成JavaScript代码； 

+ 第二步：在**浏览器**或者**Node环境**下运行JavaScript代码；

```
tsc .\01_Hello_TypeScript.ts  #对其进行编译，编译成为js文件，然后通过浏览器环境进行运行
```



##  4、TypeScript的运行环境

> 如果我们每次为了查看TypeScript代码的运行效果，都通过经过两个步骤的话就太繁琐了： 
>
> + 第一步：通过tsc编译TypeScript到JavaScript代码； 
> + 第二步：在浏览器或者Node环境下运行JavaScript代码； 

是否可以简化这样的步骤呢？ 

+ 比如编写了TypeScript之后可以直接运行在浏览器上？ 

+ 比如编写了TypeScript之后，直接通过node的命令来执行？ 

上面我提到的两种方式，可以通过两个解决方案来完成： 

+ 方式一：通过webpack，配置本地的TypeScript编译环境和开启一个本地服务，可以直接运行在浏览器上； 

+ 方式二：通过ts-node库，为TypeScript的运行提供执行环境； 

方式一：webpack配置可以自行查看对应的文章； 

https://mp.weixin.qq.com/s/wnL1l-ERjTDykWM76l4Ajw



### 方案一：使用ts-node

+ 步骤1：安装ts-node，可以对TypeScript.ts进行编译，在node上进行运行

```
  npm install ts-node -g
npm install tslib @types/node -g #ts-node需要依赖 tslib 和 @types/node 两个包
```

+ 步骤2：可以通过ts-node运行ts文件了

```
ts-node math.ts
```



### 方案二：通过webpack搭建一个ts环境

```
npm init #创建一个package.json文件
npm install webpack webpack-cli -D #安装webpack
```

+ 新建一个webpack.config.js的文件
+ 在package.json文件中创建一个脚本执行webpack

![](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230725155949552.png)

+ 到时就会进行打包，然后加载配置文件webpack.config.js



```js
const path = require('path')

module.exports = {
  entry:"./src/main.ts",
  output:{
    path:path.resolve(__dirname,"./dist"),
    filename:"bundle.js"
  }
}
```



![image-20230725161059193](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230725161059193.png)



```
npm install ts-loader typescript -D
```



+ 在配置文件中编写匹配规则

```
module.exports = {
  entry:"./src/main.ts",
  output:{
    path:path.resolve(__dirname,"./dist"),
    filename:"bundle.js"
  },
  module:{
    rules:[
      {
        test:/\.ts$/,
        loader:"ts-loader"
      }
    ]
  }
}
```



![image-20230725161633124](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230725161633124.png)



```
 tsc --init #生成tsconfig.json文件
```



![image-20230725164144763](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230725164144763.png)



+ 配置extension，找文件是会自动加上.ts

```
module.exports = {
  entry:"./src/main.ts",
  output:{
    path:path.resolve(__dirname,"./dist"),
    filename:"bundle.js"
  },
  resolve:{
    extensions:[".ts"]
  },
  module:{
    rules:[
      {
        test:/\.ts$/,
        loader:"ts-loader"
      }
    ]
  }
}
```



+ 每次要进行npm run build进行打包麻烦,然后手动引入

```
<script src="./dist/bundle.js"></script> 
```



```
npm install webpack-dev-server -D
```



```
npm install html-webpack-plugin -D
```



+ devSever中有依赖js文件

![image-20230725170523197](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230725170523197.png)





## 5、变量的声明

+ 在TypeScript中定义变量需要指定 标识符 的类型。

+ 所以完整的声明格式如下： 

  + 声明了类型后TypeScript就会进行类型检测，声明的类型可以称之为类型注解；

  ```
  var/let/const 标识符: 数据类型 = 赋值;
  ```

<img src="https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230726092502478.png" alt="image-20230726092502478" style="zoom: 67%;" />

+ 注意：这里的string是小写的，和String是有区别的 

+ string是TypeScript中定义的字符串类型，String是ECMAScript中定义的一个类



## 6、JavaScript类型

### 6.1 number类型

+ 数字类型是我们开发中经常使用的类型，TypeScript和JavaScript一样，不区分整数类型（int）和浮点型 （double），统一为number类型。

+ ES6新增了二进制和八进制的表示方法，而TypeScript也是支持二进制、八进制、十 六进制的表示：

```ts
let num1:number = 100 //十进制
let num2:number = 0b100 //二进制
let num3:number = 0o100 //八进制
let num4:number = 0x100 //十六进制

console.log(num1,num2,num3,num4);
```



### 6.2 boolean类型

+ boolean类型只有两个取值：true和false

```ts
let flag:boolean = true
flag = 20>30
console.log(flag);
```



### 6.3 string类型

+ string: TypeScript中的字符串类型
+ String: JavaScript的字符串包装类的类型
+ ES6的模板字符串来拼接变量和字符串

```ts
// 默认情况下, 如果可以推导出对应的标识符的类型时, 一般情况下是不加
const named = "tjj"
const age = 18
const height = 1.88

let message = `name:${named} age:${age} height:${height}`
console.log(message);
```



### 6.4 Array类型

两种方式：

```ts
// array类型
const numes1:Array<string> = [] // 不推荐(react jsx中是有冲突   <div></div>)
const numes2:string[] = [] // 推荐

// 如果添加其他类型就会报错
numes1.push(123)
```



### 6.5 Object类型

+ 从myinfo中我们不能获取数据，也不能设置数据：

```ts
const info:object = {
  name: "why",
  age: 18
}
// 不能设置数据和修改数据
info.name = 'tjj'

console.log(info.name)
```



### 6.6 null和undefined类型

+ 在 JavaScript 中，undefined 和 null 是两个基本数据类型。 

+ 在TypeScript中，它们各自的类型也是undefined和null，也就意味着它们既是实际的值，也是自己的类型

```ts
let n1: null = null
let n2: undefined = undefined
```



### 6.7 symbol类型

在ES5中，如果我们是不可以在对象中添加相同的属性名称的

通常我们的做法是定义两个不同的属性名字：比如identity1和identity2

```ts
// 报错
const person= {
  identity:"程序员",
  identity:"老师"
}
```

但是我们也可以通过symbol来定义相同的名称，因为Symbol函数返回的是不同的值：

```ts
const title1 = Symbol("title")
const title2 = Symbol('title')

const info = {
  [title1]: "程序员",
  [title2]: "老师"
}
```



## 7、JavaScript数据类型

### 7.1 any类型

在某些情况下，我们确实无法确定一个变量的类型，并且可能它会发生一些变化，这个时候我们可以使用any类型（类似 于Dart语言中的dynamic类型）。 

any类型有点像一种讨巧的TypeScript手段： 

+ 我们可以对any类型的变量进行任何的操作，包括获取不存在的属性、方法； 
+ 我们给一个any类型的变量赋值任何的值，比如数字、字符串的值； 

```ts
let a: any = "why"
a = 123
b = true
const aArray: any[] = ["why", 12, 45]
```

如果对于某些情况的处理过于繁琐不希望添加规定的类型注解，或者在引入一些第三方库时，缺失了类型注解，这个时候 我们可以使用any： 

+ 包括在Vue源码中，也会使用到any来进行某些类型的适配；



### 7.2 unknown类型

+ unknown是TypeScript中比较特殊的一种类型，它用于描述类型不确定的变量。

```ts
function foo() {
  return "abc"
}
function bar() {
  return 123
}

let flag1 = true
let result:unknown
if(flag1) {
  result = foo()
} else {
  result = bar()
}

console.log(result);

// unknown类型只能赋值给any和unknown类型
// any类型可以赋值给任意类型
let message: string = result
let num: number = result
```



### 7.3 void类型

+ void通常用来指定一个函数是没有返回值的，那么它的返回值就是void类型： 
  + 我们可以将null和undefined赋值给void类型，也就是函数可以返回null或者undefined 


```ts
function sum(num1: number, num2: number) {
  console.log(num1 + num2)
}
```



+ 这个函数我们没有写任何类型，那么它默认返回值的类型就是void的，我们也可以显示的来指定返回值是void：

```ts
function sum(num1: number, num2: number):void {
  console.log(num1 + num2)
}

sum(20, 30)
```



### 7.4 never类型

never 表示**永远不会发生值的类型**，比如一个函数： 

+ 如果一个函数中是一个死循环或者抛出一个异常，那么这个函数会返回东西吗？ 
+ 不会，那么写void类型或者其他类型作为返回值类型都不合适，我们就可以使用never类型； 

```ts
function foo(): never {
  // 死循环
  while(true) {

  }
}

function bar(): never {
  throw new Error()
}
```



never有什么样的应用场景呢? 举一个例子，它用到了联合类型：

```ts
function handleMessage(message: string | number | boolean) {
  switch (typeof message) {
    case 'string':
      console.log("string处理方式处理message")
      break
    case 'number':
      console.log("number处理方式处理message")
      break
    default:
      const check: never = message
  }
}

handleMessage("abc")
handleMessage(123)

// 张三
handleMessage(true)
```

<img src="https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230726104016425.png" alt="image-20230726104016425" style="zoom: 80%;" />



### 7.5 tuple类型

tuple是元组类型，很多语言中也有这种数据类型，比如Python、Swift等

```ts
const myinfo:[string,number,number] = ["why",18,1.88]
const namess = myinfo[0]
console.log(myinfo.length);
```

那么tuple和数组有什么区别呢？ 

+ 首先，数组中通常建议存放相同类型的元素，不同类型的元素是不推荐放在数组中。（可以放在对象或者元组 中） 

+ 其次，元组中每个元素都有自己特性的类型，根据索引值获取到的值可以确定对应的类型；

  9 

#### Tuples的应用场景

```ts
// hook: useState
// const [counter, setCounter] = {counter: , setCounter:}

function useState<T>(state: T) {
  let currentState = state
  const changeState = (newState: T) => {
    currentState = newState
  }
  const info: [string, number] = ["abc", 18]
  const tuple: [T, (newState: T) => void] = [currentState, changeState]
  return tuple
}

const [counter, setCounter] = useState(10);
setCounter(1000)
const [title, setTitle] = useState("abc")
const [flag, setFlag] = useState(true)


// type MyFunction = () => void
// const foo: MyFunction = () => {}
```



### 4.6 对象

```ts
function printPoint(point:{x:number,y:string,z?:number}) {
  console.log(point.x);
  console.log(point.y);
  console.log(point.z);
  
}

printPoint({x:123,y:"abc"})
printPoint({x:123,y:"abc",z:123})
```



### 4.7 联合类型

```ts
// number|string 联合类型
function printID(id: number|string|boolean) {
  // 使用联合类型的值时, 需要特别的小心
  // narrow: 缩小
  if (typeof id === 'string') {
    // TypeScript帮助确定id一定是string类型
    console.log(id.toUpperCase())
  } else {
    console.log(id)
  }
}

printID(123)
printID("abc")
printID(true)
```





### 5.1 可选类型和联合类型关系

```ts
// 让一个参数是可选的
// 一个参数一个可选类型的时候, 它其实类似于是这个参数是 类型|undefined 的联合类型
function foo(messgae?:string) {
  console.log(messgae);
  
}


function foo(messgae:string|undefined) {
  console.log(messgae);
  
}
foo(undefined)
```



## 5、 其他

### 5.1 类型别名

```ts
// type 用于定义类型别名
type IDType = string | number | boolean
type PointType = {
  x:string,
  y:number,
  z:string
}

function printId(idd:IDType) {
  console.log(idd);
  
}

function printPoint(pointt:PointType) {
  
}
```



### 5.2 类型断言as

有时候TypeScript无法获取具体的类型信息，这个我们需要使用类型断言（Type Assertions）。 

比如我们通过 document.getElementById，TypeScript只知道该函数会返回 HTMLElement ，但并不知道它 具体的类型：

```ts
// 1.类型断言 as
const el = document.getElementById("why") as HTMLImageElement
el.src = "url地址"

// 2.另外案例: Person是Student的父类
class Person {

}

class Student extends Person {
  studying() {

  }
}

function sayHello(p: Person) {
  (p as Student).studying()
}

const stu = new Student()
sayHello(stu)
```

TypeScript只允许类型断言转换为 更具体 或者 不太具体(指的是any和unknow) 的类型版本，此规则可防止不可能的强制转换：

```ts
//  3.了解 可以将一个类型转换为any或者是unknown类型
const message7 = "hello world"
const num7:number = (message7 as any) as number
```







### 5.3 非空类型断言

当我们编写下面的代码时，在执行ts的编译阶段会报错： 

+ 这是因为传入的message有可能是为undefined的，这个时候是不能执行方法的；

但是，我们确定传入的参数是有值的，这个时候我们可以使用非空类型断言： 

+ 非空断言使用的是 ! ，表示可以确定某个标识符是有值的，跳过ts在编译阶段对它的检测；

```ts
// message? -> undefined | string
function printMessageLength(message?: string) {
  // if (message) {
  //   console.log(message.length)
  // }
  // vue3源码
  console.log(message!.length)
}

printMessageLength("aaaa")
printMessageLength("hello world")
```



### 5.4 可选链

```ts
type person = {
  name:string,
  friend?:{
    name:string,
    age:number,
    girlfriend?:{
      name:'why'
    }
  }
}

const personInfo:person = {
  name:'tjj',
  friend:{
    name:"rl",
    age:18,
  }
} 


// 1.如果要获取一个可选类型的值，可以采用非空断言，确定此时这个值一定存在
console.log(personInfo.friend!.name);
// 2.但我们不能每次都去源代码确认这个值是否存在，如果采用条件判断，太麻烦
if(personInfo.friend) {
  console.log(personInfo.friend.name);
}
//3.可以采用可选链接,如果没有值时会打印undefined
console.log(personInfo.friend?.name);
console.log(personInfo.friend?.girlfriend?.name);
```



### 5.5 !!与??运算符

```ts
const message3 = "hello world"

// !取反运算符，但是为了保持与原来的布尔值不变采用!!
const flag3 = !!message3
console.log(flag3);

```



```ts
let message4:string|null = null
// 类似于三目运算符，如果messgae4为null则将后面的默认值赋值过去
const content = message4 ?? "你好，李银河"
console.log(content);
```



### 5.6 字面量类型

```ts
// "hello world"也是可以作为类型的，叫做字面量类型
const message:"hello world" = "hello world"

// 字面量类型的意义必须结合联合类型
type Alignment = "left" |"right" |"center"
let align:Alignment = "left"

align = "center"
```



![image-20230728160504049](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230728160504049.png)



+ 字面量推理

```ts
// 方法三
type request ={
  url:string,
  method:Method
}

let options:request = {
  url:"http://www.com",
  method:"POST"
}

// 方法一
request(options.url,options.method as Method )

// 方法二
let options = {
  url:"http://www.com",
  method:"POST"
} as const
```



### 5.7 类型缩小

```ts
// 1.typeof的类型缩小
type IDType = number | string
function printID(id:IDType) {
  if(typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}

// 2.平等的类型缩小（=== == != !=/ switch)
type Direction = "left"|"right"|"top"|"bottom"

function printDirection(direction:Direction) {
  // if(direction === "left") {
  //   console.log(direction);
  // } else if()

  // switch(direction) {
  //   case 'left':
  //     console.log(direction);
  //     break;
  // }
}

// 3.instanceof
function printTime(time:string | Date) {
  // time是Date中的一个实例
  if(time instanceof Date) {
    console.log(time.toUTCString())
  }
}
```



## 6、函数详解

### 函数的类型

#### 参数

声明函数时，可以在每个参数后添加类型注解，以声明函数接受的参数类型

```ts
function sum(num1:number,num2:number) {
    return num1+num2
}
```

#### 返回值

我们也可以添加返回值的类型注解，这个注解出现在函数列表的后面：

```ts
function sum(num1:number,num2:number):number {
    return num1+num2
}
```



和变量的类型注解一样，我们通常情况下不需要返回类型注解，因为TypeScript会根据 return 返回值推断函数的 返回类型： p某些第三方库处于方便理解，会明确指定返回类型，但是这个看个人喜好；

#### 匿名函数的参数

匿名函数与函数声明会有一些不同： 

+ 当一个函数出现在TypeScript可以确定该函数会被如何调用的地方时； 
+ 该函数的参数会自动指定类型；

```ts
const messages = ['abc',"bbc","dda"]
// item根据上下文的环境推导出来的, 这个时候可以不添加的类型注解
// 上下文中的函数: 可以不添加类型注解
messages.forEach((item) =>{
  console.log(item.split(""));
  
})
```

我们并没有指定item的类型，但是item是一个string类型： 

+ 这是因为TypeScript会根据forEach函数的类型以及数组的类型推断出item的类型； 
+ 这个过程称之为上下文类型（contextual typing），因为函数执行的上下文可以帮助确定参数和返回值的类型；

函数类型

```ts
// 1.函数作为参数时，在参数中如何编写类型

type FnType = ()=> void
function foo(fn:FnType) {
  fn()
}

// 2.定义常量时，编写函数的类型
type AddFnType = (num1: number, num2: number) => number
const add:AddFnType = (a1:number,a2:number)=>{
  return a1+a2
}

console.log(add(1,2));
```



```ts
function calc(n1:number,n2:number,fn:(num1:number,num2:number) => number) {
  return fn(n1,n2)
}

// 这里function类似于匿名传参，可以不用写参数的类型
const result = calc(20,30,function(a1,a2) {
  return a1+a2
})
console.log(result);

calc(20, 30, function(a1,a2) {
  return a1*a2
})
```



```ts
// 必传参数——有默认值参数-可选参数
function foo(x: number, y: number=20) {
  console.log(x,y);
}
foo(23)
```



函数的默认参数

```ts
function sum(initalNum: number, ...nums: number[]) {
  let total = initalNum
  for (const num of nums) {
    total += num
  }
  return total
}
console.log(sum(20, 30))
console.log(sum(20, 30, 40))
```





### 函数的重载

#### 联合类型



```ts
/**
 * 通过联合类型有两个缺点:
 *  1.进行很多的逻辑判断(类型缩小)
 *  2.返回值的类型依然是不能确定
 */
function add(a1:number | string, a2:number|string) {
  if(typeof a1 === "number" && typeof a2 === "number") {
    return a1 + a2
  } else if(typeof a1 === "string" && typeof a2 === "string") {
    return a1 + a2
  }
}

console.log(add(10,20));
console.log(add('why',"tjj"));
```



### 函数的重载

```ts
// 函数的重载: 函数的名称相同, 但是参数不同的几个函数, 就是函数的重载
function add(num1:number,num2:number):number;
function add(num1:string,num2:string):string

function add(num1:any, num2:any): any {
  if(typeof num1 === "string") {
    return num1.length + num2.length
  }
  return num1+num2
}

const result = add(20,30)
const result2 = add('tjj','why')
console.log(result);
console.log(result2);

// 在函数的重载中, 实现函数是不能直接被调用的
// add({name: "why"}, {age: 18})


export{}
```



函数重载案例

```ts
// 返回字符串或数组的长度
// 实现方式一：联合类型
function getLength(args:string | any[]) {
  return args.length
}
console.log(getLength("abc"));
console.log(getLength([123,456,555,4]));

// 实现方式二：函数的重载
function getLength(args: string): number
function getLength(args: any[]): number

function getLength(args: any): number {
  return args.length
}

console.log(getLength("abc"))
console.log(getLength([123, 321, 123]))
```





## 类的使用

### 类的定义

```ts
class Person {
  name:string
  age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  eating() {
    console.log(this.name + "eating");
    
  }
}

const p = new Person("tjj",13)
console.log(p.name);
p.eating()
```



### 类的继承

```ts
class Person {
  name:string = 'tjj'
  age:number = 0

  eating() {
    console.log('eating');
  }
}

class Student extends Person {
  sno: number = 123

  studying() {
    console.log("studying");
  }
}

class Teacher extends Person {
  title:string = ''
  teaching() {
    console.log('teaching');
    
  }
}

const stu = new Student()
stu.name='why'
console.log(stu.name);
stu.eating()
```



+ 在创建的时候进行初始化,子类如何继承父类的构造器函数

```ts
class Person {
  name:string
  age:number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  eating() {
    console.log('eating');
  }
}

class Student extends Person {
  sno: number

  constructor(name:string, age: number, sno: number) {
    // super调用父类的构造器
    super(name,age)
    this.sno = sno
  }

  studying() {
    console.log("studying");
  }
}

const stu = new Student("why", 18, 111)
console.log(stu.name);
console.log(stu.age);
console.log(stu.sno);
stu.eating()
```



### 多态

+ 多态中一定有继承或接口
+ 多态的目的是为了写出更加具备通用性的代码

```ts
class Animal {
  action() {
    console.log("animal action");
    
  }
}

class Dog extends Animal {
  action() {
    console.log("dog running");
  }
}

class Fish extends Animal {
  action() {
    console.log("Fish swimming");
  }
}

class Bird extends Animal {
  action() {
    console.log("dog flying");
  }
}

// 传入的参数是数组类型，每个元素是一个Animal类型
function makeAction(animals: Animal[]) {
  animals.forEach(animal => {
    animal.action()
  })
}

makeAction([new Dog(), new Fish(), new Bird()])
```



### 成员修饰符

```TS
class Person {
  private name: string = "0"

  getName() {
    return this.name
  }
  setName(newName: string) {
    this.name = newName
  }

}

const p = new Person()
p.setName('tjj')
console.log(p.getName());
```



+ 子类可以访问父类中的protect属性

```ts
class Person {
  protected name: string = "123"
}

class Student extends Person {
  getName() {
    return this.name
  }
}

const stu = new Student()
console.log(stu.getName());
```



### readonly属性

```ts
class Person {
  // 1.只读属性可以在构造器中赋值，赋值之后就不能再修改
  // 2.属性本身不能进行修改，但是如果它是对象类型，对象中的属性是可以修改（类似于const）
  readonly name: string
  readonly friend?: Person
  age?: number
  constructor(name:string, friend?: Person) {
    this.name = name 
    this.friend = friend
  }
}


const p = new Person("why",new Person("kobe"))
console.log(p.name);
console.log(p.friend);

// 属性本身不能进行修改，但是如果它是对象类型，对象中的属性是可以修改（类似于const）
if(p.friend) {
  p.friend.age = 30
}
console.log(p.friend);

```



### getter/setter

+ 从ES5开发，提供了`getter`和`setter` 可以将属性值的获取和设置分别绑定到方法上，称之为“存取器”。有了getter和setter我们就能够在属性值的变更和获取时实现一些操作。

```ts
class Person {
  // 私有成员变量一般以_开头
  private _name:string
  constructor(name: string) {
    this._name = name
  }

  // 访问器setter/getter
  set name(newName) {
    this._name = newName
  }

  get name() {
    return this._name
  }
}

const p = new Person("why")
p.name = "coderwhy"
console.log(p.name)
```





### 静态成员

+ 静态成员属性可以通过类名去访问
+ 静态成员方法也可以通过类名直接访问

```ts
class Student {
  static time: string = "20:00"

  static attendClass() {
    console.log("去学习");
  }
}

console.log(Student.time);
Student.attendClass()
```





### 抽象类

+ 抽象函数可以没有实现体
+ 抽象方法必须存在于抽象方法中
+ 抽象类不能被实例化

+ 将函数写成抽象方法的目的在于防止new一个对象传入，实例化一个对象，传入参数
+ new Shape传进来，但shape类中的getArea()方法没有实现

```ts
// 计算传入的图形，计算面积
// 要具备通用性，根据传入图形的不同，计算面积
// shape类型必须图形一类，不能是any
function makeArea(shape: Shape) {
  return shape.getArea()
}

// 为了防止makeArea(new Shape())情况的发生
// 这里的父类应该是一个抽象类，不进行具体实现,而抽象类是不能进行实例化的
// 抽象函数可以没有实现体
abstract class Shape {
  abstract getArea(): number
}


class Rectangle extends Shape {
  private width: number
  private height: number

  constructor(width: number, height: number) {
    // 初始化父类中的属性，即使父类中没有属性
    super()
    this.width = width
    this.height = height
  }

  getArea() {
    return this.width * this.height
  }
}

class Circle extends Shape {
  private r: number
  constructor(r: number) {
    // 初始化父类中的属性
    super()
    this.r = r
  }

  getArea() {
    return this.r * this.r * 3.14
  }
}

const rectangele = new Rectangle(20, 30)
const circle = new Circle(10)

console.log(makeArea(rectangele));
console.log(makeArea(circle));
```



### 类的类型

```ts
class Person {
  name: string = "123"
  eating() {

  }
}

// 可以不进行初始化对象，而是写成类的类型
const p: Person = {
  name:'tjj',
  eating() {

  }
}
```



+ 应用场景

```ts
function printPerson(p: Person) {
  console.log(p.name);
}

printPerson(new Person())
printPerson({name:'tjj', eating: function() {}})
```



## 8、接口的使用

### 声明对象类型

```ts
// 通过类型（Type）别名来声明对象类型
type InfoType = {name: string, age: number}
```



```ts
// 另一种方式声明对象类型：接口interface
// 在其中可以定义可选类型
// 也可以定义只读属性
interface IInfoType {
  readonly name: string
  age: number,
  friend?: {
    name: string
  }
}

const info: IInfoType = {
  name:'tjj',
  age:12,
  friend:{
    name:'jj'
  }
}
console.log(info.friend?.name);
```



### 索引类型

```ts
// 通过interface来定义索引类型
interface IndexLanguage {
  [index: number]: string
}

const fontLanguage: IndexLanguage = {
  0: "HTML",
  1: "CSS",
  2: "JavaScript",
  3: "Vue"
}
```



### 函数类型

```ts
// type CalcFn = (n1: number, n2: number) => number
// function calc(num1: number, num2: number, calcFn:(n1: number, n2: number) => number) {
//   return calcFn(num1, num2)
// }

// 可调用的接口
interface CalcFn {
  (n1: number, n2: number): number
}

function calc(num1: number, num2: number, calcFn: CalcFn) {
  return calcFn(num1, num2)
}

const add:CalcFn =  (num1, num2) => {
  return num1 + num2
}

console.log(calc(20, 30, add));
```



### 接口的继承



### 交叉类型





+ 一个类可以实现多个接口
+ 继承：只能实现单继承
+ 接口可以用作变量类型
+ 也可以用类来进行实现
+ 这样写不灵活，只能传入Fish类型

```ts
// 编写一些公共的API：面向接口编程
function swimAction(swimable: Fish) {
  swimable.swimming()
  swimable.eating()
}

// 所有实现了接口的类对应的对象，都是可以传入的
swimAction(new Fish());
```



+ 面向对象编程的前提，让这个类去实现接口

```TS
interface ISwim {
  swimming: () => void
}

interface IEat {
  eating: () => void
}

class Animal {

}

class Fish extends Animal implements ISwim, IEat {
  swimming() {
    console.log("Fish Swimming");
  }

  eating() {
    console.log("Fish Eating");
  }
}

class Person implements ISwim {
  swimming() {
    console.log("person swimming");
  }
}

// 编写一些公共的API：面向接口编程
function swimAction(swimable: ISwim) {
  swimable.swimming()

}

// 所有实现了接口的类对应的对象，都是可以传入的
swimAction(new Fish());
swimAction(new Person());
```





### interface和type的区别

+ 都可以用来定义对象类型

+ 函数类型、联合类型一般都用type来定义（非对象类型）
+ 如果都是对象类型
+ interface可以定义相同的属性名称，而type不行
+ 重复定义接口会进行合并



+ 默认内置的window类型，用借口定义window会和内置的Window类型进行合并





+ 对象的引用进行赋值
+ 类型检测在进行引用赋值时会进行一个擦除操作

![image-20230801193348349](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230801193348349.png)



+ 意义是可以允许当一个变量中含有多余的属性时，仍然可以进行值传递

```ts
// 使用举例
function printInfo(person:IPerson) {
  console.log(person);
  
}

// 代码报错
// printInfo({
//   name: "why",
//   age: 18,
//   height: 1.88,
//   address: "广州市"
// })

const info = {
  name: "why",
  age: 18,
  height: 1.88,
  address: "广州市"
}
printInfo(info)
```





### 枚举类型

```ts
// type Direction = "left" | "Right" | "Top" | "Bottom"

enum Direction {
  LEFT,
  RIGHT,
  TOP,
  BOTTOM
}

function turnDirection(direction: Direction) {
  switch (direction) {
    case Direction.LEFT:
      console.log("改变角色的方向向左")
      break;
    case Direction.RIGHT:
      console.log("改变角色的方向向右")
      break;
    case Direction.TOP:
      console.log("改变角色的方向向上")
      break;
    case Direction.BOTTOM:
      console.log("改变角色的方向向下")
      break;
    default:
      const foo: never = direction;
      break;
  }
}

turnDirection(Direction.LEFT)
turnDirection(Direction.RIGHT)
turnDirection(Direction.TOP)
turnDirection(Direction.BOTTOM)
```



+ 枚举类型中也存在值





## 9、泛型的使用

![image-20230801201322161](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230801201322161.png)



```ts
// 类型参数化

// 在定义这个函数时，不决定这些参数的类型
// 而是让调用者以参数的形式告知，我这里的函数参数应该是什么类型
function sum<Type>(num: Type) {
}

// 1.调用方式一：明确的传入类型
sum<number>(20)
sum<{name: string}>({name:'why'})
sum<any[]>(["abc"])

// 2.调用方式二：类型推到
// 推到出来的是一个字面量类型
sum(50)
sum("abc")
```



多个泛型

```ts
// 可选参数和剩余参数类型
function foo<T, E, O> (arg1: T, arg2: E, arg3?: O, ...args: T[]) {

}
foo<number, string, boolean>(10, "abc", true)
```



```ts
interface IPerson<T1 = string,T2 = number> {
  name:T1,
  age:T2
}

const p: IPerson = {
  name:"tjj",
  age:13
}

console.log(p);
```



### 泛型类的使用

```ts
class Point<T>{
  x: T
  y: T
  z: T

  constructor(x: T, y: T, z: T) {
    this.x = x
    this.y = y
    this.z = z
  }
}
// 默认类型推导
const p1 = new Point("123","1" ,"3")
const p2 = new Point<string>("1.33.2", "2.22.3", "4.22.1")
const p3: Point<string> = new Point("1.33.2", "2.22.3", "4.22.1")

const nums1: string[] = ["abc", "cba", "nba"]
const nums2: Array<string> =  ["abc", "cba", "nba"] // 不推荐(react jsx <>)

export{}
```





### 泛型类的类型约束

```ts
interface ILength {
  length: number
}

function getLength<T extends ILength> (arg: T) {
  return arg.length
}

// 只能传递带有length属性的参数
getLength("abc")
getLength(["abc", "cba"])
getLength({length: 100})
```



## 10、模块化



### 命名空间

+ 命名空间在TypeScript早期时，称之为内部模块，主要目的是将一个模块内部再进行作用域的划分，防止一些命名 冲突的问题。

+ format.ts文件中
+ 2014出来TypeScript

```ts
export namespace time {
  export function format(time: string) {
    return "2222-02-22"
  }

  export function foo() {

  }

  export let name: string = "abc"
}

export namespace price {
  export function format(price: number) {
    return "99.99"
  }
}
```



+ main.ts文件中使用

```ts
import {time,price} from './utils/format'

console.log(time.format("123"));
console.log(price.format(123));
```



+ ts中能不能找到模块或者组件库，与它有没有被声明是有关的



### 类型查找

之前我们所有的typescript中的类型，几乎都是我们自己编写的，但是我们也有用到一些其他的类型： 

![image-20230802094603309](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230802094603309.png)

+ 大家是否会奇怪，我们的HTMLImageElement类型来自哪里呢？甚至是document为什么可以有getElementById的方 法呢？ 
  + 其实这里就涉及到typescript对类型的管理和查找规则了。 

```
npm install lodash
```



+ 同样都是第三方库，axios就能识别，而lodash就会报错

![image-20230802100334520](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230802100334520.png)

+ typescript能不能找到对应的模块，变量，与其有没有被声明是有关的

+ 我们这里先给大家介绍另外的一种typescript文件：.d.ts文件 
  + 我们之前编写的typescript文件都是 .ts 文件，这些文件最终会输出 .js 文件，也是我们通常编写代码的地方； 
  + 还有另外一种文件 **.d.ts 文件**，它是用来做**类型的声明(declare)**。 它仅仅用来做类型检测，告知typescript我们有哪 些类型； 
+ 那么typescript会在哪里查找我们的类型声明呢？ 
  + 内置类型声明； 
  + 外部定义类型声明； /@types/loadash
  + 自己定义类型声明；



### 内置类型声明

内置类型声明是typescript自带的、帮助我们内置了JavaScript运行时的一些标准化API的声明文件； 

+ 包括比如Math、Date等内置类型，也包括DOM API，比如Window、Document等； 

![image-20230802102239488](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230802102239488.png)

内置类型声明通常在我们安装typescript的环境中会带有的； 

+ https://github.com/microsoft/TypeScript/tree/main/lib





### 外部定义类型声明

外部类型声明通常是我们使用一些库（比如第三方库）时，需要的一些类型声明。 

这些库通常有两种类型声明方式： 

+ 方式一：在自己库中进行类型声明（编写.d.ts文件），比如axios 

+ 方式二：通过社区的一个公有库DefinitelyTyped存放类型声明文件 (第三方库和声明文件不在同一个地方时)

  + 该库的GitHub地址：https://github.com/DefinitelyTyped/DefinitelyTyped/ ，包含了许多第三方库的类型声明

  + 该库查找声明安装方式的地址：https://www.typescriptlang.org/dt/search?search= 

  + 比如我们安装react的类型声明： npm i @types/react --save-dev 



### 自定义声明

什么情况下需要自己来定义声明文件呢？ 

情况一：我们使用的第三方库是一个纯的JavaScript库，没有对应的声明文件；比如lodash 

情况二：我们给自己的代码中声明一些类型，方便在其他地方直接进行使用；

+ 编写一个.d.ts文件

```ts
declare module "lodash" {
  export function join(arr: any[]): void
}
```

+ 使用

```ts
import lodash from 'lodash'
console.log(lodash.join(["abc","cda"]));
```



+ 在ts文件中引入图片

```ts
import co2 from './img/co2.png'
```

+ 文件声明

```ts
// 声明文件
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.png'
declare module '*.svg'
declare module '*.gif'
```





```ts
$.ajax({
  
})
```



```ts
// 声明命名空间
declare namespace $ {
  export function ajax(settings: any): any
}
```



声明变量—函数—类



### 声明模块

我们也可以声明模块，比如lodash模块默认不能使用的情况，可以自己来声明这个模块： 

声明模块的语法: declare module '模块名' {}。 

在声明模块的内部，我们可以通过 export 导出对应库的类、函数等；

