## 一、a元素补充
### 锚点链接
+ 作用：可以实现跳转到网页中的具体位置
> `<a href="#one">go</a>`
> 点击go会定位到id值为one的元素（name值为one的元素a）

### 伪链接
+ 有时候点击来链接的时候并不希望打开新的URL，而是希望干点别的事情，这时可以使用伪链接
+ 伪链接：没有指明具体链接地址的链接
+ 点击链接后具体要做什么事情，需要编写对应的javascript代码
+ 如果暂时不做任何事情，可以先写成下面形式
```html
<a href="#" onclick="return false;">伪链接1</a>
<a href="javascript:">伪链接2</a>

//伪链接的用处  
<a href="javascript:alert('hello world')">弹出窗口</a>
<a href="" onclick="alert('hello world')">弹出窗口2</a>

//点击会返回到页面顶部
<a href="#">aaaa</a>
<a href="">aaaa</a>
```
+ 所以有时候可以把链接当作按钮来使用

### 图片链接
+ img元素跟a元素一起使用，可以实现图片链接

## 二、URL->input
+ URL的全称Uniform Resource Locator（统一资源定位符）
+ URL就是资源的地址、位置、互联网上的每一个资源都有一个唯一的URL
+ 通过一个URL，能够找到互联网上唯一的1个资源
+ **URL的基本格式**=protocol://hostname/path=**协议://主机地址/路径**
  https://www.baidu.com/img/bdlogo.gif
  https://183.232.231.173/img/bdlogo.gif
  + 协议：**不同的协议，代表着不同的资源查找方式、资源传输方式**
  + 主机地址：**存放资源的主机的IP地址（域名）**
  + 路径：**资源在主机中的具体位置**

### URL常见的协议
#### http
 + 超文本传输协议，访问的是远程的网络资源，格式是http://
 + **http协议是在网络开发中最常见的协议**
 + **https协议相当于是http协议的安全版**

#### file
 + **访问的是本地计算机上的资源**，格式是file://（一般省略不写，且不用加主机地址）

#### mailto
 + **访问的是电子邮件地址**，格式是mailto:

#### ftp
 + **访问的是共享主机的文件资源**，格式是ftp://

访问网络资源的过程：
电脑唯一标识ID地址（最终访问的一定是IT地址）
www.baidu.com：域名（方便人们记忆）
DNS服务器解析：将域名解析为ID地址

## 三、认识css
+ css全称Cascading Style Sheets，层叠样式表
> 官方文档地址
> <http://www.w3.org/standards/techs/css>
> <http://www.w3.org/TR/CSS22/>
> <http://www.w3.org/TR/CSS22/propidx.html>
> <http://developer.mozilla.org/zh-CN/docs/WebCSS>

+ CSS提供了3种方法，可以将css样式应用到元素上
+ 内联样式（inline style）
```html
<h1 style="属性名: 属性;color: red;">
```
+ 文档样式表（document style sheet）、内嵌样式表（embed style sheet）
```html
/*
选择器{
	属性名:属性值
}
*/
```
+ 外部样式表（external style sheet）
**不建议使用@import导入CSS文件，它的效率比link元素低**
```html
<link rel="stylesheet" href="./style.css" />
//link还可用于设置网页图标
<link rel="icon" type="可省略" href="https://img-home.csdnimg.cn/images/20201124032511.png">
```

```css
/*指定css文件的编码*/
@charset "utf-8";
```

```html
<style>
	@import url(./style.css);
	//url资源路径
</style>
```

## 四、css的写法
+ 快速判断网页结构划分的小技巧，给网站加上以下样式
```css
div{
	outline:2px solid green !important;
}
```

## 五、css基础选择器

开发中经常需要找到特定的网页元素进行设置样式

什么是css选择器？

+ 按照一定规则选出**符合条件的元素**，为之添加css样式

### 5.1 选择器种类

+ 通用选择器（universal selector） 
+ 元素选择器（type selectors） 
+ 类选择器（class selectors） 
+ id选择器（id selectors） 
+ 属性选择器（attribute selectors） 
+ 组合（combinators） 
+ 伪类（pseudo-classes） 
+ 伪元素（pseudo-elements）

