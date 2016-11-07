/*!
 * jQuery.scrollFix.js
 * @ desc: 滚动固定在某个位置的jQuery插件
 * @ version: v2.0.2
 * @ link: https://github.com/mengqing723/jQuery-scrollFix.git
 * @ date: 2016/10/26
 */
;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object' && exports) {
        module.exports = factory;
    } else {
        factory(jQuery);
    }
}(function ($) {
    $.fn.scrollFix = function(options) {
        return this.each(function() {
            var defaults = {
                top: 0,                         // 浮动对象 到顶部的高度
                bottom: 0,                      // 浮动对象 到停靠对象(startObj)的间距
                zindex: 999,                    // 浮动对象 的z-index索引值
                startObj: null,                 // 滑到 startObj 位置时开始浮动固定，默认为浮动对象
                position: 'top',                // 滑到 startObj 顶端|底端 开始浮动固定 ('top'|'bottom')
                endObj: null,                   // 滑到 endObj 顶部时取消固定并继续跟随滚动
                endPos: 0,                      // 浮动对象 到停止对象(endObj)的间距
                fixClass: 'fixed',              // 浮动固定后添加 class 样式
                fixFn: function() {},           // 浮动固定后回调
                fixEndFn: function() {},        // 浮动固定结束后回调
                endFn: function() {}            // 浮动结束后回调
            }
            var opts = $.extend({}, defaults, options);
            var $this = $(this),    // 当前对象
                $startObj = opts.startObj === null ? $this : $(opts.startObj),  // 滚动到 startObj 开始浮动固定
                isEnd = opts.endObj === null ? false : true;    // 是否结束浮动固定

            var objStyle = $this.attr('style') ? $this.attr('style') : '',    // 默认样式
                objWidth = $this.width();   // 默认宽度
            var startHeight = (opts.position === 'top') ? 0 : $startObj.outerHeight();    // (顶部|底部) 开始浮动
            var startFix = $startObj.offset().top + startHeight - opts.bottom;    // 滚动距离为 startFix 开始固定浮动
            var endFix = isEnd ? parseInt($(opts.endObj).offset().top - opts.top - opts.endPos - $this.outerHeight()) : 0;  // 滚动距离为 endFix 结束固定浮动
            var endFixTop = endFix + opts.top;  // 变为跟随滚动后(fixed -> absolute)到顶部的距离

            var methods = {
                fixed: function(top) {
                    $this.css({position: 'fixed', top: top + 'px', zIndex: opts.zindex, width: objWidth})
                        .addClass(opts.fixClass);
                    opts.fixFn();
                },
                absolute: function(top) {
                    $this.css({position: 'absolute', top: top + 'px', zIndex: opts.zindex, width: objWidth});
                    opts.fixEndFn();
                },
                default: function() {
                    $this.attr('style', objStyle)
                        .removeClass(opts.fixClass);
                    opts.endFn();
                }
            }

            $(window).scroll(function(event) {
                var scrollTop = $(this).scrollTop();
                if(scrollTop > startFix) {
                    if(isEnd) {
                        if(scrollTop > endFix) {
                            methods.absolute(endFixTop);
                        } else {
                            methods.fixed(opts.top);
                        }
                    } else {
                        methods.fixed(opts.top);
                    }
                } else {
                    methods.default();
                }
            }).trigger('scroll');
        });
    }
}));