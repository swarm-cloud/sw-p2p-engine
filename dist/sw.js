self.importScripts('https://cdn.jsdelivr.net/npm/swarmcloud-sw@latest/dist/peer-worker.min.js');
const worker = new PeerWorker({
    // Other PeerWorker options provided by SwarmCloud
});
worker.register();
