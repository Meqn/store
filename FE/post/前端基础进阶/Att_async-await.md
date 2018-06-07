# async/await

在实际开发中总会遇到许多异步的问题，最常见的场景便是接口请求之后一定要等一段时间才能得到结果，如果遇到多个接口前后依赖，那么问题就变得复杂。大家都一直在尝试使用更好的方案来解决这些问题。最开始只能利用回调函数，后来开始有人使用Promise的思维来搞定。到ES6中开始支持原生的Promise，引入Generator函数。

直到ES7，有了`async/await`。

这是一个用同步的思维来解决异步问题的方案。

我想很多人可能还不太分得清同步与异步的区别。如果你已经彻底了解了[事件循环](http://www.jianshu.com/p/12b9f73c5a4f)，那么想必对异步的概念应该非常了解。当我们发出了请求，并不会等待响应结果，而是会继续执行后面的代码，响应结果的处理在之后的事件循环中解决。那么同步的意思，就是等结果出来之后，代码才会继续往下执行。

我们可以用一个两人问答的场景来比喻异步与同步。A向B问了一个问题之后，不等待B的回答，接着问下一个问题，这是异步。A向B问了一个问题之后，然后就笑呵呵的等着B回答，B回答了之后他才会接着问下一个问题，这是同步。

那么我们先记住这个特点，`async/await`使用同步的思维，来解决异步的问题。

在继续分析它的语法与使用之前，我们先介绍一下如何在我们的开发环境中支持该语法。
> 如果你已经知道如何配置，可跳过

### 一、如何在自己的开发环境中支持`async/await`语法
这里主要介绍两种方式。
#### 1. webpack中支持该语法
首先在当前项目中使用npm下载`babel-loader`。

```javascript
> npm install babel-loader --save-dev
```

然后在配置文件`webpack.confing.dev.js`中配置，在`module.exports.module.rules`中添加如下配置元素即可。

```javascript
  {
    test: /\.(js|jsx)$/,
    include: paths.appSrc,
    loader: require.resolve('babel-loader'),
    options: {
      cacheDirectory: true,
    },
  },
```

> 如果你使用最新版本的create-react-app或者vue-cli来构建你的代码，那么它们应该已经支持了该配置。


##### 2. gulp中支持该语法

首先安装gulp插件

```javascript
> npm install gulp-babel --save-dev
```

然后编写任务

```javascript
var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('babel', function() {
  return gulp.src('src/app.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});
```


#### 二、如何使用

async函数是Generator的一个语法糖。如果你不知道Generator是什么函数也没有关系，我们只需要知道async函数实际上返回的是一个Promise对象即可。

```javascript
async function fn() {
    return 30;
}

// 或者
const fn = async () => {
    return 30;
}
```
在声明函数时，前面加上关键字`async`，这就是`async`的用法。当我们用`console.log`打印出上面声明的函数fn，我们可以看到如下结果：

```javascript
console.log(fn());

// result
Promise = {
    __proto__: Promise,
    [[PromiseStatus]]: "resolved",
    [[PromiseValue]]: 30
}
```

很显然，fn的运行结果其实就是一个Promise对象。因此我们也可以使用then来处理后续逻辑。

```javascript
fn().then(res => {
    console.log(res);  // 30
})
```
await的含义为等待。意思就是代码需要等待await后面的函数运行完并且有了返回结果之后，才继续执行下面的代码。这正是同步的效果。

但是我们需要注意的是，await关键字只能在async函数中使用。并且await后面的函数运行后必须返回一个Promise对象才能实现同步的效果。

当我们使用一个变量去接收await的返回值时，该返回值为Promise中resolve出来的值（也就是PromiseValue）。

```javascript
// 定义一个返回Promise对象的函数
function fn() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(30);
        }, 1000);
    })
}

// 然后利用async/await来完成代码
const foo = async () => {
    const t = await fn();
    console.log(t);
    console.log('next code');
}

foo();

// result:
// 30
// next code
```

运行这个例子我们可以看出，当在async函数中，运行遇到await时，就会等待await后面的函数运行完毕，而不会直接执行`next code`。

如果我们直接使用then方法的话，想要达到同样的结果，就不得不把后续的逻辑写在then方法中。

```javascript
const foo = () => {
    return fn().then(t => {
        console.log(t);
        console.log('next code');    
    })
}

foo();
```

很显然如果使用async/await的话，代码结构会更加简洁，逻辑也更加清晰。

###### 异常处理

在Promise中，我们知道是通过catch的方式来捕获异常。而当我们使用async时，则通过`try/catch`来捕获异常。

```javascript
function fn() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('some error.');
        }, 1000);
    })
}

const foo = async () => {
    try {
        await fn();
    } catch (e) {
        console.log(e);  // some error
    }
}

foo();
```

如果有多个await函数，那么只会返回第一个捕获到的异常。

```javascript
function fn1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('some error fn1.');
        }, 1000);
    })
}
function fn2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('some error fn2.');
        }, 1000);
    })
}

const foo = async () => {
    try {
        await fn1();
        await fn2();
    } catch (e) {
        console.log(e);  // some error fn1.
    }
}

foo();
```

###### 实践

在实践中我们遇到异步场景最多的就是接口请求，那么这里就以jquery中的`$.get`为例简单展示一下如何配合`async/await`来解决这个场景。

```javascript
// 先定义接口请求的方法，由于jquery封装的几个请求方法都是返回Promise实例，因此可以直接使用await函数实现同步
const getUserInfo = () => $.get('xxxx/api/xx');

const clickHandler = async () => {
    try {
        const resp = await getUserInfo();
        // resp为接口返回内容，接下来利用它来处理对应的逻辑
        console.log(resp);

        // do something
    } catch (e) {
        // 处理错误逻辑
    }
}
```

> 为了保证逻辑的完整性，在实践中`try/catch`必不可少。总之，不处理错误逻辑的程序员不是好程序员。

与Promise相比，个人认为`async/await`有一定的简洁性，但也并非就比Promise有绝对的优势，因此只能算是提供了另外一种同样很棒的方式，至于大家学习之后选择哪种方式来解决自己的问题，我认为这仅仅只是个人的喜好问题。
