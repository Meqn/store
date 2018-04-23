源自：https://github.com/icepy/we-writing/issues/12


# 目录

[TOC]





这是很久很久之前想写的东西，拖了五六个月，没有动笔，现今补齐，内容有些多，对初学者有用，错误之处，望指出。



## 理解作用域

理解作用域链是Js编程中一个**必须**要具备的，作用域决定了变量和函数有权力访问哪些数据。在Web浏览器中，全局执行环境是window对象，这也意味着所有的全局变量或者方法都是window对象的属性或方法。当一个函数在被调用的时候都会创建自己的执行环境，而这个函数中所写的代码就开始进入这个函数的执行环境，于是由变量对象构建起了一个作用域链。

```
var wow = '魔兽世界';
var message = function(){
    var _wow = '123';
}
```

在这个例子中全局环境中包含了两个对象（全局环境的变量对象不算），window.wow和window.message，而这个message函数中又包含了两个对象，它自己的变量对象（其中定义了arguments对象）和全局环境的变量对象。当这个函数开始执行时，message自己的变量对象中定义了_wow，而它的全局环境的变量对象有wow，假设在message中alert一下wow，实际上是message中包含的全局环境的变量对象.wow，于是可以访问。

```
var wow = '123';
var message = function(){
    var wow = '456';
}
```

如果执行message函数alert一下wow，它的作用域是这样开始搜索的，先搜索message自己的变量对象中是否存在wow，如果有就访问并且立马停止搜索，如果没有则继续往上访问它，有wow，则访问并且立马停止搜索，以此类推一直搜索到全局环境上的变量对象，如果这里都没，恭喜你，这里要抛错了。

```
var c = '123';
var message = function(){
    var g = '123';
    var a = function(){
        var d = '123';
    }
}
```

在这个例子中包含有三个执行环境，全局环境，message的环境，a的环境。从这里可以看出message自身包含两个对象，自己的变量对象和全局环境中的变量对象，而函数a则包含了三个，自身的变量对象，message的变量对象和全局变量对象。

当开始执行这个函数时，在函数a中可以访问到变量g，那是因为函数a包含了message的变量对象，于是在自身没有开始搜索上一级的变量对象时发现了，于是可以访问。那么访问c的原理也是如此，当自身和上一级的message的变量对象都没有，但是全局变量对象中存在，于是访问成功。

了解这个作用域，对于Js编程是至关重要的，不然可能会出现，明明想要的预期结果是123，但是变成了456，为什么？那就是因为一级一级的搜索，可能会存在覆盖，或者搜索到别的地方就立即停止搜索了。

## 理解引用类型

引用类型虽然看起来和类很相似，但是它们却是不同的概念，引用类型的值，也就是对象是引用类型的一个实例。在Js中引用类型主要有Object，Array，Date，正则，Function等。

Object和Function在后面详细复述。

**Array**

在Js中数组可以存储任意的数据，而且它的大小是可以动态调整的类似于OC中的NSMutableArray。创建数组可以使用构造函数的方式也可以使用字面量的形式，另外可以使用concat从一个数组中复制一个副本出来。数组本身提供了很多方法让开发者使用来操作数组。

- length 数组的长度
- toString 可以返回一个以，拼接的字符串，相当于是调用了下join(',')
- join 可以用一个分割符来拼接成一个字符串
- push 添加一个数据到数组的末端
- pop 删除数组中的最后一项，有返回值
- shift 删除数组的第一项，有返回值
- unshift 添加一个数据到数组的首端
- reverse 倒序
- sort 可以传入一个排序的函数
- slice 可以基于当前数组返回一个新的数组，接收两个参数，返回项的起始位置和结束位置
- splice 可以传入N个参数，第一个参数表示要删除，插入或则替换的位置，第二个参数表示要删除的项数，第三个到第N个表示要插入或则替换的数据

**Date**

时间对象也是使用非常多的玩意，它是使用GMT时间来描述，而且时间对象是可以直接比对大小的。

```
var date1 = new Date(2015,1,2);
var date2 = new Date(2015,1,10);    
date1 < date2  
```

常用的方法

- getTime 获取时间对象的毫秒数
- setTime 设置时间对象的毫秒数，会改变日期
- getFullYear 获取时间对象的年（2015）
- getMonth 获取时间对象的月（需要加1）
- getDay 获取日期的星期几（0-6）星期天到星期六
- getDate 获取日期的天数
- getHours 获取当前日期的小时
- getMinutes 获取当前日期的分钟数
- getSeconds 获取当然日期的秒数

上面看起来都是获取，当然也有设置，只是相应的get置换成set即可。

**正则表达式**

在Js里正则表达式是用RegExp类型来支持的，关于正则可以看看之前写的一篇文章，用python来描述的如何读懂正则。

Js也支持三种模式，gim，表示全局，不区分大小写，多行。

一般来说很少有人这么使用var xxx = new RegExp()，而是用字面量的方式，比如var xx = /[bc]/gi;像用的比较多的方法有exec用于捕获包含第一个匹配项的数组，没有则返回null。test，用于判断，如果匹配返回true，不匹配返回false。

**处理字符串**

在Js中还有一种叫做包装类型的玩意，正因为此所以处理一些基本数据类型，比如字符串时，有很多方法可以使用。

- concat 可以将一个或者多个字符串拼接起来，返回一个新的字符串
- slice 接收两个参数，起始位置和结束位置，返回一个新的字符串
- substr和substring和slice一样，唯一的不同是substr第二个参数是返回字符串的个数
- indexOf 从头开始查询字符串，存在会返回它所在的位置，没有返回－1
- lastIndexOf 从最后开始查询字符串
- toUpperCase 转大写
- toLowerCase 转小写
- match 正则表达式使用跟exec一样
- search 正则表达式使用，查询到返回一个位置，没有返回－1
- replace 替换，第一个参数可以是正则表达式也可以是字符串，第二个参数是要替换的字符串
- localeCompare比较字符串，如果字符串相等返回0，如果字符串的字母排在参数字符串之前，返回负数，如果是之后，返回正数。

## 函数

- [Function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions)

说起来Js的核心是什么？那就是函数了。对于函数主要是理解它的几个概念。

