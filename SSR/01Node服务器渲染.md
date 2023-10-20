# 一 邂逅SPA和SSR

## 1. SPA渲染原理

## 单页面应用程序

+ 单页面程序（SPA）全称是Single-page application， SPA应用是在客户端呈现的（术语称：CRS）
+ CSR:client side rendering
+ 而整个应用程序的内容都是通过JavaScript动态加载，包括引用程序的逻辑、UI以及与服务器通信相关的所有数据
+ 构建SPA应用常见的库和框架有：React、AngularJS、Vue.js等



客户端渲染原理

？？图



如何理解SSR中的hydrate

https://zhuanlan.zhihu.com/p/323174003



## SPA优缺点

SPA的优点

+ 只需要加载一次
+ SPA应用程序只需要在第一次请求时加载页面，页面切换不需要重新加载，而传统的Web应用程序必须在每次请求时都得加载页面，需要花费更多的时间。因此，SPA页面加载速度要比传统Web应用程序更快。
+ 更好的用户体验
+ SPA提供类似于桌面或移动应用程序的体验。用户切换页面不必重新加载新页面
+ 切换页面只是内容发生了变化，页面并没有重新加载，从而使体验变得更加流畅
+ 可以轻松的构建功能丰富的Web应用程序

SPA的缺点

+ SPA应用默认只返回一个空HTML页面，不利于**SEO（search engine optimization）**
+ 首屏加载资源过大时，一样会**影响首屏的渲染**
+ 也不利于构建复杂的项目，复杂Web应用程序的**大文件可能变得难以维护**



## 2. 爬虫原理

## 爬虫-工作流程

Google爬虫的工作流程分为三个阶段，并非每个网页都会经历三个阶段：

+ 爬取：
  + 爬虫（也称蜘蛛），从互联网上发现各类网页
  + 网页中的外部连接也会被发现
  + 抓取数以十亿被发现网页的内容，如：文本、图片和视频
+ 索引编制：
  + 爬虫程序会分析网页上的文本、图片和视频文件
  + 并将信息存储在大型数据库（索引区）中
  + 例如`<title>元素`和Alt属性、图片、视频等
  + 爬虫会对内容类似的网页归类分组
  + 不符合规则内容和网站会被清理（如：禁止访问或需要权限网站等）
+ 呈现搜索结果：
  + 当用户在Google中搜索时，搜索引擎会根据内容的类型，选择一组网页中最具代表性的网页进行呈现



## 2. SEO优化方案

## 搜索引擎的优化（SEO）

+ 语义性HTML标记
  + 标题用`<h1>`,一个页面只有一个；副标题用`<h2>`到`<h6>`
  + 不要过度使用h标签，多次使用不会怎加SEO
  + 段落用`<p>`，列表用`<ul>`，并且li只放在ul中等等
+ 每个页面需要包含：标题+ 内部链接
  + 每个页面对应的title，同一网站所有页面都有内链可以指向首页
+ 确保链接可供抓取
+ meta标签优化：设置description keywords等
+ 文本标记和img
  + 比如`<b>`和`<strong>`加粗文本的标签，爬虫也会关注到该内容
+ robots.txt文件：规定爬虫可访问您网站上的哪些网址

+ sitemap.xml站点地图：在站点地图列出所有网页，确保爬虫不糊漏掉某些网页



## 静态站点的生成（SSG）

（Client  Side Rendering）

有利于seo的

+ 静态站点生成（SSG）全称：Static Site GEnerate，是预先生成好的静态网址
  + SSG应用一般在构建阶段就已经确定了网址的内容
  + 如果网站的内哦容需要更新了，那必须得重新再次构建和部署
  + 构建SSG应用常见的库和框架有：Vue Nuxt、React Next,js

优点

+ 访问速度非常快，每个页面都是在构建阶段就已经提前生成好了
+ 直接给浏览器返回静态的HTML，也有利于SEO
+ SSG应用依然保持留了SPA应用的特性，比如：前端路由、响应式数据、虚拟DOM

缺点

+ 页面都是静态的，**不利于展示实时性的内容，实时性的更适合SSR**
+ 如果站点更新了，那必须**重新再次构建和部署**



## 2. SSR渲染原理

## 服务器端渲染（SSR）

服务器端渲染全称是：Server Side Render，在服务器端渲染页面，并将渲染好HTML返回给浏览器呈现

SSR应用的页面是在服务器端渲染的，用户每请求一个SSR页面都会在服务器端进行渲染，然后将渲染好的页面，返回给浏览器呈现。

