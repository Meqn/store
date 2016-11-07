# 关于JS继承学习总结

源自：
javascript 继承学习心得总结
http://www.jb51.net/article/81111.htm

## 关于JS继承

首先说js没有真正的跟其他面向对象的语言一样概念的继承，js里边所说的继承是指模拟继承。

具体js继承是干啥呢，刚开始做前端的时候我是用来面试的（最早写些小效果的时候基本用不到，为啥要看呢，因为面试官很爱问这个问题啊），所以就看看大概的，面试时候能说个大概，在这个问题上算是面试党了。后来跟着慢慢的实际上虽然概念不是很明确也用到一些。

真正是用来干啥的呢，主要是用来复用我们之前写过的代码。比如写过一个功能，一个对象，或者用别人写的东西，我们要自己加点儿什么，总不能改人家的东西吧，直接继承过来用一下就好了，这才是继承的真正用途。


## 如何实现JS继承
先不上代码，先说说想法。其实继承呢就是想办法把其他对象（js里边一切皆对象哈）的属性或者方法搞到我们自己的对象上，让我们自己的这个对象可以用。这也就达到复用的目的了。

目的搞明白了，下面就是实现手段了。

根据js的特性，实现无非就是以下几种方法的其中一种或者组合使用。

1. 构造函数，js好像没有严格的构造函数的定义，但是可以用new来创建新的对象。构造函数据说也是严格的面向对象的语言实现继承的方法，那么js当然可以模拟一下了，所以学过oop语言的人们会最先想到这个。
2. 利用函数原型，利用原型链把两个对象链接起来，因为js原型链是比较独特所以想到这个也是很容易的。
原型也分几种，就是把什么作为继承对象的原型，被继承对象的原型或者被继承对象的实例，或者直接被继承者。这几种作为继承对象的原型得到的继承效果是不一样的。
3. 复制属性和方法，把被继承对象的属性或者方法统统复制克隆过来变成我们自己对象的属性和方法就好了啊，我们就可以无比顺畅的用了。当然这个还分浅复制和深度复制两种情况。
4. 利用call和apply这两个方法，这两个方法比较神奇，可以改变函数执行的上下文（this），所以利用这两个方法也可以实现对被继承对象的方法的继承复用。

总的来js实现继承的途径大概就是这些，千变万化的实现方法都是从这几种方法的基础上组合升级完善出来的，为毛大多数要组合使用呢，当然是因为使用单个方法实现的效果不太理想啊。当然可以根据自己项目中实际的需求选择使用哪种方式，只要满足自己的需求并没有说必须使用哪种方法去实现。就像说从北京去石家庄，最快当然是飞机啦。但是如果离机场远，算上到机场，从机场去市里，整体算下来还不如高铁快，那就可以做高铁。又比如自己有车可以开车，想要挑战一下还可以骑自行车，这个根据自己的实际情况来选就可以。

## 结合代码实现

### 1. 构造函数实现（借用构造函数）

```javascript
function Super(arg) {
    this.arr1 = "I'm super " + arg;
    this.show = function() {
        alert(this.arr1);
    }
}

Super.prototype.say = function() {
    alert(this.arr1);
}

function suber(arg) {
    Super.apply(this, arguments); //在suber的上下文中运行super
}

var sub = new suber("suber");
var sub2 = new suber("suber1");

console.log(sub.arr1); //I'm super suber
console.log(sub.show); //function (){ alert(this.arr1);}
console.log(sub.say); //undefined
console.log(sub.show === sub2.show); //false

```

哎呀，发现sub.say是undefined，这说明它没有被继承过来啊，下边两个对象sub，sub2的show不相等，说明两个函数指向了两个不同的对象，也就是说被复制了两份出来。

所以这个方法实现继承的话原型对象上的属性和方法没有被继承过来，Super上的属性和方法为每个new出来的对象分别复制一份。

所以单单使用这个方法来实现继承还是不妥啊，因为原型上的方法都没有被继承过来啊。于是大神们就想到了原型继承


### 2. 原型继承：

```javascript
function Super(arg) {
    this.arr1 = "I'm super " + arg;
    this.show = function() {
        alert(this.arr1);
    }
}

Super.prototype.say = function() {
    alert(this.arr1);
}

function suber(arg) {}

suber.prototype = new Super();

var sub = new suber("suber1");
var sub2 = new suber("suber2");

console.log(sub.arr1); //I'm super undefined
console.log(sub.show); //function (){ alert(this.arr1);}
console.log(sub.say); //function (){ alert(this.arr1);}
console.log(sub.show === sub2.show); //true;
console.log(sub.say === sub2.say); //true;

```

这次是arr1继承过来了，但是参数没有添加进来，是undefined，所以这个方法子类声明时候这个参数传进来付类继承过来的这个属性没法收到。其他的都还算正常。show和say都继承过来了。但是有一点儿需要注意，say是通过super的原型对象继承过来的，而show是新建super对象实例时实例的属性。

那么怎么实现参数传输又能把原型里边的东东继承过来呢，当然上边两种方法组合一下就好了啊，于是前辈们又发明了下面这种方法


