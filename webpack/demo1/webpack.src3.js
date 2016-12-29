var webpack = require('webpack');

module.exports = {
    entry: {
        "page1": ["./src3/js/page1.js", "./src3/js/page1_2.js"],
        "page2/comm": ["./src3/js/page2.js", "./src3/js/page2_2.js", "./src3/js/page2_3.js"],
        "js/page3": "./src3/js/page3.js"
    },
    output: {
        path: __dirname + '/src3/assets/',
        filename: "[name]-bundle.js?[chunkhash]"
        // filename: "[name]-[chunkhash].js"
    },
    plugins: [
    	//注意这是一个数组..
        new webpack.BannerPlugin("这里是打包文件头部注释！\n随便写写吧")
    ]
}
