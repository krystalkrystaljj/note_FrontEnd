# 一、对象

## 1、什么是对象

+ 对象是一个**具体的事物**
+ 在JavaScript中，对象是一组无序的**相关属性**和**方法**的集合，所有的事物都是对象，例如字符串、数值、数组、函数等。
  + 属性：是事物的**特征**，在对象中用属性来表示（常用名词）
  + 方法：事物的**行为**，在对象中用方法来表示（常用动词）

>1. 内建对象
> - 由ES标准中定义的对象，在任何的ES的实现中都可以使用
> - 比如：Math String Number Boolean Function Object
>2. 宿主对象
>+ 由js的运行环境提供的对象，目前来讲主要是浏览器提供的对象
>+ 比如BOM DOM
>3. 自定义对象
>+ 由开发人员自己创建的对象(函数也是对象)



## 2、创建对象对象的三种方式

### （1）利用字面量创建对象

1. 创建对象

+ 对象字面量：就是花括号{}里面包含了表达这个具体事物（对象）的属性和方法
+ 属性或者方法采取键值对的形式   **键** 属性名：**值** 属性值
+ 多个属性和方法之间用逗号分隔开
+ 方法冒号后面跟的是一个匿名函数

```js
var obj = {
	uname:'张三丰',
    age:18,
    sex:'男',
    sayHi:function() {
    	console.log('hi~');
	}
}
```

### （2）使用对象

+ 调用对象的属性 
  + 方法一： **对象名.属性名**
  + 方法二：**对象名['属性名']**
+ 两者的区别：
  + 点属性后面跟的必须是一个指定的属性名称，而中括号方法里面可以是变量。
  + 中括号方法里面的属性名可以是数字，而点方法后面的属性名不可以是数字
  + 当动态为对象添加属性时，必须使用中括号【】，不可用点方法


```js
var obj = {
    name: "cedric"
}
var haha = "name";
console.log(obj.haha); // undefined
console.log(obj[haha]); // cedric
```



+ 调用对象的方法  **对象名.方法名()**

```js
console.log(obj.age);
console.log(obj['uname']);
obj.sayHi();
```





##### 变量、属性、函数、方法的区别

+ 变量和属性
  + 相同点：都是用来存储数据的
  + 变量：单独声明并赋值，使用时之间用变量名
  + 属性：在对象里面不需要声明，使用的时候必须是 对象名.属性名
+ 函数和方法
  + 相同点：实现某种功能
  + 函数：单独声明，并且调用的函数名() 单独存在
  + 方法：在对象里面，调用的时候 对象名.方法名()



### （3）利用new Object创建对象

+ 利用等号 = 赋值的方法添加对象的方法和属性

```js
var obj = new Object();//创建了一个空的对象

obj.uname = '张三丰';
obj.age = 18;
obj.sex = '男';
obj.sayHai = function() {
	console.log('Hi~');
}
```



### （4）利用构造函数创建对象

+ 为什么需要构造函数，是因为前面两种创建对象的方式一次只能创建一个对象
+ 构造函数：就是将我们对象里面一些相同的属性和方法抽象出来封装到函数里面
+ 构造函数就是一个普通的函数，是用来**创建对象的函数**。创建方式和普通函数没有区别，但调用函数的调用方式不同，普通函数是直接调用，而**构造函数需要使用new关键字来调用**
+ **构造函数习惯上首字母大写**
+ 构造函数不需要return就可以返回结果
+ 构造函数与对象的区别
  + 构造函数泛指某一大类，类似于java里面的类class
  + 对象特指是一个具体的事物，通过new创建对象的过程我们也叫对象实例化


```js
function 构造函数名() {
	this.属性 = 值;
	this.方法 = function() {}
}
new 构造函数名();

function Star(uname,age,sex) {
	this.name = uname;
	this.age = age;
    this.sex = sex;
    this.sing = function(sang) {
		console.log(sang);
	}
}
var ldh = new Star('猪八戒',18,'男');//调用函数返回的是一个对象
console.log(ldh);
```



+ **this总结**：当以构造函数的形式调用时，this就是新创建的那个对象
+ 方法在构造函数内部创建的，也就是构造函数每执行一次就会创建一个新的sayName方法，也就是所有的sayName都是唯一的，这样就导致构造函数执行一次就会创建一个新的方法。这样是没必要的，所有的对象可以共享同一个方法。

