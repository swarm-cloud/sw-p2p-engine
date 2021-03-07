**English | [简体中文](Readme_zh.md)**

<p align="center">
<a href="" target="_blank" rel="noopener noreferrer"><img width="250" src="https://cdnbye.oss-cn-beijing.aliyuncs.com/pic/cdnbye.png" alt="cdnbye logo"></a>
<a href="" target="_blank" rel="noopener noreferrer"><img width="250" src="./image/webrtc.png" alt="webrtc logo"></a>
</p>
<h4 align="center">Speed up your website using WebRTC and ServiceWorker.</h4>
<p align="center">
  <a href="https://www.npmjs.com/package/swarmcloud-sw"><img src="https://img.shields.io/npm/v/swarmcloud-sw.svg?style=flat" alt="npm"></a>
  <a href="https://www.jsdelivr.com/package/npm/swarmcloud-sw"><img src="https://data.jsdelivr.com/v1/package/npm/swarmcloud-sw/badge" alt="jsdelivr"></a>
</p>

SW P2P Engine creates a communal, distributed CDN with the latest HTML5 APIs — WebRTC to connect browsers, ServiceWorker to fulfill requests, IndexedDB to cache data, and WebCrypto to do it all securely. And it never impacts the user experience. Ever. This lightweight library uses only a small portion of spare bandwidth, imperceptible CPU, 150MB of browser cache. 

## Features
- WebRTC data channels for lightweight peer-to-peer communication with no plugins
- Support most popular static assets such as js, css, image and audio.
- Seamlessly fallback to normal server usage if a browser doesn't support WebRTC
- Compatible with all CDNs. No service side changes required.
- Efficient scheduling policies to enhance the performance of P2P streaming
- Use IP database to group up peers by ISP and regions

## Browser Support
WebRTC has already been incorporated into the HTML5 standard and it is broadly deployed in modern browsers. The compatibility of SwarmCloud depends on the browser support of WebRTC, Service Worker and IndexedDB.

 Compatibility|Chrome | Firefox | Mac Safari| Android Wechat/QQ | Opera | Edge | iOS Safari | IE |  
:-: | :-: | :-: | :-: | :-: | :-: | :-:| :-:| :-:
WebRTC | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ❌ |
Service Worker | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ❌ |
IndexedDB | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ❌ |
SwarmCloud | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ❌ |

## Prepare

#### Register your Domain
Register your domain at `https://oms.cdnbye.com`

#### Secure your Site with HTTPS
Secure your site with HTTPS, if it isn't already. HTTPS is required for Service Worker, which we'll set up in the next step.

To secure your site with HTTPS, you can use [Let's Encrypt](https://letsencrypt.org/) for a free certificate and easy integration. See Let's Encrypt's starting instructions [here](https://letsencrypt.org/getting-started/) to secure your site.

## Host Service Worker
SwarmCloud's Service Worker is the magic sauce that powers P2P engine.
Host SwarmCloud's Service Worker [sw.js](./dist/sw.js) at the root of your domain, i.e., https://yourwebsite.com/sw.js. After an asset is cached, every device watches for future requests for that asset and automatically retrieves it from SwarmCloud's peer-to-peer network instead of the more expensive, slower origin server (over WebRTC instead of HTTP).
<br>
You can customize configuration or use default one.

#### Basic Usage
Copy [sw.js](./dist/) to your server and make it available at https://yourwebsite.com/sw.js.

#### Advanced Usage
Create file named sw.js at the root of your domain, then import PeerWorker and add customize configurations:
```javascript
// import peer-worker into service worker
self.importScripts('https://cdn.jsdelivr.net/npm/swarmcloud-sw@latest/dist/peer-worker.min.js');

var worker = new PeerWorker({
    version: 1,
    logLevel: 'warn',
    allowOrigins: ['https://third-party-site.com'],    // Allow some third party origins to request from p2p, see https://www.cdnbye.com/en/views/sw/API.html#handle-third-party-requests
});
worker.register();
```
Once added，SwarmCloud's imported Service Worker will handle CDN 'fetch' events to accelerate your website. All 'fetch' events not 'hit' by P2P network will fall through to CDN network.

## Install P2P Engine 
Add P2P Engine script to the `<head>` element of home page. Again, you can customize configuration or use default one.
#### Basic Usage
Add one line of script to your website homepage index.html, this will setup p2p engine automatically with default configuration.
```html
<head>
    <script src="https://cdn.jsdelivr.net/npm/swarmcloud-sw@latest?auto=true"></script>
    ...
</head>
```
Note that the script parameter must be "auto = true".

#### Advanced Usage
Create P2PEngineSW instance explicitly to customize configuration.
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
Or via npm
```bash
$ npm install swarmcloud-sw
```
```javascript
import P2PEngineSW from 'swarmcloud-sw';

// Create P2PEngineSW instance...
```

## Check if SwarmCloud works correctly
Open Chrome Console, if it prints like "ServiceWorker registration successful with scope", that means SwarmCloud is already working.

## API and Configuration
See [API.md](https://www.cdnbye.com/en/views/sw/API.html)

## Open Source Sponsorship
All non-profit sites such as open source projects and blogs can apply for permanent free use, please contact customer service to activate.

## Related Projects
- [hlsjs-p2p-engine](https://github.com/cdnbye/hlsjs-p2p-engine) - Web Video Delivery Technology with No Plugins for hls.js.
- [dashjs-p2p-engine](https://github.com/cdnbye/dashjs-p2p-engine) - Web Video Delivery Technology with No Plugins for MPEG-dash.
- [mp4-p2p-engine](https://github.com/cdnbye/mp4-p2p-engine) - Web Video Delivery Technology with No Plugins for MP4.

## FAQ
We have collected some [frequently asked questions](https://www.hdtvcloud.com/en/views/FAQ.html). Before reporting an issue, please search if the FAQ has the answer to your problem.

## Contact Us
Email: service@cdnbye.com
<br>
Telegram: @cdnbye
<br>
Skype: live:86755838



