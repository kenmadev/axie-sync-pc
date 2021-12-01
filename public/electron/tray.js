const path = require('path');
const { Tray, Menu } = require('electron');

const createTray = (app, win, options = {}) => {
  const appIcon = new Tray(path.join(__dirname, '/../favicon.ico'));
  const { runOnStart, minimizeOnStart } = options;
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show',
      click: () => win.show(),
    },
    {
      label: 'Run on Startup',
      type: 'checkbox',
      checked: runOnStart.checked,
      click: runOnStart.action,
    },
    {
      label: 'Minimize on Start',
      type: 'checkbox',
      checked: minimizeOnStart.checked,
      click: minimizeOnStart.action,
    },
    {
      label: 'Exit',
      click: () => app.quit(),
    },
  ]);

  appIcon.on('double-click', () => win.show());
  appIcon.setToolTip('Axie Sync');
  appIcon.setContextMenu(contextMenu);
  return appIcon;
};

const attach = (app, win, options = {}) => {
  let tray = null;
  win.on('minimize', event => {
    event.preventDefault();
    win.hide();
    tray = createTray(app, win, options);
  });

  win.on('restore', () => {
    win.show();
    tray && tray.destroy();
  });
};

module.exports = {
  attach,
};
