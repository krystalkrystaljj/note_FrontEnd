# 一

+ 快捷键：标签名+tab
+ 快速复制光标所在行的内容：ctrl+D
+ 快速删除光标所在行内容：ctrl+X
+ 让光标移动到当前行的末尾：end
+ 让光标移动到当前行的最前面：home
+ 让光标在多行中闪烁，以便同时删除或添加内容：按住alt不放
+ 创建HTML文件：ctrl+alt+insert
+  ctrl + '-/+': 可以折叠项目中的任何代码块，它不是选中折叠，而是自动识别折叠。



+ stack overflow

+ 下载webstore网站：http://www.javatiku.cn/idea/1428.html

## 1.1 Vue中的MVVM模型

+ Model View Model View

安装Vue的三种方式：

1.直接下载vue.js文件引用

2.cdn引用

3.npm安装



## 1.2 创建Vue实例传入的options

+ 创建Vue实例的时候，传入了一个options选项

+ el: 
  + 类型：string|HTMLElement
  + 作用：决定之后Vue实力会管理哪一个DOM
+ data: 
  + 类型：Object|function（组件当中的他必须是一个函数）
  + 作用：Vue实例对应的数据对象
+ methods: 
  + 类型：{[key:string]:function}
  + 作用：定义属于Vue的一些方法，可以再其他地方调用，也可以再指令中使用



## 1.3 Vue的生命周期



# 二、模板语言

## 2.1 插值操作

### mustache语法

+ mustache语法中，不仅仅可以写变量，也可以写简单的表达式

```html
  <h2>{{message}}</h2>
  <h2>{{message}},tjj</h2>
  <h2>{{firstname + lastname}}</h2>
  <h2>{{firstname + ' ' + lastname}}</h2>
  <h2>{{firstname}} {{lastname}}</h2>
  <h2>{{counter*2}}</h2>
```



### v-once

+ 该指令后面不需要跟任何表达式
+ 该指令表示元素和组件只渲染一次，不会随着数据的改变而改变

### v-html

+ 某些情况下，我们从服务器请求到的数据本身就是一个html代码
+ 如果我们直接通过{{}}来输出，会将html代码也一起输出
+ 但是我们希望是按照html格式进行解析，并显示为对应的内容

```html
<div id="app">
  <h2>{{url}}</h2>
  <h2 v-html="url"></h2>
</div>

<script>
  const app = new Vue({
  el:'#app',
  data: {
    url:'<a href="http://www.baidu.com">百度一下</a>'
    }
  })
</script>
```



###  v-text

+ v-text作用和mustache比较相似;都是用于将数据显示在界面中
+ v-text通常情况下，接受一个string类型

```html
<h2 v-text="message"></h2>
<h2 v-text="message">哈哈哈</h2>
//会覆盖标签内的内容，即哈哈哈，而mustache语法会将标签中的内容拼接起来
```



### v-pre

+ 用于跳过这个元素和它子元素的编译过程，用于显示原本的mustache语法

```html
<h2 v-pre>{{message}}</h2>
```



### v-cloak

+ 在某些情况下，我们浏览器可能会直接显示出来为编译的mustache标签

```html
<style>
 [v-cloak] {
	display: none;
 }
</style>

<div id="app">
  <h2 v-cloak>{{message}}</h2>
</div>

<script>
  //vue在解析之前，div中有一个属性v-cloak
  //vue在解析之后，div中没有一个属性v-cloak
  setTimeout(function(){
    const app = new Vue({
      el: '#app',
      data: {
        message: '你好啊',
      }
    })
  },1000)
</script>
```





## 2.2 v-bind 

### 动态绑定属性

+ 有时候属性不是写死的，也是要根据某希望变量某些数据动态来决定的

+ **动态绑定属性**，用于绑定一个或多个属性值，或者向另一个组件传递props值
+ v-bind的语法糖`<img `:src="imgURL">`

```
//不能这样使用，mustache语法在内容里面才能使用，这里会把imgURL直接当成字符串
<img src="{{imgURL}}" alt="">
<img :src="imgURL">
//这样才能将imgURL当作一个变量
```



### 动态绑定class(对象语法)

+ `<h2 :class="active">{{message}}</h2>`这样绑定任然是绑定一个字符串

```html
<h2 :class="{key1: value1, key2: value2}">{{message}}</h2>
<h2 :class="{key1(属性名): value1(属性值), key2: value2}">{{message}}</h2>
<h2 :class="{类名1: boolean, 类名2: boolean}">{{message}}</h2>
//boolean值为true的时候，类就被添加.一般把boolean值放到data中
```

### 动态绑定class(数组语法)

```html
<h2 :class="['line','active']">{{message}}</h2>
<!--  active加引号就是字符串active，不加引号就是变量active，显示里面的值-->
<!-- 这个写法就是相当于class= "line active"-->
```

```html
<h2 :class="[active,line]">hahah</h2>
<!-- 替换其中的变量-->
```



## v-bind绑定style

+ 在写css属性时，可以使用驼峰式：fontSize
+ 或者短横线分割`'font-size'`
+ 对象语法

```html
<!--  若直接写50px会把它当作一个变量去解析-->
<h2 :style="{fontSize: '10px'}">{{message}}</h2>
```

+ 数组语法

```html
<h2 :style="[baseStyle,basestyle2]">嘎嘎嘎嘎嘎</h2>
<script>
  const app = new Vue({
 	data: {
    	baseStyle:{background: 'orange',fontSize: '50px'},
    	basestyle2: {color: 'purple'}
  	},
  })
</script>
```







# 三、计算属性

## 3.1 什么是计算属性

+ 在模板中我们可以直接通过插值语法显示一些data中的数据
+ 但是在某些情况，我们可能要对数据进行一些转化后在显示，或者需要将多个数据结合起来进行显示
+ 计算属性会进行缓存，如果使用多次计算机只会调用一次,而methods会调用多次
+ 应用的时候不需要加小括号

```js
computed: {
      totalPrice() {
        let totalprice = 0
        for (book of this.books) {
          totalprice += book.price
        }
        return totalprice
      }
    }
```





## 3.2 计算属性的setter和getter

+ 每个计算属性都包含一个setter和getter
+ 但计算属性一般是只读属性，只有get方法



# ES6语法

+ 块级作用域
  + js中使用var来声明一个变量时，变量的作用域主要是和函数的定义有关
  + 针对于其他定义来说是没有作用域的，比如if/for等，这在我们开发中往往会引起一些问题
  + 闭包可以解决问题：函数是一个作用域



+ 当我们修饰的标识符不会再次被赋值时，就可以使用const来保证数据的安全性。

+ 在开发中优先使用const，只有需要改变一个标识符时才使用let

+ const定义标识符必须进行初始化
+ 常量的含义是只想的对象不能修改，但是可以改变对象内部的属性



## 箭头函数



```js
//结论：箭头函数中的this向外层作用域中，一层层查找this，直到有this的定义
  const obj = {
    aa() {
      setTimeout(function () {
        console.log(this)
      })

      setTimeout( () => {
        console.log(this);
      })
    }
  }
```



## 字面量的增强写法

```js
//属性增强写法
  const name = 'tjj';
  const age = 15;
  const height = 1.88;

  //ES5的写法
  // const obj = {
  //   name:name,
  //   age: age,
  //   heigth: height
  // }

  //ES6的写法
  const obj = {
    name,
    age,
    height
  } 
  
  //2、函数的增强写法
  //ES5的写法
  const obj = {
    run: function () {

    },
    eat: function() {
      
    }

  }
  const obj = {
    run() {
      
    }
  }
```



## 对象的解构

```js
const obj = {
  name:'why',
  age:18,
  height: 1.88,
  address:'洛杉矶'
}

const {name,height,age} = obj;
console.log(name);
```



## 高阶函数

```js
//1.取出所有小于100的数字
  let newNums = [];
  for (let n of nums) {
    if (n < 100) {
      newNums.push(n)
    }
  }
  console.log(newNums);

  //  2.将所有小于100的数字进行转化：全部*2
  let newNums2 = [];
  for (let n of newNums) {
    newNums2.push(n*2);
  }
  console.log(newNums2);

  //  3.将所有的数字相加，得到最终的结果
  let total = 0;
  for(let n of newNums2) {
    total += n
  }
  console.log(total);
