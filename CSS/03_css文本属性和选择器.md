 # 一、文本属性
## 1、text-decoration
+ none
+ underline
+ overline
+ line-through

## 2、letter-word-spacing
+ letter-spacing：设置字母之间的间距
+ word-spacing：设置单词之间的间距

## 3、text-transform
+ 设置文字的大小写转换
+ capitalize：将每个单词首字符变为大写
+ uppercase：将每个单词的所有字符变为大写
+ lowercase：将每个单词的所有字符变为小写
+ none：没有影响

## 4、text-indent
+ 设置首行字符缩进
```css
	p{
			/*em -> 1em*20px =20px*/
			/*text-indent: 32px;*/
			/*默认字体大小为16px*/
			text-indent:2em;//相对于父元素
			font-size: 20px;
		}
```

## 5、text-align
+ 可用于设置**元素内容**在元素中的水平对齐方式
+ left:左对齐
+ right：右对齐
+ center：正中间显示
```html
<style>
.box3{
	background-color: #ff8800;
	text-align: center;
}
</style>
<div class="box3">
	<div class= 'inner'>我是啦啦啦啊</div>
</div>
```
显示：![在这里插入图片描述](https://img-blog.csdnimg.cn/7bd2a45b25da47c7a77b013a3e99e1ae.png#pic_center)
“我是啦啦啦啊”居中是由于内部div继承了box3（其父元素）的属性，而其内部div本身没有居中，而是独占一行。

```html
<style>
	.inner{
			background-color: purple;
			width:200px; /*块级元素就算设置了宽度，也会独占一行*/
			/* display: inner-block; */ /* 行内块级元素是可以设置宽度的，所以此时的div是居中的*/ 
		}
</style>
```
显示：![在这里插入图片描述](https://img-blog.csdnimg.cn/9fe037ee84b94e938421ac684cb577dd.png#pic_center)
可以看出内部div并没有居中，因为它是块级元素，会独占一行。

+ **justify：两端对齐**
```css
	/*justify对最后一行没有效果*/
	text-align:justify;
	text-align-last: justify;
```

# 二、文字属性
## font-size
+ px
+ em单位：1em代表100%，2em代表200%，0.5em代表50%（**相对于父元素**）
```html
<style>
	.box{
       font-size: 18px;
	}
    span{
    	/* font-size: 20px; */
        font-size: 2em;//相对于父元素
    }
</style>
<div class="box">
	<p>我是p元素 </p>
	<span>我是span元素，哈哈哈哈</span>
</div>
```
+ 百分比（相对于父元素）
+ **文本属性一般都会继承父元素的属性**

## font-family
+ 用于设置字体名称
+ 一般来说中文字体适用于中文和英文，但英文字体只适用于中文字体
+ 所以一般将英文字体写在前面

## font-weight
+ 用于设置文字的粗细（重量）
+ 100|200|300|400|~|900：每一个数字表示一个重量
+ normal：等于400
+ bold：等于700
+ strong、b、h1~h6等标签的font-weight默认就是bold

## font-stlye
+ 设置文本的常规、斜体显示
+ normal：常规显示
+ italic：用字体的斜体显示（前提font-family这种字体本身是支持斜体的）
+ oblique：文本斜体显示（让文字倾斜）
+ em、i、cite、address、var、dfn等元素的font-style默认就是italic
```html
	<style type="text/css">
		p{
			
			font-style: oblique;
		}
	</style>
	<!-- 斜体标签，i比较常用（小图标） -->
	<i>哈哈哈哈哈啊</i>
	<em>春风十里不如你</em>

	<p>我是小pp</p>
```

## font-variant
+ 可以影响小字母的显示形式
+ normal：常规显示
+ small-caps：将小写字母替换为缩小过（同等规模的）的大写字母

## line-height
+ 用于设置文本的最小行高，简单理解为一行文本所占据的高度
+ 行高的严格定义：两行文字**基线（baseline）**之间的间距
+ 基线（baseline）：与小写字母x最底部对齐的线
+ 行距：上一行的底线（bottom）和下一行的顶线（top）之间的距离（行高-文字所占据的高度）
+ height与line-height的区别：
 + height：**元素的整体高度**
 + line-height = 元素中每一行文字所占据的高度+行距
 + **行距 = line-height -文字高度**，当行高一定时，行距会等分，从而实现居中效果

## font缩写属性
+ `font-style` `font-variant` `font-weight` `font-size`/`font-height` `hont-family`
+ `font-style`、`font-variant`、`font-weight`可以随意调换顺序，也可以省略
+ `/line-height`可以省略，如果不省略，必须跟在`font-size`后面



﻿## cursor

cursor可以设置鼠标指针（光标）在元素上面时的显示样式
可以设置以下样式

 + auto:浏览器根据上下文决定指针的显示样式，比如根据文本和非文本切换指针样式
 + default：由操作系统决定，就是一个小箭头
 + pointer：一只小手，鼠标移动到链接上面默认的就是这个样式
 + text：一条竖线，鼠标挪动到文本输入框上面默认就是这个样式
 + none：没有任何指针显示在元素上面

# 三、更多选择器
## 属性选择器
+ 包含title属性
```css
		[title]{
			color: #f00;
		}

		/*了解一下*/
		/*title中包含one单词*/
		[title*="one"]{
			background-color: #00f;
		}

		/*title以one开头*/
		[title^="one"]{
			background-color:#00f
		}

		/*title以one结尾*/
		[title$="one"]{
			background-color: #00f;
		}
```
+ 为title属性且值为one div元素
```css
[title="one div元素"]{
	font-size:25px;
}
```

### [atter=val]
+ title属性值恰好等于one

  ```
  [title = "one"] {}
  [title = 'one']
  [title =  one] //在html中不区分大小写，也不区分单双引号
  ```

### [atter*=val]

```
[title*="one"]{
	background-color: #00f;
}
```



### [atter|=val]

+ title属性值恰好等于one或者以单词one开头且后面紧跟着字符-的元素

```css
[title|="one"]{
	color:red;
}
```
 一般用在lang属性上

+ [atter~=val]
title属性值包含单词one的元素（单词one与其他单词之间必须用空格隔开）
```css
[title~="one"]{
	color:red;
}
```
```css
.one{
	color:red;
}
//与[class~="one"]{}效果一致
```
两个选择器效果一致

## 后代选择器（descendant combinator）（*）
+ div元素里面的span元素（包括直接、间接元素）
```css
div span{
	color:red;
}
```

## 子代选择器（child combinators）（*）
+ div元素里面的直接span子元素(不包括间接子元素)
```css
div>span{
	color:red;
}
```
```css
div > span{
	color:red;
}

//p里面不能包含div元素
p > div{
	color: crimson;
}
```

## 相邻兄弟选择器（adjacent sibling combinator）
+ div元素后面紧挨着的p元素（且div、p元素必须是兄弟关系）
```css
div+p{
	color:#f00;
}
```

## 全兄弟选择器（general sibling combinator）
+ div元素后面的p元素（且div、p元素都必须是兄弟关系）
```css
div~p{
	color:#f00;
}
```

## 选择器组——交集选择器（*）
+ 同时符合2个条件的元素：div元素、class值有one
```css
div.one{
	color:#f00;
}
```
+ 所有同时符合3个条件的元素：div元素、class值有one、title属性值等于test
```css
div.one[title="test"]{
	color:#f00;
}
```
## 选择器组-并集选择器（*）
+ 所有的div元素+所有class值有one的元素+所有的title属性值等于test的元素
```css
div, .one, [title="test"]{
	color:#f00;
}
```
