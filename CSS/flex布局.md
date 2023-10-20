+ 两个重要的概念：
  + 开启了flex布局的元素叫flex container
  + flex container里面的之间子元素叫做flex items
+ 设置display属性为flex或者inline-flex可以成为flex container
  + flex：flex container以block-level形式存在
  + inline-flex：flex container以inline-level形式存在
+ flex items默认都是沿着main axis（主轴）从main start开始往main end方向排布
+ flex-direction决定了main axis的方向，有四个取值
  + row、row-reverse、column、column-reverse
+ justify-content决定了flex items在main axis上的对齐方式
  + flex-start（默认值）：与main start对齐
  + flex-end：与main end对齐
  + center：居中对齐
  + space-between：
    + flex items之间的距离相等
    + 与main start、main end两端对齐
  + space-evenly
    + flex items之间的距离相等
    + flex items与main start、main end之间的距离等于flex items之间的距离
  + space-around
    + flex items之间的距离相等
    + flex items与main start、main end之间的距离等于flex items之间的距离的一半
+ align-items决定了flex items在cross axis上的对齐方式
  + normal：在弹性布局中，和strecth一样
  + stretch：当flex items在cross axis方向的size为auto时，会自动拉伸至填充flex container
  + flex-start：与cross start对齐
  + flex-end：与cross end对齐
  + center：居中对齐
  + baseline：与基准线对齐（很多行的文本是以第一行的基线对齐）
+ flex-wrap决定了flex container是单行还是多行
  + nowrap（默认）：单行
  + wrap：多行
  + wrap-reverse：多行（对比wrap，cross start与cross end相反）
+ flex-flow是flex-direction || flex-wrap的简写
  + 可以省略，顺序任意
+ align-content决定了多行flex items在crosss axis上的对齐方式



## flex-items属性order

+ order决定了flex items的排布顺序
  + 可以设置任意整数（正整数、负整数、0），值越小就越排在前面
  + 默认值是0
+ flex items可以通过align-self覆盖flex container设置的align-items
  + auto（默认值）：遵从flex container的align-items设置
  + stretch、flex-stat、flex-end、center、baseline，效果跟align-items一致
+ flex-grow