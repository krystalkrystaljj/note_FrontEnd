## 认识Mixin

目前我们是使用组件化的方式在开发整个Vue的应用程序，但是组件和组件之间有时候会存在相同的代码逻辑，我 们希望对相同的代码逻辑进行抽取。 

在Vue2和Vue3中都支持的一种方式就是使用Mixin来完成： 

+ Mixin提供了一种非常灵活的方式，来分发Vue组件中的可复用功能； 
+ 一个Mixin对象可以包含任何组件选项； 
+ 当组件使用Mixin对象时，所有Mixin对象的选项将被 混合 进入该组件本身的选项中

![image-20230628083921118](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230628083921118.png)



Mixin的合并规则

如果Mixin对象中的选项和组件对象中的选项发生了冲突，那么Vue会如何操作呢？ p这里分成不同的情况来进行处理； 

情况一：如果是data函数的返回值对象 

+ 返回值对象默认情况下会进行合并； 

+ 如果data返回值对象的属性发生了冲突，那么会**保留组件自身的数据**； 

情况二：如何生命周期钩子函数 

+ 生命周期的钩子函数会被合并到数组中，都会被调用； 

情况三：值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。 

+ 比如都有methods选项，并且都定义了方法，那么它们都会生效； 
+ 但是如果对象的key相同，那么会取组件对象的键值对；



全局混入Mixin

如果组件中的某些选项，是所有的组件都需要拥有的，那么这个时候我们可以使用**全局的mixin**： 

+ 全局的Mixin可以使用 **应用app的方法 mixin** 来完成注册； 
+ 一旦注册，那么全局混入的选项将会影响每一个组件

![image-20230628090436619](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230628090436619.png)





#### extends

另外一个类似于Mixin的方式是通过extends属性： 

+ 允许声明扩展另外一个组件，类似于Mixins； 

在开发中extends用的非常少，在Vue2中比较推荐大家使用Mixin，而在Vue3中推荐使用**Composition API**

![image-20230629145950170](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230629145950170.png)



+ 早期的时候都是用于代码复用，将公共代码抽取到一个地方
+ mixin是用于代码的抽取，而vuex是用于公共数据的抽取



在Vue2中，我们编写组件的方式是Options API： 

+ Options API的一大特点就是在对应的属性中编写**对应的功能模块**； 
+ 比如**data定义数据**、**methods中定义方法**、**computed中定义计算属性**、**watch中监听属性改变**，也包括**生命周期钩子**； 

但是这种代码有一个很大的弊端： 

+ 当我们实现某一个功能时，这个功能**对应的代码逻辑会被拆分到各个属性中**； 
+ 当我们组件变得更大、更复杂时，逻辑关注点的列表就会增长，那么**同一个功能的逻辑就会被拆分的很分散**； 
+ 尤其对于那些一开始没有编写这些组件的人来说，这个组件的代码是难以阅读和理解的（阅读组件的其他人）； 

下面我们来看一个非常大的组件，其中的逻辑功能按照颜色进行了划分： 

+ 这种碎片化的代码使用理解和维护这个复杂的组件变得异常困难，并且隐藏了潜在的逻辑问题； 
+ 并且当我们处理单个逻辑关注点时，需要不断的跳到相应的代码块中；



![image-20230629152343053](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230629152343053.png)





如果我们能将同一个逻辑关注 点相关的代码收集在一起会更 好。 

+ 这就是Composition API想 要做的事情，以及可以帮助我 们完成的事情。 

+ 也有人把Vue Composition API简称为VCA



### 认识Composition API

那么既然知道Composition API想要帮助我们做什么事情，接下来看一下到底是怎么做呢？ 

+ 为了开始使用Composition API，我们需要有一个可以实际使用它**（编写代码）的地方**； 
+ 在Vue组件中，这个位置就是 **setup 函数**； 

**setup其实就是组件的另外一个选项：** 

+ 只不过这个选项强大到我们可以**用它来替代之前所编写的大部分其他选项**； 
+ 比如methods、computed、watch、data、生命周期等等； 

接下来我们一起学习这个函数的使用： 

+ 函数的参数 
+ 函数的返回值



### setup函数的参数

我们先来研究一个setup函数的参数，它主要有两个参数： 

