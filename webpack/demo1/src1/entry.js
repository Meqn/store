
var page1 = require('./js/page1');
var page2 = require('./js/page2');

require('./css/style.css');

page1.insetText("This is a simple demo!");
console.log(page1)

page2.insetText('一个完整的测试内容。');
console.log(page2.msg)
