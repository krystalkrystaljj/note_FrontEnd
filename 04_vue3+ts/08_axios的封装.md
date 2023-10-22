

# 一、axios的介绍

## 1 axios的基本使用

+ http://httpbin.org/

+ 导入的axios本身就是axios的一个实例对象

axios常用语法

| nam                              | value                               |
| -------------------------------- | ----------------------------------- |
| axios(config)                    | 通用/最本质的发任意类型请求的方式   |
| axios(url[,config])              | 可以只指定url发get请求              |
| axios.request(config)            | 等同于axios(config)                 |
| axios.get(url[,config])          | 发get请求                           |
| axios.delete(url[,config])       | 发delete请求                        |
| axios.post(url[,data,config])    | 发post请求                          |
| axios.put(url[,data,config])     | 发put请求                           |
|                                  |                                     |
|                                  |                                     |
| axios.defaults.xxx               | 请求非默认全局配置                  |
| axios.interceptors.request.use() | 添加请求拦截器                      |
|                                  | 添加响应拦截器                      |
|                                  |                                     |
|                                  |                                     |
| axios.create([config])           | 创建一个新的axios(他没有下面的功能) |
|                                  |                                     |
|                                  |                                     |
| axios.Cancel()                   | 用于创建取消请求的错误对象          |
| axios.CancelToken()              | 用于创建取消请求的token对象         |
| axios.isCancel()                 | 是否是一个取消请求的错误            |
| axios.all(promise)               | 用于批量执行多个异步请求            |

### 1.1 promise返回值的类型

+ promise本身时可以有类型

![](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230911105832929.png)

```js
new Promise<string>(resolve => {
  resolve('abc')
}).then((res) => {
  console.log(res);
})
```

### 1.2 发送get请求

+ res是AxiosResponse类型

```ts
import axios from 'axios'

// axios的实例对象
axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
   console.log(res.data)
})
```



+ get请求，并且传入参数

```ts
// 2.get请求，并且传入参数
axios
  .get('http://httpbin.org/get', {
    params: {
      name: 'coderwhy',
      age: 18
    }
  })
  .then((res) => {
    console.log(res.data)
  })

```



### 1.3 送post请求

```ts
// 3.post请求
axios
  .post('http://httpbin.org/post', {
    data: {
      name: 'why',
      age: 18
    }
  })
  .then((res) => {
    console.log(res.data)
  })
```

### 1.4 axios全局配置选项

```ts
// 4.axios的配置选项
// 4.1 全局配置
axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 10000
axios
  .get('/get', {
    params: {
      name: 'coderwhy',
      age: 18
    }
  })
  .then((res) => {
    console.log(res.data)
  })

axios
  .post('/post', {
    data: {
      name: 'why',
      age: 18
    }
  })
  .then((res) => {
    console.log(res.data)
  })
```



### 1.5 all发送多个请求

```ts
// 5.axios.all 多个请求一起返回
axios
  .all([
    axios.get('/get', { params: { name: 'tjj', age: 18 } }),
    axios.post('/post', { data: { name: 'why', age: 19 } })
  ])
  .then((res) => {
    console.log(res[0].data)
    console.log(res[1].data)
  })
```



## 2 拦截器

### 应用场景

+ 每一个请求都需要携带token,所以在发送请求之前会对其进行拦截，然后加上token再进行发请求
+ 请求时间比较长，加上一个loading动画，所以要对请求进行拦截，然后当请求返回时，将这个loading移除
+ 拿到响应结果，并不是想要的，要对其做一些判断，对响应的结果进行拦截，然后返回我们想要的数据结果
+ 拦截工作本质上是一个函数，可以在这个函数中采取任意操作

### 请求拦截

```ts
// 6.axios的拦截器
// fn1: 请求发送成功会执行的函数
// fn2: 请求发送失败会执行的函数
axios.interceptors.request.use(
  (config) => {
    // 想做的一些操作
    // 1.给请求添加token
    // 2.isLoading动画
    console.log('请求成功的拦截')
    return config
  },
  (err) => {
    console.log('请求发送错误')
    return err
  }
)
```

### 响应拦截

```ts
// fn1: 数据响应成功(服务器正常的返回了数据 20x)
axios.interceptors.response.use(
  (res) => {
    console.log('响应成功的拦截')
    return res
  },
  (err) => {
    console.log('服务器响应失败')
    return err
  }
)
```





## 3 区分不同环境

+ 在开发中，有时候我们需要根据不同的环境设置不同的环境变量，常见的有三种环境： 

