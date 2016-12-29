# webpack 笔记

参考：
https://github.com/chemdemo/chemdemo.github.io/issues/10



# 前端开发环境搭建

### 主要目录结构

```
- webapp/               # webapp根目录
  - src/                # 开发目录
    + css/              # css资源目录
    + img/              # webapp图片资源目录
    - js/               # webapp js&jsx资源目录
      - components/     # 标准组件存放目录
          - foo/        # 组件foo
            + css/      # 组件foo的样式
            + js/       # 组件foo的逻辑
            + tmpl/     # 组件foo的模板
            index.js    # 组件foo的入口
          + bar/        # 组件bar
      + lib/            # 第三方纯js库
      ...               # 根据项目需要任意添加的代码目录
    + tmpl/             # webapp前端模板资源目录
    a.html              # webapp入口文件a
    b.html              # webapp入口文件b
  - assets/             # 编译输出目录，即发布目录
    + js/               # 编译输出的js目录
    + img/              # 编译输出的图片目录
    + css/              # 编译输出的css目录
    a.html              # 编译输出的入口a
    b.html              # 编译处理后的入口b
  + mock/               # 假数据目录
  app.js                # 本地server入口
  routes.js             # 本地路由配置
  webpack.config.js     # webpack配置文件
  gulpfile.js           # gulp任务配置
  package.json          # 项目配置
  README.md             # 项目说明
```

这是个经典的前端项目目录结构，项目目结构在一定程度上约定了开发规范。业务开发的同学只需关注src目录即可，开发时尽可能最小化模块粒度，这是异步加载的需要。assets是整个工程的产出，无需关注里边的内容是什么，关于怎么打包和解决资源依赖的，请继续学习。


# 关于 webpack

webpack的三个概念：模块（module）、入口文件（entry）、分块（chunk）。

其中，module指各种资源文件，如js、css、图片、svg、scss、less等等，一切资源皆被当做模块。

webpack编译输出的文件包括以下2种：

entry：入口，可以是一个或者多个资源合并而成，由html通过script标签引入

chunk：被entry所依赖的额外的代码块，同样可以包含一个或者多个文件

下面是一段entry和output项的配置示例：

```
entry: {
    a: './src/js/a.js'
},
output: {
    path: path.resolve(debug ? '__build' : './assets/'),
    filename: debug ? '[name].js' : 'js/[chunkhash:8].[name].min.js',
    chunkFilename: debug ? '[chunkhash:8].chunk.js' : 'js/[chunkhash:8].chunk.min.js',
    publicPath: debug ? '/__build/' : ''
}
```

其中entry项是入口文件路径映射表，output项是对输出文件路径和名称的配置，占位符如[id]、[chunkhash]、[name]等分别代表编译后的模块id、chunk的hashnum值、chunk名等，可以任意组合决定最终输出的资源格式。hashnum的做法，基本上弱化了版本号的概念，版本迭代的时候chunk是否更新只取决于chnuk的内容是否发生变化。
