# 一、Web APIs简介

## Web APIs 阶段

+ Web APIs 是w3c组织的标准
+ Web APIs主要学习DOM和BOM
+ Web APIs是我们js独有的部分
+ 主要学习页面交互功能

## API和Web AIP

+ **API(Application Programming Interface 应用程序编程接口)**是一些预定义的函数，目的是提供应用程序与开发人员基于某软件或硬件得以访问一组例程的能力，而又无需访问源码，或理解内部工作机制的细节。即**API是给程序员提供的一种工具，以便能更轻松实现想要完成的功能。**

+ Web API是浏览器提供的一套操作浏览器功能和页面元素的API（BOM和DOM）



# 二、DOM

+ 文档对象类型（Document Object Model,简称DOM，是W3C组织推荐处理可扩展标记语言（HTML或者XML）的标准**编程接口**。通过这些DOM接口可以改变网页的内容、结构和样式。



## 1、DOM简介

### 1.1DOM树

+ 文档：一个页面就是一个文档，DOM中使用document表示
+ 元素：页面中的所有标签都是元素，DOM中使用element表示
+ 节点：网页中的所有内容都是节点，DOM中用node表示

DOM将以上内容都看作对象



## 2、获取元素（查）

### 根据ID获取

+ 使用**getElementById()**方法
  + [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)的方法 [`getElementById()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementById)返回一个匹配特定 [ID](https://developer.mozilla.org/en-US/docs/Web/API/Element/id)的元素.
  + **`element`**是一个 [Element](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 对象。如果当前文档中拥有特定ID的元素不存在则返回null.
  + **`id`**是大小写敏感的**字符串**，代表了所要查找的元素的唯一ID.
  + 返回一个匹配到 ID 的 DOM [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 对象。若在当前 [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 下没有找到，则返回 null


```js
<div id="time">2019-9-9</div>
<script>
	//因为文档页面从上往下加载，所以先得有标签，script写到标签下面
    var timer = document.getElementById('time');
    console.log(timer);
    //console.dir 打印我们返回的元素对象，更好的查看里面的属性和方法
    console.dir(timer);
</script>
```



### 根据标签名获取

+ 使用**getElementByTagName()**方法可以返回带有指定标签名的**对象的集合**
  + 返回的是获取过来元素对象的集合，以**伪数组**的形式存储的
  + 如果页面中只有一个li或者页面中没有这个元素，返回的都是伪数组形式（空）
+ 还可以某个元素（父元素）内部所有指定标签名的子元素
  + element.getEelementByTagName('标签名')；
  + 父元素必须是**单个对象**（必须指定是哪一个元素对象），获取的时候不包括父元素自己

```js
		var lis = document.getElementsByTagName('li');//获取的是整个页面中的li
        console.log(lis);
        console.log(lis[0]);

        //指定父元素，获得其子元素
        var ol = document.getElementsByTagName('ol');//获得的父元素的形式是伪数组
        console.log(ol[0].getElementsByTagName('li'));//指定单个父元素

        //也可以给ol指定一个id
        var ol = document.getElementById('ID');
        console.log(ol.getElementsByTagName('li'));
```



### 通过HTML5新增的方法获取

+ `document.getElementsByClassName('类名')` 根据类名会的某些元素的集合
+ `document.querySelector('选择器')` 根据指定选择器返回第一个元素对象
+ `document.querySelectorAll(选择器)`根据指定选择器返回

```js
// getElementsByClassName 根据类名会的某些元素的集合
var boxs = document.getElementsByClassName('box');
console.log(boxs);

//querySelector返回指定选择器的第一个元素对象
var firstBox = document.querySelector('.box');
console.log(firstBox);
var nav = document.querySelector('#nav');
console.log(nav);

//querySelectorAll返回指定选择器的所有元素对象的集合，伪数组的形式
var allBox = document.querySelectorAll('.box');
console.log(allBox);
var lis = document.querySelectorAll('li');
console.log(lis);
```



### 特殊元素获取

```js
//获取body标签
var bodyEle = document.body;
console.log(bodyEle);

//获取html
var htmlEle = document.documentElement;
console.log(htmlEle);
```



## 3、事件基础

### 事件概述

+ 事件：可以被JavaScript侦测到的行为，即触发--响应机制
+ 事件三要素
  + 事件源：事件被触发的对象
  + 事件类型：如何触发
  + 事件处理程序：通过一个函数赋值完成

```js
		//事件源:按钮
        var btn = document.getElementById('btn');
        //事件类型：鼠标点击（onclick）
        //事件处理程序
        btn.onclick = function() {
            alert('点秋香');
        }
```



+ 执行事件的步骤：
  + 获取事件源
  + 注册事件（绑定事件）
  + 添加事件处理程序（采取函数赋值形式）

```js
//事件执行步骤
// 点击div，控制台输出，我被选中l
//1、获取事件源
var div = document.querySelector('div');
//2、绑定事件，注册事件
//div.onclick
//3、添加事件处理程序
div.onclick = function() {
	console.log('我被选中l');
}
```





### 常见的鼠标事件

| 鼠标事件    | 触发条件         |
| ----------- | ---------------- |
| onclick     | 鼠标点击左键触发 |
| onmouseover | 鼠标经过触发     |
| onmouseout  | 鼠标离开触发     |
| onfocus     | 获得鼠标焦点触发 |
| onblur      | 失去鼠标焦点触发 |
| onmousemove | 鼠标移动触发     |
| onmouseup   | 鼠标弹起触发     |
| onmousedown | 鼠标按下触发     |



## 4、操作元素（改）

+ JavaScript的DOM操作可以改变网页内容、结构和样式，我们可以利用DOM操作元素，来改变元素里面的内容、属性等。注意：以下都是**属性**

### (1)操作元素的内容

+ `element.innerText` 从起始位置到终止位置的内容，但他去除html标签，**同时空格和换行也会去掉**
+ `element.innerHTMl` 起始位置到终止位置的全部内容，**包括html标签，同时保留空格和换行**

```js
//1、innerText不识别html标签，非标准
var div = document.querySelector('div');
div.innerText = '<strong>今天是：</strong> 2021'
//innerHTML识别html标签W3C标准
div.innerHTML = '<strong>今天是：</strong> 2021'


//这两个属性是可读可写的，可以获取元素里面的内容
var p = document.querySelector('p');
//innerText不识别HTML标签，会去除空格和换行
console.log(p.innerText);
//innerHTML,会保留空格和换行
console.log(p.innerHTML);
```



### (2)操作常用元素的属性操作

+ **`scr`** 、**`href`**
+ **`id`** 、**`alt`**、**`title`**

```js
<body>
    <button id="dog">小黄狗</button>
    <button id="scrafdog">围巾狗</button>
    <img src="../../pic1/图1.jpg" alt="" title="我是小黄狗">

    <script>
        //修改元素属性 src
        var dog = document.getElementById('dog');
        var scrafdog = document.getElementById('scrafdog');
        var img = document.querySelector('img');
        scrafdog.onclick = function () {
            img.src = '../../pic1/图9.jpg';
            img.title = '我是围巾狗';
        }
        dog.onclick = function () {
            img.src = '../../pic1/图1.jpg';
            img.title = '我是小黄狗';
        }
    </script>
</body>
```



+ 案例：分时显示不同图片，显示不同问候语
  + 根据不同时间，页面显示不同图片，同时显示不同的问候语
  + 如果上午时间打开页面，显示上午好，显示上午的图片

```js
	<img src="../pic/早上好.gif" alt="">
    <div>上午好</div>

    <script>
        //获取元素
        var img = document.querySelector('img');
        var div = document.querySelector('div');
        //得到当前的小时数
        var date = new Date();
        var h = date.getHours();
        //判断小时改变图片和文字信息
        if (h < 12) {
            img.scr = '../pic/早上好.gif';
            div.innerHTML = '早上好';
        } else if ( h < 18) {
            img.src = '../pic/中午好.gif';
            div.innerHTML = '中午好';
        } else {
            img.src = '../pic/晚上好.gif';
            div.innerHTML = '晚上好';
        }
    </script>
```



### (3)操作表单元素的属性

+ 利用DOM可以操作如下表单元素的属性：
+ **`type`**、**`value`**、**`checked`**、**`selected`**、**`disabled`**

```js
	<button>按钮</button>
    <input type="text" value="输入内容">
    <script>
        var btn = document.querySelector('button');
        var input = document.querySelector('input');
        btn.onclick = function () {
            //表单里面的值是通过value来修改的
            input.value = '被点击啦';
            btn.disabled = true;
            this.disabled = true;
            //this指向的是事件函数的调用者
        }
    </script>
```



#### 案例：仿京东显示密码

点击按钮将密码框切换为文本框，并可以查看密码明文

+ 核心思路：点击眼睛按钮，把密码类型改为文本框就可以看见里面的密码
+ 一个按钮两个状态，点击一次，切换为文本框，继续点击一次切换为密码框
+ 算法：利用一个flag变量，来判断flag的值，如果是1就切换文本框，flag设置为0；如果为0就切换为密码框，flag设置为1。

```js
		var eye = document.getElementById('eye');
        var pwd = document.getElementById('pwd');
        var img = document.querySelector('img');
        var flag = true;
        eye.onclick = function () {
            //点击一次后flag一定要变化
            if(flag == true) {
                pwd.type = 'text';
                img.src = '../pic/睁眼.png';
                flag = false;//赋值操作
            } else {
                pwd.type = 'password';
                img.src = '../pic/闭眼.png';
                flag = true;
            }
        }
```



### (3)操作元素样式属性

+ 可以通过js修改元素的大小、颜色、位置等样式
+ **`element.style`** 行内样式操作

```js
var div = document.querySelector('div');
div.onclick = function() {
    //this指向函数的调用者
    div.style.backgroundColor = 'purple';
    this.style.width = '100px';
}
```

+ 注意：
  1. Js里面的样式**采取驼峰命名法**，比如fontSize、backgroundColor
  2. Js修改style样式操作，产生的是**行内样式**，css权重比较高





+ **`element.className`** 类名样式操作

```js
let elm = document.getElementById("div1");

if (elm.className == "fixed") {
  // 跳过class属性为特定值的元素
  goNextElement();
}


var text = document.querySelector('div');
	text.onclick = function() {
    // text.style.backgroundColor = 'purple';
    this.className = 'change';//将text的类名改为change
}
```

+ 注意：
  + 如果样式修改较多，可以采取操作类名方式更改元素样式
  + class是个保留字，因此使用className来操作元素类名属性
  + className会直接更改元素的类名，会覆盖原先的类名



#### 案例：淘宝点击关闭二维码

当鼠标点击二维码关闭按钮时，则关闭整个二维码

+ 核心思路：利用样式的显示和隐式完成，display:none隐藏元素，display:block显示元素



#### 循环精灵图

+ 核心思路：利用for循环 修改精灵图片的背景位置background-position

```js
var lis = document.querySelectorAll('li');
for ( var i = 0; i < lis.length; i++ ) {
	var index = i*44;
    lis[i].style.backgroundPosition = '0 -' + index + 'px';
}
```



#### 显示隐藏文本框内容

+ 当鼠标点击文本框时，里面的默认文字隐藏，当鼠标离开文本框时，里面的文字显示
+ 表单首先需要两个新事件，获得焦点onfcus 失去焦点onblur
+ 如果获得焦点，判断表单里面的内容是否为默认文字，如果时默认文字就清空表单内容

```js
var text = document.querySelector('input');

text.onfocus = function() {
	if ( this.value === '手机') {
		this.value = '';
	}
	this.style.color = '#333';
}
text.onblur = function() {
	if( this.value === '') {
		this.value = '手机';
	}
		this.style.color = "#999";
}
```



#### 密码框验证信息

+ 首先判断的事件是表单失去焦点onblur
+ 如果输入正确则提示正确的信息颜色为绿色小图标变化
+ 如果输入不是6到16位，则提示错误信息颜色为红色小图标变化
+ 因为里面变化样式比较多，我们采取className修改样式

```js
var ipt = document.querySelector('.ipt');
var message = document.getElementsByClassName('message');
ipt.onblur = function() {
	if (ipt.value.length < 6 || ipt.value.length> 16) {
    	message[0].className = 'message wrong';
    	message[0].innerHTML = '您输入的位数不对要求6~16位';
    }else {
    	message[0].className = 'message right';
    	message[0].innerHTML = '您输入正确'
    }
}
```



### (4)排他思想

+ 如果有同一组元素，我们想要某一个元素实现某种样式，需要用到循环的排他思想：
+ 1、所有元素全部清除样式
+ 2、给当前元素设置样式
+ 3、注意顺序不能颠倒，首先干掉其他人，再设置自己

```js
var btns = document.getElementsByTagName('button');
for (var i = 0; i < btns.length; i++) {
    btns[i].onclick = function () {
        for (var j = 0; j < btns.length; j++) {
            btns[j].style.backgroundColor = '';
        }
        this.style.backgroundColor = 'pink';
    }
}
```



##### 注意：js中for循环中绑定事件

for循环先执行，然后对每一个lis[i]绑定onclick事件（即注册事件），但是并不执行（因为没有点击），for循环结束后,每次点击按钮都会触发这个事件，但此时已经和for循环没啥关系了，相当于每个onclick事件都成为了lis[i]的一个属性，而此时i为5，自然就不能 起到相应的作用了。




#### 百度换肤效果

```js
var imgs = document.querySelectorAll('.baidu img');
for (var i = 0; i < imgs.length; i++) {
    imgs[i].onclick = function () {
        var img = this.src;
        console.log(img);
        document.body.style.backgroundImage = 'url(' + img + ')';
    }
}
```



#### 表单全选和取消全选

+ 全选和取消全选：让下面所有复选框的checked属性（选中状态）跟随全选按钮即可
+ 下面复选框需要全部选中，上面全选才能选中做法：给下面所有复选框绑定事件，每次点击，都要循环查看下面所有的复选框是否有没有选中的，如果有一个没选中的，上面全选就不选中。

```js
var allcheck = document.getElementById('allcheck');
var eachcheck = document.querySelectorAll('td input');
allcheck.onclick = function () {
    for (var i = 0; i < eachcheck.length; i++) {
        eachcheck[i].checked = this.checked;
    }
}


for (var i = 0; i < eachcheck.length; i++) {
    eachcheck[i].onclick = function () {
        var flag = true;
        for (var i = 0; i < eachcheck.length; i++) {
            if (!eachcheck[i].checked) {
                flag = false;
                break;
            }
        }
        allcheck.checked = flag;
    }
}
```



### (5)自定义属性的操作

#### 1、获取属性值

+ `element.属性` 获取内置属性值（元素本身自带的属性）
+ `element.getAttribute('属性')`主要获得自定义的属性

#### 2、设置属性值

+ `element.属性 = '值'` 设置内置属性值（元素本身自带的属性）
+ `element.setAttribute('属性', '值')`主要设置自定义的属性

```js
div.className = 'navs';
console.log(div.className);

div.setAttribute('class', 'navs_s');
console.log(div.getAttribute('class')); //class特殊这里不是className
```



#### 3、设置移除自定义属性

+ `element.removeAttribute('属性')`



#### 4、tab栏切换制作

+  核心思路：给上面的tab_list 里面的所有小li添加自定义属性，属性值从0开始编号

```js
var tab_list = document.querySelector('.tab_list');
var lis = tab_list.querySelectorAll('li');
var items = document.querySelectorAll('.item');
for (var i = 0; i < lis.length; i++) {
    lis[i].setAttribute('index', i);
    lis[i].onclick = function () {
        // 干掉其人
        for (var i = 0; i < lis.length; i++) {
            lis[i].className = '';
            items[i].style.display = 'none';
        }
        // 留下自己
        this.className = 'current';
        var index = this.getAttribute('index');
        items[index].style.display = 'block';
    }
}
```



### (6)H5自定义属性

+ 自定义属性目的：是为了保存并使用数据。有些数据可以保存到页面中而不用保存到数据库中。

#### 1、设置H5自定义属性

+ H5规定自定义属性`data-`开头作为属性名并且赋值



####  2、获取H5自定义属性

+ 兼容获取`element.getAttribut('data-属性')`

+ H5新增`element.dataset.属性`或者`element.dataset['属性']`（只能获取data-开头的自定义属性）ie11才开始支持

```js
<div data-index="5" data-list-name="lili">dfdfkgj</div>

var div = document.querySelector('div');
div.setAttribute('data-time', 90);
// dataset是一个集合里面存放了所有以data开头的自定义属性
console.log(div.dataset);
console.log(div.dataset.index);
console.log(div.dataset['index']);
// 如果自定义属性里面有多个-链接的单词，我们获取的时候采取驼峰命名法
console.log(div.dataset.listName);
```



## 5、节点操作

### 5.1 为什么学节点操作

+ 利用DOM提供的方法获取元素逻辑性不强、繁琐
+ 利用节点层级关系获取元素，逻辑性强，兼容性稍差



### 5.2节点概述

+ 一般地，节点至少拥有nodeType（节点类型）、nodeName（节点名称）和nodeValue（节点值）这三个基本属性
  + 元素节点nodeType为1
  + 属性节点nodeType为2
  + 文本节点nodeType为3（文本节点包含文字、空格、换行等）



### 5.3节点层级（查）

#### 1.父级节点

+ **`node.parentNode`**
+ parentNode属性可返回某节点的父节点，是最近的一个父节点
+ 如果指定节点没有父节点则返回null

```html
<div class="demo">
    <div class="box">
        <span class="QR_code"></span>
    </div>
</div>

var QR_code = document.querySelector('.QR_code');
var box = QR_code.parentNode;
console.log(box);
```



#### 2.子节点

+ **`parentNode.childNodes()`**返回包含指定子节点的集合

+ 注意：返回值里面包含了所有的子节点，包括元素节点，文本节点等
+ 如果只想要获得里面的元素节点，则需专门处理

```js
var ul = document.querySelector('ul');
var lis = ul.childNodes;
console.log(lis);
console.log(lis[0].nodeType);

for (var i = 0; i < ul.childNodes.length; i++) {
    if (ul.childNodes[i].nodeType == 1) {
        console.log(ul.childNodes[i]);
    }
}
```



+ **`parentNode.children`**获取所有子元素节点



+ **`parentNode.firstChild`**



+ **`parentNode.firstElementChild`**（ie 9以上才支持）

```js
var ul = document.querySelector('ul');
console.log(ul.children[0]);
console.log(ul.children[ul.children.length - 1]);
```



##### 新浪下拉菜单

+ 导航栏里面的li都要有鼠标经过效果，所以需要循环注册鼠标事件
+ 核心原理：当鼠标经过li里面的第二个孩子ul显示，当鼠标离开，则ul隐藏

```js
// var lis = document.querySelectorAll('.nav>li');
var nav = document.querySelector('.nav');
var lis = nav.children;

for ( var i = 0 ; i < lis.length; i++) {
    lis[i].onmouseover = function() {
         this.children[1].style.display = 'block';
    }
    lis[i].onmouseout = function() {
        this.children[1].style.display = 'none';
    }
}

```



#### 3、兄弟节点

+ **`node.nextSibling`** 返回挡墙元素的下一个兄弟节点，找不到则返回null，同样，也是包含所有的节点
+ **`node.previousSibling`**返回挡墙元素的上一个兄弟节点，找不到则返回null，同样，也是包含所有的节点

+ **`node.nextElementSibling`**
+ **`node.previousElementSibling`** 这两个ie 9以上才支持
+ 封装一个兼容函数

```js
function getElementSibling(element) {
    var el = element;
    while(el = el.nextSibling) {
        if ( el.nodeType === 1)
            return el;
    }
    return null;
}
var ul = document.querySelector('ul')
console.log(getElementSibling(ul));
console.log(ul.nextSibling);
```



### 5.4创建节点

+ **`document.creatElement('tagName')`**创建由tagName指定的HTML元素。动态创建元素节点

### 5.5增加节点（增）

+ **`node.appendChild(child)`**将一个节点添加到指定父节点的子节点列表末尾
+ **`node.insertBefore(child,指定元素)`**

```js
var ul = document.getElementsByTagName('ul');
var li = document.createElement('li');
ul[0].appendChild(li);
var lili = document.createElement('li');
ul[0].insertBefore(lili, ul[0].children[0]);
```



### 简单版发布留言

+ 核心思路：点击按钮之后，就动态创建一个li，添加到ul里面
+ 创建li的同时，把文本域里面的值通过li.innerHTML赋值给li

```js
var btn = document.querySelector('button');
var text = document.querySelector('textarea');
var ul = btn.nextElementSibling;
btn.onclick = function () {
    if (text.value == '') {
        alert('您没有输入');
        return false;
    } else {
        var li = document.createElement('li');
        li.innerHTML = text.value;
        // ul.appendChild(li);
        ul.insertBefore(li, ul.children[0]);
    }

}
```



### 5.6 删除节点（删）

+ **`node.removeChild(child)`**从DOM中删除一个子节点，返回删除的节点

```js
var ul = document.querySelector('ul');
var btn = ul.previousElementSibling;
console.log(btn);
btn.onclick = function () {
    if (ul.children.length == 0) {
        btn.disabled = true;
    } else {
        ul.removeChild(ul.children[0]);
    }
}
```



+ 当我们把文本域里面的值赋给li的时候，多添加一个删除的链接
+ 需要把所有的链接获取过来，当我们点击当前的链接的时候，删除当前链接所在的li
+ 阻止链接跳转需要添加JavaScript：void(0)或者JavaScript:;

```js
btn.onclick = function() {
    if( text.value == '' ) {
        alert('您没有输入');
        return false;
    } else {
        var li = document.createElement('li');
        li.innerHTML = text.value + '<a href="JavaScript:;">删除</a>';
        // ul.appendChild(li);
        ul.insertBefore(li,ul.children[0]);
    }
    
    var as = document.querySelectorAll('a');
    for ( var i = 0; i < as.length; i++) {
        as[i].onclick = function() {
            ul.removeChild(this.parentNode);
        }
    }
}
```



### 5.7复制节点（克隆节点）

+ `node.cloneNode()`返回调用该方法的节点的一个副本
+ 括号为空或者里面是false 浅拷贝 只复制标签不复制里面的内容

```js
var li = document.querySelector('li');
var ul = document.querySelector('ul');
var lili = li.cloneNode(true);

// ul.appendChild(lili);
ul.insertBefore(lili, ul.children[0])
```





### 5.7三种动态创建元素区别

+ **document.write()**是直接将内容写入页面的内容流，但是文档流执行完毕，则它会导致页面全部重绘

```js
var btn = document.querySelector('button');
btn.onclick = function () {
    document.write('<div>123</div>');
}
```



+ **element.innerHTML**是将内容写入某个DOM节点，不会导致页面重绘
  + 创建多个元素效率更高（不要采取拼接字符串，采取数组形式拼接）结构稍微复杂
+ **document.createElement()**创建多个元素效率会稍微低一点点，但是结构更清晰

```js
<div class="inner"></div>
<div class="create"></div>

var inner = document.querySelector('.inner');
// for (var i = 0; i < 100; i++) {
//     inner.innerHTML += '<a href="#">百度</a>';
// }

var arr = [];
for (var i = 0; i < 100; i++) {
    arr.push('<a href="#">百度</a>');
}
inner.innerHTML = arr.join('');

var create = document.querySelector('.create');
for (var i = 0; i < 100; i++) {
    var a = document.createElement('a');
    create.appendChild(a);
}
```