### 3. 组合继承（借用构造函数并设置原型）

```javascript
function Super(arg) {
    this.arr1 = "I'm super " + arg;
    this.show = function() {
        alert(this.arr1);
    }
}

Super.prototype.say = function() {
    alert(this.arr1);
}

function suber(arg) {
    Super.apply(this, arguments);
}

suber.prototype = new Super();


var sub = new suber("suber1");
var sub2 = new suber("suber2");

console.log(sub.arr1); //I'm super suber1
console.log(sub.show); //function (){ alert(this.arr1);}
console.log(sub.say); //function (){ alert(this.arr1);}
console.log(sub.show === sub2.show); //false;
console.log(sub.say === sub2.say); //true;
```

 这次几乎完美了，但是可以发现sub.show 和sub2.show并不相等啊，这是为啥呢，因为apply这个地方使得show成为了suber的自己的属性，那么就吧suber原型里的show（Super的当做suber原型对象的实例对象的show）给覆盖了，所以又变成每次复制一个，当然这个地方没有办法避免啊。为了不产生这种多余的开消这种可以共用的函数可以多放到原型对象里边。
 
因为suber的构造里边的调用，和给suber原型对象赋值时候的调用导致Super被调用了两次，那么每次new suber对象时候就调用了两次Super，调用两次就会产生两个实例对象，需要消耗多余的资源了。

于是前辈们为了解决这个问题又开了开脑洞，开发出来下面这种方法。


### 4. 寄生组合继承

该方法跟方法三最主要的不同就是把父类原型赋给了子类原型而不是父类示例，看例子

```javascript
function Super(arg) {
    this.arr1 = "I'm super " + arg;

}

Super.prototype.show = function() { //这个方法放到了原型对象上。
    alert(this.arr1);
}
Super.prototype.say = function() {
    alert(this.arr1);
}

function suber(arg) {
    Super.apply(this, arguments);
}

/*inherit函数的作用，使用一个新的空函数，来切断父类对象的原型对象与子类原型对象的直接联系，而是通过这个空构造的实例对象实现继承，这样可以避免更改子类原型的属性或者方法而影响了父类原型对象的属性或者方法。*/

function inherit(obj) {
    function F() {}
    F.prototype = obj;
    return new F();
}

suber.prototype = inherit(Super.prototype);


var sub = new suber("suber1");
var sub2 = new suber("suber2");

console.log(sub.arr1); //I'm super suber1
console.log(sub.show); //function (){ alert(this.arr1);}
console.log(sub.say); //function (){ alert(this.arr1);}
console.log(sub.show === sub2.show); //true;
console.log(sub.say === sub2.say); //true;

```

好了，这样就把三方法的弊端干掉了，这个可以完美的使用了吧。


### 5. 复制属性实现

拷贝我们可以写一个拷贝函数来实现。

```javascript
function extend(Super, suber) {　　
    suber = suber || {};　　
    for (var i in Super) {　　　　
        if (Super.hasOwnProperty(i)) {　　　　　　 suber[i] = Super[i];　　　　 }　　　
    }　　
    return suber;
}


var parent = {
    name: "dad",
    num: [1, 2, 3],
    say: function() { alert("dad"); }
}

var child = {
    age: 5,
    sex: "boy"
};

child = extend(parent, child);

//以下测试
console.log(child);
/*{
  age:5,
  sex:"boy",
  name:"dad",
  num:[1,2,3],
  say:function(){alert("dad");}
}*/
console.log(child.say === parent.say); //true
console.log(child.num === parent.num); //true

```

复制成功，那么child成功继承了parent的一些属性，但是后面两个测试发现他们是相等的，就表明了他们在公用同一个数组，同一个函数，函数这个可以，但是数组这个就有问题了，如果一个chiild改变了数组，几个被继承对象的数组也跟着变了，这就不给力了啊。

为什么会发生这种情况呢，js里边对象存储的是指针，然后这个指针指向这个值，我们在这复制的实际是指向该对象的指针的值，所以继承对象和被继承对象都指向了同一个对象，接下来看看如何使用深度复制来解决这个问题。

**深度复制对象属性：**

```javascript
function extenddeep(Super, suber) {
    var tostr = Object.prototype.toString,
        astr = "[object Array]";
    suber = suber || {};

    for (var i in Super) {
        if (Super.hasOwnProperty(i)) {
            if (typeof Super[i] === "object") {
                suber[i] = (tostr.call(Super[i]) == astr) ? [] : {};
                extenddeep(Super[i], suber[i]);
            } else {
                suber[i] = Super[i];
            }
        }
    }
    return suber;
}


var parent = {
    name: "papa",
    num: [1, 2, 3],
    say: function() { alert("I'm father of my son!"); }
}

var child = {
    name: "jone",
    sex: "boy",
}

var kid = extenddeep(parent, child);

console.log(kid);
/*{
  name: "papa"
  num: Array[3]
  say: ()
  sex: "boy"
}*/

console.log(kid.say === parent.say); //true
console.log(kid.num === parent.num); //false
console.log(kid.name); //papa

```

