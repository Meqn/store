
# 关于 URI 编码

参考文档：http://www.ruanyifeng.com/blog/2010/02/url_encoding.html

```javascript
escape()

encodeURI(); 	// 编码
decodeURI(); 	// 解码

encodeURIComponent(); 	// 编码
decodeURIComponent(); 	// 解码
```

# 编码函数详解

### 1. escape()

> escape()不能直接用于URL编码，它的真正作用是返回一个字符的Unicode编码值。比如"春节"的返回结果是%u6625%u8282，也就是说在Unicode字符集中，"春"是第6625个（十六进制）字符，"节"是第8282个（十六进制）字符。

```javascript
escape('关键词');
// 输出： "%u5173%u952E%u8BCD"
```

### 2. encodeURI()

> encodeURI()是Javascript中真正用来对URL编码的函数。  
> 它着眼于对整个URL进行编码，因此除了常见的符号以外，对其他一些在网址中有特殊含义的符号"; / ? : @ & = + $ , #"，也不进行编码。编码后，它输出符号的utf-8形式，并且在每个字节前加上%。

```javascript
encodeURI(); 	// 编码
decodeURI(); 	// 解码

// Demo
encodeURI('https://www.baidu.com/s?wd=关键词')
// 输出： https://www.baidu.com/s?wd=%E5%85%B3%E9%94%AE%E8%AF%8D
```

### 3. encodeURIComponent()

> encodeURIComponent() 与encodeURI()的区别是，它用于对URL的组成部分进行个别编码，而不用于对整个URL进行编码。  
> 因此，"; / ? : @ & = + $ , #"，这些在encodeURI()中不被编码的符号，在encodeURIComponent()中统统会被编码。至于具体的编码方法，两者是一样。

```javascript
encodeURIComponent(); 	// 编码
decodeURIComponent(); 	// 解码

// Demo
encodeURIComponent('https://www.baidu.com/s?wd=关键词')
// 输出： https%3A%2F%2Fwww.baidu.com%2Fs%3Fwd%3D%E5%85%B3%E9%94%AE%E8%AF%8D
```

