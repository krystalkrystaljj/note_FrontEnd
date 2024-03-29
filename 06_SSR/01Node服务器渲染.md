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





## 3. SSR渲染原理

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
+ 当用户访问首页时可即**可返回静态页面的内容，而不需要等待浏览器先加载完整个应用程序**

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



#### Nuxt3特点

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



#### nuxt3环境搭建

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



#### Nuxt配置（nuxt.config）

nuxt.config.ts 配置文件位于项目的根目录，可对Nuxt进行自定义配置。比如，可以进行如下配置： 

##### runtimeConfig

+ runtimeConfig：运行时配置，即**定义环境变量** 
  +  可通过.env文件中的环境变量来覆盖，优先级（.env > runtimeConfig） 
    + **.env的变量会打入到process.env中，符合规则的会覆盖runtimeConfig的变量** 
    +  .env一般用于某些终端启动应用时动态指定配置，同时支持dev和pro 



+ 在nuxt.config.ts文件中，而public中的数据可以在服务端和客户端访问

![image-20231020092509973](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231020092509973.png)



+ .env文件不会参与打包，之会在运行环境下执行，方便修改开发环境配置(一般开发或部署环境下会用到)

+ 在运行时手动添加一个环境变量

```.env
NUXT_APP_KEY = "DDDD"
NUXT_PUBLIC_BASE_URL="https://localhost"

# 在这里写的变量会添加到process.env.xxxx中
PORT=9090
```

![image-20231020093600243](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231020093600243.png)







+ App.vue文件中,可通过process判断当前代码的执行环境

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



##### appConfig

+ appConfig： 应用配置，定义在构建时确定的公共变量，如：theme 
  +  配置会和 **app.config.ts**文件 的配置合并（**优先级 app.config.ts > appConfig**） 

```ts
  // 2.定义应用的配置
  appConfig: {
    title: "Hello Nuxt3 tjj",
    theme: {
      primary: "yellow",
    },
  },
```



**app**

+ app：app配置 
  + head：给每个页面上设置head信息，也支持 **useHead 配置**和**内置组件**。 

```ts
// 3.app 配置
  app: {
    // 给app所有的页面的head添加的配置(SEO, 添加外部的资源)
    head: {
      title: "HYKJ",
      charset: "UTF-8",
      viewport:
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0,user-scalable=no",
      meta: [
        {
          name: "keywords",
          content: "弘源科教 hykj",
        },
        {
          name: "description",
          content: "手机商城 hykj",
        },
      ],
      link: [
        {
          rel: "shortcut icon",
          href: "favicon.ico",
          type: "image/x-icon",
        },
      ],
      style: [
        {
          children: `body{ color: red; }`,
        },
      ],
      script: [
        {
          src: "http://codercba.com",
        },
      ],
    },
  },
```

+ useHead配置

```ts
// 4.动态的该app所有的页面添加 head的内容
useHead({
  title: "app useHead", // Ref
  bodyAttrs: {
    class: "liujun",
  },
  meta: [
    {
      name: "dsec",
      content: "广州弘源科教 hy kj",
    },
  ],
  style: [],
  link: [],
  // script: [
  //   {
  //     src: "http://liujun.com",
  //     body: true,
  //   },
  // ],
});
```

+ 内置组件

![image-20231023103801199](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231023103801199.png)



+ **ssr**：指定应用渲染模式 

```
ssr: false,//spa渲染模式
```



+ **router**：配置路由相关的信息，比如在客户端渲染可以配置hash路由 
+ **alias**：路径的别名，默认已配好 
+ **modules**：配置Nuxt扩展的模块，比如：@pinia/nuxt @nuxt/image 
+ **routeRules**：定义路由规则，可更改路由的渲染模式或分配基于路由缓存策略（公测阶段） 

+ **builder**：可指定用 vite 还是 webpack来构建应用，默认是vite。如切换为 webpack 还需要安装额外的依赖。



### 应用配置（app.config）

+ Nuxt 3 提供了一个 app.config.ts 应用配置文件，用来定义**在构建时确定的公共变量**，例如：
  + 网站的标题、主题色 以及任何不敏感的项目配置

+ **app.config.ts 配置文件中的选项不能使用env环境变量来覆盖，与 runtimeConfig 不同** 

+ 不要将**秘密或敏感信息**放在 app.config.ts 文件中，该文件是客户端公开



#### runtimeConifg vs app.config