- 它可以当值来传递，没有重栽。
- 声明的时候，比如function a(){} var a = function(){} 执行时会有区别
- 函数内部的参数arguments包含了传入的所有参数
- this，表示在这个函数内的作用域，以及prototype

## 理解匿名函数和闭包

匿名函数又叫拉姆达函数，主要是在把函数当值传递的时候用，或者是把函数当返回值，比如：

```
function d(callback){
    callback();
}
d(function(){
    alert('123')
});

//或者

function b(){
    return function(){
        alert('123');
    }
}
var g = b();
g();
```

其实第二种方式跟闭包的意义一样了，所谓的闭包书面的解释是可以访问另一个函数作用域内变量的函数，稍微改写一下可能会更明显。

```
function b(){
    var name = '123';
    return function(){
        alert(name);
    }
}
var g = b();
g();
```

从这里可以看出来return的函数可以访问到name，而外部却不行，这个返回值的函数就可以理解为闭包。理解闭包还可以看一个经典的求值的例子。

```
function save_i(){
    var a = [];
    for(var i = 0;i<10;i++){
        a[i] = function(){
            return i;
        }
    }
    return a;   
}

var c = save_i();
for(var i = 0;i<10;i++){
    alert(c[i]());
}
```

从这个例子上来看，我们想得到的结果是10次循环a[i]保存着一个闭包，然后alert出从0到10，但是结果很出人意料，全部是10，为什么？哪里理解的不对呢？a[i]明明是内部函数，然后让它访问另外一个函数作用域内的变量i。

个人觉得可以这样去分析问题，在客户端执行Js时有一个全局执行环境，指向的是window对象。而所谓的对象也就是引用类型，实际上在后台执行环境中，它就是一个指针。

回到Js当代码在执行的时候，会创建变量对象并且构建一个作用域链，而这个对象保存着当前函数可以访问的对象。

```
window
    ->save_i
        ->this|argument
        ->a
        ->i
        ->看不见的a[0]-a[10]
        ->a[0]function(){}
            ->i
    ->c
```

上述的i和a[0]里的i是同一个i，那么结果就是10。

进一步处理

```
function save_i(){
    var a = [];
    for(var i = 0;i<10;i++){
        a[i] = function(k){
            return function(){
                return k;
            };
        }(i)
    }
    return a;   
}

var c = save_i();
for(var i = 0;i<10;i++){
    console.log(c[i]());
}
```

接着按上面的节奏来分析

```
window
    ->save_i
        ->this|argument
        ->a
        ->i
        ->看不见的a[0]-a[10]
        ->a[0]function(){}
            ->k
            ->function(){}
                ->k

    ->c
```

什么是传参？按值传递，相当于是在那个立即执行的函数中创建了一个新的地址和空间，虽然值是一样的，但是每一个k又是不同的，所以得到的结果正好满足了我们的预期。

本来正常情况下save_i执行完毕后就要销毁，但是内部的闭包被包含在这个作用域内了，所以save_i没法销毁，从这里可以看的出来闭包会带来内存的问题，因为用完之后没法销毁，如果不注意的话。

那么用完之后只能设置为null来解除引用，等着自动销毁把内存回收。

## Object

JavaScript的所有对象都衍生于Object对象，所有对象都继承了Object.prototype上的方法和属性，虽然它们可能会被覆盖，熟悉它对于编程能起到很大的作用，也能比较深刻的了解JavaScript这门语言。

[Object](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)

创建一个对象可以使用new，也可以使用快速创建的方式：

```
var _object = {};
```

_object对象中就可以使用Object.prototype中所有的方法和属性，虽然看起来它是空的。说到这里在编程中常常有一个非常有用的需求，如何判断一个对象是空对象。

这是zepto中的判断一个对象是否是空对象，常常使用：

```
$.isEmptyObject = function(obj) {
        var name
        for (name in obj) return false
        return true
}
```

也顺便看了下jQuery原理是一模一样的：

```
isEmptyObject: function( obj ) {
    var name;
    for ( name in obj ) {
        return false;
    }
    return true;
}
```

使用in操作符来实现，它不会遍历到父原型链。

constructor返回一个指向创建了该对象的函数引用，这个东西主要是可以用来识别（类）到底是指向哪里的。

defineProperty直接在一个对象上定义一个新属性，非常适合用于动态构建，传入三个参数［动态添加对象的目标对象，需要定义或被修改的属性名，需要定义的对象］，在第三个参数中可以有些属性来表示是否继承（**proto**），要不要定义get，set方法，enumerable是否可枚举。

defineProperties跟上述defineProperty一样，但是它可以添加多个。

getOwnPropertyNames返回一个由指定对象的所有属性组成的数组

keys返回一个数组包括对象所有的属性（可枚举）

> keys是经常会用到的一个属性，它只能包可枚举的，如果想获取一个对象的所有属性包括不枚举的，那么使用getOwnPropertyNames。

hasOwnProperty用于判断某个对象是否包含有自身的属性，这个方法常常用于检测对象中的属性是否存在，它只检测自身，对于继承过来的都是false，这一点是非常重要的理解。

isPrototypeOf 用于检测一个对象是否在另一个对象的原型链上，比如有两个对象是互相交互的，常常会使用它来进行检测。

propertyIsEnumerable这个方法也比较重要，返回一个布尔值，检测一个对象的自身属性是否可以枚举

> 可枚举的理解，也就是对象的属性可枚举，它的属性值不可以修改，但是在Js中它有自己的定义，引擎内部看不见的该属性的[[Enumerable]]特性为true，那么就是可枚举的。基本上把一个普通对象可以看做是一个枚举类型，比如var color = {'red':1}，red是可以修改的，但是red是可枚举的，但是如果是继承过来的属性，propertyIsEnumerable是返回false的，它还有一个特点，就是自身。

如果要定义不可枚举的属性，那就要使用defineProperty方法了，目前不能用对象直接量或者构造函数定义出来。

```
var obj = {name: 'jack', age:23}
Object.defineProperty(obj, 'id', {value : '123', enumerable : false });
```

## 深拷贝与浅拷贝

关于拷贝的问题，主要分为深拷贝和浅拷贝，但是如果从空间分配上来说JavaScript的拷贝不应该算是深拷贝，比如：

```
var d = {};
for(k in a){
    d[k] = a[k];
}
return d;
```

