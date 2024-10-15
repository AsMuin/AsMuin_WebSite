---
title: "Interface vs Type"
authors: ["AsMuin"]
tags: ["TypeScript"]
---

## 写法的不同
```typescript
interface Person {
    name: string,
    age:number,
    saySomething(text:string):void
}

type Student = {
    name:string,
    age:number,
    saySomething(text:string):void
}
```
## 适用范围
`type`作为类型别名能够用于`基本数据类型`、`联合类型`、`元组`,
而`interface`做不到
```typescript
// primitive
type Name = string;

// object
type PartialPointX = { x: number; };
type PartialPointY = { y: number; };

// union
type PartialPoint = PartialPointX | PartialPointY;

// tuple
type Data = [number, string];

// dom
let div = document.createElement('div');
type B = typeof div;
```
## 定义
与`类型别名`不同，`接口`可以定义多次，会被自动合并为单个接口。
```typescript
interface Point { x: number; }
interface Point { y: number; }
const point: Point = { x: 1, y: 2 };
```

## 拓展
两者的扩展方式不同，但并不互斥。`接口`可以扩展`类型别名`，同理，`类型别名`也可以扩展`接口`。

`接口`的扩展就是`继承`，通过 `extends` 来实现。`类型别名`的扩展就是`交叉类型`，通过 `&` 来实现
```typescript
//类型别名拓展类型别名
type PointX = {
    x: number
}

type Point = PointX & {
    y: number
}
```

```typescript
//接口拓展接口
interface PointX {
    x: number
}

interface Point extends PointX {
    y: number
}
```

```typescript
//类型别名拓展接口
interface PointX {
    x: number
}

type Point = PointX & {
    y: number
}
```

```typescript
//接口拓展类型别名
type PointX = {
    x: number
}

interface Point extends PointX {
    y: number
}
```
