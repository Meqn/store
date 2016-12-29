# 时间操作汇总







```js
/**
 * 获取指定时间的时间戳
 * @deadline: ["23:09:00", 24点09分]
 * eg: convertTime("24:00:00") // 返回24点整的时间戳，即 第二天的 00:00:00
 */
function convertTime(deadline){
	var nowDate = new Date();
	var dateArr = deadline.split(':');
	// 分别获取参数中对应的时、分、秒
	var hours = parseInt(dateArr[0]);
	var minutes = parseInt(dateArr[1]);
	var seconds = parseInt(dateArr[2]);
	// 设置对应时分秒
	nowDate.setHours(hours); 
	nowDate.setMinutes(minutes); 
	nowDate.setSeconds(seconds);
	// 获取当前天中指定时分秒对应的毫秒数
	var result = Date.parse(nowDate);
	return result;
}

/**
 * [获取指定时间与当前时间的差]
 * @deadline: ["24:00:00", 24点整]
 * eg: diffTime("24:00:00") // 第二天00:00:00与当前时间的时间差
 */
function diffTime(deadline) {
	var curDate = new Date(),
		nowTime = curDate.getTime(); 	// 获取当前的时间戳
	var disTime = convertTime(deadline) - nowTime;
	return disTime;
}
```