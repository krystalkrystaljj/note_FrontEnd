

![image-20230725152543595](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230725152543595.png)



```
tsc .\01_Hello_TypeScript.ts #对其进行编译，编译成为js文件，然后通过浏览器环境进行运行
```



方案1、通过webpack搭建一个ts环境

```
npm init #创建一个package.json文件
npm install webpack webpack-cli -D #安装webpack
```

+ 新建一个webpack.config.js的文件
+ 在package.json文件中创建一个脚本执行webpack

![](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230725155949552.png)

+ 到时就会进行打包，然后加载配置文件webpack.config.js



```js
const path = require('path')

module.exports = {
  entry:"./src/main.ts",
  output:{
    path:path.resolve(__dirname,"./dist"),
    filename:"bundle.js"
  }
}
```



![image-20230725161059193](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230725161059193.png)



```
npm install ts-loader typescript -D
```



+ 在配置文件中编写匹配规则

```
module.exports = {
  entry:"./src/main.ts",
  output:{
    path:path.resolve(__dirname,"./dist"),
    filename:"bundle.js"
  },
  module:{
    rules:[
      {
        test:/\.ts$/,
        loader:"ts-loader"
      }
    ]
  }
}
```



![image-20230725161633124](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230725161633124.png)



```
 tsc --init #生成tsconfig.json文件
```



![image-20230725164144763](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230725164144763.png)



+ 配置extension，找文件是会自动加上.ts

```
module.exports = {
  entry:"./src/main.ts",
  output:{
    path:path.resolve(__dirname,"./dist"),
    filename:"bundle.js"
  },
  resolve:{
    extensions:[".ts"]
  },
  module:{
    rules:[
      {
        test:/\.ts$/,
        loader:"ts-loader"
      }
    ]
  }
}
```



+ 每次要进行npm run build进行打包麻烦,然后手动引入

```
<script src="./dist/bundle.js"></script> 
```



```
npm install webpack-dev-server -D
```



```
npm install html-webpack-plugin -D
```



+ devSever中有依赖js文件

![image-20230725170523197](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230725170523197.png)

方案2、安装ts-node，可以对TypeScript.ts进行编译，跑在node上

```
npm install ts-node -g
npm install tslib @types/node -g
```



+ 可以通过ts-node运行ts文件了





## 变量的声明