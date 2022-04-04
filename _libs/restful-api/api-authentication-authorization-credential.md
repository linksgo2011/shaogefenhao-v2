---
title: API 文档和前后端协作
toc: true
recommend: true
date: 2021-08-11 19:18:36
categories: 
  - Rest API
sidebar: auto
permalink: /restful-api/api-authentication-authorization-credential/
---

在一些互联网公司的面试中，面试官往往会问这样一个问题：

> “如果禁用浏览器 cookie，如何实现用户追踪和认证？”

遗憾的是依然有大量候选人答非所问，无法搞清楚 cookie 和 session 之间的区别。而在工作中也有让人惊讶的真实案例：把 user ID 存储到 local storage 中当做 token 使用，原因是他们声称弃用了 cookie 这种落后的东西；一个移动端项目，服务器给出的 API 中需要客户端模拟一个 cookie，从而像浏览器中 ajax 那样消费 API。

互联网是基于 HTTP 协议构建的，而 HTTP 协议因为简单流行开来，但是 HTTP 协议是无状态（通信层面上虚电路比数据报昂贵太多）的，为此人们为了追踪用户想出了各种办法，包括 cookie/session 机制、token、flash 跨浏览器 cookie 甚至浏览器指纹等。

![cookies.png](./api-authentication-authorization-credential/4225410804.png)

把用户身份藏在每一个地方（浏览器指纹技术甚至不需要存储介质）
讲使用 spring security 等具体技术的资料已经很多了，这篇文章不打算写框架和代码的具体实现。我们会讨论认证和授权的区别，然后会介绍一些被业界广泛采用的技术，最后会聊聊怎么为 API 构建选择合适的认证方式。

## 认证、授权、凭证

首先，认证和授权是两个不同的概念，为了让我们的 API 更加安全和具有清晰的设计，理解认证和授权的不同就非常有必要了，它们在英文中也是不同的单词。

![roles.png](./api-authentication-authorization-credential/379091767.png)

认证是 authentication，指的是当前用户的身份，当用户登陆过后系统便能追踪到他的身份做出符合相应业务逻辑的操作。即使用户没有登录，大多数系统也会追踪他的身份，只是当做来宾或者匿名用户来处理。认证技术解决的是 “我是谁？”的问题。

授权则不同，授权是 authorization，指的是什么样的身份被允许访问某些资源，在获取到用户身份后继续检查用户的权限。单一的系统授权往往是伴随认证来完成的，但是在开放 API 的多系统结构下，授权可以由不同的系统来完成，例如 OAuth。授权技术是解决“我能做什么？”的问题。

实现认证和授权的基础是需要一种媒介（credentials）来标记访问者的身份或权利，在现实生活中每个人都需要一张身份证才能访问自己的银行账户、结婚和办理养老保险等，这就是认证的凭证；在古代军事活动中，皇帝会给出战的将军颁发兵符，下级将领不关心持有兵符的人，只需要执行兵符对应的命令即可。在互联网世界中，服务器为每一个访问者颁发 session ID 存放到 cookie，这就是一种凭证技术。数字凭证还表现在方方面面，SSH 登录的密匙、JWT 令牌、一次性密码等。

用户账户也不一定是存放在数据库中的一张表，在一些企业 IT 系统中，对账户管理和权限有了更多的要求。所以账户技术 （accounting）可以帮助我们使用不同的方式管理用户账户，同时具有不同系统之间共享账户的能力。例如微软的活动目录（AD），以及简单目录访问协议（LDAP），甚至区块链技术。
还有一个重要的概念是访问控制策略（AC）。如果我们需要把资源的权限划分到一个很细的粒度，就不得不考虑用户以何种身份来访问受限的资源，选择基于访问控制列表（ACL）还是基于用户角色的访问控制（RBAC）或者其他访问控制策略。

在流行的技术和框架中，这些概念都无法孤立的被实现，因此在现实中使用这些技术时，大家往往为一个 OAuth2 是认证还是授权这种概念争论不休。为了容易理解，我在文末附上了一份常见技术和概念的术语表。下面我会介绍在API开发中常常使用的几种认证和授权技术：HTTP Basic AUthentication、HAMC、OAuth2，以及凭证技术JWT token。

## HTTP Basic Authentication

你一定用过这种方式，但不一定知道它是什么，在不久之前，当你访问一台家用路由器的管理界面，往往会看到一个浏览器弹出表单，要求你输入用户密码。

![basic.png](./api-authentication-authorization-credential/1004061814.png)

在这背后，当用户输入完用户名密码后，浏览器帮你做了一个非常简单的操作:

- 组合用户名和密码然后 Base64 编码
- 给编码后的字符串添加 Basic 前缀，然后设置名称为 Authorization 的 header 头部