### 5.2 通用选择器

+ 所有元素都会被选中
+ 一般用来给所有元素做一些通用性设置
  + 比如内边距、外边距
  + 比如一些重置内容
+ 效率比较低，尽量不要使用

```css
	*{
		margin:0;
		padding:0;
	}
	//用于通用性设置，例如内外边距
```

### 5.3 简单选择器

简单选择器是开发中使用最多的选择器

#### 元素选择器

+ 使用**元素的名称**

#### 类选择器

+ 使用类名

 + 一个元素可以有多个类，多个类以空格为分割
  ```html
  <div class="box1 large-font">文字内容</div>
  ```

  ```css
  .box{
  	font-size:60px;
  }
  ```

 + 类的名字规范：
    -（连字符hyphen）连接：large-font
    _连接：large_font
    驼峰连接：largeFont
    小驼峰：js函数名字
    大驼峰：js中定义类的名字

#### id选择器

+ 一个HTML文档里面的id值是唯一的，不能重复
  + id值如果由多个单词组成，单词之间可以用**中划线-、下划线_连接**，也可以使用**驼峰标识** 
  + 最好不要用标签名作为id值
+ 中划线又叫**连字符（hyphen）**

```css
	#box{
		margin:10px;

	}
```


### 5.4 属性选择器

+ 拥有某一个属性 **[att]**，表示带有以 *attr* 命名的属性的元素
+ 属性等于某个值 **[att=val]**

了解

+ [attr*=val]: 属性值包含某一个值val;

+ [attr^=val]: 属性值以val开头;

+ [attr$=val]: 属性值以val结尾;

+ [attr|=val]: 属性值等于val或者以val开头后面紧跟连接符-;

+ [attr~=val]: 属性值包含val, 如果有其他值必须以空格和val分割;



### 5.5 后代选择器

+ 后代选择器一: **所有的后代(直接/间接的后代)**
  + 选择器之间以**空格**分割

![image-20231101105054815](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231101105054815.png)

+ 后代选择器二: **直接子代选择器(必须是直接自带)**
  + 选择器之间以 **>** 分割

![image-20231101105106079](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231101105106079.png)

### 5.6 兄弟选择器

+ 兄弟选择器一:**相邻兄弟选择器**
  + 使用符号 **+** 连接

![image-20231101105008638](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231101105008638.png)

+ 兄弟选择器二: **普遍兄弟选择器** 
  + 使用符号 **~** 连接

![image-20231101105038412](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231101105038412.png)



### 5.7 选择器组 – 交集选择器

+ 交集选择器: **需要同时符合两个选择器条件(两个选择器紧密连接)**
  + **精准的选择某一个元素**

![image-20231101105441338](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231101105441338.png)

+ 并集选择器: 符合一个选择器条件即可(两个选择器以,号分割)
  + 通常为了**给多个元素设置相同的样式**

![image-20231101105640917](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231101105640917.png)

## 六、颜色空间RGB

+ 一个颜色是由一个字节构成
1byte->8bit->1111 1111->255
```css
background-color: rgb(0,0,0);/*黑色*/
background-color: rgb(255,255,255);/*白色*/
```
+ rgba(rgb：0到255/0到ff   GREEN BLUE ALPHA:0~1)
>r：red
>g：green
>b:  blue
>a：alpha 0~1（0透明，1不透明）

+ 十六进制表示：255=->2✖100+5✖10+5     ff=->15✖16+15✖1
```css
	background-color: #ff0000;
	/*00ff00可简写为0f0*/
```
+ 关键字transparent等价于rgba（0，0，0，0），完全透明
```html
div{
color:transparent;
}
```

## 七、查看网页布局
![在这里插入图片描述](https://img-blog.csdnimg.cn/3ec43b25ba9445a2911584a061654aaf.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5be05ouJ5be05ouJ5ZCM5a2m,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)


+ 快捷键
+ 注释：ctrl + /