+ 构造函数执行流程（new关键字执行的过程）：
  1. new 构造函数在内存中创建一个空的对象
  2. this就会指向刚才创建的空对象，将新建的对象设置为函数的this，在构造函数中可以使用this来引用新建的对象
  3. 执行函数中的代码，给这个空对象添加属性和方法
  4. 将新建的对象作为返回值返回
+ 使用同一个构造函数创建的对象，我们称为一类对象，也将一个**构造函数称为一个类**
+ 通过一个类创建对象，叫创建该类的实例
+ 使用instanceof可以检查一个对象是否是一个类的实例
  + 语法：	对象 instanceof 构造函数
  + 如果是则返回true，否则则返回false
+ 所有的对象都是Object的后代，所以`console.log(dog instanceof Object);`



## 2、遍历对象

+ 遍历对象属性
+ for...in语句用于对数组或者**对象的属性**进行循环操作



```js
for (变量 in 对象) {
            
}

//变量经常写的是k和key
for(var k in obj) {
	console.log(k);//k是变量，输出得到的属性名
    console.log(obj[k]);//obj[k]得到的是属性值
}
```



# 二、内置对象

+ JavaScript的对象分为三种：自定义对象、内置对象、浏览器对象
+ 前面两个对象是js基础内容，属于ECMAScript；第三个浏览器对象属于我们js独有，JS API讲解

## 1、查文档

+ MDN/W3C

```js
Math.max(value1[,value2, ...]) 
//[]中的内容是可有可无的
```

+ 查看该方法的功能
+ 查看里面参数的意义和类型
+ 查看返回值的意义和类型
+ 通过demo进行测试

## 2、数学对象Math

+ 不是构造函数，不需要new来调用，而是直接使用其方法就行

```js
Math.max()
Math.min()
Math.PI
Math.abs()//取绝对值
console.log(Math.abs('-1'));//隐式转换会将字符串型 -1 转换为数字型
```

+ 封装一个自己的数学对象

```js
var myMath = {
	PI: 3.141592653,
	max: function() {
    	var max = arguments[0]
    	for (var i = 1; i < arguments.length; i++) {
    		if( max < arguments[i]) {
        		max = arguments[i]
        	}
		}
    return max;
	},
    min: function() {
    	var min = arguments[0]
    	for (var i = 1; i < arguments.length; i++) {
    		if( min > arguments[i]) {
        		min = arguments[i]
        	}
    	}
		return min;
	}
}
console.log(myMath.PI);
console.log(myMath.max(2,4,5));
console.log(myMath.min(2,4,5));
```





```js
//三个取整方法
console.log(Math.floor(1.9));//向上取整
console.log(Math.ceil(1.1));//向下取整
console.log(Math.round(1.5));//四舍五入

//其他数字都是四舍五入，但是.5特殊 它往大了取
console.log(Math.round(-1.5));//结果-1
console.log(Math.round(-1.1));//结果-1
```

+ Math.round()如果参数的小数部分恰好等于0.5，则舍入到相邻的在正无穷（+∞）方向上的整数.
+ Math随机数方法
  + 返回一个随机小数[0,1)
  + 没有参数

```js
console.log(Math.random());

//得到两个数之间的随机整数，并且包含这两个整数
//Math.floor(Math.random() * (max - min)) + min
function getRandom(min,max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(getRandom(1,10));
```



+ 随机点名

```js
function getRandom(min,max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
var star = ['鹿晗', '都锦绣', 'kai'];
```



+ 猜数字游戏

```js
function getRound(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
var num = getRound(1, 10);
console.log(num);
while (true) {
    var guess = prompt('请随机输入1~10之间的数字');
    if (guess > num) {
        alert('数字大了，继续猜！');
    } else if (guess < num) {
        alert('数字小了，继续猜！');
    } else {
        alert('猜对了');
        break;
    }
}
```





## 3、Date内置对象

+ Date()日期对象是一个构造函数，必须使用new来调用创建我们的对象
+ 如果没有参数，返回当前系统的当前时间

