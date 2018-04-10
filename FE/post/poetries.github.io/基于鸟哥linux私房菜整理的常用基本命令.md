---
title: 基于鸟哥linux私房菜整理的常用基本命令
date: 2016-04-17 09:19:02
tags: Linux
categories: Back-end
---


**1、显示日期的指令： date**
<!--more-->
![此处输入图片的描述][1]

**2、显示日历的指令：cal**

![此处输入图片的描述][2]
![此处输入图片的描述][3]
![此处输入图片的描述][4]

**3、简单好用的计算器：bc**

![此处输入图片的描述][5]
![此处输入图片的描述][6]

怎么10/100会变成0呢？这是因为bc预设仅输出整数，如果要输出小数点下位数，那么就必须要执行 scale=number ，那个number就是小数点位数，例如：

![此处输入图片的描述][7]

**4、重要的几个热键[Tab],[ctrl]-c, [ctrl]-d** 

- `[Tab]`按键---具有『命令补全』不『档案补齐』的功能

- `[Ctrl]-c`按键---让当前的程序『停掉』

- `[Ctrl]-d`按键---通常代表着：『键盘输入结束(End Of File, EOF 戒 End OfInput)』的意思；另外，他也可以用来取代exit

**5、man**

退出用q，
man -f man

![此处输入图片的描述][8]

**6、数据同步写入磁盘： sync**

输入sync，那举在内存中尚未被更新的数据，就会被写入硬盘中；所以，这个挃令在系统关机戒重新启劢乀前， 径重要喔！最好多执行几次！

![此处输入图片的描述][9]

**7、惯用的关机指令：shutdown**

![此处输入图片的描述][10]

此外，需要注意的是，时间参数请务必加入指令中，否则shutdown会自动跳到 run-level 1 (就是单人维护的登入情况)，这样就伤脑筋了！底下提供几个时间参数的例子吧：

![此处输入图片的描述][11]

重启，关机： reboot, halt,poweroff

![此处输入图片的描述][12]

**8、切换执行等级： init**

- **Linux共有七种执行等级：**

 - --run level 0 :关机

 - --run level 3 :纯文本模式

 - --run level 5 :含有图形接口模式

 - --run level 6 :重新启动

 
使用init这个指令来切换各模式：

如果你想要关机的话，除了上述的shutdown -h now以及poweroff之外，你也可以使用如下的指令来关机：  

![此处输入图片的描述][13]

**9、改变文件的所属群组：chgrp**

![此处输入图片的描述][14]

**10、改变文件拥有者：chown**

他还可以顸便直接修改群组的名称

![此处输入图片的描述][15]

**11、改变文件的权限：chmod**

权限的设定方法有两种， 分别可以使用数字或者是符号来进行权限的变更。

--数字类型改变档案权限：

![此处输入图片的描述][16]

--符号类型改变档案权限：

![此处输入图片的描述][17]


**12、查看版本信息等**

![此处输入图片的描述][18]


**13、变换目录：cd**

![此处输入图片的描述][19]

**14、显示当前所在目录：pwd**

![此处输入图片的描述][20]

**15、建立新目录：mkdir**

![此处输入图片的描述][21]

 
不建议常用-p这个选项，因为担心如果你打错字，那么目录名称就回变得乱七八糟的
 
**16、删除『空』的目录：rmdir**

![此处输入图片的描述][22]

**17、档案与目录的显示：ls**

![此处输入图片的描述][23]
![此处输入图片的描述][24]


**18、复制档案或目录：cp**

![此处输入图片的描述][25]
![此处输入图片的描述][26]
![此处输入图片的描述][27]
![此处输入图片的描述][28]
![此处输入图片的描述][29]
![此处输入图片的描述][30]
![此处输入图片的描述][31]

**19、移除档案或目录：rm**

![此处输入图片的描述][32]
![此处输入图片的描述][33]
![此处输入图片的描述][34]

**20、移动档案与目录，或更名：mv**

![此处输入图片的描述][35]
![此处输入图片的描述][36]

**21、取得路径的文件名与目录名：basename，dirname**

![此处输入图片的描述][37]

**22、由第一行开始显示档案内容：cat**

![此处输入图片的描述][38]
![此处输入图片的描述][39]

**23、从最后一行开始显示：tac（可以看出 tac 是 cat 的倒着写）**

![此处输入图片的描述][40]

**24、显示的时候，顺道输出行号：nl**

![此处输入图片的描述][41]
![此处输入图片的描述][42]
![此处输入图片的描述][43]

