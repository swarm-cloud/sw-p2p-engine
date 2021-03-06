**[English](README.md) | 简体中文**

<p align="center">
<a href="" target="_blank" rel="noopener noreferrer"><img width="250" src="https://cdnbye.oss-cn-beijing.aliyuncs.com/pic/cdnbye.png" alt="cdnbye logo"></a>
<a href="" target="_blank" rel="noopener noreferrer"><img width="250" src="./image/webrtc.png" alt="webrtc logo"></a>
</p>
<h4 align="center">网站静态资源P2P加速神器</h4>
<p align="center">
  <a href="https://www.npmjs.com/package/swarmcloud-sw"><img src="https://img.shields.io/npm/v/swarmcloud-sw.svg?style=flat" alt="npm"></a>
  <a href="https://www.jsdelivr.com/package/npm/swarmcloud-sw"><img src="https://data.jsdelivr.com/v1/package/npm/swarmcloud-sw/badge" alt="jsdelivr"></a>
</p>

SW P2P Engine 采用最先进的HTML5技术——WebRTC来做点对点传输，ServiceWorker来代理网络请求，还有IndexedDB来缓存数据，打造了一个去中心化的静态资源加速网络。在不影响用户体验的前提下，利用终端设备的闲置带宽和少量的磁盘空间，创造一个可无限扩展的P2P网络，大幅节省网站的CDN成本。

## 特性
- 浏览器原生支持，不需要安装任何插件，采用仿BT算法，在线人数越多效果越好
- 支持大部分静态文件类型，包括js、css、图片和音频等
- 数据加密传输
- 浏览器不支持WebRTC时无缝切换到HTTP下载模式
- 可与所有CDN搭配使用，无需改造服务端
- Tracker服务器根据访问IP的ISP、地域等进行智能调度

## 浏览器支持情况
由于WebRTC已成为HTML5标准，目前大部分主流浏览器都已经支持。兼容性取决于浏览器是否支持 WebRTC, ServiceWorker 和 IndexedDB。

 兼容性|Chrome | Firefox | Mac Safari| 安卓微信/QQ | Opera | Edge | iOS Safari | IE |  
:-: | :-: | :-: | :-: | :-: | :-: | :-:| :-:| :-:
WebRTC | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ❌ |
Service Worker | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ❌ |
IndexedDB | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ❌ |
SwarmCloud | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ❌ |

## 准备工作

#### 绑定域名
访问`https://www.cdnbye.com/oms`，注册并绑定域名。

#### 网站迁移到HTTPS
由于 Service Worker 需要在HTTPS下才能生效，请确保你的网站已经迁移到HTTPS。

你可以使用 [Let's Encrypt](https://letsencrypt.org/) 来生成免费的证书。请参考 [这里](https://letsencrypt.org/getting-started/) 的教程。

## 部署 Service Worker
ServiceWorker 是实现P2P加速的关键。只要将 [sw.js](./dist/sw.js) 部署到网站的根目录即可，如 https://yourwebsite.com/sw.js
<br>
同样, 可以自定义配置或者采用默认配置。

#### 快速集成
拷贝 [sw.js](./dist/) 到服务器的域名根目录， 并确保可以通过 https://yourwebsite.com/sw.js 访问。

#### 自定义集成
在服务器的域名根目录创建一个 sw.js 文件，并引入 PeerWorker ，创建实例：
```javascript
// import peer-worker into service worker
self.importScripts('https://cdn.jsdelivr.net/npm/swarmcloud-sw@latest/dist/peer-worker.min.js');

var worker = new PeerWorker({
    version: 1,
    logLevel: 'warn',
    allowOrigins: ['https://third-party-site.com'],    // 允许加速的第三方Origin白名单，请参考 请参考：https://www.cdnbye.com/cn/views/sw/API.html#%E7%AC%AC%E4%B8%89%E6%96%B9%E8%B5%84%E6%BA%90%E5%8A%A0%E9%80%9F
});
worker.register();
```
部署完成后，SwarmCloud 的 ServiceWorker 将拦截全站的网络请求，并在P2P和CDN之间智能切换。

## 集成 P2P Engine 

#### 快速集成
如果不需要自定义配置，只需要在网站主页 index.html 加上一行脚本即可：
```html
<head>
    <script src="https://cdn.jsdelivr.net/npm/swarmcloud-sw@latest?auto=true"></script>
    ...
</head>
```
注意，参数必须是"auto=true"才会自动安装。 

#### 自定义集成
引入脚本，并创建 P2PEngineSW 实例，该实例可以自定义配置：
```html
<head>
    <script src="https://cdn.jsdelivr.net/npm/swarmcloud-sw@latest"></script>
    ...
</head>
<script>
var engine = new P2PEngineSW({
    logLevel: 'debug',
    swFile: 'sw.js',          // service worker file name
    swScope: './',            // service worker scope
    swEnabled: true,          // enable or disable service worker
});

engine.registerServiceWorker().then(function (registration) {
    console.info('ServiceWorker registration successful with scope: ', registration.scope);
    if (P2PEngineSW.isSupported()) {
        engine.start();
    }
}).catch(function(err) {
    console.info('ServiceWorker registration failed ', err)
})
</script>
```
也可以通过npm引入：
```bash
$ npm install swarmcloud-sw
```
```javascript
import P2PEngineSW from 'swarmcloud-sw';

// Create P2PEngineSW instance...
```

## API文档
参见 [API.md](https://www.cdnbye.com/cn/views/sw/API.html)

## 开源赞助计划
所有开源项目或者技术博客等非营利性站点，均可申请永久免费使用，请联系客服开通服务。

## 相关项目
- [hlsjs-p2p-engine](https://gitee.com/cdnbye/hlsjs-p2p-engine) - HLS协议的Web端P2P流媒体方案。
- [dashjs-p2p-engine](https://github.com/cdnbye/dashjs-p2p-engine) - MPEG-dash协议的Web端P2P流媒体方案。
- [mp4-p2p-engine](https://github.com/cdnbye/mp4-p2p-engine) - 支持MP4的Web端P2P流媒体方案。

## FAQ
我们收集了一些[常见问题](https://www.cdnbye.com/cn/views/FAQ.html)。在报告issue之前请先查看一下。

## 联系我们
邮箱：service@cdnbye.com
