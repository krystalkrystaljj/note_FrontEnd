### 什么是状态管理

+ 在开发中，我们会的应用程序需要处理各种各样的数据，这些 数据需要保存在我们应用程序中的某一个位置，对于这些数据 的管理我们就称之为是 状态管理。 
+ 在前面我们是如何管理自己的状态呢？ 
  + 在Vue开发中，我们使用组件化的开发方式； 
  + 而在组件中我们定义data或者在setup中返回使用的数据， 这些数据我们称之为state； 
  + 在模块template中我们可以使用这些数据，模块最终会被 渲染成DOM，我们称之为View； 
  + 在模块中我们会产生一些行为事件，处理这些行为事件时， 有可能会修改state，这些行为事件我们**称之为actions**；

![image-20230830085003202](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230830085003202.png)

+ 单项数据流



### 复杂的状态管理

JavaScript开发的应用程序，已经变得越来越复杂了： 

+ JavaScript需要管理的状态越来越多，越来越复杂； 
+ 这些状态包括服务器返回的数据、缓存数据、用户操作产生的数据等等； 
+ 也包括一些UI的状态，比如某些元素是否被选中，是否显示加载动效，当前分页； 

当我们的应用遇到多个组件共享状态时，**单向数据流的简洁性**很容易被破坏： 

+ 多个视图依赖于同一状态； 
+ 来自不同视图的行为需要变更同一状态； 

我们是否可以通过组件数据的传递来完成呢？ 

+ 对于一些简单的状态，确实可以通过props的传递或者Provide的方式来共享状态； 
+ 但是对于复杂的状态管理来说，显然单纯通过传递和共享的方式是不足以解决问题的，比如兄弟组件如何共享 数据呢？



### vuex的状态管理

管理不断变化的state本身是非常困难的： 

+ 状态之间相互会存在依赖，一个状态的变化会引起另一个状态的变化，View页面也有可能会引起状态的变化； 
+ 当应用程序复杂时，state在什么时候，因为什么原因而发生了变化，发生了怎么样的变化，会变得非常难以控 制和追踪； 

因此，我们是否可以考虑将组件的内部状态抽离出来，以一个全局单例的方式来管理呢？ 

+ 在这种模式下，我们的组件树构成了一个巨大的 “试图View”； 
+ 不管在树的哪个位置，任何组件都能获取状态或者触发行为； 
+ 通过定义和隔离状态管理中的各个概念，并通过强制性的规则来维护视图和状态间的独立性，我们的代码边会 变得更加结构化和易于维护、跟踪； 

这就是Vuex背后的基本思想，它借鉴了Flux、Redux、Elm（纯函数语言，redux有借鉴它的思想）：



![image-20230830095324829](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230830095324829.png)

+ mutation中不允许拥有异步请求
+ 如果要进行更改state中的状态要在组件中提交commit（也就是mutations中的方法）
+ actions中可以写异步请求，多增加了一层
+ 软件工程中没有什么问题是多增加一层不能解决的，如果有那么就增加两层



安装插件devtools

vue其实提供了一个devtools，方便我们对组件或者vuex进行调试： p我们需要安装beta版本支持vue3，目前是6.0.0 beta15； 

 它有两种常见的安装方式： 

+ 方式一：通过chrome的商店； p方式二：手动下载代码，编译、安装； 

方式一：通过Chrome商店安装： 

+ 由于某些原因我们可能不能正常登录Chrome商店，所以可以选择第二种；

方式二：手动下载代码，编译、安装 

+ https://github.com/vuejs/devtools/tree/v6.0.0-beta.15下载代码； 
+ 执行 yarn install 安装相关的依赖； 
+ 执行 yarn run build 打包；



+ store中index.js

```js
import { createStore } from "vuex";

const store = createStore()

export default store
```



+ main.js

```js
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

createApp(App).use(store).mount('#app')
```



### 基本用法

```js
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      counter:0
    }
  },
  mutations: {
    increment(state) {
      state.counter++
    },
    decrement(state) {
      state.counter--
    }
  }
})

export default store
```



