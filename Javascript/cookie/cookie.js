/*!
 * cookie.js
 * by: lmq
 * date: 2016/11/07
 * https://github.com/mengqing723/cookie
*/

;(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object' && exports) {
		module.exports = factory();
	} else {
		root.cookie = factory();
	}
}(typeof window === 'undefined' ? this : window, function() {
	var getKeys = Object.keys || function (obj) {
		var keys = [], key = '';
		for (key in obj) {
			if (obj.hasOwnProperty(key)) keys.push(key);
		}
		return keys;
	}
	function isPlainObject(value) {
		return !!value && Object.prototype.toString.call(value) === "[object Object]";
	}
	var isArray = Array.isArray || function (value) {
		return Object.prototype.toString.call(value) === '[object Array]';
	}
	function toArray(value) {
		return Array.prototype.slice.call(value);
	}
	/**
	 * 获取与当前时间差
	 * @param  time  格式： hh:mm:ss
	*/
	function timeDiff(time) {
		var timeArr = time.split(':');
		for(var i = 0, len = timeArr.length; i < len; i++) {
			if(timeArr[i].split('')[0] == 0) {
				timeArr[i] = timeArr[i].split('')[1];
			}
		}
		var now = new Date();
		var h = parseInt(timeArr[0]) - now.getHours(),
		m = parseInt(timeArr[1]) - now.getMinutes(),
		s = parseInt(timeArr[2]) - now.getSeconds();
		return (h*60*60 + m*60 + s)*1000;
	}

	function Cookie() {
		if (!(this instanceof Cookie)) {
			return new Cookie();
		}
	}
	Cookie.prototype = {
		/**
		 * 获取cookie
		 */
		get: function(name) {
			/*
			if (name && typeof name === "string") {
				return this.all()[name] || null;
			}
			return null; */
			return (name && typeof name === "string") ? this.all()[name] || null : null;
		},
		/**
		* 设置cookie
		*/
		set: function(name, value, options) {
			var opt = isPlainObject(options) ? options : {expires: options},
				expires = opt.expires !== undefined ? opt.expires : '',
				expiresType = typeof expires;

			if(expiresType === 'string' && expires !== '') {
				var regexp = /^([01]\d|2[0-3]):[0-5]\d:([0-5]\d)$/;									// 验证时间格式：hh:mm:ss
				if(regexp.test(expires)) {
					expires = new Date(+new Date() + timeDiff(expires));							// 设置过期时间: 例如：23:00:00
				} else {
					expires = new Date(expires);													// 设置过期时间，例如：2018-10-02 16:14:22
				}
			} else if(expiresType === 'number') {
				expires = new Date(+new Date() + 1e3 * 60 * 60 * 24 * expires); 					// 设置 expires 天过期
			}
			if (expires !== "" && "toGMTString" in expires) {
				expires = "; expires=" + expires.toGMTString();
			}

            var path = '; path=' + (opt.path ? opt.path : "/"),										// 设置路径
	            domain = opt.domain ? '; domain=' + opt.domain : '',								// 设置域
	            secure = opt.secure ? '; secure' : '';												// 设置安全措施，为 true 则直接设置，否则为空
	        document.cookie = name + "=" + escape(value) + expires + path + domain + secure;		// 转码并赋值
	    },
		/**
		 * 删除cookie
		 */
		remove: function(names) {
			names = isArray(names) ? names : toArray(arguments);
			for (var i = 0, len = names.length; i < len; i++) {
				this.set(names[i], '', -1);
			}
			return names;
		},
		/**
		 * 清除所有cookie
		 */
		clear: function() {
			return this.remove(getKeys(this.all()));
		},
		/**
		 * 所有cookie
		 */
		all: function() {
			var result = {};
			if(document.cookie) {
				var cookies = document.cookie.split('; ');
				for(var i = 0, len = cookies.length; i < len; i++) {
					var item = cookies[i].split('=');
					result[unescape(item[0])] = unescape(item[1]);
				}
			}
			return result;
		}
	}

	var cookie = function(name, value, options) {
		var C = Cookie(),
			len = arguments.length;
		if(len === 1 && typeof name === 'string')
			return C.get(name);
		if(len > 1 && name && value)
			return C.set(name, value, options);
		if(value === null)							// !0 = true;
			return C.remove(name);
		return C.all();
	}
	for(var k in Cookie.prototype) {
		cookie[k] = Cookie.prototype[k];
	}
	return cookie;
}));



