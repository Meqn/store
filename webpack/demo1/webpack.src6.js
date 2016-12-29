/**
 * 源自：http://webpack.github.io/docs/stylesheets.html#separate-css-bundle
 */

// webpack.config.js
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    // The standard entry point and output config
    entry: {
		page1: "./src6/js/page1.js",
		page2: "./src6/js/page2.js"
    },
    output: {
        filename: "[name].js?[hash]",
        chunkFilename: "[id].js",
        // 输出到 assets 目录
        path: __dirname + '/src6/assets/'
    },
    module: {
        loaders: [
            // Extract css files
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap")
            },
            // Optionally extract sass files
            // or any other compile-to-css language
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader?sourceMap")
                
                // { test: /\.scss$/i, loader: extractCSS.extract(['css','sass']) }
            }
            // You could also use other loaders the same way. I. e. the autoprefixer-loader
        ]
    },
    devtool: "source-map",
    // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
    plugins: [
        new ExtractTextPlugin("style/[name].css?[hash]", {
        	disable: false,
			allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
        	name: "common",
        	filename: "[name].bundle.js"
        })
    ]
}