/**
 * 快速获取图片尺寸
 * 参考：http://www.qttc.net/201304304.html
 * 		https://github.com/qiqiboy/imageReady
 * demo: http://blog.phpdr.net/wp-content/uploads/2012/06/imgReadyDemo.html
 *
 * 
 * 1. 获取图片实际尺寸： naturalWidth, naturalHeight (html5属性)
 * 2. img.onload()  // 图片加载完毕，可获取图片尺寸
 * 3. img.complete 	// 图片已缓存，可直接取图片尺寸
 * 4. 定时检测图片尺寸，如果宽高都大于0即表示已获得图片尺寸 (比onload快多, 基本100ms内)
 *
 *
 * 常用事件： onload, onerror, onreadystatechange(IE)，onabort
 * 属性： readyState
 * readyState 属性的值：
 * 	uninitialized(未初始化)：对象存在但尚未初始化
 *  loading(正在加载)：对象正在加载数据
 *  loaded(加载完毕)：对象加载数据完成
 *  interactive(交互)：可以操作对象了，但还没有完全加载
 *  complete(完成)：对象已经加载完毕
 *  
 */

;(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object' && exports) {
		module.exports = factory();
	} else {
		root['ImageLoader'] = factory();
	}
}(typeof window === 'undefined' ? this : window, function() {
	var timer = null,
		props = [['width', 'height'], ['naturalWidth', 'naturalHeight']]
		natural = Number('naturalWidth' in new Image); 	// 是否支持HTML5新增的 naturalWidth/naturalHeight 属性
	// 检测图片尺寸是否改变
	var imgCheck = function() {
			if(this.complete || this[props[natural][0]] !== this.__width || this[props[natural][1]] !== this.__height || this.readyState === "loading") {
				this.end = true;
				this.onready(this);
			} else {
				/**
				 * 1. 设置一个定时器，检测图片尺寸是否改变
				 * 2. 将 imgCheck 上下文的 this 指向 Image对象
				 */
				setTimeout(imgCheck.bind(this), 50);
			}
		};

	/**
	 * @param  {[type]} image   [图片路径 或 image 对象]
	 * @param  {[func]} onReady [图片已就绪 (已获取尺寸)]
	 * @param  {[func]} onLoad  [图片加载完毕]
	 * @param  {[func]} onError [图片加载出错]
	 */
	return function(image, onReady, onLoad, onError) {
		var onready = onReady || function() {},
			onload = onLoad || function() {},
			onerror = onError || function() {};
		// 创建 Image 对象
		var img = typeof image === 'string' ? new Image() : image;

		// ie && ie<=8 的浏览器必须在src赋予前定义onerror
		img.onerror = function() {
			img.end = true;
			img.onload = img.onerror = img.onreadystatechange = null;
			onerror.call(img, img);
			img = null;
		}
		// Image.src 赋值
		if(typeof image === 'string') {
			img.src = image;
		}
		// 防止onerror后再执行
		if(!img) return; 	

		// 如果图片被缓存，则直接返回缓存数据
		if (img.complete) {
            img.onerror = null;
            onready.call(img, img);
            onload.call(img, img);
            img = null;
            return;
        }

        img.__width = img[props[natural][0]];
        img.__height = img[props[natural][1]];
        img.onready = onready;
        imgCheck.call(img);

        // 图片加载完毕事件
        img.onload = img.onreadystatechange = function() {
        	if (img && img.readyState && img.readyState !== 'loaded' && img.readyState !== 'complete') {
                return;
            }
            // IE gif动画会循环执行onload，置空onload即可
            img.onload = img.onerror = img.onreadystatechange = null;

            !img.end && imgCheck.call(img); 	// onload在定时器时间差范围内可能比onready快, 这里进行检查并保证onready优先执行
            onload.call(img, img);
            img = null;
        }
	}
}));






/****************************************************************************
 * 调用
 */
/****
	ImageLoader("http://static.mengqing.org/bg3.jpg", function(img) {
		console.log('ready', img)
		if(img.width === 0 || img.height === 0) {
			console.log('图片未加载')
		}
	}, function(img) {
		console.log('load', img)
	}, function(img) {
		console.error('error');
	});

 */