今天突然想到了这么一个问题，在C语言中，所谓的拷贝，就是分两种情况，一种是把指针地址拷贝给另外一个变量，虽然也开辟的了一个内存空间，在栈上也存在着一个地址，我对这个变量进行修改，同一个指针是会改变其值的，这种拷贝叫浅拷贝。另外一种情况，直接开辟一个新空间，把需要复制的值都复制在这个新的空间中，这种拷贝叫中深拷贝。

如果看到上述的一段Js代码，很多人说它是浅拷贝，假设传入一个a对象，拷贝完成之后返回一个d，当我修改返回对象的值时并不能同时修改a对象，于是，在这里我有一个很大的疑问，在Js中到底什么是浅拷贝，什么是深拷贝的问题？

这一点上感觉Js真的很奇葩，如果在开发iOS中，不可变对象copy一下，依然是不可变，所以是浅拷贝，拷贝了指针变量中存储的地址值。如果是可变对象copy一下，到不可变，空间变化了，包括不可变mutableCopy到不可变，空间依然变化了，所以是深拷贝。但是JavaScript中对于这一点要考虑一种情况，值类型，和引用类型，这个基础知识，我相信大家都非常清楚。数字，字符串等都是值类型，object，array等都是引用类型。

```
var a = [1,2,3];
var b = a;

b.push(4);
console.log(a); //[1,2,3,4]

var numb = 123;
var _numb = numb;
_numb = 567;

console.log(numb); //123
```

从这个例子中可以看的出来，它们使用的都是＝符号，而数组a发生了变化，numb数字却没有发生变化。那么从这里，可以有一个总结，所谓了深拷贝，浅拷贝的问题，应该针对的是有多个嵌套发生的情况。不然假设是这样的情况，还能叫浅拷贝么？

```
var object = {"de":123};
var o = copy(object);   
o.de = 456;
console.log(object) //{"de":123}
```

明显对象o中的de属性修改并没有影响到原始对象，一个对象中的属性是一个字符串，如果从内存空间的角度上来说，这里明显是开辟了新的空间，还能说是浅拷贝么？那么针对另外一种情况。

```
var object = {
    "de":{
        "d":123
    }
}
var o = deepCopy(object);
o.de.d = "asd";
```

如果一个对象中的第一层属性，不是值类型，只单层循环，这样来看的话确实是一个浅拷贝，因为在Js中引用类型用＝赋值，实际上是引用，这样说的通。所以，深拷贝，还需要做一些处理，把object，array等引用类型识别出来，深层递归到最后一层，一个一个的拷贝。

```
var deepCopy = function(o){
    var target = {};
    if(typeof o !== 'object' && !Array.isArray(o)){
        return o;
    }
    for(var k in o){
        target[k] = deepCopy(o[k]);
    }
    return target;
}
```

思路是如此，这个例子只考虑了两种情况，对象和数组，为了验证这样的思路，最后的结果与预期是一样的。

```
var _copy = {
    'object':{
        'name':'wen'
    },
    'array':[1,2]
}
var h = deepCopy(_copy);
h.object.name = 'lcepy';
h.array[1] = 8;
console.log(h);
console.log(_copy);
```

## 面向对象

面向对象的语言有一个非常明显的标志：类，通过类来创建任意多个具有相同属性和方法的对象，可惜的是Js里没有这样的概念。

但是Js有一个特性：一切皆是对象。

聪明的开发者通过这些特性进行摸索，于是迂回发明了一些程序设计，以便更好的组织代码结构。

### 工厂模式

主要是用来解决有多个相同属性和方法的对象的问题，可以用函数来封装特定的接口来实现

```
var computer = function(name,version){
    return {
        'name':name,
        'version':version,
        'showMessage':function(){
            alert(this.name);
        }
    }
}
var test = computer('apple','11.1');
test.showMessage();
```

### 构造函数模式

我们知道像原生的构造函数，比如Object，Array等，它们是在运行时自动出现在执行环境中的。因此，为了模仿它，这里也可以通过一个普通的函数，并且new出一个对象，这样就成为了自定义的构造函数，也可以为他们添加自定义的属性和方法。

但是这样的构造函数有一个缺陷，就是每个方法都会在每个实例上创建一次，因为每次创建都需要分配内存空间，但是有时候这样的特性还是有用的，主要是要控制它们，在不使用的时候释放内存。

```
var Computer = function(name,version){
    this.name = name;
    this.version = version;
    this.showMessage = function(){
        alert(this.name);
    }
}
var apple = new Computer('apple',2014);
var dell = new Computer('dell',2010);
apple.showMessage();
dell.showMessage();
```

像apple，dell是通过Computer实例化出来的不同的对象，但是它们的constructor都是指向Computer的。这里也可以使用instanceof来对（对象）进行检测。

在书写上构造函数跟其他函数是没有什么区别的，主要的区别还是在使用上，构造函数需要使用new操作符。

其实这样的书写，已经跟类没有什么区别了，表面上来看，而构造函数我个人更倾向于一个类的某个静态方法。

### 原型模式

说到原型模式就不得不提一提关于指针的问题，因为每一个函数都有一个prototype属性，而这个属性是一个指针，指向一个对象。

**C语言描述指针，这个在iOS开发中非常重要**

比如我先定义一个int类型的指针变量和一个普通的int类型数据，然后给指针变量赋值。

```
    int *p;
    int pp = 123;
    p = &pp;
    *p = 999;
    printf('%d',pp);
```

*是一个特殊符号用于标明它是一个指针变量。

&是地址符

分析这个就要说到栈内存和堆内存了，比如*p在栈内存中分配了一个地址假设是ff22x0，它还没有空间。而pp存在一个地址ff23x0，并且分配了一个空间存储着123，这个地址是指向这个空间的。

p = &pp 这样的赋值操作，也就是把ff23x0取出来，并且给p分配一个空间把ff23x0存储进去，并且ff22x0指向这个空间。

*p = 999 从这里就可以看出来p操作的是地址，而这个地址不就是ff23x0么，于是pp成了999。

所谓的指针也就是存储着地址的变量。

回到原型上，如果每一个函数中的 prototype属性都是一个指针，实际上它只是一个地址引用着一个空间，而这个空间正是我们写的xxx.prototype.xxx = function(){}这样的代码在运行时分配的空间。那么可见，使用原型的好处是空间只分配一次，大家都是共享的，因为它是指针。

