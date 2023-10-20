# 事件高级

## 1、注册事件

### 1.1 注册事件概述

给元素添加事件，称为注册事件或者绑定事件

注册事件有两种方式：传统方式和方法监听注册方式

#### 传统注册方式

+ 特点：注册事件唯一性
+ 同一个元素同一个事件只能设置一个处理函数，最后注册的处理函数将会覆盖前面注册的处理函数



#### 方法监听注册方式

+ w3c标准推荐方式
+ `addEventListener()`它是一个方法
+ IE9之前不支持此方法，可使用`attachEvent()`代替
+ 特点：同一个元素同一个事件可以注册多个监听器
+ 按注册顺序依次执行



### 1.2 addEventListener事件监听方式

+ `eventTarget.addEventListener(Type,listener[, useCapture])`
+ 该方法接受三个参数
  + type：事件类型字符串，比如click、mouseover，注意这里不要带on
  + listener：事件处理函数，事件发生时，会调用该监听函数
  + useCapture：可选参数，是一个布尔值，默认是false
+ 注册事件兼容型解决方案

```js
function addEventListener(element, eventName, fn) {
    if( element.addEventListener) {
        element.addEventListener(eventName,fn);
    } else if (element.attachEvent) {
        element.attachEvent('on' + eventName, fn);
    } else {
        // 相当于element.onclick = fn;
        element['on' + eventName] = fn;
    }
}
```



## 2、删除事件（解绑事件）

### 2.1删除事件的方式

#### 1、传统注册方式

+ `eventTarget.onclick = null`

#### 2、方法监听注册方式

+ `eventTarget.removeEventListener(type, listener[, useCapture]);`
+ `eventTarget.detachEvent(eventNameWithon, callback)`

```js
var divs = document.querySelectorAll('div');
divs[0].onclick = function () {
    alert(13);
    divs[0].onclick = null;
}

divs[1].addEventListener('click', fn)//里面的fn不需要调用加小括号
function fn() {
    alert(99);
    divs[1].removeEventListener('click', fn);
}
```



## 3、DOM事件流

事件流描述的是从页面中接受事件的顺序

事件发生时会在元素节点之间按照特定的顺序传播，这个传播过程即DOM事件流 

```js
// addEventListener第三个参数是true 事件流处于捕获阶段
var son = document.querySelector('.son');
son.addEventListener('click', function () {
    alert('son');
}, true);
var father = document.querySelector('.father');
father.addEventListener('click', function () {
    alert('father');
}, true);

// addEventListener第三个参数是false或者省略 事件流处于冒泡阶段
var son = document.querySelector('.son');
son.addEventListener('click', function () {
    alert('son');
}, false);
var father = document.querySelector('.father');
father.addEventListener('click', function () {
    alert('father');
}, false);
```

+ 有些事件是没有冒泡的，比如onblur、onfocus、onmouseover、onmouseleave



## 4、事件对象

+ event就是一个事件对象，写到我们监听函数里面的，当形参来看
+ 事件对象只有有了事件才会存在，他是系统给我们自动创建的，不需要我们每次传递参数
+ 事件对象是我们事件的一系列相关数据的集合

```js
var div = document.querySelector('div');
div.onclick = function (event) {
    console.log(event);
}

div.addEventListener('click', function (event) {
    console.log(event);
})

//兼容性处理
div.onclick = function (e) {
    e = e || window.event;
}
```



### 4.1事件对象的常见属性和方法

| 事件对象属性方法      | 说明                                  |
| --------------------- | ------------------------------------- |
| `e.target`            | 返回触发事件的对象                    |
| `e.srcElement`        | 返回触发事件的对象 非标准             |
| `e.type`              | 返回事件的类型 比如click              |
| `e.canceBubble`       | 该属性阻止冒泡 非标准                 |
| `e.returnValue`       | 该属性阻止默认事件（默认行为） 非标准 |
| `e.preventDefault()`  | 该方法组织默认事件（默认行为）标准    |
| `e.stopPropagation()` | 组织冒泡 标准                         |



+ `e.target`和this区别
  + `e.target`返回触发事件的对象
  + this返回的是绑定事件的对象

```js
<div>123</div>
<ul>
    <li>abc1</li>
    <li>abc2</li>
    <li>abc3</li>
</ul>

var div = document.querySelector('div');
div.addEventListener('click', function (e) {
    console.log(e.target);
    console.log(this);
})

var ul = document.querySelector('ul')
ul.addEventListener('click', function (e) {
    console.log(e.target);
    console.log(this);
})

// 兼容性写法
div.onclick = function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    console.log(target);
}
```



+ 阻止默认行为

```js
var a = document.querySelector('a');
a.addEventListener('click', function (e) {
    e.preventDefault();
})

// 传统的注册方式
a.onclick = function (e) {
    e.preventDefault();

    e.returnValue;

    // 特点：后面的代码不执行了，只限于传统的注册方式
    return false;
}
```



### 4.2阻止事件冒泡

事件冒泡：开始时由最具体的元素接受，然后逐级向上传播到DOM最顶层节点

