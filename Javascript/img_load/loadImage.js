
/*!*
 * 图片加载
 */

/***** 写法1 *******************************************/
(function(root) {
/**
 * [加载图片]
 * @param  {[type]} url     [图片路径]
 * @param  {[type]} onload  [加载完毕 回调]
 * @param  {[type]} onerror [加载错误 回调]
 */
	function LoadImage(url, onload, onerror) {
		var img = new Image();
		// ie && ie<=8 的浏览器必须在src赋予前定义onerror
		img.onerror = function () {
			onerror && onerror.call(img, img);
			img = img.onload = img.onerror = null;
		};
	    img.src = url;
	    // 图片已缓存
	    if(img.complete) {
	    	onload && onload.call(img, img);
			return;
	    }
	    // 图片已加载事件
	    img.onload = function() {
	    	onload && onload.call(img, img);
	    	// 防止 IE gif动画会循环执行onload
	    	img.onload = img.onerror = null;
	    }    
	}
}(window));




/***** 写法2 *******************************************/

(function (root) {
	function LoadImage(url, callback) {
		var img = new Image();
		img.onerror = function() {
			img.onerror = img.onload = null;
		}
		img.onload = function() {
			callback(img);
			img.onerror = img.onload = null;
		}

		// 在ie和opera下，先赋值src，再赋值onload，如果缓存图片，就错过了onload事件的触发
		img.src = url;
	}
})(window);




/**
 * 调用
 */

(function() {
	LoadImage('http://git.cmcaifu.com/cmcaifu/share/uploads/d877f75c6482b7744000cbac57755417/%E7%AD%BE%E5%88%B0%E6%B4%BB%E5%8A%A8v0.1.png?02', function(img) {
		console.log(img.width)
		document.body.appendChild(img)
	});
}());