+ 第一个参数：props 
+ 第二个参数：context

props非常好理解，它其实就是父组件传递过来的属性会被放到props对象中，我们在setup中如果需要使用，那么就可 以直接通过props参数获取： 

+ 对于定义props的类型，我们还是和之前的规则是一样的，在props选项中定义； 
+ 并且在template中依然是可以正常去使用props中的属性，比如message； 
+ 如果我们在setup函数中想要使用props，那么不可以通过 this 去获取（后面我会讲到为什么）； 
+ 因为props有直接作为参数传递到setup函数中，所以我们可以直接通过参数来使用即可； 

另外一个参数是context，我们也称之为是一个SetupContext，它里面包含三个属性：

+  attrs：所有的非prop的attribute； 
+ slots：父组件传递过来的插槽（这个在以渲染函数返回时会有作用，后面会讲到）； 
+ emit：当我们组件内部需要发出事件时会用到emit（因为我们不能访问this，所以不可以通过 this.$emit发出事件）；

![image-20230629161612297](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230629161612297.png)



![image-20230629171634669](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230629171634669.png)



+ data中return的数据能够实时变化是因为会经过一个reactive函数所返回的，它是响应式的会搜集



### setup不可以使用this

官方关于this有这样一段描述（这段描述是我给官方提交了PR之后的一段描述）： 

+ 表达的含义是this并没有指向当前组件实例； 

+ 并且在setup被调用之前，**data、computed、methods等**都没有被解析； 

+ 所以无法在setup中获取this； 



在执行setup()之前，组件实例已经被创建了



### Reactive API

+ Proxy对象调用get函数，进行一个数据劫持，
+ n 如果想为在setup中定义的数据提供响应式的特性，那么我们可以使用reactive的函数： n 那么这是什么原因呢？为什么就可以变成响应式的呢？ p这是因为当我们使用reactive函数处理我们的数据之后，数据再次被使用时就会进行依赖收集； p当数据发生改变时，所有收集到的依赖都是进行对应的响应式操作（比如更新界面）； p事实上，我们编写的data选项，也是在内部交给了reactive函数将其编程响应式对象的；



![image-20230630092717637](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230630092717637.png)



### refAPI

reactive API对传入的类型是有限制的，它要求我们必须传入的是一个对象或者数组类型： 

+ 如果我们传入一个基本数据类型（String、Number、Boolean）会报一个警告； 

这个时候Vue3给我们提供了另外一个API：ref API pref 会返回一个可变的响应式对象，该对象作为一个 响应式的引用 维护着它内部的值，这就是ref名称的来源;

+ 它内部的值是在ref的 value 属性中被维护的； 

这里有两个注意事项： 

+ 在模板中引入ref的值时，Vue会自动帮助我们进行解包操作，所以我们并不需要在模板中通过 ref.value 的方式 来使用； 
+ 但是在 setup 函数内部，它依然是一个 ref引用， 所以对其进行操作时，我们依然需要使用 ref.value的方式；

![image-20230630094305119](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230630094305119.png)



![image-20230630094353990](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230630094353990.png)



ref自动解包

+ ref解包只能是一个浅层解包，例如在counter外面包裹一个对象的话是不能进行解包的
+ 但如果外层包裹是一个reactive可响应式，那么内容的ref是可以解包的



### 认识readonly

我们通过reactive或者ref可以获取到一个响应式的对象，但是某些情况下，我们传入给其他地方（组件）的这个 响应式对象希望在另外一个地方（组件）被使用，但是不能被修改，这个时候如何防止这种情况的出现呢？ 

+ Vue3为我们提供了readonly的方法； 
+ readonly会返回原生对象的只读代理（也就是它依然是一个Proxy，这是一个proxy的set方法被劫持，并且不 能对其进行修改）； 

在开发中常见的readonly方法会传入三个类型的参数： 

+ 类型一：普通对象； 
+ 类型二：reactive返回的对象； 
+ 类型三：ref的对象；

![image-20230630095742915](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230630095742915.png)





在readonly的使用过程中，有如下规则： preadonly返回的对象都是不允许修改的； 

