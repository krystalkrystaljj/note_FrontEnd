# BOM浏览器对象模型

## 1 BOM概述

### 1.1什么是BOM

+ BOM（browser object model）即浏览器对象模型，他提供了独立于内容而与浏览器窗口进行交互的对象，其核心对象是window
+ BOM由一系列对象构成，并且每个对象都提供了很多方法和属性
+ BOM缺乏标准，JavaScript语法标准化阻止是ECMA，DOM的标准组织是W3C，BOM最初是Netscape浏览器标准的一部分



### 1.2BOM构成

window对象是浏览器的顶级对象，它具有双重角色

+ 他是js访问浏览器窗口的一个接口
+ 它是一个全局对象。定义在全局作用域中的变量、函数都会变成window对象的属性和方法
+ 如果要查看所有对象的属性和方法，可以使用`console.dir`方法



## 2 window对象的常见事件

### 2.1 窗口加载事件

>window.addEventListener('load', function() {})
>
>或者window.onload = function() {}

+ window.onload是窗口（页面）加载事件，当文档内容完全加载完成会触发该事件（包括图像、脚本文件、css文件等），就调用的处理函数

```js
window.onload = function() {
    var btn = document.querySelector('button');
    btn.addEventListener('click',function() {
        alert('点击我');
    })
}
```

+ window.onload传统注册事件方式只能写一次，如果有多个，会以最后一个window.onload为准，window.addEventListener没有限制
+ onload是等页面内容全部加载完毕，再去执行处理函数



>document.addEventListener('DOMContentLoaded',function() {})

+ DOMContentLoaded事件触发时，仅当DOM加载完成，不包括样式表，图片，flash等等
+ 如果页面的图片很多的话，从用户访问到onload触发可能需要较长的时间，交互效果就不能实现，必然影响用户体验，此时用DOMContentLoaded事件比较合适



### 2.2调整窗口大小事件

> window.onresize = function() {}
>
> window.addEventListener('resize', function() { })

+ 是调整窗口大小加载事件，当触发时就调用的处理函数
+ 只要窗口大小发生变化，就会触发这个事件
+ 我们经常利用这个事件完成响应式布局。Window.innerWidth当前屏幕的宽度

```js
window.addEventListener('load', function(){
    var div = document.querySelector('div');
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 800) {
            div.style.display = 'none';
        } else {
            div.style.display = 'block';
        }
    })
})
```



## 3 定时器

### 3.1 两种定时器

+ setTimeout()
  + setTimeout()方法用于设置一个定时器，该定时器在定时器到后期执行调用函数
+ setInterval()
  + setInterval()方法重复调用一个函数，每隔这个时间，就去调用一次回调函数



### 3.2 setTime()定时器

+ window.setTimeout(调用函数，[延迟的毫秒数])；
+ 延时时间单位是毫秒，如果省略默认为0
+ window可以省略

```js
setTimeout( function() {
    console.log('爆炸啦');
},2000)

function callback() {
    console.log('爆炸啦');
}
var time1 = setTimeout(callback,3000);
var time2 = setTimeout(callback,5000);
```



### 案例：5s之后自动关闭的广告

```js
var pic = document.querySelector('img');
setTimeout(function () {
    pic.style.display = 'none';
}, 5000)
```



### 3.3 停止setTimeout()定时器

+ window.clearTimeout(timeout ID)

```js
var btn = document.querySelector('button');
var timer = setTimeout(function () {
    console.log('爆炸');
}, 5000);

btn.addEventListener('click', function () {
    clearTimeout(timer)
})
```



### 3.4停止setInterval()定时器

+ window.setInterval(intervalID)

```js
var begin = document.querySelector('.begin');
var stop = document.querySelector('.stop');
var timer = null; // 全局变量 null是一个空对象
begin.addEventListener('click', function () {
    //不可以直接在这里添加标识符，因为会是局部变量
    timer = setInterval(function () {
        console.log('how are you');
    }, 1000)
})

stop.addEventListener('click', function () {
    clearInterval(timer)
})
```