```js
var date = new Date();
console.log(date);
```

+ 参数的常用写法
  + 数字型 2019，10，01 或者是字符串型 '2019-10-1 8:8:8'

```js
var date1 = new Date(2019,10,1);
console.log(date1);//返回的是11月,返回的比输入的时间大一个月

var date2 = new Date('2021-10-1 8:8:8');
console.log(date2);//返回的是10月
```



### 格式化日期

```js
var date = new Date();
console.log(date.getFullYear());//返回当前日期的年
console.log(date.getMonth()+1);//返回的月份小1个月
console.log(date.getDate());//返回几号
console.log(date.getDay());//获取星期几，周日返回的是0

var arr = ['星期天','星期一','星期二','星期三','星期四','星期五','星期六'];
var year = date.getFullYear();
var month = date.getMonth()+1;
var dates = date.getDate();
var day  = date.getDay();
console.log(arr[day]);
```



### 格式化日期时分秒

```js
var date = new Date();
console.log(date.getHours());
console.log(date.getMinutes());
console.log(date.getSeconds());

//要求封装一个函数返回当前的时分秒
function getTime() {
	var time = new Date();
    var h = time.getHours();
    h = h < 10 ? '0' + h : h;
    var m = time.getMinutes();
    m = m < 10 ? '0' + m : m;
    var s = time.getSeconds();
    s = s < 10 ? '0' + s : s;
    return h + ':' + m + ':' + s;
}
console.log(getTime());
```



### 获取日期的总的毫秒形式（不会重复，称为时间戳）

```js
//获得Date总共的毫秒数(时间戳)，是距离1970年1月1日号过来多少毫秒
//方法一：valueof(),getTime()
var date =new Date();
console.log(date.valueOf());
console.log(date.getTime());

//方法二：简单写法
var date1 = +new Date();//最常用的用法
console.log(date1);

//方法三
//H5新增的方法获得总毫秒数
console.log(Date.now());
```



```js
//倒计时案例
function countDown(time) {
	var nowTime = +new Date();
	var inputTime = +new Date(time);
    var times = (inputTime - nowTime) / 1000;
    var d = parseInt(times/60/60/24);
    d = d < 10 ? '0' + d : d;
    var h = parseInt(times/60/60%24);
    h = h < 10 ? '0' + h : h;
    var m = parseInt(times/60%60);
    m = m < 10 ? '0' + m : m;
    var s = parseInt(times%60);
    s = s < 10 ? '0' + s : s;
    return d + '天' + h + '时' + m + '分' + s + '秒';
}
console.log(countDown('2021-7-5 12:00:00'));
```



## 4、数组对象

创建数字对象的两种方式

+ 字面量创建方式
+ 利用new Array()创建方式

```js
var array = new Array();//创建了一个空的数组
var array = new Array(2);//表示数组长度为2，里面有两个空的数组元素
var array = new Array(2,3)//表示有两个数组元素2和3
```

### 检测是否为数组

+ instanceof 运算符，它可以用来检测是否为运算符

```js
var arr = [];
var obj = {};
console.log(arr instanceof Array);//true
console.log(obj instanceof Array);//false
```

+ `Array.isArray`(参数)

```js
    var arr = [];
    var obj = {};
    console.log(Array.isArray(arr));
    console.log(Array.isArray(obj));
```

### 添加删除数组元素的方法

|      方法名       |                            说明                             | 返回值               |
| :---------------: | :---------------------------------------------------------: | -------------------- |
| push(参数1.....)  |         **末尾**添加一个或多个元素，注意修改原数组          | 并返回新的长度       |
|       pop()       | 删除数组最后一个元素，把数组长度减1，**无参数**，修改原数组 | 返回它删除的元素的值 |
| unshift(参数1...) |      向数组**开头**添加一个或更多元素，注意修改原数组       | 并返回新的长度       |
|      shift()      |  删除数组的第一个元素，数组长度减一，**无参数**修改原数组   | 并返回第一个元素的值 |

+ push()：

  + 该方法可以向数组末尾添加一个或多个元素，并且返回新的长度
  + 可以将要添加的元素作为方法的参数传递
  + 该方法会将**数组长度**作为结果返回，原数组长度也会发生变化

