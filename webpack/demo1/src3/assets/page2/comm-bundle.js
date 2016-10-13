/*!
 * 这里是打包文件头部注释！
 * 随便写写吧
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	__webpack_require__(5);
	module.exports = __webpack_require__(6);


/***/ },
/* 1 */
/***/ function(module, exports) {

	var util = {
		log: function (msg) {
			document.write(msg);
		},
		sayHello: function () {
			alert("Hello webpack");
		}
	}

	module.exports = util;


/***/ },
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	
	var util = __webpack_require__(1);

	util.log('执行 page2.js');


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	
	var util = __webpack_require__(1);

	util.sayHello();

	console.log('page2_2文件')

/***/ },
/* 6 */
/***/ function(module, exports) {

	
	alert("执行 page2_3.js")

/***/ }
/******/ ]);