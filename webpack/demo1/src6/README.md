
# 提取公共 js 、 css 的插件使用

> ExtractTextPlugin 提取公共 css , 需要 npm 安装 `extract-text-webpack-plugin`
> CommonsChunkPlugin 提取公共 js , 使用时实例化 new webpack.optimize.CommonsChunkPlugin() 即可。



直接运行

```
webpack --config webpack.src6.js
```

会在目录下生成 `assets` 文件夹 , 包含 page1.js , page2.js , common.bundle.js
	`assets` 目录下有 `style` 文件夹，包含 page1.css , page2.css , common.css

- src6/assets
	- page1.js
	- page2.js
	- common.bundle.js
	- style
		- page1.css
		- page2.css
		- common.css


界面输出结果：

```
$ webpack --config webpack.src6.js
Hash: 7c3c0e217e3a9ecb0972
Version: webpack 1.13.2
Time: 1186ms
                                    Asset       Size  Chunks             Chunk Names
        page1.js.map?7c3c0e217e3a9ecb0972  705 bytes       0  [emitted]  page1
            page1.js?7c3c0e217e3a9ecb0972  420 bytes       0  [emitted]  page1
                         common.bundle.js    4.17 kB       2  [emitted]  common
     style/page1.css?7c3c0e217e3a9ecb0972   82 bytes       0  [emitted]  page1
     style/page2.css?7c3c0e217e3a9ecb0972   82 bytes       1  [emitted]  page2
    style/common.css?7c3c0e217e3a9ecb0972  175 bytes       2  [emitted]  common
            page2.js?7c3c0e217e3a9ecb0972  420 bytes       1  [emitted]  page2
 style/page1.css.map?7c3c0e217e3a9ecb0972  286 bytes       0  [emitted]  page1
        page2.js.map?7c3c0e217e3a9ecb0972  705 bytes       1  [emitted]  page2
 style/page2.css.map?7c3c0e217e3a9ecb0972  286 bytes       1  [emitted]  page2
                     common.bundle.js.map    4.67 kB       2  [emitted]  common
style/common.css.map?7c3c0e217e3a9ecb0972  444 bytes       2  [emitted]  common
   [0] ./src6/js/page1.js 173 bytes {0} [built]
   [0] ./src6/js/page2.js 173 bytes {1} [built]
   [1] ./src6/js/util.js 143 bytes {2} [built]
    + 5 hidden modules
Child extract-text-webpack-plugin:
        + 2 hidden modules
Child extract-text-webpack-plugin:
        + 2 hidden modules
Child extract-text-webpack-plugin:
        + 2 hidden modules
Child extract-text-webpack-plugin:
        + 2 hidden modules
Child extract-text-webpack-plugin:
        + 2 hidden modules
```

---