+ 开发环境：development； 
+ 生产环境：production； 
+ 测试环境：test； 
+ 如何区分环境变量呢？常见有三种方式： 
  + 方式一：手动修改不同的变量； 
  + 方式二：根据process.env.NODE_ENV注入的值进行区分； 
  + 方式三：编写不同的环境变量配置文件；

在service文件夹下新建一个request文件，然后

### 方式一

```TS
// 方式一：手动切换不同的环境（不推荐）
const BASE_URL = 'http://coderwhy.org/dev'
const BASE_NAME = 'coderwhy' //其他文件下的其他值

const BASE_URL = 'http://coderwhy.org/prod'
const BASE_NAME = 'kobe'

const BASE_URL = 'http://coderwhy.org/test'
const BASE_NAME = 'james'
```

### 方式二

```ts
let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NOFE_ENV === 'development') {
  BASE_URL = 'http://123.207.32.32:8000/'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://coderwhy.org/prod'
} else {
  BASE_URL = 'http://coderwhy.org/test'
}
export { BASE_URL, TIME_OUT }
```

+ es6中不允许let name=' ',export name
+ export let name = ' '，只允许定义变量直接将其导出
+ 若要是先定义变量，然后再导出的化，则要采用{ }的形式



### 方式三

+ 在根目录下分别创建.env.development .env.production .env.test文件，其中的变量只会在指定的模式中被载入

```
VUE_APP_BASE_URL=https://coderwhy.org/dev
VUE_APP_BASE_NAME=coderwhy
```

+ 在其他文件中进行使用

```ts
console.log(process.env.VUE_APP_BASE_URL)
console.log(process.env.VUE_APP_BASE_NAME)
```



\# 在任何文件任何环境下都会注入变量

VUE_APP_随便写



+ 请注意，只有 `NODE_ENV`，`BASE_URL` 和以 `VUE_APP_` 开头的变量将通过 `webpack.DefinePlugin` 静态地嵌入到*客户端侧*的代码中。这是为了避免意外公开机器上可能具有相同名称的私钥

```
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略
```





https://cli.vuejs.org/zh/guide/mode-and-env.html#%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F

> 为一个特定模式准备的环境文件 (例如 `.env.production`) 将会比一般的环境文件 (例如 `.env`) 拥有更高的优先级。
>
> 此外，Vue CLI 启动时已经存在的环境变量拥有最高优先级，并不会被 `.env` 文件覆写。
>
> `.env` 环境文件是通过运行 `vue-cli-service` 命令载入的，因此环境文件发生变化，你需要重启服务。



+ 修改浏览器加载资源的一个路径（运行打包后的index.html文件）
+ 查看生产环境下的VUE_APP_BASE_URL值，在vue.config.js文件中配置，部署到服务器时要删除

![image-20230822200207456](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230822200207456.png)



# 二、封装axios

## 1 封装的意义

+ 每个模块直接导入axios，与axios耦合度太强，那么axios不再维护时，维护成本高
+ 对于网络请求拥有共同的特性时，例如每个请求都需要携带token，存放到header中再发送请求



## 2 简单逻辑步骤

第一步：创建request文件夹，在内部创建index.ts文件

+ request的index.ts文件夹
+ 采用类封装，比函数封装的封装性更强，导出之后只需调用类的不同方法即可
+ 若采用函数封装，那么有多少个方法就需要导出多少次

```ts
class TJRequest {
	request() {},
    get() {}
}
export default TJRequest
```



第二步：在service文件夹下的index.ts文件夹下将封装的类创建实例并导出

+ service下的index.ts文件夹
+ 将new出来的tjRequest对象导出

```ts
// service统一出口
import TJRequest from './request'

const tjRequest = new TJRequest()
export default tjRequest
```



第三步：在要使用的文件中引入，直接调用request中封装的函数方法

+ 拿到的就是TJRequest类创建的实例

```ts
import tjRequest from './service'
tjRequest.request()
```





![image-20230822092518759](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230822092518759.png)









## 3 tjRequest的详细封装

### 需求一：

#### 根据不同的baseURL等配置，创建不同的request请求实例

+ 如果不同的请求拥有不同的baseURL，可以通过类的构造函数，创建不同的config来进行区分

```ts
class TJRequest {
  instance: any
  constructor(config: any) {
    this.instance = axios.create(config)
 }
```

+ 每次传入不同的配置时，都会创建不同的instance

```ts
const tjRequest = new TJRequest({
	baseURL:'地址1'，
    timeouit:''
})
```



