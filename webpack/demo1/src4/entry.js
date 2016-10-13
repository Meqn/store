
require('./css/style.css');

var img1 = document.createElement('img');
img1.src = require('./image/small.png');
document.body.appendChild(img1);

var img2 = document.createElement('img');
img2.src = require('./image/larger.png');
document.body.appendChild(img2);
