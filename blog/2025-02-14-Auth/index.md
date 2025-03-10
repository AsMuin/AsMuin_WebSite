---
title: "用户登录方案"
authors: ["AsMuin"]
tags: ["Database","Auth"]
---

分析用户登录的过程。
<!-- truncate -->

## cookie

### 简介

`cookie`本质上只是存储在浏览器中的一小段数据片段，由服务端通过`set-cookie`响应头进行设置。页面发送网络请求的时候，只要不涉及跨域，浏览器都会自动携带`cookie`。因为`cookie`本身不能跨域，即使设置`domain`也只能做到同一个二级域名下三级域名之间的跨域。同时`cookie`由浏览器自己管理，在没过期前，浏览器会自动携带`cookie`。而如果没有设置过期时间，当页面关闭时，`cookie`就会被清除。同时`cookie`的大小有限制，一般为4KB。

### 用户认证过程

1. 服务端在用户登录成功后，将用户认证信息放入在`cookie`中并设置过期时间通过`set-cookie`传回给客户端。
2. 在`cookie`有效期间，客户端每次请求服务端都会携带`cookie`，并通过里面的信息完成用户认证。

### 缺点

1. 首先`cookie`在客户端进行存储，并且直接存储用户信息。即使通过设置`httpOnly`可以阻止`js`脚本去访问，但用户本身是可以通过开发者工具看到`cookie`内容。
2. `cookie`的大小有所限制，存储的信息量有限。
3. 服务端没有办法使`cookie`里认证信息失效，从而去控制用户的登录状态。
4. `cookie`由浏览器自己进行管理和控制，存在众多限制和默认行为，比如涉及到跨域的请求，就没办法携带`cookie`。

### 总结

单纯采用`cookie`进行用户认证有着诸多缺点，一般都是在`session`和`token`方案将`cookie`作为传递凭证的媒介。

## session

### 简介以及认证过程

`session`是存储在服务端的用户会话数据，在用户登录成功后，生成一个唯一的`sessionId`去映射指定的用户信息,并将`sessionId`通过`cookie`存储在客户端中,后续客户端的请求自动带上`cookie`中的`sessionId`，服务端通过`sessionId`找到指定的用户信息完成用户的认证。

### 优点

1. `session`由服务端自己进行存储和管理，这也就意味这服务端对用户的登录状态有绝对的控制权。能够通过删除会话记录使用户的登录凭证无效。
2. `session`存储在服务端，不会受到`cookie`大小的限制，能够存储较大的数据量。同时只将`sessionId`传回给客户端,也避免了关键信息的泄漏。

### 缺点

1. 由于`session`存储在服务端中，服务器需要花费存储资源去存储、维护用户的会话数据。
2. 在项目比较庞大，需要使用多台服务器去均衡负载，`session`的管理会比较复杂，需要在多台服务器之间进行同步。

## token(JWT)

### 简介

`token`是一个经过加密、签名的字符串，里面包含了用户的认证信息，由服务端进行签发以及解析里面的内容进行登录认证。

### 认证过程

1. 用户登录成功后，服务端这边根据用户信息去签发一个`JWT`，并将其返回给客户端。
2. 客户端拿到`JWT`，将其存储在`cookie`或者`localStorage`中（根据项目架构决定，比如涉及到了跨域请求一般存储到 `localStorage`毕竟`cookie`不能跨域），后续客户端的请求自动带上`JWT`（存储在`localStorage`的情况下，需要前端在请求做额外的处理将`JWT`放入到自定义请求头中）。
3. 服务端拿到`JWT`后，解析其中的内容，完成用户的认证。

### 优点

1. `JWT`由服务端进行签发和解析，不需要对用户的会话记录进行存储，减轻服务端的存储压力。并且能够在多台服务器之间保持登录的一致性。
2. `JWT`本身并不依赖于`cookie`,针对项目涉及跨域的请求，可以采取将签发的`JWT`存储在`localStorage`中，由前端控制把`JWT`放入到自定义请求头中,从而绕过`cookie`跨域的限制。

### 缺点

1. `JWT`本身经过签名，存储的信息有限。
2. `JWT`由服务端进行签发和解析，这个过程会增加服务端的计算压力。
3. `JWT`一旦签发成功，只能等过期自动失效，服务端不能控制`JWT`是否失效。

## Magic Links（魔法链接）

### 简介

`Magic Links`旨在提供一种无需提供密码即可完成的模式，类似的还有手机号获取验证码，不过表现和体验上不一样。一般通过邮件发送登录链接，用户只需点击链接即可完成登录并跳转到相关页面。

### 认证过程

用户输入邮箱发送登录请求，而服务端这边首先校验用户邮箱是否存在，然后生成一个唯一的`token`并结合邮箱拼接成一个登录链接。而`token`则需要服务端通过数据库去管理和维护，并设置一个较短的有效期。在用户使用登录链接完成登录后，`token`就会立即无效化。
而在用户点击登录链接进行登录时，本质上`token`就相当于短时间内自动过期的一次性密码，通过邮箱和一次性密码完成登录。

![`token`的数据库结构](magicLinksToken_Schema.png)

1. `identifier`： `token`的验证账号信息，如果使用的是邮箱验证登录，那这个地方的值就是邮箱地址，如果为手机号验证码登录，那这个地方就是手机号

2. `token`： 生成的`token`，只能用于与之匹配的`identifier`

3. `expires`：创建时一般默认比较短的有效期，且当用户使用`token`登录成功后立即过期无效化