```



+ filter中的回调函数有一个要求：必须返回一个布尔值
+ 当返回为true时，函数内部会自动将这次回调的n加入到新的数组中
+ 当返回为false时，函数内部会过滤掉这次的n



+ map中的回调函数会将这个返回值作为新的值加入到数组中（回调的次数即数组的个数）



+ reduce作用就是对数组中所有的数进行汇总
+ 第一个参数是上一次返回的值，默认值为0

```js
let total = nums.filter(function(n) {
    return n < 100;
  }).map(function(n){
    return n*2;
  }).reduce(function (prevalue,n) {
    return prevalue+n
  })
let total = nums.filter(n => n < 100).map(n => n*2).reduce((prevalue,n) => prevalue+n)
```





# 四、事件监听

## 1 v-on参数

+ 当通过medthods中定义方法，以供@click调用时，需要注意参数问题：
+ 情况一：如果该方法不需要额外参数，那么方法后的()可以不添加（在进行事件监听时）
  + 但是注意：如果方法本身中有一个参数，那么会默认将**原生事件event参数**传递进去
  
  + 如果函数需要参数，但是没有传入，那么函数的形参为undefined

```html
<button @click="btn2Click">按钮2</button>
<!--  这时vue会默认将浏览器产生的event事件对象作为参数传入到方法-->

<button @click="btn2Click()">按钮2</button> 这时的形参为undefined

```

```js
// 如果函数需要参数，但是没有传入，那么函数的形参为undefined 
function abc(name) {
    console.log(name);
  }
  abc()
```

+ 情况二：如果需要同时传入某个参数，同时需要event时，可以通过$event传入事件

```js
<!-- 在定义方法时，我们需要event对象，同时有需要其他参数 -->
<!-- 在调用方式，如何手动获取到浏览器参数的event对象 -->
<button @click="btn3Click">按钮3</button> 
<!--  这种情况会将event付给第一个变量值，第二个则是undefined-->
<button @click="btn3Click('abc',$event)">按钮3</button>
```





## 2 v-on修饰符

### .stop 

+ 调用event.stopPropagation()，阻止冒泡

```html
  <div @click="divClick">
      <button @click.stop="btnClick">按钮</button>
  </div>
```

### .prevent

+  调用event.preventDefault()，阻止其默认提交，自己进行监听提交

```html
    <form action="baidu">
        <input type="submit" value="提交" @click.prevent="submitClick">
    </form>
```



### .{keyCode|keyAlias} 

+ 只当事件是从特定键触发时才触发回调

```html
<!--    3.监听键盘的某个键帽的点击-->
<input type="text" @keyup="keyUp">
<input type="text" @keyup.enter="keyUp">
```



### .native

+  监听组件根元素的原生事件

### .once

+  只触发一次回调



## 3 v-if

```HTML
<div id="app">
  <span v-if="isUser">
    <label for="username">用户账号</label>
    <input type="text" id="username" placeholder="用户账号" key="username">
  </span>
  <span v-else>
    <label for="useremial">用户邮箱</label>
    <input type="text" id="useremial" placeholder="用户邮箱" key="emial">
  </span>
  <button @click="isUser = !isUser">切换类型</button>
</div>

<script src="../js/vue.js"></script>
<script>
  const app = new Vue({
    el: '#app',
    data: {
      isUser:true
    }
  })
</script>
```

+ 小问题：在emial中输入，然后进行切换登录，在账号登录的界面也会显示

+ 这是因为vue在进行dom渲染时，处于性能的考虑，会尽可能的复用已经存在的元素，而不是重新创建的元素
+ 在上面的案例中，vue内部会发现原来的input元素不再使用，直接作为else中的input来使用了
+ 解决方法：给对应的input添加key
+ 组件key属性：主要作用是为了高效的更新虚拟dom



### v-show和v-if的区别

+ v-if当条件为false时，压根不会有对应的元素在dom中
+ v-show当条件为false时，仅仅是将元素的display属性设置为none而已



## 4 v-for

+ 遍历数组和对象



+ 编程范式：命令式编程、声明式编程
+ 编程范式：面向对象编程（第一公民：对象）/ 函数式编程（第一公民：函数 ）
+ filter中的回调函数有一个要求:必须返回一个boolean值
+ true：当返回为true时，函数内部会自动将这次回调的n加入到新的数组中
+ false：当返回为false时，函数内部会过滤掉这次n



## 5 数组响应式的方法

```js
//通过索引值修改数组中的元素(不是响应式的)
this.letters[0] = 'bbbb'

//替换元素
this.letters.splice(0,1,'bbb')
Vue.set(this.letters,0,'bbbb')

//在数组最前面添加元素
this.letters.unshift('aaa')
this.letters.sort()
this.letters.reverse();

```



## 6 filters的使用

```html
<td>{{item.price | showPrice}}</td>
<script>
  filters: {
    showPrice(price) {
      return '￥' + price.toFixed(2)
    }
  }
</script>

```







## 7 v-model

+ 表单控件在实际开发中是非常常见的。特别是对于用户信息的提交，需要大量表单
+ vue中使用v-model指令来实现**表单元素的value值和数据的双向绑定**
+ 当然我们也可以将v-model用于textarea



### v-model的实现原理

+ input中有一个input事件：当input的value值发生变化时就会触发，不用等到失去焦点

```html
<input type="text" :value="message" @input="message = $event.target.value">
```



### radio

+ 选中一个 radio(单选按钮) 后，再次点击它，不能取消选中

```html
 <label for="man">
    <input type="radio" id="man" value="男" v-model="sex">男
  </label>
  <label for="female">
    <input type="radio" id="female" value="女" v-model="sex">女
  </label>
  <h2>您的选择是：{{sex}}</h2>
```



### checkbox

- 选中一个 checkbox(复选框) 后，再次点击它，即可取消选中,选中即为true
- checkbox 所谓的“单选”是不受其 name 属性的值的影响的
- 单选框对应的是布尔值`isAgree:false`

```html
  <label for="agree">
    <input type="checkbox" id="agree" v-model="isAgree">同意协议
    <h2>您的选择是：{{isAgree}}</h2>
    <button :disabled="isAgree">下一步</button>
  </label>
```



+ 多选框对应的是一个数组类型`hobbies:[]`

```html
<input type="checkbox" value="篮球" v-model="hobbies">篮球
    <input type="checkbox" value="足球" v-model="hobbies">足球
    <input type="checkbox" value="乒乓球" v-model="hobbies">乒乓球
    <input type="checkbox" value="羽毛球" v-model="hobbies">羽毛球
    <h2>您的爱好是：{{hobbies}}</h2>
```



### select

+ 和checkbox一样，select也分单选和多选两种情况
+ 单选：只能选中一个值
  + v-model绑定的是一个值
  + 当我们选中option中的额一个时，会将对应的value赋值到mySelect中
+ 多选：可以选中多个值
  + v-model绑定的是一个数组
  + 当选中多个值时，就会将选中的option对应的value添加到数组mySelect中

```html
<select name="abc" v-model="fruits" multiple>
    <option value="苹果">苹果</option>
    <option value="香蕉">香蕉</option>
    <option value="榴莲">榴莲</option>
    <option value="葡萄">葡萄</option>
  </select>
```



### 值绑定

+ 之前的value值都是写死的，而我们实际应用需要动态的获取
+ 就是动态的给value赋值而已：可以通过v-bind:value动态的给value绑定值

```html
<div id="app">
  <label v-for="item in originhobbies" :for="item">
    <input type="checkbox" :value="item" :id="item" v-model="hobbies">{{item}}
  </label>
  <h2>您的爱好是：{{hobbies}}</h2>
</div>

<script>
  const app = new Vue({
    el: '#app',
    data: {
      hobbies:[],
      originhobbies: ['篮球', '足球', '乒乓球', '羽毛球', '台球', '高尔夫球']
    },
  })
