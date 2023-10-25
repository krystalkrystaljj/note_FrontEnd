





#### 嵌套路由

Nuxt 和 Vue一样，也是支持嵌套路由的，只不过在Nuxt中，**嵌套路由也是根据目录结构和文件的名称自动生成**。 

编写嵌套路由步骤： 

1. 创建一个一级路由，如：parent.vue 
2. 创建一个与一级路由同名同级的文件夹，如： parent 
3. 在parent文件夹下，创建一个嵌套的二级路由 
   + 如：parent/child.vue， 则为一个二级路由页面 
   + 如： parent/index.vue 则为**二级路由默认的页面** 
4. **需要在parent.vue中添加 NuxtPage 路由占位**

![image-20231025164914397](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231025164914397.png)





Nuxt 提供了一个可定制的 **路由中间件**，用来**监听路由的导航**，包括：**局部和全局监听**（支持再服务器和客户端执行） 

路由中间件分为三种： 

+ 匿名（或内联）路由中间件 
  + 在页面中使用 **definePageMeta 函数**定义，可监听局部路由。当注册多个中间件时，会按照注册顺序来执行。 
+ 命名路由中间件 
  + 在 **middleware 目录**下定义，并会自动加载中间件。命名规范 kebab-case） 
+ 全局路由中间件（优先级比前面的高，支持两端） 
  + 在**middleware 目录**中，**需带.global后缀**的文件，每次路由更改都会自动运行。



### 路由验证

Nuxt支持对每个页面路由进行验证，我们可以通过definePageMeta中的validate属性来对路由进行验证。 

+ validate属性接受一个回调函数，回调函数中以 route 作为参数 
+ 回调函数的返回值支持： 
  + 返回 bool 值来确定是否放行路由 ➢ true 放行路由 ➢ false 默认重定向到内置的 404 页面 
  + 返回对象 ➢ { statusCode:401 } // 返回自定义的 401 页面，验证失败 

路由验证失败，可以自定义错误页面： 

+ 在项目根目录（不是pages目录）新建 error.vue