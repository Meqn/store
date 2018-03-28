const SRC_DIR = 'src'
const DIST_DIR = 'dist'
const DIST_ASSET = 'dist/assets'

const pkg = require('./package.json')
const scriptMap = require('./src/scripts/script.map')

const port = {
  dev: 3010,
  mock: 3012
}

const src = {
  dir: SRC_DIR,
  public: 'public/**',
  html: `${SRC_DIR}/html/**/*.html`,
  image: `${SRC_DIR}/images/**`,
  style: `${SRC_DIR}/styles/*.scss`,
  script: `${SRC_DIR}/scripts/**`,
  scriptMap: scriptMap
}

const dist = {
  dir: DIST_DIR,
  asset: `${DIST_ASSET}/`,
  image: `${DIST_ASSET}/images/**`,
  style: `${DIST_ASSET}/styles/**`,
  script: `${DIST_ASSET}/scripts/**`
}

const path = {
  root: ['/', '/@/'],
  asset: ['/assets/', '/@@/']
}


module.exports = {
  pkg,
  port,
  src,
  dist,
  path
}