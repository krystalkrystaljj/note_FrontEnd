# css属性-背景
## background-image
+ background-image用于设置元素的背景图片，会盖在（不是覆盖）background-color上
+ 如果设置了背景图片之后，元素没有具体的宽高，背景图片是不会显示出来的，**background-image是不占据空间的**
## background-repeat
+ 默认值repeat
+ repeat-x 水平方向平铺
+ repeat-y 垂直方向平铺
+ no-repeat  
## background-size
+ 用于设置背景图片的大小
+ auto：以背景本身大小显示
+ cover：缩放背景图，以完全覆盖铺满元素（图片会被拉伸，会变得扭曲）
+ contain：缩放背景图，宽度或者高度铺满元素，但是**图片保持宽高比**
+ `<percentage>`：百分比，相对于背景区（background positioning area），写一个值是相对于宽度的比例，高度则是auto  ，两个值第二值是相对于高度的宽高比
+ length：具体的大小，如100px

## background-position
+ 用于设置背景图片在水平、垂直方向上的具体位置
+ 有两个值可以设置数值也可以设置left、bottom等
+ 水平方向还可以设置：left、center、right
+ 垂直方向还可以设置：top、center、bottom
+ 如果只设置了一个方向，另一个方向默认为center

## sprite
+ 定义：是一种css图像合成技术，将各种小图片合并到一张图片上，然后利用css的背景定位来显示对应的图片部分
+ 优点：减少网页的http请求数量，加快网页响应速度，减轻服务器压力；减小图片总大小；解决了图片命名的困扰，只需要针对一张集合的图片命名



## background-attachment
+ scroll：（浏览器窗口滚动时）背景图片随元素一起滚动（默认值）
+ local：背景图片跟随元素以及元素内容一起滚动
+ fixed：背景图片相对于浏览器窗口固定



## background缩写

+ image position/size repeat attachment color
+ background-size可以省略，如果不省略，background-size必须紧跟在background-position的后面
+ 其他属性可以省略，且顺序任意

||img|background-image|
|:-:|:-:|:-:|
|性质|HTML元素|css样式|
|图片是否占用空间|√|×|
|浏览器是否支持右键直接查看地址|√|×|
|支持css sprite|×|√|
|更有可能被搜索引擎收录|√（结合alt属性）|×|
|加载顺序|优先加载|等加载完HTML元素后再加载|
|总结：img 作为网页内容的重要组成部分，比如广告、logo图片、文章配图、产品图片|||
|background-image 可有可无，有 可使网页更加美观，无，也不影响用户获取完整的网页信息内容|||

