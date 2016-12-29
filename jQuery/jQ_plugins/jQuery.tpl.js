;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        // AMD 支持
        define(['jquery'], factory);
    } else if (typeof exports === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // Node/CommonJS 支持
        module.exports = factory;
    } else {
        // Browser globals (root is window)
        // 浏览器支持
        factory(jQuery);
    }
}(function ($) {
    //use b in some fashion.

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return {};
}));