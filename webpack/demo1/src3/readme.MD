# 多文件入口

参考：
https://github.com/chemdemo/chemdemo.github.io/issues/10#issuecomment-136385570


# 关于 Demo

```js
{
	entry: {
		// 输出 page1.js
        "page1": ["./src3/js/page1.js", "./src3/js/page1_2.js"],
        // 输出 page2/comm.js
        "page2/comm": ["./src3/js/page2.js", "./src3/js/page2_2.js", "./src3/js/page2_3.js"],
        // 输出 js/page3.js
        "js/page3": "./src3/js/page3.js"
    },
    output: {
    	// 指定文件输出目录 /src3/assets/
        path: __dirname + '/src3/assets/',
        // 指定文件输出名称
        filename: "[name]-bundle.js"
    }
}
```



直接运行

```
webpack --config webpack.src3.js
```


## webpack插件

插件可以完成更多loader不能完成的功能。插件的使用一般是在webpack.config.js中的plugins 选项中指定。

Webpack本身内置了一些常用的插件，还可以通过npm安装第三方插件。

接下来，我们从一个最简单的，用来给输出的文件头部添加注释信息BannerPlugin的内置插件来实践插件的配置和运行。


修改webpack.config.js，添加 plugins配置项：

```javascript
//必须引入
var Webpack = require("webpack");

module:{
},
plugins: [
	//注意这是一个数组..
    new Webpack.BannerPlugin("这里是打包文件头部注释！")
]
```




