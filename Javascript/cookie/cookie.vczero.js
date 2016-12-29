/*
 * HTTP Cookie:存储会话信息
 * 名称和值传送时必须是经过RUL编码的
 * cookie绑定在指定的域名下，非本域无法共享cookie，但是可以是在主站共享cookie给子站
 * cookie有一些限制：比如IE6 & IE6- 限定在20个；IE7 50个；Opear 30个...所以一般会根据【必须】需求才设定cookie
 * cookie的名称不分大小写；同时建议将cookie URL编码；路径是区分cookie在不同情况下传递的好方式；带安全标志cookie
 *     在SSL情况下发送到服务器端，http则不会。建议针对cookie设置expires、domain、 path；每个cookie小于4KB
 *  https://github.com/vczero/cookie
 * */
//对cookie的封装，采取getter、setter方式
(function(global){
	//获取cookie对象，以对象表示
	function getCookiesObj(){
		var cookies = {};
		if(document.cookie){
			var objs = document.cookie.split('; ');
			for(var i in objs){
				var index = objs[i].indexOf('='),
					name = objs[i].substr(0, index),
					value = objs[i].substr(index + 1, objs[i].length);	
				cookies[name] = value;
			}
		}
		return cookies;
	}
	//设置cookie
	function set(name, value, opts){
		//opts maxAge, path, domain, secure
		if(name && value){
			var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
			//可选参数
			if(opts){
				if(opts.maxAge){
					cookie += '; max-age=' + opts.maxAge; 
				}
				if(opts.path){
					cookie += '; path=' + opts.path;
				}
				if(opts.domain){
					cookie += '; domain=' + opts.domain;
				}
				if(opts.secure){
					cookie += '; secure';
				}
			}
			document.cookie = cookie;
			return cookie;
		}else{
			return '';
		}
	}
	//获取cookie
	function get(name){
		return decodeURIComponent(getCookiesObj()[name]) || null;
	}
	
	//清除某个cookie
	function remove(name){
		if(getCookiesObj()[name]){
			document.cookie = name + '=; max-age=0';
		}
	}
	
	//清除所有cookie
	function clear(){
		var cookies = getCookiesObj();
		for(var key in cookies){
			document.cookie = key + '=; max-age=0';
		}
	}
	//获取所有cookies
	function getCookies(name){
		return getCookiesObj();
	}
	//解决冲突
	function noConflict(name){
		if(name && typeof name === 'string'){
			if(name && window['cookie']){
				window[name] = window['cookie'];
				delete window['cookie'];
				return window[name];
			}
		}else{
			return window['cookie'];
			delete window['cookie'];
		}
	}
	global['cookie'] = {
		'getCookies': getCookies,
		'set': set,
		'get': get,
		'remove': remove,
		'clear': clear,
		'noConflict': noConflict
	};
})(window);