jquery / zepto plugin patterns

Github： https://github.com/hugohua/jquery-zepto-plugin-patterns

=====

提供较为优秀的插件写法模板，妈妈再也不用担心我不会写插件了。

下载jq或zepto插件模板，然后在相应的位置写上你的插件代码，无需再关注代码组织逻辑。

##后续
在这里留了个小悬念，如果调用带参数的方法，则以下这句需要修改一下
```js
if (typeof options === 'string') instance[options]();
```

修改为
```js
if (typeof options === 'string') instance[options].apply(instance,[].slice.call(arguments, 1));
```


##来源
http://www.ghugo.com/jq-zepto-template-write-patterns/

## Changelog
* v0.1 项目创建

## Other
[My Blog](http://www.ghugo.com)