### 案例：发送短信

+ 按钮点击之后，会禁用disabled为true
+ 同时按钮里面的内容会变化，注意button里面的内容通过innerHTML修改
+ 里面秒数是有变化的，因此需要用到定时器
+ 定义一个变量，在定时器里不断递减
+ 如果变量为0说明到了时间，我们需要停止定时器，并且复原按钮初始状态

```js
var btn = document.querySelector('button');
btn.addEventListener('click', function () {
    var time = 5;
    btn.disabled = true;
    var timer = setInterval(function () {
        if (time == 0) {
            clearInterval(timer);
            btn.disabled = false;
            btn.innerHTML = '发送';
        } else {
            btn.innerHTML = '还剩' + time + '秒';
            time--;
        }
    }, 1000)

})
```



### 3.6 this

this的指向在函数定义的时候是确定不了的，只有函数执行的时候才能确定this到底指向谁，一般情况下this的最终指向的是调用它的那个对象

+ 全局作用域或者普通函数中this指向全局对象window（注意定时器里面的this指向window）

```js
console.log(this);

// 在全局作用域下的函数，会作为window的一个方法，window.fn()
function fn() {
    console.log(this);
}
fn();

// window.setTimeout()
setTimeout(function () {
    console.log(this);
}, 1000)
```



+ 方法调用中谁调用this指向谁

```js
function fn() {
    console.log(this);//this指向的是fn的实例对象
}
var fun = new fn();//利用构造函数创建一个空对象
```



## 4 JS执行队列

### 4.1 JS是单线程

JavaScript语言的一大特点就是单线程，也就是说，同一个时间只能做同一件事



### 4.2同步和异步

+ 为了解决这个问题，利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JavaScript创建多个线程。于是JS中出现了同步和异步
+ 同步和异步的本质区别：这条流水线上各个流程的执行顺序不同

同步任务

+ 都在主线程上执行，形成一个执行栈

异步任务

+ JS的异步是通过回调函数实现的
+ 一般而言，异步任务有一下三种类型
  + 普通事件，如click、resize等
  + 资源加载，如load、error等
  + 定时器，包括setInterval、setTimeout等
+ 异步任务相关回调函数添加到任务队列中（任务队列也称消息队列）

### 4.3 执行机制

+ 先执行执行栈中的同步任务
+ 异步任务（回调函数）放入任务队列中
+ 一旦执行栈中的所有同步任务执行完毕，系统就会按次序读取任务队列中的异步任务，于是被读取的异步任务结束等待状态，进入执行栈，开始执行
+ 由于主线程不断的重复获得任务、执行任务、再获取任务、再执行，所以这种机制被称为事件循环



## 5 location对象

### 5.1 什么是location对象

window对象给我们提供了一个location属性用于获取或设置窗体的URL，并且可以用于解析URL。因为这个属性返回的是一个对象，所以我们将这个属性称为location对象

### 5.2 location对象的属性

| location对象属性  | 返回值                           |
| ----------------- | -------------------------------- |
| location.href     | 获取或者设置整个URL              |
| location.host     | 返回主机（域名）                 |
| location.port     | 返回端口号 如果未写 返回空字符串 |
| location.pathname | 返回路径                         |
| location.search   | 返回参数                         |
| location.hash     | 返回片段 #后面内容，常见于描点   |



### 案例：5s之后跳转页面

```js
var btn = document.querySelector('button');
btn.addEventListener('click', function () {
    location.href = 'http://www.baidu.com';
})
var div = document.querySelector('div');
var time = 5;
setInterval(function () {
    if (time == 0) {
        location.href = 'http://www.baidu.com';

    } else {
        div.innerHTML = time + '后跳转';
        time--;
    }

}, 1000);
```



### 案例：获取URL参数

+ 主要练习数据再不同页面的传递