```js
var arr =["孙悟空", "猪八戒", "沙和尚"];
var result = arr.push("唐僧", "蜘蛛精");
console.log(arr);
console.log(result);//结果为5
```

+ unshift():
  + 向数组开头添加元素
  + 返回新的长度

```js
arr.unshift('red','purple');
console.log(arr);
```

+ pop()：
  + 该方法可以删除数组的**最后一个元素**
  + 并将删除的元素作为返回值返回

```js
result = arr.pop();
console.log(arr);
console.log(result);//返回删除的元素
```



```js
//应用
var arr = [1000,2500,3000,600];
        var newArr = new Array();
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] >=2000) {
                newArr.push(arr[i]); // newarr[newarr.length] = arr[i];
            }
            
        }
        console.log(newArr);
```

### 数组排序

+ `reverse()`和`sort()`

```js
		//1、翻转数组
        var arr = ['pink','red','blue'];
        arr.reverse();
        console.log(arr);

        // 数组排序（冒泡排序）
        var arr1 = [3,4,7,1,77];
        arr1.sort(function(a,b) {
            // return a-b;//升序的顺序排列
            return b-a;//降序的顺序排列
        });
        console.log(arr1);
```



### 获取数组索引方法

| 方法名        | 说明                           | 返回值                                   |
| ------------- | ------------------------------ | ---------------------------------------- |
| indexOf()     | 数组中查找给定元素的第一个索引 | 如果存在返回索引号，如果不存在，则返回-1 |
| lastIndexOf() | 在数组中的最后一个的索引       | 如果存在返回索引号，如果不存在，则返回-1 |

+ **indexOf()**
  + 只返回第一个第一个满足条件的索引号

```js
		var arr = ['red','green','blue','pink', 'green'];
        console.log(arr.indexOf('green'));// 1
```

+ **`lastIndexOf()`**从后面查找



### 案例：数组去重

```js
//封装一个去重的函数 unique
        function unique(arr) {
            var newArr = new Array();
            for (var i = 0; i < arr.length; i++) {
                if(newArr.indexOf(arr[i]) === -1) {
                    //newArr[newArr.length] = arr[i];
                    newArr.push(arr[i]);
                }
                
            }
            return newArr;
        }

        var demo = unique(['c','a','z','a','x','a','x','c','b']);
        console.log(demo);

function unique(arr) {
    arr.sort();
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == arr[i + 1]) {
            for (var j = i; j < arr.length; j++) {
                arr[j] = arr[j + 1];
            }
            arr.length--;
            i--;
        }
    }
    return arr;
}
var demo = unique(['c', 'a', 'z', 'a', 'x', 'a', 'x', 'c', 'b']);
console.log(demo);
```



### 将数组转化为字符串的方法

```js
//数组转换为字符串
        // 1、.toString()将我们的数组转换为字符串
        var arr = [1,2,3];
        console.log(arr.toString());

        // 2、join(分隔符)
        var arr1 = ['green','blue','pink'];
        console.log(arr1.join('-'));//默认分隔符为逗号
```



| 方法名     | 说明                                                         | 返回值                                                       |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| concat()   | 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。 | 返回一个新的数组                                             |
| slice()    | 数组截取slice(begin,end)（包括 `begin`，不包括`end`）        | 返回被截取项目的新数组                                       |
| splice()   | 数组删除splice()（从第几个开始，要删除的数）                 | 返回被删除数组的新项目，注意，这个会影响原数组               |
| toString() | 方法返回一个表示该对象的字符串。                             | 一个表示该对象的字符串。                                     |
| join()     | 所有的数组元素被转换成字符串，再用一个分隔符将这些字符串连接起来。 | 一个所有数组元素连接的字符串。如果 `arr.length` 为0，则返回空字符串。 |

```js
var arr1 = ['green','blue','pink','red','black'];
console.log(arr1);
console.log(arr1.splice(2,2));
console.log(arr1);
```



## 5、字符串对象

### 基本包装类型

```js
//对象和复杂数据类型才有属性和方法
var str = 'andy';
console.log(str.length);//这是个简单类型为什么会有属性呢

//基本包装类型：就是将简单数据类型包装成了复杂数据类型
var temp = new String();
str = temp;
temp = null;//销毁临时变量
```



