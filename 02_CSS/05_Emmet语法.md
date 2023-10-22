## 一、Emmet语法
### 1、生成html5代码
+ ！或html:5
### 2、生成元素
+ 生成子代的元素：div>p>span
+ 生成兄弟元素：h2+div+p
+ 混合型：div>p>span^^h1+strong
### 3、生成属性
+ div.box$*5
+ ul>li.item${列表元素$}*5（li可以省略，但ul不能省略，省略之后就默认为div）
### 4、css的emmet语法
+ w200+h200+m100+p100
+ m20-30-40-50（上右下左）

## 二、css特性
### 1、继承
+ 一个元素如果没有设置某属性的值，就会跟随父元素的值
+ 一个元素如果有设置某属性的值，就使用自己设置的值（不论是网页设置的，或者父元素设置的）
```html
<div>
	我是div的内容<br>
	<span>我是一个span</span><br>
	<a href="#">啦啦啦啦啦</a>
</div>
```
```css
div{
  	color: orange !important;
}
```
+ 不能继承的属性，一般可以使用inherit值强制继承
+ 继承注意点：
 + css属性继承的是计算值，并不是当初编写属性是的指定值（字面值）

### 2、层叠
+ css允许多个相同名字的css属性层叠在同一个元素上
+ 为了方便比较css属性的优先级，可以给css属性所处的环境定义一个权值（权重）
 + !important:10000
 + 内联样式：1000
 + id选择器：100
 + 类选择器、属性选择器、伪类：10
 + 元素选择器、伪元素：1

### 3、css属性使用经验
+ 选择器优先级太低
+ 选择器没有选中对应的元素
+ css属性的使用形式不对
 + 元素不支持css属性，比如span默认是不支持width和height的
 + 被同类型属性覆盖

## 三、html-列表元素
### 1、有序列表：ol、li
+ ol(ordered list)
直接元素只能是li
+ li(list item)
列表中的每一项
	+ list-style缩写属性
	+ list-style：type image position  

### 2、无需列表：ul、li
### 3、定义列表：dl、dt、dd
+ dl（definition list）定义列表，直接子元素只能是dt、dd
+ dt（definition term）列表中每一项的项目名
+ dd（definition description）列表中的每一项的具体描述，是对dt的描述、解释、补充（(dt+dd)*3）
## 四、html-列表元素
## 五、html-表单元素

+ 代码格式化快捷键：alt+ shift+F
