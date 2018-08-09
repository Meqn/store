const router = require('express').Router()
const fs = require('fs')
const path = require('path')
const http = require('http')
const request = require('request')
const cheerio = require('cheerio')
const mkdirp = require('mkdirp')

/**
 * 写入文件，如果路径不存在则创建
 * 
 * @param {*} filepath 
 * @param {*} data 
 * @param {*} cb 
 */
function writeFile(filepath, data, cb) {
  mkdirp(path.dirname(filepath), err => {
    if (err) return cb(err)
    fs.writeFile(filepath, data, cb)
  })
}

/**
 * 保存文件路径
 * 
 * @param {*} filename 
 * @param {*} filepath 
 */
function getFilePath(filename, filepath) {
  let filePath = filepath || 'files'
  return path.join(__dirname, '..', filePath, filename)
}

/**
 * 创建单词列表文件
 * 
 * @param {*} data 
 * @param {*} filename 
 * @param {*} filepath 
 * @param {*} cb 
 */
function createWordFile({ data = {}, name, path = '' }, cb) {
  const outfile = getFilePath(name, path)
  writeFile(outfile, JSON.stringify(data), err => {
    if (err) {
      console.log('outfile : ', name, outfile, '❌')
      cb && cb(err)
    } else {
      console.log('outfile : ', name, outfile, '✅')
      cb && cb(null, {file: outfile})
    }
  })
}

/**
 * 获取单词列表
 * 
 * @param {*} tag 
 * @param {*} url 
 * @param {*} cb 
 */
function getWords(tag, url, cb) {
  request(url, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      const arr = []
      const $ = cheerio.load(body)
      Array.from($('.ctable tr')).slice(1).map(tr => {
        arr.push({
          word: $(tr.children[1]).text(),
          explain: $(tr.children[2]).text()
        })
      })
      cb && cb(null, {
        tag,
        count: arr.length,
        results: arr
      })
    } else {
      cb && cb(err)
    }
  })
}

/**
 * 创建单词文件
 * 
 * @param {[object]} entry = {name, path}
 * @param {[string]} outPath 
 */
function createWords(entry, outPath = '') {
  const words = {}
  const file = getFilePath(entry.name, entry.path || '')
  // 1. 读取 列表文件
  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) throw err;
    const list = JSON.parse(data)
    // 2. 列表去重
    list.map(tags => {
      tags['tags'].map(tag => {
        words[tag.tag] = tag['link']
      })
    })

    const wordEntries = Object.entries(words)
    const wordTotal = wordEntries.length
    wordEntries.map((tag, index) => {
      if (err) throw err;
      // 3. 循环从 列表url 获取单词
      getWords(tag[0], tag[1], (err, data) => {
        if (err) throw err;
        // 4. 写入单词文件
        createWordFile({
          data,
          name: `${tag[0]}.json`,
          path: outPath
        })

        if (index === wordTotal - 1) {
          console.log(`========== ${wordTotal} 项文件创建完成 ✅ ========== `)
        }
      })
    })
  })
}

router.get('/', (req, res, next) => {
  request('http://www.ee1234.com/danci.html', (err, response, body) => {
    if (!err && response.statusCode === 200) {
      const $ = cheerio.load(body)

      Array.from($('#szcon ol')).map((ol, index) => {
        let arr = []
        ol.children.map(li => {
          if (li.name === 'li') {
            const explain = index === 0 ? $(li).html().match(/<\/a> .*/g)[0].replace(/<\/a>[ ,]/g, '') : $(li).html().match(/<\/a>[ ,].*/g)[0].replace(/<\/a>[ ,]/g, '')
            let tags = []
            li.children.map(node => {
              if (node.name === 'a') {
                tags.push({
                  tag: $(node).text(),
                  link: `http://www.ee1234.com${node.attribs.href}`
                })
              }
            })
            arr.push({
              explain,
              tags
            })  
          }
        })
        // 前缀 列表
        if (index === 0) {
          createWordFile({
            data: arr,
            name: `prefix.json`,
            path: 'files/list'
          })
        }
        // 后缀 列表
        if (index === 1) {
          createWordFile({
            data: arr,
            name: `suffix.json`,
            path: 'files/list'
          })
        }
      })

    } else {
      console.error(err)
    }
  })

  // res.header('contentType', 'application/json')
  res.render('word', { pageContent: '正在获取单词 前缀、词根、后缀 列表...' });
  
})



router.get('/prefix', (req, res, next) => {
  createWords({
    name: 'prefix.json',
    path: 'files/list'
  }, 'files/prefix')

  res.render('word', { pageContent: '正在获取 prefix前缀 列表 ...' });
})

router.get('/suffix', (req, res, err) => {
  createWords({
    name: 'suffix.json',
    path: 'files/list'
  }, 'files/suffix')

  res.render('word', { pageContent: '正在获取 suffix后缀 列表...' });
})

module.exports = router
