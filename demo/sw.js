self.importScripts('../dist/peer-worker.min.js');
var worker = new PeerWorker({
    // version: 1,           // 发布版本号
    // logLevel: 'error',
    // allowOrigins: [],    // 允许代理的第三方资源origin
    // allowDestinations: ['audio', 'embed', 'font', 'image', 'script', 'style', 'video'],      // 允许加速的资源类型
    // allowImageTypes: ['bmp', 'bpg', 'eps', 'gif', 'ico', 'jpeg', 'jpg', 'pict', 'png', 'svg', 'svgz', 'tif', 'tiff', 'ttf', 'webp'],
    // allowVideoTypes: ['3g2', '3gp', 'amv', 'avi', 'drc', 'f4bogv', 'f4p', 'f4v', 'flv', 'gifv', 'm2v', 'm4v', 'mkv', 'mov', 'mp2', 'mpe', 'mpeg', 'mpg', 'mpv', 'qt', 'webm', 'wmv'],
    // allowAudioTypes: ['aac', 'aiff', 'f4a', 'flac', 'm4a', 'm4p', 'mid', 'midi', 'mogg', 'mp3', 'oga', 'ogg', 'opus', 'pat', 'ra', 'rm', 'wav', 'webm'],
    // allowDocumentTypes: ['doc', 'docx', 'otf', 'pdf', 'ppt', 'pptx', 'ps', 'xls', 'xlsx'],
    // allowOtherTypes: ['swf', 'woff', 'woff2'],
    // maxCacheLimit: 100*1024*1024,    // 最大缓存数据量(Byte)
    // maxAgeSeconds: 24 * 60 * 60,     // 24h,
    // peerRequestTimeout: 5000,         // p2p请求的超时时间
    // fileSizeLimit: 6*1024*1024,     // 单个文件大小限制(Byte)
});
worker.register();
