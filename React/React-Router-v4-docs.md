

# React-Router v4 Docs

[TOC]



React Router V4（简称RR4） 遵循了 React 的理念：`万物皆组件`。它只是一堆提供了导航功能的组件（如 Route, Link, Switch等都是一个普通组件，还有若干对象和方法），具有声明式、可组合性的特点。

> 声明式编程简单来讲就是你只需要关心做什么，而无需关心如何去做，好比你写 React 组件，只需要 render 出你想要的组件，至于组件是如何实现的是 React 要处理的事情。



React Router V4 基于 Lerna 管理多个 Repository。在此代码库包括：

| 库名                  | 说明                              |
| --------------------- | --------------------------------- |
| `react-router`        | React Router 核心组件             |
| `react-router-dom`    | 用于 DOM 绑定的 React Router      |
| `react-router-native` | 用于 React Native 的 React Router |
| `react-router-redux`  | React Router 和 Redux 的集成      |
| `react-router-config` | 静态路由配置帮助助手              |

**Tips：**

`react-router-dom` 比 `react-router` 多了 `<Link>` `<BrowserRouter>` 这样的DOM类组件，因为我们只需引入`react-router-dom`包就ok了。



```jsx
import React from 'react'
import {
  BrowserRouter as Router,		// 或 HashRouter、MemoryRouter
  Route,		// 基本路由块，渲染UI
  Link,			// 相当 a 标签
  Switch,		// 执行一个匹配的路由
  Redirect,		// 重定向
  Prompt,		// 防止跳转
  withRouter	//
} from 'react-router-dom'
```







# 组件

## `Router` 

Router 是所有路由组件共用的底层接口，一般我们的应用并不会使用这个接口，而是使用高级的路由。

**高级路由：**

| 名称              | 说明                                                         |
| ----------------- | ------------------------------------------------------------ |
| `<BrowserRouter>` | 使用 HTML5 提供的 history API 来保持 UI 和 URL 的同步；      |
| `<HashRouter>`    | 使用 URL 的 hash (例如：window.location.hash) 来保持 UI 和 URL 的同步； |
| `<MemoryRouter>`  | 能在内存保存你 “URL” 的历史纪录(并没有对地址栏读写)；        |
| `<NativeRouter>`  | 为使用React Native提供路由支持；                             |
| `<StaticRouter>`  | 从不会改变地址；                                             |




**Tips**

`<Router>` 组件下只允许存在一个子元素，如存在多个则会报错。

```jsx
const Example = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">首页</Link></li>
        <li><Link to="/about">关于</Link></li>
        <li><Link to="/topics">主题列表</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </Router>
)
```





## `BrowserRouter`

一个使用了 HTML5 history API （`pushState`, `replaceState`, `popState`）的高阶路由组件，保证你的 UI 界面和 URL 保持同步。




| 属性名                | 类型     | 说明                                               |
| --------------------- | -------- | -------------------------------------------------- |
| `basename`            | string   | 为所有位置添加一个基准URL (如把页面部署到二级目录) |
| `getUserConfirmation` | function | 导航到此页面前执行的函数，默认使用 window.confirm  |
| `forceRefresh`        | bool     | 当浏览器不支持 HTML5 的 history API 时强制刷新页面 |
| `keyLength`           | number   | 置它里面路由的 `location.key` 的长度。默认是6。    |
| `children`            | node     | 渲染唯一子元素。                                   |





## `Route`

Route组件主要的作用就是当页面的访问地址与路由的path匹配时，渲染出对应的UI界面。

`<Route>`组件中有三种渲染方式：

> 每一种渲染方式都会传入相同形式的路由属性 props —— `{match, location, history}`

| 方法名              | 说明                                                         |
| ------------------- | ------------------------------------------------------------ |
| `<Route component>` | 在地址匹配的时候React的组件才会被渲染，route props也会随着一起被渲染。 |
| `<Route render>`    | 该方式对内联渲染和包装组件却不引起意料之外的重新挂载特别方便。 |
| `<Route children>`  | 有时无论路径是否匹配都要渲染组件，这种情况下使用 children 渲染方式，<br />它和 render 方式类似只是多了一个匹配过程。 |


**Tips：**


>  - 使用 component 渲染方式时，React 会自动将所对应的组件转化为 React 组件，因此如果所对应组件是内联函数形式，请使用 render 或 children 渲染方式，避免每次都生成新的 React 组件。
>  - component 和 render 方式都优先于 children 方式，因此无法在一个 `<Route>` 组件中同时使用。