先看一个例子

```
var Computer = function(name){
    this.name = name;
}
Computer.prototype.showMessage = function(name){
    alert(name);
}

var apple = new Computer('apple');
var dell = new Computer('dell');
Computer.prototype.isPrototypeOf(apple);
```

在解释这个原型链之前，还要明白Js的一个特性，就是如果自身不存在，它会沿着原型往上查找。它的原理稍微有些绕，Computer自身的prototype是指向它自身的原型对象的，而每一个函数又有一个constructor指向它自身，prototype.constructor又指向它自身。于是Computer的两个实例apple，dell内部有一个**proto**属性是指向Computer.prototype的，最后的结果是它们可以使用showMessage方法。

当然它们还有一个搜索原则，比如在调用showMessage的时候，引擎先问apple自身有showMessage吗？“没有”，继续搜索，apple的原型有吗，“有”，调用。所以从这里可以看出，this.showMessage是会覆盖prototype.showMessage的。

另外还可以使用isPrototypeOf来检测一个对象是否在另一个对象的原型链上，上述的代码返回的是true。

```
apple.hasOwnProperty('name')
apple.hasOwnProperty('showMessage')
```

使用hasOwnProperty来检测到底是对象属性还是原型属性，使用this创建的属性是一个对象属性。

从上面可以看出来原型链的好处，但是它也不是万能的，正因为指针的存在，对于某些引用类型来说这个就非常不好了，我需要保持原对象属性值是每一个对象特有的，而不是共享的，于是把之前的构造函数与原型组合起来，也就解决了这样的问题。

```
var Computer = function(name){
    this.name = name;
}
Computer.prototype.showMessage = function(){
    alert(this.name);
}
var apple = new Computer('apple');
apple.showMessage();
```

这样的结果是在对象中都会创建一份属于自己的属性，而方法则是共享的。

**动态原型模式**

有时候遇到某些问题需要动态添加原型，但是实例中是不能添加的，所以绕来一下，在初始化构造函数中添加。

```
var Computer = function(){
    if(typeof this.showMessage !== 'function'){
        Computer.prototype.showMessage = function(){

        }
    }
}
```

只要初始化了一次，以后就不用修改了。

### 寄生构造函数模式

这种模式的原理就是在一个函数中封装需要创建对象的代码，然后返回它。

```
var test = function(name){
    return {
        'name':name
    }
}
var g = new test('apple');
var f = de('dell');
```

看起来它跟工厂模式还是很像的，

### 稳妥模式

这种模式主要是在解决需要安全的环境中使用，一般来说一个类如果不提供getter，setter方法，是不允许直接访问和修改的。

```
var computer = function(name){
    var _name = name;
    return {
        'getter':function(){
            return _name;
        },
        'setter':function(name){
            _name = name;
        }
    }
}
```

这样的方式可以保证属性或者说是数据的安全性，不允许直接随便修改，如果不提供setter方法的话，压根就不允许。

### 继承

谈到面向对象，那么就不能不谈谈继承的问题了，而在Js中主要是将原型作为实现继承的主要思路。

```
var Computer = function(name){
    //this.name = name;
}
Computer.prototype.show = function(){
    alert('computer')
}

var Apple = function(){

}
Apple.prototype = new Computer();
Apple.prototype.hide = function(){}
Apple.prototype.show = function(){
    alert('apple')
}
var apple = new Apple();
apple.show();
alert(apple instanceof Computer);
```

使用这样的方式，实际上是从Computer的实例中先借它的prototype中所有的方法，但是这里会存在几个问题。

- 如果Computer中需要传入参数，比如name，借的时候我根本不知道要传入什么参数。
- 在Apple中如果要继续给原型添加方法，那么就不能使用字面量的形式了，它会覆盖掉
- 如果要重写父类中的方法必须要在借prototype之后
- 那么如何确定原型和实例的关系？貌似用instanceof和isPrototypeOf都会返回true

**解决问题一如何传入参数**

我们知道Js中有两个方法可以改变函数的上下文，apply和call，实际上类就是函数，这里既借属性也借prototype，不就可以解决这样的问题了么。

```
var Computer = function(name){
    //this.name = name;
}
Computer.prototype.show = function(){
    alert('computer')
}
var Apple = function(name){
    Computer.call(this,name);
}
Apple.prototype = new Computer();
var apple = new Apple('apple');
alert(apple instanceof Apple);
alert(apple instanceof Computer);
```

在运行时先借prototype，然后再借子类的this，但是这个也有个问题，那就是会调用两次父类。

**继承的技巧**

还有一种继承是生成一个临时对象，然后临时对象借需要继承的父类的prototype。

```
var extend = function(o){
    var F = function(){}
    F.prototype = o;
    return new F();
}
var parent = {
    'name':['lcepy']
}
var game = extend(parent);
game.name.push('wow');
var _game = extend(parent);
_game.name.push('view');
```

使用这样的方式有个很大的缺陷，那就是不要借属性之类的数据，因为它们是共享的，这是一个浅拷贝，还是因为指针的原因。不过要是继承方法，这种方式很方便。

还有一种方式跟上述类似，主要是封装了一层函数，用来返回对象。

### 寄生组合继承

这样的方式主要解决的问题是调用两次父类的问题，避免额外的借来的属性或方法。想想看第一次Computer.call(this)，借来了this上的属性或方法，第二次Apple.prototype = new Computer()，又借来了this上的属性或方法，这里的初衷是想借原型，没办法这个是实例，所以该借的不该借的都借来了。那么要避免这样的问题，就要解决继承属性的继承属性，继承原型的继承原型，也不乱借。

```
var extendPrototype = function(sub,supers){
    var F = function(){}
    F.prototype = supers.prototype;
    var _f = new F();
    _f.constructor = sub;
    sub.prototype = _f;
}
var Computer = function(name){
    this.name = name;
}
Computer.prototype.show = function(){
    alert(this.name);
}       
var Apple = function(name){
    Computer.call(this,name);
}
extendPrototype(Apple,Computer);            
var apple = new Apple('apple');
apple.show();
```

第一步把supers的原型赋值给F，第二步创建F的实例，第三步把_f实例的constructor属性修改成子类，第四步把_f实例赋值给子类的prototype。