+ 构建SSR应用常见的库和框架有：Vue Nuxt、React Next.js 等（SSR也陈同构应用）
  + 服务端server_boundle.js和客户端client_bundle.js一起构建

服务器端渲染原理

+ Hydration 水合：激活应用程序，可以进行交互



![image-20231016150512231](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231016150512231.png)

爬取网页信息建立索引

网页符合规范，爬虫能够识别的





ssr优点

更快的首屏渲染速度

+ 浏览器显示静态页面的内容要比JavaScript动态生成的内容快得多
+ 当用户访问首页时可即可返回静态页面的内容，而不需要等待浏览器先加载完整个应用程序

更好的seo

+ 爬虫是最擅长爬取静态的HTML页面，服务器端直接返回一个静态的HTML给浏览器
+ 这样有利于爬虫快速抓取网页内容，并编入索引，有利于SEO

SSR应用程序在Hydration之后依然可以保留Web应用程序的交互性。比如：前端路由、响应式数据、虚拟DOM等。

SSR缺点

SSR通常需要对服务器进行更多的API调用，以及在服务器端渲染时需要消耗更多的服务器资源，成本高。

增加了一定的开发成本，用户需要关心哪些代码是运行在服务器端，哪些代码是运行在浏览器端

SSR配置站点的**缓存**通常回避SPA站点要复杂一些



SSR解决方案



+ Vue除了支持开发SPA应用之外，其实也是支持开发SSR应用的
+ 在Vue中创建SSR应用，需要调用createSSRApp函数，而不是createApp
  + createApp：创建应用直接挂载到页面上
  + createSSRApp：创建应用，是在激活的模式下挂载应用
+ 服务端用@Vue/server-render包中的renderToString来进行渲染



# 二.从零搭建SSR应用

### Node Server搭建

+ 需要安装的依赖
+ npm i express
+ npm i -D nodemon 检测是否代码有改变可以重新启动
+ npm i D webpack webpack-cli webpack-node-externals 对node-server进行打包

nodemon：启动Node程序时并监听文件的变化，即刷新

webpack-node-externals：除掉node_modules中所有模块

将返回的内容变为一个应用程序页面

```js
let express = require("express")

let server = express()

server.get('/',(req,res) => {
  res.send(`Hello Node Server`)
})

server.listen(3000, ()=> {
  console.log('start node server on 3000');
})
```



> **404 Not Found（找不到）**
>
> 请求失败，请求所希望得到的资源未被在服务器上发现。没有信息能够告诉用户这个状况到底是暂时的还是永久的。假如服务器知道情况的话，应当使用410状态码来告知旧资源因为某些内部的配置机制问题，已经永久的不可用，而且没有任何可以跳转的地址。404这个状态码被广泛应用于当服务器不想揭示到底为何请求被拒绝或者没有其他适合的响应可用的情况下。出现这个错误的最有可能的原因是服务器端没有这个页面。



对index.js进行打包，创建config文件夹，在下面创建一个wp.config.js文件

```js
let path = require("path")
let nodeExternals = require("webpack-node-externals")
module.exports = {
  target:"node",
  mode:"development",
  entry:"./src/server/index.js",
  output:{
    filename:"server_boundle.js",
    path:path.resolve(__dirname,"../build/server")
  },
  externals:[nodeExternals()], //排除node_module中的包
}
```



在webpack中添加配置，打包命令

```js
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build:server":"webpack --config ./config/wp.config.js--watch",
    "start":"nodemon ./build/server/server_boundle.js",
    "dev":"nodemon ./src/server/index"
  },
```



监听文件是否改动，如果有则重新启动程序

### 







### 将app文件转化为字符串形式的HTML

### vue3+ssr搭建

npm i vue    

npm i vue-loader babel-loader @babel/preset-env -D



##### 第一步：编写App页面

```html
<template>
  <div class="app" style="border: 3px solid pink">
    <h1>App</h1>
    <div>count:{{ count }}</div>
    <button>+</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
const count = ref(100);
function addNumber() {
  count.value += 1;
}
</script>
```



##### 第二步：通过createSSRApp创建一个实例app

调用createSSRApp的API，创建app实例

```js
import { createSSRApp } from "vue";
import App from './App.vue'


// 这里为什么写一个函数来返回app实例呢？
// 通过函数来返回app实例可以保证每个请求都会返回一个新的app实例，来避免跨请求的污染
export default function createAPP() {
  const app = createSSRApp(App)
  return app
}
```