+ 但是经过readonly处理的原来的对象是允许被修改的； ü
  + 比如 const info = readonly(obj)，info对象是不允许被修改的； 
  + 当obj被修改时，readonly返回的info对象也会被修改； 
  + 但是我们不能去修改readonly返回的对象info； 
+ 其实本质上就是readonly返回的对象的setter方法被劫持了而已；

![image-20230630101939741](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230630101939741.png)





+ isProxy ：检查对象是否是由 reactive 或 readonly创建的 proxy。 
+ isReactive 
  + 检查对象是否是由 reactive创建的响应式代理： 
  + 如果该代理是 readonly 建的，但包裹了由 reactive 创建的另一个代理，它也会返回 true； 

+ isReadonly p 检查对象是否是由 readonly 创建的只读代理。 

+ toRaw 
  + 返回 reactive 或 readonly 代理的原始对象（不建议保留对原始对象的持久引用。请谨慎使用）。 

+  shallowReactive 
  + 创建一个响应式代理，它跟踪其自身 property 的响应性，但不执行嵌套对象的深层响应式转换 (深层还是原生对象)。 

+ shallowReadonly 
  + 创建一个 proxy，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换（深层还是可读、可写的）。



### toRef

如果我们使用ES6的解构语法，对reactive返回的对象进行解构获取值，那么之后无论是修改结构后的变量，还是修改reactive 返回的state对象，数据都不再是响应式的： 

```js
export default {
    setup() {
      const info = reactive({name:'tjj',age:18})
      const {name,age} = info

      const changeAge = ()=>{
        age++;
      }

      return {
        name,
        age,
        changeAge
      }
    }
  }
```



那么有没有办法让我们解构出来的属性是响应式的呢？ 

+ Vue为我们提供了一个toRefs的函数，可以**将reactive返回的对象中的属性**都转成ref； 
+ 那么我们再次进行结构出来的 name 和 age 本身都是 ref的； 

这种做法相当于已经在state.name和ref.value之间建立了 链接，任何一个修改都会引起另外一个变化

![image-20230630150428844](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230630150428844.png)





![image-20230630150749840](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230630150749840.png)

+ 要求我们传入一个reactive对象，想对这个reactive对象进行结构赋值，然后展示结构赋值后的属性





unref 

如果我们想要获取一个ref引用中的value，那么也可以通过unref方法： p如果参数是一个 ref，则返回内部值，否则返回参数本身； p这是 val = isRef(val) ? val.value : val 的语法糖函数； 

isRef p判断值是否是一个ref对象。 

shallowRef p创建一个浅层的ref对象； 

triggerRef p手动触发和 shallowRef 相关联的副作用：

```
const name = ref("why")
foo(name.value) foo(name)
function foo(bar) {
unref(bar)
}
```

16节



当你读取一个变量的时候会触发该变量的getter. 

当你修改该变量时候会触发他的setter

![image-20230703194727184](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230703194727184.png)





![image-20230703195640339](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230703195640339.png)







+ 监听name或者age的改变，采用watchEffect
+ watchEffect默认情况下，其回调函数会立即执行一次，自动收集可响应式的依赖



+ 网络请求数据还没有回来，但name数据发生了变化，应该取消上一次的网络请求，重新根据新的值发送网络请求





![image-20230706095815564](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230706095815564.png)





![image-20230706101138434](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230706101138434.png)



+ 最开始时会调用一次，值为null，因为watchEffect可以监听响应数据的依赖，当DOM挂载之后，title的值发生改变吗，watchEffect会监听到，然后打印相应的标签值，如果不想要打印第一次的null值，可以采用第二个参数flush，默认值为pre，（watchEffect会提前执行第一个参数也就是一个函数，不论DOM是否挂载完成），DOM挂载完之后再执行，使用post值



+ 传入一个可侦听的对象

![image-20230706144604974](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230706144604974.png)





![image-20230706150429953](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230706150429953.png)





![image-20230706150801469](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230706150801469.png)

```js
	watch(()=>({...info}),(newInfo,oldInfo)=>{
        console.log(newInfo,oldInfo);
      },{
        deep:true,
        immediate:true//第一次也进行打印
      })
```





单项数据流，父组件的数据流向子组件，父组件数据改变，子组件会改变，而子组件改变数据时 父组件数据不应该改变（子组件不应该能修改父组件的数据）
