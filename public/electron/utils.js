const axios = require('axios');
const rax = require('retry-axios');
const Store = require('electron-store');
const store = new Store();

const useAxios = (options = {}) => {
  const instance = axios.create({
    timeout: 5000,
    ...options,
  });

  instance.defaults.raxConfig = {
    instance,
    retry: 3,
    noResponseRetries: 2,
    retryDelay: 100,
    // onRetryAttempt: err => {
    //   const cfg = rax.getConfig(err);
    //   console.log(`Retry attempt #${cfg.currentRetryAttempt}`);
    // },
  };

  rax.attach(instance);
  return instance;
};

const hasStore = key => store.has(key);
const setStore = (key, value) => store.set(key, value);
const getStore = (key, defValue = null) =>
  hasStore(key) ? store.get(key) : defValue;

module.exports = {
  useAxios,
  hasStore,
  setStore,
  getStore,
};