```html
<!-- 默认是get请求 -->
<form action="10_获取URL参数index.html">
	<div>登录页面</div>
    用户名：<input type="text" name="uname">
    <input type="submit" value="登录">
</form>
```



```js
console.log(location.search);
var params = location.search.substring(1);
console.log(params);

var arr = params.split('=');
console.log(arr);

var span = document.querySelector('span');
span.innerHTML = arr[1];
```



### 5.3 location对象的方法

| location对象方法   | 返回值                                                       |
| ------------------ | ------------------------------------------------------------ |
| location.assign()  | 跟href一样，可以跳转页面（也称为重定向页面）                 |
| location.replace() | 替换当前页面，因为不记录历史，所以不能后退页面               |
| location.reload()  | 重新加载页面，相当于刷新按钮或者F5如果参数为true强制刷新ctrl+F5 |



## 6 navigator对象

navigator对象包含有关浏览器的信息，它有很多属性，我们最常用的userAgent，该属性可以返回有客户机发送服务器的user-agent头部的值。



## 7 history对象

window对象给我们提供了一个history对象，与浏览器历史记录进行交互。该对象包含用户（在浏览器窗口中）访问过的URL。

| history对象方法 | 作用                                                       |
| --------------- | ---------------------------------------------------------- |
| back()          | 可以后退功能                                               |
| forward()       | 前进功能                                                   |
| go(参数)        | 前进后退功能 参数如果是1前进一个页面，如果是-1后退一个页面 |



# PC端网页特效

## 1 元素偏移量offset系列

### 1.1 offset概述

使用offset系列相关属性可以动态的得到该元素的位置（偏移）、大小等

+ 获得元素距离带有定位父元素的位置
+ 获得元素自身的大小（宽度高度）
+ 注意：返回的数值都不带单位

| offset系列属性       | 作用                                                         |
| -------------------- | ------------------------------------------------------------ |
| element.offsetParent | 返回作为该元素带有定位的父级元素 如果父级都没有固定定位则返回body |
| element.offsetTop    | 返回元素相对带有定位父元素上方的偏移，如果没有父亲或者父亲没有定位，则以body为准 |
| element.offsetLeft   | 返回元素相对带有定位父元素左边框的偏移                       |
| element.offsetWidth  | 返回自身包括padding、边框、内容区的宽度，返回数值不带单位    |
| element.offsetHeight | 返回自身包括padding、边框、内容区的宽度，返回数值不带单位    |



+ node.parsentNode返回父亲是最近一级的父亲，不管父亲有没有定位
+ element.offsetParent返回的是带有定位的父亲

### 1.2 offset与style的区别

offset

+ 可以得到任意样式表中的样式值
+ offset系列获得的数值是没有单位的
+ offsetWidth包含padding+width+border
+ offsetWidth等属性是只读属性，只能获取而不能赋值
+ **所以我们想要获取元素大小的位置，用offset更合适**

style

+ 只能得到行内样式表中的样式值
+ style.width获得的是带有单位的字符串
+ style.width获得不包含padding和border的值
+ style.width是可读可写属性，可以获取也可以赋值
+ **所以我们想要给元素更改值，则需要用style改变**

```js
<div class="w" style="width:100px"></div>
console.log(w.style.width);
```



### 案例：获取鼠标在盒子内坐标

+ 鼠标移动事件mousemove

```js
var box = document.querySelector('.box');
box.addEventListener('mousemove', function (e) {
    var x = e.pageX - this.offsetLeft;
    var y = e.pageY - this.offsetTop;
    this.innerHTML = 'x坐标' + x + ' y坐标' + y;

})
```



## 案例：仿京东放大镜效果

整个案例可以分为三个功能模块：

+ 鼠标进过小盒子图片，黄色遮挡层和大图片盒子显示，离开隐藏2个盒子功能
+ 黄色遮挡层跟随鼠标功能
+ 移动黄色遮挡层，大图片随移动功能



## 2 元素可视区client系列

