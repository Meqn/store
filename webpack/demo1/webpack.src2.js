
module.exports = {
	entry: {
		"bundle": "./src2/entry.js"
	},
	output: {
		path: __dirname + '/src2/',
		filename: "[name].js"
	},
	module: {
		loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
        ]
	}
}