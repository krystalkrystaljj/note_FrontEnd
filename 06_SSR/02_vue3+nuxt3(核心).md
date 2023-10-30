





#### 嵌套路由

Nuxt 和 Vue一样，也是支持嵌套路由的，只不过在Nuxt中，**嵌套路由也是根据目录结构和文件的名称自动生成**。 

编写嵌套路由步骤： 

1. 创建一个一级路由，如：parent.vue 
2. 创建一个与一级路由同名同级的文件夹，如： parent 
3. 在parent文件夹下，创建一个嵌套的二级路由 
   + 如：parent/child.vue， 则为一个二级路由页面 
   + 如： parent/index.vue 则为**二级路由默认的页面** 
4. **需要在parent.vue中添加 NuxtPage 路由占位**

![image-20231025164914397](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231025164914397.png)





Nuxt 提供了一个可定制的 **路由中间件**，用来**监听路由的导航**，包括：**局部和全局监听**（支持再服务器和客户端执行） 

路由中间件分为三种： 

+ 匿名（或内联）路由中间件 
  + 在页面中使用 **definePageMeta 函数**定义，可监听局部路由。当注册多个中间件时，会按照注册顺序来执行。 

```ts
definePageMeta({
  // l路由中间件，监听路由
  middleware: [
    function (to, from) {
      // console.log(to);
      // console.log(from);
      console.log("index 第一个中间件");
      // 如果返回的是null或没有返回语句，则直接执行下一个中间件
      // 如果返回的是navigateTo，直接导航到新的页面
      return navigateTo("/detail02");
      // return abortNavigation("终止导航");
    },
    function (to, from) {
      // console.log(to);
      // console.log(from);
      console.log("index 第二个中间件");
    },
    "home",
  ],
});
```



+ 命名路由中间件 
  + 在 **middleware 目录**下定义，并会自动加载中间件。命名规范 kebab-case） 

![image-20231027092129014](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231027092129014.png)

+ 全局路由中间件（优先级比前面的高，支持两端） 
  + 在**middleware 目录**中，**需带.global后缀**的文件，每次路由更改都会自动运行。

![image-20231027092402674](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231027092402674.png)



### 路由验证

Nuxt支持对**每个页面路由进行验证**，我们可以通过**definePageMeta**中的**validate属性**来对路由进行验证。 

+ validate属性接受一个回调函数，回调函数中以 route 作为参数 
+ 回调函数的返回值支持： 
  + 返回 bool 值来确定是否放行路由 ➢ true 放行路由 ➢ false 默认重定向到内置的 404 页面 
  + 返回对象 ➢ { statusCode:401 } // 返回自定义的 401 页面，验证失败 

路由验证失败，可以自定义错误页面： 

+ 在项目根目录（不是pages目录）新建 error.vue



+ [id].vue页面下

```ts
definePageMeta({
  // 路由参数的验证
  validate: (route) => {
    console.log(route.params.id);
    // return /^\d+$/.test(route.params.id as string);

    return {
      statusCode: 401, // 路由验证失败
      statusMessage: "validata router error",
    };
  },
});
```

+ error页面

```vue
<template>
  <div>
    Error Page {{ error }}
    <div>
      <button @click="goHome">Home</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  error: Object,
});

function goHome() {
  clearError({ redirect: "/" });
}
</script>
```





#### 布局

 Layout布局是页面的包装器，可以将多个页面共性东西抽取到 Layout布局 中。 

+ 例如：每个页面的页眉和页脚组件，这些具有共性的组件我们是可以写到一个Layout布局中。 

Layout布局是使用组件来显示页面中的内容 

Layout布局有两种使用方式： 

+ 方式一：默认布局 
  + 在layouts目录下新建默认的布局组件，比如：layouts/default.vue 
  + 然后在app.vue中通过内置组件来使用 

![image-20231030155813700](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231030155813700.png)

+ 方式二：自定义布局（Custom Layout） 
  + 继续在layouts文件夹下新建 Layout 布局组件，比如: layouts/custom-layout.vue 
  + 然后在app.vue中给内置组件 指定name属性 的值为：custom-layout 
  + 也支持在页面中使用 definePageMeta 宏函数来指定 layout 布局

![image-20231030155904381](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231030155904381.png)

#### 渲染模式

 浏览器 和 服务器都可以解释 JavaScript 代码，都可以将 Vue.js 组件呈现为 HTML 元素。此过程称为渲染。 

+ 在客户端将 Vue.js 组件呈现为 HTML 元素，称为：客户端渲染模式 
+ 在服务器将 Vue.js 组件呈现为 HTML 元素，称为：服务器渲染模式 

而Nuxt3是支持多种渲染模式，比如： 

+ 客户端渲染模式（CSR）： 只需将 ssr 设置为 false 
+ 服务器端渲染模式（SSR）：只需将 ssr 设置为 true 
+ 混合渲染模式（SSR | CSR | SSG | SWR）：需在 routeRules 根据每个路由动态配置渲染模式（beta版本）

```ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    "/": { ssr: true }, //ssr
    "/profile": { ssr: false }, //spa应用
    "/home": { static: true }, // 只会在构建时生成一次静态页面
    "/login": { swr: true }, //会多次生成静态页面（会自动重新验证页面需要时重新生成）
  },
});
```





Nuxt插件

Nuxt3支持自定义插件进行扩展，创建插件有两种方式： 

+ 方式一：直接使用 useNuxtApp() 中的 provide(name, vlaue) 方法直接创建，比如：可在App.vue中创建 （也可以在页面中进行注册，但是访问到这个页面时才会进行注册）
  + useNuxtApp 提供了访问 Nuxt 共享运行时上下文的方法和属性（两端可用）：provide、hooks、callhook、vueApp等 

