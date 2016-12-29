var webpack = require('webpack');

module.exports = {
    entry: {
        bundle: './src4/entry.js'
    },
    output: {
        path: __dirname + '/src4/',
        filename: "[name].js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
        ]
    },
    plugins: [
    	//注意这是一个数组..
        new webpack.BannerPlugin("这里是打包文件头部注释！\n随便写写吧")
    ]
}