**25、一页一页的显示档案内容：more**

![此处输入图片的描述][44]

**26、与 more 类似，但是比 more 更好的是，他可以往前翻页：less**

![此处输入图片的描述][45]

**27、只看头几行：head**

![此处输入图片的描述][46]

**28、只看尾几行：tail**

![此处输入图片的描述][47]

**29、以二进制的放置读取档案内容：od**

![此处输入图片的描述][48]
![此处输入图片的描述][49]

**30、修改档案时间或新建档案：touch**

![此处输入图片的描述][50]
![此处输入图片的描述][51]
![此处输入图片的描述][52]

**31、档案预设权限：umask**

![此处输入图片的描述][53]

**32、配置文件档案隐藏属性：chattr**

![此处输入图片的描述][54]
![此处输入图片的描述][55]
![此处输入图片的描述][56]

**33、显示档案隐藏属性：lsattr**

![此处输入图片的描述][57]

**34、观察文件类型：file**

![此处输入图片的描述][58]

**35、寻找【执行挡】：which**

![此处输入图片的描述][59]
![此处输入图片的描述][60]

**36、寻找特定档案：whereis**

![此处输入图片的描述][61]

**37、寻找特定档案：locate**

![此处输入图片的描述][62]

**38、寻找特定档案：find**

![此处输入图片的描述][63]
![此处输入图片的描述][64]

**39、压缩文件和读取压缩文件：gzip，zcat**

![此处输入图片的描述][65]
![此处输入图片的描述][66]


**40、压缩文件和读取压缩文件：bzip2，bzcat**

![此处输入图片的描述][67]

![此处输入图片的描述][68]

**41、压缩文件和读取压缩文件：tar**

