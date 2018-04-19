





## 布局

display, float, position

1. float
2. flexbox 弹性盒子
3. grid 网格布局




### 1. 水平垂直居中

```css
/** 1. Flex
 */
.wrap{
	display: flex;
	justify-content: center;
	align-content: center;

	.center{}
}
/** 2. 定位
 * 子元素宽高固定，可使用 margin 负值
 */
.wrap{
	position: relative;

	.center{
		position: absolute; top: 50%; left: 50%;
		transform: translate(-50%, -50%);
	}
}
/** 3. table-cell
 */
.wrap{
	display: table-cell;
	text-align: center; vertical-align: middle;

	.center{
		display: inline-block;
	}
}
/** 4. vertical-align: middle
 */
.wrap{
	font-size: 0;
	text-align: center;

	&::before{
		content: "";
		display: inline-block; vertical-align: middle;
		width: 0; height: 100%;
	}
	.center{
		display: inline-block; vertical-align: middle;
	}
}
```



### 2. 两栏布局

```scss
// .cell 等宽等高  //高度会自动占满
.table{
    display: table;
    
    .cell{
        display: table-cell;
    }
}
```






## 层叠上下文





## BFC





