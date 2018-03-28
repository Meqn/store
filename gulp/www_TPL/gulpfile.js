const gulp = require('gulp')
const path = require('path')
const argv = require('yargs').options({
  p: {
    alias: 'port',
    type: 'number'
  },
  w: {
    alias: 'watch',
    type: 'boolean'
  },
  s: {
    alias: 'server',
    type: 'boolean'
  }
}).argv

const del = require('del')
const runSequence = require('run-sequence')
const gulpif = require('gulp-if')
const tap = require('gulp-tap')
const gData = require('gulp-data')
const jEditor = require('gulp-json-editor')
const lazypipe = require('lazypipe')
const connect = require('gulp-connect')
const proxy = require('http-proxy-middleware')
const open = require('open')
const chalk = require('chalk')
const log = require('fancy-log')

const rename = require('gulp-rename')
const concat = require('gulp-concat')
const replace = require('gulp-replace')
const sourcemaps = require('gulp-sourcemaps')
const rev = require('gulp-rev')
const revCollector = require('gulp-rev-collector')

const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const nano = require('cssnano')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const imagemin = require('gulp-imagemin')
const sprity = require('sprity')
const includer = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const htmltpl = require('gulp-html-tpl')
const artTemplate = require('art-template')


const isPROD = argv.prod    // 是否生产环境
const isHASH = argv.hash    // 是否开启 文件hash版本

/** 
 * 配置
*/
const CONFIG = require('./gulp.conf')
const SRC = CONFIG.src
const DIST = CONFIG.dist
const SRC_OPTION = { base: SRC.dir }
const DIST_OPTION = { base: DIST.dir }
const MANIFEST_PATH = `${DIST.dir}/manifest/`



/**
 * 转换文件 hash 方式
 * 将 comm-2c0d21e40c.css 转换为 comm.css?2c0d21e40c
 * revSuffix: '-[0-9a-f]{8,10}-?' , '\\?[0-9a-f]{8,10}'
*/
const manifestJSON = {}
function transformHash (json) {
  let newObj = {}
  for (const key in json) {
    if (json.hasOwnProperty(key)) {
      // let hash = json[key].split('/').pop().split('-')[1].split('.')[0]
      let hash = path.basename(json[key]).split('-')[1].split('.')[0]
      newObj[key] = key + '?' + hash
    }
  }
  return newObj
}


/**
 * 管道任务
*/

// 处理 manifest转换管道任务
const manifestTask = (name) => {
  return lazypipe().pipe(rev).pipe(rev.manifest, `${name}_manifest.json`).pipe(jEditor, function (file) {
    return transformHash(file)
  }).pipe(gulp.dest, MANIFEST_PATH)
}
// 路径替换任务
const pathTask = lazypipe().pipe(replace, CONFIG.path.root[1], CONFIG.path.root[0]).pipe(replace, CONFIG.path.asset[1], CONFIG.path.asset[0])


/**
 * 启动本地服务器
 * 功能：HTTP服务, 代理, 自动更新
 */
gulp.task('server', function () {
  var webServe = connect.server({
    name: 'web',
    host: '0.0.0.0',
    root: DIST.dir,
    port: CONFIG.port.dev,
    livereload: true,
    middleware: function (connect, opt) {
      return [
        proxy(['/api/v1/'], {
          target: 'http://api.test.com',
          changeOrigin: true
        }),
        proxy('/mock/v1', {
          target: 'http://192.168.1.100',
          changeOrigin: true
        })
      ]
    }
  }, function() {
    let webUrl = `${this.https ? 'https' : 'http'}://${this.host}:${this.port}/`
    setTimeout(() => {
      open(webUrl)
    }, 1000)

    log(chalk.yellow('😀 :::::::::::::::::::::::::::::::::::::::: 😀'))
    log(`Open in browser : ${chalk.blue(webUrl)}`)
    log(chalk.yellow('😀 :::::::::::::::::::::::::::::::::::::::: 😀'))
  })
})

/**
 * 复制不需要处理的资源文件
 */
gulp.task('build:assets', (done) => {
  return gulp.src([SRC.public])
    .pipe(gulp.dest(DIST.asset))
    .pipe(connect.reload())
})

/**
 * 处理 image 文件
 * 功能：压缩
 */