### 需求二：

#### 在TJRequest的类中封装一个request函数，并尝试使用

+ request文件夹下的index.ts文件

```ts
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

// 采用类封装，比函数封装的封装性更强，导出之后只需调用类的不同方法即可
// 若采用函数封装，那么有多少个方法就需要导出多少次
class TJRequest {
  instance: AxiosInstance
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
  }

  // 封装请求
  request(config: AxiosRequestConfig): void {
    this.instance.request(config).then((res) => {
      console.log('@@', res)
    })
  }
}
export default TJRequest
```



+ service文件夹下的index.ts文件
+ 创建tjRequest实例时传入的配置，采用变量形式，而不是写死

```ts
import TJRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

// 导入的一个axios，其实就是一个axios的实例对象
// 如果发送的两次请求的baseurl不一样，那么应该创建两个实例

const tjRequest = new TJRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

export const tjRequest2 = new TJRequest({
  baseURL: '地址'
})
export default tjRequest
```



+ main.ts中

```ts
import { createApp } from 'vue'
import { globalRegister } from './global'
import tjRequest from './service'


tjRequest.request({
  url: '/home/multidata',
  method: 'GET'
})
```



## 4 拦截器的封装

+ 目前发送请求是没有进行拦截的，假如我们有一些共有的逻辑，例如携带token，显示Loading，将这些需求代码写到拦截器中
+ 有些拦截的内容是一样的是，而有些是不同的

#### 思想

+ 在创建实例时传入了一些基本配置，例如baseURL，也希望传入hooks，而hooks中是一个个拦截器
+ 但此时是不能进行传入hooks，因为此时传入的config是一个AxiosRequestConfig类型，没有hooks属性
+ 所以不能直接使用AxiosRequestConfig类型的config，自己封装一个config类型

![image-20230912163441525](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230912163441525.png)



![image-20230823110442984](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230823110442984.png)





### 4.1 每个实例可以拥有不同的拦截器

+ 拦截器的本质是函数
+ 针对当前创建的实例对象，添加拦截器

+ request文件夹下的index.ts文件

```ts
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { TJRequestInterceptors, TJRequestConfig } from './type'

// 定义可以传入哪些hooks
// 别人将拦截器传进来，然后在将这个放到实例instance上面

// 采用类封装，比函数封装的封装性更强，导出之后只需调用类的不同方法即可
// 若采用函数封装，那么有多少个方法就需要导出多少次
class TJRequest {
  instance: AxiosInstance
  interceptors?: TJRequestInterceptors

  constructor(config: TJRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptorCatch,
      this.interceptors?.requestInterceptor
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
  }

  // 封装一个request函数
  request(config: AxiosRequestConfig): void {
    this.instance.request(config).then((res) => {
      console.log('@@', res)
    })
  }
}
export default TJRequest

```



+ request文件夹下的type.ts文件

```ts
import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface TJRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (err: any) => any
}

export interface TJRequestConfig extends AxiosRequestConfig {
  interceptors?: TJRequestInterceptors
}

```



+ service文件夹下的index.ts文件

```ts
import TJRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const tjRequest = new TJRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch(err) {
      return err
    }
  }
})

export default tjRequest

```

+ https://huaweicloud.csdn.net/64e85591c70554103b8ea15f.html



### 4.2 全局拦截器

+ 请求拦截器是先添加的后执行，响应拦截器是后添加的后执行

```ts
constructor(config: TJRequestConfig) {
    this.instance = axios.create(config)
    // 将传入的拦截器hooks保存到interceptors中
    this.interceptors = config.interceptors

    // 从config中取出的拦截器是对应的实例拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptor
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有实例都有的拦截器：请求成功拦截')
        return config
      },
      (err) => {
        console.log('所有实例都有的拦截器：请求失败拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (config) => {
        console.log('所有实例都有的拦截器：响应成功拦截')
        return config
      },
      (err) => {
        console.log('所有实例都有的拦截器：响应失败拦截')
        return err
      }
    )
  }
```



### 4.3 不同的请求的拦截器

```ts
  request(config: TJRequestConfig): void {
    if (config.interceptors?.requestInterceptor) {
      // 如果内部config传入的有一个requestInterceptor函数那么就会执行这个函数
      config = config.interceptors.requestInterceptor(config)
    }

    this.instance.request(config).then((res) => {
      if (config.interceptors?.responseInterceptor) {
        res = config.interceptors.responseInterceptor(res)
      }
      console.log(res)
    })
  }
```

+ main.ts文件中调用request请求

