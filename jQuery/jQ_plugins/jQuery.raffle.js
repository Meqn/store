;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD 支持
        define(['jquery'],factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS 支持
        module.exports = factory;
    } else {
        // 浏览器支持
        factory(jQuery);
    }
}(function ($) {
    /**
     * @function : 抽奖类
     * @config : 抽奖类的配置参数
     * */
    var Raffle = function (config) {
        var defaults = {
            index: 1,           //当前亮区位置
            speed: 300,         //初始速度
            Time: null,         //定义对象
            EndIndex: 1,        //决定在哪一格变慢
            cycle: 0,           //转动圈数
            EndCycle: 4,        //计算圈数
            flag: false,        //结束转动标志
            random_num: 1,      //中奖编号ID
            quick: 0,            //步数
            succCB : function(){} //成功后执行的回调函数
        };

        this.settings = $.extend({}, defaults, config) || defaults;
    };
    var $ok = $("#ok"),
        $randomBox = $("#random_box"),
        $randomLis = $randomBox.find("li"),
        arr_length = $randomLis.length;
    /**
     * 私有方法,指定概率获得结果
     * @m: 概率的基数。
     * */
    var getRandomNum = function (m) {
        m = m || 10;
        var randomNum = Math.floor(Math.random() * m + 1);

        if (randomNum === 1) {
            return 2;
        } else if (randomNum > 1 && randomNum < 5) {
            var arr1 = [4, 6, 8, 10, 12, 14];
            return arr1[Math.floor(Math.random() * arr1.length)];
        } else {
            var arr2 = [1, 3, 5, 7, 9, 11, 13];
            return arr2[Math.floor(Math.random() * arr2.length)];
        }
    };

    /**
     * @function : 抽奖类的初始化操作.
     * @num : 指定中奖的id编号.
     * */
    Raffle.prototype.init = function (num) {

        //$ok->抽奖按钮,$randomBox->ul容器
        var _this = this;
        //禁止多次单击抽奖按钮.
        $ok.attr("data-status", "disable");
        //取消选中
        $randomBox.find("li").removeClass("random_current");
        //将执行环境设置为_this.settings
        with (_this.settings) {
            /**
             * 执行抽奖后，这些参数将发生改变，初始化的时候，将这些值设为默认值.
             * 更研究的做法是，做一份settings的copy,这样初始化用我们指定的值，而不是硬编码.
             */
            random_num = +num || getRandomNum(10000);
            index = 1;
            cycle = 0;
            flag = false;

            //让选中ID的后5格变慢.
            if (random_num > 5) {
                EndIndex = random_num - 5;
            } else {
                EndIndex = random_num + arr_length - 5;
            }
            //console.log(this);
            Time = setInterval(function () {
                //console.log(this); //为什么this指向window？为什么会改变执行上下文,因为setInterval的调用者是window对象
                _this.run();
            }, speed);
        }
    };

    /**
     * @function ：抽奖类的核心方法,运行该方法将执行抽奖操作.
     * */
    Raffle.prototype.run = function () {
        var _this = this;

        with (_this.settings) {
            //跑马灯变速
            if (flag == false) {
                //当步进为5时模拟加速
                if (quick == 5) {
                    clearInterval(Time);
                    speed = 50;
                    Time = setInterval(function () {
                        _this.run();
                    }, speed);
                }
                //跑EndCycle圈减速
                if (cycle == EndCycle && index == (EndIndex + 1 )) {
                    clearInterval(Time);
                    speed = 300;
                    flag = true;         //触发结束
                    Time = setInterval(function () {
                        _this.run();
                    }, speed);
                }
            }

            if (index > arr_length) {
                index = 1;
                cycle++;
            }

            //index为当前的格子,prevIndex为当前的前一个格子。
            if (index > 1)
                prevIndex = index - 1;
            else {
                prevIndex = arr_length;
            }

            $randomLis.eq(index - 1).addClass('random_current'); //设置当前选中样式
            $randomLis.eq(prevIndex - 1).removeClass('random_current'); //取消上次选择样式

            //结束转动并选中号码
            if (flag == true && index == parseInt(random_num)) {
                $ok.attr("data-status", "");
                quick = 0;
                succCB.call(this,arguments);
                clearInterval(Time);
            }

            index++;
            quick++;
        }
    };

    //把变量赋值给jquery，避免暴露在全局变量。
    $.Raffle = Raffle;
}));