##### 第三步：将app中的内容渲染为string html（后端服务器渲染部分）

![image-20231016161029830](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231016161029830.png)



##### 第四步：添加打包配置

```js
let path = require("path")
let nodeExternals = require("webpack-node-externals")
let { VueLoaderPlugin } = require("vue-loader/dist/index");
module.exports = {
  target:"node",
  mode:"development",
  entry:"./src/server/index.js",
  output:{
    filename:"server_boundle.js",
    path:path.resolve(__dirname,"../build/server")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader:"babel-loader",
        options:{
          presets:["@babel/preset-env"]
        }
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
  resolve: {
    // 配置这个，以后导包遇到如下的文件，不需要编写扩展名了。
    extensions: [".js", ".json", ".wasm", ".jsx", ".jsx", "vue"],
  },
  externals:[nodeExternals()], //排除node_module中的包
}
```

+ 现在渲染出来的页面是静态的页面，需要对其进行激活

### 3.Vue3 SSR + Hydration(水合)

##### 第一步：创建客户端app实例，采用createApp

```js
import { createApp } from "vue";
import App from "../App.vue";
let app = createApp(App)
app.mount("#app")
```

##### 第二步：对client的app进行打包配置

```js
let path = require("path")
let nodeExternals = require("webpack-node-externals")
let { VueLoaderPlugin } = require("vue-loader/dist/index");
module.exports = {
  target:"node",
  mode:"development",
  entry:"./src/server/index.js",
  output:{
    filename:"server_boundle.js",
    path:path.resolve(__dirname,"../build/server")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader:"babel-loader",
        options:{
          presets:["@babel/preset-env"]
        }
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
  resolve: {
    // 配置这个，以后导包遇到如下的文件，不需要编写扩展名了。
    extensions: [".js", ".json", ".wasm", ".jsx", ".jsx", "vue"],
  },

}
```

##### 第三步：在package.json中添加打包脚本

![image-20231016191000778](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231016191000778.png)



##### 第四步：将打包好的client_bundle.js文件放入服务器渲染部分

```js
  res.send(
    `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    </head>
    <body>
      <h1> Vue + Server Side Render</h1>
      <div id="app">${appStringHtml}</div>
      <script src="/client/client_bundle.js"></script>
    </body>
    </html>
    `
  )
```

+ 浏览器拿到这个资源准备解析时遇到script，会发起一个网络请求，去3000端口去寻找这个资源，但是找不着，所以要对静态资源进行一个部署

```js
// 部署静态资源，将build作为一个静态部署的目录
server.use(express.static("build"))
```



+ 关闭提示

![image-20231016200820410](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231016200820410.png)



跨请求状态污染

+ 在SPA中，整个生命周期中只有一个App对象实例或一个Router对象实例或一个store对象实例都是可以的，因为每个用户在使用浏览器访问SPA应用时，应用模块都会重新初始化，这也是一种**单例模式**
+ 然后，在SSR环境下，App应用模块通常只在服务器启动时初始化一次。同一个应用模块会在多个服务器请求之间被复用，而我们的单例状态也一样，也会在多个请求之间被复用，比如：
  + 当某个用户对共享的单例状态进行修改，那么这个状态可能会意外地泄露给另一个在请求的用户
  + 我们把这种情况称为：跨请求状态污染。 
+ 为了避免这种跨请求状态污染，SSR的解决方案是： 
  + 可以在每个请求中为整个应用创建一个全新的实例，包括后面的 router 和全局 store等实例。 
  + 所以我们在创建App 或 路由 或 Store对象时都是使用一个函数来创建，保证每个请求都会创建一个全新的实例。 
  + 这样也会有缺点：需要消耗更多的服务器的资源



## 4.Vue3 SSR 集成 Router

当存在多个页面时，为了避免跨状态污染，采用路由的方式解决

+ 安装的依赖：npm i vue-router --save

webpack的打包配置合并优化

+ 安装：npm i webpack-merge -D



将pinia数据—>json 字符串->存到window.xxx->hydration->json object->pinia

这个函数不确定是客户端调用还是服务端调用



5.Vue3 SSR 集成 Pinia

安装依赖

npm i pinia --save





# 三 邂逅Nuxt3框架



## 1.认识Nuxt3



## 2.环境的搭建



## 3.介绍目录结构



## 4.运行时的配置

















在了解 Nuxt 之前，我们先来了解一下创建一个现代应用程序，所需的技术： 

+ 支持数据双向绑定和组件化（ Nuxt 选择了Vue.js ）。 