### 字符串的不可变

字符串的不可变：指得是里面的值，虽然看上去可以改变内容，但其实是地址变了，内存中开辟了一个内存空间。所以不要大量拼接字符串，非常占用资源！！！！

> ```js
> var str = 'andy';
> console.log(str);
> str = 'red';
> console.log(str);
> ```



### 根据字符返回位置

字符串的所有方法，都不会修改字符串本身（字符串是不可变的），操作完成会返回一个新的字符串

```js
//str.indexOf('要查找的字符'，[起始的位置])
        var str = '改革春风吹满地，春天来了'
        console.log(str.indexOf('春'));
        console.log(str.indexOf('春',3));
```

+ **案例**：查找字符串`abcoefoxyozzopp`中所有o出现的位置以及次数

```js
//核心算法：先查找第一个o出现的位置
//然后只要indexOf返回的结果不是-1就继续向后查找
//因为indexOf只能查找到第一个，所以后面的查找，一定是当前索引加1，从而继续查找

var str = 'abcoefoxyozzopp';
var index = str.indexOf('o');
var count = 0;
while(index != -1) {
	console.log(index);
	count ++;
	index = str.indexOf('o', index+1);
}
console.log('o出现的次数是：' + count + '次');
```



### 根据位置返回字符（重点）

| 方法名            | 说明                                                         | 使用                          |
| ----------------- | ------------------------------------------------------------ | ----------------------------- |
| charAt(index)     | 返回指定位置的字符（index字符串的索引号）                    | str.charAt(0)                 |
| charCodeAt(index) | 获取指定位置处字符的ASCⅡ码（index索引号）目的：判断用户按下了哪个键 | str.charCode(0)               |
| str[index]        | 获取指定位置处字符                                           | HTML5，IE8+支持和charAt()等效 |



### 统计最多次出现的字符

>```js
>//判断一个对象中是否包含某种属性( 0 "" null NaN undefined 都为false)
>var o = {
>          age:18
>      }
>      if (o['sex']) {
>          console.log('里面有属性');
>      } else {
>          console.log('里面没有属性');
>      }
>```

 **核心算法:**

+ 利用`charAt()`遍历这个字符串
+ 把每个字符都储存给对象，如果对象没有该属性，就为1；如果存在了就加1
+ 遍历对象，得到最大值和该字符

```js
	  var str = 'abcoefoxyozzopp';
      var o = {};
      for (let i = 0; i < str.length; i++) {
          var chars = str.charAt(i);//chars是字符串的每一个字符
          if (o[chars]) {
                o[chars]++;
          } else {
                o[chars] = 1;
          }  
      }
      console.log(o);

      //遍历对象
      var max = 0;
      var ch = '';
      for(var k in o) {
          if (o[k] > max) {
              max = o[k];
              ch = k;
          }
      }
      console.log(max,ch);
```



### 字符串操作方法（重点）

| 方法名                                          | 说明                                                         |
| ----------------------------------------------- | ------------------------------------------------------------ |
| concat（str1,str2,str3...）                     | concat()方法用于连接两个或多个字符                           |
| substr(start,length) （遗留函数，应该避免使用） | 从start位置开始（索引号），length取的个                      |
| substring(start,end) （不包括end）              | 方法返回一个字符串在开始索引到结束索引之间的一个子集, 或从开始索引直到字符串的末尾的一个子集。 |
| replace(‘被替换的字符’，‘替换为的字符’)         | 该方法并不改变调用它的字符串本身，而只是返回一个新的替换后的字符串。 |
| split('分隔符')                                 | 字符转换为数组（join将数组转换为字符串）如果在str中省略或不出现分隔符，则返回的数组包含一个由整个字符串组成的元素。 |



+ 有一个字符串`abcoefoxyozzopp`要求把里面所有`o`都替换为*

```js
var str = 'abcoefoxyozzopp';
while( str.indexOf('o') !== -1) {
    str = str.replace('o','*');
}
console.log(str);
```



```js
var str = 'red&pink&blue';
console.log(str.split('&')); //返回的是一个数组
```





# 三、简单数据类型和复杂数据类型

## 1、基本数据类型