![basic_flow.png](./api-authentication-authorization-credential/2147659212.png)

API 也可以非常简单的提供 HTTP Basic Authentication 认证方式，那么客户端可以很简单通过 Base64 传输用户名和密码即可:

- 将用户名和密码使用冒号连接，例如 username:abc123456
- 为了防止用户名或者密码中存在超出 ASCII 码范围的字符，推荐使用UTF-8编码
- 将上面的字符串使用 Base 64 编码，例如 dXNlcm5hbWU6YWJjMTIzNDU2
- 在 HTTP 请求头中加入 “Basic + 编码后的字符串”，即：Authorization: Basic QWxhZGRpbjpPcGVuU2VzYW1l

这种方式实现起来非常简单，在大量场景下被采用。当然缺点也很明显，Base64 只能称为编码，而不是加密 (实际上无需配置密匙的客户端并没有任何可靠地加密方式，我们都依赖 TSL 协议)。这种方式的致命弱点是编码后的密码如果明文传输则容易在网络传输中泄露，在密码不会过期的情况下，密码一旦泄露，只能通过修改密码的方式。

## HMAC（AK/SK）认证

在我们对接一些 PASS 平台和支付平台时，会要求我们预先生成一个 access key（AK） 和 secure key（SK），然后通过签名的方式完成认证请求，这种方式可以避免传输 secure key，且大多数情况下签名只允许使用一次，避免了重放攻击。

这种基于 AK/SK 的认证方式主要是利用散列的消息认证码 (Hash-based MessageAuthentication Code) 来实现的，因此有很多地方叫 HMAC 认证，实际上不是非常准确。HMAC 只是利用带有 key 值的哈希算法生成消息摘要，在设计 API 时有具体不同的实现。

![HMAC_hash.png](./api-authentication-authorization-credential/768972510.png)

HMAC 在作为网络通信的认证设计中作为凭证生成算法使用，避免了口令等敏感信息在网络中传输。基本过程如下：

客户端需要在认证服务器中预先设置 access key（AK 或叫 app ID） 和 secure key（SK）
在调用 API 时，客户端需要对参数和 access key 进行自然排序后并使用 secure key 进行签名生成一个额外的参数 digest
服务器根据预先设置的 secure key 进行同样的摘要计算，并要求结果完全一致
注意 secure key 不能在网络中传输，以及在不受信任的位置存放（浏览器等）

为了让每一次请求的签名变得独一无二，从而实现重放攻击，我们需要在签名时放入一些干扰信息。
在业界标准中有两种典型的做法，质疑/应答算法（OCRA: OATH Challenge-Response Algorithm）、基于时间的一次性密码算法（TOTP：Time-based One-time Password Algorithm）。

### 质疑/应答算法

质疑/应答算法需要客户端先请求一次服务器，获得一个 401 未认证的返回，并得到一个随机字符串（nonce）。将 nonce 附加到按照上面说到的方法进行 HMAC 签名，服务器使用预先分配的 nonce 同样进行签名校验，这个 nonce 在服务器只会被使用一次，因此可以提供唯一的摘要。

![ak_sk.png](./api-authentication-authorization-credential/4156853075.png)

### 基于时间的一次性密码认证

为了避免额外的请求来获取 nonce，还有一种算法是使用时间戳，并且通过同步时间的方式协商到一致，在一定的时间窗口内有效（1分钟左右）。

![top.png](./api-authentication-authorization-credential/2436879961.png)

这里的只是利用时间戳作为验证的时间窗口，并不能严格的算作基于时间的一次性密码算法。标准的基于时间的一次性密码算法在两步验证中被大量使用，例如 Google 身份验证器不需要网络通信也能实现验证（但依赖准确的授时服务）。原理是客户端服务器共享密钥然后根据时间窗口能通过 HMAC 算法计算出一个相同的验证码。

![totp.png](./api-authentication-authorization-credential/3978829140.png)

TOTP 基本原理和常见厂商

## OAuth2 和 Open ID

OAuth（开放授权）是一个开放标准，允许用户授权第三方网站访问他们存储在另外的服务提供者上的信息，而不需要将用户名和密码提供给第三方网站或分享他们数据的所有内容。
OAuth 是一个授权标准，而不是认证标准。提供资源的服务器不需要知道确切的用户身份（session），只需要验证授权服务器授予的权限（token）即可。

![oauth.png](./api-authentication-authorization-credential/3686456467.png)

上图只是 OAuth 的一个简化流程，OAuth 的基本思路就是通过授权服务器获取 access token 和 refresh token（refresh token 用于重新刷新access token），然后通过 access token 从资源服务器获取数据 。在特定的场景下还有下面几种模式：

- 授权码模式（authorization code）
- 简化模式（implicit）
- 密码模式（resource owner password credentials）
- 客户端模式（client credentials）

