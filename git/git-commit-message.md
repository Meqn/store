

转自：http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html

参考：http://yanhaijing.com/git/2016/02/17/my-commit-message/

http://blog.minfive.com/2017/09/08/2017-09-08-git-commit-message/index.html


# Commit message 编写指南 [规范]

[TOC]



Git 每次提交代码，都要写 Commit message（提交说明），否则就不允许提交。

```bash
$ git commit -m "hello world"
```

上面代码的`-m`参数，就是用来指定 commit mesage 的。

如果一行不够，可以只执行`git commit`，就会跳出文本编辑器，让你写多行。

其实 `commit message` 你写什么都行，但是，一般来说，commit message 应该清晰明了，说明本次提交的目的。



## Commit message 格式

每次提交，Commit message 都包括三个部分：`Header`，`Body` 和 `Footer`。

```bash
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```



```
# 标题行：50个字符以内，描述主要变更内容
#
# 主体内容：更详细的说明文本，建议72个字符以内。 需要描述的信息包括:
#
# * 为什么这个变更是必须的? 它可能是用来修复一个bug，增加一个feature，提升性能、可靠性、稳定性等等
# * 他如何解决这个问题? 具体描述解决问题的步骤
# * 是否存在副作用、风险? 
#
# 尾部：如果需要的化可以添加一个链接到issue地址或者其它文档，或者关闭某个issue。
```



其中，Header 是必需的，Body 和 Footer 可以省略。

不管是哪一个部分，任何一行都不得超过72个字符（或100个字符）。这是为了避免自动换行影响美观。



### 1. Header

Header部分只有一行，包括三个字段：`type`（必需）、`scope`（可选）和`subject`（必需）。

#### 1.1 type

`type`用于说明 commit 的类别，可以使用如下类别

 - feat：新增功能 (feature)
 - fix：修复bug
 - docs：文档 (Documentation)
 - style：格式 (不影响代码运行的变动，比如空格、分号等)
 - refactor：重构 (既不是新增功能，也不是修改bug的代码变动)
 - perf：优化 (提高性能和体验的代码变动)
 - test：增加测试 (包括单元测试，集成测试等)
 - build: 构建工具或外部依赖的更改 (npm webpack gulp等)
 - ci：项目级的配置文件和脚本的更改
 - chore：构建流程或辅助工具的变动(不会修改src或测试文件)
 - revert：撤销(回滚到上一个版本的提交)

如果`type`为`feat`和`fix`，则该 commit 将肯定出现在 Change log 之中。其他情况（`docs`、`chore`、`style`、`refactor`、`test`）由你决定，要不要放入 Change log，建议是不要。

> 使用 `revert` 标识撤销 commit 时，`subject` 应为所撤销的 commit 的 message， Body 应包含 所撤销的 commit 的 hash。
>
> 格式如下：

```
revert: feat(pencil): add 'graphiteWidth' option

This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
```

#### 1.2 scope

`scope`用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

#### 1.3 subject

`subject`是 commit 目的的简短描述，不超过50个字符。

 - 以动词开头，使用第一人称现在时，比如change，而不是changed或changes
 - 第一个字母小写
 - 结尾不加句号（.）


### 2. Body

Body 部分是对本次 commit 的详细描述，可以分成多行。下面是一个范例

```
More detailed explanatory text, if necessary.  Wrap it to 
about 72 characters or so. 

Further paragraphs come after blank lines.

- Bullet points are okay, too
- Use a hanging indent
```

**注意：**应该说明代码变动的动机，以及与以前行为的对比。

### 3. Footer

Footer 部分只用于两种情况。

- 重大的不兼容改动: 用于给出改动说明及解决方案
- 关联 issues: 用于关闭相应 issues

#### 3.1 关联 Issue

本次提交如果和摸个issue有关系则需要写上这个，格式如下：

```
Issue #1, #2, #3
```


#### 3.2 关闭 Issue

如果当前提交信息解决了某个issue，那么可以在 Footer 部分关闭这个 issue，关闭的格式如下：

```bash
Closes #234

# 也可以一次关闭多个 issue
Closes #123, #245, #992
```



### 实例

下面是一个完整的例子：

```
feat: 添加了分享功能

给每篇博文添加了分享功能

- 添加分享到微博功能
- 添加分享到微信功能
- 添加分享到朋友圈功能

Issue #1, #2
Close #1
```



## 高效使用

上边介绍了如何按规范写 commit message，利用工具可以更高效的使用这套规范。

1. [Commitizen](https://github.com/commitizen/cz-cli) ：是一个撰写合格 Commit message 的工具
2. [validate-commit-msg](https://github.com/kentcdodds/validate-commit-msg) ：用于检查 Node 项目的 Commit message 是否符合格式。



## emoji 表情

在 github 提交代码时加入 emoji 表情感觉是件很有趣的事情，不仅可以让提交记录能包含更多有用信息，也能提升阅读体验。

[开源项目 gitmoji](https://gitmoji.carloscuesta.me/) 专门规定了在 github 提交代码时应当遵循的 emoji 规范：

**gitmoji 项目：**

gitmoji官网：https://gitmoji.carloscuesta.me/  
Github仓库：https://github.com/carloscuesta/gitmoji/  


![git emoji](./assets/git-emoji.jpeg)


 - `:art:` - 改进结构和代码格式 			:art:
 - `:zap:` - 优化性能 					:zap:
 - `:fire:` - 移除代码或文件 				:fire:
 - `:bug:` - 修复 bug 					:bug:
 - `:sparkles:` - 引入新功能 				:sparkles:
 - `:apple:` - 修复 MacOS 下的问题 		:apple:
 - `:memo:` - 写文档 						:memo:
 - `:rocket:` - 部署新功能 				:rocket:
 - `:white_check_mark:` - 添加测试用例 				:white_check_mark:
 - `:bookmark:` - 发版/版本标签 						:bookmark:
 - `:lock:` - 修复安全问题 							:lock:
 - `:penguin:` - 修复 Linux 下的问题 					:penguin:
 - `:rotating_light:` - 移除 linter 的警告 			:rotating_light:
 - `:construction:` - 工作在进行中 					:construction:
 - `:green_heart:` - 修复 CI 构建问题 				:green_heart:
 - `:arrow_down:` - 降级依赖库 						:arrow_down:
 - `:checkered_flag:` - 修复 Windows 下的问题 		:checkered_flag:
 - `:arrow_up:` - 升级依赖库 							:arrow_up:
 - `:construction_worker:` - 添加 CI 构建系统 		:construction_worker:
 - `:wrench:` - 改变配置文件 							:wrench:
 - `:hammer:` - 大重构 								:hammer:
 - `:tada:` - 初次提交 								:tada:
 - `:lipstick:` - 升级 UI 和样式文件 					:lipstick:





