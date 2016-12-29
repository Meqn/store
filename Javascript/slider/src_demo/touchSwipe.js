//touchSwipe.js @create by Jacobwang 2015-1-14 Ver1.0
//https://github.com/wenyuking/touchSwipe
(function(){
    var _$ = function(selector){
        return document.querySelector(selector)
    }

    var _$$ = function(selector){
        return document.querySelectorAll(selector)
    }

    var TouchSwipe = function(){
        this.options = {
            'show':true,
            'transTime':.3,
            'transType':'ease',
            'direction':'X'
        };

        this.autoDis = 50;
        this.Targetnode = _$('.t-swipe');
        this.moveCount = 0;

        //触摸开始点
        this.startDisX = 0;
        this.startDisY = 0;
        //触摸滑动距离
        this.moveDisX = 0;
        this.moveDisY = 0;
        //触摸滑动开始距离
        this.moveStartX = 0;
        this.moveStartY = 0;

        this.direction = 0;
        this.listWidth = null;
        this.listHeight = null;
    }


    TouchSwipe.prototype.init = function(){
        if(this.options.show){
            this.setInitSize();
            this.initAddClass();
            this.touchStart();
            this.touchMove();
            this.touchEnd();
        }
    }
    //初始化滑动样式
    TouchSwipe.prototype.setInitSize = function(){

        this.listWidth = _$('.swipe-list').offsetWidth;
        this.listHeight  = _$('.swipe-list').offsetHeight;

        for(var i = 0;i<_$$('.swipe-list').length;i++){

            this.setIndex(_$$('.swipe-list'));

            var index = _$$('.swipe-list')[i].getAttribute('data-index');

            if(this.options.direction == 'X'){
                _$$('.swipe-list')[i].style.webkitTransform = 'translate3d('+(this.listWidth*index)+'px,0px,0px)';
                _$$('.swipe-list')[i].style.transform = 'translate3d('+(this.listWidth*index)+'px,0px,0px)';
            }else if(this.options.direction == 'Y'){
                _$$('.swipe-list')[i].style.webkitTransform = 'translate3d(0px,'+(this.listHeight*index)+'px,0px)';
                _$$('.swipe-list')[i].style.transform = 'translate3d(0px,'+(this.listHeight*index)+'px,0px)';
            }
        }

    }
    //封装触摸监听事件
    TouchSwipe.prototype.touchEvent = function(node,eventType,callback){
        node.addEventListener(eventType,callback);
    }
    //触摸开始
    TouchSwipe.prototype.touchStart = function(){
        var _self = this;

        this.touchEvent(_self.Targetnode,'touchstart',function(e){
            e.preventDefault();

            _self.startDisX = e.touches[0].pageX;
            _self.startDisY = e.touches[0].pageY;
            //获取初始触摸点
        })
    }
    //触摸过程
    TouchSwipe.prototype.touchMove = function(){

        var _self = this,
            result;

        this.touchEvent(_self.Targetnode,'touchmove',function(e){

            e.preventDefault();

            _self.moveStartX = e.touches[0].pageX;
            _self.moveStartY = e.touches[0].pageY;
            //获取移动的触摸点

            _self.moveDisX = _self.startDisX-_self.moveStartX;
            _self.moveDisY = _self.startDisY-_self.moveStartY;
            //计算出手指滑动距离

            if(_self.options.direction == 'X' && Math.abs(_self.moveDisX) > Math.abs(_self.moveDisY)){

                _self.direction = -_self.listWidth*_self.moveCount-_self.moveDisX;
                _self.translate3d(_self.direction,0);

            }else if(_self.options.direction == 'Y' && Math.abs(_self.moveDisX) < Math.abs(_self.moveDisY)){

                _self.direction = -_self.listHeight*_self.moveCount-_self.moveDisY;
                _self.translate3d(0,_self.direction);

            }

            _self.transition(_self.options.transTime,_self.options.transType);

        })

    }
    //触摸结束
    TouchSwipe.prototype.touchEnd = function(){

        var _self = this;

        this.touchEvent(_self.Targetnode,'touchend',function(e){
            e.preventDefault();
            //判断滑动方向
            var moveDis = _self.options.direction == 'X'?_self.moveDisX:_self.moveDisY;
            var moveSingle = _self.options.direction == 'X'?_self.listWidth:_self.listHeight;

             if ( moveDis > _self.autoDis) {

               _self.moveCount++;
               //边界检测
               if(_self.moveCount >= _$$('.swipe-list').length){

                    if(_self.options.direction == 'X'){

                        _self.translate3d(-moveSingle*(_$$('.swipe-list').length-1),0);

                    }else if(_self.options.direction == 'Y'){

                        _self.translate3d(0,-moveSingle*(_$$('.swipe-list').length-1));
                    }

                    _self.transition(_self.options.transTime,_self.options.transType);
                    _self.moveCount = (_$$('.swipe-list').length-1);

                }else{

                    if(_self.options.direction == 'X'){

                        _self.translate3d(-moveSingle*_self.moveCount,0);

                    }else if(_self.options.direction == 'Y'){

                        _self.translate3d(0,-moveSingle*_self.moveCount);
                    }

                    _self.transition(_self.options.transTime,_self.options.transType);
                    _self.addCurClass();
                }
               
            }else if(moveDis < -_self.autoDis){

                _self.moveCount--;

                if(_self.moveCount <= 0){
                    _self.translate3d(0,0);
                    _self.moveCount = 0;
                    _self.addCurClass();
                }
                else{

                    if(_self.options.direction == 'X'){

                        _self.translate3d(-moveSingle*_self.moveCount,0);

                    }else if(_self.options.direction == 'Y'){

                        _self.translate3d(0,-moveSingle*_self.moveCount);
                    }
        
                    _self.transition(_self.options.transTime,_self.options.transType);
                    _self.addCurClass();
                }

            }

        })

    }
    //给滑动设置编号
    TouchSwipe.prototype.setIndex = function(node){
        for(var i = 0;i<node.length;i++){
            node[i].setAttribute('data-index',i);
        }
    }

    //样式处理
    TouchSwipe.prototype.translate3d = function(x,y){

        var _self = this;

        _self.Targetnode.style.webkitTransform = 'translate3d('+x+'px,'+y+'px,0px)';
        _self.Targetnode.style.transform = 'translate3d('+x+'px,'+y+'px,0px)';
    }
    //样式处理
    TouchSwipe.prototype.transition = function(time,type){

        var _self = this;

        _self.Targetnode.style.webkitTransition= 'all '+time+'s '+type+'';
        _self.Targetnode.style.transition = 'all '+time+'s '+type+'';

    }
    //初始激活样式
    TouchSwipe.prototype.initAddClass = function(){
        _$$('.swipe-list')[0].classList.add('cur');
    }
    //添加激活样式
    TouchSwipe.prototype.addCurClass = function(){

        var _self = this;
        for(var i = 0;i<_$$('.swipe-list').length;i++){
            _$$('.swipe-list')[i].classList.remove('cur');
        }
        _$$('.swipe-list')[_self.moveCount].classList.add('cur');
    }

    var $$ = {};
    //类型检测
    var isObj = function (o) {
        return Object.prototype.toString.call(o) === "[object Object]";
    }
    //组件默认参数传递
    $$.extend = function(defaultObj,obj){
        if (isObj(obj)) {
            for (var i in obj) {
                defaultObj[i] = obj[i];
            }
        }
    } 
    //全局暴露组件接口
    window.touchSwipe = function(options){
        var swipe = new TouchSwipe();

        $$.extend(swipe.options,options);

        swipe.init();
    }

})()