集中式版本控制（Centralized Version Control System，简称CVCS）

+ 它们的主要特点式单一的**集中管理的服务器，保存所有文件的修订版本**
+ 协同开发人员通过客户端**连接到这台服务器，取出最新的文件或者提交更新**



核心问题：**中央服务器不能出故障**

+ 如果宕机一小时，那么在这一小时之内谁也无法提交更新
+ 如果中心数据库所在的磁盘发生损坏，又没有做恰当备份，那么会丢失所有数据





分布式版本控制

git是属于分布式版本控制系统（Distributed Version Control System，简称DVCS）

+ 客户端并不只是提取最新版本的文件快照，而是**把代码仓库完整的镜像下来，包括完整的历史纪录**
+ 任何一处协同工作用的**服务器发生故障**，事后都**可以用任何一个镜像出来的本地仓库恢复**
+ 因为每一次的克隆操作，都是**对代码仓库的完整备份**



集中式就是将我们的仓库都放在服务器上面，而分布式则是每台电脑上都有一个仓库，可以在本地提交，将本地的仓库同步到远程服务器上



Bash – CMD – GUI 区别

Bash，Unix shell的一种，Linux与Mac OS X都将它作为默认shell

+ Git Bash就是一个shell，是**Windows下的命令工具**，可以**执行Linux命令**
+ Git Bash是基于CMD的，在CMD的基础上增添一些新的命令与功能

Git CMD 

+ 命令行提示符（CMD）是 Windows 操作系统上的命令行解释程序； 
+ 当你在 Windows 上安装 git 并且习惯使用命令行时，可以使用 cmd 来运行 git 命令；

 Git GUI 

+ 基本上针对那些不喜欢黑屏（即命令行）编码的人； 
+ 它提供了一个图形用户界面来运行 git 命令； 



Git的配置分类





### 获取Git仓库 – git init/git clone

+ 通过git来管理源代码，那么本地也需要有一个Git仓库

通常有两种获取Git仓库的方式

+ 初始化一个Git仓库，并且将当前的项目文件添加到Git仓库中（目前很多的脚手架在创建项目时都会默认创建一个Git仓库）
+ 从其他服务器克隆（clone）一个已经存在的Git仓库

方式一：初始化git仓库

+ 该命令将创建一个名为.git的子目录，这个子目录含有初始化的GIt仓库中所有的必须文件，这些文件是Git仓库的核心
+ 这时仅仅做了一个初始化的操作，仓库中的文件还没有被跟踪

```
git init
```

方式二：从远程仓库克隆

```
git clone ....
```





### 文件的状态划分

现在我们的电脑上已经有一个Git仓库： 

+ 在实际开发中，你需要将某些文件交由这个Git仓库来管理； 
+ 并且我们之后会修改文件的内容，当达成某一个目标时，想要记录下来这次操作，就会将它提交到仓库中； 

那么我们需要对文件来划分不同的状态，以确定这个文件是否已经归于Git仓库的管理： 

+ **未跟踪**：默认情况下，Git仓库下的文件也没有添加到Git仓库管理中，我们需要通过add命令来操作； 
+ **已跟踪**：添加到Git仓库管理的文件处于已跟踪状态，Git可以对其进行各种跟踪管理；(通过以下命令可将未跟踪的文件变为已跟踪)

```
git add .
```



已跟踪的文件又可以进行细分状态划分：

+ **staged**：缓存区中的文件状态
+ **unmodified**：commit命令，可以将staged中文件提交到Git仓库
+ **Modified**：修改了某个文件后，会处于Modified状态

![image-20231114170957070](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231114170957070.png)





### 检测文件的状态 - git status



![image-20231115085801434](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231115085801434.png)

Untracked files：未跟踪的文件 

+ 未跟踪的文件意味着 Git 在之前的提交中没有这些文件； 
+ Git 不会自动将之纳入跟踪范围，除非你明明白白地告诉它“我需要跟踪该文件”；

查看更加简洁的状态信息

```
git status -s
git status --short
```





### 文件添加到暂存区 – git add

跟踪新文件的命令

```
git add aaa.js
```

+ 使用命令git add开始跟踪一个文件

跟踪修改的文件命令

