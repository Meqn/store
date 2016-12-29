
var msg = "page1 完成";

var insetText = function(text) {
	document.getElementById('title').innerHTML = text;
}


module.exports = {
	msg: msg,
	insetText: insetText
}
