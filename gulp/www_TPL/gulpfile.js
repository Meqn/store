const gulp = require('gulp')
const path = require('path')
const connect = require('gulp-connect')
const proxy = require('http-proxy-middleware')
const argv = require('yargs').argv

const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const nano = require('cssnano')
const rename = require('gulp-rename')
const replace = require('gulp-replace')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const includeHTML = require('gulp-content-includer')

const scripts = require('./src/scripts/script.map')
const ROOT_PATH = '/'
const ASSETS_PATH = '/assets/'
const ASSETS_DIR = 'assets'
const DIST_DIR = 'dist'


gulp.task('server', function () {
  connect.server({
    name: 'www',
    host: '0.0.0.0',
    root: DIST_DIR,
    port: argv.p || 3000,
    livereload: true,
    middleware: function (connect, opt) {
      return [
        proxy('/api', {
          target: 'http://192.168.1.100',
          changeOrigin: true
        })
      ]
    }
  })
})

gulp.task('static', () => {
  gulp.src(['src/images/**', 'src/fonts/**'], {base: 'src/'})
    .pipe(gulp.dest(`${DIST_DIR}/${ASSETS_DIR}/`))
    .pipe(connect.reload())
})
gulp.task('html', () => {
  gulp.src(['src/html/**'], { base: '' })
    .pipe(includeHTML({
      includerReg: /<!\-\-include\s+"([^"]+)"\-\->/g
    }))
    .pipe(replace('/@/', ROOT_PATH))
    .pipe(replace('/@@/', ASSETS_PATH))
    .pipe(gulp.dest(`${DIST_DIR}/`))
    .pipe(connect.reload())
})
gulp.task('sass', () => {
  const plugins = [
    autoprefixer({
      browsers: ['last 5 versions', 'iOS >= 7', 'Android >= 4.1', 'not ie <= 8']
    }),
    nano()
  ]
  gulp.src('src/styles/*.scss', { base: 'src/' })
    .pipe(sass().on('error', sass.logError))
    // .pipe(replace(/(\/\*)([\s\S]*?)(\*\/)/g, ''))
    .pipe(replace('/@/', ROOT_PATH))
    .pipe(replace('/@@/', ASSETS_PATH))
    .pipe(postcss(plugins))
    .pipe(gulp.dest(`${DIST_DIR}/${ASSETS_DIR}/`))
    .pipe(connect.reload())
})

gulp.task('scripts', () => {
  for(let v in scripts) {
    var files = scripts[v].map(v => {
      return 'src/scripts/' + v
    })
    gulp.src(files, { base: 'src/' })
      .pipe(concat(`scripts/${v}.js`))
      .pipe(replace('/@/', ROOT_PATH))
      .pipe(replace('/@@/', ASSETS_PATH))
      .pipe(uglify())
      .pipe(gulp.dest(`${DIST_DIR}/${ASSETS_DIR}/`))
      .pipe(connect.reload())
  }
})

gulp.task('build', ['static', 'html', 'sass', 'scripts'], () => {
  console.log('✅ build complete ...')
})
gulp.task('watch', () => {
  gulp.watch(['./src/images/**'], ['static'])
  gulp.watch('./src/scripts/**', ['scripts'])
	gulp.watch('./src/html/**', ['html'])
  gulp.watch('./src/styles/**', ['sass'])
})

gulp.task('default', ['build'], () => {
  if (argv.w) {
    gulp.start('watch');
  }
  if (argv.s) {
    gulp.start('server')
  }
})
