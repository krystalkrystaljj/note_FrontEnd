# 邂逅Webpack和打包过程

## 1 认识webpack工具 

事实上随着前端的快速发展，目前前端的开发已经变的越来越复杂了： 

+ 比如开发过程中我们需要通过**模块化的方式**来开发； 
+ 比如也会使用一些高级的特性来加快我们的开发效率或者安全性，比如通过ES6+、TypeScript开发脚本逻辑，通过sass、 less等方式来编写css样式代码； 
+ 比如开发过程中，我们还希望实时的监听文件的变化来并且反映到浏览器上，提高开发的效率； 
+ 比如开发完成后我们还需要**将代码进行压缩、合并**以及其他相关的优化；  等等…. 

但是对于很多的前端开发者来说，并不需要思考这些问题，日常的开发中根本就没有面临这些问题： 

+ 这是因为目前前端开发我们通常都会直接使用三大框架来开发：Vue、React、Angular； 
+ 但是事实上，这三大框架的创建过程我们都是借助于脚手架（CLI）的； 
+ 事实上Vue-CLI、create-react-app、Angular-CLI都是基于webpack来帮助我们支持模块化、less、TypeScript、打包优化 等的；

### webpack究竟是什么

我们先来看一下官方的解释： 

webpack是一个静态的模块化打包工具，为现代的JavaScript应用程序； 

我们来对上面的解释进行拆解： 

+ 打包bundler：webpack可以将帮助我们进行打包，所以它是一个打包工具 
+ 静态的static：这样表述的原因是我们最终可以将代码打包成最终的静态资源（部署到静态服务器）； 
+ 模块化module：webpack默认支持各种模块化开发，ES Module、CommonJS、AMD等； 
+ 现代的modern：我们前端说过，正是因为现代前端开发面临各种各样的问题，才催生了webpack的出现和发展；

### vue项目加载的文件资源

JavaScript的打包： 

+ 将ES6转换成ES5的语法； 
+ TypeScript的处理，将其转换成JavaScript； 

Css的处理： 

+ CSS文件模块的加载、提取； 
+ Less、Sass等预处理器的处理；

资源文件img、font： 

+ 图片img文件的加载； 
+ 字体font文件的加载； 

HTML资源的处理： 

+ 打包HTML资源文件； 

处理vue项目的SFC文件.vue文件；

### Webpack的使用前提

webpack的官方文档是https://webpack.js.org/  webpack的中文官方文档是https://webpack.docschina.org/  DOCUMENTATION：文档详情，也是我们最关注的 ◼ Webpack的运行是依赖Node环境的，所以我们电脑上必须有Node环境  所以我们需要先安装Node.js，并且同时会安装npm；  我当前电脑上的node版本是v16.15.1，npm版本是8.11.0（你也可以使用nvm或者n来管理Node版本）；  Node官方网站：https://nodejs.org/

### Webpack的安装

webpack的安装目前分为两个：webpack、webpack-cli 

那么它们是什么关系呢？ 

+ 执行webpack命令，会执行node_modules下的.bin目录下的webpack； 
+ webpack在执行时是依赖webpack-cli的，如果没有安装就会报错； 
+ 而webpack-cli中代码执行时，才是真正利用webpack进行编译和打包的过程； 
+ 所以在安装webpack时，我们需要同时安装webpack-cli（第三方的脚手架事实上是没有使用webpack-cli的，而是类似于自 己的vue-service-cli的东西）

## 2 webpack基本打包 

### webpack的依赖图

webpack到底是如何对我们的项目进行打包的呢？  事实上webpack在处理应用程序时，它会根据命令或者配置文件找到入口文件；  从入口开始，会生成一个 依赖关系图，这个依赖关系图会包含应用程序中所需的所有模块（比如.js文件、css文件、图片、字 体等）；  然后遍历图结构，打包一个个模块（根据文件的不同使用不同的loader来解析）；

## 3 webpack配置文件 

## 4 编写和打包CSS文件 

## 5 编写和打包LESS文件

## 6 postcss工具处理CSS