const {app, BrowserWindow, ipcMain, globalShortcut, Menu} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win = null
function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    minWidth: 300,
    minHeight: 80,
  })

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  //win.webContents.openDevTools()
  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}
let helpWindow = null
function createHelpWindow(){
  helpWindow = new BrowserWindow({
    width: 800,
    height: 600,
  })
  helpWindow.setMenu(null)
  helpWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'man/help.html'),
    protocol: 'file:',
    slashes: true
  }))
  helpWindow.on('closed', () => { helpWindow = null})
}

ipcMain.on('help', (e, arg)=>{
  if(helpWindow == null){
    createHelpWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  //if (process.platform !== 'darwin') {
    app.quit()
  //}
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

Menu.setApplicationMenu(Menu.buildFromTemplate([
  {
    label: "Checktron",
    submenu: [
      { label: "Quit", accelerator: "CmdOrCtrl+Q", click: function() { app.quit(); }}
    ]
  },
  {
    label: "Edit",
    submenu: [
      { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
      { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
      { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" }
    ]
  }
]))
