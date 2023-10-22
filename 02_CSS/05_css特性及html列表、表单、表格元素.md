# 一、css特性
## 1、继承
+ 一个元素如果有设置某属性的值，就使用自己设置的值（不论是网页设置的，或者父元素设置的）
+ 一个元素如果没有设置某属性的值，就会跟随父元素的值
```css
img{
			/*width: 100%*/
			/*百分比相对于包含其的版块*/
			width: inherit;
			/*with不支持继承，可查阅文档mdn，inherit强制继承 */
		}
```
+ 不能继承的属性，一般可以使用inherit值强制继承父元素的值
+ **继承注意点：**
 + css属性继承的是**计算值**，并不是当初编写属性是的指定值（字面值）
 + 并不是所有的属性都可以继承（一般文本相关属性可以继承）

```css
.box1{
	font-size: 60px;
}
/*box2 中的p元素继承的为计算后的数值30px*/
.box2{
	font-size: 0.5em;
}
```



## 2、层叠
+ css允许多个相同名字的css属性层叠在同一个元素上
+ 为了方便比较css属性的优先级，可以给css属性所处的环境定义一个权值（权重）
+ 基本层叠：使用相同的选择器，后面的一定把前面的重叠掉
 + !important:10000
 + 内联样式：1000（写在html标签里面的css）
 + id选择器：100
 + 类选择器、属性选择器、伪类：10
 + 元素选择器、伪元素：1
 + 比较优先级的严谨方法：
   + 从权值最大的开始比较每一种**权值的数量多少**，数量多的则优先级高，即可结束比较
   + 如果数量相同，比较下一个较小的权值，一次类推

## 元素的层叠

### z-index属性

用来设置定位元素的层叠顺序（仅对定位元素有效）

|  父子关系  |     子元素会层叠在父元素上     |                                  |
| :--------: | :----------------------------: | :------------------------------: |
| 非父子元素 |          都是定位元素          |   在标准流中一般不存在层叠现象   |
|     -      | 1个是定位元素，1个是非定位元素 |  定位元素会层叠在非定位元素上面  |
|     -      |          都是定位元素          | 使用css属性z-index来控制层叠顺序 |

### 取值可以是正整数、负整数、0

比较原则

+ 如果是兄弟关系
 + z-index越大，层叠越再上面
 + z-index相等，写在后面的那个元素层叠在上面
+ 如果不是兄弟关系
 + 各自从元素自己以及祖先元素中，找出最邻近的2个定位元素进行比较
 + 而且这两个元素必须进行设置z-index


## 3、css属性使用经验
若设置了样式却没有显示，可能有以下几个原因：
+ 选择器优先级太低
+ 选择器没有选中对应的元素
+ css属性的使用形式不对
 + 元素不支持css属性，比如span默认是不支持width和height的
 + 被同类型属性覆盖

# 二、html-列表元素
## 1、有序列表：ol、li
+ ol(ordered list)
直接元素只能是li
+ li(list item)
列表中的每一项

## 2、无序列表：ul、li