gulp.task('build:image', (done) => {
  gulp.src(SRC.image, SRC_OPTION)
    .pipe(gulpif(isPROD, imagemin()))
    .pipe(gulp.dest(DIST.asset))
    .pipe(connect.reload())
    .on('end', () => {
      done()
      log('🚀 . build image done ... ')
    })
})
gulp.task('build:image:hash', (done) => {
  gulp.src(DIST.image, DIST_OPTION)
    .pipe(manifestTask('image')())
    .on('end', done)
})

/**
 * 处理 style 文件
 * 功能：scss, 自动补全, 压缩, sourcemap
 */
gulp.task('build:style', (done) => {
  const plugins = [
    autoprefixer({ browsers: CONFIG.pkg.browserslist })
  ]
  if (isPROD) {
    plugins.push(nano({ preset: "default" }))
  }
  gulp.src(SRC.style, SRC_OPTION)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(pathTask())
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(DIST.asset))
    .pipe(connect.reload())
    .on('end', () => {
      done()
      log('🚀 . build style done ... ')
    })
})
gulp.task('build:style:hash', (done) => {
  gulp.src(DIST.style, DIST_OPTION)
    .pipe(manifestTask('style')())
    .on('end', done)
})

/**
 * 处理 script 文件
 * 功能：合并, 压缩, babel, sourcemap
 */
gulp.task('build:script', (done) => {
  let count = 0, sMap = SRC.scriptMap, sFiles = Object.keys(sMap)

  sFiles.map((file, key) => {
    let files = sMap[file].map(item => `${SRC.dir}/scripts/${item}`)
    gulp.src(files, SRC_OPTION)
      .pipe(sourcemaps.init())
      .pipe(concat(`scripts/${file}.js`))
      .pipe(pathTask())
      .pipe(babel({
        presets: ['env']
      }))
      .pipe(gulpif(isPROD, uglify()))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(DIST.asset))
      .pipe(connect.reload())
      .on('end', () => {
        count++
        if (count === sFiles.length) {
          done()
          log('🚀 . build script done ... ')
        }
      })
  })
})
gulp.task('build:script:hash', (done) => {
  gulp.src(DIST.script, DIST_OPTION)
    .pipe(manifestTask('script')())
    .on('end', done)
})

/**
 * 处理 html 文件
 * 功能：替换, 版本控制, 模版渲染
 */
gulp.task('build:html', () => {
  let htmlArr = [SRC.html]
  if (isHASH) {
    htmlArr.push(`${MANIFEST_PATH}/*.json`)
  }
  gulp.src(htmlArr, { base: '' })
    .pipe(htmltpl({
      tag: 'template',
      dataTag: 'data',
      engine (template, data) {
        return artTemplate.compile(template)(data)
      },
      data: {
        env: 'develop'
      }
    }))
    .pipe(pathTask())
    .pipe(gulpif(isHASH, revCollector({
      revSuffix: '\\?[0-9a-f]{8,10}'
    })))
    .pipe(gulp.dest(DIST.dir))
    .pipe(connect.reload())
})

/**
 * 删除已发布的文件
 */
gulp.task('clean', (done) => {
  return del([MANIFEST_PATH, DIST.dir]).then(paths => {
    log('clean files: \n', paths.join('\n'))
  })
})

/**
 * 发布站点
 */
gulp.task('build', ['clean'], (taskDone) => {
  runSequence('build:assets', ['build:image', 'build:style', 'build:script'], 'build:html', () => {
    taskDone()
    log(chalk.bgGreen('build success .... ✅ .'))
    if (isHASH) {
      runSequence('build:image:hash', 'build:style:hash', 'build:script:hash', 'build:html')
    }
  })
})

/**
 * 监控文件变化
 */
gulp.task('watch', () => {
  gulp.watch(SRC.public, ['build:assets'])
  gulp.watch(SRC.image, ['build:image'])
  gulp.watch(SRC.style, ['build:style'])
  gulp.watch(SRC.script, ['build:script'])
  gulp.watch(SRC.html, ['build:html'])
})

gulp.task('default', ['build'], () => {
  if (argv.w) {
    gulp.start('watch');
  }
  if (argv.s) {
    gulp.start('server')
  }
})
