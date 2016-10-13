

参考：
https://github.com/chemdemo/chemdemo.github.io/issues/10#issuecomment-136385570
http://webpack.github.io/docs/multiple-entry-points.html
https://github.com/webpack/webpack/tree/master/examples/multiple-commons-chunks


# CommonsChunkPlugin 插件的使用

> webpack可以通过CommonsChunkPlugin插件来对公共依赖模块进行提取，这种适合提取共享的基础库，如jquery、underscore等。



## demo 说明

直接运行

```
webpack --config webpack.src5.js
```

会在目录下生产 `assets` 文件夹 , 包含 page1.js , page2.js , page3.js , commons.bundle.js


---


### 注意事项

**方式一：**

```
var webpack = require('webpack');
.
.
.
module.exports = {
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
            name: 'commons', // 这公共代码的chunk名为'commons'
            filename: '[name].bundle.js', // 生成后的文件名，虽说用了[name]，但实际上就是'commons.bundle.js'了
            minChunks: 4, // 设定要有2个chunk（即4个页面）加载的js模块才会被纳入公共代码。这数目自己考虑吧，我认为3-5比较合适。
		})
	]
}
```


**方式二：**

```
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
.
.
.
module.exports = {
	plugins: [
		new CommonsChunkPlugin({
		})
	]
}
```
