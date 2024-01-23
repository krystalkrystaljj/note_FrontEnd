# Proxy-Reflect使用详解



## 1 监听对象的操作

 我们先来看一个需求：有一个对象，我们希望监听这个对象中的属性被设置或获取的过程 

+ 通过我们前面所学的知识，能不能做到这一点呢？ 

+ 其实是可以的，我们可以通过之前的属性描述符中的存储属性描述符来做到； 监听对象的操作 

左边这段代码就利用了前面讲过的 Object.defineProperty 的存储属性描述符来 对属性的操作进行监听。

```js
      const obj = {
        name: "why",
        age: 18,
        height: 1.88,
      };
      // 需求: 监听对象属性的所有操作
      // 监听属性的操作
      // 1.针对一个属性
      let _name = obj.name;
      Object.defineProperty(obj, "name", {
        set: function (newValue) {
          console.log("监听给name设置了新的值：", newValue);
          _name = newValue;
        },
        get: function () {
          console.log("监听:获取name的值");
          return _name;
        },
      });
      console.log(obj.name);
      obj.name = "kobe";
```



但是这样做有什么缺点呢？ 

+ 首先，Object.defineProperty设计的初衷，不是为了去监听截止一个对象中 所有的属性的。
  + 我们在定义某些属性的时候，初衷其实是定义普通的属性，但是后面我们强 行将它变成了数据属性描述符。 
+ 其次，如果我们想监听更加丰富的操作，比如新增属性、删除属性，那么 Object.defineProperty是无能为力的。

所以我们要知道，存储数据描述符设计的初衷并不是为了去监听一个完整的对象。

## 2 Proxy类基本使用

 在ES6中，新增了一个Proxy类，这个类从名字就可以看出来，是用于帮助我们创建一个代理的： 

+ 也就是说，如果我们希望**监听一个对象的相关操作**，那么我们可以**先创建一个代理对象（Proxy对象）**； 
+ 之后对**该对象的所有操作**，都通过**代理对象来完成**，代理对象**可以监听我们想要对原对象进行哪些操作**；

我们可以将上面的案例用Proxy来实现一次： 

+ 首先，我们需要**new Proxy对象**，并且**传入需要侦听的对象以及一个处理对象**，可以称之为**handler**； 
  + const p = new Proxy(target, handler) 
+ 其次，我**们之后的操作都是直接对Proxy的操作**，而**不是原有的对象**，因为我们需要在handler里面进行侦听；

## 3 Proxy常见捕获器



## 4 Reflext介绍和作用



## 5 Reflext的基本使用



## 6 Reflect的receiver