</script>
```





### 修饰符

+ lazy修饰符：默认情况下，v-model是在input事件中同步输入框的数据的
  + 也就是说，一旦有数据发生改变对应的data中的数据就会自动发生改变
  + lazy修饰符可以让数据在失去焦点或者回车时才会更新
  + `<input type="text" v-model.lazy="message">`
  
+ number修饰符：
  + 默认情况下，在输入框中无论我们输入的是**字母还是数字都会被当作字符串类型处理**
  
  + 但是如果我们希望处理的是数字类型，那么最好直接将内容当作数字处理
  
  + number修饰符可以让在输入框中的内容自动转成数字类型
  
  + ```html
    <input type="text" v-model.number="message">
    <h2>{{typeof  message}}</h2>
    ```
  
+ trim修饰符
  + 如果输入的内容首尾有很多空格，通常我们希望将其去除
  + trim修饰符可以过滤内容左右两边的空格





# 五、组件化

## 1 注册组件的基本步骤

+ 创建组件构造器：调用Vue.extend()方法
  + vue为了简化这个过程，提供了注册语法糖，主要是省去了调用vue.extend()的步骤，而是直接使用一个对象来代替
+ 注册组件：调用Vue.component()方法

```js
  //1.创建组件构造器对象
  const Cpn = Vue.extend({
    template:`
    <div>
    <h2>我是标题</h2>
    <p>我是内容哈哈哈哈</p>
    <p>我是内容哈哈哈哈</p>
    </div>
    `
  })

  //2.注册组件
  Vue.component('my-cpn',Cpn)
```

+ 使用组件：在Vue实例的作用范围内



## 2 全局组件和局部组件

+ 全局组件意味着可以在多个Vue的实例下面使用

+ 局部组件的注册

```js
  const app = new Vue({
    el: '#app',
    data: {
    },
    components: {
      myCpn:Cpn
    }
  })
```



## 3 父组件和子组件

+ 要想在某个作用域中使用某个组件，要么是在全局注册过了，要么在其组件的components中注册

```js
<script>
  //1.创建组件构造器对象
  const mCpn1 = Vue.extend({
    template:`
    <div>
    <h2>我是标题1</h2>
    </div>
    `
  })

  const mCpn2 = Vue.extend({
    template:`
    <div>
      <h2>我是标题2</h2>
      <cpn1></cpn1>
    </div>
    `,
    components: {
      cpn1:mCpn1
      //在这个组件内部注册，那么只能在这个组件中使用，若是要在根组件中使用，得在根组件中注册
    }
  })

  //root组件
  const app = new Vue({
    el: '#app',
    data: {
    },
    components: {
      cpn2:mCpn2
    }
  })
```

## 4 组件注册语法糖

```js
//全局组件注册
  Vue.component('cpn', {
    template:
        `<div>
      <h2>我是组件1</h2>
      </div>`
  })

//局部组件注册语法糖
  const app = new Vue({
    el: '#app',
    components: {
      'cpn': {
        template:
            `<div>
      <h2>我是组件1</h2>
      </div>`
      }
    }
  })
```

### 组件模板抽离写法

```html
<script type="x-template" id="cpn">
  <h2>啊哈哈哈哈</h2>
</script>

<script>
  const app = new Vue({
    el: '#app',
    components: {
      'cpn':{
        template:'#cpn'
      }
    }
  })
</script>

<template id="cpn">
  <div>
    <h2>lalalal</h2>
    <h3>jjjjj</h3>
  </div>
</template>
```





## 5 组件可以访问vue实例数据吗

+ **不能访问**，即使可以访问，如果将所有的数据都放在Vue实例中，Vue实例就会变得非常臃肿
+ 组件是一个单独功能模块的封装：这个模块中有属于自己的html模板，也应该有属于自己的数据data
+ 结论：Vue组件啊应该有自己保存数据的地方

```html
<div id="app">
  <cpn></cpn>

</div>

<template id="ll">
  <div>
    <h2>我是组件{{message}}</h2>
  </div>
</template>

<script src="../js/vue.js"></script>
<script>
   Vue.component('cpn',{
    template: '#cpn',
    data(){
      return {
        title: 'abc'
      }
    }
  }) 
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊',
    },
    components: {
      'cpn':{
        template: '#ll'
      }
    }
  })
</script>
```

+ 组件对象也有一个data属性，只是这个data属性必须是一个函数，而且这个函数返回一个对象，对象内部保存着数据

+ 在函数栈空间内创建一个新的对象返回
+ 组件对象里面的data为什么是一个函数？因为每一个组件都需要有自己的对象来保存自己的状态



## 6 父子组件之间的通信

+ 如何进行父子组件间的通信
  + 通过props向子组件传递数据
  + 通过事件向父组件发送消息



### 父级向子级传递数据

+ 第一步props设置变量用于接收父组件的值
+ 第二步 v-bind绑定props中的变量，进行赋值

`<cpn :cmovies="movies" :cmessage="message"></cpn>`

+ 第三步 模板里直接用

#### props基本用法

+ 在组件中，使用选项props来声明需要从父级接收到的数据
+ props的值有两种方式：
  + 字符串数组，数组中的字符串就是传递时的名称
  + `props: ['cmovies','cmessage']`
  + 对象，对象可以设置传递时的类型，也可以设置默认值等

```js
props: {
      cmovies: {
        type:Array,
        default:[]
      },
      cmessage: {
        type: String,
        default: 'aaaa',//未传递时的默认值
        required:true
          //必须进行传递
      }
    }
```



### 子级向父级传递

+ v-on不仅仅可以用于监听DOM事件，也可以用于组件间的自定义事件
+ 自定义事件的流程：
  + 在子组件中，通过$emit()来触发事件
  + 在父组件中，通过v-on来监听子组件事件(v-on除了可以监听默认事件外还可以监听，子组件发送出来的自定义事件)

```html
<div id="app">
    //第三步：绑定子组件事件
	<cpn @itemclick="cpnClick"></cpn>
</div>

<button v-for="item in categories"
        //第一步，在子组件里面绑定点击事件
            @click="btnClick(item)">
            {{item.name}}
</button>

<script>
  const cpn = {
    template:'#cpn',
    data () {
      return {
        categories: [
          {id:'aaa', name:'热门推荐'},
          {id:'bbb', name:'手机数码'},
          {id:'ccc', name:'家用家电'},
          {id:'ddd', name:'电脑办公'}
        ]
      }
    },
    methods: {
      //第二步：将事件发送出去
      btnClick(item) {
        this.$emit('itemclick',item)
      }
    }
  }
  const app = new Vue({
  	el:'#app',
  	components: {
    	cpn
  	},
  	methods: {
        //第五步：使用子组件数据
    	cpnClick(item) {
      		console.log('cpnclick',item)
    	}
  	}
  })
</script>
```





### 父子组建的访问方式

+ 父组件访问子组件：使用$children或$refs
  + this.$children是一个数组类型，它包含所有子组件对象
  + 我们这里通过一个遍历，取出所有子组件的message状态
+ 子组件访问父组件：使用$parent



## 7 插槽

+ 组建的插槽：
  + 让我们封装的组件更加具有扩展性
  + 让使用者可以决定组件内部的一些内容到底展示什么

### 作用域插槽

+ 父组件替换插槽的标签，但是内容由子组件来提供

+ 编译作用域：父组件模板的所有东西都会在父级作用域内编译，子组件模板的所有东西都会在子级作用域内编译



+ 模块化规范：commonJs，AMD，CMD,ES6的modules

+ 某些情况下，一个模块中包含某个功能，我们并不希望给这个功能命名，而是让导入这可以自己来命名
  + 这个时候我们就可以使用export default



# 六、Webpack详解

+ webpack是一个现代的JavaScript应用的静态**模板打包工具**
+ webpack其中一个核心就是让我们可能进行模块化开发，并且帮助我们处理模块间的依赖关系
+ webpack依赖node环境，npm是管理node的各种包



## 1 webpack安装

+ 安装webpack首先需要安装Node.js，Node.js自带了软件包管理工具npm



### 全局安装

```
npm install --global webpack
npm install webpack@3.6.0 -g //指定版本
```



### 局部安装

+ 局部安装：安装最新版本或特定版本

```
cd 对应目录
npm install --save-dev webpack 
npm install --save-dev webpack@<version>

