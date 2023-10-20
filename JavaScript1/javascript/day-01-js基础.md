# 一、认识JavaScript

## 1.1 JavaScript

+ 一个网页的组成

  ​	html网页的结构

  ​	css网页的视觉体验

  ​	JavaScript网页的交互处理

+ JavaScript的作用：

  ​	我们编写的html、css、JavaScript（前两者为描述性语言）都需要依赖浏览器

  ​	JavaScript的作用是给浏览器命令，负责和浏览器进行沟通的

  1、网页的交互（表单动态校验）

  2、服务端开发（Node.js）

  3、命令行工具（Node.js）

  4、桌面程序，VSCode使用TypeScript开发的

  5、App(React Native)

  6、游戏开发（cocos2d-js）

  7、小程序HTML（WXML）+CSS(WXSS)+JavaScript

+ JavaScript是一门编程语言,运行在客户端的脚本语言

## 1.2 JavaScript的历史

+ Java->跨平台->虚拟机->linux/windows/macOS
+ JavaScript发明之初起名为liveScript为蹭Java热度
+ ECMAScript是JavaScript的标准，描述了该语言的语法和基本对象
+ **JavaScript是ECMScript的实现，除了基本实现之外，还包括DOM操作和BOM操作**

## 1.3 JavaScript的特点

高级语言可分为：

​						编译型语言：C语言->编译成二进制语言->执行（编译成不同系统的二进制指令windows/linux/mac）

​						解释型语言：js语言(alert(123);)->一行行读取，一行行执行（浏览器解释执行）

静态类型语言：在代码执行之前，可以确定一个变量（标识符），准确的类型，并且之后不允许修改，比如C、C++、java等

动态类型语言：不确定一个变量的类型，所以可以在代码执行过程中，动态修改

目前前端以及越来越多的转向typescript，其最强大之处就是提供了类型检测

+ 解释性语言
+ 动态类型语言



## 1.4 浏览器执行js简介

浏览器分为两部分 **渲染引擎**和**js引擎**

+ 渲染引擎：用来解析html和css俗称内核，比如chrome浏览器的blink，老版本的webkit
+ js引擎：也俗称js解释器。用来读取网页中的JavaScript代码，对其处理后运行，比如chrome浏览器的v8



# 二、JavaScript编写位置

```js
	<!-- 1.直接在html元素中直接执行JavaScript代码（行内式） -->
    <a href="" onclick="alert('我是一个弹窗')">弹出窗口</a>
    <a href="JavaScript:alert('我是一个弹窗')">弹出窗口</a>

    <!-- 2.书写到script标签中（内嵌式） -->
    <script>
        alert('我是直接弹出的弹窗');
    </script>

    <!-- 3.从外部引入JavaScript文件 -->
    <script src="./js/test.js">(不可以写代码，规定)</script>
```

注意事项：



# 三、JavaScript注释使用

```js
<script>
        //1、注释写法一：ctrl+/ （单行注释）
        /*2、注释写法二：shift + alt + a（多行注释，不可换行）
        //可以改为ctrl + shift + /
        // 3、注释写法一：文档注释(减少沟通成本)
        /**
        *这是一个测试函数
        */
        function test() {

        }
        
    </script>
```



# 四、和浏览器如何交互



```js
<script>
        // 交互方式一：弹出警示框
        alert('hello world');

        //交互方式二：在控制台打印输入信息
        console.log("Hello World","coderwhy", 18,20);

        //交互方式三：DOM操作时
        document.write("<h2>Hello HTML</h2>")

        //交互方式四：浏览器弹出输入框，用户可以输入prompt
        var age = prompt("请输入您的年龄");
        console.log("您的年龄是：",age);
    </script>
```



# 五、 如何定义变量

```js
//1、定义变量的同时进行赋值
        var name = "why";
        
        console.log(name);

        //2、给变量重新赋值（先声明后赋值）
        name = "koke";
        alert(name);

        //3、同时定义多个变量
        var num1, num2, num3;
        num1 = 1;
        num2 = 30;
        num3 = 40;
```

1、变量命名规则

​      首字母必须是字母或下划线或$符号

2、关键字

​      有特殊含义的单词 

3、保留字

