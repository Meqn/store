/**
 * 获取英语单词 前缀 和 后缀
 * http://www.ee1234.com/danci.html
 */

var $list = (function (elem) {
  var $ol = document.getElementById(elem).querySelectorAll('ol')
  return function(num) {
    return $ol[num].querySelectorAll('li')
  }
}('szcon'))

function getPrefix() {
  var prefix = []
  try {
    Array.from($list(0)).map(li => {
      var tags = []
      var str = li.outerHTML
      var explain = str.match(/<\/a> [\s\S]*?<\/li>/g)[0].replace(/<\/a>/g, '').replace(/<\/li>/g, '')

      Array.prototype.slice.call(li.childNodes).map(node => {
        if (node.nodeName.toLocaleLowerCase() === 'a') {
          tags.push({
            tag: node.innerText,
            link: 'http://www.ee1234.com' + node.attributes.href.nodeValue
          })
        }
      })

      prefix.push({
        explain,
        tags
      })
    })
  } catch (error) {
    console.error(error)
  }
  
  return prefix
}

function getSuffix() {
  var suffix = []
  try {
    Array.prototype.slice.call($list(1)).map(li => {
      var tags = []
      var str = li.outerHTML
      var explain = str.match(/<\/a>[ ,]+[\s\S]*?<\/li>/g)[0].replace(/<\/a>/g, '').replace(/<\/li>/g, '')
      Array.from(li.children).map(node => {
        tags.push({
          tag: node.innerText,
          link: 'http://www.ee1234.com' + node.getAttribute('href')
        })
      })
      suffix.push({
        explain,
        tags
      })
    })
  } catch (error) {
    console.error(error)
  }
  return suffix
}