如果你使用 webpack 4+ 版本，你还需要安装 CLI
npm install --save-dev webpack-cli
```

+ --save-dev是开发时依赖，项目打包后不需要继续使用的（与之相对应的运行时依赖）
+ package.json中会多一个开发时依赖

```
"devDependencies": {
    "webpack": "^3.6.0"
  }
```



+ 一个项目往往依赖特定的webpack版本，全局的版本很可能和这个项目的webpack版本不一致，导出打包出现问题
+ 所以通常一个项目都有自己局部的webpack
+ 通过 ./node_modules/.bin/webpack启动webpack打包，使用的是局部的webpack打包工具
+ package.json中的script的脚本在执行时，会按照一定的顺序寻找命令对应的位置
  + 首先会去寻找本地的node_modules/.bin路径中对应的命令
  + 如果没有找到，会去全局的环境变量中寻找
  + 执行build命令：npm run build（使用本地的）





### 删除

+ 删除全局webpack

```
npm uninstall -g webpack
```

+ 删除本地webpack

```
npm un webpack
```

+ 删除局部webpack-cli

```
npm uninstall webpack-cli
```



### js文件的打包

+ 现在的js文件中使用了模块化的方式进行开发，他们不能直接使用
  + 因为如果直接在index.html引入这两个js文件，浏览器并不识别其中的模块化代码
  + 我们一个个引用非常麻烦，并且后期非常不方便对他们进行管理
+ 使用webpack工具，对多个js文件进行打包
  + webpack就是一个模块化的打包工具，所以它支持我们代码中写模块化，可以对模块化的代码进行处理
  + 如果在处理完所有模块之间的关系后，将多个js打包到一个js文件中，引入时就变得非常方便了

+ 高版本的打包命令为：

```
webpack .\src\main.js -o .\dist\bundle.js
```



npm install就是当前文件有依赖一些东西会根据package.json,帮你在当前文件夹下安装一些东西的



+ 文件和文件夹解析
  + dist文件夹：用于存放之后打包的文件
  + src文件夹：用于存放我们写的源文件
  + package.json：通过**npm init**生成的，npm包管理的文件（一旦有依赖于node，就先把package.json给建出来）





## 2 css文件的配置

+ loader是webpack中非常核心的概念
+ webpack只要是用来处理我们的js代码，并且webpack会自动处理技术之间的相关依赖
+ 但是在开发中我们不仅仅有基本的js代码处理，我们也需要加载css、图片，也包括一些高级的将es6转成es5代码，将typescrip转成ES5代码，将css、less转成css，将jsx、.vue文件转成js文件等
+ 对于webpack本身的能力来说这些转化是不支持的



### loader使用过程

+ 步骤一：通过npm安装需要使用的loader
+ 步骤二：在webpack.config.js中的modules关键字下进行配置



+ [`style-loader`](https://webpack.js.org/loaders/style-loader) Add exports of a module as style to DOM
+ [`css-loader`](https://webpack.js.org/loaders/css-loader) Loads CSS file with resolved imports and returns CSS code



### 图片文件的处理

+  npm install --save-dev url-loader

#### 修改文件名称

+ 我们发现webpack自动帮助我们生成一个非常长的名字
  + 这是一个32位的hash值，目的是防止名字重复
+ 我们可以在options中添加如下选项
  + img：文件要打包到的文件夹
  + name：获取图片原来的名字，放在该位置
  + hash:8：为了防止图片名称冲突，依然使用hash，但是我们只保留8位
  + ext：使用图片原来的扩展名
  + `name: 'img/[name].[hash:8].[ext]'`



### ES6语法处理

+ webpack打包的js文件，ES6语法并没有转成ES5，那么对一些还不支持ES6的浏览器没办法很好的运行我们的代码



## 3 引入Vue.js

+ npm install vue --save

+ runtime-only ：代码中不能有任何的template（vue的实例化就相当于一个template）
+ runtime-compiler ：代码中可以又template，因为compiler可以用于编译template



### el和template的区别（一）

+ 如果我们希望data中的数据显示在界面中，就必须修改index.html
+ 但如果我们后面自定义了组件，也必须修改index.html来使用组件
+ 但是html模板在之后的开发中，并不希望手动的来频繁修改
+ 定义template属性：
  + 在前面的Vue实例中，我们定义了el属性，用于和index.html中的#app进行绑定，让Vue实例之后可以管理它其中的内容
  + template中的内容会替换html中的内容

```js
new Vue({
  el: '#app',
  template: `
    <div>
    <h2>{{message}}</h2>
    <button @click="btnclick">按钮</button>
    </div>`,
  data: {
    message:'hello vue',
    name: 'coderwhy'
  },
  methods:{
    btnclick() {
      alert('啦啦啦')
    }
  }
```



### .vue文件封装处理

+ 安装vue-loader和vue-template-compiler

```
npm install vue-loader vue-template-compiler --save-dev
```

+ 修改webpack.config.js的配置文件：

```js
rules: [
      {
        test:/\.vue$/,
        use:['vue-loader']
      }
    ],
```

+ 报错vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config.
+ 降低vue-loader的版本，改为13的版本



## 4 plugin

+ plugin是插件的意思，通常是对某个现有的架构进行扩展
+ webpack中的插件，就是对webpack现有功能的各种扩展，比如打包优化，文件压缩等等
+ loader和plugin的区别
  + loader主要用于转换某些类型的模块，它是一个转换器
  + plugin是插件，它是对webpack本身的扩展，是一个扩展器
+ plugin的使用过程：
  + 步骤一：通过npm安装需要使用的plugins（某些webpack已经内置的插件不需要安装）
  + 步骤二：在webpack.config.js中的plugins中配置插件



### 添加版权的Plugin

+ BannerPlugin属于webpack自带的插件，为打包的文件添加版权声明
+ 修改webpack.config.js文件

```js
const webpack = require('webpack')
resolve: {
  plugins:[
      new webpack.BannerPlugin('最终版权归tjj所有')
  ]
}
```



### 打包html的plugin

+ 目前，我们的index.html文件是存放在项目的根目录下的
  + 在真实发布项目时，发布的是dist文件夹中的内容，但是dist文件夹中如果没有index.html文件，那么打包的js等文件也就没有意义
  + 所以，我们需要将index.html文件打包到dist文件夹中，这个时候就可以使用HtmlWebpackPlugin插件
+ HtmlWebpackPlugin插件可以为我们做这些事情：
  + 自动生成一个index.html文件(可以指定模板来生成)
  + 将打包的js文件，自动通过script标签插入到body中
+ 安装HtmlWebpackPlugin插件

```
npm install html-webpack-plugin --save-dev
```

+ 使用插件，修改webpack.config.js文件中plugins部分的内容如下：

```
const HtmlWebpackPlugin = require('html-webpack-plugin')
plugins:[
      new webpack.BannerPlugin('最终版权归tjj所有'),
      new HtmlWebpackPlugin({
      	template:'index.html'
      })
  ]
```



### js压缩的Plugin(打包时)

+ 在项目发布之前，我们必然需要对js等文件进行压缩处理
  + 使用一个第三方的插件uglifyjs-webpack-plugin,并且版本号指定1.1.1，和CLI2保持一致

```
npm install uglifyjs-webpack-plugin@1.1.1 --save-dev
```

+ 修改webpack.config.js文件，使用插件：

```js
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')

plugins:[
      new UglifyjsWebpackPlugin()
  ]
```

+ 查看打包后的bunlde.js文件是已经被压缩过了



### 搭建本地服务器

+ webpack提供了一个可选的本地开发服务器，这个本地服务器基于node.js搭建，内部使用express框架，可以实现我们想要的让浏览器的自动刷新显示我们修改后的结果
+ 不过它是一个单独的模块，在webpack中使用之前需要先安装它

```
npm install --save-dev webpack-dev-server@2.9.1
```

+ devserver也是作为webpack中的一个选项，选项本身可以设置如下属性：
  + contentBase：为哪一个文件夹提供服务，默认是根文件夹，我们这里要填写./dist
  + port：端口号
  + inline：页面实时刷新
  + historyApiFallback：在SPA页面中，依赖HTML5的history模式
+ webpack.config.js文件配置修改如下：

```js
devServer: {
    contentBase: './dist',
    inline:true,
  }
```

+ 我们可以再配置另外一个scripts：
  + --open参数表示直接打开浏览器

```js
"scripts": {
    "dev": "webpack-dev-server --open"
  },
```



+ 在终端中输入`webpack-dev-server`命令，默认情况下会在全局去找，但是我们只是局部安装，所以会报错
  + 方案一：相对路径 `./node_modules/.bin/webpack-dev-server`
  + 方案二：给其配置一个脚本`npm run dev`,这种情况下会先在局部去寻找



### 配置文件的分离

+ 安装插件

```
 npm install webpack-merge --save-dev
```



```js
const webpackMerge = require('webpack-merge')
const baseConfig = require('./base.config')

module.exports = webpackMerge(baseConfig, {
  devServer: {
    contentBase: './dist',
    inline:true,
  }
})
```





# 七、vuecli

## 1 什么是Vue CLI

+ 如果只是简单写几个Vue的Demo程序，那么你不需要Vue CLI
+ 如果你在开发大型项目，那么必须使用Vue CLI
  + 使用Vue.js开发大型应用时，需要考虑代码目录结构、项目结构和部署、热加载、代码单元测试等事情
  + 如果每个项目都要手动完成这些工作，那无疑效率比较低效，所以通常我们会使用一些脚手架工具来帮助完成这些事情
+ CLI是什么意思？
  + CLI是command-Line Interface，翻译为命令行界面，但是俗称脚手架
  + Vue CLI是一个官方发布vue.js项目脚手架
  + 使用vue-cli可以快速搭建Vue开发环境以及对应的webpack配置



### Vue CLI使用前提

+ 安装NodeJS
+ Vue.js官方脚手架工具就使用了webpack模板
  + 对所有的资源会压缩等优化操作
  + 它在开发过程中提供了一套完整的功能，能够使得我们开发过程中变得高效



## 2 Vue CLI的使用

+ 安装脚手架

```
npm install -g @vue/cli
```

### 拉取 2.x 模板 (旧版本)

```
npm install -g @vue/cli-init
```

+ Vue CLI2初始化项目

```
vue init webpack my-project
```

+ Vue CLI3初始化项目

```
vue create my-project
```



```
npm clean cache -force 指令相当于清空文件夹C:\Users\55\AppData\Roaming\npm-cache
```



### 关掉Eslint

+ 关掉Eslint在config文件夹下的index.js文件中将useEslint改为false
+ 脚手架三

```js
module.exports = {
    lintOnSave: false
}
```

+ 运行代码卸载eslint：`npm uninstall eslint --save`

### runtimecomplier和runtimeonly的区别



# 八、vue-router

## 1 路由概念

+ 路由是网络工程里面的一个术语
+ 路由就是通过互联网的网络吧信息从源地址传输到目的地址的活动
+ 路由器提供了两种机制：路由和转送
  + 路由时决定数据包从来源到目的地的路径
  + 转送将输入端的数据转移到合适的输出端
+ 路由中有一个非常重要的概念叫路由表
  + 路由表本质上就是一个映射表，决定了数据包的指向
+ 手动安装路由

```
 npm install vue-router --save
```





## 2 后端路由阶段

+ 早期的网站开发整个html页面是由服务器来渲染的
  + 服务器之间生产渲染好对应的html页面，返回给客户端进行展示
+ 但是，一个网站这么多页面服务器如何处理呢
  + 一个页面有自己对应的网址，也就是url
  + url会发送到服务器，服务器会通过正则对该url进行匹配，并且最后交给一个controller处理
  + controller进行各种处理，最终生成html或者数据，返回给前端
  + 这就完成了一个io操作

+ 后端处理url和页面之间的映射关系



## 3 前端路由阶段

+ 随着ajax的出现，有了前后端分离的开发模式
+ 后端只提供api来返回数据，前端通过ajax获取数据，并且可以通过JavaScript将数据渲染到页面中



## 4 单页面富应阶段

+ 其实spa最主要的特点就是在前后端分离的基础上加了一层前端路由
+ 也就是前端来维护一套路由规则



+ url的hash
  + url的hash也就是锚点（#），本质上是改变window.location的href属性
  + 我们可以通过之间赋值location.hash来改变href，但页面不发生刷新history.pushState({},'','home')



## 5 安装和使用vue-router

+ 步骤一：安装vue-router

``` 
npm install vue-router --save
```

+ 步骤二：在模块化工程中使用它（因为是一个插件，所以可以通过vue.use()来安装路由功能）
  + 导入路由对象，并且调用Vue.use(VueRouter)
  + 创建路由实例，并且传入路由映射配置
  + 在Vue实例中挂载创建的路由实例

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
//1、安装插件
Vue.use(VueRouter)
//2、创建路由对象
const routes = [

]

const router = new VueRouter({
  routes
})
//3、导出router
export default router

//在main.js文件夹中进行挂载路由实例
import router from './router'
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
```



+ 使用vue-router的步骤：
  + 第一步：创建路由组件
  + 第二部：配置路由映射：组件和路径映射关系
  + 第三步：使用路由：通过`<router-link>`和`<router-view>`

+ `<router-link>`：该标签是一个vue-router中已经**内置的组件**，它会被渲染成一个`<a>`标签
+ `<router-view>`：该标签会根据当前的路径，动态渲染出不同的组件
+ 在路由切换时，切换的是`<router-view>`挂载的组件，其他内容不会发生改变

```js
//在router的index.js文件中
import Home from "../components/Home";
import About from "../components/About";

//配置组件和路由的映射关系
const routes = [
  {
    path:'/home',
    component: Home
  },
  {
    path: '/about',
    component: About
  }
]
```

```html
//在app.vue中 
<div id="app">
    <router-link to="/home">首页</router-link>
    <router-link to="/about">关于</router-link>
    <router-view></router-view>
  </div>
```





### 路由的默认路径

配置解析：

+ 我们在routes中又配置一个映射
+ path配置的是根路径：/
+ redirect是重定向，也就是我们将根路径重定向到/home的路径下

```
path: '/',
redirect:'/home'
```





改变路径的方式有两种：

+ URL的hash
+ html5的history
+ 默认情况下改变使用的url的hash

```js
const router = new VueRouter({
  //配置路由和组件之间的关系
  routes,
  mode: 'history'
})
```



### router-link的属性

+ **to**：用于指定跳转的路径
+ **tag：**tag可以指定`<router-link>`之后渲染成什么组件，比如上面的
+ **replace：**replace不会留下history记录，所以指定replace的情况下，**后退键返回不能返回到上一个页面中**
+ **active-class：**当`<router-link>`对应的路由匹配成功时，会自动给当前元素设置一个router-link-active的class，设置active-class可以修改默认的名称
  + 在进行高亮显示的导航栏菜单或者底部tabbar时，会使用到该类
  + 但是通常不会修改类的属性，会直接使用默认的router-link-active
  + 若要修改所以的`<router-link>`的active-class的属性名去路由中设置

```js
const router = new VueRouter({
  linkActiveClass:'active'
})
```



### 通过代码跳转路由

```js
//给button绑定点击事件
export default {
  name: 'App',
  methods: {
    homeClick() {
      this.$router.push('./home')
    },
    aboutClick() {
      this.$router.push('./about')
    }
  }
}
```



### 动态路由

+ 在某些情况下，一个页面的path路径可能是不确定的，比如我们进入用户界面时除了有前面的/user之外，后面还跟上了用户的ID
+ 这种path和components的匹配关系，我们称之为动态路由（也是路由传递数据的一种方式）
+ 在index.js文件中的创建路由对象模块

```js
{
    path: '/user/:userId',
	component: User
}
```

+ 在app.vue文件中进行页面跳转

```js
<router-link :to="'/user/'+userId">用户</router-link>

data() {
    return {
      userId:'tjj'
    }
}
```



+ 在用户页面获得这个userId并显示出来

```vue
<template>
  <div>
    <h2>我是user界面</h2>
    <h3>啦啦啦啦啦啦啦啦啦</h3>
    <h3>{{userId}}</h3>
  </div>
</template>

<script>
  export default {
    name: "User",
    computed: {
      userId() {
          //route只得是当前处于活跃状态的路由，并且拿到这个对象
        return this.$route.params.abc
      }
    }
  }
</script>
```





## 6 认识路由的懒加载

+ 当打包构建应用时，JavaScript包会变得非常大，影响页面加载
+ 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更高效了

+ 方式一：结合Vue的一部组件和Webpack的代码分析
+ 方式二：AMD写法
+ 方式三：在ES6中，我们可以有更简单的写法来组织Vue异步组件和webpack的代码分割

```js
const Home = () => import('../components/Home.Vue')
```

+ 一个懒加载打包后对应一个js文件



## 7 认识嵌套路由

+ 嵌套路由是一个很常见的功能
+ 比如在home页面中，我们希望通过/home/news和/home/message访问一些内容
+ 一个路径映射一个组件，访问这两个路径也会分别渲染两个组件
+ 实现嵌套路由的两个步骤：
  + 创建对应的子组件，并且在路由映射中配置对应的子路由
  + 在组件内部使用`<router-view>`标签


```js
//映射关系
const HomeNews = () => import('../components/HomeNews')
const HomeMessage = () => import('../components/HomeMessage')

{
    path:'/home',
	component: Home,
	children: [
      {
        path:'',
        redirect: 'news'
      },
      {
        path:'news',
        component:HomeNews
      },
      {
        path:'message',
        component: HomeMessage
      }
    ]
}

//在父组件中进行显示
<router-link to="/home/news">新闻</router-link>
<router-link to="/home/message">消息</router-link>
<router-view></router-view>
```



## 8 vue-router参数传递

准备工作

+ 创建新的组件Profile.vue
+ 配置路由映射
+ 添加跳转的`<router-link>`

### 传递参数的方式

+ 传递参数主要有两种类型：params和query
+ **params的类型：**
  + 配置路由格式：/router/:id  `path: '/user/:userId'`
  + 传递的方式：在path后面跟上对应的值 `<router-link :to="'/user/'+ userId">用户</router-link>`
  + 传递后形成的路径：/router/123./router/abc
+ params类型在子组件中显示参数

```vue
<h2>{{$route.params.userId}}</h2>
//或者写成一个计算属性
<h2>{{userId}}</h2>
computed: {
	userId() {
		return this.$route.params.userId
	}
}
```



+ **query的类型：**（有大量数据需要传递时，采取这种方式）
  + 配置路由格式：/router，也就是普通配置
  + 传递的方式：对象中使用query的key作为传递方式
  + 传递后形成的路径：/router?id=123,/router?id=abc

```js
<!--    这是字符串的形式，要给它写成对象,好传参数-->
<!--    <router-link to="/profile">档案</router-link>-->
    <router-link :to="{path: '/profile', query: {name:'why',age:18, height:1.88}}">档案</router-link>
```

+ query类型在子组件中显示参数

```html
<h2>{{$route.query}}</h2>
<h2>{{$route.query.name}}</h2>
```





### 用代码进行页面跳转

```js
userClick() {
	this.$router.push('/user/'+ this.userId)
},
profileClick() {
    this.$router.push({
    path:'/profile',
    query:{
    name:'kobe',
    age:19,
    height:1.87
	}
   })
}
```



## 9 全局导航守卫

+ 监听来回跳转的过程
+ 用生命周期函数(在每个vue组件的实例化中)
+ 当页面较多时，不易维护

```js
  created() {
    console.log('create');
    document.title = '用户'
  }
```

+ 动态修改页面标题，在router的index.js文件中

```js
//前置守卫
router.beforeEach((to,from,next) => {
  document.title = to.matched[0].meta.title
  // console.log(to)
  next()
})
```



+ 如果是后置钩子，也就是afterEach，不需要主动调用next()函数，是跳转之后调用
  + 路由独享的守卫
  + 组件内的守卫



## 10 keep-alive遇见vue-router

+ keep-alive是Vue内置的一个组件，可以使被**包含的组件保留状态，或避免重新渲染**
  + include 字符串或正则表达式，只有匹配的组件会被缓存
  + exclude字符串或正则表达式，任何匹配的组件都不会被缓存

+ router-view也是一个组件，如果直接被包在keep-alive里面，所有路径匹配到的视图组件都会被缓存

```js
<keep-alive exclude="Profile,User">
	<router-view></router-view>
</keep-alive>
```

+ 通过create声明周期函数来验证









## 11 给路径取别名

+ 在build文件夹下的webpack.base.config.js文件

```js
alias: {
    '@': resolve('src'),
    'assets': resolve('src/assets'),
	'components': resolve('src/components'),
	'views':resolve('src/views')
}
```

+ DOM中用别名前面要加~符号



# tabbar样例小笔记

+ 动态绑定样式

```
<div :style="{color:activeStyle}"><slot name="item-text"></slot></div>
<div :style="activeStyle"><slot name="item-text"></slot></div>

activeStyle() {
	// return this.isActive ? this.activeColor : ''
    return this.isActive ? {color: this.activeColor}:{}
}
```





# 九、Promise

+ promise是异步编程的一种解决方案
+ 什么时候会来处理异步事件呢？
  + 一般是网络请求
  + 我们封装一个网络请求函数，因为不能立即拿到结果，所以不能像简单的3+4=7一样返回结果
  + 所以我们会传入另一个函数，在数据请求成功时将数据通过传入的函数调回去
  + 如果只是一个简单的网络请求，那么这种方案不会带来很大的麻烦
+ 但是当网络请求非常复杂时，就会出现回调地狱



## Promise三种状态

+ 当我们开发中有异步操作时，就可以给**异步操作包装一个promise**
+ 异步操作之后会有三种状态
  + pending：等待状态，比如正在进行网络请求，或者定时器没有到时间
  + fulfill：满足状态，当我们主动回调了resolve时，就处于该状态，并且会回调.then()
  + reject：拒绝状态，当我们主动回调reject时，就处于该状态，并且会回调.catch()



## Promise链式调用

+ 在看Promise的流程图时，发现无论是then还是catch都可以返回一个Promise对象

+ Promise.resolve()：将数据包装成Promise对象，并且在内部调回resolve()函数



## Promise的all方法使用

```js
Promise.all([
      // new Promise((resolve,reject) => {
      //   $.ajax({
      //     url:'url1',
      //     success:function (data) {
      //       resolve(data)
      //     }
      //   })
      // }),
      // new Promise((resolve, reject) => {
      //   $ajax({
      //     url: 'url2',
      //     success:function (data) {
      //       resolve(data)
      //     }
      //   })
      // })
      
      new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve('result1')
        },2000)
      }),
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('result2')
        },1000)
      })
  ]).then(results => {
    console.log(results);
  })
```



```
<slot :class="{active:isActive}" name="item-text"></slot>
```





# 十、Vuex

+ Vuex时一个专为Vue.js应用程序开发的状态管理模式
  + 它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化
  + Vuex也集成到Vue的官方调试工具devtools extension，提供了诸如零件配置的time-travel调试、状态快照导入导出等高级调试功能
+ 状态管理是什么？
  + 把需要多个组件共享的变量全部存储在一个对象里面
  + 将这个对象放在顶层的Vue实例中，让其他组件可以使用
  + 多个组件就可以共享这个对象中的所有变量属性



## 1 单界面到多界面状态管理切换

+ state：状态，可以当作data中的属性
+ view：视图层，可以针对state的变化，显示不同的信息
+ actions：主要是用户的各种操作，点击、输入等等

<img src="./pic/flow.png" style="zoom: 50%;" />

```
 //vuex安装
 npm install vuex --save
```

（一）首先我们需要某个地方存放我们的Vuex代码

+ 先创建一个文件夹store，并且在其中创建一个index.js

```js
import Vue from 'vue'
import Vuex from 'vuex'

//1、安装插件
Vue.use(Vuex)

//2、创建对象
const store = new Vuex.Store({
  state: {
    counter:1000
  },
  mutations: {
  },
  actions: {

  },
  getters: {

  },
  module: {

  }
})

//3、导出store对象
export default store



```



（二）其次，我们让所有的组件都可以使用这个store对象

+ 在mian.js文件，导入store对象，并且放在new Vue中
+ 在其他Vue组件中，就可以通过this.$store的方式，获取到这个store对象了

```js
//在main.js文件中进行挂载一下
//一旦挂载，所有的vue组件都有一个$store对象
import store from './store'
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
```



### 报错

+ Uncaught TypeError: __WEBPACK_IMPORTED_MODULE_1_vuex__.a.store is not a constructor

+ 解决办法：new Vuex.store() 修改为 new Vuex.Store

+ Property or method "$store" is not defined on the instance but referenced during render. Make sure that this property is reactive, either in the data option, or for class-based components, by initializing the property.
+ 解决办法：因为vuex下载 默认是vuex4版本 下载vuex3版本即可



+ Devtools是vue开发的一个浏览器插件

![](./pic/vuex.png)

## 2 通过mutation去监控state的变化

```js
mutations: {
  //  方法
    increment(state) {
      state.counter++
    },
    decrement(state) {
      state.counter--
    }
  },
      
//在vue.app中
methods: {
    addition() {
      this.$store.commit('increment')
    },
    substraction() {
      this.$store.commit('decrement')
    }
  }
```



### 总结

+ 提取出一个公共的store对象，用于保存多个组件中共享的状态
+ 将store对象放置在new Vue对象中，这样可以保证所有的组件都使用
+ 在其他组件中使用store对象中保存的状态即可
  + 通过this.$store.state属性的方式来访问状态
  + 通过this.$store.commit(mutation中方法)来修改状态
+ 注意事项：
  + 我们通过提交mutation的方式，而非直接改变store.state.count
  + 这是因为Vuex可以更明确的追踪状态的变化，所以不要直接改变store.state.count的值



### mutation状态更新

+ Vuex的store状态的更新唯一方式：提交mutation
+ mutation主要包括两部分
  + 字符串的事件类型（type）
  + 一个回调函数（handler），该回调函数的第一个参数就是state



### mutation传递参数

+ 在通过mutation更新数据的时候，有可能我们希望携带一些额外的参数
  + 参数被称为时mutation的载荷（Payload）
+ 如果参数不是一个，通常我们会以对象的形式传递，也就是playload是一个对象
+ 这个时候我们可以再从对象中取出相关信息

```js
//点击按钮添加一个学生信息 
addStudent() {
	const stu = {id:117,name:'krystal', age:28}
    this.$store.commit('addStudent',stu)
}

//在store的index.js文件中
mutations: {
    addStudent(state,stu) {
		state.student.push(stu)
	}
}

```



### mutation提交风格

+ 上面的通过commit进行提交是一种普通的方式
+ vue还提供了另外一种风格，它是一个包含type属性的对象，然后再跟上一些对应的参数

```js
addCount(count)
{
  //普通的提交
  // this.$store.commit('incrementCount',count)

  //特殊的提交封装
  this.$store.commit({
    type: 'incrementCount',
    count,

  })
}

incrementCount(state,count) {
    //普通提交过来的count就是原本的参数数字5，而特殊提交的count是整个对象
	console.log(count);
    state.counter += count
}
    
//mutation中的处理方式是将整个commit对象作为playload使用
incrementCount(state,playload) {
	state.counter += playload.count
}
```



### mutation响应规则

+ Vue的store中的state是响应式的，当state中的数据发生改变时，Vue组件会自动更新
+ state里面的数据属性都会被加到响应式系统中，而响应式系统会监听属性的变化，当属性发生变化时，会通知所有界面中用到该属性的地方，让界面发生刷新
+ **这就要求我们必须遵守一些vuex对应的规则**
  + 提前在store中初始化好所需要的属性
  + 当给state中的对象添加新属性时，使用下面的方式
    + 方式一：使用Vue.set(obj, 'newProp', 123)（如果修改的是数组，第二个参数就传number，如果是对象就传字符串）
    + 方式二：用新对象给旧对象重新赋值

```js
state.info['address'] = '洛杉矶'//无法做到响应式
Vue.set(state.info, 'address', '洛杉矶')
state.info.name = 'coderwhy'
```

+ 删除对象中的某一属性

```js
delete state.info.age //这种方法无法做到响应式
Vue.delete(state.info, 'age')
```



### mutation的类型常量

+ 在mutation中我们定义了很多事件类型（也就是其中的方法名称）
+ 当我们的项目增大时，Vuex管理的状态越来越多，需要更新状态的情况越来越多，那么意味着mutation中的方法越来越多

```js
//方法也可以这么写
['test']() {
    
}
```

+ 新建一个文件夹，命名为mutation-type

```js
//导出常量
export const INCREMENT = 'increment'

//导入常量，调用
import {
  INCREMENT
} from "./mutation-type";

mutation: {
    [INCREMENT](state) {
      state.counter++
    },
}
```



### mutation同步函数

+ 通常情况下，Vuex要求我们mutation中的方法必须是同步方法
  + 主要原因是当我们使用devtools时，devtools可以帮助我们捕捉mutation的快照
  + 但是如果是异步操作，那么devtools将不能很好的追踪这个操作什么时候会被完成
+ 通常情况下，不要在mutation中进行异步操作

```js
mutation() {
    [UPDATEINFO](state) {
      // state.info.name = 'coderwhy'
      setTimeout(() => {
        state.info.name = 'coderwhy'
      },1000)
    }
}


```





## 2 State单一状态树

+ （single source of truth）单一数据源
+ 如果你的信息状态时保存到多个store对象中的，那么之后的管理和维护等等都会变得非常困难
+ 所有vuex也使用了单一状态树来管理应用层级的全部状态
+ 单一状态树能够让我们最直接的方式找到某个状态的片段，而且在之后的调试和维护过程中，也可以非常方便的管理和维护



## 3 Getters基本使用

+ 有时候我们需要从store中获取一些state变异后的状态

```js
// 获取数据的平方
getters: {
    powerCounter(state) {
      return state.counter * state.counter
    }
  },
     
//使用      
<h2>{{$store.getters.powerCounter}}</h2>
```



+ 获取年龄大于20的学生信息

```js
getters:{
    more20stu(state) {
      // 在computer中的方法
      // return this.$store.state.student.filter(s => {
      //   return s.age > 20
      // })
        
      //箭头函数中函数体只有一行代码时可以简写,自动将其返回
      return state.student.filter(s => s.age > 20)
    }
}
```



+ 如果已经有了一个获取年龄大于20岁学生列表的getters，可以这样写

```js
//获取大于20随学生的人数,
more20stu(state) {
	return state.student.filter(s => s.age > 20)
},
//这里传入getters，也可以写成aaa，名字不重要，本质还是传入getters
more20stuLength(state,getters) {
	return getters.more20stu.length
},
```



+ getters默认是不能传递参数的，如果希望传递参数，那么只能让getters本身返回另一个函数

```js
//获取大于某个年龄的学生信息
//不能这样传入参数 moreAgeStu(state,age) 
//这里传入getters，也可以写成aaa，名字不重要，本质还是传入getters
moreAgeStu(state) {
      // return function (age) {
      //   return state.student.filter(s => s.age > age)
      // }
      return age => state.student.filter(s => s.age>age)
    }
```



## 4 Action的使用详解

+ action类似于mutation，是用来代替mutation进行异步操作的

```js
//app.vue文件
updateInfo() {
	this.$store.dispatch(UPDATEINFO,'我是携带的信息').then(res => {
		console.log('里面已经提交');
		console.log(res);
	})
}


mutations: {
  [UPDATEINFO](state) {
    state.Info.name = 'coderwhy'
  }
}

actions: {
  //context理解为store对象
  [UPDATEINFO](context,payload) {
    // setTimeout(() => {
    //   context.commit(UPDATEINFO)
    //   console.log(payload.message);
    //   payload.success()
    // },1000)

    return new Promise(((resolve, reject) => {
      setTimeout(() => {
        context.commit(UPDATEINFO)
        console.log(payload);
        resolve('11111')
      })
    }))
  }
```



## 5 modules的使用详解



```
  modules: {
    a:moduleA
  }
  
  <h2>------------------APP内容：modules的演示--------------------</h2>
    <h2>{{$store.state.a.idol}}</h2>
    <h2>{{$store.getters.fullname}}</h2>
    <h2>{{$store.getters.fullname2}}</h2>
    <h2>{{$store.getters.fullname3}}</h2>
    <button @click="updateName">修改名称</button>
    <button @click="asyncUpdateName">异步修改名字</button>
    
    
    const moduleA = {
  state: {
    idol: 'exo'
  },
  mutations: {
    [UPDATENAME](state,payload) {
      state.idol = payload
    }
  },
  actions: {
    //此时context不是store
    aUpdateName(context){
      setTimeout(() => {
        context.commit(UPDATENAME,'JJJJJJ')
      },1000)
    }
  },
  getters: {
    fullname(state) {
      return state.idol + '啦啦啦啦啦'
    },
    fullname2(state,getters) {
      return getters.fullname + '22222'
    },
    //将根模块的counter加入到后面,如果getters中也需要使用全局的状态，可以接受更多的参数
    fullname3(state,getters,rootState) {
      return getters.fullname2 + rootState.counter
    }
  }
}
```

+ action接收一个context参数对象
  + 局部状态通过context.state暴露出来，根节点状态则为context.rootState

```js
const moduleA = {
    action: {
        incrementIfoddOnRootSum({state,commit,rootStore}) {
            if((state.count + rootStore.count) % 2 === 1) {
                commit(;increment)
            }
        }
    }
}
```



+ 数组的解构

```js
//数组的解构
const names = ['why', 'kobe', 'james']
const name1 = names[0]
const name2 = names[1]
const name3 = names[2]
const [name1,name2,name3] = names;
```



## 6 项目结构

+ 当我们的Vuex帮助我们管理过多的内容时，好的项目结构可以让我们的代码更加清晰





# 十一、网络模块封装

+ 在前端开发中，我们常见的一种网络请求方式就是jsonp
  + 使用jsonp最主要的原因往往是为了解决跨域访问的问题
+ jsonp的原理是什么呢？
  + jsonp的核心在于通过`<script>`标签的src来帮助我们请求数据
  + 原因是我们的项目在部署在domian1.com服务器上时，是不能直接访问domian2.com服务器上的资料的
  + 这个时候我们利用`<script>`标签的src帮助我们去服务器请求到数据，将数据当作一个javascript的函数来执行，并且执行过程中传入我们需要的json
  + 所以封装的核心就在于我们监听window上的jsonp进行回调时的名称



## axios

+ 功能特点
  + 在浏览器中发送XMLHttpRequests请求
  + 在node.js中发送http请求
  + 支持PromiseAPI
  + 拦截请求和响应
  + 转换请求和响应数据
  + axios：ajax i/O system



## axios请求方式

+ 首先安装axios这个框架

```
npm install axios --save
```

+ 然后导入框架

```
import axios from 'axios'
```



```js
axios({
  url:'http://152.136.185.210:8000/api/w6/home/data',
  params: {
    type:'pop',
    page:1
  }
}).then(res => {
  console.log(res);
})
```





+ 有时候我们可能需求**同时发送两个请求**
  + 使用axios.all，可以放入多个请求的数组
  + axios.all返回的结果是一个数组，使用axios.spread可将数组[res1,res2]展开为res1，res2

```js
axios.all([
  axios({
    url:'http://152.136.185.210:8000/api/w6/home/multidata'
  }),
  axios({
    url:'http://152.136.185.210:8000/api/w6/home/data',
    params: {
      type:'pop',
      page: 1
    }
  })
]).then( res=> {
  console.log(res);
})

//将数组展开
then(axios.spread((res1,res2) => {
  console.log(res1);
  console.log(res2);
}))
```



## 全局配置

+ 在上面的示例中，我们的baseURL是固定的
  + 事实上，在开发过程中很多参数都可能是固定的
  + 这个时候我们可以进行一些抽取，也可以利用axios的全局配置

```js
axios.defaults.baseURL = 'http://152.136.185.210:8000/api/w6'
axios.defaults.timeout = 5000
```



## axios的实例

+ 为什么要创建axios实例
  + 当我们从axios模块中导入对象时，使用的实例就是默认实例
  + 当给该实例设置一些默认配置时，这些配置就被固定下来了
  + 但是后续开发中，某些配置可能会不太一样
  + 比如某些请求需要使用特定的baseURL或者timeout或者content-type等
  + 这个时候我们可以创建新的实例，并且传入属于该实例的配置信息

```js
//创建对应的axios的实例
const instance1 = axios.create({
  baseURL:'http://152.136.185.210:8000/api/w6',
  timeout: 5000
})

instance1({
  url:'/home/multidata'
}).then(res => {
  console.log(res);
})

instance1({
  url:'/home/data',
  params:{
    type:'pop',
    page:1
  }
}).then(res => {
  console.log(res);
})
```



## 对网络请求进行封装

+ 1、新建一个network文件夹，在内部创建一个request.js文件夹

```js
import axios from "axios";

//promise的方式
export function request(config) {
 return new Promise((resolve,reject) => {
   const instance = axios.create({
     baseURL:'http://152.136.185.210:8000/api/w6',
     timeout:5000
   })

   //发送真正的网络请求
   instance(config)
     .then(res => {
       resolve(res)
     }).catch(err => {
       reject(err)
     }
   )
 })
}

//方式一回调函数的方式
export function request(config,success,failure) {
  //创建axios实例
  const instance = axios.create({
    baseURL:'http://152.136.185.210:8000/api/w6',
    timeout:5000
  })
  //发送真正的网络请求
  instance(config).then(
    res => {
      success(res)
    }
  ).catch(
    err => {
      failure(err)
    }
  )
}
```

+ 在main.js文件中引用

```js
//5.封装request模块
import {request} from "./network/request";

//回调函数的方式
request({
  url:'/home/multidata',
}).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
})

//方式一
request({
  url:'/home/multidata'
  },res => {
    console.log(res);
  },err => {
  console.log(err);
})
```



## 拦截器

+ axios提供了拦截器，用于我们在发送每次请求或者得到相应请求后，进行对应的处理



```js
  //2.axios的拦截器
  instance.interceptors.request.use(config => {
    console.log(config);
    //请求拦截的作用：
    //比如config中的一些信息不符合服务器的要求
	//比如每次发送网络请求时，都希望在界面中显示一个请求的图标
	//某些网络请求（比如登录（token）），必须携带一些特殊的信息
    
    return config
  },err => {
    console.log(err);
  })
```



## better-scroll的使用

```
npm install better-scroll --save
```

+ 设置`overflow-y：scroll`也可以进行滚动，会将超出部分进行滚动

<img src=".\pic\schematic.png" alt="schematic" style="zoom: 33%;" />`



# 十二、项目开发

## 文件目录划分

+ components存放公共组件
  + common：存放不仅在当前项目会用到，而且在其他项目中也可能用到的组件
  + content：和业务相关的组件，在其他项目中不能用的组件
+ views：存放一些大的视图
+ router：路由相关的东西
+ store：公共状态管理的文件夹
+ network：网络相关的一些封装
+ common：存放一些公共js文件，
  + const.js：一些公共的常量需要抽取时，存放到此文件夹
  + utils.js：一些公共方法的抽取



```
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios";

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})


axios({
  url:'http://123.207.32.32:8000'
}).then(res => {
  console.log(res);
})

// const instance1 = axios.create({
//   baseURL:'http://123.207.32.32:8000',
//   timeout:5000
// })
//
// instance1({
//   url:'/home/multidata'
// }).then(res => {
//   console.log(res);
// })
//
// instance1({
//   url:'/home/data',
//   params: {
//     type:'pop',
//     page:1
//   }
// }).then(res => {
//   console.log(res);
// })

//5.封装request模块
// import {request} from './network/request'
//
// request({
//   url:'/home/multidata'
// },res => {
//   console.log(res);
// },err => {
//   console.log(err);
// })

```