![image-20230830104547016](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230830104547016.png)

+ 修改状态值必须通过mutation，在组件中提交commit mutations中的方法名



+ vue/小程序（uniapp）/node/react/webpack/数据结构和算法





### Vuex 使用单一状态树： 

+ 用一个对象就包含了全部的应用层级状； 
+ 采用的是SSOT，Single Source of Truth，也可以翻译成单一数据源； 
+ 这也意味着，每个应用将仅仅包含一个 store 实例； 
+ 单状态树和模块化并不冲突，后面我们会讲到module的概念； 

单一状态树的优势： 

+ 如果你的状态信息是保存到多个Store对象中的，那么之后的管理和维护等等都会变得特别困难； 
+ 所以Vuex也使用了单一状态树来管理应用层级的全部状态； 
+ 单一状态树能够让我们最直接的方式找到某个状态的片段，而且在之后的维护和调试过程中，也可以非常方便 的管理和维护；

  

![image-20230830154434802](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230830154434802.png)

### 组件获取状态

在前面我们已经学习过如何在组件中获取状态了。 

当然，如果觉得那种方式有点繁琐（表达式过长），我们可以使用计算属性：

```js
computed:{
    counter () {
        return this.$store.state.counter
    }
}
```

 

但是，如果我们有很多个状态都需要获取话，可以使用mapState的辅助函数： 

+ mapState的方式一：对象类型； 
+ mapState的方式二：数组类型； 
+ 也可以使用展开运算符和来原有的computed混合在一起；

![image-20230830155301725](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230830155301725.png)



+ 对象写法，假如映射过来的名字和某个名字冲突的话，可以采用对象的写法

```JS
    ...mapState({
      sCounter: (state) => state.counter,
      sName: (state) => state.name,
    }),
```



在setup中使用mapState

在setup中如果我们单个获取装是非常简单的： 

+ 通过useStore拿到store后去获取某个状态即可； 
+ 但是如果我们需要使用 mapState 的功能呢？ 

默认情况下，Vuex并没有提供非常方便的使用mapState的方式，这里我们进行了一个函数的封装：

![image-20230831091127925](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230831091127925.png)



![image-20230831092205863](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230831092205863.png)



![image-20230831094600620](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230831094600620.png)



```js
import { computed } from "vue";
import { mapState, useStore } from "vuex";

export function  useState (mapper) {
  // 拿到store独享
  const store = useStore()

  // 获取到对应对象的functions
  const storeStateFns = mapState(mapper);

  // 对数据进行转换
  const storeState = {};
  Object.keys(storeStateFns).forEach((fnKey) => {
    const fn = storeStateFns[fnKey].bind({ $store: store });
    storeState[fnKey] = computed(fn);
  });

  return storeState
}
```



![image-20230831101602687](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230831101602687.png)



+ vuex的五大核心：state，getters，mutations，actions，modules



## getters的基本使用

某些属性我们可能需要警告变化后来使用，这个时候可以使用getters：

![image-20230831110008829](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230831110008829.png)

![image-20230831110048246](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230831110048246.png)



getters可以接收第二个参数：

```js
getters:{
    totalPrice(state, getters) {
      let totalPrice = 0
      for (const book of state.books) {
        totalPrice += book.price * book.count
      }
      return totalPrice * getters.currentDiscount
    },
    currentDiscount(state) {
      return state.discount * 0.9
    }
  }
```



### getters的返回函数(即可以接受参数)

+ getters中的函数本身，可以返回一个函数，那么在使用的地方相当于可以调用这个函数：

```js
totalPriceCountGreaterN(state,getters) {
      return function (n) {
        let totalPrice = 0
      for (const book of state.books) {
        if( book.count > n) {
          totalPrice += book.price * book.count
        }
      }
      return totalPrice * getters.currentDiscount
      }
    }
```



![image-20230831151014377](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230831151014377.png)



+ 封装之后useMapper文件夹

