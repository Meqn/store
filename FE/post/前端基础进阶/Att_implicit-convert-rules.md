# 隐式转换规则



学习，并背诵全文

### 原始值

| 类型 | Undefined | Null | String     | Boolean    | Number       |
| ---- | --------- | ---- | ---------- | ---------- | ------------ |
| 值   | undefined | null | 所有字符串 | true false | 所有数字/NaN |

### 引用类型

Object的成员叫对象，包括Array，Function，Math，Date，JSON，RegExp等除了原始值之外的所有的类型的成员。

### valueOf / toString

|          | Object          | String | Array              | Number     | Date           | Boolean        | Function |
| -------- | --------------- | ------ | ------------------ | ---------- | -------------- | -------------- | -------- |
| valueOf  | 原始值          | 原始值 | 原始值             | 原始值     | 毫秒时间戳     | 原始值         | string   |
| toString | [Object Object] | 原始值 | join方法返回的结果 | 数字字符串 | 本地时间字符串 | 'true'/'false' | string   |

### Boolean(x)

| X                  | Undefined | Null | String     | Boolean | Number    | Object |
| ------------------ | --------- | ---- | ---------- | ------- | --------- | ------ |
| Boolean(X) = true  | -         | -    | 非空字符串 | true    | 非0 非NaN | 所有   |
| Boolean(X) = false | undefined | null | 空字符串   | false   | 0 NaN     |        |

### Number(x)

| X                  | Undefined | Null | String             | Boolean | Number   | Object                            |
| ------------------ | --------- | ---- | ------------------ | ------- | -------- | --------------------------------- |
| Number(X) = number | -         | -    | 全为数字           | -       | 原样返回 | desc: 先调用valueOf再转换为Number |
| Number(X) = 0      | -         | null | '0'                | false   | 0        | -                                 |
| Number(X) = 1      | -         | -    | '1'                | true    | 1        | -                                 |
| Number(X) = NaN    | undefined | -    | 包含数字之外的字符 | -       | NaN      | -                                 |

### String(x)

| X         | Undefined   | Null   | String   | Boolean        | Number       | Object                         |
| --------- | ----------- | ------ | -------- | -------------- | ------------ | ------------------------------ |
| String(x) | 'undefined' | 'null' | 原样返回 | 'true'/'false' | toString结果 | 先转为原始值，然后调用toString |

### Object(x)

| x         | undefined | null | Boolean                | Number                | String                | Object   |
| --------- | --------- | ---- | ---------------------- | --------------------- | --------------------- | -------- |
| Object(x) | {}        | {}   | 原始值为X的Boolean对象 | 原始值为X的Number对象 | 原始值为X的String对象 | 原值输出 |

```js
Object(undefined) // {}
Object(null)  // {}
Object(true)   // Boolean {true}
Object(false)  // Boolean {false}
Object(1)      // Number {1}
Object('hello') // String {"hello"}
Object({ a: 1 }) // {a: 1}
```

### 场景

#### 转换为Number

- 一元 +, - 运算符

```js
+{} = NaN
+'20' = 20
-'20' = -20
+[] = 0;
+[1] = 1;
+[1, 2] = NaN
```

- `++`, `--` 运算符
- `+`, `-`, `*`, `/`, `%` 计算

> 需要注意的是，当 + 计算有字符串参与计算时，会转换为字符串。

- `>`, `<`, `>=`, `<=` 比较运算符， 操作数都不是String类型时
- `==`, `!=` 操作数中只有String类型和Number类型，或者其中有一个是Boolean

#### 转换为Boolean

- `&&` `!` `||` 运算
- 条件运算
- `if, while, do-while, for`

#### 转换为String

- `+` 号运算，其中一个操作符为字符串
- 比较运算，其中一个操作符为字符串