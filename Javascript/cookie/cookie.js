/**
 * cookie.js
 * by: lmq
 * date: 2016/11/07
 */

;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object' && exports) {
        module.exports = factory;
    } else {
        factory(jQuery);
    }
}(function() {
	//
}));