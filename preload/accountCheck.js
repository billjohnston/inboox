var ipcRenderer = require('electron').ipcRenderer;

ipcRenderer.sendToHost('accountsHtml', document.body.innerHTML);
