## JavaScript的事件处理

### 1 认识事件处理

+ **web页面需要经常和用户**之间进行交互，而交互的过程中我们可能想要捕捉这个交互过程
  + 比如用户点击了某个按钮、用户在输入框中输入了某个文本、用户鼠标经过了某个位置
  + 浏览器需要搭建一条**JavaScript代码和事件之间的桥梁**
  + 当某个事件发生时，让JavaScript可以**相应执行某个函数**，所以**需要针对事件编写处理程序**
+  如何进行事件监听呢？
  + 事件监听方式一：在script中直接监听
  + 事件监听方式二：DOM属性，通过元素的on来监听
  + 事件监听方式三：通过EeventTarget中的addEventListener来监听

#### 1.1 常见的事件列表

鼠标事件： 

+ click —— 当鼠标点击一个元素时（触摸屏设备会在点击时生成）。 
+ mouseover / mouseout —— 当鼠标指针移入/离开一个元素时。
+ mousedown / mouseup —— 当在元素上按下/释放鼠标按钮时。 
+ mousemove —— 当鼠标移动时。 

键盘事件： 

+ keydown 和 keyup —— 当按下和松开一个按键时。

表单（form）元素事件： 

+ submit —— 当访问者提交了一个  时。
+  focus —— 当访问者聚焦于一个元素时，例如聚焦于一个 。 

Document 事件： 

+ DOMContentLoaded —— 当 HTML 的加载和处理均完成，DOM 被完全构建完成时。 

CSS 事件： 

+ transitionend —— 当一个 CSS 动画完成时。



#### 1.2 认识事件流

事实上对于事件有一个概念叫做事件流，为什么会产生事件流呢？

+ 当我们在浏览器上对着一个元素进行点击时，点击的不仅仅是这个元素本身
+ HTML元素是存在父子元素叠加层级的
+ 比如一个span元素是放在div元素上的，div元素是放在body元素上的，body元素是放在html上的





### 2 事件冒泡捕获

+ 事件**从最内层的span向外依次传递的顺序**，这个顺序我们称之为事件冒泡。
+ 另外一种事件流监听方式就是从内到外（body->span），这种称之为事件捕获
+ 为什么会产生两种不同的处理流呢？
  + 这是因为早期浏览器开发时，不管是IE还是Netscape公司都发现了这个问题;
  + 但是他们采用了**完全相反的事件流来对事件进行了传递**；
  +  IE采用了事件冒泡的方式，Netscape采用了事件捕获的方式

#### 2.1 事件捕获和冒泡的过程

如果都进行监听，那么会按照如下的顺序来执行：

+ 捕获阶段（Capturing phase）
  + 事件（从window）向下走近元素
+ 目标阶段（Target phase）
  + 事件达到目标元素
+ 冒泡阶段（Bubbling phase）
  + 事件从元素上开始冒泡

我们可以通过event对象来获取当前的阶段

+  eventPhase

### 3 事件对象event

当一个事件发生时，就会有和这个事件相关的很多信息

+ 比如事件的类型是什么，点击的是哪一个元素，点击的位置等等
+ 那么这些信息会被封装到一个**Event对象**中，这个对象由**浏览器**创建，被称之为**event对象**
+ 该对象给我们提供了想要的一些属性，以及可以通过该对象进行某些操作；

如何获取这个event对象呢？

+ **event对象**会在**传入的事件处理函数回调**时，被系统传入
+ 可以在回调函数中拿到这个**event对象**

#### 3.1 event常见的属性和方法

常见的属性： 

+ type：事件的类型； 
+ target：当前事件发生的元素； 
+ currentTarget：当前处理事件的元素； 
+ eventPhase：事件所处的阶段； 
+ offsetX、offsetY：事件发生在元素内的位置； 
+ clientX、clientY：事件发生在客户端内的位置； 
+ pageX、pageY：事件发生在客户端相对于document的位置； 
+ screenX、screenY：事件发生相对于屏幕的位置； 

常见的方法： 

+ preventDefault：取消事件的默认行为； 
+ **stopPropagation**：阻止事件的进一步传递（冒泡或者捕获都可以阻止）

#### 3.2 事件处理中的this

在函数中，我们也可以通过this来获取当前的发生元素：

 这是因为在浏览器内部，调用event handler是绑定到当前的target上的

### 4 EventTarget使用 

我们会发现，所有的节点、元素都继承自EventTarget

+ 事实上window也继承自EventTarget

EventTarget是什么？

+ EventTarget是一个DOM接口，主要用于添加、删除、派发Event事件

EventTarget常见的方法：

+  addEventListener：注册某个事件类型以及事件处理函数
+  removeEventListener：移出某个事件类型以及事件处理函数
+ dispatchEvent：派发某个事件类型到EventTarget上



### 5 事件委托模式（event delegation）

+ 事件冒泡在某种情况下可以帮助我们实现强大的事件处理模式——事件委托模式
+ 事件委托模式
  + 因为当**子元素被点击时**，父元素可以**通过冒泡可以监听到子元素的点击**
  + 并且可**以通过event.target获取到当前监听的元素**
+  案例：一个ul中存放多个li，点击某一个li会变成红色 
  + 方案一：监听每一个li的点击，并且做出相应；
  +  方案二：在ul中监听点击，并且通过event.target拿到对应的li进行处理； 
    + 因为这种方案并不需要遍历后给每一个li上添加事件监听，所以它更加高效；

#### 5.1 事件委托的标记

某些事件委托可能需要对具体的子组件进行区分，这个时候我们可以使用data-*对其进行标记： 

比如多个按钮的点击，区分点击了哪一个按钮：

### 6 常见的事件

#### 常见的鼠标事件

#### mouseover和mouseenter的区别

mouseenter和mouseleave

+  不支持冒泡
+ 进入子元素依然属于在该元素内，没有任何反应

 mouseover和mouseout

+ 支持冒泡 
+ 进入元素的子元素时 
  + 先调用父元素的mouseout 
  + 再调用子元素的mouseover
  + 因为支持冒泡，所以会将mouseover传递到父元素中；



#### 常见的键盘事件

| 属性       | 描述                 |
| ---------- | -------------------- |
| onkeydown  | 某个键盘按键被按下   |
| onkeypress | 某个键盘按键被按下。 |
| onkeyup    | 某个键盘按键被松开   |

事件的执行顺序是 onkeydown、onkeypress、onkeyup

+ down事件先发生；
+  press发生在文本被输入；
+ up发生在文本输入完成；

我们可以通过key和code来区分按下的键：

+ **code**：“按键代码”（"KeyA"，"ArrowLeft" 等），特定于键盘上按键的物理位置
+ **key**：字符（"A"，"a" 等），对于非字符（non-character）的按键，通常具有与 code 相同的值。）

#### 常见的表单事件

| 属性     | 描述 |
| -------- | ---- |
| onchange |      |
| oninput  |      |
| onfocus  |      |
| onblur   |      |
| onreset  |      |
| onsubmit |      |



#### 文档加载事件

DOMContentLoaded：浏览器已完全加载 HTML，并构建了 DOM 树，但像 `<img>` 和样式表之类的外部资源可能尚未加载 完成。

 load：浏览器不仅加载完成了 HTML，还加载完成了所有外部资源：图片，样式等。