+ 如果已经跟踪了某一个文件，这hi和修改了文件也需要重新添加到暂存区中

通过一下命令将所有文件添加到暂存区中：

git add .



### git忽略文件

一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在 未跟踪文件列表。 

+ 通常都是些**自动生成的文件**，比如日志文件，或者编译过程中创建 的临时文件等； 
+ 我们可以创建一个名为 **.gitignore 的文件**，列出要忽略的文件的模 式；\

一下则是创建vue项目自动创建的忽略文件

+ 包括一些不需要提交的文件、文件夹； 
+ 包括本地环境变量文件； 
+ 包括一些日志文件； 
+ 包括一些编辑器自动生成的文件；

![image-20231115090256738](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231115090256738.png)





### 文件更新提交 – git commit

暂缓区已经准备就绪，可以进行提交了

+ 每次准备提交前，先用 git status 看下，你所需要的文件是不是都已暂存起来了； 
+  再运行提交命令 git commit； 
+  可以在 commit 命令后添加 -m 选项，将提交信息与命令放在同一行;



将文件存放到暂缓区和commit的操作结合使用：

```
git commit -a -m “修改了bbb文件”
```



### Git的校验和

Git 中所有的数据在存储前都计算校验和，然后以**校验和** 来引用。 

+ Git 用以计算校验和的机制叫做 SHA-1 散列（hash，哈希）； 
+ 这是一个由 40 个十六进制字符（0-9 和 a-f）组成的字符串，基于 Git 中文件的内容或目录结构计算出来；

校验和也可以认为是commit id，用来唯一标识此次提交

想通过这次提交来查看修改过哪些文件，校验和就是一个索引



### 查看提交的历史 – git log

在提交了若干更新，又或者克隆了某个项目之后，有时候我们想要查看一下所有的历史提交记录。 

这个时候我们可以使用git log命令：

+ 不传入任何参数的默认情况下，git log 会**按时间先后顺序列出所有的提交**，最近的更新排在最上面； 

+ 这个命令会列出每个提交的 **SHA-1 校验和**、**作者的名字**和**电子邮件地址**、**提交时间**以及**提交说明**；

![image-20231115102522769](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231115102522769.png)

+ 简化显示的历史记录，展示在同一行

```
git log --pretty=oneline
```

![image-20231115102647281](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231115102647281.png)

+ 展示分支合并的过程

```
git log --pretty=oneline --graph
```





### 版本回退 – git reset

如果想要进行版本回退，我们需要先知道目前处于哪一个版本：**Git通过HEAD指针记录当前版本**。 

+ **HEAD 是当前分支引用的指针**，它总是指向该分支上的最后一次提交； 
+ 理解 HEAD 的最简方式，就是将它看做 **该分支上的最后一次提交** 的快照； 

![image-20231115101701075](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231115101701075.png)

我们可以通过HEAD来改变Git目前的版本指向： 

+ 一个版本就是**HEAD^**，上上一个版本就是**HEAD^^**； 
+ 如果是上1000个版本，我们可以使用HEAD~1000； 
+ 我们可以可以指定某一个commit id；

```
git reset --hard HEAD^
git reset --hard HEAD~1000
git rest --hard 2d44982
```



![image-20231115103229581](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231115103229581.png)

+ 这个命令可以看到所有操作，例如退回哪个版本（可以通过这个返回到退回之前的版本），而git log则不行

```
git reflog
```



![image-20231115103253432](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231115103253432.png)



## 什么是远程仓库

什么是**远程仓库（Remote Repository）**呢？

+ 目前我们的代码是保存在一个本地仓库中，也就意味着我们只是在进行本地操作； 
+ 在真实开发中，我们通常是多人开发的，所以我们会将管理的代码共享到远程仓库中； 

那么如何创建一个远程仓库呢？ 

+ 远程仓库通常是**搭建在某一个服务器上**的（当然本地也可以，但是本地很难共享）； 
+ 所以我们需要在**Git服务器上搭建一个远程仓库**； 

目前我们有如下方式可以使用Git服务器： 

+ 使用第三方的Git服务器：比如**GitHub、Gitee、Gitlab**（在自己的服务器上安装gitlab，就可以使用Gitlab的功能）等等； 
+ **在自己服务器搭建一个Git服务**；

