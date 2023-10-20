# HTML学习笔记1——HTML基础元素
## 一、网页的基本元素
```html
<!DOCTYPE html>
<html lang="en"> 
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	
</body>
</html>
```

### 1. 文档声明
* `<!DOCTYPE html>`
* 告诉浏览器当前页面是HTML5页面，让浏览器用HTML5的标准去解析识别HTML文档
* 必须放在HTML文档最前面，不能省略，省略了会出现兼容问题

### 2. html元素
*  根元素，只存在一个
* lang属性
  + 帮助语音合成工具确定要使用的发音
  + 帮助翻译工具确定要使用的翻译规则
  + 中文可写成`lang="zh-CN"`

### 3. head元素
+ 里面的内容是一些"元数据"（元数据：描述数据的数据）
 + 元数据metadata
 + 用来描述数据的数据
 + 对网页来进行一些基本的设置
+ 一般用于描述网页的各种信息，比如字符编码、网页标题、网页图标 
+ 一般在head元素内部使用meta（charset：UTF-8字符编码）、title、style、link(网站图标，引入外部css)、base、script、noscrip等元素
### 4、meta元素
  + 可用用于设置网页的字符编码，让浏览器更精准地显示每一个文字，不设置或设置错误会导致乱码
  + 一般都使用utf-8
### 5、title元素(网页标题)
### 6、link元素
```html
<link rel="stylesheet" type="text/css" href="https://g.csdnimg.cn/static/logo/favicon32.ico">
//网站图标
```
+ `href`:hyper reference（超链接）
+ link元素的rel属性不能省略，用来指定文档与链接资源的关系，一般rel若确定，相应的type也会默认确定，所以可以省略type
+ 网页图标支持的图片格式是ico、png，常用大小16✖16、24✖24、32✖32

## 二、h元素/p元素/a元素/img元素/strong元素
### h元素
* 用于设置网页标题
* h1~h6共规定6个等级标题
* h元素有助于网站的SEO（Search Engine Optimization）优化，可用促进关键词排名
 * 建议在网页中最多只有一个h1元素
 * 乱用h元素不仅不会给网站带来好的权重，同时也有可能被搜索引擎认为作弊，最后导致k站

### p元素
* 段落（paragraphs）

### strong元素
* 用于强调某些文本，粗体的显示效果

### img元素
* img：显示图片（image）
* src属性：图片的路径（网路图片/本地图片（相对路径/绝对路径））
 > 绝对路径：C:\Users\HP\Desktop\前端\图片
特点：从根路径下面开始找
缺点：一旦位置发生改变，那么就有可能出现文件找不到的情况
 > 相对路径：../pic1/狗狗1.png
规则：．当前路径（目录）
　　　．．上一层路径（目录）
* alt属性：当图片（加载失败）时显示文本
* 常用图片格式
> png：静态图片，支持透明
> jpg：静态图片，不支持透明（以前后缀名只支持三个字符，jpeg）
> gif：动态图片、静态图片，支持透明
+ 像素
> 像素（pixel）是图像显示的最小单位
> 每个像素都能表示一种颜色
> 计算机显示出来的图像都是由一堆像素组成的
> 平时说的屏幕分辨率，一般都是用像素作为单位的

|快捷键|用途|
|:-:|:-:|
|ctrl+enter|快速进行下一行输入|
|ctrl+shift+d|快速复制一行|
|ctrl+f| 查找|

## 三、span元素/div元素
#### 1、span元素
+ 主要作用是对普通文本进行归类
```html
	<style>
        .new_price{
            color: red;
            font-size: 30px;
        }
        .old{
            color: gray;
        }
    </style>
	<p>
        <span class="new_price">￥69</span> 
        <span class="old">￥99</span>
    </p>
```
+ 行内元素

#### 2、div元素
+ 一般作为其他元素的父容器，把其他元素包住，代表一个整体
+ 用于把网页分割为多个独立的部分
+ 里面包裹的内容可独占一行

## 四、br元素/hr元素/code元素（不常用的元素）
### code元素
* 用于显示程序代码（设置为等宽字体monospace）

### br元素
* 单标签，表示**强制换行**（换行不会有间距）
* 但一般不使用而用div包裹实现换行
* p元素也可实现换行，但段落之间会有较大间距。

### hr元素
* **分割线**
* 一般通过设置边框border来实现分割线

## 五、a元素
* 作用：定义超链接，用于打开新的URL
* 常用属性
  + href：指定要打开的URL（Hypertext Reference的简称）
  + target：在哪里打开URL
   > _self(默认值)：在当前窗口打开URL
   > _blank：在一个新的窗口打开URL



   > (和iframe一起使用时才有效果)
   > _parent：在父窗口中打开URL
   > _top：在顶层窗口中打开URL
   >  某个frame的name值：在某个frame中打开URL

## 六、字符编码
* 作用：将文字储存到计算机中，之后解析显示出来
* 应用：所有的网页目前都需要采用UTF-8编码，所以在浏览器解析时也需要告诉浏览器当前我们使用的是UTF-8，浏览器才能正常的解析出文字

## 七、字符实体（character entity）
### 书写格式一般有两种
+ &entity_name;
+ &#entity_number; 

### 常用字符实体
|`&nbsp;`|空格
|:-:|:-:|
|`&lt;`|小于|
|`&gt;`|大于|
|`&amp`|&|
|`&quot`|“ ”|
|`&apos`|‘’|


### 八、URL/SEO优化
#### 4.1SEO优化
+ h元素有助于网站的SEO(Search Engine Optimization)优化,可以促进关键词排名
+ 建议网页中最多只有一个h1元素
+ 乱用h元素不仅不会给网站带来好的权重，同时可能被搜索引擎认为作弊