好了，深度复制完毕，但似有木有发现问题，name是parent的，也就是说如果继承对象有和被继承对象一样的属性名的属性如果不做处理就会被替换掉。那么我们可以做一下处理，先声明一个属性，保存parent里的东西，剩下的的当然就是child自己的东西了，最后再把属性给child对象就可以了。


### 6. 利用call和apply这两个方法（借用方法）

这个就是通过call和apply来复用其他对象的方法，达到复用的目的。

```javascript
var one = {
      name:"object",
      say: function(greet){
        return greet + ', ' + this.name;
      }
    }
 
    var tow = {
      name:"two"
    }
 
    one.say.call(tow, "hi");  //hi, two
```

这个就是借用了，好了，下课。

好吧，好吧，其实这里边还有其他东西要看。可以借用并不“带表”可以随便把某个方法赋值给谁然后跟没发生什么似的继续用。所以我们平时使用借用时要注意一下上下文，下面看下那些容易出错的地方。

```javascript
//赋值给一个变量时候上下文会变化
var say = one.say;
console.log(say('hoho')); // "hoho, undefined"

//作为回调函数时也会发生变化
var yetother = {
    name: "yetother obj",
    method: function(callback) {
        return callback("Hola");
    }
}

console.log(yetother.method(one.say)); //"Hola, "

```

神马意思呢，就是this.name是undefined,当one.say赋值给say是，实际上是say存储了指向函数对象的指针，say这个变量明显又是全局变量的一个属性，那么它运行的时候实际的上下文就变成了windows了，当然这个时候name就变成undefined了。回调这个也是一样，return 的是函数运行的结果。如果我们事先设置 windows.name="windows" 那么得到的结果就变成了 "hoho, windows" 和"Hola, windows" 了。

```javascript
function bind(o, m) {
    return function() {
        return m.apply(o, [].slice.call(arguments));
    }
}
var othersay = bind(yetother, one.say);
othersay("Hola"); //"Hola, yetother obj"

```

通过apply可以改变方法执行的上下文，那么我们构建一个函数来实现这样一个功能，通过使用方法调用实现上下文的改变，这样就不会出现上下文不是我们期望的上下文的情况了。

```javascript
//这段是直接复制过来的。
// ECMAScript 5给Function.prototype添加了一个bind()方法，以便很容易使用apply()和call()。

if (typeof Function.prototype.bind === 'undefined') {
    Function.prototype.bind = function(thisArg) {
        var fn = this,
            slice = Array.prototype.slice,
            args = slice.call(arguments, 1);
        return function() {
            return fn.apply(thisArg, args.concat(slice.call(arguments)));
        };
    };
}

var twosay2 = one.say.bind(two);
console.log(twosay2('Bonjour')); // "Bonjour, another object"

var twosay3 = one.say.bind(two, 'Enchanté');
console.log(twosay3()); // "Enchanté, another object"

```

介绍完了，该说说自己的疑惑了，当复制属性方法遇到的被继承对象里边存在方法，如何单独复制出来呢，现在的是直接共用了，因为毕竟方法一般不会经常改动。求解答？

下面是转载过来的jQuery的extend方法，好像也没有特殊处理函数这块，继承完了两个函数也是共用的。


### 7. $.extend源码

```javascript
jQuery.extend = jQuery.fn.extend = function() {
    var options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    //如果第一个参数是boolean类型
    //修正参数,将第二个参数作为target
    if (typeof target === "boolean") {
        deep = target;

        // skip the boolean and the target
        target = arguments[i] || {};
        //i++是为了后续 i === length的判断
        i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    //如果目标既不是对象也不是方法(例如给基本类型扩展属性方法和属性不会报错但是是无用的)，修正target为 js对象
    if (typeof target !== "object" && !jQuery.isFunction(target)) {
        target = {};
    }

    // extend jQuery itself if only one argument is passed
    //如果只有一个参数，修正对象为JQuery函数或JQuery对象
    if (i === length) {
        target = this;
        //修正target所在位置,后面的都是要添加给target的对象
        i--;
    }

    for (; i < length; i++) {
        // Only deal with non-null/undefined values
        if ((options = arguments[i]) != null) {
            // Extend the base object
            for (name in options) {
                src = target[name];
                copy = options[name];

                // Prevent never-ending loop
                //如果target和copy是同一个对象，略过，防止自己的属性引用了本身对象导致的循环引用,以致GC无法回收
                if (target === copy) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                //如果是deep为true，并且要添加给target的copy为对象获数组
                if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && jQuery.isArray(src) ? src : [];

                    } else {
                        clone = src && jQuery.isPlainObject(src) ? src : {};
                    }

                    // Never move original objects, clone them
                    //很巧妙 ,用一个递归,实现引用对象的深克隆,递归的返回条件是属性石基本类型,基本类型都是深克隆
                    target[name] = jQuery.extend(deep, clone, copy);

                    // Don't bring in undefined values
                } else if (copy !== undefined) {
                    //浅克隆
                    target[name] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
};

```

以上这篇javascript 继承学习心得总结就是小编分享给大家的全部内容了，希望能给大家一个参考，也希望大家多多支持脚本之家。

