client系列的相关属性来获取元素可视区的相关信息。通过client系列的相关属性可以动态的得到该元素的边框大小、元素大小等。

| client系列属性       | 作用                                                         |
| -------------------- | ------------------------------------------------------------ |
| element.clientTop    | 返回元素上边框的大小                                         |
| element.clientLeft   | 返回元素左边框的大小                                         |
| element.clientWidth  | 返回自身包括padding、内容区的宽度，不含边框，返回数值不带单位 |
| element.clientHeight | 返回自身包括padding、内容区的高度，不含边框，返回数值不带单位 |



### 案例：淘宝flexible.js源码分析

立即执行函数`(function(){})()`或者`(function(){}())`

主要作用：创建一个独立的作用域，避免了命名冲突问题



## 3 元素滚动scroll系列

可以动态的得到该元素的大小，滚动距离等

| client系列属性       | 作用                                         |
| -------------------- | -------------------------------------------- |
| element.scrollTop    | 返回被卷去的上侧距离，返回数值不带单位       |
| element.scrollLeft   | 返回被卷去的左侧距离，返回数值不带单位       |
| element.scrollWidth  | 返回自身实际宽度，不含边框，返回数值不带单位 |
| element.scrollHeight | 返回自身实际高度，不含边框，返回数值不带单位 |

+ 滚动条在滚动时会触发onscroll事件

```js
var div = document.querySelector('div');
console.log(div.scrollHeight);
console.log(div.clientHeight);
div.addEventListener('scroll', function () {
    console.log(parseInt(div.scrollTop));
})
```



### 案例：仿淘宝固定右侧侧边栏

+ 原先侧边栏是绝对定位
+ 当页面滚动到一定位置，侧边栏改为固定定位
+ 页面继续滚动，会让返回顶部显示出来
+ **页面**被卷去的头部：可以通过window.pageYOffset获得，如果被卷去的左侧window.pageXOffset
+ 元素被卷去的头部是element.scrollTop,如果页面被卷去的头部window.pageYOffset



### mouseenter和mouseover的区别

+ 两者区别是：mouseover鼠标经过自身盒子会触发，经过子盒子还会触发。mouseenter只会经过自身盒子触发，之所以这样是因为mouseenter不会冒泡
+ 跟mouseenter搭配鼠标离开mouseleave同样不会冒泡



## 4 动画函数封装

### 4.1 动画实现原理

核心原理：通过定时器setInterval()不断移动盒子位置

实现步骤：

1. 获得盒子当前位置
2. 让盒子在当前位置加上1个移动距离
3. 利用定时器不断重复这个操作
4. 加1一个结束定时器的条件
5. 注意此元素需要添加定位，才能使用element.style.left



### 4.2 动画函数简单封装

+ 注意函数需要传递2个参数，动画对象和移动到的距离

```js
var div = document.querySelector('div');
var span = document.querySelector('span');
function antimate(obj, target) {
    //每写一个var都会开辟一个新的空间
    var timer = setInterval(function () {
        obj.style.left = obj.offsetLeft + 1 + 'px';
        if (obj.offsetLeft >= 200) {
            clearInterval(timer);
        }
    }, target);
}

antimate(div, 30);
antimate(span, 30);
```



### 4.3 动画函数给不同元素记录不同定时器

如果多个元素都是用这个动画函数，每次都要var声明定时器。我们可以给不同的元素使用不同的定时器（自己专门用自己的定时器）

核心原理：利用js是一门动态语言，可以很方便的给当前对象添加属性



### 4.4 缓动效果原理

缓动动画就是让元素运动速度有所变化，最常见的是让速度慢慢停下来

1. 让盒子每次移动的距离慢慢变小，速度就会慢慢落下来
2. 核心算法：（目标值-现在的位置）/ 10 做为每次移动的距离步长
3. 停止条件是：让当前盒子位置等于目标位置就停止定时器 
4. 注意步长值需要取整



### 4.5 动画函数多个目标值之间移动

当我们点击按钮的时候，判断步长是正值还是负值

