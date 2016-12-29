var webpack = require('webpack');

module.exports = {
    //页面入口文件配置
    entry: {
        vendor: ["jquery", "other-lib"],        // 载入第三方公共库, 在 plugins 中 new CommonsChunkPlugin()
        index: './src/main.js',
        page1: './src/page1.js',
        //支持数组形式，将加载数组中的所有模块，但以最后一个模块作为输出
        page2: ["./entry1", "./entry2"]
    },
    //入口文件输出配置
    output: {
        /*
        path: path.resolve(__dirname, "build"),
        publicPath: "/assets/",
        */
        path: __dirname + '/dist/',
        filename: '[name].bundle.js',
        chunkFilename: "[name].js?[hash]-[chunkhash]"
            //这里分别用hash和chunkhash，结果不一样, hash相同，chunkhash不同
            // filename:'[name]-[hash].js'
            // filename:'[name]-[chunkhash].js'
    },
    module: {
        //加载器配置
        loaders: [
            //.css 文件使用 style-loader 和 css-loader 来处理
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap' },
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
        ]
    },
    //插件项
    plugins: [
        //提公用js到common.js文件中
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons', // 这公共代码的chunk名为'commons'
            filename: '[name].bundle.js', // 生成后的文件名，虽说用了[name]，但实际上就是'commons.bundle.js'了
            minChunks: 4, // 设定要有4个chunk（即4个页面）加载的js模块才会被纳入公共代码。这数目自己考虑吧，我认为3-5比较合适。
        }),
        //将样式统一发布到style.css中
        new ExtractTextPlugin("[name]/style.css", {
            allChunks: true,
            disable: false
        }),
        //使用ProvidePlugin加载使用频率高的模块
        webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
        })
    ],
    //其它解决方案配置
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extensions: ['', '.js', '.json', '.scss'],
        //别名
        alias: {
            plugins: path.join(__dirname, 'src/plugins'),               // 别名可以是目录
            myDialog: path.join(__dirname, 'src/dialog/dialog.js')      // 别名也可以是文件
            // 使用方式：
            // var Dialog = require('plugins/dialog/dialog.js'); // 方式一
            // var Dialog = require('myDialog');
        }
    }
};
