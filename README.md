<p align="center">
    <img src="https://i.imgur.com/skukI2q.png" style="width: 150px"/>
    </br>
    <b>Axie Sync PC</b>
    <br></br>
</p>

[![downloadsBadge](https://img.shields.io/npm/dt/axie-sync-pc?style=for-the-badge)](https://github.com/kenmadev/axie-sync-pc)
[![versionBadge](https://img.shields.io/npm/v/axie-sync-pc?style=for-the-badge)](https://github.com/kenmadev/axie-sync-pc)

Axie Sync PC is a [Electron.js](https://www.electronjs.org/) project bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Inspiration
When season 19 came out. Axie Infinity disabled the old battle logs where you can look up anyones battle history via Ronin address.
It was a useful feature specially for managers who were constantly checking the progress of their newly recruited scholars.
Axie Infinity replaced it by storing the battle history into the device as a `cache` file. The only way for others to view a battle is to share it via  the "Share" button.

This project let players sync their battle history into the cloud just by using the application. Which may help managers track their scholars just like the old days.
It's still unknown when is the new Battle logs API gonna come out. Until then, the Axie Sync project remains.

## Axie Project
- [axie-sync-server](https://github.com/kenmadev/axie-sync-server) - This handles all the request from pc and mobile clients. Store and query battle logs easily via the API.
- [axie-sync-pc](https://github.com/kenmadev/axie-sync-pc) - The PC client that sync Axie Infinity battle history to `axie-sync-server`. Only available for Windows.
- [axiesyncmobile](https://github.com/kenmadev/axiesyncmobile) - The Mobile client that sync Axie Infinity battle history to `axie-sync-server`. Only available for Android devices.

## How to use the application?
1. Download and open the app
2. Click the Sync button and minimize
3. Start playing some Axie battle

## I'm a dev how can I contribute?
Axie Sync Server is a `Electron.js` project. A basic understanding of Electron.js is a must.
To contribute, just clone the repository and follow the instructions below.

First, clone and install the dependencies.

```bash
$ git clone https://github.com/kenmadev/axie-sync-pc
$ cd axie-sync-server
$ yarn install
```

Run the development server
```bash
$ yarn run start
```

You actually don't need the browser page for this. You can check the page inside the electron app.

Run the electron app
```bash
$ yarn run electron
```

## Build the App
```bash
$ yarn run pack
```
An `exe` file will be generated inside `./out` folder

## Do you have a Discord?
Yup! Join our [Discord](https://discord.gg/3MQ63hSwqv) server.

## Donate
I do this open source work in my free time. If you'd like me to invest more time on it, please donate. Thank you in advance!
- BNB (BEP-20) or ETH (ERC-20) - `0xff66328040AeaD7ae1E7Ab5c858652cECD0a1ad2`
- WETH/SLP/AXS (RON) - `ronin:8374b56c6329815264dbfc2a139d259e95bf745d`