这样的话就是不该借的也不会继承了

## 理解内存管理

一般来说内存管理主要有这么几种方式，引用计数和标记，而JavaScript采用的就是标记管理的方式。Js的内存管理是自动的，但是并不是说执行完后立马销毁，而是有时间周期性，相隔一段时间执行一下垃圾回收，把没有引用的内存全部销毁。

OC中采用的是引用计数来手动管理内存，这样的方式比较好，可以让开发者自己来管理。当然也有不好的地方，如果遗忘了释放，很可能引起应用的崩溃。

总体来看在IE中因为COM组件的原因，可能会发生循环引用的问题，这个问题在引用计数的内存管理都会遇见。所谓的循环引用是指在对象A中包含了一个指向B的指针，然后再对象B中包含一个指向A的指针，于是悲剧了。

```
var element = document.getElementById('doc');
var my = {};
my.element = element;
element.my = my;
```

大家都引用，于是，可想而知。要避免这种问题，一定要在不使用的时候my.element = null，把它断开。

那么，其他浏览器呢？还是标记清理的机制，比如一个函数的变量，在进入环境时标记上“进入环境”，执行完之后标记上“离开环境”，然后等待系统来释放。

IE有一个手动释放的方法，window.CollectGarbage，调用它就立马释放已经标记离开环境的变量，不过很多文章都不建议这样做。

那么一般都这样做，引用类型的释放

```
var my = {};
//使用完毕之后
my = null;
```

让my脱离执行环境，标记上已经离开环境，然后等待系统执行垃圾回收，释放内存。

## XMLHttpRequest

- [JavaScript 的同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)

> 注明： IE8已上，支持现代XMLHttpRequest

客户端Js与服务器进行网络交互必备的一个玩意，它不支持跨域，若要跨域还需要进行一些额外的处理。

```
var xhr = new XMLHttpRequest();
```

在使用xhr对象时，要调用的第一个方法是open()，它接受三个参数［发送请求的类型，请求的URL，描述是否同步还是异步的布尔值］false同步，true异步。

关于Ajax同步异步的个人理解：

- 同步，是用数据块的方式来传输的，在Js执行的表现上，当执行到这个Ajax请求时会等待它与服务器交互成功之后才能执行下面一行的代码，也就是阻塞。
- 异步，是用字节来传输的，它不等待是否成功，会执行之后的代码

结束时需要调用xhr.send()，如果没有发送数据的主体，必须要null，做为发送参数。另外在接收到响应之前还可以调用abort()来取消异步请求（不建议调用它）

### HTTP状态验证

当收到响应后会自动填充xhr对象，它有几个比较重要的状态，我们必须要了解清楚与处理。

- responseText:作为响应主体返回的文本
- responseXML:如果响应内容的类型是"text/xml"或者"application/xml"，这个属性中保存的就是XML的DOM文档
- status：响应的HTTP状态
- statusText：HTTP状态的说明
- readyState：用于描述请求发送到完成的过程

正常情况下需要检测status === 200 readyState === 4 这就表示responseText或者responseXML中已经填充了全部的数据可以提供给客户端使用了。

```
1 开头的用于描述请求已经发送，需要请求者继续操作才能继续的状态
2 开头的用于描述请求已经成功
3 开头的用于描述成功，但是还需要继续操作
4 开头的用于描述客户端发送了什么数据导致服务器错误
5 开头的用于描述服务器错误（常见的如，服务端代码抛错了）
```

readyState状态

```
0 未初始化，还没有调用open方法
1 已经调用open方法，还没有调用send方法
2 已经调用send方法，但是还没有接收到响应
3 已经接收了部分数据
4 已经接收了全部的数据
```

### xhr对象其他方法或事件

每一个请求和响应都会带有相应的HTTP头信息，其中对开发者是很有用的，而xhr对象提供了一个setRequestHeader方法来设置头信息，它必须在调用open方法之后并且在send方法之前。

既然有设置，那么必须得有获取，xhr对象也提供了两个方法分别来获取，getResponseHeader传入一个头部字段名来获取，getAllResponseHeaders来获取全部的头信息。

而接收数据则需要处理onreadystatechange事件，每次刷新状态时，系统都会重新调用此事件。

## 跨域

- [HTTP访问控制(CORS)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)

客户端Js出于安全的考虑，不允许跨域调用其他页面的对象，正是因为这样才给Ajax带来了很多不方便的地方。跨域最简单的理解就是因为Js同源策略的存在，比如a.com域名下的Js不能访问b.com下的Js对象。

- 协议端口没法跨，客户端
- 在跨域上，域仅仅是通过首部来识别，window.location.protocol +window.location.host

### 利用document.domain和iframe来设置

对于主域相同而子域名不同的情况，可以通过document.domain来处理，比如www.163.com/index.html和wow.163.com/wower.html，在这两个文件中分别加入document.domain = "163.com"，然后在index.html页面中创建一个iframe引入wower.html，获取iframe的contentDocument，这样这两个js就可以交互了。

index.html

```
document.domain = '163.com';
var iframe = document.createElement('iframe');
iframe.src = 'http://wow.163.com/wower.html';
iframe.style.display = 'none'; 
document.body.appendChild(iframe);
iframe.onload = function(){
    var doc = iframe.contentDocument || iframe.contentWindow.document;
    //现在可以通过doc来操作wower.html中的js对象了
}
```

wower.html

```
document.domain = '163.com';
```

使用这样的方式来实现的跨域是有限制的

- 主域名必须是同一个
- 安全性引发的问题，比如第一个页面出现了安全问题，在后面的页面也会出现
- iframe引用过多的话，每一个iframe都必须设置document.domain，比较琐碎

> 偶尔可以使用一下

### 利用window.name

稍微有些绕，但是数据量比较大，也比较安全