```js
import { computed } from "vue";
import { useStore } from "vuex";

export function  useMapper (mapper,mapFn) {
  // 拿到store独享
  const store = useStore()

  // 获取到对应对象的functions
  const storeStateFns = mapFn(mapper);

  // 对数据进行转换
  const storeState = {};
  Object.keys(storeStateFns).forEach((fnKey) => {
    const fn = storeStateFns[fnKey].bind({ $store: store });
    storeState[fnKey] = computed(fn);
  });

  return storeState
}
```



+ useGetters文件夹

```js
import { useMapper} from './useMapper'
import { mapGetters } from 'vuex'

export function useGetters(mapper) {
  return useMapper(mapper, mapGetters)
}
```



+ useState文件夹

```js
import { useMapper} from './useMapper'
import { mapState } from 'vuex'

export function useState(mapper) {
  return useMapper(mapper, mapState)
}
```



### mutation操作

+ 很多时候我们在提交mutation的时候，会携带一些数据，这个时候我们可以使用参数：

![image-20230831165039595](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230831165039595.png)



![image-20230831165222004](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230831165222004.png)



![image-20230831165306923](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230831165306923.png)



### Mutation常量类型

+ 定义常量：mutation-type.js

![image-20230831165350105](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230831165350105.png)

+ 定义mutation

![image-20230831165458069](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230831165458069.png)

+ 提交mutation

![image-20230831165601214](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230831165601214.png)



### mapMutations辅助函数

+ 我们也可以借助于辅助函数，帮助我们快速映射到对应的方法中：
+ ![image-20230831173048695](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230831173048695.png)



![image-20230831193743304](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230831193743304.png)

+ 在setup中使用也是一样的：



```JS
    const storeMutations = mapMutations({
      add: INCREMENT_N,
    });
```



### mutation重要原则

一条重要的原则就是要记住 mutation 必须是同步函数 

+ 这是因为devtool工具会记录mutation的日记； 
+ 每一条mutation被记录，devtools都需要捕捉到前一状态和后一状态的快照； 
+ 但是在mutation中执行异步操作，就无法追踪到数据的变化； 
+ 所以Vuex的重要原则中要求 mutation必须是同步函数；



### actions的基本使用

+ 当我们想将组件中的一些异步操作放到vuex中时，是不能写到mutations中的，mutation中不允许有异步操作
+ Action类似于mutation，不同在于： **(面试)**
  + Action提交的是mutation，而不是直接变更状态； 
  + Action可以包含任意异步操作



这里有一个非常重要的参数context： 

+ context是一个和store实例均有相同方法和属性的context对象； 
+ 所以我们可以从其中获取到commit方法来提交一个mutation，或者通过 context.state 和 context.getters 来 获取 state 和 getters； 
+ 但是为什么它不是store对象呢？这个等到我们讲Modules时再具体来说；
+ http://123.207.32.32:8000/home/multidata

![image-20230831211807536](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230831211807536.png)



![image-20230831211851938](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230831211851938.png)



![image-20230831211926019](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230831211926019.png)



![image-20230901094928690](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230901094928690.png)



+ actions的辅助函数

```js
  setup() {
    const actions = mapActions({
      add: "incrementAction",
      decrement: "decrementAction",
    });

    return { ...actions };
  },
```



+ 在组件中，想知道派发出去的actions有没有完成，可以让当前的actions返回一个promise，promise完成时调resolve和reject

```js
[GETHOMEMULTIDATA](context) {
      return new Promise((resolve, reject) => {
        axios.get("http://123.207.32.32:8000/home/multidata").then((res) => {
          context.commit("addBannerData", res.data.data);
          resolve({name:'tjj', age: 18})
        }).catch(err => {
          reject(err)
        })
      })
    }
```



```js
    onMounted(() => {
      store
        .dispatch(GETHOMEMULTIDATA)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
```



### module的基本使用

什么是Module？ 

+ 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象，当应用变得非常复杂时，store 对象就有可 能变得相当臃肿； 
+ 为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）； 

+ 每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块；