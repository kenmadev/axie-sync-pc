const fs = require('fs');
const chokidar = require('chokidar');
const getAppDataPath = require('appdata-path');
const jsonfile = require('jsonfile');
const isEmpty = require('lodash/isEmpty');
const { useAxios } = require('./utils');
const { REMOTEAPI, AXIECACHEPATH } = require('./config');

const BATTLETYPES = {
  pvpbattle: 1,
  pvebattle: 2,
};

const syncBattle = async path => {
  try {
    // read the first item on the list and sync it
    const { battles } = await jsonfile.readFile(path);
    const [battle = {}] = battles;

    if (isEmpty(battle)) {
      throw new Error('Battle data is empty');
    }

    // only record pvp battles
    const { battleType = 0 } = battle;
    if (battleType !== BATTLETYPES.pvpbattle) return;

    // sync to server
    await useAxios({ timeout: 60000 }).post(`${REMOTEAPI}/battles`, {
      ...battle,
    });
  } catch (err) {
    let errMessage = err.message;
    if ('response' in err) {
      const { data = {} } = err.response || {};
      errMessage = data.message;
    }

    console.log(`Unable to sync battle history with error`, errMessage);
  }
};

const worker =
  (watch = true) =>
  () => {
    return new Promise((resolve, reject) => {
      // get the local battle histories state
      // this file updates every time a battle is finished
      const battleCache = getAppDataPath(
        `${AXIECACHEPATH}/production-battleHistoriesState`
      );

      if (!fs.existsSync(battleCache)) {
        return reject(
          new Error(
            'INVALID_CACHE_FILE: Make sure the game is installed or atleast one battle history has been saved.'
          )
        );
      }

      // unwatch watcher when set
      if (global.watcher && !watch) {
        return global.watcher.close().then(() => {
          console.log('Watcher for battle cache has been closed');
          resolve();
        });
      }

      // watch the histories state file
      global.watcher = chokidar.watch(battleCache, {
        ignored: /(^|[\/\\])\../,
        persistent: true,
      });

      global.watcher
        .on('change', path => syncBattle(path))
        .on('ready', () => {
          console.log('Watcher for battle cache is ready!');
          resolve();
        })
        .on('error', err =>
          reject(
            new Error(
              'MONITORING_ERROR: There was a problem monitoring the battle history.'
            )
          )
        );
    });
  };

module.exports = worker;