简单数据类型又叫做基本数据类型或**值类型**，复杂数据类型又叫做**引用类型**

+ string 字符串
+ number 数值
+ Boolean 布尔值
+ undefined 未定义
+ null 空置（是一个object类型）
  + 返回的是一个空对象
  + 如果有个变量以后打算存储为对象，暂时没想好放啥，这个时候就给null

+ 引用类型：复杂数据类型，在存储时变量中存储的仅仅时地址（引用），因此叫做引用数据类型，通过new关键字创建对象（系统对象，自定义对象)
+ object 对象：一种复合数据类型，在对象中可以保存多个不同数据类型的属性

## 2、数据类型分配

堆和栈的区别：

+ 栈：由操作系统自动分配释放函数的参数值、局部变量的值等，其操作方式类似于数据结构中的栈。简单数据类型存放到栈中。
+ 堆：存储复杂类型（对象），一般由程序员分配释放，若程序员不释放，由垃圾回收机制回收。复杂数据类型存放到堆里面。

### 3、对象属性

```js
<script>
        /* 使用new关键字调用的函数，是构造函数constructor
            构造函数是专门用来创建对象的函数
        */
        var obj = new Object();
        console.log(obj);

       /*在对象中保存的值称为属性
         向对象中添加属性
         语法： 对象.属性名 = 属性值;
       */ 
      obj.name = "孙悟空";
      obj.gender = "男";
      obj.age = "18";

      /*读取对象中的属性
        语法：对象.属性名
      */
     console.log(obj.name);

     /*修改对象的属性值
     语法：对象.属性名 = 新值*/
     obj.name = "西游记";
     console.log(obj.name);
     /* 删除对象的属性
        语法：delete 对象.属性名*/
        delete obj.name;
        console.log(obj.name);
    </script>
```

+ 对象的属性名不强制要求遵守标识符的规范

+ 如果要采用特殊的属性名，不能采用.的方式来操作

  ```js
  <script>
          /*特殊的属性名用特殊的方式
            语法：对象["属性名"] = 属性值;*/
          var obj = new Object();
          obj["123"] = "适合你";
          console.log(obj["123"]);
  </script>
  ```

+ in运算符

  通过该运算符可以检查一个对象中是否含有指定的属性

  如果有则返回true，没有则返回false

  语法："属性名" in 对象

### 4、基本数据类型和引用数据类型

+ 基本数据类型：String Number Boolean Null Undefined
+ 引用数据类型：Object
+ js的变量是保存到栈中，修改一个变量不会改变另一个变量
+ 引用数据类型每创建一个新的对象，就会再堆中开辟一个新的空间，变量中存储的堆空间的地址

### 5、

```js
var obj2 = {
           name:"猪八戒",
           age:17,
           gender:"男",
           test:{name:"沙和尚"}
        //    对象作为属性的值
        };
```

### 

### 7、枚举对象中的属性

+ 枚举对象中的属性就是将对象中的属性一个个取出来

+ 使用 for...in 语句

  语法：for (var 变量 in 对象) { };

```js
for ( var n in obj) {
	console.log("hello");
}//对象中有多少个属性就执行几次

for ( var n in obj) {
	console.log(n);
}//每执行一次会将对象中的一个属性的名字赋值给变量n

for ( var n in obj) {
	console.log(obj.n);
}//在obj中没有名为n的属性值，所以执行结果为undefined

for ( var n in obj) {
	console.log(obj[n]);
}//[]可以传变量，当n为name属性时则打印name属性所对应的值
```

### 8、作用域

在js中一共有两种作用域

+ 全局作用域

  + 全局作用域在页面打开时创建，在页面关闭时销毁
  + 在全局作用域中有一个全局对象window
  + 在全局作用域中，创建的变量都会作为window对象的属性保存；创建的函数都会作为window的方法来保存。

  ```js
  var a = 10;
         console.log(window.a);
  
  function fun() {
             console.log("我是fun");
         }
   window.fun();//等价于fun();
  ```

  

  + **变量的声明提前** ：使用var关键字声明的变量，会在所有代码执行之前被声明（但是不会被赋值）、

  ```js
  console.log(a);
  var a = 123;//相当于在顶部有一个var a;所以执行结果为undefined
  ```

  

  + **函数声明提前** ：使用函数声明形式创建的函数，会在所有代码执行之前就会被创建，所以可以在函数声明前调用函数；而使用函数表达式创建的函数，不会被声明提前，所以不能在声明前调用。

