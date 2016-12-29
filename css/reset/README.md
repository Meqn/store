# reset重置浏览器默认样式

- [x] [normalize.css](./normalize.md)  
- [x] [flexible.css](./flexible.css)  
- [x] [typo.css](./typo.css) 
- [x] [cube解决方案](./cube/)
- [x] [自己的reset](./lmq.css) 
- [x] [自己的mobile reset](./lmq.mobile.css) 


# 默认字体

参考：
http://moxfive.xyz/2015/12/09/css-font-family/
http://aaaaaashu.me/shu/
https://ant.design/docs/spec/font


```css
// cube 方案
/**
* 中文优先使用冬青黑体简体(OS X)、微软雅黑(Windows)和文泉驿微米黑(Linux)
* 西文使用 tahoma
* 1. 防止元素中「font-family」不能继承
* 2. 西文字体和 OS X 字体写在前面
* 3. Opera 12.1 之前版本不支持中文字体的英文名称
* 4. 微软雅黑「\5FAE\8F6F\96C5\9ED1」,中易宋体「\5B8B\4F53」
*/



/**
* 中文
*/
font-chs = "Microsoft YaHei", "Hiragino Sans GB", "WenQuanYi Micro Hei"

/**
* 无衬线字体 sans-serif
*   说明: sans-源于法语前缀，意思为没有。Sans-serif 也就是指无衬线字体。
*   特征: 字体比较圆滑，笔划较为均匀。
*   Arial, Verdana, Tahoma, 微软雅黑都是很常见的无衬线字体;
*/
font-sans = Verdana, "Helvetica Neue", Helvetica, Tahoma, Arial

/**
* 衬线字体 serif 
*   特征: 文字笔划的开始或结束处有额外的装饰，笔划有粗细之分。
*   Times New Roman, Georgia 和宋体都是很常见的衬线字体；
*/
font-serif = Times, Georgia

/**
* 等宽字体 monospace
*/
font-mono = Menlo, Consolas, "Source Code Pro", Inconsolata, Monaco, "Courier New"


// Demo
font-family: "Helvetica Neue", "Helvetica", "PingFang SC","Hiragino Sans GB","Microsoft YaHei","\5FAE\8F6F\96C5\9ED1","WenQuanYi Micro Hei", Arial, sans-serif;

font-family: PingFang SC, Lantinghei SC, Microsoft Yahei, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans;

font-family: 'helvetica neue', arial, 'hiragino sans gb', stheiti, 'wenquanyi micro hei', \5FAE\8F6F\96C5\9ED1, \5B8B\4F53, sans-serif;
  -ms-text-autospace: ideograph-alpha ideograph-numeric ideograph-parenthesis;

// 微信框架weui
font-family: -apple-system-font,Helvetica Neue,Helvetica,sans-serif;
// 微信表达文字样式
font: 13.3333px Arial;
```


# 字体选择

- | 首选字体 | 备用字体 | 次级备用字体
---|---|---|---
中文 | PingFang SC | Hiragino Sans GB | Microsoft YaHei
英文 | Helvetica Neue | Helvetica | Arial 

**内容字体**
```
"Helvetica Neue", "Helvetica", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
```

**代码字体**

```
Consolas,Menlo,Courier,monospace
```



# 各平台下的字体

#### 桌面端 Mac, Windows, Linux 上适合网页显示的优秀中文字体

Mac | Windows | Linux
---|---|---
冬青黑体 Hiragino Sans GB | 中易宋体 SimSun | 文泉驿微米黑 WenQuanYi Microhei
黑体-简（华文黑体） Heiti SC (STHeiti) | 微软雅黑 Microsoft YaHei | -
宋体-简（华文宋体） Songti SC (STSong) | - | 


#### 移动端 iOS, Android 上适合网页显示的优秀中文字体

iOS | Android | winphone
---|---|---	
黑体-简（华文黑体） Heiti SC (STHeiti) | 思源黑体 Noto Sans CJK SC | 方正等线体 Dengxian
- | Droid Sans Fallback | Segoe


#### 主流操作系统上适合网页显示的优秀西文字体

无衬线 | 衬线 | 等宽
---|---|---	
Lucida Grande | Georgia | Menlo
Helvetica Neue | Times New Roman | Courier
Arial | - | -





# 字体英文名

> 一些常见中文字体的对应英文名。

- | 中文名 | 英文名
---|---|---
1 | 苹方 | PingFang SC
2 | 冬青黑/苹果丽黑 | Hiragino Sans GB
3 | 思源黑体 | Source Han Sans CN
4 | 华文细黑 | STHeiti Light [STXihei]
5 | 华文黑体 | ST Heiti
6 | 华文楷体 | STKaiti
7 | 华文宋体 | STSong
8 | 华文仿宋 | STFangsong
9 | 丽黑 | Pro LiHei Pro Medium
10 | 丽宋 | Pro LiSong Pro Light
11 | 标楷体 | BiauKai
12 | 苹果丽中黑 | Apple LiGothic Medium
13 | 苹果丽细宋 | Apple LiSung Light
14 | 新细明体 | PMingLiU
15 | 细明体 | MingLiU
16 | 标楷体 | DFKai-SB
17 | (中易)黑体 | SimHei
18 | 宋体 | SimSun
19 | 新宋体 | NSimSun
20 | 仿宋 | FangSong
21 | 楷体 | KaiTi
22 | 仿宋_GB2312 | FangSong_GB2312
23 | 楷体_GB2312 | KaiTi_GB2312
24 | 微软正黑体 | Microsoft JhengHei
25 | 微软雅黑 | Microsoft YaHei
26 | 隶书 | LiSu
27 | 幼圆 | YouYuan
28 | 华文中宋 | STZhongsong
29 | 方正舒体 | FZShuTi
30 | 方正姚体 | FZYaoti
31 | 华文彩云 | STCaiyun
32 | 华文琥珀 | STHupo
33 | 华文隶书 | STLiti
34 | 华文行楷 | STXingkai
35 | 华文新魏 | STXinwei
36 | 文泉驿微米黑 | Wenquanyi Micro Hei
37 | 文泉驿正黑 | WenQuanYi Zen Hei
38 | 文泉驿点阵正黑 | WenQuanYi Zen Hei Sharp


![字体英文名](https://raw.githubusercontent.com/mengqing723/codeStore/master/css/reset/font_name.png)