**其他属性：**

| 属性名   | 类型   | 说明                                                         |
| -------- | ------ | ------------------------------------------------------------ |
| `path`   | string | 路由匹配路径（没有path属性的Route 总是会 匹配）              |
| `exact`  | bool   | 值为true时，则路径与location.pathname必须完全匹配            |
| `strict` | bool   | 值为 true时，有结尾斜线的路径只能匹配有斜线的location.pathname； |



```jsx
// Reacat组件
const User = ({ match, location, history }) => {
  return <h1>Hello {match.params.userId}!</h1>
}

// route component
<Route exact strict path="/about" component={About}/>
<Route path="/user/:userId" component={User}/>
// route render 内联渲染
<Route path="/home" render={() => <div>Home</div>}/>

// 打包路由
const FadingRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <FadeIn>
      <Component {...props}/>
    </FadeIn>
  )}/>
)

<FadingRoute path="/cool" component={Something}/>

/*
 * <Route children>
*/
<ul>
  <ListItemLink to="/somewhere" />
  <ListItemLink to="/somewhere-ele" />
</ul>

const ListItemLink = ({ to, ...rest }) => (
  <Route path={to} children={({ match }) => (
    <li className={match ? 'active' : ''}>
      <Link to={to} {...rest} />
    </li>
  )}
)
```





## `Link`

为应用提供声明式，无障碍导航。

`<Link>`用来跳转页面。可以类比HTML的锚元素。然而，使用锚链接会导致浏览器的刷新，这不是我们想要的。所以，我们可以使用`<Link>`来跳转至具体的URL，并且视图重新渲染不会导致浏览器刷新。

| 属性名     | 类型             | 说明                                              |
| ---------- | ---------------- | ------------------------------------------------- |
| `to`       | string \| object | 要跳转的路径或地址                                |
| `replace`  | bool             | true: 点击链接将替换原地址; false: 增加一条新纪录 |
| `innerRef` | function         | 允许访问组件的底层引用                            |



```jsx
// to:string
<Link to="/about">关于</Link>
// to:object
<Link to={{
  pathname: '/courses',
  search: '?sort=name',
  hash: '#the-hash',
  state: { fromDashboard: true }
}}/>
// relpace
<Link to="/courses" replace />
```





## `NavLink`

`<NavLink>`是`<Link>` 的一个特定版，顾名思义这就是为页面导航准备的。因为导航需要有 “激活状态”，它会在匹配上当前 URL 的时候会给已经渲染的元素添加样式参数。

**组件属性：**

| 属性名            | 类型     | 说明                                                         |
| ----------------- | -------- | ------------------------------------------------------------ |
| `activeClassName` | string   | 设置选中样式，默认值为 active；                              |
| `activeStyle`     | object   | 当元素被选中时, 为此元素添加样式；                           |
| `exact`           | bool     | 为 true 时,  只有当访问地址严格匹配时激活样式才会应用；      |
| `strict`          | bool     | 为 true 时， 只有当访问地址后缀斜杠严格匹配（有或无）时激活样式才会应用； |
| `isActive`        | function | 判断链接是否激活的额外逻辑的功能；                           |

```js
// activeClassName选中时样式为selected
<NavLink
  to="/faq"
  activeClassName="selected"
>FAQs</NavLink>

// 选中时样式为activeStyle的样式设置
<NavLink
  to="/faq"
  activeStyle={{
    fontWeight: 'bold',
    color: 'red'
   }}
>FAQs</NavLink>

// 当event id为奇数的时候，激活链接
const oddEvent = (match, location) => {
  if (!match) {
    return false
  }
  const eventID = parseInt(match.params.eventID)
  return !isNaN(eventID) && eventID % 2 === 1
}

<NavLink
  to="/events/123"
  isActive={oddEvent}
>Event 123</NavLink>
```





## `Switch`

只渲染出第一个与当前访问地址匹配的 `<Route>` 或 `<Redirect>`。

`<Switch>`与Switch语句功能类似，执行第一个匹配的路由。`<Switch>`的独特之处是独它仅仅渲染一个路由。相反地，每一个包含匹配地址(location)的`<Route>`都会被渲染。

思考下面的代码：

```js
<Route path="/about" component={About}/>
<Route path="/:user" component={User}/>
<Route component={NoMatch}/>
```

