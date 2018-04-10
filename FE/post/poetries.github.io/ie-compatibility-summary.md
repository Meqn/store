---
title: IE6下常见的兼容性问题
date: 2017-02-07 11:10:43
tags: 
  - CSS
  - csshack
categories: Front-End
---


#### 常见问题一：在Ie6下，内容会把父元素设置好的宽高撑开。计算一定要精确
---

```css
.box{
    width:400px;
}
.left{
    width:200px;
    height:210px;
    background:red;
    float:left
}
.right{
    width:200px;
    float:right;
    overflow:hidden;
}
.div{
    width:180px;
    height:180px;
    background:blue;
    padding:25px;
}
```

```html
<div class="box">
	<div class="left"></div>
	<div class="right">
		<div class="div"></div>
	</div>
</div>
```


![](http://7xq6al.com1.z0.glb.clouddn.com/1-1.png)

![](http://7xq6al.com1.z0.glb.clouddn.com/1-2.png)

<!--more-->
#### 常见问题二：在IE6元素浮动，如果宽度需要内容撑开，里面块级元素的内容也要加浮动
---

```css
.box{
    width:400px;
}
.left{
    background:red;
    float:left;
}
.right{
    background:blue;
    float:right;
}
h3{
    height:30px;
    float:left;
}
 ```
 
 ```html
 <div class="box">
   <div class="left">
      <h3>左侧</h3>
   </div>
   <div class="right">
      <h3>右侧</h3>
   </div>
</div>
```

![](http://7xq6al.com1.z0.glb.clouddn.com/2-1.png)

![](http://7xq6al.com1.z0.glb.clouddn.com/2-2.png)

---

#### 常见问题三：p里面不要套用p标签或者标题标签
---

![](http://7xq6al.com1.z0.glb.clouddn.com/3-1.png)

#### 常见问题四：IE6下最小高度问题
---

- 当`height<19px`的时候会被当作19px来处理

- 解决办法：`overflow:hidden`

```html
.box{
    height:2px;
    background:red;
    overflow:hidden
}

<div class="box"></div>
```

![](http://7xq6al.com1.z0.glb.clouddn.com/4-1.png)


#### 常见问题五：`border:1px dotted `; `IE6`不支持
---

- 解决办法：切背景平铺

```html
.box{
    width:100px;
    height:100px;
    border:1px dotted red;
    margin:100px auto;
}
        
<div class="box"></div>
```
![](http://7xq6al.com1.z0.glb.clouddn.com/5-1.png)

![](http://7xq6al.com1.z0.glb.clouddn.com/5-2.png)


#### 常见问题六：IE6下，父元素用边框，子元素的margin会消失 
---

- 解决办法：触发父元素的`haslayout`;

```css
.box{
    background:red;
    border:1px solid red;
    zoom:1;
    /*padding:1px;*/
}
.div{
    width:200px;
    height:200px;
    background:blue;
    margin:100px
}
```

```html
<div class="box">
	<div class="div"></div>
</div>
 ```
 
 ![](http://7xq6al.com1.z0.glb.clouddn.com/6-1.png)
 
 ![](http://7xq6al.com1.z0.glb.clouddn.com/6-2.png)
  

#### 常见问题七：`IE6`双边距`bug`：横向的`margin`值会被放大为两倍
---

- 解决方法：`display:inline`;

```html
.box{
    width:200px;
    height:200px;
    background:red;
    float:left;
    margin:100px;
    display:inline;
}
        
<div class="box"></div>
```

![](http://7xq6al.com1.z0.glb.clouddn.com/7-1.png)

![](http://7xq6al.com1.z0.glb.clouddn.com/7-2.png)

---


#### 常见问题八：IE6下外边距消失：当父元素的宽度和一行内容的宽度的差别`>3px`的时候 
---

- IE6双边距bug：横向的`margin`值会被放大为两倍
- 解决方法：`display:inline;`

```html
.box{
    float:left;
    border:10px solid #000;
    width:600px;
}
.box div{
    width:100px;
    height:100px;
    background:red;
    margin:20px;
    border:5px solid blue;
    float:left;
    display:inline;
}
<div class="box">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>3</div>
</div>
```

![](http://7xq6al.com1.z0.glb.clouddn.com/8-1.png)

![](http://7xq6al.com1.z0.glb.clouddn.com/8-2.png)


#### 常见问题九：`IE6，7`下 `li`本身没有浮动，但是`li`里面的内容有浮动，每个`li`下边就会产生一个间距
---

- 解决办法：
  - 1、给`li`添加 `vertical-align:top`
  - 2、给`li`添加浮动

```css
ul{
    width:
}
li{
    list-style:none;
    height:30px;
    border:1px solid #000;
    /*vertical-align:top*/;float:left;
}
a{
    width:100px;
    height:30px;
    float:left;
    background:red;
}
span{
    width:100px;
    height:30px;
    float:right;
    background:blue;
}
 ```

```html
<ul>
    <li>
        <a href="#"></a>
        <span></span>
    </li>
    <li>
        <a href="#"></a>
        <span></span>
    </li>
    <li>
        <a href="#"></a>
        <span></span>
    </li>
    <li>
        <a href="#"></a>
        <span></span>
    </li>
    <li>
        <a href="#"></a>
        <span></span>
    </li>
<ul>
```

![](http://7xq6al.com1.z0.glb.clouddn.com/9-1.png)

![](http://7xq6al.com1.z0.glb.clouddn.com/9-2.png)



#### 常见问题十：IE6，7下面让两个块级元素在一行内显示 都用浮动
---

```html
<div class="box">
	<div class="left"></div>
	<div class="right"></div>
</div>
```

```css
*{margin:0px;padding:0px;}
.left{
    width:100px;
    height:100px;
    float:left;
    background:red;
}
.right{
    width:200px;
    height:100px;
    background:blue;
    float:left;/*margin-left:100px;*/
}
```		


#### 常见问题十一：IE6下的文字溢出
---

> 子元素的宽度和父元素的宽度相差小于3px的时候，两个浮动元素之间有注释或者行内元素的时候

- 解决办法：用div把注释和行内元素包裹起来

```css
*{margin:0px;padding:0px;}
.box{
    width:400px;
}
.left{
    float:left;
}
.right{
    width:400px;
    float:right
}
```

```html
<div class="box">
    <div class="left"></div>
    <div><!--IE6下的文字溢出--><span></span><span></span><span></span></div>
    <div class="right">@poetries</div>
</div>
```

#### 常见问题十二：IE6下，当浮动元素和绝对定位元素是并列关系的时候，绝对定位元素会消失
---

- 解决办法：给定位元素外面包一个div

```css
*{margin:0px;padding:0px;}

.box{
    width:200px;
    height:200px;
    border:1px solid #000;
    position:relative;
}
ul{
    width:150px; 
    height:150px;
    background:red;
    float:left;
    margin:0 0 0 50px;
}
span{
    width:50px;
    height:50px;
    background:blue;
    position:absolute;
    right:-20px;
    top:0;
}
```

```html
<div class="box">
	<ul></ul>
	<div><span></span></div>
</div>
```

#### 常见问题十三：IE67下，子元素有相对定位属性，父元素的overflow包不住子元素
---

- 解决办法：给父元素也添加相对定位属性

```css
*{margin:0px;padding:0px;}
.box{
    width:200px;
    height:200px;
    border:1px solid red;
    overflow:auto;
    position:relative;
}
.con{
    width:150px;
    height:300px;
    background:blue;
    position:relative;
}
```		

```html
<div class="box">
	<div class="con"></div>
</div>
```



#### 常见问题十四：IE6下，绝对定位的父元素的宽高为奇数的时候，元素的right和bottom值会有1px的偏差
---

```css
*{margin:0px;padding:0px;}
.box{
    width:201px;
    height:201px;
    border:1px solid red;
    position:relative;
}
span{
    width:20px;
    height:20px;
    background:blue;
    position:absolute;
    right:-1px;bottom:-1px;
}
```

```html
<div class="box">
	<div><span></span></div>
</div>
```

#### 常见问题十五：IE6不支持固定定位  css没办法解决
---

```css
*{margin:0px;padding:0px;}/*去除默认外边距、内边距*/

.box{
    width:100px;
    height:100px;
    background:red;
    position:fixed;
    left:50px;
    top:100px;
}
```
```html
div class="box"></div>
```

#### 常见问题十六：IE6 7下，输入类型的表单控件上下各有1px间隙
---

- 解决办法：给input加浮动

```css
*{margin:0px;padding:0px;}
.box{
    width:200px;
    height:32px;
    border:1px solid red;  
}
input{
    width:100px;
    height:28px;
    padding:0;
    float:left;
}
```

```html
<div class="box">
	<input type="text"/>
</div>
```


#### 常见问题十七：IE6 7下，输入类型的表单控件加border:none没用
---

- 解决办法：
    - 1、border:0;
    - 2、给input添加背景颜色

```css
*{margin:0px;padding:0px;}
.box{
    width:200px;
    height:32px;
    border:1px solid red;  
}
input{
    width:100px;
    height:28px;
    padding:0;
    float:left;
    border:none;
    background:#fff;
}
```

```html
<div class="box">
	<input type="text"/>
</div>
```


#### 常见问题十八：
---

> - 1、输入类型的表单控件添加背景图片url和no-repeat之间一定要有空格
> - 2、输入文字时候，背景图片会跟着移动

- 解决办法：2、给背景图片固定定位，但是在IE7下 背景图片显示会错误
- 最佳办法：把背景图添加给父元素


```css
*{margin:0px;padding:0px;}
.box{
    width:200px;
    height:32px;
    border:1px solid red; 
    background:url(ball.png) no-repeat; 
}
input{
    width:100px;
    height:30px;
    padding:0;
    float:left;
    border:none;
    background:none;
    /*background:#fff url(ball.png) no-repeat fixed;*/
}
```
```html
<div class="box">
	<input type="text"/>
</div>
```

#### 常见问题十九：IE6不支持tbody
---

```css
*{margin:0px;padding:0px;}
table{
    width:200px;
    border-collapse:collapse;
    background:red;
}
tbody{
    background:blue;
}
tr{
    background:url(ball.png) no-repeat;
}
td{
    height:20px;
}
```

```html
<table>
	<tr>
		<td>表格</td>
	</tr>
</table>
```