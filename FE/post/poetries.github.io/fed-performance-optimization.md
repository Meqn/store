---
title: 图解前端性能优化
date: 2018-01-12 11:24:03
tags: 性能优化
categories: Front-End
---

## 一、css和js的装载与执行

### 1.1 HTML 页面加载渲染的过程

![image.png](http://upload-images.jianshu.io/upload_images/1480597-db7c77d1567a95cd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 1.2 HTML渲染过程的一些特点

![image.png](http://upload-images.jianshu.io/upload_images/1480597-e1e6feedcc2fdb1d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 1.3 css 阻塞和 js 阻塞

#### 1.3.1 CSS阻塞

![image.png](http://upload-images.jianshu.io/upload_images/1480597-508aa2aef18de2b3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 1.3.2 JS阻塞

![image.png](http://upload-images.jianshu.io/upload_images/1480597-d43c8d6cc854ba71.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 二、资源的压缩与合并

### 2.1 文件合并

![image.png](http://upload-images.jianshu.io/upload_images/1480597-bf9c0905ae7544a8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 2.2 css、js 及 HTML压缩

#### 2.2.1 CSS压缩

![image.png](http://upload-images.jianshu.io/upload_images/1480597-b7e0b78856dd41ab.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 2.2.2 JS压缩

![image.png](http://upload-images.jianshu.io/upload_images/1480597-28bca2afc251aaad.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 2.2.3 HTML压缩

![image.png](http://upload-images.jianshu.io/upload_images/1480597-6216398956a2b443.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 2.3 http 清求的过程及潜在的性能优化点

![image.png](http://upload-images.jianshu.io/upload_images/1480597-42ba978daacbdbfd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](http://upload-images.jianshu.io/upload_images/1480597-c228e0f7ea3026a4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 三、图片相关的优化

### 3.1 不同格式图片常用的业务场景

![image.png](http://upload-images.jianshu.io/upload_images/1480597-bb112b24d483508f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 3.2 图片压缩几种方法-雪碧图、Image inline

#### 3.2.1 使用矢量图

![image.png](http://upload-images.jianshu.io/upload_images/1480597-7268251dc26df726.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 3.2.2 在安卓下使用webp

![image.png](http://upload-images.jianshu.io/upload_images/1480597-a2efc91b021b0908.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 四、 懒加载与预加载

### 4.1 懒加载原理

![image.png](http://upload-images.jianshu.io/upload_images/1480597-e224d3c1b30b1166.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 4.2 预加载原理

![image.png](http://upload-images.jianshu.io/upload_images/1480597-15d023ecf8135497.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 4.3 懒加载、预加载使用场景

![image.png](http://upload-images.jianshu.io/upload_images/1480597-32e8e5e65e22520d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-cfb25a3e684a3f63.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-909720cb7fba2464.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-d4d97036deeca145.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 4.4 预加载原生 js 和 PreloadJS 实现

![image.png](http://upload-images.jianshu.io/upload_images/1480597-70497a61965504c1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-d9032f68dce4346a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 五、缓存

![image.png](http://upload-images.jianshu.io/upload_images/1480597-d7d9edfaf5aa7579.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-1dbc343a9ec775eb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-366777492f307674.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-39b360c7512a00a1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-0ace88d37f29a1ff.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-aaea0d655b517f8c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-ded1efe433d4c007.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-0cc71bee891f5d44.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-abe977f4a60605b2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-657b9b61ba419d9b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-a47a8e5fb1099791.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-1b339df2c203a1fe.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 六、重绘与回流

### 6.1 什么是重绘与回流

#### 6.1.1 重绘

![image.png](http://upload-images.jianshu.io/upload_images/1480597-83af5a7aaf32ad70.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 6.1.2 回流

![image.png](http://upload-images.jianshu.io/upload_images/1480597-4bddd29e462cc371.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](http://upload-images.jianshu.io/upload_images/1480597-76cf21bf4a432931.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 6.2 避免重绘回流的两种方法

![image.png](http://upload-images.jianshu.io/upload_images/1480597-4b5d315909066dd8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-f05cb8a0cc10c2a1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-923dc6a9637d50dc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-1c752f8cc61cd4ff.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 6.3 css 性能让 Javacript 变慢？

![image.png](http://upload-images.jianshu.io/upload_images/1480597-cea456689dc81a54.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 6.4 案例解析-重绘、回流及图层

![image.png](http://upload-images.jianshu.io/upload_images/1480597-04085f94a1992a54.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-a08ea0e9ad2ab135.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-16e25f3c65f2d858.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-d8046867832235a6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-4a868eef59433cc4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-14b4d57b2f9a2f78.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-8b044762ba6ed086.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 6.5 实战优化点总结

![image.png](http://upload-images.jianshu.io/upload_images/1480597-897fa5f8ec6a24d4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 七、浏览器存储

### 7.1 cookies

![image.png](http://upload-images.jianshu.io/upload_images/1480597-dd1a4cbc59e979dc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-754f247c65ebb613.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-eef80297b5c5a12c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-fe67b7381cd4f871.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-d098205326c03acf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-0e54d54b577be81d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-317dd9d7b61a0659.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 7.2 LocalStorage、SessionStorage

#### 7.2.1 LocalStorage

![image.png](http://upload-images.jianshu.io/upload_images/1480597-6c8d497e2ba18890.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 7.2.2 SessionStorage

![image.png](http://upload-images.jianshu.io/upload_images/1480597-3aa67b0c1d03ae03.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 7.3 IndexedDB

![image.png](http://upload-images.jianshu.io/upload_images/1480597-4be5537b37c85261.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 7.4 案例解析

![image.png](http://upload-images.jianshu.io/upload_images/1480597-948146becfc107ae.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-beaec4315a195788.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-1ad8d12033872186.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 7.5 PWA与Service Workers

#### 7.5.1 PWA

![image.png](http://upload-images.jianshu.io/upload_images/1480597-85ab5759c2779ef9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 7.5.2 Service Workers

![image.png](http://upload-images.jianshu.io/upload_images/1480597-7b6fa17f0d752474.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-54c4d665cb592c7d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-1aae704c7a32cfd4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 7.6 Service Workers-离线应用

![image.png](http://upload-images.jianshu.io/upload_images/1480597-af1c1d5a7359e24b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![image.png](http://upload-images.jianshu.io/upload_images/1480597-fcff980c6603351b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 八、移动H5前端性能优化指南

![](https://camo.githubusercontent.com/db045941b5adebe26eae1202b9286fe8c39e5fa2/687474703a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f3934383631342d313735326635633839393363633161302e6a7065673f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970253743696d61676556696577322f322f772f31323430)