+ 函数作用域

  + 调用函数时创建函数作用域，函数执行完毕以后，函数作用域销毁
  + 每调用一次函数就会创建一个新的函数作用域，他们之间是相互独立的
  + 在函数作用域中可以访问全局变量，而全局变量无法访问函数作用域的变量
  + 在函数作用域中也有变量声明提前
  + **在函数中，不使用var声明的变量都会成为全局变量**

  ```js
  var e = 23;
         function fun1(e) {
             alert(e);//相当于var e
         }
         fun1();
  ```

  + 定义形参就相当于在函数作用域中声明了变量

  ```js
   var c = 30;
         function fun() {
             console.log(c);
             c = 10;
         };
  fun();//必须先调用，函数作用域才生成
  console.log(c);
  ```

  

### 9、this

解析器每次在调用函数时每次都会向函数内部传递一个隐含的参数，这个隐含的参数就是this，this指向的是一个对象，二这个对象就是我们所说的上下文对象，根据函数的调用方式不同，this会指向不同的对象

+ 以函数的方式调用，this永远都是指向windows
+ 以方法的方式调用，this就是指向调用方法的那个对象
+ 当以构造函数的形式调用时，this就是新创建的那个对象

```js
// 根据调用的对象不同，打印不同的值，this可以使代码更灵活
        var name = "全局";
        function fun1() {
            console.log(this.name);
        }
        var obj1 = {
            name:"如来佛祖",
            sayName:fun1
        } 
        var obj2 = {
            name:"沙和尚",
            sayName:fun1
        } 
        obj1.sayName();
        obj2.sayName();
```

### 10、使用工厂方法创建对象

```js
funtion creatPerson(name, age, gender) {
    var obj = new Object;
    obj.name = name;
    obj.age = age;
    obj.gender = gender;
    obj.sayName = function () {
        alert(this.name);
    };
    //将新的对象返回
    return obj;
}

var obj = creatPerson("沙和尚", 15, "男");

obj.sayName();
```

+ 注：使用工厂方法创建的对象，使用的构造函数都是Object，所以创建的对象都是Object这个类型，久导致我们无法区分出多种不同类型的对象

### 

### 12、原型对象

+ 函数内不能定义属性，若要添加属性就要通过创建对象，返回值返回的是一种类型，不是对象不能用.

```js
function Myclass() {
    var a = 123;
	return a;
}
var b = Myclass();
console.log(b);
```

+ 我们创建的每一个函数，解析器都会向函数中添加一个属性prototype，这个属性对应着一个对象，这个对象就是原型
+ 如果函数作为普通函数调用prototyp没有任何作用，当函数以构造函数的形式调用时，他所创建的对象都会有一个隐含的属性所指向该构造函数的原型，可以通过`__proto__`来查看
+ 原型对象相当于一个公共区域，所有同一个类的实例都可以访问到这个原型对象，我们可以将对象中共有的内容，统一设置到原型对象中
+ 当我们访问对象的一个属性或方法时，他会先在对象自身中寻找，如果有则直接使用，如果没有就去原型对象中寻找，如果找到则会直接使用

```js
function Myclass() {
           
       }
       
       var mc = new Myclass();
       console.log(Myclass.prototype);
       console.log(mc.__proto__);
       console.log(mc.__proto__ == Myclass.prototype);

       // 向Myclass的原型中添加属性a
       Myclass.prototype.a = 123;
    //    mc.a = "我是mc中的a";

       //向Myclass的原型中添加一个方法
       Myclass.prototype.sayHello = function () {
           alert("hello");
       }
    //    mc.b = fun;
       
       mc.sayHello()
    //    console.log(mc.a);
```

+ 原型对象也是对象，所以他也有原型，当我们使用一个对象的属性或方法时，会先在自身中查找，如果没有就去原型中查找，如果没有则去原型的原型中查找。
+ Object对象的原型没有原型，如果在Object中依然没有找到，则返回undefined

