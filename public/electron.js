const path = require('path');
const url = require('url');
const AutoLaunch = require('auto-launch');
const { app, BrowserWindow, nativeTheme } = require('electron');
const tray = require('./electron/tray');
const menu = require('./electron/menu');
const { getStore, setStore, hasStore } = require('./electron/utils');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 400,
    height: 230,
    resizable: false,
    backgroundColor: '#282c34',
    icon: path.join(__dirname, '/favicon.ico'),
    darkTheme: true,
    webPreferences: {
      nodeIntegration: true,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, '/electron/preload.js'),
    },
    center: true,
  });

  nativeTheme.themeSource = 'dark';

  const isDev = process.env.NODE_ENV === 'dev';
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : url.format({
          pathname: path.join(__dirname, '/index.html'),
          protocol: 'file:',
          slashes: true,
        })
  );

  // Open the DevTools.
  isDev && win.webContents.openDevTools({ mode: 'detach' });

  global.autoLaunch = new AutoLaunch({
    name: 'Axie Sync',
    path: app.getPath('exe'),
    isHidden: true,
  });

  global.autoLaunch.isEnabled().then(isEnabled => {
    const minimizeOnStart = getStore('minimizeOnStart', false);
    const runOnStart = getStore('runOnStart', true);
    const menuOptions = {
      runOnStart: {
        checked: runOnStart,
        action: () => {
          const value = !runOnStart;
          const action = !value ? 'disable' : 'enable';
          global.autoLaunch[action]();
          setStore('runOnStart', value);
        },
      },
      minimizeOnStart: {
        checked: minimizeOnStart,
        action: () => {
          const value = minimizeOnStart ? false : true;
          setStore('minimizeOnStart', value);
        },
      },
    };

    // create tray
    tray.attach(app, win, menuOptions);
    menu.attach(app, win, menuOptions);

    if (minimizeOnStart) {
      BrowserWindow.getFocusedWindow().minimize();
    }

    const firstBoot = !hasStore('firstBoot');
    if (firstBoot && isEnabled) {
      global.autoLaunch.enable();
      setStore('firstBoot', true);
    }
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
