self.importScripts('https://cdn.jsdelivr.net/npm/swarmcloud-sw@latest/dist/peer-worker.min.js');
var worker = new PeerWorker({
    // Other PeerWorker options provided by SwarmCloud
});
console.log(`PeerWorker version ${PeerWorker.version}`);
worker.register();
