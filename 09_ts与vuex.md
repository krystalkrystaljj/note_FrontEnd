### 项目的tsconfig.js文件配置（34.50）

```json
{
  "compilerOptions": {
    // 目标代码(ts -> js(es5/6/7))
    "target": "esnext",
    // 目标代码需要使用的模块化方案(commonjs require/module.exports/es module import/export)
    "module": "esnext",
    // 严格一些严格的检查(any)
    "strict": true,
    // 对jsx进行怎么样的处理
    "jsx": "preserve",
    // 辅助的导入功能
    "importHelpers": true,
    // 按照node的方式去解析模块 import "/index.node"
    "moduleResolution": "node",
    // 跳过一些库的类型检测 (axios -> 类型/ lodash -> @types/lodash / 其他的第三方)
    // import { Person } from 'axios'
    "skipLibCheck": true,
    // export default/module.exports = {}
    // es module 和 commonjs
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    // 要不要生成映射文件(ts -> js)
    "sourceMap": true,
    // 文件路径在解析时, 基本url
    "baseUrl": ".",
    // 指定具体要解析使用的类型
    "types": ["webpack-env"],
    // 路径解析(类似于webpack alias)
    "paths": {
      "@/*": ["src/*"],
      "components/*": ["src/components/*"]
    },
    // 可以指定在项目中可以使用哪里库的类型(Proxy/Window/Document)
    "lib": ["esnext", "dom", "dom.iterable", "scripthost"]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts",
    "tests/**/*.tsx"
  ],
  "exclude": ["node_modules"]
}

```



+ 假如解析mian.js文件时，碰到import axios from ’axios‘会将里面的都解析



### vue文件类型声明

假如在项目中引入一些文件，假如为.vue，.png等文件，默认ts时不认识这些文件模块，会报错

+ 项目是由脚手架搭建，默认配置已经配置好了
+ 将这些文件申明为一个模块
+ 定义了vue中的一个组件类型
+ 组件类型对应的一个实例

![image-20230919204701698](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230919204701698.png)



### DefineComponent作用

+ DefineComponent将导出的对象进行了一个包裹，从js的角度来说，没有什么意义传入一个对象，又将这个对象返回出去

+ 从ts的角度来说可以做很多类型限制和推导



安装统一样式

```
npm install normalize.css
```

在mian.ts中引入

```
import 'normalize.css'
```



+ 因为路由映射已经配置好了，所以只需在App.vue文件中采用router-view进行占位，默认路径为/login

![image-20230920145902634](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230920145902634.png)



![image-20230920145929180](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230920145929180.png)

+ 页面相关的组件放在文件夹下的cpns文件夹中
+ 公共业务逻辑的组件存放在components文件夹中
+ base-ui在其他业务中也能用的组件