runtimeConfig 和 app.config都用于向应用程序公开变量。要确定是否应该使用其中一种，以下是一些指导原则： 

+ runtimeConfig：**定义环境变量**，比如：**运行时**需要指定的私有或公共token。 
+ app.config：**定义公共变量**，比如：在**构建时**确定的公共token、网站配置。

![image-20231023110929827](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231023110929827.png)

Nuxt3 内置组件

Nuxt3 框架也提供一些内置的组件，常用的如下： 

+ **SEO组件**： Html、Body、Head、Title、Meta、Style、Link、NoScript、Base  NuxtWelcome：欢迎页面组件，该组件是 @nuxt/ui的一部分 
+ **NuxtLayout**：是 Nuxt 自带的页面布局组件
+ **NuxtPage**：是 Nuxt 自带的页面占位组件
  + 需要显示位于目录中的顶级或嵌套页面 pages/ 
  +  **是对 router-view 的封装** 

![image-20231023164425675](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231023164425675.png)

+ **ClientOnly**：该组件中的默认插槽的内容只在客户端渲染 
  + 而fallback插槽的内容只在服务器端渲染 

```vue
    <ClientOnly fallback-tag="h3" fallback="loading">
      <div>我只会在客户端渲染</div>
    </ClientOnly>
```

```vue
    <ClientOnly>
      <div>我只会在 client 渲染</div>
      <template #fallback>
        <h2>服务器端渲染的 loading 页面</h2>
      </template>
    </ClientOnly>
```



+ **NuxtLink**：是 Nuxt 自带的页面导航组件 
  +  是 Vue Router组件 和 HTML标签的封装。 



### 全局样式

![image-20231023190524063](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231023190524063.png)

![image-20231023190605978](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231023190605978.png)

#### 编写全局样式步骤 

1. 在assets中编写全局样式，比如：globel.scss 
2. 接着在nuxt.config中的css选项中配置 
3. 接着执行npm i –D sass 即可 



#### 定义全局变量步骤 

1. 在assets中编写全局样式变量，比如：_colors.scss 
2. 接着在nuxt.config中的vite选项中配置 
3. 然后就可以在任意组件中或scss文件中直接使用全局变量



+ 方式一手动导入（通过*省略它的命名空间）

```vue
<style scoped lang="scss">
/* 1.手动导入全局样式 */
@import "@/assets/styles/variables.scss";
/*2.方式二*/
@use "~/assets/styles/variables.scss" as bv;
@use "~/assets/styles/variables.scss" as *;

.local-style {
  color: pink;
  font-size: $fs20;
  @include border();
}
</style>
```

+ 方式二自动导入(使scss中的变量成为全局变量，在组件中自动导入)

![image-20231023204659545](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231023204659545.png)

```ts
vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // 自动的给  scss 模块首行添加额外的数据:@use "@/assets/styles/variables.scss" as *;
          additionalData: '@use "@/assets/styles/variables.scss" as *;',
        },
      },
    },
  },
```



#### 资源导入

public目录 

+ 用作静态资产的公共服务器，可在应用程序上直接通过 URL 直接访问 
+ 比如：引用public/img/ 目录中的图像文件 
  + 在静态 URL 中可用 /img/nuxt.png，如右图 
  + 静态的URL也支持在背景中使用 

```vue
    <!-- public资源的访问 -->
    <img src="/images/user.png" alt="" />
    <div class="bg-public"></div>
```

```css
.bg-public {
  width: 200px;
  height: 200px;
  border: 1px solid red;
  background-image: url(/images/user.png);
}
```



assets目录 

+ assets经常用于存放如样式表、字体或 SVG的资产 
+ 可以使用 ~/assets/ 路径引用位于assets目录中的资产文件
+ ~/assets/ 路径也支持在背景中使用

```vue
<template>
  <div>
    <!-- assets资源的访问 -->
    <img src="~/assets/images/avatar.png" alt="" />
    <img src="@/assets/images/avatar.png" alt="" />
    <img :src="ImgFeel" alt="" />
    <div class="bg-assets"></div>
    <NuxtPage></NuxtPage>
  </div>
</template>

<script setup>
import ImgFeel from "@/assets/images/feel.png";
</script>

<style>
.bg-assets {
  width: 200px;
  height: 200px;
  border: 1px solid red;
  background-image: url(@/assets/images/feel.png);
}
</style>
```



字体图标

字体图标使用步骤 

1. 将字体图标存放在assets目录下 

