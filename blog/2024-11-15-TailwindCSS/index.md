---
title: "TailwindCSS简单记录"
authors: ["AsMuin"]
tags: ["CSS","TailwindCSS"]
---


`Tailwindcss`使用有感
<!-- truncate -->

## TailwindCSS简述

之前的文章也提到过`TailwindCSS`这个`CSS`方案[CSS样式隔离方案](/blog/2024/10/24/CSS_scheme)
最近都在用这个来编写`CSS`，所以简单总结一下使用体验。

大部分情况下,`Tailwind`就是一个`PostCSS`插件，官方建议仅使用`PostCSS`作为预处理器，其他诸如`Sass`或者`Less`等预处理器最好不要混用。（当然也可以使用，只是配置起来比较麻烦,而且使用`Tailwind`后其实并不需要编写很多自定义类`CSS`所以这些预处理器的作用也很有限，除非你是项目临时加入这么一个`CSS`方案---......一般也遇不到这种情况）

`Tailwind`最大的特点就是我们无需为一个个元素去自定义类，去编写定制`CSS`。`Tailwind`提供了大量的`原子类`，让我们像搭积木一样去搭建我们的页面。
当然，`Tailwind`也提供了一些自定义类的功能，让我们可以自定义我们的类。同时允许我们去对`原子类`的属性进行修改或者拓展

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        lightBlue:'#04A5FF',
        lightGray:'#6e6e6e'
      }
    },
  },
  plugins: [],
};
```

### 存在的问题及解决的思路

这样的设计理念确实与我们以往编写定制类的去搭建网页的方式有很大的不同。大量使用`原子类`副作用就是在我们模板标签上存在大量类名, 这对我们的代码可读性和维护性都有很大的影响。以及写法类似编写内联样式，样式复用问题。
这些官方也都有提到，所以官方也说明`Tailwind`更适用与渐进式框架,比如`Reac`，`Vue`。将我们的应用程序拆分成多个组件，通过组件化复用去抽离我们的样式。除此之外,`Tailwind`里允许我们去自定义声明类。

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
@layer base {
    * {
        word-break: break-all;
    }
    .base-bg {
        @apply rounded-lg bg-[#f4f7f7];
    }
    .gray-text {
        @apply text-xs text-[#6e6e6e];
    }
}
@layer components {
    .class-bg {
        background-image: url('/src/assets/img/底纹.png'), linear-gradient(0deg, #f9fdff, #d9edff);
        background-position: top 0px right 0px;
        background-repeat: no-repeat;
    }
}
```

**必须要注意的是这些自定义类是全局的，请不要将它作为定制类去编写**

## 个人感想

`Tailwind`更多是作为一个工具，请不要把它作为`CSS`的替代品。
正如我们前面所提到的一样，`Tailwind`给我们一种搭积木的开发体验，但面对复杂页面，同时需要高度复现设计稿内容的情况下，有一个由整个项目团队（尤其是设计人员）维护的`Tailwind`配置表或者配置项对于开发效率的提升是非常大的。(打个比喻把积木都分类好了，我们只需要根据说明书去搭积木就行了)

...未完待续