​      还没有成为关键字，但作为预留，以后可能升级成为关键字

命名规范：多个单词时使用驼峰标识，如firstName

​					赋值= 两边加上空格

> // 只声明不赋值 为undefined
>
> ​    var sex;
>
> ​    console.log(sex);
>
> ​    // 不声明不赋值会报错
>
> ​    // 不声明只赋值 可以使用



# 六、基础数据类型

+ js变量的数据类型是只有在程序的运行过程中，根据右边的的值来确定
+ js是**动态类型**，变量的数据类型是可以变化的

```js
//字符串类型数据
console.log("whycode");

//数字类型数据
console.log(123);

//查看数据类型（typeof不是一个函数只是一个操作符）
console.log(typeof "codewhy");
console.log(typeof ("codewhy"));

//从prompt中取过来的的为字符型（蓝色为数据型，字符串型为黑色）
var age = prompt('请输入年龄');
console.log(typeof age);
```

### 常见的基本类型

#### 数值型（number）

+ 最大数字和最小数字

```js
console.log(Number.MAX_VALUE);
console.log(Number.MIN_VALUE);
```

+ 八进制 在数字前面**加0**，表示八进制
+ 数字前面**加上0x**表示十六进制
+ **infinity** 无穷大

```javascript
console.log(Number.MAX_VALUE * 2);
```

+ **NaN**,即非数值（Not a Number）是一个特殊的数值，js中**当对数值进行计算时没有返回结果，则返回NaN**

```javascript
console.log(Number("abc"));
```

+ **isNaN()**,用于判断是否是不是一个数字。不是数字返回true，是数字返回false

#### 字符串型（string）

+ 字符串的标识2可以使用单引号也可以使用双引号

+ 转义字符：掌握 `\'` `\"` `\t` `\n`四个的用法

  `\n`换行

  `\t ` 制表符，相当于一个table键

  `\r` 回车符

  `\b` 空格
  
  获取字符串长度：length属性
  
+ 字符串的拼接 + 只要有 字符串类型与其他类型拼接，最终的类型都是字符串类型

  ``` javascript
  console.log('所念皆'+ '星河');
  ```

  

#### 布尔类型（boolean）

+ ture 为1，false为0

#### 空类型（null）

+ 通常当一个对象不再使用时，可以赋值为null

```js
var info = {name:"why",age:18};/*一个对象类型*/
info = null;
/*垃圾回收机制*/

var timer = null;
console.log(typeof timer)//null的类型object
```



#### 未定义型（undefined）

+ Undefined类型只有一个值：undefined

当一个变量进行了声明，但是没有赋值，这个时候他的值就是undefined

```js
var flag = undefined;
```

+ undefined值实际是由null值衍生出来的，所以如果比较undefined和null是否相等，会返回true
+ **但是转化为数字时，undefined为NaN，null为0**
+ NaN、undefined和数字相加，最后的结果是NaN

```javascript
		var variable = undefined;
        console.log(variable + '娟娟');
        console.log(variable + 1); //结果为NaN 
        var space = null;
        console.log(space + '娟娟');
        console.log(space + 1);// 结果为1
```



### 变量存储本质

内存的分类：栈空间和堆空间

代码一开始存在硬盘里，当我们用浏览器打开（运行代码时）就会放到内存里（在栈空间里生成一个个盒子，将其值保存在盒子里面）

基本数据类型放在栈空间，一些复杂的类型放到堆空间



 # 七、 数据类型的转换

### 1、转换成数字类型

| 方式                   | 说明                             | 案例                |
| ---------------------- | -------------------------------- | ------------------- |
| parseInt(string)函数   | 将string类型转换成整数数值类型   | parseInt('78')      |
| parseFloat(string)函数 | 将string类型转换成浮点数数值类型 | parseFloat('78.21') |
| Number()强制转换函数   | 将string类型转换成数值型         | Number('12')        |
| js隐式转换（- * /）    | 利用算数隐式转换为数值型         | '12' - 0            |



#### 转换成数字类型方式一

+ Number(any)函数：将任意类型转换成数字

