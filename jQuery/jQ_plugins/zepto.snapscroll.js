/**
 * Created by admin on 14-4-17.
 * https://github.com/hugohua/zepto-SnapScroll
 */
(function($){
    $.fn.anim = function(props, dur, ease){
        var transforms = [], opacity, k;
        for (k in props)
            k === 'opacity' ? opacity=props[k] : transforms.push(k+'('+props[k]+')');
        return this.css({ '-webkit-transition': 'all '+(dur||0.5)+'s '+(ease||''),
            '-webkit-transform': transforms.join(' '), opacity: opacity });
    }
})(Zepto);

(function ($,window) {
    var rAF = window.requestAnimationFrame  ||
        window.webkitRequestAnimationFrame  ||
        window.mozRequestAnimationFrame     ||
        window.oRequestAnimationFrame       ||
        window.msRequestAnimationFrame      ||
        function (callback) { window.setTimeout(callback, 1000 / 60); };

    //事件名称统一处理
    var hasTouch = 'ontouchstart' in window,
        resizeEvent = 'onorientationchange' in window ? 'orientationchange' : 'resize',
        startEvent = hasTouch ? 'touchstart' : 'mousedown',
        moveEvent = hasTouch ? 'touchmove' : 'mousemove',
        endEvent = hasTouch ? 'touchend' : 'mouseup',
        cancelEvent = hasTouch ? 'touchcancel' : 'mouseup',
        transitionEnd = 'webkitTransitionEnd';

//    var direction

    /**
     * 定义一个插件 Plugin
     */
    var SnapScroll = (function () {

        function SnapScroll(element, options) {
            this.$el = $(element);
            //一些参数
            this.options = $.extend({}, $.fn.snapscroll.defaults,options);

            //初始化调用一下
            this.init();
        }


        SnapScroll.prototype = {
            //将构造函数的指向重新定位到Plugin
            constructor:SnapScroll,

            name:'SnapScroll',

            version:'0.1.1',

            init:function(){

                this.$pages             = this.$el.children();              //所有页面zepto对象
                this.length             = this.$pages.length -1;            //页面个数

                this.curIndex           = 0;                                //当前展示页面
                this.newIndex           = 0;                                //需要切换到下一页的索引
                this.startTime          = null;                             //开始时间
                this.drag               = null;                             //是否处于拖动状态
                this.startY             = null;                             //touch start的值
                this.direction          = null;                             //拖动的方向
                this.directionLocked    = null;                             //方向初始化控制值
                this.$target            = null;                             //确定拖动的目标

                this._initEvent();
            },

            /**
             * 初始化事件
             * @private
             */
            _initEvent:function(){
                this.$el.on(startEvent, $.proxy(this.handleEvent, this))
                        .on(moveEvent, $.proxy(this.handleEvent, this))
                        .on(endEvent, $.proxy(this.handleEvent, this))
                        .on(cancelEvent, $.proxy(this.handleEvent, this));
                this.$pages.on(transitionEnd, $.proxy(this.handleEvent, this));
                window.addEventListener(resizeEvent, this, false)
            },

            /**
             * 统一的事件处理函数
             * @param e
             */
            handleEvent:function(e){
                switch (e.type){
                    //tap事件 进行初始化工作
                    case 'tap':
                        this._start(e);
                        break;
                    case startEvent :
                        this._start(e);
                        break;
                    case moveEvent :
                        this._move(e);
                        break;
                    case endEvent :
                    case cancelEvent:
                        this._end(e);
                        break;
                    case transitionEnd:
                        this._flip(e);
                        break;
                    case resizeEvent:
                        this._resize();
                        break;
                }
            },

            /**
             * 开始移动
             * @param e
             * @private
             */
            _start:function(e){
                //如果正在移动状态则返回
                if(this.moved) return;
                var point = hasTouch ? e.touches[0] : e;
                //若多个实例，有实例默认是隐藏状态，则需要在tap时重新获取宽高
                this._resize();
                this.drag      = true;
                //记录点击时的坐标
                this.startX    = point.pageX;
                this.startY    = point.pageY;       //start Y
            },

            /**
             * 移动
             * @param e
             * @private
             */
            _move: function (e) {
                var me = this;
                //阻止冒泡及本身行为
                e.preventDefault();
                e.stopPropagation();
                //如果正在移动状态 或者 不处于拖曳状态 则返回
                if(me.moved || !me.drag) return;

                var point       = hasTouch ? e.touches[0] : e,
                    //记录拖曳的距离
                    deltaX      = point.pageX - me.startX,
                    deltaY      = point.pageY - me.startY,
                    x, y,_direction;
                //记录拖曳的绝对值距离
                me.absDistX   = Math.abs(deltaX);
                me.absDistY   = Math.abs(deltaY);
                //10px用于方向性预测
                if(me.absDistX < 10 && me.absDistY < 10 ) return;
//                debugger;
                //第一次移动则锁住 仅执行一次
                if(!me.directionLocked){
                    //判定拖曳方向
                    _direction = me.absDistX - me.absDistY - me.options.directionLockThreshold > 0;
                    if((me.options.scroll === 'n' && _direction) || (me.options.scroll === 'h') ){
                        me.directionLocked = 'h';  //横向
                        me.direction = deltaX > 0 ? 'LEFT' : 'RIGHT';
                    }else{
                        me.directionLocked = 'v';  //竖向
                        me.direction = deltaY > 0 ? 'DOWN' : 'UP';
                    }
                    //上一页
                    if(me.direction === 'LEFT' ||me.direction === 'DOWN'){
                        me.newIndex = me.curIndex - 1;
                    }else{
                        //下一页
                        me.newIndex = me.curIndex + 1;
                    }

                    //判断是否需要循环
                    if(me.options.loop){
                        if(me.newIndex < 0) me.newIndex = me.length;
                        if(me.newIndex > me.length) me.newIndex = 0;
                    }else{
                        if(me.newIndex < 0 || me.newIndex > me.length) return;
                    }

                    //当前页面
                    me.$target = me.$pages.eq(me.newIndex);
                    me.$el.trigger('start:' + me.name,[me.curIndex,me.newIndex,me.direction]);
                }
                //假设万一target不存在 则返回
                if(!me.$target) return;

                if(me.direction === 'UP'){
                    x = 0;
                    y = me.height + deltaY;
                }else if(me.direction === 'DOWN'){
                    x = 0;
                    y = deltaY -me.height;
                }else if(me.direction === 'LEFT'){
                    x = deltaX -me.width;
                    y = 0;
                }else if(me.direction === 'RIGHT'){
                    x = me.width + deltaX;
                    y = 0;
                }
                //将x，y保存为内部对象用于js动画
                me.x = x;
                me.y = y;
                me._translate(x,y);
            },

            /**
             * 离开屏幕事件
             * @param e
             * @private
             */
            _end:function(e){
                var x =0 ,y = 0,vThreshold,hThreshold,me = this;
                //还原默认状态
                me.drag = null;
                //如果不是循环
                if(!me.options.loop){
//                    console.log(me.newIndex , me.length,me.moved,me.drag);
                    me.directionLocked = null;
                    if(me.newIndex < 0) me.newIndex = 0;
                    if(me.newIndex > me.length) me.newIndex = me.length;
                }
                //如果没有移动目标 则直接退出
                if(!me.$target || !me.$target.length) return;

                me.moved = true;
                me.change = true;

                //判断距离
                vThreshold = me.height / me.absDistY > me.options.scrollThreshold;
                hThreshold = me.width / me.absDistX > me.options.scrollThreshold;
                //4分之1不到的距离就回退
                if(me.direction === 'UP' && vThreshold){
                    x = 0;
                    y = me.height;
                    me.change = null;
                    //距离
                }else if(me.direction === 'DOWN' && vThreshold){
                    x = 0;
                    y = -me.height;
                    me.change = null;

                }else if(me.direction === 'LEFT' && hThreshold){
                    x = -me.width;
                    y =0;
                    me.change = null;

                }else if(me.direction === 'RIGHT' && hThreshold){
                    x = me.width;
                    y = 0;
                    me.change = null;
                }
                //不管如何 最终还是要回到0点
                me._scrollTo(x,y);
            },

            /**
             * 最后动画停止时调用
             * @private
             */
            _flip:function(){
                //只有最外层的动画才能执行此回调
                if(!this.moved) return;
//                debugger;
                this._offTranslate();
                this.directionLocked = null;
                this.moved = null;
                if(this.change){
                    this.$pages.eq(this.curIndex).removeClass('show');
                    this.$target.addClass('show');
                    this.curIndex = this.newIndex;
                }
                this.$target.removeClass('active').removeAttr('style');
                this.$target = null;
                this.change = null;
                this.$el.trigger('done:' + this.name,[this.newIndex,this.direction]);
            },

            _resize:function(){
                //重新设置容器高度
                this.width = this.$el.width();
                this.height = this.$el.height();
            },

            /**
             * CSS3实现滚动到指定的地方
             * @param x 距离
             * @param y 距离
             * @private
             */
            _translate: function (x,y) {
                var me = this;
                //将上rAF位移
                rAF(function(){
                    me.$target && me.$target.addClass('active').css({
                        '-webkit-transform': 'translate3d('+ x +'px,'+ y +'px,0)'
                    })
                });
            },

            /**
             * CSS3滑动距离
             * @param destX 终点X坐标
             * @param destY 终点Y坐标
             * @param time
             * @param easing
             * @private
             */
            _scrollTo:function(destX,destY, time, easing){
                time = time || this.options.speed;

//                this.isInTransition = this.options.useTransition && time > 0;
                //如果支持CSS3动画
                if ( this.options.useTransition ) {
                    this.$target.css('-webkit-transition','-webkit-transform '+ time +'ms');
                    this._translate(destX,destY);
//                    console.info(this.newIndex)
//                    debugger;
                }else{
                    this._animate(destX,destY,time);
                }
            },

            /**
             * JS动画效果
             * @param destX 终点X坐标
             * @param destY 终点Y坐标
             * @param time 动画执行时间
             * @param easing
             * @private
             */
            _animate:function(destX,destY, time, easing){
                var me = this,
                    distance = (me.directionLocked == 'v') ? destY - me.y : destX - me.x,
                    speed =  distance/time * 16;
//                console.info(me.directionLocked)
//                console.info(speed,distance,time,destY,'speed')
                //没拖动 直接return
                if(distance === 0) return;
                function step(){
                    //大于0 表示回退
                    //上下滚动 大于0是往下拖
                    if(me.directionLocked == 'v' && distance > 0  ){
                        me.y += speed;
                        if(me.y > destY) me.y = destY;
                        me._translate(0,me.y)
                    }else if(me.directionLocked == 'v' && distance < 0){
                        me.y += speed;
                        if(me.y <destY) me.y = destY;
                        me._translate(0,me.y)
                    }
                    else if(me.directionLocked == 'h' && distance > 0){

                        //往坐
                        me.x += speed;
                        if(me.x > destX) me.x = destX;
                        me._translate(me.x,0)
                    }else if(me.directionLocked == 'h' && distance < 0){
                        me.x += speed;
                        if(me.x < destX) me.x = destX;
                        me._translate(me.x,0)
                    }

                    //回调 达到 终点后 回调
                    if((me.directionLocked == 'v' && me.y === destY) || (me.directionLocked == 'h' && me.x === destX)){
                        me._flip();
                        //退出循环
                        return;
                    }
                    //递归速度
                    if( (me.directionLocked == 'v' && distance > 0 && me.y < destY) ||
                        (me.directionLocked == 'v' && distance < 0 && me.y > destY )||
                        (me.directionLocked == 'h' && distance < 0 && me.x > destX ) ||
                        (me.directionLocked == 'h' && distance > 0 && me.x < destX )) {
                        rAF(step);
                    }

                }
                step();
            },

            _offTranslate:function(){
                this.$target.css('-webkit-transition','-webkit-transform 0ms');
            },

            /**
             * TODO:尚未完成哈
             * 跳转到指定页面
             * @param idx 页面索引
             * @param direction 方向 v,h
             */
            goTo:function(idx,direction){
                if (this.curIndex==idx || this.isAnimating) return;
                this.newIndex = idx;
                this.$target = this.$pages.eq(this.newIndex);
                //判断方向 v竖向
                if(this.options.scroll === 'n' && direction === 'v'){
//                    if()
                }
            }




        };

        return SnapScroll;

    })();


    /**
     * 这里是将Plugin对象 转为jq插件的形式进行调用
     * 定义一个插件 snapscroll
     */
    $.fn.snapscroll = function(options){
        return this.each(function () {
            var $this = $(this),
                instance = $.fn.snapscroll.lookup[$this.data('snapscroll')];
            if (!instance) {
                $.fn.snapscroll.lookup[++$.fn.snapscroll.lookup.i] = new SnapScroll(this,options);
                $this.data('snapscroll', $.fn.snapscroll.lookup.i);
                instance = $.fn.snapscroll.lookup[$this.data('snapscroll')];
            }

            if (typeof options === 'string') return instance[options].apply(instance,[].slice.call(arguments, 1));
        })
    };

    $.fn.snapscroll.lookup = {i: 0};

    /**
     * 插件的默认值
     */
    $.fn.snapscroll.defaults = {
        directionLockThreshold: 5,          //方向锁定阈值，判断用户的拖动意图，是倾向x方向拖动还是y方向
        scroll:'n',                         //左右滚动h / 上下滚动v /左右上下都可滚动n
        scrollThreshold:10,                  //百分比，10表示页面的10/1，单位n*100%
        speed:400,                          //页面滚动速度，单位ms
        loop: true,                          //是否循环
        useTransition:true                  //是否支持CSS3动画，默认是支持的
    };

})(Zepto,window);