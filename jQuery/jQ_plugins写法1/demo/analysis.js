(function ($) {
    /**
     * 定义一个插件 Plugin
     */
    var Slider,
        privateMethod;  //插件的私有方法

    Slider = (function () {


        function Slider(el, options) {

        }

        Slider.prototype = {

            init:function(){},

            doSomething2:function(){}
        };

        return Slider;

    })();

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


    $.fn.slider.defaults = {
        property1: 'value',
        property2: 'value'
    };

})(jQuery);
// 解析：
//1、自运行的匿名函数：参数jQuery的作用是将jQuery传入，并以$的方式表示。
//等同于: function aa(){} aa();
//2、 8--24行也是一个自调用的匿名函数，同时将内部的Slider构造函数返回给外部的变量Slider，这2个Slider是等价的。
//3、26行开始定义jQ插件
//4、46行定义插件的默认值





//part 2
(function ($) {
    /**
     * 定义一个插件 Plugin
     */
    var Slider,
        privateMethod;  //插件的私有方法


    Slider = (function () {


        function Slider(el, options) {
            //将插件的默认参数及用户定义的参数合并到一个新的obj里
            this.settings = $.extend({}, $.fn.slider.defaults, options);
            //将dom jquery对象赋值给插件，方便后续调用
            this.$el = $(el);
            //setInterval使用
            this.timer = null;
            //当前正在显示的页数
            this.curIdx = 1;
            //初始化
            this.init();

        }

        /**
         * 将插件所有函数放在prototype的大对象里
         * @type {{}}
         */
        Slider.prototype = {

            /**
             * 在这个方法里绑定插件的所有事件
             * @private
             */
            _initEvts:function(){
                var me = this;
                if(me.settings.isDot){
                    //点击跳转到相应的页面
                    me.$nav.on({
                        'click':function(){
                            var $this = $(this),
                                idx = $this.index();
                            //跳转到相应的页
                            me.goTo(idx);
                            //加个高亮的样式 样式名"hover_class"也可以写到可配置的参数里面
                            $this.addClass('hover_class').siblings('a').removeClass('hover_class');
                        }
                    });
                }

                if(me.settings.autoPlay){
                    me.autoPlay();
                    //hover时停止自动播放
                    me.$el.on('hover',function(){
                        //mouser over
                        me.stopAutoPlay();
                    },function(){
                        //mouser out
                        me.autoPlay();
                    })
                }

            },

            init:function(){
                if(this.settings.isDot){
                    this.createNav()
                }

                this._initEvts();
            },

            //判断slider的页数生成nav点
            createNav:function(){
                var len,str;
                //判断slider的页数生成nav点
                len = this.$el.find('li').length;
                str = '<div class="nav">';
                for(var i = 1; i<=len; i++){
                    str += '<a href="##">'+ i +'</a>';
                }
                str += '</div>';
                //将导航插入
                this.$nav = $(str).appendTo(this.$el);
            },

            stopAutoPlay:function(){
                clearInterval(this.timer);
            },

            autoPlay:function(){
                this.stopAutoPlay();
                var me = this;
                this.timer = setInterval(function(){
                    me.goTo(me.curIdx);
                },this.settings.interval);
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
        interval: 1000,
        isDot: true,
        autoPlay:true
    };

    /**
     * 优雅处： 通过data-xxx 的方式 实例化插件。
     * 这样的话 在页面上就不需要显示调用了。
     */
    $(function () {
        return new Slider($('[data-plugin]'));
    });
})(jQuery);