```js
function Myclass() {

}
// 向Myclass的原型中添加一个name属性
Myclass.prototype.name = "我是原型中的name"
var mc = new Myclass();
console.log(mc.name);

//使用in检查都对象中是否含有某个属性时，如果对象中没有，但原型中有，也会返回true
console.log("name" in mc);

//可以使用对象的hasOwnProperty()来检查对象自身中是否含有该属性
console.log(mc.hasOwnProperty("name"));

//原型的原型中有hasOwnProperty()属性
console.log(mc.__proto__.__proto__.hasOwnProperty("hasOwnProperty"));

//结果为null，mc创建的是MyClass型对象，在这个对象中的原型，应为原型也是对象，所以他还有原型
//而二代原型创建的原型类型为Object，而又因为Object没有原型，所以只有几层。
console.log(mc.__proto__.__proto__.__proto__);
```

## 二、数组

+ 数组也是一个对象，它和普通对象功能类似，也是用来储存一些值的，不同的是普通对象是使用字符串作为属性名的，而数组使用数字来作为索引操作元素
+ 数组的存储性能比普通对象要阿红，在开发中我们经常使用数组来存储一些数据

```js
var arr = new Array();
console.log(typeof arr);

//获取数组长度：用length属性
console.log(arr.length);

//修改length
arr.length = 10;
console.log(arr);
```

```js
//使用字面量创建数组
var arr = [1,2,3,4,5];

//使用构造函数创建数组时，也可以同时添加元素，将要添加的与酸奶作为构造函数的参数传递
var arr2 = new Array(35,56,78);
console.log(arr2);

//创建有个数组，数组中只有一个元素10
arr3 = [10];

//创建一个长度为10的数组
arr2 = new Array(10);
```

### 数组的方法



+ forEach()

  ​    -遍历数组，需要一个函数作为参数

  ​    -像这种函数，由我们创建但是不由我们调用的，我们称为**回调函数**

  ​    -数组中有几个元素函数就会执行几次

  ​    -浏览器在回调函数中传了三个参数，第一个参数，就是当前正在遍历的元素；

  ​     第二个参数，就是当前正在遍历的索引；

  ​     第三个参数，就是正在遍历的数组

  ```js
  arr.forEach(function (value,index){
         console.log(value,index)
     });
  ```

  ```js
  function getAdult(arr) {
  	var newArr = [];
      arr.forEach(function (value) {
      	var p = value;
      	if (value.age >= 18) {
      		newArr.push(p);
      	}
  	})
      return newArr;
  }
  ```

+ concat()

  ​      -可以连接两个或多个数组，并将新的数组返回

  ​      -该方法不会对原数组产生影响

+ join()

  ​      -该方法可以将数组转换为一个字符串

  ​      -该方法不会对原数组产生影响，而是转换后的字符串作为结果返回

  ​      -参数：可以指定一个字符串作为参数，这个字符串将会成为数组中元素的连接符，

  ​      如果不指定则默认使用，作为连接符

+ reverse()

  ​      -该方法用来反转数组

  ​      -该方法会直接修改原数组

+ sort()

  ​      -可以用来对数组中的元素进行排序

  ​      -也会影响原数组，默认会按照Unicode编码进行排序

  ​      -对于纯数字进行排序会按照Unicode编码进行排序，所以会错误

  ​      -我们可以在sort()中添加一个回调函数，来指定排序规则

  + 浏览器会根据回调函数的返回值来决定元素的顺序
  + 如果返回一个小于0的值，则元素会交换位置；如果返回一个大于0的值，则元素位置不变；如果返回0 则认为两个元素相等也不交换位置。

  ```js
  var arr = [5,4,2,1,3,6,8,7];
  arr.sort(function (a,b) {
  //    if (a > b) {
  //     return 1;
  //    }else if(a < b) {
  //        return -1;
  //    }else{
  //     return 0;
  //    }
  return a-b;
  })
  console.log(arr);
  ```


## 三、函数

### call()和apply()

+ 这两个方法都是函数对象的方法，需要通过函数对象来调用
+ 当对函数调用call()和apply()都会调用函数执行
+ 在调用call()和apply()可以将一个对象指定为一个参数