```js
var father = document.querySelector('.father');
father.addEventListener('click', function (e) {
    alert('father');
    e.stopPropagation();
}, false);
```



## 5、事件委托（代理、委派）

+ 事件委托原理：不是每个子节点单独设置事件监听器，而是事件监听器设置在其父节点上，然后利用冒泡原理影响设置每个子节点

```js
<ul>
    <li>知否知否，应是绿肥红瘦！</li>
    <li>知否知否，应是绿肥红瘦！</li>
    <li>知否知否，应是绿肥红瘦！</li>
    <li>知否知否，应是绿肥红瘦！</li>
	<li>知否知否，应是绿肥红瘦！</li>
</ul>

var ul = document.querySelector('ul');
ul.addEventListener('click', function (e) {
    // alert('haha');

    for (var i = 0; i < ul.children.length; i++) {
        ul.children[i].style.backgroundColor = '#fff'
    }
    e.target.style.backgroundColor = 'pink';
})
```



## 6、常用的鼠标事件

### 6.1禁止选中文字和禁止右键菜单

+ 禁止鼠标右键菜单
+ `contextmenu`主要控制应该何时显示上下文菜单，主要用于程序员取消默认的上下文菜单
+ 禁止鼠标选中（selectstart开始选中）

```js
document.addEventListener('contextmenu', function(e){
    e.preventDefault();
})

document.addEventListener('selectstart', function(e){
    e.preventDefault();
})
```



### 6.2鼠标事件对象

+ event对象代表事件的状态，跟事件相关的一系列信息的集合

| 鼠标事件对象 | 说明                                   |
| ------------ | -------------------------------------- |
| `e.clientX`  | 返回鼠标相对于浏览器窗口可视区的X坐标  |
| `e.clientY`  | 返回鼠标相对于浏览器窗口可视区的Y坐标  |
| `e.pageX`    | 返回鼠标相当于文档页面的X坐标 IE9+支持 |
| `e.pageY`    | 返回鼠标相当于文档页面的Y坐标 IE9+支持 |
| `e.screenX`  | 返回鼠标相对于电脑屏幕的X坐标          |
| `e.screenY`  | 返回鼠标相对于电脑屏幕的Y坐标          |



```js
document.addEventListener('click', function(e) {
    console.log(e.clientX);
    console.log(e.clientY);

    console.log(e.pageX);
    console.log(e.pageY);
})
```



### 案例：跟随鼠标的天使

+ 鼠标不断移动，使用鼠标移动事件：mousemove
+ 在页面中移动，给document注册事件
+ 图片要移动距离，而且不占位置，我们使用绝对定位
+ 核心原理：每次鼠标移动，我们都会获得最新的鼠标坐标，把这个x和y坐标作为图片的top和left值就可以移动图片

```js
img{
	position: absolute;        
}

var img = document.querySelector('img');
document.addEventListener('mousemove', function (e) {
    img.style.left = e.pageX - 150 + 'px';
    img.style.top = e.pageY - 150 + 'px';
})
```



## 7、常用的键盘事件

### 7.1常用键盘事件

| 键盘事件   | 触发条件                                                     |
| ---------- | ------------------------------------------------------------ |
| onkeyup    | 某个键盘按键被松开时触发                                     |
| onkeydown  | 某个键盘按键被按下时触发                                     |
| onkeypress | 某个键盘按键被按下时触发   但是它不识别功能键 比如ctrl shift 箭头等 |



```js
document.onkeyup = function() {
    console.log('我谈起了');
}
document.addEventListener('keydown', function(){
    console.log('我down');
})
```

+ onkeydown和 onkeypress 一直 按住会一直触发
+ 执行顺序为onkeydown->onkeypres -> onkeyup



### 7.2键盘事件对象

| 键盘事件对象属性 | 说明             |
| ---------------- | ---------------- |
| keyCode          | 返回改键的ASCⅡ值 |



```js
document.addEventListener('keyup', function(e){
    console.log(e);
    console.log(e.keyCode);
})
```

+ keyup 和 keydown事件不区分字母大小写 a和A得到的都是65
+ keypress事件区分字母大小写



### 案例：模仿京东按键输入内容案例

```js
var input = document.querySelector('input');
document.addEventListener('keyup', function (e) {
    if (e.keyCode == 83) {
        input.focus();
    }
})
```





+ 表单检测用户输入：给表单添加键盘事件
+ 同时把快递单号里面的值（value）获取过来赋值给con盒子（innerText）作为内容
+ 如果快递单号里面的内容为空则隐藏大号字体盒子（con）
+ 注意：keydown和keypress在文本框里面的特点，他们两个事件触发的时候，文字还没有落入文本框中

```js
var jd = document.querySelector('.jd');
var con = document.querySelector('.con');
jd.addEventListener('keyup', function () {
    if (this.value == '') {
        con.style.visibility = 'hidden';
    } else {

        con.innerHTML = jd.value;
        con.style.visibility = 'visible';
    }
})

jd.addEventListener('blur', function() {
    con.style.visibility = 'hidden';
})
jd.addEventListener('focus',function() {
    if(this.value != '') {
        con.style.visibility = 'visible';
    }
})
```

