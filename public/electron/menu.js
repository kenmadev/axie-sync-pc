const { Menu, shell } = require('electron');

const attach = (app, win, options) => {
  const { runOnStart, minimizeOnStart } = options;
  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          click: () => app.quit(),
        },
      ],
    },
    {
      label: 'Options',
      submenu: [
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
      ],
    },
    {
      label: 'About',
      submenu: [
        {
          label: 'Discord',
          click: () => shell.openExternal('https://discord.gg/3MQ63hSwqv'),
        },
        { type: 'separator' },
        {
          label: 'Version 0.1.0',
        },
      ],
    },
  ]);

  Menu.setApplicationMenu(menu);
};

module.exports = {
  attach,
};
