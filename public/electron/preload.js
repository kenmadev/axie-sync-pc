const { contextBridge } = require('electron');
const watchWorker = require('./sync');

contextBridge.exposeInMainWorld('electron', {
  axieSync: {
    watch: watchWorker(true),
    unwatch: watchWorker(false),
  },
  windowBrowser: global.win,
});
