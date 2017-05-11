/**
 * 1. 自定义事件
 *   1) el.on('click.plugin'); 	// 自定义 click 事件。 解绑： el.off('click.plugin')
 *   2) el.on('plugin.load'); 	// 绑定自定义事件 plugin.load
 *      el.trigger('plugin.load') 	// 触发自定义事件
 *   Demo: http://jsrun.net/pRkKp/embedded/all/light
 *   参考：https://github.com/fancyapps/fancybox/
 *
 *
 * 2. 默认配置回调方法： {fn: $.noop}
 *
 * 3. $.data()
 *    Zepto 的data方法只能保存字符串
 * 
 *
 * 4. $.plugin -> $.plugin.go();
 *    $.fn.plugin -> $(el).plugin('go');
 *
 *
 * 
 */



/**
 * 参考： https://github.com/jnoodle/plugin-templates/blob/master/README.md
 */

;(function(root, factory) {
	if(typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if(typeof exports === 'object' && exports) {
		module.exports = factory(require('jquery'));
	} else {
		factory(jQuery);
	}
}(typeof window === 'undefined' ? this : window, function($) {

	// 插件的私有方法，也可以看做是插件的工具方法集
	var privateMethod = function() {
		//
	}
	
	/**
	 * [定义插件的构造方法]
	 * @param  {[element]}	[选择器对象]
	 * @param  {[options]}	[配置项]
	 */
	var Plugin = function(element, options) {
		this.$el = $(element);

		//合并参数设置
		this.options = $.extend({}, Plugin.defaults, options);

		// 初始化调用
		this.init();
	}

	// 定义插件的方法
	Plugin.prototype = {
		constructor: Plugin,
		init: function() {
			//
		},
		func1: function() {
			//
		},
		func2: function() {
			//
		}
	}


	// 插件名称，即调用时的名称（$.fn.pluginName）
	Plugin.pluginName = 'pluginName';
	// 插件版本
	Plugin.version = '2.2.1';
	// 插件默认配置项
	Plugin.defaults = {
		prop1: '',
		prop2: '',
		onInit: $.noop,
		onLoad: $.noop
	}

	// 缓存同名插件
	var old = $.fn[Plugin.pluginName];

	/**
	 * [定义插件，扩展$.fn，为jQuery对象提供新的插件方法]
	 * 调用方式：$.fn.pluginName()
	 * 
	 * @param {[type]} option [配置项]
	 */
	$.fn[Plugin.pluginName] = function(option) {
		return this.each(function() {
			var $this = $(this),
				options = typeof option === 'object' && option;

			var instance = $this.data(Plugin);
			// 只实例化一次，后续如果再次调用了该插件时，则直接获取缓存的对象
			if(!instance) {
				// 将实例化后的插件缓存在dom结构里（内存里）
				$this.data('Plugin', (instance = new Plugin(this, options)));
			}

			/**
             * 如果插件的参数是一个字符串，则直接调用插件的名称为此字符串方法
             * 如 $('#id').plugin('func1') 则实际调用的是 $('#id').plugin.func1();
             * func1 是构造函数 Plugin 定义的方法。
             * juqery ui 常见写法。
             */
			if(typeof option === 'string' && option && instance[option]) {
				// return instance[option]();
				return instance[option].apply(instance, [].slice.call(arguments, 1));
			} else {
				$.error( 'Method ' +  option + ' does not exist on jQuery.'+ Plugin.pluginName);
			}

		});
	}

	// 将构造函数的指向重新定位到Plugin
	$.fn[Plugin.pluginName].Constructor = Plugin;
	$.fn[Plugin.pluginName].version = Plugin.version; 	// 添加可见的 版本号

	// 为插件增加 noConflict 方法，在插件重名时可以释放控制权
	$.fn[Plugin.pluginName].noConflict = function () {
        $.fn[Plugin.pluginName] = old;
        return this;
    };






    /**
     * [通过在 dom 上定义 data-pluginName 的方式，自动实例化插件，省去页面编写代码]
     */
    $(document).ready(function() {
    	$('[data-"' + Plugin.pluginName + '"]').each(function() {
    		var $this = $(this);
    		var data = $this.data();
    		$.fn[Plugin.pluginName].call($this, data);
    	});
    });

}));























/********************************************************************************************
 * 写法二
*********************************************************************************************/


;(function($) {

	var methods = {
		init: function(options) {
			return this.each(function() {
				var $this = $(this);
				// code
			});
		},
		show: function() {
			// code
		},
		hide: function() {
			// code
		},
		update: function() {
			// code
		},
		destroy: function() {
			// code
		}
	}

	$.fn.plugin = function(method) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
		}
	}


	/**
	 * 调用插件
	 */
	$(function() {
		$(el).plugin(); 	// 调用 methods.init()
		$(el).plugin('show'); 	// 调用 methods.show()
	});
}(jQuery));










