---
sidebar_position: 1
---
# TypeScript 简介
`TypeScript` 是由微软开发的自由和开源的编程语言。通过在 `JavaScript`的基础上添加静态类型定义构建而成。`TypeScript` 通过 TypeScript 编译器或 Babel 转译为 JavaScript 代码


本质上运行的代码还是`JavaScript`,只是`TypeScript`提供了在编译时的静态类型检查，在开发阶段就可以发现问题，而不是在运行时才发现问题。
**在`TypeScript`项目中,往往需要`tsconfig.json`文件来配置TypeScript的编译选项。**

## 类型推断
在很多情况下，`TypeScript` 会根据上下文环境自动推断出变量的类型
```typescript
 let str = 'this is string'; // 等价 let str: string = 'this is string

```
`TypeScript` 这种基于赋值表达式推断类型的能力称之为类型推断

## 类型断言
类型检测无法做到绝对智能，毕竟程序不能像人一样思考。有时会碰到我们比 `TypeScript` 更清楚实际类型的情况。此时可以使用类型断言来指定一个值的类型。
```typescript

const arrayNumber: number[] = [1, 2, 3, 4];
// const greaterThan2: number = arrayNumber.find(num => num > 2) :number || undefined
const greaterThan2: number = arrayNumber.find(num => num > 2) as number;( 使用`as` 断言为number类型)
const greaterThan2: number = <number>arrayNumber.find(num => num > 2) (使用尖括号语法)
```

## 非空断言
在上下文中当类型检查器无法断定类型时，一个新的后缀表达式操作符 `!` 可以用于断言操作对象是非 `null` 和非 `undefined` 类型。即排除了`null`和`undefined`类型。
```typescript
let mayNull: null | undefined | number;
const test = mayNull!.toString(); // ok
const test2 = mayNull.toString(); // error

type NumGenerator = () => number;

function myFunc(numGenerator: NumGenerator | undefined) {
  // Object is possibly 'undefined'.(2532)
  // Cannot invoke an object which is possibly 'undefined'.(2722)
  const num1 = numGenerator(); // Error
  const num2 = numGenerator!(); //OK
}
```
## 确定赋值断言
实例属性和变量声明后面放置一个`!` 号，从而告诉 `TypeScript` 该属性会被明确地赋值。
```typescript
let x: number;
initialize();

// Variable 'x' is used before being assigned.(2454)
console.log(2 * x); // Error
function initialize() {
  x = 10;
}

-------------------------------------------------------------

let x!: number;
initialize();
console.log(2 * x); // Ok

function initialize() {
  x = 10;
}
```

## 字面量类型
`TypeScript` 支持 3 种字面量类型：字符串字面量类型、数字字面量类型、布尔字面量类型，对应的字符串字面量、数字字面量、布尔字面量分别拥有与其值一样的字面量类型
```typescript
  let specifiedStr: 'this is string' = 'this is string';
  let specifiedNum: 1 = 1;
  let specifiedBoolean: true = true
```
同时这里也涉及了一个需要注意的点。 `'this is string'` 虽然是一个`string`类型,但不是所有`string`都是`'this is string'`
`'this is string'`可以赋值给其他`string`类型不报错,但`string`赋值给`'this is string'`就不一定了。

### 字面量类型的应用场景
字面量类型往往与联合类型一起使用
```typescript
type Direction = 'up' | 'down';

function move(dir: Direction) {
  // ...
}
move('up'); // ok
move('right'); // ts(2345) Argument of type '"right"' is not assignable to parameter of type 'Direction'

---------------------------------------------------------------------------------------

interface Config {
    size: 'small' | 'big';
    isEnable:  true | false;
    margin: 0 | 2 | 4;
}

const config: Config = {
    size:'small',
    isEnable: true,
    margin: 0
}


```
## const、let 对类型推断的作用
一般情况下,使用`const`声明的变量,`TypeScript`直接推断赋值字面量的类型。`let`会推断赋值字面量类型的父类型。