2. 字体文件可以使用 ~/assets/ 路径引用。 
3. ![image-20231024095528954](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231024095528954.png)
4. 在nuxt.config配置文件中导入全局样式 

![image-20231024095008881](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231024095008881.png)

4. 在页面中就可以使用字体图标了

```html
    <!-- 字体图片的使用 -->
    <i class="iconfont icon-cart"></i>
    <i class="iconfont icon-edit"></i>
```







Nuxt项目中的页面是在 pages目录 下创建的 

在pages目录创建的页面，Nuxt会根据该页面的目录结构和其文件名来自动生成对应的路由。 

页面路由也称为文件系统路由器（file system router），路由是Nuxt的核心功能之一 

新建页面步骤 

1. 创建页面文件，比如： pages/index.vue 
2. 将内置组件添加到 app.vue 
3. 页面如果使用scss那么需要安装：npm i sass -D 

命令快速创建页面 

+ npx nuxi add page home # 创建home页面 
+ npx nuxi add page detail/[id] # 创建detail页面 
+ npx nuxi add page user-[role]/[id] # 创建user页面



### 组件导航

是Nuxt内置组件，**是对 RouterLink 的扩展**，用来实现页面的导航。 

+ 该组件底层是一个标签，因此使用 a + href 属性也支持路由导航 
+ 但是用**a标签导航会有触发浏览器默认刷新事件**，而 **NuxtLink 不会，NuxtLink还扩展了其它的属性和功能** 

**应用Hydration后（已激活，可交互），页面导航会通过前端路由来实现。这可以防止整页刷新** 

当然，**手动输入URL后，点击刷新浏览器也可导航**，这会导致整个页面刷新 

NuxtLink 组件属性： 

+ to：支持路由路径、路由对象、URL 
+ href：to的别名 
  + activeClass：激活链接的类名 

+ target：和a标签的target一样，指定何种方式显示新页面等

```vue
<!-- 传递一个字符串 -->
    <Nuxt-link to="/">
      <button>home</button>
    </Nuxt-link>

    <!-- 传递一个对象 -->
    <Nuxt-link
      :to="{
        path: '/category',
        query: {
          id: 100,
        },
      }"
    >
      <button>category</button>
    </Nuxt-link>

    <!-- 支持外部地址 -->
    <Nuxt-link to="http://www.jd.com" external target="_blank">
      <button>jindong</button>
    </Nuxt-link>

    <!-- 修改class名称 -->
    <Nuxt-link href="/profile" activeClass="tjj">
      <button>profile</button>
    </Nuxt-link>

    <!-- replace会直接替换掉整个页面而不是压入路由导航的栈，即返回记录不会有上一个页面的路由 -->
    <Nuxt-link href="/find" replace>
      <button>find</button>
    </Nuxt-link>

    <!-- a标签会刷新整个页面 -->
    <a href="/more">
      <button>more</button>
    </a>
```



+ 如果是外部链接地址，会添加一下属性，代表不传递opener和referrer对象

![image-20231025091022322](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231025091022322.png)



### 编程导航

Nuxt3除了可以通过内置组件来实现导航，同时也支持**编程导航：navigateTo** 。 

通过编程导航，在应用程序中就可以**轻松实现动态导航**了，但是**编程导航不利于SEO**。 

**navigateTo 函数在服务器端和客户端都可用，也可以在插件、中间件中使用，也可以直接调用以执行页面导航**，例如： 

+ 当用户触发该goToProfile()方法时，我们通过navigateTo函数来实现动态导航。 
+ 建议： goToProfile方法总是返回 navigateTo 函数（该函数不需要导入）或 返回异步函数 

navigateTo( to , options) 函数: 

+ to: 可以是纯字符串 或 外部URL 或 路由对象，如右图所示： 

+ options: 导航配置，可选 
  + replace：默认为false，为true时会替换当前路由页面 
  + external：默认为false，不允许导航到外部连接，true则允许
  +  等等

```vue
    <!-- 通过navigateTo -->
    <NuxtLink @click="toToCategory">
      <button>category</button>
    </NuxtLink>
```

```js
function toToCategory() {
  //传递字符串
  return navigateTo("/category");
    
  //传递对象
  return navigateTo(
    {
      path: "/category",
      query: {
        name: "tjj",
      },
    },
    {
      replace: true,
    }
  );

  //传递外部链接  
  return navigateTo("http://www.jd.com", {
    external: true,
  });
}
```