```ts
tjRequest.request({
  url: '/home/multidata',
  method: 'GET',
  interceptors: {
    requestInterceptor: (config) => {
      console.log('单独请求的拦截器')
      return config
    }
  }
})
```



+ 1、服务器请求失败

+ HttpErrorCode ->  responseCatch:err -> err.response.status返回的数据为
+ 2xx -> 成功
+ 4xx -> 失败
+ 5xx -> 失败

err.response.status === 404

+ 2、失败
+ 200 -> 请求成功
+ 数据{data: "",syccess: false, returnCode:-1001} 服务器









## 5 添加loading效果

![image-20230824100528284](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230824100528284.png)

+ 在全局拦截器中添加loading效果

![image-20230824101335303](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230824101335303.png)



![image-20230824101558981](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230824101558981.png)

### 自己控制是否需要Loading

+ 然而有些请求是不需要loading的
+ 所以我们希望在每个请求中传入一个showLoading的参数

![image-20230824110030890](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230824110030890.png)

![image-20230824105952308](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230824105952308.png)

+ 在全局拦截其中添加判断

```ts
	  if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
```



+ request函数中，判断传入的值是否为false,然后将参数的的值赋值给全局变量showLoading

![image-20230824105823888](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230824105823888.png)

+ 将是否展示loading的默认值更改回来

![image-20230824110103686](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230824110103686.png)







postman的使用

![image-20230907155023380](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230907155023380.png)



+ 设置token的代码

```
const res = pm.response.json();
pm.globals.set("token", res.data.token);
```





# 三、登录逻辑

## 1 跨域访问

+ vue.config.js文件

```js
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://codercba.com:5000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
```



+ config.ts

```js
let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NOFE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = '/api'
} else {
  BASE_URL = '/api'
}
export { BASE_URL, TIME_OUT }

```







### 在调用请求的地方拿到数据



+ 对request做了一个修改
+ 目的是为了返回一个promise，在promise逻辑里面用this.instance.request去发送真实的请求，获得请求之后通过resolve将其返回出去，错误通过reject返回出去

+ 在封装的request函数中返回一个promise函数，可以使得在调用请求的地方拿到数据
+ 返回的res是什么类型应该由请求者决定，所以给request和promise的返回值添加T泛型

![image-20230824164055864](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230824164055864.png)





+ main.ts中调用request函数发送请求

```ts
interface DataType {
  data: any
  returnCode: string
  success: boolean
}

tjRequest
  .request<DataType>({
    url: '/home/multidata',
    method: 'GET',
    interceptors: {
      requestInterceptor: (config) => {
        console.log('单独请求的拦截器')
        return config
      }
    },
    showLoading: false
  })
  .then((res) => {
    console.log(res.data)
    console.log(res.returnCode)
    console.log(res.success)
  })
```



+ 现在并不能在请求的地方获得数据（33）

![image-20230824151841769](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230824151841769.png)



![image-20230919104550021](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230919104550021.png)

![image-20230919104720891](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230919104720891.png)

### 类型冲突

+ 想办法将AxiosResponse的类型转换为T类型,或者将这个拦截器中的参数设置为any类型

![image-20230828091650503](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230828091650503.png)

![image-20230919163458694](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230919163458694.png)



### 解决方法

+ 希望从外面传入类型，通过TJRequestInterceptors接口，默认没有传递类型时是为AxiosResponse

![image-20230919165115174](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230919165115174.png)



![image-20230919171239693](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230919171239693.png)

accountLoginAction().then((res) => {})

accountLoginAction()函数返回的是一个promise

将这里的函数写成异步函数，就可以用同步的结构去写异步的代码



+ typescript编译TypeScript和babel的区别是在于会用polyfill打上补丁



![image-20230803090555267](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230803090555267.png)



### 给服务器返回的数据添加上类型

![image-20230907164313082](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230907164313082.png)



+ 调用post函数时要求传入一个泛型

![image-20230907164525375](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20230907164525375.png)



+ 封装几个函数调用request函数

```ts
  request<T>(config: TJRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      .....
    })
  }

  get<T>(config: TJRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: TJRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: TJRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  path<T>(config: TJRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
```





![image-20230919162220306](C:\Users\tjj\AppData\Roaming\Typora\typora-user-images\image-20230919162220306.png)



+ .browserslistrc文件

```ts
> 1% #市场份额大于百分之1的浏览器是适配
last 2 versions #适配主流浏览器的两个版本
not dead #还处于维护阶段的浏览器
not ie 11
```

