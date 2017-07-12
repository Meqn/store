(function(global, factory) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory()
    } else if (typeof define === 'function' && define.amd) {
        define(factory)
    } else {
        global['DrawClick'] = factory()
    }
}(this, function() { 'use strict';

  function Clock(canvas, options) {
    if (typeof canvas === 'string') {
      canvas = document.querySelector(canvas)
    }
    if (!canvas || !canvas.getContext) {
      console.error('not found canvas element')
      return false;
    }
    this.ctx = canvas.getContext('2d')
    this.width = this.ctx.canvas.width
    this.height = this.ctx.canvas.height
    this.r = this.width / 2
    this.init(options)
  }

  Clock.prototype.create = function (ctx, r, hour, minute, second) {
        ctx.save();   //保存当前画布样式
        ctx.translate(r, r);    //切换中心点
        
        //画外圆
        ctx.beginPath();
        ctx.lineWidth = 10;
        var grd = ctx.createLinearGradient(-120, -120, 0, 0);
        grd.addColorStop(0, "rgb(120,120,120)");
        grd.addColorStop(1, "rgb(30,30,30)");
        ctx.strokeStyle = grd;
        ctx.arc(0, 0, r - 8, 0, 2 * Math.PI, false);
        ctx.stroke();

        //画外圆投影
        ctx.beginPath();
        ctx.lineWidth = 16;
        var grd = ctx.createRadialGradient(0, 0, r - 24, 0, 0, r + 5);
        grd.addColorStop(0, "rgb(255,255,255)");
        grd.addColorStop(1, "rgb(150, 150, 150)");
        ctx.strokeStyle = grd;
        ctx.arc(0, 0, r - 20, 0, 2 * Math.PI, false);
        ctx.stroke();
        //画时刻
        for (var i = 0; i < 60; i++) {
          var rad = 2 * Math.PI / 60 * i;
          var x = Math.cos(rad) * (r - 26);
          var y = Math.sin(rad) * (r - 26);
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2, false);
          if (i % 5 == 0) {
            ctx.fillStyle = "#ddd";
            ctx.fill();
          }
        }

      //画时针
        ctx.save();
        ctx.beginPath();
        var rad = 2 * Math.PI / 12 * hour + ((2 * Math.PI / 12) * (minute + second / 60) / 60); //将分，秒换算成小时
        ctx.rotate(rad);
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 8;
        ctx.lineCap = "round";
        ctx.moveTo(0, 10);
        ctx.lineTo(0, -r / 2);
        ctx.stroke();
        ctx.restore();  //返回上一个画布样式
      
      //画分针
        ctx.save();
        ctx.beginPath();
        var rad = 2 * Math.PI / 60 * minute + (2 * Math.PI / 60) * (second / 60);//将秒换算成分
        ctx.rotate(rad);
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.moveTo(0, 15);
        ctx.lineTo(0, -(r - 40));
        ctx.stroke();
        ctx.restore();
      
      //画秒针
        ctx.save();
        ctx.beginPath();
        var rad = 2 * Math.PI / 60 * second;
        ctx.rotate(rad);
        ctx.strokeStyle = "rgb(200, 0, 0)";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.moveTo(0, 20);
        ctx.lineTo(0, -(r - 25));
        ctx.stroke();
        ctx.restore();

      //画圆心
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle ="#fff";
        ctx.arc(0,0,4,0,Math.PI*2,false);
        ctx.fill();
        ctx.restore();
  }

  Clock.prototype.draw = function (hour, minute, second) {
    this.ctx.clearRect(0, 0, this.width, this.height);  //清空整个画布
    this.create(this.ctx, this.r, hour, minute, second);
    this.ctx.restore();
  }
  Clock.prototype.init = function (options) {
    var now = new Date()
    var opts = Object.assign({}, {
      hour: now.getHours(),
      minute: now.getMinutes(),
      second: now.getSeconds()
    }, options)
    this.draw(opts.hour, opts.minute, opts.second)
  }

  return {
    create: function(el, options) {
      return new Clock(el, options)
    }
  }


}))