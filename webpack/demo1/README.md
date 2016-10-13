# webpack


---

# webpack CLI

```
webpack #最基本的启动webpack命令
webpack -w #提供watch方法，实时进行打包更新 (webpack --watch)
webpack -p #对打包后的文件进行压缩
webpack -d #提供SourceMaps，方便调试
webpack --colors #输出结果带彩色，比如：会用红色显示耗时较长的步骤
webpack --progress --colors #输出带有 进度 和 颜色 
webpack --profile #输出性能数据，可以看到每一步的耗时
webpack --display-modules #默认情况下 node_modules 下的模块会被隐藏，加上这个参数可以显示这些被隐藏的模块
webpack --config xxx.js   #使用另一份配置文件（比如webpack.config2.js）来打包

```




# webpack demo

- src1 : 认识webpack，了解 webpack.config 配置文件
- src2 : 样式加载
- src3 : 多文件入口
- src4 : 文件加载
- src5 : 使用CommonsChunkPlugin插件对公共依赖模块进行提取
- src6 : 提取公共 js/css 模块







# 开发服务器 webpack-dev-server

安装webpack-dev-server， 这里还是全局安装比较好

```
npm install webpack-dev-server －g
```

进入任意目录，直接运行 webpack-dev-server，
打开浏览器，输入  http://localhost:8080/webpack-dev-server/，可以直接预览

**配置**

```
--content-base 				A directory or URL to serve HTML content from.
--port 						The port 			[default: 8080]
--host 						The hostname/ip address the server will bind to 		[default: "localhost"]
```

Demo:

```
webpack-dev-server --content-base ./dist/ --port 8088 --host a.com
```

打开浏览器输入 http://a.com:8088/ 即可。

