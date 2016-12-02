
var pkg = require('./package.json');



// CSS
var less = require("gulp-less")                     // 编译 less
var sass = require("gulp-sass")                  // Sass 预处理
var override = require("gulp-rev-css-url")      // 修正 css 文件里面的图片路径
var minifycss = require("gulp-minify-css")      // 压缩CSS文件   已废除，使用 gulp-clean-css
var minifycss = require("gulp-clean-css") 
var autoprefixer = require("gulp-autoprefixer")     // 自动增加浏览器变量前缀
var nano = require('gulp-cssnano')					//css工具 压缩css  http://cssnano.co/optimisations/
var tap = require('gulp-tap');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');




// js
var coffee = require("gulp-coffee")                 //编译coffee
var uglify = require("gulp-uglify")                 // 压缩混淆js





// html
var template = require("gulp-template")             // 替换变量以及动态html用
var fileinclude = require("gulp-file-include")  	// include 引入文件
var includeHTML = require('gulp-content-includer');



// image
var imagemin = require("gulp-imagemin")             // 图片压缩
	pngquant = require('imagemin-pngquant'), 			//深度压缩png
	imageIsux = require('gulp-imageisux'), 					//图片压缩
	spritesmith = require('gulp.spritesmith'), 				//雪碧图



// file
var gulpFilter = require("gulp-filter")             // 过滤文件
var clean = require("gulp-clean")                   // 清除目录或文件
var concat = require("gulp-concat")                 // 合并文件
var rename = require("gulp-rename")                 // 重命名
var del = require("del")                            // 清除文件 




// 工具
var gutil = require("gulp-util")                    // 一个工具库
var plumber = require("gulp-plumber")               // 自动处理全部错误信息防止因为错误而导致 watch 不正常工作
var changed = require("gulp-changed")               // 只编译修改过的文件，加快速度
var notify = require("gulp-notify")                 // 加控制台文字描述用的
var gulpif = require("gulp-if")                     // if判断，用来区别生产环境还是开发环境的
var rev = require('gulp-rev'), 								//添加版本号(MD5后缀)
var revCollector = require('gulp-rev-collector'), 			//gulp-rev的插件，用于html模板更改引用路径
var revReplace = require("gulp-rev-replace")        // 替换引用的加了md5后缀的文件名，修改过，用来加cdn前缀
var addsrc = require("gulp-add-src")                // pipeline中途添加文件夹，这里没有用到
var runSequence = require("run-sequence")           // 控制task顺序
var vinylPaths = require("vinyl-paths")             // 操作pipe中文件路径的，加md5的时候用到了
var sourcemaps = require("gulp-sourcemaps")         // 处理JS时，生成SourceMap
var header = require('gulp-header');		// 头部加内容
var replace = require('gulp-replace'), 						//内容替换
var cache = require('gulp-cache')
var eslint = require('gulp-eslint')
var usemin = require('gulp-usemin')



// server
var webserver = require("gulp-webserver")           // 一个简单的server，用python的SimpleHttpServer会锁文件夹
var browserSync = require('browser-sync');			//设置同步服务器
var connetion = require('gulp-connect')
var nodemon = require("gulp-nodemon")               // 自动启动/重启你的node程序，开发node服务端程序必备







// 系统
var gulp = require("gulp")
var path = require('path');
var fs = require('fs');
var yargs = require('yargs').argv;		//获取传入参数

var tap = require('gulp-tap');
var notify = require('gulp-notify'), 						//输出信息
var runSequence = require('gulp-sequence'), 				//按顺序执行一系列任务
var lazypipe = require('lazypipe'); 						// http://www.gulpjs.com.cn/docs/recipes/sharing-streams-with-stream-factories/







========================================================================================================================================================================



gulp
gulp-util
gulp-rename
gulp-sourcemaps
gulp-uglify
gulp-concat
gulp-sass
gulp-if
gulp-autoprefixer
gulp-watch
gulp-less
gulp-eslint
gulp-rev
gulp-load-plugins
gulp-imagemin
gulp-filter
gulp-jshint
gulp-typescript
replace-ext
gulp-changed

gulp-clean-css
gulp-postcss
gulp-htmlmin
run-sequence
gulp-cssnano
gulp-template
gulp-cli
gulplog
gulp-zip
gulp-debug
gulp-useref
gulp-help
gulp-size
gulp-ng-annotate
gulp-cached
gulp-git
gulp-match
gulp-angular-templatecache
http-proxy-middleware
gulp-svgmin

gulp-header
gulp-iconfont
gulp-bump
gulp-decompress
gulp-jscs
gulp-coffee
gulp-tslint
gulp-connect
gulp-ignore
gulp-jade
gulp-babel


main-bower-files
gulp-csslint
gulp-jasmine
gulp-data
gulp-stylus
gulp-uncss
gulp-open
gulp-svgstore
gulp-ng-constant
gulp-rimraf
gulp-preprocess
gulp-ejs
gulp-spawn-mocha
lazypipe


gulp-react
gulp-exec
gulp-stylelint
gulp-html-replace
gulp-concat-css
laravel-elixir
gulp-ruby-sass
gulp-mocha
gulp-jsbeautifier
vinyl-bufferstream
gulp-mustache
gulp-jsonlint
gulp-tar
gulp-ng-config
gulp-svgicons2svgfont
gulp-svg2ttf
gulp-task-listing
gulp-footer
gulp-chmod
gulp-coffeelint

gulp-print
globby
gulp-vulcanize
gulp-order
gulp-cond
gulp-ttf2eot
gulp-ftp
gulp-awspublish
brunch
gulp-clone
gulp-requirejs-optimize
gulp-hb
gulp-ttf2woff
gulp-ttf2woff2
vinyl-paths
gulp-lesshint
gulp-markdown
gulp-todo
gulp-conventional-changelog
gulp-image

gulp-sitemap
gulp-css-base64
gulp-uglifycss



gulp-cache
gulp-nunjucks
gulp-rework
gulp-front-matter
gulp-file-include
gulp-inline-ng2-template
gulp-livescript
refresh-gulp
gulp-rollup
gulp-inline-source
gulp-ll
gulp-phpcs
gulp-mirror
gulp-slm
gulp-cjsx
gulp-csscomb
gulp-standard
gulp-serve
gulp-typedoc
gulp-typings


gulp-runtime
gulp-vinyl-zip
beeper
generator-webapp
gulp-cdnizer
gulp-rewrite-css
gulp-yaml
gulp-refresh
gulp-plumber
gulp-google-cdn
gulp-bytediff
gulp-folders
gulp-rm
gulp-flowtype
gulp-handlebars
gulp-webp
gulp-jslint
gulp-hash
gulp-task-loader
gulp-scss
gulp-remark
gulp-if-else
gulp-transform
gulp-sequence

gulp-sprites 					// https://github.com/progrape/gulp-spriters