+ 处理客户端的导航（ Nuxt 选择了vue-router ）。  支持开发中热模块替换和生产环境代码打包（ Nuxt支持webpack 5和Vite ）。 

+ 兼容旧版浏览器，支持最新的 JavaScript 语法转译（ Nuxt使用esbuild ）。 

+ 应用程序支持开发环境服务器，也支持服务器端渲染 或 API接口开发。 

+ Nuxt 使用 h3来实现部署可移植性（h3是一个极小的高性能的http框架） 可以部署在多个平台
  + 如：支持在 Serverless（无服务，软件的架构模式，腾讯云,云函数）、Workers （cloudFlare 零配置，serverless中的一种）和 Node.js 环境中运行。 

Nuxt 是一个 直观的 Web 框架 

+ 自 2016 年 10 月以来，Nuxt专门负责集成上述所描述的事情 ，并提供前端和后端的功能。 
+ Nuxt 框架可以用来快速构建下一个 Vue.js 应用程序，如支持 CSR 、SSR、SSG 渲染模式的应用等。



## 发展史

Nuxt.js 

+ 诞生于 2016 年 10 月 25号，由 Sebastien Chopin 创建，主要是基于Vue2 、Webpack2 、Node 和 Express。 
+ 在2018 年 1 月 9 日， Sebastien Chopin 正式宣布，发布 Nuxt.js 1.0 版本。 
  + 重要的变化是放弃了对 node < 8 的支持  2018 年 9 月 21 日， ， Sebastien Chopin 正式宣布，发布 Nuxt.js 2.0 版本。 
  + 开始使用 **Webpack 4 及其技术栈**， 其它的并没有做出重大更改。 
+ 2021年8月12日至今，Nuxt.js 最新的版本为：Nuxt.js 2.15.8 

Nuxt3版本： 

+ 经过 16 个月的工作，Nuxt 3 beta 于 2021 年 10 月 12 日发布，引入了**基于 Vue 3**、**Vite** 和 **Nitro( 服务引擎，底层通H3实现的 )** 。 
+ 六个月后， 2022 年 4 月 20 日，Pooya Parsa 宣布 Nuxt 3 的第一个候选版本，代号为“Mount Hope” 
+ **在2022年11月16号， Pooya Parsa 再次宣布 Nuxt3 发布为第一个正式稳定版本。** 
+ 官网地址： https://nuxt.com/



Nuxt3特点

Vue技术栈 

- Nuxt3 是基于 **Vue3 + Vue Router + Vite** 等技术栈，全程 **Vue3+Vite 开发体验（Fast）**。 

 自动导包 

+ Nuxt 会自动导入**辅助函数、组合 API和 Vue API ，无需手动导入**。 
+ 基于规范的目录结构，Nuxt 还可以对自己的组件、 插件使用自动导入。 

 约定式路由（目录结构即路由） 

+ Nuxt 路由基于vue-router，在 pages/ 目录中创建的每个页面，都会根据目录结构和文件名来自动生成路由 

渲染模式：Nuxt 支持多种渲染模式（SSR、CSR、SSG等） 

+ 通用渲染（服务器渲染和水和）
+ 仅客户端渲染
+ 全静态站点生成
+ 混合渲染（每条路由有缓存策略）

利于搜索引擎优化：服务器端渲染模式，不但可以提高首屏渲染速度，还利于SEO 

服务器引擎 

+ 在开发环境中，它使用 Rollup 和 Node.js 。 
+ 在生产环境中，使用 Nitro 将您的应用程序和服务器构建到一个**通用.output目录中**。 
  +  Nitro服务引擎提供了跨平台部署的支持，包括 Node、Deno、Serverless、Workers等平台上部署。



nuxt3环境搭建

在开始之前，请确保您已安装推荐的设置： 

+ Node.js （最新 LTS 版本，或 16.11以上） 
+ VS Code ✓ Volar、ESLint、Prettier 

命令行工具，新建项目（hello-nuxt ) 

+ 方式一：npx nuxi init hello-nuxt  方式二：pnpm dlx nuxi init hello-nuxt  方式三：npm install –g nuxi && nuxi init hello-nuxt 

运行项目: cd hello-nuxt 

+ yarn install 
+ pnpm install --shamefully-hoist（创建一个扁平的 node_modules 目录结构，类似npm 和 yarn） 
+ yarn dev



创建项目报错

执行 npx nuxi init 01-hello-nuxt 报如下错误，主要是网络不通导致： 

解决方案： 