![image-20231115104327950](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231115104327950.png)

一台服务器（云服务器），通过一些软件搭建git服务器，然后在git服务器上搭建远程仓库

## 远程仓库的验证

常见的远程仓库有哪些呢？目前比较流行使用的是三种： 

+ GitHub：https://github.com/ 
+ Gitee：https://gitee.com/ 
+ 自己搭建Gitlab：http://152.136.185.210:7888/ 

对于私有的仓库我们想要进行操作，远程仓库会对我们的身份进行验证： 

+ 如果没有验证，任何人都可以随意操作仓库是一件非常危险的事情； 

目前Git服务器验证手段主要有两种： 

+ 方式一：基于**HTTP的凭证存储（Credential Storage）**； 
+ 方式二：基于**SSH的密钥**； 

下面我们来具体讨论一下这两种方式的验证规则和过程；



### 远程仓库的验证 – 凭证

 因为本身HTTP协议是无状态的连接，所以每一个连接都需要用户名和密码： 

+ 如果每次都这样操作，那么会非常麻烦； 
+ 幸运的是，Git 拥有一个凭证系统来处理这个事情； 

下面有一些 Git Crediential 的选项： 

+ 选项一：默认所有都不缓存。 每一次连接都会询问你的用户名和密码； 
+ 选项二：“cache” 模式会将凭证存放在内存中一段时间。 密码永远不会被存储在磁盘中，并且在15分钟后从内存中清除； 
+ 选项三：“store” 模式会将凭证用明文的形式存放在磁盘中，并且永不过期； 
+ 选项四：如果你使用的是 Mac，Git 还有一种 “osxkeychain” 模式，它会将凭证缓存到你系统用户的钥匙串中（加密的）； 
+ 选项五：如果你使用的是 Windows，你可以安装一个叫做 “Git Credential Manager for Windows” 的辅助工具； ✓ 可以在 https://github.com/Microsoft/Git-Credential-Manager-for-Windows 下载。





### 远程仓库的验证 – SSH密钥

**Secure Shell（安全外壳协议，简称SSH）**是一种加密的网络传输协议，可在**不安全的网络中为网络服务提供安全的传输环境**。 

SSH以**非对称加密**实现身份验证。 

+ 例如其中一种方法是使用**自动生成的公钥-私钥对**来简单地加密网络连接，随后使用密码认证进行登录； 
+ 另一种方法是**人工生成一对公钥和私钥**，通过生成的密钥进行认证，这样就可以在不输入密码的情况下登录； 
+ **公钥**需要放在待访问的电脑之中，而对应的**私钥**需要由用户自行保管； 

如果我们以SSH的方式访问Git仓库，那么就需要生产对应的公钥和私钥：

```
ssh-keygen -t ed25519 -C “your email"
ssh-keygen -t rsa -b 2048 -C “your email"
```

（ed25519和rsa是密钥的两种不同形式）

+ .pub文件存放的就是公钥

![image-20231115155057690](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231115155057690.png)

> 本质就是输入命令生成一对公钥和私钥，将公钥存放在远程服务器上，私钥在本地电脑上，下次准备通过ssh连接这台服务器时，会自动读取本地的私钥，然后携带私钥一起给服务器，然后将服务器的公钥与私钥进行匹配





### 管理远程服务器

查看远程地址：比如我们之前从GitHub上clone下来的代码，它就是有自己的远程仓库的： 

```
git remote #查看本地有什么远程仓库
git reomte -v #查看本地远程仓库的详细信（verbose冗长的）
```



添加远程地址：我们也可以继续添加远程服务器（让本地的仓库和远程服务器仓库建立连接）： 

```
git remote add <shortname> <url>
```

![image-20231115163649707](https://raw.githubusercontent.com/krystalkrystaljj/myimg/main/image-20231115163649707.png)

重命名远程地址： 

移除远程地址： 管理远程服务器 git remote git remote –v -v是—verbose的缩写(冗长的) git remote add   git remote add gitlab http://152.136.185.210:7888/coderwhy/gitremotedemo.git

git fetch 仅仅将东西拿下来，存放在git仓库上，并不能在文件上看见，要再进行git merge命令才能看见







就会加快离开家解开了‘；记录空间链接离开了 ；’



就看见了了