Nuxt3z中的编程导航除了可以通过 navigateTo 来实现导航，同时也支持 **useRouter** ( 或 Options API 的 this.$router ) 

useRouter常用的API 

+ back：页面返回，和 一样 router.go(-1) 
+ forward：页面前进，同 router.go(1) 
+ go：页面返回或前进，如 router.go(-1) or router.go(1) 
+ push：以编程方式导航到新页面。建议改用 navigateTo 。支持性更好 
+ replace：以编程方式导航到新页面，但会替换当前路由。建议改用 navigateTo 。支持性更好 
+ beforeEach：路由守卫钩子，每次导航前执行（用于全局监听） 
+ afterEach：路由守卫钩子，每次导航后执行（用于全局监听）

```vue
    <!-- 通过编程方式进行导航 -->
    <button @click="goToCart">cart</button>
    <button @click="goBack">Back</button>
```

```js
// 使用useRouter
let router = useRouter();
function goToCart() {
  router.push("/cart");
}

function goBack() {
  router.go(-1);
}

// 路由守卫
router.beforeEach((to, form) => {
  console.log(to);
  console.log(form);
});
```





### 动态路由

Nuxt3 和 Vue一样，也是支持动态路由的，只不过在Nuxt3中，**动态路由也是根据目录结构和文件的名称自动生成**。 

动态路由语法： 

+ 页面组件目录 或 页面组件文件都 **支持 [ ] 方括号语法** 
+ 方括号里编写动态路由的参数。 

例如，动态路由 支持如下写法： （左边是nuxt3的写法，右边是vue router的语法）

+ pages/detail/[id].vue -> /detail/:id 
+ pages/detail/user-[id].vue -> /detail/user-:id 
+ pages/detail/[role]/[id].vue -> /detail/:role/:id 
+ pages/detail-[role]/[id].vue -> /detail-:role/:id 

相当于vue router中的

![image-20231025153009418](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231025153009418.png)

注意事项： 

+ **动态路由 和 index.vue 能同时存在**（现在可以）， Next.js则可以

```vue
	<NuxtLink to="/detail02">
      <button>detail02</button>
    </NuxtLink>
    <NuxtLink to="/detail02/abc?name=tjj">
      <button>detail02/abc</button>
    </NuxtLink>
    <NuxtLink to="/detail03/user-abc">
      <button>detail03/user-abc</button>
    </NuxtLink>
    <NuxtLink to="/detail04-tjj/123">
      <button>detail04-tjj/123</button>
    </NuxtLink>
```





#### 路由参数

动态路由参数 

1. 通过 [] 方括号语法定义动态路由，比如：/detail/[id].vue 
2. 页面跳转时，在URL路径中传递动态路由参数，比如：/detail/10010 
3. 目标页面通过 route.params 获取动态路由参数 

查询字符串参数 

1. 页面跳转时，通过查询字符串方式传递参数，比如：/detail/10010?name=liujun 
2. 目标页面通过 route.query 获取查询字符串参数

```vue
<script lang="ts" setup>
// 拿到动态路由的参数
const route = useRoute();
const { role, id } = route.params;
const { name } = route.query;
</script>
```





#### 404Page

 捕获所有不配路由（即 404 not found 页面） 

+ 通过在方括号内添加三个点 ，如：[...slug].vue 语法，其中slug可以是其它字符串。 
+ 除了支持在 pages根目录下创建，也支持在其子目录中创建。 
+ Nuxt3正式版不支持404.vue页面了，以前的候选版是支持的404.vue，但是Next.js是支持。

```vue
<template>
  <div>
    <h2>page not found 404 slug={{ slug }}</h2>
  </div>
</template>
<script setup lang="ts">
const route = useRoute();
const { slug } = route.params;
</script>
```





#### 路由匹配规则

路由匹配需注意的事项 

预定义路由优先于动态路由，动态路由优先于捕获所有路由。请看以下示例： 

1. 预定义路由：pages/detail/create.vue 

   + 将匹配 /detail/create 

2. 动态路由：pages/detail/[id].vue 

   + 将匹配/detail/1, /detail/abc 等。 

   +  但不匹配 /detail/create 、/detail/1/1、/detail/ 等 

3. 捕获所有路由：pages/detail/[...slug].vue 

   + 将匹配 /detail/1/2, /detail/a/b/c 等。 
   + 但不匹配 /detail 等





npx和npm的区别

动态路由是什么？？？
