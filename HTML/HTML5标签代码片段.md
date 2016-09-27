
# HTML5 标签说明

标签 | 说明
---|---
`<header>` | 定义页面或章节的头部。它经常包含 logo、页面标题和导航性的目录。
`<nav>` | 定义只包含导航链接的章节。
`<section>` | 定义文档中的一个章节。
`<article>` | 定义可以独立于内容其余部分的完整独立内容块。
`<aside>` | 定义和页面内容关联度较低的内容——如果被删除，剩下的内容仍然很合理。
`<footer>` | 定义页面或章节的尾部。它经常包含版权信息、法律信息链接和反馈建议用的地址。
`<div>` | 代表一个通用的容易，没有特殊含义。
`<hgroup>` | 用来对标题元素进行分组。
`<figure>` | 代表一个和文档有关的图例。 （标记定义一组媒体内容以及它们的标题）
`<figcaption>` | 代表一个图例的说明。 （标签定义 figure 元素的标题）
`<details>` | 代表一个用户可以(点击)获取额外信息或控件的 小部件 。
`<summary>` | 代表 `<details>` 元素的 综述 或 标题 。
`<menuitem>` | 代表一个用户可以点击的菜单项。
`<menu>` | 代表菜单。



---


# 代码片段Demo

### 1. 图片列表

```html
<div class="pics">
    <figure>
        <figcaption>图片说明</figcaption>
        <img src="" alt="图片"> 
    </figure>
    <figure>
        <figcaption>图片说明</figcaption>
        <img src="" alt="图片"> 
    </figure>
</div>
```


### 2. 文章列表

```html
<div class="content">
    <article>
        <header>
            <h1><a href="#" title="" rel="bookmark">文章标题</a></h1>
            <div class="meta">
                <time datetime="2014-07-18T17:40:58+00:00">2014 年 07 月 18 日</time>
                <span rel="author">作者</span>  
            </div>
        </header>
        <div>
            <figure><img src="" alt="文章缩列图"></figure>
            <p>文章内容</p>
        </div>
        <footer>
            <span rel="category tag">标签/分类</span>
        </footer>
    </article>
    <article>
        <header>
            <h1><a href="#" title="" rel="bookmark">文章标题</a></h1>
            <div class="meta">
                <time datetime="2014-07-18T17:40:58+00:00">2014 年 07 月 18 日</time>
                <span rel="author">作者</span>  
            </div>
        </header>
        <div>
            <figure><img src="" alt="文章缩列图"></figure>
            <p>文章内容</p>
        </div>
        <footer>
            <span rel="category tag">标签/分类</span>
        </footer>
    </article>
</div>
```

### 3. 表单form

```html
<form name="" action="" method="">
    <fieldset>
        <legend>基本信息</legend>
        <p class="form-group">
            <label for="">姓名</label>
            <input type="text" id="" name="" placeholder="" tabindex="">
        </p>
        <p class="form-group">
            <label for="">年龄</label>
            <input type="text" id="" name="" placeholder="" tabindex="">
        </p>
    </fieldset>
    <fieldset>
        <legend>详细信息</legend>
        <p class="form-group">
            <label for="">学校</label>
            <input type="text" id="" name="" placeholder="" tabindex="">
        </p>
        <p class="form-group">
            <label for="">工作</label>
            <input type="text" id="" name="" placeholder="" tabindex="">
        </p>
    </fieldset>
    <fieldset>
        <p class="forgetmenot">
            <label for="rememberme">
            <input type="checkbox" name="" id="" value=""> 记住我</label>
        </p>
        <p class="form-submit">
            <input type="submit" name="" id="" value="提交">
        </p>
    </fieldset>
</form>
```

### 4. 关于section

> section 不仅仅是一个普通的容器标签。当一个标签只是为了样式化或者方便脚本使用时，应该使用 div 。一般来说，当元素内容明确地出现在文档大纲中时，section 就是适用的。

```html
<article>  
    <hgroup>  
        <h1>Apples</h1>
        <h2>Tasty, delicious fruit!</h2> 
    </hgroup>  
    <p>The apple is the pomaceous fruit of the apple tree.</p>  
    <section>  
        <h1>Red Delicious</h1> 
        <p>These bright red apples are the most common found in many supermarkets.</p> 
    </section>  
    <section>  
        <h1>Granny Smith</h1> 
        <p>These juicy, green apples make a great filling for apple pies.</p> 
    </section>  
</article> 
```


### 5. 关于article

> article 是一个特殊的 section 标签，它比 section 具有更明确的语义, 它代表一个独立的、完整的相关内容块。一般来说， article 会有标题部分(通常包含在 header 内)，有时也会 包含 footer 。虽然 section 也是带有主题性的一块内容，但是无论从结构上还是内容上来说，article 本身就是独立的、完整的。

```html
<article>  
    <header>
        <h1>The Very First Rule of Life</h1> 
        <p><time pubdate datetime="2009-10-09T14:28-08:00"></time></p> 
    </header> 
    <p>If there's a microphone anywhere near you, assume it's hot and sending whatever you're saying to the world. Seriously.</p> <p>...</p> 
    <footer> 
        <a href="?comments=1">Show comments...</a> 
    </footer> 
</article>
 
<article>  
    <header> 
        <h1>The Very First Rule of Life</h1> 
        <p><time pubdate datetime="2009-10-09T14:28-08:00"></time></p> 
    </header> 
    <p>If there's a microphone anywhere near you, assume it's hot and sending whatever you're saying to the world. Seriously.</p> 
    <p>...</p> 
    <section> 
        <h1>Comments</h1> 
        <article> 
            <footer> 
                <p>Posted by: George Washington</p>
                <p><time pubdate datetime="2009-10-10T19:10-08:00"></time></p>
            </footer>
            <p>Yeah! Especially when talking about your lobbyist friends!</p> 
        </article> 
        <article>
            <footer>
                <p>Posted by: George Hammond</p> 
                <p><time pubdate datetime="2009-10-10T19:15-08:00"></time></p>
            </footer>
            <p>Hey, you have the same first name as me.</p> 
        </article> 
    </section> 
</article> 
```


### 6. video

```html
<video class="p1_video" id="p1_video" autoplay="autoplay" loop="loop" poster="http://static.sdg-china.com/ds/pic/ds_act/20150403yb/p1Bg.jpg">
    <source src="http://static.sdg-china.com/ds/pic/ds_act/20150403yb/yb.webm" type="video/webm"></source>
    <source src="http://static.sdg-china.com/ds/pic/ds_act/20150403yb/yb.mp4" type="video/mp4"></source>
</video>
```

