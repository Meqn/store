/**
 * Created by hugohua on 14-4-1.
 */

/**
 * 将插件封装在一个闭包里面，防止外部代码污染  冲突
 */
(function ($) {
    /**
     * 定义一个插件 Plugin
     */
    var Slider,
        privateMethod;  //插件的私有方法

    /**
     * 这里是插件的主体部分
     * 这里是一个自运行的单例模式。
     *
     */
    Slider = (function () {

        /**
         * 插件实例化部分，初始化时调用的代码可以放这里
         * @param el
         * @param options
         * @constructor
         */
        function Slider(el, options) {
            //将插件的默认参数及用户定义的参数合并到一个新的obj里
            this.settings = $.extend({}, $.fn.slider.defaults, options);
            //将dom jquery对象赋值给插件，方便后续调用
            this.$el = $(el);
            //初始化
            this.init();
        }

        /**
         * 写法一
         * 插件的公共方法，相当于接口函数，用于给外部调用
         */
        Slider.prototype.doSomething = function () {
            /**
             * 方法内容
             */
        };

        /**
         * 写法二
         * 将插件所有函数放在prototype的大对象里
         * @type {{}}
         */
        Slider.prototype = {

            init:function(){
                this.$el.find('.btn').on('click',function(){
                    console.info('click' + Date.now());
                    return false;
                })
            },

            doSomething2:function(){

            }
        };

        return Slider;

    })();

    /**
     * 插件的私有方法
     */
    privateMethod = function () {

    };

    /**
     * 这里是将Plugin对象 转为jq插件的形式进行调用
     * 定义一个插件 plugin
     */
    $.fn.slider = function (options) {
        return this.each(function () {
            var $me = $(this),
                instance = $me.data('slider');
            if(!instance){
                //将实例化后的插件缓存在dom结构里（内存里）
               $me.data('slider', new Slider(this, options));
            }
            
            /**
             * 优雅处： 如果插件的参数是一个字符串，则 调用 插件的 字符串方法。
             * 如 $('#id').plugin('doSomething') 则实际调用的是 $('#id).plugin.doSomething();
             * doSomething是刚才定义的接口。
             * 这种方法 在 juqery ui 的插件里 很常见。
             */
            if ($.type(options) === 'string') instance[options]();
        });
    };

    /**
     * 插件的默认值
     */
    $.fn.slider.defaults = {
        property1: 'value',
        property2: 'value'
    };

    /**
     * 优雅处： 通过data-xxx 的方式 实例化插件。
     * 这样的话 在页面上就不需要显示调用了。
     */
    $(function () {
        return new Slider($('[data-plugin]'));
    });
})(jQuery);