```js
        var message1 = "123";
        console.log(typeof message1);
        var num = Number(message1);
        console.log(num,typeof num);

        var message2 = "abc";
        console.log(typeof message2);
        var num1 = Number(message2);
        console.log(num1,typeof num1);/*NaN是一种数据类型，但是不是一个数字*/
		// string NaN 'number'

        //1、将Boolean类型转换成数字类型
        console.log(Number(true));
        console.log(Number(false));

        console.log(Number(undefined));
        console.log(Number(null));
		// 1 0 NaN 0
```

#### 转换成数字类型方式二

+ parseInt(string,radix)函数：将字符串转换成整数类型，radix表示基数，这里可以理解成进制

  + 如果第一个字符是数字或运算符号，那么就开始解析，知道遇到非数字字符，停止解析并得到解析结果
  + 如果第一个字符是非数字且非运算符号，则不解析并得到结果NaN

  ```js
  var str1 = "123abc";
  var num = parseInt(str1);
  console.log(num,typeof num);
  //结果为123 number
  
  var str2 = "abc345";
  var num1 = parseInt(str2);
  console.log(num1,typeof num1);
  //结果为NaN number
  
  console.log(parseInt('3.94')); //直接取整 3
   console.log(parseInt('120px'));// 会去掉单位 120
  ```

+ parseFloat：将字符串转成浮点数类型

#### 隐式转换(- * /)

```
console.log('123'-0);
```



### 2、转换成字符串类型

| 方式             | 说明                         | 案例                                  |
| ---------------- | ---------------------------- | ------------------------------------- |
| toString()       | 转成字符串                   | var num=1；alert(num.toString());     |
| String()强制转换 | 转成字符串                   | var num=1；alert(String(num));        |
| + 拼接字符串     | 和字符串拼接的结果都是字符串 | var num=1；alert(num + ‘我是字符串’); |

#### 转换方式一：`.toString()`

+ 不能转换**null**和**undefined**类型
+ `console.log(num.toString());`

#### 转换方式二：`String()`

+ `console.log(String(num));`

#### 转换方式三：和字符串进行拼接 ：变量 + “ ”

+ 隐式转换：其他的数据类型再和字符串通过+运算符进行拼接时，会自动转换成字符串类型
+ `console.log(num + " ");`



### 3、转换成布尔类型