## 3、定义列表：dl、dt、dd
```html
<dl>
		<dt>导演</dt>
		<dd>朱塞佩托纳雷多</dd>

		<dt>编剧：</dt>
		<dd>亚利桑得罗</dd>

		<dt>主演：</dt>
		<dd>罗斯/比尔</dd>

		<dt>类型：</dt>
		<dd>剧情/音乐</dd>

		<dt>制片国家/地区</dt>
		<dd>意大利</dd>

		<dt>语言：</dt>
		<dd>英语/法语</dd>

		<dt>上映日期：</dt>
		<dd>1998-10-28</dd>

		<dt>片长</dt>
		<dd>165分钟</dd>
	</dl>
```
![定义列表](https://img-blog.csdnimg.cn/20200721123736307.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ1MTMxMTYz,size_16,color_FFFFFF,t_70)

## 4、列表相关的css属性
+ **list-style-type**
设置li元素前面标记的样式
disc(实心圆)、circle(空心圆)、square(实心方块)
decimal(阿拉伯数字)、lower-roman(小写罗马数字)、upper-roman(大写罗马数字)
lower-alpha(小写英文字母)、upper-alpha(大写英文字母)

+ **list-style-image**
设置某张图片为li元素前面的标记，会覆盖list-style-type的设置

+ **list-style-position**
设置li元素前面标记的位置，可以取outside、inside2个值

+ **list-style**
缩写属性
> 一般不用这些属性，只设置`list-style:none`

# 三、html-表格元素
## table 表格
## tr(table row)
## td(table description)
不常用属性

|border|边框的宽度|
|:-:|:-:|
|cellpadding|单元格内部的间距|
|cellspacing|单元格之间的间距|
|width|表格的宽度|
|align|表格的水平对齐方式center、left、right|

|-|tr常用属性|
|:-:|:-:|
|width|单元格的宽度|
|valign|单元格的垂直对齐方式top、middle、bottom、baseline|

|-|td常用属性|
|:-:|:-:|
|width|单元格的宽度|
|valign|单元格的垂直对齐方式top、middle、bottom、baseline|
|align|单元格的水平对齐方式center、left、right|
|rowspan|单元格可横跨的行数|
|colspan|单元格可横跨的列数|

+ 细线表格的实现

```css
table{
	/*边框合并*/
	border-collapse:collapse;
}
td{
	border:1px soild #000;
}
```
## tbody
表格的主体

## caption
表格的标题

## thead
表格的头

## tfoot
表格的页脚

## th
表格的表头单元格

## 单元格合并要领
+ 首先判断合并方向是行合并还是列合并
+ column:列 
row：行 

## border-spacing
+ css属性用于设置单元格之间得水平、垂直间距
```css
table{
	border-spacing：10px 20px;
}
```

# 四、html-表单元素
## 常用元素
### 1、form
+ 表单：一般情况下，其他表单相关元素都是它得后代元素
+ form：设置所属的form元素（填写form元素的id）
+ 一旦使用了此属性，input元素即使不写在form元素内部，它的数据也能够提交给服务器
#### form的常用属性
+ action
用于提交表单数据的请求URL

+ method
请求方法（get和post）,默认是get
 + get
在请求URL后面以?的形式跟上发给服务器的参数,多个参数之间用&隔开
由于浏览器和服务器对URL长度有限制,因此在URL后面附带的参数是有限制的,通常不能超过1kb
 + post
发给服务器的参数全部放在请求体中
理论上,post传递的数据量没有限制(具体还得看服务器的处理能力)
+ target
在什么地方打开URL(参考a元素的target)

+ enctype(encode type编码类型)
  规定了在向服务器发送表单数据之前如何对数据进行编码
  取值有三种
  + application/x-www-form-urlencoded:默认的编码方式
  + multipart/form-data:文件上传时必须为这个值,并且method必须时post(type属性设置为“file” 的`<input>`元素)
  + text/plain:普通文本传输
+ accept-charset
规定表单提交的时候使用的字符编码(默认值UNKNOWN,和文档相同的编码)

### 2、input及其属性
单行文本输入框、单选框、复选框、按钮等元素
>input的外边框-outline
 ```css
  input:focus{
            border-color: hotpink;
            border-style: solid;
        }
 ```

**1. type：input的类型**
+ text：文本输入框（明文输入）
+ password：文本输入框（密文输入）
+ radio：单选框
name值相同的radio才具备单选功能
+ checkbox：复选框
+ button：按钮
+ reset：重置
+ submit：提交表单数据给服务器
+ file：文件上传

**2. maxlength：允许输入的最大数字**
**3. placeholder：占位文字**
**4. readonly：只读**
**5. disabled：禁用**
**6. checked：默认被选中(只用于radio和checkbox中)**
**7. autofocus：当页面加载时，自动聚焦**
**8. name：名字**
+ 在提交数据给服务器时，可用于区分数据类型

**9. value：取值**

### 3、textarea
多行文本
+ cols列数
+ rows行数
+ 缩放的css样式设置
禁止缩放：`resize:none`
水平缩放：`resize:horizontal`
垂直缩放：`resize:vertical`
水平垂直缩放：`resize:both`
#### select、option常用属性
1. select常用属性
multiple表示多选，一般用checkbox多一些（用于select中）
size：显示多少项
2. option常用属性
selected：默认被选中
### button 按钮
```html
		<div>
			<!-- 实现方式一：input实现 -->
			<input type="button" value="按钮" name="">
			<input type="reset" name="">
			<input type="submit" name="">
		</div>

		<div>
			<!-- 实现方式二：button实现 -->
			<!-- 注意：button type的默认属性为submit,
			看似向重置是因为提交的时候会自动重置 -->
			<button type="button">按钮</button>
			<button type="reset">重置</button>
			<button>提交</button>
		</div>
```
### label
表单元素得标题
### fieldset
表单元素组
### legend
fieldset的标题

## 布尔属性（Boolean attributes）
布尔属性可用没有属性值
常见的不二属性有disabled、checked、readonly、multiple、autofocus、selectd


+ 去除input的tab键选中效果
```css
input{
	outline:none;
}
```
+ 或者将tabindex属性值设置为-1

## 表单提交
将用户在input中输入的内容提交给服务器

```html
	<form action="http://www.baidu.com/s">
		<!-- 模拟百度搜索 -->
		<input type="text" placeholder="请输入关键词" name="wd">
		<input type="submit" value="百度一下" name="">
	</form>
```

### 传统的表单提交
+ 将所有的input包裹到一个form中
+ form设置action（服务器的地址）
+ input/button类型是submit
点击submit，自动将所有的数据提交给服务器
+ 弊端一：会进行页面的跳转（意味着服务器必须提前将一个页面写好，并且将写好的页面返回给前端，前端直接展示这个页面）
服务器提前将页面写好：服务端渲染
+ 弊端二：不方便进行表单数据的验证
### 前后端分离的表单提交
+ 通过JavaScript获取到所有表单内容
+ 通过正则表达式进行白哦但的验证
+ 发送ajax请求，将数据传递给服务器
+ 验证成功后，服务器会返回结果，需要前端解析这个数据，并且决定显示什么内容。 




### css统一样式重置
```css
/* css reset */
        body,ul{
            margin: 0;
            padding: 0;
        }
        ul{
            list-style: none;
        }
        a{
        	text-decoration:none;
        }
        a,input,textarea{
            outline: none;
        }
```