![image-20231030163536616](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231030163536616.png)

![image-20231030164227577](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231030164227577.png)

+ 方式二：在 plugins 目录中创建插件（推荐） 
  + 顶级和子目录index文件写的插件会在**创建Vue应用程序时会自动加载和注册** 
  + .server 或 .client 后缀名插件，可区分服务器端或客户端，用时需区分环境 

在 plugins 目录中创建插件 

+ 1.在 plugins 目录下创建 plugins/price.ts 插件 
+ 2.接着 defineNuxtPlugin 函数创建插件，参数是一个回调函数 
+ 3.然后在组件中使用 useNuxtApp() 来拿到插件中的方法 

```ts
export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      // 自定义的插件，格式化价格的插件 （创建Vue实例时就会自动注册好）
      formaPrice: (price: number) => {
        return price.toFixed(2);
      },
    },
  };
});
```

```js
const nuxtApp = useNuxtApp();
console.log(nuxtApp.$formaPrice(1000.1234));
```

![image-20231030171230795](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231030171230795.png)

注意事项： 

插件注册顺序可以通过在文件名前加上一个数字来控制插件注册的顺序 

+ 比如：plugins/1.price.ts 、plugins/2.string.ts、plugins/3.date.ts



App Lifecycle Hooks

监听App的生命周期的Hooks： 

+ App Hooks 主要可由 Nuxt 插件 使用 hooks 来监听 生命周期，也可用于 Vue 组合 API 。 
+ 但是，如在组件中编写hooks来监听，那 create和setup hooks就监听不了，因为这些hooks已经触发完了监听。 

语法：nuxtApp.hook(app:created, func)

![image-20231030194500533](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231030194500533.png)



![image-20231030194824995](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231030194824995.png)

客户端渲染 

服务器端渲染 

+ beforeCreate -> setup  created



### 获取数据

在Nuxt中数据的获取主要是通过下面4个函数来实现（支持Server和Client ）： 

1. useAsyncData(key, func):专门解决异步获取数据的函数，会阻止页面导航。 
   + 发起异步请求需用到 $fetch 全局函数（类似Fetch API） 
   + $fetch(url, opts)是一个类原生fetch的跨平台请求库 

2. useFetch(url, opts)：用于获取任意的URL地址的数据，会阻止页面导航 
   + 本质是 useAsyncData(key, () => $fetch(url, opts)) 的语法糖。

3. useLazyFetch(url, opts):用于获取任意URL数据，不会阻止页面导航 
   + 本质和 useFetch 的 lazy 属性设置为 true 一样 
4. useLazyAsyncData(key, func):专门解决异步获取数据的函数。 不会阻止页面导航 
   + 本质和useAsyncData的lazy属性设置为true一样 

注意事项：  这些函数只能用在 setup or Lifecycle Hooks 中。



#### useFetch VS axios

获取数据Nuxt推荐使用 useFetch 函数，为什么不是 axios ? 

+ useFetch 底层调用的是$fetch函数，该函数是基于unjs/ohmyfetch请求库，并与原生的Fetch API有者相同API
+  unjs/ohmyfetch 是一个跨端请求库： A better fetch API. Works on node, browser and workers ✓ 如果运行在服务器上，它可以智能的处理对 API接口的直接调用。 ✓ 如果运行在客户端行，它可以对后台提供的 API接口 正常的调用（类似 axios），当然也支持第三方接口的调用 ✓ 会自动解析响应和对数据进行字符串化 
+ useFetch 支持智能的类型提示和智能的推断 API 响应类型。 
+ 在setup中用useFetch获取数据，会减去客户端重复发起的请求。 

useFetch（url, options）语法 

+ 参数 ✓ url: 请求的路径 ✓ options：请求配置选项 ➢ method、query ( 别名 params )、body、headers、baseURL ➢ onRequest、 onResponse、lazy.... 
+ 返回值： data, pending, error, refresh



#### useFetch的封装

封装useFetch步骤 

1. 定义HYRequest类，并导出 
2. 在类中定义request、get、post方法 
3. 在request中使用useFetch发起网络请求 
4. 添加TypeScript类型声明



#### Server API

Nuxt3 提供了编写后端服务接口的功能，编写服务接口可以在server/api目录下编写 

比如：编写一个 /api/homeinfo 接口 

1. 在server/api目录下新建 homeinfo.ts 
2. 接在在该文件中使用 defineEventHandler 函数来定义接口（支持 async） 
3. 然后就可以用useFetch函数轻松调用： /api/homeinfo 接口了



#### 全局状态共享

Nuxt跨页面、跨组件全局状态共享可使用 useState（支持Server和Client ）：  useState(init?: () => T | Ref): Ref  useState(key: string, init?: () => T | Ref): Ref  参数: ✓ init：为状态提供初始值的函数，该函数也支持返回一个Ref类型 ✓ key: 唯一key，确保在跨请求获取该数据时，保证数据的唯一性。为空时会根据文件和行号自动生成唯一key  返回值：Ref 响应式对象 ◼ useState 具体使用步骤如下：  1.在 composables 目录下创建一个模块，如： composables/states.ts  2.在states.ts中使用 useState 定义需全局共享状态，并导出  3.在组件中导入 states.ts 导出的全局状态 ◼ useState 注意事项:  useState 只能用在 setup 函数 和 Lifecycle Hooks 中  useState 不支持classes, functions or symbols类型，因为这些类型不支持序列化
