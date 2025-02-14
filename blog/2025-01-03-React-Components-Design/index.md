---
title: "React 组件封装思路"
authors: ["AsMuin"]
tags: ["React","TypeScript"]
---
`React`组件封装以及`Hook`的综合运用
<!-- truncate -->
## 前言

`React`使用`JSX`编写`UI`组件,在`React`中,通过组件概念的封装,可以保证页面代码的复用性同时更好去维护,提高开发效率。

## 基于`Props`和`ref`去封装组件

在我们的页面开发中这种封装思路应该是最常见的。
父组件通过传入`Props`从而控制子组件的行为和表现。同时,子组件也可以借由父组件传入的`ref`将自己的部分内容暴露给父组件进行访问
```tsx
// 父组件
import { useState, useRef } from'react';
import ChildComponent from './ChildComponent';

function parentComponent(){
const [count,setCount] = useState(1);
const childRef = useRef(null);
function letChildSay(){
    childRef.current.childSay();
}
    return (
    <>
    <button onClick={letChildSay}>childSay</button>
    <ChildComponent ref={childRef} count={count} />
    </>
    )
}


// 子组件
import { useRef,forwardRef,useImperativeHandle } from'react';

function ChildComponent({count},ref){
const childRef = useRef(null);

useImperativeHandle(ref,()=>({
    childSay(){
        console.log('child say')
    }
}))

return <div>{count}</div>

}

export default forwardRef(ChildComponent);
```

但这样做有个弊端,我们的`Props`和`ref`是需要一级级传递并且需要自己去一级级去管理传递。

面对动态嵌套组件,参数的传递变得十分困难。由此引出`Context`去帮助我们去解决这个痛点。

## 基于`Context`

```ts
import { createContext, useContext } from 'react';
interface IDrawerContext {
    drawerVisible: boolean;
    drawerToggle: () => void;
    drawerClose: () => void;
    drawerOpen: () => void;
}
const DrawerContext = createContext<IDrawerContext | null>(null);
function useDrawerContext() {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error('useDrawerContext must be used within a DrawerProvider');
    }
    return context;
}
export { DrawerContext, useDrawerContext };
```

我们在一个单独的文件中定义了一个`DrawerContext`和`useDrawerContext`方法。`useDrawerContext`是一个`hook`,它的作用是检测当前上下文是否存在`DrawerContext`,如果不存在则抛出一个错误。在`TS`项目中这个`hook`能够帮我们解决访问`Context`时`TS`类型推导存在`undefined`的问题。

```tsx
import useToggle from '@/Hooks/state/useToggle';
import { useDrawerContext, DrawerContext } from '@/service/context/Drawer';
function Drawer({ children }: { children: React.ReactNode }) {
    const [drawerVisible, { toggle: drawerToggle, setDefault: drawerClose, setReverse: drawerOpen }] = useToggle<boolean, boolean>(false, true);
    return (
        <DrawerContext.Provider
            value={{
                drawerVisible,
                drawerToggle,
                drawerClose,
                drawerOpen
            }}>
            <div className="drawer drawer-end">
                <input type="checkbox" className="drawer-toggle" checked={drawerVisible} onChange={drawerToggle} />
                {children}
            </div>
        </DrawerContext.Provider>
    );
}
Drawer.PageContent = function DrawerPageContent({ children }: { children: React.ReactNode }) {
    return <div className="drawer-content">{children}</div>;
};
Drawer.Content = function DrawerContent({ children }: { children: React.ReactNode }) {
    const { drawerToggle } = useDrawerContext();
    return (
        <div className="drawer-side">
            <label onClick={drawerToggle} className="drawer-overlay"></label>
            <div className="menu min-h-full w-[60%] bg-nav text-main md:w-80 md:p-4">{children}</div>
        </div>
    );
};
export default Drawer;
```
这是一个典型的抽屉`UI`组件,`PageContent`和`Content`分别是主页面的内容和抽屉容器内容。我们将`Drawer`组件作为一个`Provider`组件,将`Drawer`组件内部的`state`和`action`暴露给子组件。

主页面的内容和抽屉容器内容,也就是`PageContent`和`Content`组件中的`children`,它们作为`JSX.Elemnt`插入到相应的位置。在这些组件或者这些组件的后代组件,都能通过`useDrawerContext`方法访问到`Drawer`组件内部的`state`和`action`,控制抽屉的打开和关闭。

值得注意的是,`Drawer`本身作为一个祖先组件提供`ContextProvider`,而`Drawer.PageContent`和`Drawer.Content`则作为`Drawer`的子组件也仅存在于`Drawer`的内部,它们只负责将相应的内容放置对应的位置进行渲染,并且能让它们的后代组件能够访问到`Context`。

### 样例

```tsx
   <>
            <MessageManager />
            <Drawer>
                <Drawer.PageContent>
                    <Message></Message>
                    <div className="h-screen bg-back p-2">
                        <div className="flex h-[90%] pb-2">
                            <Sidebar></Sidebar>
                            <Suspense fallback={<div>Loading...</div>}>
                                <Display>
                                    <Navbar></Navbar>
                                    <Outlet />
                                </Display>
                            </Suspense>
                        </div>
                        <Player></Player>
                    </div>
                </Drawer.PageContent>
                <Drawer.Content>{isLogin && <UserInfo />}</Drawer.Content>
            </Drawer>
        </>
```

....未完待续