如果现在的URL是`/about`，那么`<About>`, `<User>`, 还有`<NoMatch>`都会被渲染，因为它们都与路径(path)匹配。这种设计，允许我们以多种方式将多个`<Route>`组合到我们的应用程序中，例如侧栏(sidebars)，面包屑(breadcrumbs)，bootstrap tabs等等。 然而，偶尔我们只想选择一个`<Route>`来渲染。如果我们现在处于`/about`，我们也不希望匹配`/:user`（或者显示我们的 “404” 页面 ）。

以下是使用 Switch 的方法来实现：

```js
<Switch>
  <Route exact path="/" component={Home}/>
  <Route path="/about" component={About}/>
  <Route path="/:user" component={User}/>
  <Route component={NoMatch}/>
</Switch>
```

现在，如果我们处于`/about`，`<Switch>`将开始寻找匹配的`<Route>`。`<Route path="/about"/>` 将被匹配， `<Switch>`将停止寻找匹配并渲染`<About>`。同样，如果我们处于`/michael`，`<User>`将被渲染。



**location**

如果 `<Switch>` 组件中给出了 location 属性，子元素将不再与当前位置或 URL 进行匹配操作，而是与该属性进行匹配，并且匹配的子元素的 location 值将被覆盖为 `<Switch>` 的 location 属性值。



**children**

在 `<Switch>` 组件中子元素可以是 `<Route>` 和 `<Redirect>` 组件， `<Route>` 使用 `path` 属性进行匹配，而 `<Redirect>` 使用 `from` 属性进行匹配。

```js
<Switch>
  <Route exact path="/" component={Home}/>

  <Route path="/users" component={Users}/>
  <Redirect from="/accounts" to="/users"/>

  <Route component={NoMatch}/>
</Switch>
```





## `Redirect`

`<Redirect>` 渲染时将导航到一个新地址，这个新地址覆盖在访问历史信息里面的本该访问的那个地址。

| 属性名   | 类型             | 说明                                                         |
| -------- | ---------------- | ------------------------------------------------------------ |
| `to`     | string \| object | 重定向的 URL                                                 |
| `push`   | bool             | 为 true 时，重定向操作将会把新地址加入到访问历史记录里面，并且无法回退到前面的页面。 |
| `from`   | string           | 表明从哪个位置进行重定向操作的。<br />该属性只有在 `<Switch>` 组件中才有效。<br />实际上该属性就是 `<Route>` 组件中 `path` 属性的别称，与此同理还可以使用 `exact`， `strict`， `path`。 |
| `exact`  | bool             |                                                              |
| `strict` | bool             |                                                              |

```js
// to:string
<Redirect to="/somewhere/else"/>

// to:object
<Redirect to={{
  pathname: '/login',
  search: '?utm=your+face',
  state: { referrer: currentLocation }
}}/>

// Route内联渲染
<Route exact path="/" render={() => (
  loggedIn ? (
    <Redirect to="/dashboard"/>
  ) : (
    <PublicHomePage/>
  )
)}/>
```





## `Prompt`

当用户离开当前页面前做出一些提示。

| 属性名    | 类型           | 说明                                           |
| --------- | -------------- | ---------------------------------------------- |
| `message` | string \| func | 当用户离开当前页面时，设置的提示信息或回调函数 |
| `when`    | bool           | 通过设置一定条件要决定是否启用 Prompt          |

```js
<Prompt message="Are you sure you want to leave ？" />

<Prompt when message={location => (
  `Are you sue you want to go to ${location.pathname}?` 
)} />
```





# 对象和方法



## history

history 是 React-Router的两个主要依赖之一（另一个React），它提供了几种不同的实现来管理javascript中的会话(session) 历史。

我们会经常使用以下术语：

- `browser history` ：history 在 DOM 上的实现，用于支持 HTML5 history API 的浏览器。
- `hash history` ：history 在 DOM 上的实现，用于兼容旧版浏览器。
- `memory history` ：history 在内存上的实现，用于测试或非 DOM 环境（如 React Native）。




### 属性

| 属性名             | 类型   | 说明                                                    |
| ------------------ | ------ | ------------------------------------------------------- |
| `history.length`   | number | 浏览历史堆栈中的条目数                                  |
| `history.action`   | string | 路由跳转到当前页面执行的动作，分为 `PUSH, REPLACE, POP` |
| `history.location` | object | 当前访问地址信息组成的对象。                            |

`history.location`具有如下属性：

> - `pathname` : [string] `URL`路径
> - `search` : [string] `URL`中的查询字符串
> - `hash` : [string] `URL`的 hash 片段
> - `state` : [object] 路径的状态，只在 browser 和 memory history 中有效。
> - `push(path, [state])` : [func]

