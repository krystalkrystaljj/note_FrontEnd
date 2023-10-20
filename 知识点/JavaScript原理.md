浏览器内核是由两部分组成，以webkit为例：

WebCore：负责HTML解析、布局、渲染等等相关工作

JavaScriptCore：解析、执行JavaScript代码



另外一个强大的JavaScript引擎就是V8引擎



字节码可以跨平台 windows ios

Java一次编写，到处运行

Java代码也是转成字节码的，装java虚拟机，jvm将字节码转化成当前电脑上cpu可以运行的机器指令，然后才能进行运行



JavaScript源代码->parse ->AST抽象语法树 -> lgnition -> bytecode 字节码（对代码的描述，跨平台的） -> 运行结果

turboFan 将可以优化的代码的字节码转换成优化的机器码对其进行一个优化



V8引擎会将其转换成机器码，进行一个优化

尽量保持一个函数中传入的类型是一致的

ts在某种程度上是可以提高js性能的



**Parse模块**会将JavaScript代码转换成AST（抽象语法树），这是因为解释器并不直接认识JavaScript代码； 

- 如果函数没有被调用，那么是不会被转换成AST的； 

- Parse的V8官方文档：https://v8.dev/blog/scanner



Ignition是一个解释器，会将AST转换成ByteCode

同时会收集TurboFan优化所需要的信息（比如函数的参数类型）

如果函数只调用一次Ignition会解释执行ByteCode



TurboFan是一个编译器，可以将字节码编译为CPU可以直接执行的机器码

+ 如果一个函数被多次调用，那么就会被标记为热点函数，那么就会经过TurboFan转成优化的机器码，提高代码的执行性能
+ 但是，机器码实际上也会被还原为ByteCode，这是因为如果后续执行函数的过程中，类型发生了变化，之前优化的机器码并不能正确地处理运算，就会逆向的转换为字节码



### JavaScript代码执行原理—版本说明

ECMAScript3代码的执行流行的术语和ECMAScript5以及之后的属于会有所区别

+ ECMAScript3的概念学习**JavaScript执行原理、作用域、作用域链、闭包**等概念
+ ECMAScript5中的概念学习**块级作用域、let、const**等概念

事实上，他们只是在对某些概念上的描述不太一样，在整体思路上是一致的。



### 执行上下文

js引擎内部有一个执行上下文栈，它是用于执行代码的调用栈

执行的是全局的代码块

+ 全局的代码块为了执行回构建一个Global Execution Context（GEC)
+ GEC会被放到ECS中执行

GEC被放入到ECS中里面包含两部分的内容：

+ 第一部分：在代码执行前，在parse转成AST的过程中，会将全局定义的变量、函数等加入到GlobalObject中，但是并不会赋值
+ 这个过程也称之为变量的作用域提升



VO对象

每一个执行上下文会关联一个VO（Variable Object 变量对象），变量和函数声明会被添加到这个VO对象中



在执行到过程中执行到一个函数，就会更具函数体创建一个函数执行上下文（FEC），并且压入到EC Stack中

因为每个执行上下文都会关联一个VO，那么函数执行上下文关联的VO是什么？

+ 当一个函数执行上下文时，会创建一个AO对象（Activation Object）
+ 当这个AO对象会使用Arguments作为初始化，并且初始值是传入的参数
+ 这个AO对象会作为执行上下文的VO来存放变量的初始化