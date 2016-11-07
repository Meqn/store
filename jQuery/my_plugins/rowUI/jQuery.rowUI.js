/**
 * rowUI v0.1.1
 * date: 2016/10/25
 * by: mengqing723@gmail.com
 * desc: 隔行颜色控制插件 rowUI
 */

;(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object' && module.exports) {
        module.exports = factory;
    } else {
        factory(jQuery);
    }
}(function ($) {
	$.fn.rowUI = function(options) {
		/**
		 * @el : 改变的元素
		 * @evenRowClass : 偶数行 className
		 * @oddRowClass : 奇数行 className
		 * @activeRowClass : 鼠标经过 className
		 * @clickFn : 点击回调函数
		 */
		var defaults = {
			el: 'tr',
			evenRowClass: 'evenRow',
			oddRowClass: 'oddRow',
			activeRowClass: 'activeRow',
			clickFn: function() {}
		}
		var opts = $.extend({}, defaults, options);
		this.each(function(i, el) {
			var $this = $(this),
				$el = opts.el;
			$this.find($el + ':even').addClass(opts.evenRowClass);
			$this.find($el + ':odd').addClass(opts.oddRowClass);
			$this.find($el).on({
				'mouseover': function() {
					$(this).addClass(opts.activeRowClass);
				},
				'mouseout': function() {
					$(this).removeClass(opts.activeRowClass);
				},
				'click': function() {
					opts.clickFn();
				}
			});
		});
	}
}));