### 方法


- `history.push(path, [state])` 在历史堆栈信息里加入一个新条目
- `history.replace(path, [state])` 在历史堆栈信息里替换掉当前的条目
- `history.go(n)` 将 history 堆栈中的指针向前移动 n
- `history.goBack()` 同于  `go(-1)`
- `history.goForward()` 等同于 `go(1)`
- `history.block(prompt)` 暂时阻止导航（比如："您确定离开"）





> 点击`<Link>`组件会触发`history.push()`，使用`<Redirect>`则会调用`history.replace()`。



**Tips：**

> **history 是可变的**，因此状态路径的访问方式推荐使用 `<Route>` 的属性（props）里间接获取，而不是直接使用 `history.location`。这可以保证在 React 生存周期里能够获得正确的比较。



```js
class Comp extends React.Component {
  componentWillReceiveProps(nextProps) {
    // 返回 true
    const locationChanged = nextProps.location !== this.props.location

    // 错误，总是 false，因为 history 是可变的。
    const locationChanged = nextProps.history.location !== this.props.history.location
  }
}

<Route component={Comp}/>
```





## location

`location` 是指你当前的位置，将要去的位置，或是之前所在的位置。

我们也称之为状态路径，意思就是具有状态的路径。该对象与 url 对应，其具体属性如下：

```js
{
  key: 'ac3df4'
  pathname: '/about',
  search: '?name=minooo'
  hash: '#bio',
  state: {
    price: 123
  }
}
```



在以下情境中可以获取 `location` 对象：

- 在 `Route component` 中，以 `this.props.location` 获取
- 在 `Route render` 中，以 `({location}) => ()` 方式获取
- 在 `Route children` 中，以 `({location}) => ()` 方式获取
- 在 `withRouter` 中，以 `this.props.location` 的方式获取





可以在不同情境中使用 `location`对象：

- `<Link to={location} />`
- `<NaviveLink to={location} />`
- `<Redirect to={location />`
- `history.push(location)`
- `history.replace(location)`




**Tips：**

> `location` 对象不会发生改变，因此可以在生命周期的回调函数中使用 location 对象来查看当前页面的访问地址是否发生改变。这种技巧在获取远程数据以及使用动画时非常有用。




```js
componentWillReceiveProps(nextProps) {
  if (nextProps.location !== this.props.location) {
    // 已经跳转了！
  }
}
```




## match

match 对象用以描述 `<Route path>` 匹配 URL 的结果，其实就是 `<Route>` 组件的 state ，`<Route>` 组件根据 match 对象进行状态转换。主要的属性有：

| 属性名          | 类型   | 说明                                          |
| --------------- | ------ | --------------------------------------------- |
| `match.params`  | object | 路径参数，通过解析 URL 中的动态部分获得键值对 |
| `match.isExact` | bool   | 为 true 时，整个 URL 都需要匹配               |
| `match.path`    | string | 用来匹配的路径模式，用于创建嵌套的 `<Route>`  |
| `match.url`     | string | URL匹配的部分，用于嵌套的 `<Link>`            |



在以下情境中可以获取 match 对象（意味着将 `<Route>` 的 state 传递为子组件的 props）：

- 在 `Route component` 中，以 `this.props.match`获取
- 在 `Route render` 中，以 `({match}) => ()` 方式获取
- 在 `Route children` 中，以 `({match}) => ()` 方式获取
- 在 `withRouter` 中，以 `this.props.match`的方式获取
- matchPath 的返回值





> 如果`<Route>`中没有 `path`，将匹配所有路径， match 对象就是其父对象的 match。





# 路径匹配说明

## exact: bool

完全匹配的逻辑：

| 路径 | location.pathname | exact | 是否匹配 |
| ---- | ----------------- | ----- | -------- |
| /one | /one/two          | true  | 否       |
| /one | /one/two          | false | 是       |



## strict:bool

有结尾斜线的路径匹配逻辑：

| 路径  | location.pathname | strict | 是否匹配 |
| ----- | ----------------- | ------ | -------- |
| /one/ | /one              | true   | 否       |
| /one/ | /one/             | true   | 是       |
| /one/ | /one/two          | true   | 是       |




# 参考

- [React Router v4 入坑指南](https://www.jianshu.com/p/6a45e2dfc9d9)
- [初探 React Router 4.0](https://www.jianshu.com/p/e3adc9b5f75c)
- [React-Router v4 学习](https://www.jianshu.com/p/1781bc1dd938)