![此处输入图片的描述][69]
![此处输入图片的描述][70]
![此处输入图片的描述][71]
![此处输入图片的描述][72]
![此处输入图片的描述][73]
![此处输入图片的描述][74]
  [12]: http://img.my.csdn.net/uploads/201303/22/1363936158_46941]: http://img.my.csdn.net/uploads/201303/22/1363936145_2758.png


  [58]: http://img.my.csdn.net/uploads/201303/22/1363936923_33797]: http://img.my.csdn.net/uploads/201303/22/1363936910_4210.png


  [1]: http://img.my.csdn.net/uploads/201303/22/1363935954_6311.png
  [2]: http://img.my.csdn.net/uploads/201303/22/1363935980_1369.png
  [3]: http://img.my.csdn.net/uploads/201303/22/1363935990_8670.png
  [4]: http://img.my.csdn.net/uploads/201303/22/1363935996_9522.png
  [5]: http://img.my.csdn.net/uploads/201303/22/1363936042_6658.png
  [6]: http://img.my.csdn.net/uploads/201303/22/1363936054_8908.png
  [7]: http://img.my.csdn.net/uploads/201303/22/1363936069_2896.png
  [8]: http://img.my.csdn.net/uploads/201303/22/1363936109_3235.png
  [9]: http://img.my.csdn.net/uploads/201303/22/1363936120_9820.png
  [10]: http://img.my.csdn.net/uploads/201303/22/1363936132_1780.png
  [11]: http://img.my.csdn.net/uploads/201303/22/1363936145_2758.png
  [12]: http://img.my.csdn.net/uploads/201303/22/1363936183_6281.png
  [13]: http://img.my.csdn.net/uploads/201303/22/1363936183_6281.png
  [14]: http://img.my.csdn.net/uploads/201303/22/1363936198_8642.png
  [15]: http://img.my.csdn.net/uploads/201303/22/1363936213_8090.png
  [16]: http://img.my.csdn.net/uploads/201303/22/1363936248_2355.png
  [17]: http://img.my.csdn.net/uploads/201303/22/1363936259_4661.png
  [18]: http://img.my.csdn.net/uploads/201303/22/1363936285_4549.png
  [19]: http://img.my.csdn.net/uploads/201303/22/1363936297_1247.png
  [20]: http://img.my.csdn.net/uploads/201303/22/1363936306_6088.png
  [21]: http://img.my.csdn.net/uploads/201303/22/1363936321_4240.png
  [22]: http://img.my.csdn.net/uploads/201303/22/1363936353_8065.png
  [23]: http://img.my.csdn.net/uploads/201303/22/1363936364_8540.png
  [24]: http://img.my.csdn.net/uploads/201303/22/1363936378_2040.png
  [25]: http://img.my.csdn.net/uploads/201303/22/1363936391_3459.png
  [26]: http://img.my.csdn.net/uploads/201303/22/1363936405_1275.png
  [27]: http://img.my.csdn.net/uploads/201303/22/1363936421_3936.png
  [28]: http://img.my.csdn.net/uploads/201303/22/1363936434_7475.png
  [29]: http://img.my.csdn.net/uploads/201303/22/1363936447_1389.png
  [30]: http://img.my.csdn.net/uploads/201303/22/1363936473_8128.png
  [31]: http://img.my.csdn.net/uploads/201303/22/1363936488_3487.png
  [32]: http://img.my.csdn.net/uploads/201303/22/1363936513_9642.png
  [33]: http://img.my.csdn.net/uploads/201303/22/1363936523_3283.png
  [34]: http://img.my.csdn.net/uploads/201303/22/1363936534_8970.png
  [35]: http://img.my.csdn.net/uploads/201303/22/1363936546_1932.png
  [36]: http://img.my.csdn.net/uploads/201303/22/1363936558_1163.png
  [37]: http://img.my.csdn.net/uploads/201303/22/1363936571_2352.png
  [38]: http://img.my.csdn.net/uploads/201303/22/1363936609_6282.png
  [39]: http://img.my.csdn.net/uploads/201303/22/1363936621_3423.png
  [40]: http://img.my.csdn.net/uploads/201303/22/1363936634_1541.png
  [41]: http://img.my.csdn.net/uploads/201303/22/1363936651_6458.png
  [42]: http://img.my.csdn.net/uploads/201303/22/1363936671_4557.png
  [43]: http://img.my.csdn.net/uploads/201303/22/1363936684_7797.png
  [44]: http://img.my.csdn.net/uploads/201303/22/1363936710_9067.png
  [45]: http://img.my.csdn.net/uploads/201303/22/1363936728_2729.png
  [46]: http://img.my.csdn.net/uploads/201303/22/1363936748_3301.png
  [47]: http://img.my.csdn.net/uploads/201303/22/1363936798_8160.png
  [48]: http://img.my.csdn.net/uploads/201303/22/1363936808_2619.png
  [49]: http://img.my.csdn.net/uploads/201303/22/1363936819_8586.png
  [50]: http://img.my.csdn.net/uploads/201303/22/1363936832_1025.png
  [51]: http://img.my.csdn.net/uploads/201303/22/1363936847_2396.png
  [52]: http://img.my.csdn.net/uploads/201303/22/1363936857_7179.png
  [53]: http://img.my.csdn.net/uploads/201303/22/1363936868_1680.png
  [54]: http://img.my.csdn.net/uploads/201303/22/1363936877_4715.png
  [55]: http://img.my.csdn.net/uploads/201303/22/1363936886_3351.png
  [56]: http://img.my.csdn.net/uploads/201303/22/1363936897_2939.png
  [57]: http://img.my.csdn.net/uploads/201303/22/1363936910_4210.png
  [58]: http://img.my.csdn.net/uploads/201303/22/1363936932_2949.png
  [59]: http://img.my.csdn.net/uploads/201303/22/1363936932_2949.png
  [60]: http://img.my.csdn.net/uploads/201303/22/1363936946_1973.png
  [61]: http://img.my.csdn.net/uploads/201303/22/1363936956_5666.png
  [62]: http://img.my.csdn.net/uploads/201303/22/1363937757_9288.png
  [63]: http://img.my.csdn.net/uploads/201303/22/1363937773_3082.png
  [64]: http://img.my.csdn.net/uploads/201303/22/1363937784_2757.png
  [65]: http://img.my.csdn.net/uploads/201303/22/1363937793_4694.png
  [66]: http://img.my.csdn.net/uploads/201303/22/1363937802_1953.png
  [67]: http://img.my.csdn.net/uploads/201303/22/1363937816_9269.png
  [68]: http://img.my.csdn.net/uploads/201303/22/1363937900_4463.png
  [69]: http://img.my.csdn.net/uploads/201303/22/1363937990_3354.png
  [70]: http://img.my.csdn.net/uploads/201303/22/1363938001_5653.png
  [71]: http://img.my.csdn.net/uploads/201303/22/1363938031_1319.png
  [72]: http://img.my.csdn.net/uploads/201303/22/1363938044_9852.png
  [73]: http://img.my.csdn.net/uploads/201303/22/1363938052_3223.png
  [74]: http://img.my.csdn.net/uploads/201303/22/1363938061_6833.png
