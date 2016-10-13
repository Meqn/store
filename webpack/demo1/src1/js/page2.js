
var msg = "page2 成功";

var insetText = function(text) {
	var div = document.createElement('div');
	div.innerHTML = text;
	document.body.appendChild(div);
}

module.exports.msg = msg;
module.exports.insetText = insetText;
