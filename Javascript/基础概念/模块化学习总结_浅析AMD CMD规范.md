# 模块化学习总结：浅析AMD CMD规范

浅析AMD CMD CommonJS规范--javascript模块化加载学习心得总结
http://www.jb51.net/article/81045.htm


# 为何而生

这三个规范都是为javascript模块化加载而生的，都是在用到或者预计要用到某些模块时候加载该模块，使得大量的系统巨大的庞杂的代码得以很好的组织和管理。模块化使得我们在使用和管理代码的时候不那么混乱，而且也方便了多人的合作。

# 那些规范


### CMD规范

[CommonJS](http://www.commonjs.org/) 是一个有志于构建 JavaScript 生态圈的组织。整个社区致力于提高 JavaScript 程序的可移植性和可交换性，无论是在服务端还是浏览器端。

Commonjs是一个更偏向于服务器端的规范。Node.js采用了这个规范。 根据[CommonJS规范](http://www.commonjs.org/)，一个单独的文件就是一个模块。加载模块使用require方法，该方法读 取一个文件并执行，最后返回文件内部的exports对象。

你可以用在下面这些场景  ，所以他更明显的偏向服务器端。当然你也可以把它用在浏览器里边（他们自己说可以）

- Server-side JavaScript applications
- Command line tools
- Desktop GUI-based applications
- Hybrid applications (Titanium, Adobe AIR)



### AMD规范

Commonjs解决了模块化的问题，并且可以用在浏览器中，但是Commonjs是同步加载模块，当要用到该模块了，现加载现用，这种同步机制到了浏览器里边就有问题了，加载速度啊啥的（览器同步加载模块会导致性能、可用性、调试和跨域访问等问题）。

鉴于浏览器的特殊情况，又出现了一个规范，这个规范呢可以实现异步加载依赖模块，并且会提前加载那就是AMD规范。AMD可以作为CommonJS模块一个中转的版本只要CommonJS没有被用来同步的require调用。使用同步require调用的CommonJS代码可以被转换为使用回调风格的[AMD模块加载器](https://github.com/amdjs/amdjs-api)  （它说的）。

下面是一个使用了简单CommonJS转换的模块定义（它是amd规范的一种用法）：

```javascript
define(function (require, exports, module) {
     var a = require('a'),
         b = require('b');
     exports.action = function () {};
});
```

所以说AMD和Commonjs是兼容的，只要稍稍调换一下调用方法就实现了同步加载（我很怀疑amd也是在commonjs基础上加了个壳，然后并没有找到其他的神马说明和支持的文字，找到了一定加到这）。

看一下AMD规范你会发现，AMD基本都是提前说明依赖模块，然后预加载这些模块，实际上这就要求你提前想好这些依赖，提前写好，不然写代码过程中要回到开头继续添加依赖。


### 关于 seaJS

不知道是不是针对这个问题，淘宝的玉伯大牛搞了个seajs出来，并声称这个规范是遵循CMD规范的，然后给出了这个规范的一个连接（打开会发现draft字样）。关于这个规范呢玉伯在知乎是这么说的

”AMD 是 RequireJS 在推广过程中对模块定义的规范化产出。

CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。

类似的还有 CommonJS Modules/2.0 规范，是 BravoJS 在推广过程中对模块定义的规范化产出。
还有不少⋯⋯

所以这个规范实际上是为了Seajs的推广然后搞出来的。那么看看SeaJS是怎么回事儿吧，基本就是知道这个规范了。

同样Seajs也是预加载依赖js跟AMD的规范在预加载这一点上是相同的，明显不同的地方是调用，和声明依赖的地方。AMD和CMD都是用difine和require，但是CMD标准倾向于在使用过程中提出依赖，就是不管代码写到哪突然发现需要依赖另一个模块，那就在当前代码用require引入就可以了，规范会帮你搞定预加载，你随便写就可以了。但是AMD标准让你必须提前在头部依赖参数部分写好（没有写好？ 倒回去写好咯）。这就是最明显的区别。


---


由于CommonJS是服务器端的规范，更另外两个标准实际不冲突。

AMD在国外用的更多，当然国内也是不少的，jQuery1,7版本开始使用，Dojo在1.6版本开始用，这已经能够证明它足够牛x了。
CMD当然也有很多人在用，但是基本都集中在国内，Seajs官网就展示了一大堆牛逼的公司在用（包括爱奇艺，腾讯微博，支付宝，淘宝等一大堆，去这看看http://seajs.org/docs/），估计小的不出名的也不计其数了，毕竟很多公司招聘都要求会seajs嘛。

所以三个规范目前都挺好（其实也主要是因为js么有自己的模块加载机制，es6出来之后不知道会怎样）。

当我们写一个文件需要兼容不同的加载规范的时候怎么办呢，看看下面的代码。

```javascript
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
        // AMD 
        define(['jquery', 'underscore'], factory);

      } else if (typeof exports === 'object') {
        // CMD, Node/CommonJS之类的 
        module.exports = factory(require('jquery'), require('underscore'));

      } else {
        // 浏览器全局变量(root 即 window) 
        root.returnExports = factory(root.jQuery, root._);
      }
    }(this, function($, _) {

    // 方法 
    function a() {}; // 私有方法，因为它没被返回 (见下面) 

    function b() {}; // 公共方法，因为被返回了 

    function c() {}; // 公共方法，因为被返回了 

    // 暴露公共方法 
    return {
      b: b,
      c: c
    }

}));
```

这个代码可以兼容各种加载规范了。



# AMD和CMD的区别

下面这几点是玉伯在知乎上说的。

1. 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）。CMD 推崇 as lazy as possible.
2. CMD 推崇依赖就近，AMD 推崇依赖前置。
3. AMD 的 API 默认是一个当多个用，CMD 的 API 严格区分，推崇职责单一。比如 AMD 里，require 分全局 require 和局部 require，都叫 require。CMD 里，没有全局 require，而是根据模块系统的完备性，提供 seajs.use 来实现模块系统的加载启动。CMD 里，每个 API 都简单纯粹。
4. 还有一些细节差异，具体看这个规范的定义就好，就不多说了。
5. AMD和CMD的一些相同之处：
 -都有difine和require，而且调用方式实际都可以添加依赖参数，也就是说都可以用提供依赖参数的方式来实现预加载依赖模块（但是不推荐因为  注意：带 id 和 deps 参数的 define 用法不属于 CMD 规范，而属于 Modules/Transport 规范。---来自：https://github.com/seajs/seajs/issues/242）。
AMD也可以在factory中使用require来现加载用到的模块，但是这个模块就不会预先加载，属于用到才加载的同步加载了。

```javascript
var a = require('a'); // 加载模块a
```