1. 如果是正值，则步长往大了取整
2. 如果是负值，则往小了取整



### 4.6 动画函数添加回调函数

回调函数原理：函数作为一个参数。将这个函数作为参数传到另一个函数里面，当哪个函数执行完之后，再执行传进去的这个函数，这个个过程叫做回调。

回调函数写的位置：定时器结束后



### 4.7 动画函数封装到单独js文件里面





## 5 常见网页特效案例

### 案例：网页轮播图

+ 单独创建js文件，引入页面中，此时需要添加load事件
+ 自动播放功能
+ 添加一个定时器
+ 自动播放功能，实际就类似点击了右侧按钮
+ 此时我们手动调用右侧按钮点击事件arrow_r.click()



### 5.1节流阀

防止轮播图按钮连续点击造成播放过快

节流阀的目的：当上一个函数动画内容执行完毕，再去执行下一个函数动画，让事件无法连续触发

核心实现思路：利用回调函数，添加一个变量来控制，锁住函数和解锁函数

+ 开始设置一个变量`var flag = true`
+ `if(flag){ flag = false; do something}`关闭水龙头
+ 利用回调函数动画执行完毕，`flag = true`



### 案例：返回顶部

滚动窗口至文档中的特定位置

+ `window.scroll(x,y)`，x和y是不带单位的
+ 此时可以继续使用我们封装的动画函数
+ 只要把所有与left相关的值改为跟垂直滚动距离相关的就可以了
+ 页面滚动了多少可以通过`window.pageYOffset`



### 案例：筋斗云

鼠标经过某个小li，筋斗云跟到当前的位置

鼠标离开某个小li，筋斗云恢复到原来的位置

鼠标点击某个小li，筋斗云停留在当前位置   



# 移动端网页特效

## 1 触屏事件

### 1.1 触屏事件概述

| 触屏touch事件        | 说明                                         |
| -------------------- | -------------------------------------------- |
| touchstart           | 手指触摸到一个DOM元素时触发                  |
| element.scrollLeft   | 返回被卷去的左侧距离，返回数值不带单位       |
| element.scrollWidth  | 返回自身实际宽度，不含边框，返回数值不带单位 |
| element.scrollHeight | 返回自身实际高度，不含边框，返回数值不带单位 |

+ 

## 2移动端常见特效



## 3 移动端常用开发插件



## 4 移动端常用开发框架





定义了一个这样设计的话就是面向抽象而不是面向具体，还

 

如果具体到具体，cpu具有读写的方法，内存也具有那么就具有四个方法，，

 

 

对修改是封闭的，对拓展是开放的，每个接口是应该是单一的职能，所以hardware下有可存储的硬件，也有非存储的硬件，可存储的硬件，非存储的硬件

 

定长，前两位表示他是指令还是数据，如果他是00就是数据，前两位只要有1的话就是表示操作

Charat选择出一个字符，是一个ask码，减去0之后余的就是1或者0

 

 

为什么要判断是否为cpu？

只是单纯的存储器比如内存或者硬盘里面有一个存储单元，只需要指定位置，就可以往里面读取数据，cpu的话不一样只有一个index坐标，和IR存放指令，所以他的读写操作和硬盘是不一样的，看看pc的位置，自加1，然后判断

PC是作为cpu的一个属性存在，但我自定义pc的一个类，是我认为他内部也有操作是他自己的。



pc是一个名词，而且是一个独立的硬件，我觉得有必要把他封装成一个类，这个类作为cpu的一个属性

首先设计了computer、memory、harddisk、cpu、hardDisk、Bus六个类，在cpu中含有4个属性 ALU、ID、IR、PC，将这四个属性分别写为四个类，封装了一个output类，将信息输出到一个日志文件

 

```
数据字符串初始化,模拟数字字符串
//所以写成-1，-1的位置是无效的，直接向IR中编写
            //若B是CPU,则不需要指明位置，写入IR寄存器即可，并且CPU自加1
```
