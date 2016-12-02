## Zepto 插件模板

[返回简介](https://github.com/jnoodle/plugin-templates/blob/master/README.md)

```javascript
/*!
 * Zepto 插件模板
 *
 * @author jnoodle
 */

/**
 * 让插件支持 AMD 标准的模块加载模式
 *
 * 如果不需要支持 AMD，也可以直接使用：
 * (function($){ ... })(Zepto);
 *
 * 将插件封装在闭包里面，防止外部污染
 */
;
(function (factory) {

    // 如果要兼容 CMD 等其他标准，可以在下面添加条件，比如：
    // CMD: typeof define === 'function' && define.cmd
    // UMD: typeof exports === 'object'
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['zepto'], factory);
    } else {
        factory(Zepto);
        // 如果要兼容 Zepto，可以改写，比如使用：factory(Zepto||jQuery)
    }
}(function ($) {
    'use strict';

    /**
     * 定义插件的构造方法
     * @param element 选择器对象
     * @param options 配置项
     * @constructor
     */
    var Plugin = function (element, options) {

        //合并参数设置
        this.options = $.extend({}, Plugin.defaults, options);

        //将选择器对象赋值给插件，方便后续调用
        this.$element = $(element);

        //进行一些初始化工作
        this.init();
    };

    /**
     * 插件名称，即调用时的名称（$.fn.pluginName）
     * @type {string}
     */
    Plugin.pluginName = "pluginName";

    /**
     * 插件缓存名称，插件通过 data 方法缓存在 dom 结构里，存储数据的名称
     * @type {string}
     */
    Plugin.dataName = "pluginDataName";

    /**
     * 插件版本
     * @type {string}
     */
    Plugin.version = "1.0.0";

    /**
     * 插件默认配置项
     * @type {{}}
     */
    Plugin.defaults = {
        option1: "...",
        option2: "..."
    };

    /**
     * 定义插件的方法
     * @type {{}}
     */
    Plugin.prototype = {

        init: function () {
            console.log('init');
        },

        func1: function () {

        },

        func2: function () {

        }
    };

    /**
     * 缓存同名插件
     */
    var old = $.fn[Plugin.pluginName];

    /**
     * 定义插件，扩展$.fn，为Zepto对象提供新的插件方法
     * 调用方式：$.fn.pluginName()
     * @param option {string/object}
     */
    $.fn[Plugin.pluginName] = function (option) {
        return this.each(function () {
            var $this = $(this);

            var data = $.fn[Plugin.pluginName].pluginData[$this.data(Plugin.dataName)];
            var options = typeof option == 'object' && option;

            //只实例化一次，后续如果再次调用了该插件时，则直接获取缓存的对象
            if (!data) {
                //zepto的data方法只能保存字符串，所以用此方法解决一下
                $.fn[Plugin.pluginName].pluginData[++$.fn[Plugin.pluginName].pluginData.index] = new Plugin(this, options);
                $this.data(Plugin.dataName, $.fn[Plugin.pluginName].pluginData.index);
                data = $.fn[Plugin.pluginName].pluginData[$this.data(Plugin.dataName)];
            }

            //如果插件的参数是一个字符串，则直接调用插件的名称为此字符串方法
            if (typeof option == 'string') data[option]();
        });
    };

    /**
     * zepto的data方法只能保存字符串，所以用一个对象来存储data
     * @type {{index: number}}
     */
    $.fn[Plugin.pluginName].pluginData = {index: 0};

    $.fn[Plugin.pluginName].Constructor = Plugin;

    /**
     * 为插件增加 noConflict 方法，在插件重名时可以释放控制权
     * @returns {*}
     */
    $.fn[Plugin.pluginName].noConflict = function () {
        $.fn[Plugin.pluginName] = old;
        return this
    };

    /**
     * 可选：
     * 通过在 dom 上定义 data-role='pluginName' 的方式，自动实例化插件，省去页面编写代码
     * 在这里还可以扩展更多配置，仅仅通过 data 属性 API 就能使用插件
     */
    $(document).ready(function () {
        $('[data-role="' + Plugin.pluginName + '"]').each(function () {
            var $this = $(this);
            var data = $.fn[Plugin.pluginName].pluginData[$this.data(Plugin.dataName)];

            // ...

            $.fn[Plugin.pluginName].call($this, data);
        });
    });
}));
```