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