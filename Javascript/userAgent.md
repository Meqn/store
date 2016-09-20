# 获取终端设备信息


```js
/**
 * [判断终端设备]
 * @type {Object}
 * demo：
 * browser.versions.android === true || false;
 */
var browser = {
    versions: function() {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1,		// IE
            presto: u.indexOf('Presto') > -1,		// opera
            webKit: u.indexOf('AppleWebKit') > -1,	// safari || chrome
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,		// Firefox
            mobile: !! u.match(/AppleWebKit.*Mobile/) || !! u.match(/Windows Phone/) || !! u.match(/Android/) || !! u.match(/MQQBrowser/),		// 移动终端
            ios: !! u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),				// ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,	// Android终端 || uc
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,		// iPhone || QQ HD Browser
            iPad: u.indexOf('iPad') > -1,				// ipad终端
            webApp: u.indexOf('Safari') == -1,			// 是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1,	// 是否微信 （2015-01-22新增）
            sinawb: u.indexOf('weibo') > -1,			// 是否微博
            mqq: u.indexOf('QQ') > -1					//是否QQ
        }
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
```