
module.exports = {
	entry: "./src/entry.js",
	output: {
		path: __dirname + '/src1/',
		filename: "bundle.js"
	},
	module: {
		loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
	}
}