如果需要获取用户的认证信息，OAuth 本身没有定义这部分内容，如果需要识别用户信息，则需要借助另外的认证层，例如 OpenID Connect。

### 验证 access token

在一些介绍OAuth 的博客中很少讲到资源服务器是怎么验证 access token 的。OAuth core 标准并没有定义这部分，不过在 OAuth 其他标准文件中提到两种验证 access token的方式。

在完成授权流程后，资源服务器可以使用 OAuth 服务器提供的 Introspection 接口来验证access token，OAuth服务器会返回 access token 的状态以及过期时间。在OAuth标准中验证 token 的术语是 Introspection。同时也需要注意 access token 是用户和资源服务器之间的凭证，不是资源服务器和授权服务器之间的凭证。资源服务器和授权服务器之间应该使用额外的认证（例如 Basic 认证）。
使用 JWT 验证。授权服务器使用私钥签发 JWT 形式的 access token，资源服务器需要使用预先配置的公钥校验 JWT token，并得到 token 状态和一些被包含在 access token 中信息。因此在 JWT 的方案下，资源服务器和授权服务器不再需要通信，在一些场景下带来巨大的优势。同时 JWT 也有一些弱点，我会在JWT 的部分解释。

### refresh token 和 access token

几乎所有人刚开始了解 OAuth 时都有一个一疑问，为什么已经有了 access token 还需要 refresh token 呢？

授权服务器会在第一次授权请求时一起返回 access token 和refresh token，在后面刷新 access token 时只需要 refresh token。 access token 和 refresh token 的设计意图是不一样的，access token 被设计用来客户端和资源服务器之间交互，而 refresh token 是被设计用来客户端和授权服务器之间交互。

某些授权模式下 access token 需要暴露给浏览器，充当一个资源服务器和浏览器之间的临时会话，浏览器和资源服务器之间不存在签名机制，access token 成为唯一凭证，因此 access token 的过期时间（TTL）应该尽量短，从而避免用户的 access token 被嗅探攻击。

由于要求 access token 时间很短，refresh token 可以帮助用户维护一个较长时间的状态，避免频繁重新授权。大家会觉得让 access token 保持一个长的过期时间不就可以了吗？实际上 refresh token 和 access token 的不同之处在于即使 refresh token 被截获，系统依然是安全的，客户端拿着 refresh token 去获取 access token 时同时需要预先配置的 secure key，客户端和授权服务器之前始终存在安全的认证。

### OAuth、Open ID、OpenID Connect

认证方面的术语实在太多，我在搭建自己的认证服务器或接入第三方认证平台时，有时候到完成开发工作的最后一刻都无法理解这些术语。

OAuth 负责解决分布式系统之间的授权问题，即使有时候客户端和资源服务器或者认证服务器存在同一台机器上。OAuth 没有解决认证的问题，但提供了良好的设计利于和现有的认证系统对接。

Open ID 解决的问题是分布式系统之间身份认证问题，使用Open ID token 能在多个系统之间验证用户，以及返回用户信息，可以独立使用，与 OAuth 没有关联。

OpenID Connect 解决的是在 OAuth 这套体系下的用户认证问题，实现的基本原理是将用户的认证信息（ID token）当做资源处理。在 OAuth 框架下完成授权后，再通过 access token 获取用户的身份。

这三个概念之间的关系有点难以理解，用现实场景来说，如果系统中需要一套独立的认证系统，并不需要多系统之间的授权可以直接采用 Open ID。如果使用了 OAuth 作为授权标准，可以再通过 OpenID Connect 来完成用户的认证。

## JWT

在 OAuth 等分布式的认证、授权体系下，对凭证技术有了更多的要求，比如包含用户 ID、过期等信息，不需要再外部存储中关联。因此业界对 token 做了进一步优化，设计了一种自包含令牌，令牌签发后无需从服务器存储中检查是否合法，通过解析令牌就能获取令牌的过期、有效等信息，这就是JWT （JSON Web Token）。

JWT 是一种包含令牌（self-contained token），或者叫值令牌 （value token），我们以前使用关联到 session 上的 hash 值被叫做引用令牌（reference token）。

![two-types-of-token.png](./api-authentication-authorization-credential/2349337477.png)

简而言之，一个基本的JWT令牌为一段点分3段式结构。
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
生成JWT 令牌的流程为

![jwt.jpg](./api-authentication-authorization-credential/1625047913.jpg)

- header json 的 base64 编码为令牌第一部分
- payload json 的 base64 编码为令牌第二部分
- 拼装第一、第二部分编码后的 json 以及 secret 进行签名的令牌的第三部分

