"use strict"
const electron = require('electron')
const Menu = require("menu")
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain

let mainWindow

let createMainWindow = function(){
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768
    })

    mainWindow.loadURL('file://' + __dirname + '/web/index.html')

    mainWindow.webContents.openDevTools()
}

app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit()
    }
})

app.on('activate', function(e, hasVisibleWindows){
    if(!hasVisibleWindows){
        createMainWindow()
    }
})

app.on('ready', function() {

    createMainWindow()

    mainWindow.on('closed', function(e) {
        mainWindow = null
    })

    var template = [
        {
            label: "Application",
            submenu: [
                { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
                { type: "separator" },
                { label: "Quit", accelerator: "CmdOrCtrl+Q", click: function() { app.quit() }}
            ]
        },
        {
            label: "Edit",
            submenu: [
                { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
                { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
                { type: "separator" },
                { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
                { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
                { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
                { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
            ]
        }
    ]

    var menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
})
