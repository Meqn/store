/*
参考：
https://github.com/chemdemo/chemdemo.github.io/issues/10#issuecomment-136385570
http://webpack.github.io/docs/multiple-entry-points.html
https://github.com/webpack/webpack/tree/master/examples/multiple-commons-chunks
*/

var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
	entry: {
		page1: "./src5/js/page1.js",
		page2: "./src5/js/page2.js",
		page3: "./src5/js/page3.js",
		page4: "./src5/js/page4.js"
	},
	output: {
		path: __dirname + '/src5/assets',
		filename: "[name].js"
	},
	plugins: [
		// 写法 1
		new CommonsChunkPlugin({
            name: 'commons', // 这公共代码的chunk名为'commons'
            filename: '[name].bundle.js', // 生成后的文件名，虽说用了[name]，但实际上就是'commons.bundle.js'了
            minChunks: 3, // 设定要有2个chunk（即2个页面）加载的js模块才会被纳入公共代码。这数目自己考虑吧，我认为3-5比较合适。
		}),
		// 提取 page1、page2、及公共 commons 中至少两个共同依赖的模块
		new CommonsChunkPlugin({
			name: "common-12",
            chunks: ["page1", "page2", "commons"],
            minChunks: 2
		}),
		// 写法 2
		// 提取 page2、page3、page4 中至少两个共同依赖的模块
		new CommonsChunkPlugin('common-234/common.js', ['page2', 'page3', 'page4'], 2),
		// 提取 page2、page4 中共同依赖的模块
		new CommonsChunkPlugin('common-24/common.js', ['page2', 'page4'])
	]
}




/*var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: {
		bundle: "./src5/entry.js"
	},
	output: {
		filename: "[name].js?[hash]-[chunkhash]",
		chunkFilename: "[name].js?[hash]-[chunkhash]",
		path: __dirname + "/src5/assets",
		publicPath: "/src5/assets/"
	},
	module: {
		loaders: [
			{ test: /\.scss$/, loader: ExtractTextPlugin.extract(
				"style-loader",
				"css-loader",
				"sass-loader?sourceMap",
				{
					// publicPath: "../"
					publicPath: ""
				}
			)},
			{ test: /\.png$/, loader: "file-loader" }
		]
	},
	devtool: "source-map",
	plugins: [
		new ExtractTextPlugin("css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]", {
			disable: false,
			allChunks: true
		}),
		new webpack.optimize.CommonsChunkPlugin("common", "./src5/js/page.js")
	]
};*/