- wow.163.com/app.html 应用所在的页面
- wow.163.com/empty.html 中间代理页面，搞个空的即可，但是必须在主域名下
- [www.qq.com/data.html](http://www.qq.com/data.html) 需要交互的数据页面

在data.html页面中

```
window.name = 123;
```

app.html页面中创建一个隐藏的iframe，它的scr指向data.html，在onload事件中，把当前iframe的contentWindow.loaction修改成empty.html，当再次onload时就可以通过contentWindow.name来获取到123了。

> 偶尔使用

### 利用iframe和location.hash

利用这种方式，说实话（不建议），比较绕，而且数据量小，直接暴露在URL上。它的原理主要是这样的，假设wow.163.com/index.html页面，wow.163.com/empty.html（空的，什么内容都没有），需要交换数据的页面在www.qq.com/a.html上。

在wow.163.com/index.html#（＃号就是我们要传递的数据），创建一个隐藏的iframe，hash值可以当参数传递给www.qq.com/a.html#()，在www.qq.com/a.html中可以获取到hash值，根据它进行处理，然后在www.qq.com/a.html页面中创建一个隐藏iframe，把处理的结果当hash值进行传递，给wow.163.com/empty.html#()这样，在同一个域名下，wow.163.com/empty.html中的js可以通过parent.parent.location.hash = self.location.hash来改变hash值，这样就达到了跨域的目的。

> 不建议使用，坑爹的思路

### JSONP

这种方式是目前开发时最常用的一种方式，利用动态创建script标签来实现跨域的目的，虽然浏览器有显示Js对象的访问，但是它没有限制Js文件的加载，任何域名下的Js文件都可以加载。

对客户端而言，文件的加载其实就是发送一次GET请求，在服务端实现时，也就是处理这次的GET请求，并且响应，参数可以通过?来带走，俗称一波流。

在客户端上对于script文件加载是否已经完毕的判断，IE是判断script标签的readystatechange属性，而其他浏览器是onload事件。

> 突然感觉做移动端不考虑IE的兼容，果然是杠杠的，建议使用

### HTML5 postMessage

主要是利用window.postMessage来发送消息，监听window.message来获取消息，判断origin可以判断消息来源，data获取消息内容，soucre来引用发送方的window对象引用。

[www.b.com/b.html发送消息给www.a.com/a.html](http://www.b.com/b.html%E5%8F%91%E9%80%81%E6%B6%88%E6%81%AF%E7%BB%99www.a.com/a.html)

```
window.postMessage('hello','www.a.com/a.html')
```

[www.a.com/a.html获取消息](http://www.a.com/a.html%E8%8E%B7%E5%8F%96%E6%B6%88%E6%81%AF)

```
window.addEventLister('message',function(event){
    if(event.origin === 'http://b.com'){
        //处理
    }
})
```

iframe的发送方式

```
contentWindow.postMessage('data','b.com')
```

> 话不多说，移动端这种跨域方式也很常用（建议推荐使用）

### HTML5 跨域头 XMLHttpRequest2

如果是自己产品，又是做移动端可以使用，比上述任何方式都要方便，需要服务端支持响应时也要设置跨域头。

如果服务器响应此头，浏览器会检查此头，它的值表示请求内容所允许的域名，也就是如果是*号，表示所有域都可以访问，如果这里是a.com，表示除了同源外，只允许来自a.com域的访问。

```
Access-Control-Allow-Origin：＊
```

如果需要读取cookie则需要设置它

```
Access-Control-Allow-Credentials:true
```

设置允许跨域的请求类型

```
Access-Control-Allow-Methods:POST
```

> 兼容性问题，某些版本的浏览器需要在open之后，设置xhr.withCredentials ＝ true;话不多说，建议推荐使用

## 浏览器对象模型

BOM提供了很多对象，它的核心是window，表示它是浏览器的一个实例，在ECMAScript中又是Global对象。它提供了很多访问浏览器的功能，这些功能与网页无关，所以缺少事实标准的BOM既有意思又有些坑。复习它，主要是复习几个比较有用的对象，其他可以了解一二。

### location

> 算起来它是我用的最多的一个对象

它提供了当前窗口加载的页面有关的信息，也对URL进行了片段分解，既是window的属性，也是document的属性。

- hash 返回URL的散列（#号后面跟着的零个或多个值）
- host 返回服务器名称和端口号
- hostname 返回不带端口号的服务器名称
- href 返回当前加载页面的完整URL
- pathname 返回URL中的目录或文件名
- port 返回URL中指定的端口号
- protocol 返回页面使用的协议
- search 返回URL中的查询字符串，它以问好（?）开头

上述的属性基本上都可以直接使用，search除外，它返回的是一个完整的查询字符串，没有办法访问其中的每个查询字符串参数，还需要额外的进行处理。

一般来说根据它的特点，?开头&拼接，key=value的形式来展现，最好是key和value都要decodeURIComponent一下。

在location中除了上述的属性外，还有一些比较有用的方法和技巧，主要是用来控制页面跳转的问题。

- assign方法接收一个参数，表示立即打开一个新的页面并在历史纪录中生成一条记录，它的效果等同于window.location.href = ''或者location.href = ''
- 修改location对象的属性比如href，hash，search等也可以来改变URL
- replace方法接收一个参数，既跳转到新的URL上，并且不会在历史纪录中增加一条新的纪录
- reload表示重新加载当前页面

### 处理框架，设置时间，open，窗口位置，窗口大小

> open现在估计没人会用了

如果页面中包含框架，则每个框架都有自己的window对象，可以使用frames来获取，比如frames[0]或者frames['name']。这里还要了解的是top，parent，对于这些只要理解的层级关系，每一个指向都是会非常清楚的。

在做某些动画效果的时候，主要是针对PC端，可能会使用到窗口位置，窗口大小的属性来进行计算，比如innerWidth，innerHeight，outerWidth，outerHeight，获取到这些尺寸，一般会与当前div的高宽进行减法来获取精准的位置。

setTimeout和setInterval是进行时间调度的函数，我们知道Js是单线程的，但是可以使用这个在特定的时间范围内执行代码，前面一个setTimeout是在指定的时间内执行（只执行一次），后面的setInterval则是以指定的时间重复执行（N次）

### navigator

用这个一般是在统计用户浏览器版本，操作系统等场景下才用的上，偶尔有几个会比较实用。

- cookieEnabled 判断cookie是否开启
- userAgent 浏览器用户代理字符串
- plugins数组 主要是用来检测浏览器安装的插件

### screen

在Js中有几个对象在编程里真用不上，这个就是其中之一。它主要是用来表明客户端的能力，比如显示器的信息，像素，高，宽等。

### history

history对象保存着用户上网的历史纪录，但是这个也是非常不常用。主要是用go方法，back方法，forward方法。

> 说实话，后面三个navigator,screen,history基本上很废材，HTML5中的history对象pushState非常有用外。

## 文档对象模型

- [文档对象模型 (DOM)](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model)

DOM是针对HTML和XML文档的一个API，主要是使用JavaScript来进行编程操作HTML和XML文档。其他语言如果实现了DOM标准，理论上也是可以使用这个API的，这里仅仅讨论JavaScript的应用。

**理解层级结构与关系**

在浏览器中比如HTML页面是由很多有层次结构的标签组成的，而为这些标签提供查询，添加，删除等等方法主要就是DOM在提供支持。

（页面又称为文档）文档中所有的节点之间都存在这样或那样的关系，比如下面一个经典的HTML：

```
<html>
    <head></head>
    <body></body>
</html>
```

一个标签又可以称为一个元素，head和body那就是兄弟关系，它们都来自一个父系html，又可以说html的子元素是head和body，可能这样描述还不太明显，这样就用原生Js操作DOM来的方式来看看层级结构。

```
var html = document.getElementsByTagName('html')[0];
```

先通过getElementsByTagName获取html根元素的节点，每一个元素都有一个childNodes集合和一个parentNode分别代表子节点集合和父节点，**如果不存在，则都是null，如果是集合不存在，则是一个[]**。

> html的childNodes //[head,body] html的parentNode // document

每一个元素也都有一个firstChild和lastChild来分别代表第一个子元素和最后一个子元素

每一个元素也都有一个nextSibling和previousSibling分别代表前面一个元素和后面一个元素，以当前自己为参照物。

从这样可以看出来，它就像族谱一样对元素的关系进行了定义，通过理解这些层级关系，利用DOM提供的API可以很顺利的进行操作。

### 操作DOM

**常见的获取方式**

- document.getElementById （通过ID来获取到节点）
- document.getElementsByTagName （通过节点标签来获取）
- document.querySelector
- document.querySelectorAll

后面两个属于HTML5提供的新API，在移动端会用的比较多，前者是获取单个，后者获取集合。

**常见添加，删除**

- appendChild
- insterBefore
- replaceChild
- removeChild

appendChild主要是向childNodes集合的末尾添加一条元素，insterBefore可以用来插入特定位置，两个参数，要插入的节点和作为参照的节点，更新成功后插入的节点会在参照节点之前，也就是参照节点的previousSibling。replaceChild和insterBefore有些类似，两个参数，要插入的节点和参照节点，更新成功后，要插入的节点会替换参照节点，removeChild就比较好理解了，删除一个节点，这四个方法都有返回值。

**常见元素属性**

一般来说，如果var doc = document.getElementById('doc');doc.id = 'xx';这样的方式也是可以更新或者获取到元素的属性的，不过不推荐这么使用，要获取元素的属性，DOM API也提供了三个方法来使用。

- getAttribute
- setAttribute
- removeAttribute

getAttribute可以获取元素的属性，setAttribute可以对元素的属性进行设置，如果属性名不存在，则创建该属性。removeAttribute则是完全删除此属性。

还有一个属性attributes，主要是获取元素属性集合，这个不是很常用，主要是在遍历元素属性时会使用到，它是一个集合。

**常见创建元素或文本**

一般情况下创建元素都会使用字符串的形式，innerHTML进去。不过，某些情况下，会用到createElement来创建一个元素，如果用到它，那么创建的文本也必须使用createTextNode了。

对于文本节点，注释节点等开发真的很少用，可以当一个子类大概了解即可。

> 关于模式的讨论，主要可以用document.compatMode来判断，如果是CSS1Compat就是标准模式，移动端不会出现这样的情况，IE上可能有别的模式，模式主要是影响到CSS布局上，Js影响非常少。
>
> 在移动端上滚动是一个比较要处理的问题，一般来说会使用scrollIntoView，scrollIntoViewIfNeeded，scrollByLines，scrollByPages，这四个方法safari chrome都有实现，意味着在iOS和安卓平台都是良好的。

- scrollByPages 将元素的内容滚动到指定的页面高度，具体的高度是由元素的高度来决定的。
- scrollByLines 将元素的内容滚动到知道的行数高度，参数可正可负。
- scrollIntoViewIfNeeded，当元素在视窗（viewport）不可见，会滚动容器元素或者浏览器窗口让其可见。如果是可见的，这个方法不起任何作用。如果参数为true，可能是垂直居中的可见。
- scrollIntoView 滚动容器元素或者浏览器窗口，让元素可见。

**一些小技巧**

每一个元素都存在一个contains方法，用来检测传入的节点是不是当前节点的子节点，火狐对于的方法名叫compareDocumentPosition。

如果要获取一个文本节点可以使用innerText（纯文本）来获取字符串，如果要获取所有的包括标签的字符串可以使用innerHTML。它们还有一种outer系列对应的方法，主要的区别是前者（outerText）会替换节点，后者(outerHTML)会修改调用它的元素，一般基本没人使用。它们可以获取，也可以通过赋值来设置新的节点。

### DOM2和DOM3

对于这两级在DOM中基本上IE没啥支持，或者说支持的非常少，像style对象，CSS的一些对象外。

这里最大的变化是增加了对XML命名空间的支持，元素样式的访问，节点的遍历以及range。当然目前来看，节点的遍历，range，XML命名空间在开发中使用的非常少，可以当资料来阅读，了解有这么回事，用到的时候再查询。而元素样式的访问，这个在开发中普遍使用的较多，因为在没法使用css3动画的浏览器中，可以通过改变样式来到达动画的目的。

```
var doc = document.getElementById('doc');
doc.style.width = '100px';
```

对于iframe的访问这里增加了一个contentDocument对象来进行引用，还有节点的比较，isSameNode和isEqualNode，这两个的区别在于，前者是否引用的同一个节点对象，后者是指两个节点是否是相同的类型。不过，它们使用的也不多，了解就好。

**元素的大小**

这个部分需要理解，因为关乎到元素在浏览器上的位置显示，跟动画有关系，四个属性。

- offsetWidth 元素在水平方向占用的空间大小
- offsetHeight 元素在垂直方向占用的空间大小
- offsetLeft 元素的左外边框到内边框的距离
- offsetTop 元素的上外边框到内边框的距离

**滚动大小**

这个在视察滚动或者处理滚动条的时候用的上，也是四个属性

- scrollHeight 在没有滚动的情况下，元素的总高度
- scrollWidth 在没有滚动的情况下，元素的总宽度
- scrollLeft 被隐藏在内容区域左侧的像素度
- scrollTop 被隐藏在内容区域上侧的像素度

> 下面这些IE全部不支持，range支持一种叫做文本范围的东西

**元素遍历**

关于遍历其实有两个方法可用createNodeIterator和createTreeWalker，不过这些在开发中几乎不会使用到，谁没事去遍历节点完呢。

**关于range**

这个也是非常少会使用到，除非是做那种编辑器应用或者在线编辑器等等，不过使用它可以更精准的控制的DOM，主要是使用createRange方法。

## 事件

- [事件类型一览表](https://developer.mozilla.org/zh-CN/docs/Web/Events)

> IE浏览器的事件不是重点

事件是JavaScript与HTML进行交互的一个纽带，理解事件可以更好的处理Web应用程序，现在的浏览器中主要支持两种事件流：

- 事件冒泡
- 事件捕获
- DOM事件流

事件冒泡则是指事件开始时由具体的元素接收，然后逐级向上传播。比如：

```
<html>
    <head></head>
    <body>
        <div>
            <p></p>
        </div>
    </body>
</html>
```

给p标签监听一个事件，它的流向是p,div,body,html,document，其实细心看来这种流的走向会存在一个问题，给div也监听一个事件，当用户点击P的时候是会触发两次的，好在event对象中有可以阻止事件冒泡的方法。

事件捕获则是指事件由最上级接收，逐级向下传播到具体的元素上，了解了冒泡之后这个就非常好理解了，正是一个相反的步骤。

而DOM事件流又正好是冒泡与捕获的结合体，它分为三个阶段：事件捕获，目标事件，事件冒泡，如果在纸上画出来，它的走向就是一个圆形。

> 对于事件处理程序，写在HTML标签中的，另外一种是直接写一个function的，比如doc.onclick = function(){}，一般来说这些浏览器支持，但是基本上不会使用了。因为前者是跟HTML耦合的，不利代码维护，而且虽然HTML加载了但是Js文件还未加载，用户点击后，是直接报错的。后者虽然也可以删除，比如doc.onclick = null，对于对代码有强迫症的同学，基本上不会使用到它。

那么，我们该怎么给一个元素添加上事件处理程序呢？

### DOM2级事件处理程序

- addEventLister
- removeEventLister

所有的DOM节点都具备这两个方法，它接收三个参数：

- 要处理的事件名称，比如click（这里跟上述两个以及IE注册事件都不同，不需要on）
- 需要事件进行处理的函数
- 一个布尔值，表示（true，在捕获阶段调用事件处理函数）（false，在冒泡阶段调用事件处理函数）

> 一般情况下第三个参数都填false

IE浏览器对应的两个方法，attachEvent，detachEvent，它们只有冒泡，事件名要加上on。

### 事件对象

在注册完事件处理程序后，事件的一个比较重要的对象必须要理解，**event事件对象**。

一般来说，这个对象中包含着所有与当前元素所监听的事件有关的信息，比如元素监听的事件类型，元素本身等等。

**比较重要的属性和方法（只读）**

- currentTarget 真正监听事件的那个元素
- target 事件的目标元素
- type 事件的类型
- perventDefault() 取消事件的默认行为
- stopPropagation() 取消事件的捕获或者冒泡
- bubbles 事件是否冒泡
- eventPhase 事件处理程序的三个阶段，1捕获2处于目标3冒泡

**比较重要的属性和方法（读写）**

- clientX 鼠标在窗口中的水平位置
- clientY 鼠标在窗口中的垂直位置

### 事件类型

> PC端主要是针对鼠标，移动端则是触摸，手势相关的处理

如果在PC端上发生一次click事件，实际上它是发生了三次事件，mousedown当鼠标按下的时候，mouseup当用户放开的时候，click两个加起来就发生了一次click事件。相对于移动，PC上的鼠标事件非常的丰富，例如mouseover当鼠标首次移入一个元素边界时触发，mouseout当鼠标移出元素时触发，这个移出，到子元素上也会触发这个事件，mousemove当鼠标在元素内移动时重复触发。

总体来说对于文档加载，表单控件，窗口大小改变等事件，比如获取焦点，在失去或者获取焦点是值改变等移动上都是一样的，focus（获得焦点）blur（失去焦点）。

在做一些视差滚动的效果时scroll事件是非常好用，移动上在css中提供了一个类似的属性。

唯一的区别是移动端上没有键盘事件。

### 移动事件

- touchstart 当手指触摸到屏幕时触发
- touchmove 当手指在屏幕上连续滑动时触发
- touchend 当手指从屏幕上移开时触发
- touchcancel 当系统停止跟踪触摸时触发（这个事件没有确定的触发时间）

它们都是冒泡的，也可以取消

**三个跟踪触摸事件的属性**

- touches 当前跟踪触摸操作的touch数组，在touchend事件中为空
- targetTouchs 特定事件目标的touch数组
- ChangedTouches 上次触摸时发生了什么改变的touch数组

**移动event事件对象**

PC上存在的，在移动上也存在，描述上有差异，比如

- target 触摸的DOM节点目标
- pageX 触摸目标在页面中的X坐标
- pageY 触摸目标在页面中的Y坐标

**一些手势**

- gesturestart 当一个手指按在屏幕上另外一个手指又触摸屏幕时触发
- gesturechange 依赖前者当其中的一个手指发生改变时触发
- gestureend 当任何一个手指离开时触发

**移动手势干货三部曲**

- [对于Touch的处理](http://www.cnblogs.com/pifoo/archive/2011/05/23/webkit-touch-event-1.html)
- [处理简单手势](http://www.cnblogs.com/pifoo/archive/2011/05/22/webkit-touch-event-2.html)
- [处理复杂手势](http://www.cnblogs.com/pifoo/archive/2011/05/22/webkit-touch-event-3.html)

## 结语

现在的前端开发了解JS还是仅仅不够的，你需要多方面扩展。

访问[Front-End-Develop-Guide](https://github.com/Front-End-Developers-Hunan/Front-End-Develop-Guide)项目，资料已准备齐全。