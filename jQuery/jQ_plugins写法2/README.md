# jQuery / Zepto 插件模板

jQuery/Zepto 都提供了很好的机制，让用户可以通过编写插件，来扩展功能。

很多人做了很久前端开发，却一直在使用别人的插件，自己没有完整开发过一个插件。其实开发插件不是很难的事情，经过多年，撰写一个 jQuery/Zepto 插件已经有了最佳实践，也就是所谓的基本的套路。这里给出基本的插件模板，让用户不用再考虑代码的组织，可以快速上手实现插件的编写，so easy! enjoy~

- [查看 jQuery 插件模板](jQuery-plugin-template.md)
- [查看 Zepto 插件模板](Zepto-plugin-template.md)

关于模板的详细信息，请参考模板中的注释。

## jQuery / Zepto 插件开发注意事项

- 用闭包保护全局变量不受污染
- 插件尽量支持链式语法，可以通过 `return this` 实现；
- 插件尽量对外暴露尽可能少的调用入口，比如：
  ```javascript
  //推荐
  $.fn.myWindow("open");
  $.fn.myWindow("close");
  
  //不推荐
  $.fn.openMyWindow();
  $.fn.closeMyWindow();
  ```
- 通过传入 `options` ，让插件可以定制，并提供默认的设置值
- 尽量优化插件中冗余的代码
- 不要试图提供繁多的配置项

更多内容请查阅 [我的博客](http://www.feeldesignstudio.com/2015/05/jquery-zepto-plugin-template/)