+ 转换成false的五种特殊值：" "(空字符串)、0(包括0、-0）、undefined、null、NaN；
+ 否则，其值为true

```js
<script>
        //转换成布尔类型：Boolean（数据/变量）
        console.log(Boolean("123"));
        console.log(Boolean(123));

        console.log(Boolean(""));
        console.log(Boolean(null));
        console.log(Boolean(undefined));·
        console.log(Boolean(NaN));
        console.log(Boolean(0));
</script>
```



# 八、JavaScript操作符

## 算数运算符

+ 可以对数据进行操作，也可以操作变量指向的数据
+ 自增++ 、自减--

+ 后置自增：先返回原值，后自加1 前置自增：先自加1，再返回值（单独使用是两个无区别）

## 比较运算符

+ 比较==（默认**转换数据类型**，会把字符串的数据类型转换为数字型）
  + 会进行隐式转换，**内容相同**
+ 全等===
  + **类型相同**，数据相等
+ !=比较
  + 隐式转换

```js
<script>
        var num1 = 123;
        var num2 = "123";
        // 隐式转换，将string转换成number
        console.log(num1 == num2);
        // 隐式转换
        console.log(num1 != num2);

        var flag1 = true;
        var flag2 = "true";
        // 隐式转换：都转成number再比较
        // flag->1  flag2 -> NaN
        console.log(flag1 == flag2);
        
        // === 要求类型相等，数据相等
        console.log(num1 === num2);
</script>
```

## 逻辑运算

+ 逻辑与短路运算（当表达式可以确定为具体的值时会发生逻辑中断） 如果表达式1，结果为真，则返回表达式2；如果表达式1为假，那么返回表达式1
+ 0  ‘ ‘  null  undefined NaN为假，其余都为真

```js
console.log(123 && 456);// 456
console.log(1 && 1+2 && 0);// 0
console.log(0 && 1+2);// 0

var age = 10;
var money = 10;

if(age >= 18 && money >= 5){
	console.log("开机");
    console.log("上网");
}
```

+ **与运算**的特殊用法（防止发生错误，不再执行后面的代码语句）

```js
info.eating && info.eating();
//若info.eating未定义（undefined）则为false不再继续向后执行
```

等价于

```js
if(info.eating){
	info.eating()
};
```

+ 逻辑或短路运算，如果表达式1结果为真，则返回表达式1；如果表达式1为假，则返回表达式2
+ **或运算**的特殊用法

```js
var info = {
    height: 10,
	name: '娟娟'
}
var message = info.name || info.age || info.height;
console.log(message);//娟娟

//逻辑中断
var num = 0;
console.log(123 || num++);
console.log(num);
// 结果：123 0
```

+ 注意：逻辑运算符可应用于任何数据类型，且不一定返回布尔值

  对于非布尔值，会将非布尔值转换成布尔值

+ 逻辑运算符 && 的优先级高于||

# 九、JavaScript执行语句

三种执行方式：**顺序**、**分支**、**循环**

## if分支结构

```js
<script>
		var weight = prompt("请输入购买的重量：");
        var price = weight * 5;
        if(weight > 5){
            price -=5;
        }
        console.log("您需要支付：" + price+ "元");

		var year = prompt('请输入年份：')
        if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0  ) {
             alert('是闰年');
        } else {
            alert('不是是闰年');
        }
</script>
```

## 三元表达式

+ 三元表达式的格式：条件表达式 ？表达式1：表达式2
+ 条件表达式为真则分会表达式1，条件表达式为假，则返回表达式3

```js
<script>
        var m = 50;
        var n = 30;
        var max = m > n ? m : n;
        console.log(max);

        var age = 20;
        var result = age > 18 ? "成年人" : "未成年人";
        console.log(result);

        // 判断要执行哪一个函数
        function test1(){
            console.log("test1");
        }
        function test2(){
            console.log("test2");
        }
        var flag = true;
        flag ? test1() : test2();
    </script>
```

## switch分支语句

+ 只能判断两个值是否相等，不能判断范围
+ switch中表达式与case中的值相匹配时是**全等关系**
+ 分支较少使用if ...else语句，分支较多使用switch

```js
<script>
        var holidayName = prompt("请输入今天的节日：");
        switch (holidayName){
            case "情人节":
                console.log("买玫瑰");
                console.log("看电影");
                break;
            case "平安夜":
                console.log("买苹果");
                break;
            default:
                console.log("上班");
                break;
        }     
</script>
```

## for循环

```js
for (var i = 0; i < 100; i++) {
	console.log(i);
}

var sum = 0;
for (var n = 0; n < 100; n++) {
	sum += n;
}
console.log(sum);

```



+ 字符串追加的方式可以在控制台显示5颗小星星

```js
var str = '';
for( var i = 1;i <= 5 ; i++) {
	str = str + '*';
}
console.log(str);
```

+ 在屏幕上显示

  ​    `document.write("♥");`

  

### 嵌套循环

+ 在屏幕上显示一个三角的♥图像

```js
<script>
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < i+1; j++) {
                document.write("♥");
            }
            document.write("<br>");
        }


	   var str = '';
       for (var i = 0; i < 10; i++) {
           for( var j = 0 ; j< 10-i; j++) {
               str = str + '♥'
           }
           str = str + '\n';
       }
       console.log(str);
</script>
```

+ 在屏幕上显示一个九九乘法表

```js
<script>
        document.write("<div>");
        for (var i = 1; i < 10; i++) {
            
            for (var j = 1; j < i+1; j++) {
                // 空格&nbsp;
                var str = "<span>" + j + "*" + i + "=" + j*i + "</span>";
                document.write(str);
            }
            document.write("<br>");
            
        }
        document.write("</div>");


		for (let i = 1; i < 10; i++) {
           for( var j = 1 ; j<= i; j++) {
               document.write(j + '×' + i + '=' +  i*j + '  ');
           }
           document.write('</br>')
       }
       console.log(str);

	   var str = '';
       for(var i = 1; i <= 9; i++) {
           for( var j = 1; j <=i; j++ ) {
               str += j +'×' + i + '=' + i*j + '\t';
           }
           str += '\n';
       }
       console.log(str);
    </script>
```



## 断点调试

+ 浏览器中按住F12 --> sourses --> 找到需要调试的文件  --> 在程序的某一行中设置断点

```js
<script>
        var num = 100;
        var name = "why";

        debugger;
        
        num = num + 25;
        name = "kobe";

        while (num < 200) {
            num += 2;
        }
        num = 55;
        console.log(num);
    </script>
```



# 十、数组

## 1、创建数组的两种方式

+ 利用new创建数组

  ```js
  var arr = new Arry();
  ```

+ 利用字面量来创建数组

  ```js
  var arr = [];
  //创建了一个空的数组
  ```

+ 数组中可以存放各种数据类型（但不推荐这样做）

`var info = ["why", 18, false,["kobe","james"]];`

## 2、数组的常见操作

+ 数组有一个**length属性**，所以可以直接通过length获取数组的长度

```javascript
	   var arr = new Array();
       arr = ['red','green','blue','pink'];
       var str = '';
       var step = '!';
       for(var i = 0; i < arr.length; i++) {
           str += arr[i] + step;
       }
       console.log(str);
```



+ 获取数组某个位置的数据：通过索引值
  + 索引值也被称为下标值index
  + 索引值是从0开始的
  + **注意：如果传入不存在的索引值，返回的数据是undefined**

+ 将数组中大于等于10 的元素选出来

```javascript
		var arr = [2,0,6,1,77,0,52,0,25,7];
        var newarr =  [];
        for(var i = 0; i < arr.length; i++) {
            if( arr[i] >= 10) {
                newarr[newarr.length] = arr[i];
            }
        }
        console.log(newarr);

		var arr = [2,0,6,1,77,0,52,0,25,7];
        var newarr =  [];
        var j = 0;
        for(var i = 0; i < arr.length; i++) {
            if( arr[i] >= 10) {
                newarr[j] = arr[i];
                j++;
            }
        }
        console.log(newarr);
```



### 翻转数组

```javascript
		var arr =  ['red','green','blue','pink','purple'];
        var newArr = [];
        for(var i = arr.length-1; i >= 0 ; i--) {
            newArr[newArr.length] = arr[i];
        }
        console.log(newArr);
```



### 冒泡排序

```javascript
		var arr =  [5,4,3,2,1];
        for(var i = 0; i < arr.length-1 ; i++) {
            for(var j = 0; j < arr.length-i-1; j++) {
                if ( arr[j] > arr[j+1]) {
                    var temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
            
        }
```





# 十一、函数

## 1、基本概念

### 函数使用分为两步：函数声明和调用函数

+ 函数：封装一个可以被重复调用执行的代码块

+ 函数声明：函数名一般为动词

```js
function 函数名(){
    函数体
}
```

+ 函数调用

```js
函数名();
```



### 形参与实参的匹配问题

+ 若实参的个数多余形参的个数，会取到形参的个数
+ 若实参的个数小于形参的个数，多余的形参定义为undefined，因为形参可以看作是不用声明的变量但没有接受值，**当没有值可以接收时，结果就是undefined**
+ NaN、undefined和数字相加，最后的结果是NaN



### return

+ return语句：函数将值返回给调用者，只能返回一个值

```javascript
return num1,num2;返回结果是最后一个值

function getResult(num1, num2) {
	return [num1 + num2,num1 - num2, num1 * num2,num1 / num2];
} 
var re = getResult(1,2);//返回的是一个数组
console.log(re);
```

+ return终止函数，后面的代码不会再执行
+ 若没有return，则返回undefined



## 2、arguments参数

+ 只有函数才有arguments对象，而且是每个函数都内置好了这个arguments

+ **arguments展现形式时一个伪数组**，因此可以进行遍历，伪数组的性质：
  + 具有length属性
  + 按索引方式存储数据
  + 不具有数组的push、pop等方法

+ 默认情况下，arguments对象是所有函数中都可用的局部变量
+ 该对象中存放着所有的调用者传入的参数，从0位置开始，一次存放
+ arguments变量的类型是一个object类型，不是一个数组，但是和数组的用法看起来很相似
+ 如果调用者传入的参数多余函数接受的参数，可以通过arguments去获取所有的参数

```js
function bubbleSort() {
            for (var i = 0; i < arguments.length-1; i++) {
                for (var j = 0; j < arguments.length-1-i; j++) {
                    if(arguments[j] > arguments[j+1]) {
                        var temp = arguments[j];
                        arguments[j] = arguments[j+1];
                        arguments[j+1] = temp;
                    }
                    
                }
                
            }
            return arguments;
        }

        console.log(bubbleSort(90,2,4,1,77,3,2));
```



### 函数的调用栈

+ 函数的调用过程是一个压栈过程

## 3、函数的两种声明方式

### 命名函数

### 函数表达式写法

```js
var 变量名 = function() {}

//匿名函数，fun是变量名不是函数名
var fun = function() {
    cosnole.log('我是函数表达式');
}
fun();
```

+ 之前定义的函数称之为函数的声明，除了声明之外，还有其他的函数形式：
+ 函数表达式：匿名函数表达式和命名函数表达式
+ 函数的name属性：所有的函数都有一个name属性用于获取函数的名称



## 4、JavaScript作用域

+ JavaScript作用域：就是代码名字
+ js的作用域（es6）之前：全局作用域 局部作用域

+ 目的提高代程序的可靠性减少命名冲突
+ 全局变量：在全局作用域下的变量
  + **在函数内部没有声明直接赋值的变量也属于全局变量**

+ 局部变量：在局部作用域下的变量
  + **函数的形参也可以看作局部变量**
  + 只能在函数内部使用
+ 从执行效率来看局部变量和全局变量
  + 全局变量只有在浏览器关闭时才会销毁，比较占用内存资源
  + 局部变量，程序执行完毕就会销毁资源，比较节约内存资源
+ js没有块级作用域，也是在es6的时候新增的块级作用域

### 作用域链

+ 内部函数访问外部函数的变量，采取的是链式查找的方式来决定取那个值，这种结构我们称为作用域链，（就近原则）

## 立即执行函数

+ 立即调用函数表达式（immediately-invoked function expression）

+ 表达式的含义是一个函数定义完后被立即执行（在函数表达式下才能立即执行）

  + 第一部分是定义一个匿名函数，这个函数有自己独立的执行上下文环境
  + 第二部分是后面的()，表示这个函数被执行了

  ```js
  (function() {
  	console.log("test1函数被调用");
  })()
  ```

+ 作用：会创建一个独立的执行上下文环境，可以避免外界访问或修改内部的变量



# 十二、JavaScript预解析

+ JavaScript代码是由浏览器中的JavaScript解析器来执行的。JavaScript解析器在运行JavaScript代码的时候分为两步：**预解析**和**代码执行**

  + 预解析js引擎会把js里面所有的var还有function提升到当前作用域的最前面

  + 代码执行，按照代码书写的顺序从上往下执行

1. 预解析分为变量预解析（变量提升）和函数预解析（函数提升）

   + **变量提升**，就是把所有的变量声明提升到当前的作用域最前面，**不提升赋值操作**

   + **函数提升**，就是把所有的函数声明提升到当前作用域的最前面，**不调用函数**

2. 函数表达式调用必须写在函数表达式的下面

```js
console.log(num);//结果为undefined
var num = 10;
//相当于
var num
console.log(num);//结果为undefined
var num = 10;

fun();//报错
var fun = function() { 
	console.log(22);
}
//相当于
var fun;
fun();//报错
 fun = function() {
	console.log(22);
}

fn(11);//结果为11
function fn() {
	console.log(11);
}
```

## 预解析案例

```js
var num = 10;
fun();
function fun() {
	console.log(num);
    var num = 20;
}
//相当于执行了
var num;
function fun() {
	var num;
	console.log(num);
    var num = 20;
}
num =10;
fun();//结果为undefined/
```



```js
f1();
console.log(c);
console.log(b);
console.log(a);

function f1 () {
	var a = b = c = 9;
    //相当于var a = 9; b = 9; c = 9;
    //与集体声明不同 var a = 9, b = 9, c = 9;
    console.log(a);
    console.log(b);
    console.log(c);
}
//    相当于以下代码
function f1 () {
	var a;
    a = 9;
    b = 9;
    c = 9;
    console.log(a);
    console.log(b);
    console.log(c);
}
f1();
console.log(c);
console.log(b);
console.log(a);
```