+ 第一步：ping raw.githubusercontent.com 检查是否通 
+ 第二步：如果访问不通，代表是网络不通 
+ 第三步：配置 host，本地解析域名 ✓ Mac电脑 host 配置路径： /etc/hosts ✓ Win 电脑 host 配置路由：c:/Windows/System32/drivers/etc/hosts 
+ 第四步：在host文件中新增一行 ，编写如下配置： ✓ 185.199.108.133 raw.githubusercontent.com 
+ 第五步：重新ping域名，如果通了就可以用了 
+ 第六部：重新开一个终端创建项目即可





![image-20231019195639951](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231019195639951.png)





![image-20231019195920306](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231019195920306.png)



![image-20231019200708989](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231019200708989.png)



应用入口（App.vue）

默认情况下，Nuxt 会将此文件视为入口点，并为应用程序的每个路由呈现其内容，常用于： 

+ 定义页面布局Layout 或 自定义布局，如：NuxtLayout  定义路由的占位，如：NuxtPage 
+ 编写全局样式 、
+ 全局监听路由 等等



Nuxt配置（nuxt.config）

nuxt.config.ts 配置文件位于项目的根目录，可对Nuxt进行自定义配置。比如，可以进行如下配置： 

+ runtimeConfig：运行时配置，即**定义环境变量** 
  +  可通过.env文件中的环境变量来覆盖，优先级（.env > runtimeConfig） 
    + .env的变量会打入到process.env中，符合规则的会覆盖runtimeConfig的变量 
    +  .env一般用于某些终端启动应用时动态指定配置，同时支持dev和pro 
+ appConfig： 应用配置，定义在构建时确定的公共变量，如：theme 
  +  配置会和 app.config.ts 的配置合并（优先级 app.config.ts > appConfig） 
+ app：app配置 
  + head：给每个页面上设置head信息，也支持 useHead 配置和内置组件。 
+ ssr：指定应用渲染模式 
+ router：配置路由相关的信息，比如在客户端渲染可以配置hash路由 
+ alias：路径的别名，默认已配好 
+ modules：配置Nuxt扩展的模块，比如：@pinia/nuxt @nuxt/image 
+ routeRules：定义路由规则，可更改路由的渲染模式或分配基于路由缓存策略（公测阶段） 

+ builder：可指定用 vite 还是 webpack来构建应用，默认是vite。如切换为 webpack 还需要安装额外的依赖。



nuxt.config.ts文件中

![image-20231020092509973](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231020092509973.png)



.env文件(一般开发或部署环境下会用到)



+ .env文件不会参与打包，之会在运行环境下执行，方便修改开发环境配置

+ 在运行时手动添加一个环境变量

```
NUXT_APP_KEY = "DDDD"
NUXT_PUBLIC_BASE_URL="https://localhost"

# 在这里写的变量会添加到process.env.xxxx中
PORT=9090
```

![image-20231020093600243](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231020093600243.png)



App.vue文件中

```vue
<script setup>
// 1.判断代码执行环境
if (process.client) {
  console.log("运行在client上");
}

if (process.server) {
  console.log("运行在server上");
}
</script>
```



```js
// 是否包含window这个对象
if (typeof window === "object") {
  console.log("运行在client");
}

// 2.获取运行时的配置(server and client)
const runtimeConfig = useRuntimeConfig();

if (process.server) {
  console.log(runtimeConfig.appKey);
  console.log(runtimeConfig.public.baseURL);
}

if (process.client) {
  console.log(runtimeConfig.appKey); //定义运行时配置时，写在public中的是服务器端和客户端都可以访问的，这个在客户端访问不了
  console.log(runtimeConfig.public.baseURL);
}
```







应用配置（app.config）

+ Nuxt 3 提供了一个 app.config.ts 应用配置文件，用来定义在构建时确定的公共变量，例如：  网站的标题、主题色 以及任何不敏感的项目配置

+ app.config.ts 配置文件中的选项不能使用env环境变量来覆盖，与 runtimeConfig 不同 

+ 不要将秘密或敏感信息放在 app.config.ts 文件中，该文件是客户端公开



runtimeConifg vs app.config

runtimeConfig 和 app.config都用于向应用程序公开变量。要确定是否应该使用其中一种，以下是一些指导原则： 

+ runtimeConfig：定义环境变量，比如：运行时需要指定的私有或公共token。 
+ app.config：定义公共变量，比如：在构建时确定的公共token、网站配置。



Nuxt3 内置组件



+ 



+ npx和npm的区别