因此只需要签名的 secret key 就能校验 JWT 令牌，如果在消息体中加入用户 ID、过期信息就可以实现验证令牌是否有效、过期了，无需从数据库/缓存中读取信息。因为使用了加密算法，所以第一、二部分即使被修改（包括过期信息）也无法通过验证。JWT 优点是不仅可以作为 token 使用，同时也可以承载一些必要信息，省去多次查询。

注意：

- JWT token 的第一、二部分只是 base64 编码，肉眼不可读，不应当存放敏感信息
- JWT token 的自包含特性，导致了无法被撤回
- JWT 的签名算法可以自己拟定，为了便于调试，本地环境可以使用对称加密算法，生产环境建议使用非对称加密算法

JWT token 在微服务的系统中优势特别突出。多层调用的 API 中可以直接传递 JWT token，利用自包含的能力，可以减少用户信息查询次数；更重要的是，使用非对称的加密方式可以通过在系统中分发密匙的方式

### 验证 JWT token。

当然 OAuth 对 access token 等凭证所选用的技术并没有做出限制，OAuth 并不强制使用 JWT，在使用 JWT 自包含特性的优势时，必须考虑到 JWT 撤回困难的问题。在一些对撤回 token 要求很高的项目中不适合使用JWT，即使采用了一些方案实现（whitelist 和 blacklist）也违背了设计 JWT 的初衷。

### Cookie 、Token in Cookie、Session Token 依然被使用

在构建 API 时，开发者会发现我们的认证方式和网页应用有一些不同，除了像 ajax 这种典型的 web 技术外，如果我们希望 API 是无状态的，不推荐使用 Cookie。

使用 Cookie 的本质是用户第一次访问时服务器会分配一个 Session ID，后面的请求中客户端都会带上这个 ID 作为当前用户的标志，因为 HTTP 本身是无状态的，Cookie 属于一种内建于浏览器中实现状态的方式。如果我们的 API 是用来给客户端使用的，强行要求 API 的调用者管理Cookie 也可以完成任务。

在一些遗留或者不是标准的认证实现的项目中，我们依然可以看到这些做法，快速地实现认证。

使用 cookie，例如 web 项目中 ajax 的方式
使用 session ID 或 hash 作为 token，但将 token 放入 header 中传递
将生成的 token （可能是JWT）放入 cookie 传递，利用 HTTPonly 和 Secure 标签保护 token

## 选择合适的认证方式

随着微服务的发展，API 的设计不仅仅是面向 WEB 或者 Mobile APP，还有BFF（Backend for Frontend）和 Domain API 的认证，以及第三方服务的集成。

客户端到服务器之间认证和服务器到服务器之间认证是不同的。

我们把终端用户（Human）参与的通信，叫做 Human-to-machine (H2M)，服务器与服务器之间的通信叫做 Machine-to-machine (M2M)。

H2M 的通信需要更高的安全性，M2M 的通信天然比 H2M 安全，因此更多的强调性能，在不同的场合下选择合适的认证技术就显得特别重要。例如 HTTP Basic Authentication 用来作为 H2M 认证显得有些落后，但是在 M2M 中被大量使用。

另外值得一提的是，H2M 这种通信方式下，客户端不受控制，由于无法自主分发密匙，认证通信的安全高度依赖 HTTPS。

从一个宏观的角度看待他们的关系，对我们技术选型非常有帮助。

![h2m-m2m.png](./api-authentication-authorization-credential/1165581663.png)

## 术语表

- Browser fingerprinting 通过查询浏览器的代理字符串，屏幕色深，语言等，然后这些值通过散列函数传递产生指纹，不需要通过 Cookie 就可以识别浏览器
- MAC（Message authentication code） 在密码学中，讯息鉴别码，是经过特定算法后产生的一小段资讯，检查某段讯息的完整性
- HOTP（HMAC-based One-time Password algorithm）基于散列消息验证码的一次性密码算法
- Two-step verification 是一种认证方法，使用两种不同的元素，合并在一起，来确认使用者的身份，是多因素验证中的一个特例
- OTP （One time password ）一次性密码，例如注册邮件和短信中的认证码

## 参考文章

- https://swagger.io/docs/specification/authentication/basic-authentication/
- https://www.ietf.org/rfc/rfc2104.txt HMAC: Keyed-Hashing for Message Authentication
- https://www.ietf.org/rfc/rfc4226.txt HOTP: An HMAC-Based One-Time Password Algorithm
- https://tools.ietf.org/html/rfc6287 OCRA: OATH Challenge-Response Algorithm
- https://tools.ietf.org/html/rfc6749 The OAuth 2.0 Authorization Framework
- https://tools.ietf.org/html/rfc7519 JSON Web Token (JWT)
- https://oauth.net/2/ OAuth 2.0
- https://tools.ietf.org/id/oauth Internet-Draft Archive for OAuth
